import { ResponseSender } from "@/app/api/utils/responseSender";
import { TokenValidator } from "@/app/api/utils/tokenValidator";
import { connectDB } from "@/libs/database/mongo";

export async function GET() {
  try {
    const tokenValidation = await TokenValidator();
    if (!tokenValidation.success) {
      return ResponseSender("Please Login Again", 404);
    }
    await connectDB();
    // const allExpense=
  } catch (error) {
    return ResponseSender("Internal Server Error", 500);
  }
}
