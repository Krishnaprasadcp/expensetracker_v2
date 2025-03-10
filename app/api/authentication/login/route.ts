"use server";
import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { verifyPassword } from "../../utils/helperPassword";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CreateToken } from "../../utils/createToken";
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

    const token = await CreateToken(user.id);

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
