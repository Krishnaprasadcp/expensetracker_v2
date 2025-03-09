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
export async function POST(req: Request) {
  try {
    const bodyData: CredProp = await req.json();
    await connectDB();

    const user = await USER.findOne({ email: bodyData.email }).select(
      "+password"
    );
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
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
    });
    const expiryDate = new Date();

    // ✅ Set Cookie Properly
    (await cookies()).set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN),
    });

    const userObject = user.toObject();
    delete userObject.password;

    return NextResponse.json(
      { status: "success", user: userObject },
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
