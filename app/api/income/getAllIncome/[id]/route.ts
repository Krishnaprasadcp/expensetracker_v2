import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../../utils/responseSender";
import mongoose from "mongoose";
import INCOME from "@/libs/database/models/incomeSchema";

export async function GET(req: Request, props: any) {
  try {
    const userId = (await props.params).id;
    const objectId = new mongoose.Types.ObjectId(userId);
    await connectDB();

    // Debug: Check all expenses for total
    const allIncome = await INCOME.find({ userId: objectId });

    return ResponseSender("Success", 200, allIncome);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
