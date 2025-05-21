import { ResponseSender } from "@/app/api/utils/responseSender";
import INCOME from "@/libs/database/models/incomeSchema";
import { connectDB } from "@/libs/database/mongo";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await props.params).id;
    await connectDB();

    await INCOME.findByIdAndDelete({ _id: id });
    return ResponseSender("Deleted", 200);
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}
