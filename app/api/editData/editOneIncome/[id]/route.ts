import { ResponseSender } from "@/app/api/utils/responseSender";
import INCOME from "@/libs/database/models/incomeSchema";
import { connectDB } from "@/libs/database/mongo";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const data = await req.json();
    const id = (await props.params).id;
    await connectDB();
    const editedIncome = await INCOME.findByIdAndUpdate(id , data,{new:true});
    return ResponseSender("Success", 200, editedIncome);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
