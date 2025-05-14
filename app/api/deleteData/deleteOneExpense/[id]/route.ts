import { ResponseSender } from "@/app/api/utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";
import { connectDB } from "@/libs/database/mongo";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await props.params).id;
    await connectDB();

    await EXPENSES.findByIdAndDelete({ _id: id });
    return ResponseSender("Deleted", 200);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
