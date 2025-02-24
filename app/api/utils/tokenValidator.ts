import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";

export async function TokenValidator() {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return { success: false, message: "No token provided" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { success: true, data: decoded };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired, generating new token...");
      const decoded = jwt.decode(token) as { id: string } | null;
      if (!decoded) {
        return { success: false, message: "Invalid token" };
      }

      await connectDB();
      const user = await USER.findById(decoded.id);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Generate new token
      const newToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: Number(process.env.JWT_EXPIRES_IN) }
      );

      // Set new cookie
      (await cookies()).set("jwt", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN),
        path: "/",
      });

      return { success: true, data: newToken };
    }

    return { success: false, message: "Token verification failed" };
  }
}
