import INCOME, { Income } from "@/libs/database/models/incomeSchema";
import { ResponseSender } from "../../utils/responseSender";
interface BODYDATA {
  otherIncomeName: string;
  otherIncome: number;
  userId: string;
}
export async function POST(req: Request) {
  try {
    const resData: BODYDATA = await req.json();
    if (
      !resData.otherIncomeName ||
      typeof resData.otherIncomeName !== "string" ||
      typeof resData.otherIncome !== "number" ||
      isNaN(resData.otherIncome)
    ) {
      return ResponseSender(
        "Invalid data: otherIncome must be a valid number",
        400
      );
    }
    let userIncome: Income | null = await INCOME.findOne({
      userId: resData.userId,
    });

    if (!userIncome) {
      userIncome = new INCOME({
        userId: resData.userId,
        otherIncome: [
          { name: resData.otherIncomeName, income: resData.otherIncome },
        ],
      });
    } else {
      userIncome.otherIncome?.push({
        name: resData.otherIncomeName,
        income: resData.otherIncome,
      });
    }
    await userIncome?.save();
    return ResponseSender("Success", 200, userIncome);
  } catch (error) {
    return ResponseSender("Internal server Error", 400);
  }
}
