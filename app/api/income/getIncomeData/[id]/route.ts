import INCOME from "@/libs/database/models/incomeSchema";
import { ResponseSender } from "../../../utils/responseSender";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const userId = (await props.params).id;

  const income = await INCOME.find({ userId });

  const allIncome = {
    totalIncome: income[0].totalIncome,
    ...income[0].otherIncome,
    ...income[0].monthlyIncome,
  };
  const formattedIncome = Object.keys(allIncome)
    .filter((key) => key !== "totalIncome")
    .reduce((acc, key) => {
      const doc = allIncome[key]._doc ? allIncome[key]._doc : allIncome[key]; // Extract raw data

      acc[key] = {
        ...doc,
        dateAdded: new Date(doc.dateAdded).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };
      return acc;
    }, {} as Record<string, any>);
  formattedIncome.totalIncome = allIncome.totalIncome;
  console.log(formattedIncome);

  return ResponseSender("Success", 200, formattedIncome);
}
