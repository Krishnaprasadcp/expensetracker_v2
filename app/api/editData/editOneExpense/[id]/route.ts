import { ResponseSender } from "@/app/api/utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";
import { connectDB } from "@/libs/database/mongo";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const data = await req.json();
    const id = (await props.params).id;
    await connectDB();
    const editedExpense = await EXPENSES.findByIdAndUpdate(id , data,{new:true});
    return ResponseSender("Success", 200, editedExpense);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
