import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../../utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await props.params).id;
    await connectDB();
    const allExpense = await EXPENSES.find({ userId });
    return ResponseSender("Success", 200, allExpense);
  } catch (error) {
    return ResponseSender("Internal server Error", 500);
  }
}
