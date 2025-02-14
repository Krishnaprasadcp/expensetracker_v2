import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";

export async function GET() {
  try {
    await connectDB();
    const users = await USER.find();
    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
