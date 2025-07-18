import EXPENSES from "@/libs/database/models/expenseSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";
import USER from "@/libs/database/models/userSchema";

const expenseSchema = z.object({
  expenseName: z.string().min(1, "Expense name is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  userId: z.string().length(24, "Invalid user ID"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    data.price = Number(data.price);
    const validation = expenseSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation Error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Normalize category
    data.category =
      data.category.trim().charAt(0).toUpperCase() +
      data.category.trim().slice(1).toLowerCase();

    // Map date to reccurenceDate
    const updateData = {
      userId: data.userId,
      expenseName: data.expenseName,
      category: data.category,
      price: data.price,
    };
    // console.log(updateData);

    await connectDB();

    if (data.isMonthlyExpense) {
      const updatedUserExpense = await USER.findByIdAndUpdate(
        updateData.userId,
        {
          $push: {
            monthlyExpense: {
              expenseName: updateData.expenseName,
              category: updateData.category,
              price: updateData.price,
              reccurenceDate: data.date,
            },
          },
        }
      );
      if (data.isIncluded) {
        const result = new EXPENSES(updateData);
        await result.save();
      }

      return NextResponse.json(
        { message: "Expense updated successfully" },
        { status: 200 }
      );
    }
    // Update the specific otherExpense entry
    const result = new EXPENSES(updateData);
    await result.save();

    return NextResponse.json(
      { message: "Expense updated successfully" },
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
