import { connectDB } from "@/libs/database/mongo";
import { TokenValidator } from "../../utils/tokenValidator";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const id = params.id;
    console.log(id);

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
