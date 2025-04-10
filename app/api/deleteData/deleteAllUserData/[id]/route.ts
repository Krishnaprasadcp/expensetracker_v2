import { ResponseSender } from "@/app/api/utils/responseSender";
import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await props.params).id;
    console.log(userId);

    await connectDB();
    const user = await USER.findById(userId);
    if (!user) {
      return ResponseSender("User not found", 404);
    }
    await user.deleteOne();
    return ResponseSender("Deleted", 200);
  } catch (error) {
    console.error("Error deleting user:", error); // ✅ Log the error

    return ResponseSender("Internal Server Error", 500);
  }
}
