import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });

  // Delete the JWT cookie by setting an expired date
  response.cookies.set("jwt", "", { expires: new Date(0), path: "/" });

  return response;
}
