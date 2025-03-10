import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function CreateToken(userId: string) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });
  (await cookies()).set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN),
  });
  return token;
}
