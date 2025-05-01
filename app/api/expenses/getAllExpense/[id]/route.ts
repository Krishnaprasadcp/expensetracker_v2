import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../../utils/responseSender";
import EXPENSES from "@/libs/database/models/expenseSchema";
import mongoose from "mongoose";

export async function GET(req:Request, props:any) {
  try {
    const userId = (await props.params).id;
    const objectId = new mongoose.Types.ObjectId(userId);
    await connectDB();

    // Date setup (UTC to match MongoDB)
    const todayDate = new Date();
    todayDate.setUTCHours(0, 0, 0, 0);

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setUTCDate(todayDate.getUTCDate() + 1);

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setUTCDate(todayDate.getUTCDate() - 1);

    const currentMonthStart = new Date(
      Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth(), 1)
    );
    const nextMonthStart = new Date(
      Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth() + 1, 1)
    );
    const previousMonthStart = new Date(
      Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth() - 1, 1)
    );

    // Debug: Log dates
    console.log({
      previousMonthStart: previousMonthStart.toISOString(),
      currentMonthStart: currentMonthStart.toISOString(),
      nextMonthStart: nextMonthStart.toISOString(),
      yesterdayDate: yesterdayDate.toISOString(),
      todayDate: todayDate.toISOString(),
      tomorrowDate: tomorrowDate.toISOString(),
    });

    // Debug: Check expenses for monthly range
    const monthlyExpenses = await EXPENSES.find({
      userId: objectId,
      createdAt: {
        $gte: previousMonthStart,
        $lt: nextMonthStart,
      },
    });
    console.log("Monthly expenses:", monthlyExpenses);

    // Debug: Check expenses for yesterday
    const yesterdayExpenses = await EXPENSES.find({
      userId: objectId,
      createdAt: {
        $gte: yesterdayDate,
        $lt: todayDate,
      },
    });
    console.log("Yesterday expenses:", yesterdayExpenses);

    // Debug: Check all expenses for total
    const allExpenses = await EXPENSES.find({ userId: objectId });
    console.log("All expenses:", allExpenses);

    const result = await EXPENSES.aggregate([
      {
        $match: {
          userId: objectId,
        },
      },
      {
        $facet: {
          daily: [
            {
              $match: {
                createdAt: {
                  $gte: yesterdayDate,
                  $lt: tomorrowDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  $cond: {
                    if: { $gte: ["$createdAt", todayDate] },
                    then: "today",
                    else: "yesterday",
                  },
                },
                total: { $sum: "$price" },
              },
            },
            {
              $group: {
                _id: null,
                todayExpense: {
                  $sum: {
                    $cond: {
                      if: { $eq: ["$_id", "today"] },
                      then: "$total",
                      else: 0,
                    },
                  },
                },
                yesterdayExpense: {
                  $sum: {
                    $cond: {
                      if: { $eq: ["$_id", "yesterday"] },
                      then: "$total",
                      else: 0,
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                todayExpense: 1,
                yesterdayExpense: 1,
              },
            },
          ],
          monthly: [
            {
              $match: {
                createdAt: {
                  $gte: previousMonthStart,
                  $lt: nextMonthStart,
                },
              },
            },
            {
              $group: {
                _id: {
                  category: "$category",
                  period: {
                    $cond: {
                      if: { $gte: ["$createdAt", currentMonthStart] },
                      then: "current",
                      else: "previous",
                    },
                  },
                },
                total: { $sum: "$price" },
              },
            },
            {
              $group: {
                _id: "$_id.category",
                currentMonthTotal: {
                  $sum: {
                    $cond: {
                      if: { $eq: ["$_id.period", "current"] },
                      then: "$total",
                      else: 0,
                    },
                  },
                },
                previousMonthTotal: {
                  $sum: {
                    $cond: {
                      if: { $eq: ["$_id.period", "previous"] },
                      then: "$total",
                      else: 0,
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 1,
                currentMonthTotal: 1,
                previousMonthTotal: 1,
                difference: { $subtract: ["$currentMonthTotal", "$previousMonthTotal"] },
              },
            },
            {
              $group: {
                _id: null,
                currentAndPreviousMonthTotal: { $push: "$$ROOT" },
              },
            },
            {
              $project: {
                _id: 0,
                currentAndPreviousMonthTotal: 1,
              },
            },
          ],
          total: [
            {
              $group: {
                _id: null,
                totalExpense: { $sum: "$price" },
              },
            },
            {
              $project: {
                _id: 0,
                totalExpense: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          todayExpense: { $arrayElemAt: ["$daily.todayExpense", 0] },
          yesterdayExpense: { $arrayElemAt: ["$daily.yesterdayExpense", 0] },
          currentAndPreviousMonthTotal: {
            $arrayElemAt: ["$monthly.currentAndPreviousMonthTotal", 0],
          },
          totalExpense: { $arrayElemAt: ["$total.totalExpense", 0] },
        },
      },
    ]);

    // Debug: Log raw aggregation result
    console.log("Aggregation result:", JSON.stringify(result, null, 2));

    return ResponseSender(
      "Success",
      200,
      result[0] || {
        todayExpense: 0,
        yesterdayExpense: 0,
        currentAndPreviousMonthTotal: [],
        totalExpense: 0,
      }
    );
  } catch (error) {
    console.log(error);
    return ResponseSender("Internal server Error", 500);
  }
}