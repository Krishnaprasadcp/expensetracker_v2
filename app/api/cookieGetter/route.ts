import { NextResponse } from "next/server";
import { TokenValidator } from "../utils/tokenValidator";
export async function GET() {
  try {
    const response = await TokenValidator();
    if (response.success) {
      return NextResponse.json(
        { message: "Valid User", token: response.data },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "No valid User" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Somthing has happend" },
      { status: 500 }
    );
  }
}
