import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("hiii");
}
export async function POST(req: Request) {
  try {
    const bodyData = await req.json();
    console.log(bodyData);
    console.log("helo frompost");

    if (!bodyData.userEmail) {
      return NextResponse.json(
        {
          message: "Enter the email ",
        },
        { status: 400 }
      );
    }
    if (!bodyData.userPassword) {
      return NextResponse.json(
        {
          message: "Enter the password ",
        },
        { status: 400 }
      );
    }
    await connectDB();
    const user = await USER.findOne({ email: bodyData.userEmail });
    if (user) {
      console.log(user.password, bodyData.userPassword);

      if (user.password === bodyData.userPassword) {
        console.log("hii");

        return NextResponse.json({
          status: 200,
          message: "Login SuccessFull",
        });
      }
    }
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server Error", error: error },
      { status: 500 }
    );
  }
}
