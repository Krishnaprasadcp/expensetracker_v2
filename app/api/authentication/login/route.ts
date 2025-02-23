"use server";
import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { verifyPassword } from "../../utils/helperPassword";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
interface CredProp {
  email: string;
  password: string;
}
export async function GET() {
  console.log("hiii");
}

export async function POST(req: Request) {
  try {
    const bodyData: CredProp = await req.json();
    await connectDB();

    const user = await USER.findOne({ email: bodyData.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isValidPassword = await verifyPassword(
      bodyData.password,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 900,
    });

    // ✅ Set Cookie Properly
    (await cookies()).set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    return NextResponse.json(
      { status: "success", user: { id: user.id } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
