import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function GET() {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ sucess: true, data: decoded });
  } catch (error) {
    return NextResponse.json(
      { message: "Somthing has happend" },
      { status: 500 }
    );
  }
}
