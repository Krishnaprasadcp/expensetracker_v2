import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "../../utils/helperPassword";
import { CreateToken } from "../../utils/createToken";

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" }),
  secondName: z.string().min(2, {
    message: "Second name must contain at least 2 characters",
  }),
  email: z.string().email({ message: "Invalid format of email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Must contain at least one special character",
    }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Number must contain 10 digits" })
    .max(10, { message: "Phone number should not exceed 10 digits" }),
});

export async function POST(req: Request) {
  try {
    const bodyData = await req.json();
    console.log(bodyData);

    const parsedData = signUpSchema.safeParse(bodyData.formData);
    if (!parsedData.success) {
      console.error("Validation Error:", parsedData.error.issues);
      return NextResponse.json(
        { message: "Validation failed", errors: parsedData.error.issues },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(parsedData.data.password);
    const userData = {
      ...parsedData.data,
      password: hashedPassword,
    };

    await connectDB();
    const newUser = new USER(userData);
    await newUser.save();

    const token = await CreateToken(newUser.id);

    return NextResponse.json(
      { message: "Signup successfull", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
export async function GET() {}
