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

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfToday = new Date(startOfToday);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );
    endOfCurrentMonth.setHours(23, 59, 59, 999);

    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const currentMonth = now.getMonth() + 1; // Get current month (1-based)
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Handle January case

    const allExpense = await EXPENSES.aggregate([
      { $match: { userId: objectId } },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$price" },
        },
      },
    ]);
    const todayExpense = await EXPENSES.aggregate([
      {
        $match: {
          userId: objectId,
          date: {
            $gte: startOfToday,
            $lte: endOfToday,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);
    const yesterdayExpense = await EXPENSES.aggregate([
      {
        $match: {
          userId: objectId,
          date: {
            $gte: startOfYesterday,
            $lte: endOfYesterday,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);
    const expensesByCategory = await EXPENSES.aggregate([
      {
        $match: {
          userId: objectId,
          date: { $gte: startOfPreviousMonth, $lte: endOfCurrentMonth },
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            month: { $month: "$date" },
          },
          totalExpense: {
            $sum: "$price",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          expenses: {
            $push: {
              month: {
                $cond: [
                  { $eq: ["$_id.month", currentMonth] },
                  "currentMonth",
                  "previousMonth",
                ],
              },
              totalExpense: "$totalExpense",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          expenses: {
            $arrayToObject: {
              $map: {
                input: "$expenses",
                as: "exp",
                in: [
                  "$$exp.month",
                  {
                    totalExpense: "$$exp.totalExpense",
                    count: "$$exp.count",
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          extraSpent: {
            $subtract: [
              { $ifNull: ["$expenses.currentMonth.totalExpense", 0] },
              { $ifNull: ["$expenses.previousMonth.totalExpense", 0] },
            ],
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return ResponseSender("Success", 200, {
      todayExpense,
      yesterdayExpense,
      expensesByCategory,
      allExpense,
    });
  } catch (error) {
    return ResponseSender("Internal server Error", 500);
  }
}
