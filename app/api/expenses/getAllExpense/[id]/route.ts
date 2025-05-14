import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../../utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";
import mongoose from "mongoose";

export async function GET(req: Request, props: any) {
  try {
    const userId = (await props.params).id;
    const objectId = new mongoose.Types.ObjectId(userId);
    await connectDB();

    // Debug: Check all expenses for total
    const allExpenses = await EXPENSES.find({ userId: objectId });

    return ResponseSender("Success", 200, allExpenses);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
