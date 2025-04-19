import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../../utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await props.params).id;
    const objectId = new mongoose.Types.ObjectId(userId);
    await connectDB();

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    const totalExpense = await EXPENSES.aggregate([
      {
        $match: {
          userId: objectId,
        },
      },
      {
        $project: {
          totalExpens: "$totalExpense",
          otherExpenses: "$otherExpense",
          todayExpense: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$otherExpense",
                    as: "expense",
                    cond: {
                      $and: [
                        { $gte: ["$$expense.createdAt", todayDate] },
                        { $lt: ["$$expense.createdAt", tomorrowDate] },
                      ],
                    },
                  },
                },
                as: "expense",
                in: "$$expense.price",
              },
            },
          },
          yesterdayExpense: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$otherExpense",
                    as: "expense",
                    cond: {
                      $and: [
                        { $gte: ["$$expense.createdAt", tomorrowDate] },
                        { $lt: ["$$expense.createdAt", todayDate] },
                      ],
                    },
                  },
                },
                as: "expense",
                in: "$$expense.price",
              },
            },
          },
        },
      },
    ]);
    return ResponseSender("Success", 200, {
      totalExpense,
    });
  } catch (error) {
    console.log(error);

    return ResponseSender("Internal server Error", 500);
  }
}
