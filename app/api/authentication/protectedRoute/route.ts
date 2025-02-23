import { connectDB } from "@/libs/database/mongo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("jwt");
    console.log(token);
    return NextResponse.json({ message: token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
