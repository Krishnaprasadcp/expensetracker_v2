import EXPENSES from "@/libs/database/models/expenseSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";
const expenseSchema = z.object({
  expenseName: z.string().min(1, "Expense name is required"), // Must be a non-empty string
  price: z.number().positive("Price must be a positive number"), // Must be a positive number
  category: z.string().min(1, "Category is required"), // Must be a non-empty string
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"), // Check if valid date
  userId: z.string().length(24, "Invalid user ID"), // Must be a valid 24-character MongoDB ObjectId
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
    await connectDB();
    const newExpense = new EXPENSES(data);
    await newExpense.save();
    return NextResponse.json({ message: "Data recieved" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal serer error " },
      { status: 500 }
    );
  }
}
