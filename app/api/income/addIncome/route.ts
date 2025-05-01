import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";
import USER from "@/libs/database/models/userSchema";
import INCOME from "@/libs/database/models/incomeSchema";

const incomeSchema = z.object({
  incomeName: z.string().min(1, "Income name is required"),
  income: z.number().positive("Income must be a positive number"),
  userId: z.string().length(24, "Invalid user ID"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    data.income = Number(data.income);
    const validation = incomeSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation Error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Map date to reccurenceDate
    const updateData = {
      userId: data.userId,
      incomeName: data.incomeName,
      income: data.income,
    };
    console.log(updateData);

    await connectDB();

    if (data.isMonthlyIncome) {
      const updatedUserIncome = await USER.findByIdAndUpdate(
        updateData.userId,
        {
          $push: {
            monthlyIncome: {
              incomeName: updateData.incomeName,
              income: updateData.income,
              reccurenceDate: data.date,
            },
          },
        }
      );
      if (data.isIncluded) {
        const result = new INCOME(updateData);
        await result.save();
      }

      return NextResponse.json(
        { message: "Income updated successfully" },
        { status: 200 }
      );
    }
    // Update the specific otherExpense entry
    const result = new INCOME(updateData);
    await result.save();

    return NextResponse.json(
      { message: "Income updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
