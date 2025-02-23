import { connectDB } from "@/libs/database/mongo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import USER from "@/libs/database/models/userSchema";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("jwt")?.value;
    if (!token) {
      console.log("ur not loged in");
      return NextResponse.json(
        { message: "You'r not logged in" },
        { status: 400 }
      );
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log(decoded);
      return NextResponse.json(
        { message: "User is still valid", user: decoded },
        { status: 200 }
      );
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        console.log("token expired");

        const decoded = jwt.decode(token) as { id: string } | null;
        console.log(decoded);

        if (!decoded) {
          return NextResponse.json(
            { message: "Invalid token, please login" },
            { status: 401 }
          );
        }
        const user = await USER.findById(decoded.id);
        if (!user) {
          return NextResponse.json(
            { message: "The User belonging to this Id is not valid" },
            { status: 404 }
          );
        }
        const newToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: Number(process.env.JWT_EXPIRES_IN),
          }
        );
        (await cookies()).set("jwt", newToken);
        return NextResponse.json(
          { message: "Token refreshed", token: newToken },
          { status: 200 }
        );
      }
    }
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
