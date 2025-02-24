import { connectDB } from "@/libs/database/mongo";
import { TokenValidator } from "../../utils/tokenValidator";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    console.log(id);

    console.log("hiii");

    const tokenValidator = await TokenValidator();
    if (!tokenValidator.success) {
      return NextResponse.json({ message: "No valid user" }, { status: 404 });
    }
    // console.log(tokenValidator.data);

    await connectDB();
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
