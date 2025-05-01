import USER from "@/libs/database/models/userSchema";
import { connectDB } from "@/libs/database/mongo";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "../../utils/helperPassword";
import { CreateToken } from "../../utils/createToken";
import EXPENSES from "@/libs/database/models/expenseSchema";
import INCOME from "@/libs/database/models/incomeSchema";

interface MONTHLYEXPENSE_DATA_OBJECT {
  expenseName: string;
  category: string;
  price: number;
  date: string;
  checkBox: boolean;
}
interface MONTHLY_INCOME_DATA_OBJECT {
  incomeName: string;
  income: number;
  date: string;
  checkBox: boolean;
}
interface FORM_DATA {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
}
interface BODYDATA {
  monthlyExpenseDatas: MONTHLYEXPENSE_DATA_OBJECT[];
  monthlyIncomeData: MONTHLY_INCOME_DATA_OBJECT[];
  formData: FORM_DATA;
}
const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" }),
  secondName: z.string().min(2, {
    message: "Second name must contain at least 2 characters",
  }),
  email: z.string().email({ message: "Invalid format of email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Must contain at least one special character",
    }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Number must contain 10 digits" })
    .max(10, { message: "Phone number should not exceed 10 digits" }),
});

export async function POST(req: Request) {
  try {
    const bodyData: BODYDATA = await req.json();
    console.log(bodyData);

    const parsedData = signUpSchema.safeParse(bodyData.formData);
    if (!parsedData.success) {
      console.error("Validation Error:", parsedData.error.issues);
      return NextResponse.json(
        { message: "Validation failed", errors: parsedData.error.issues },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(parsedData.data.password);
    const userData = {
      ...parsedData.data,
      password: hashedPassword,
      monthlyExpense: [...bodyData.monthlyExpenseDatas],
      monthlyIncome: [...bodyData.monthlyIncomeData],
    };

    await connectDB();
    const newUser = new USER(userData);
    await newUser.save();

    if (bodyData.monthlyExpenseDatas.length > 0) {
      bodyData.monthlyExpenseDatas.forEach(async (expense) => {
        if (expense.checkBox) {
          const EXPENSE = new EXPENSES({
            userId: newUser._id,
            expenseName: expense.expenseName,
            category: expense.category,
            price: expense.price,
          });
          await EXPENSE.save();
          await USER.findByIdAndUpdate(newUser._id, {
            $inc: { totalExpense: EXPENSE.price },
          });
        }
      });
    }

    if (bodyData.monthlyIncomeData.length > 0) {
      bodyData.monthlyIncomeData.forEach(async (income) => {
        if (income.checkBox) {
          const newIncome = new INCOME({
            userId: newUser._id,
            incomeName: income.incomeName,
            income: income.income,
          });
          await newIncome.save();
          await USER.findByIdAndUpdate(newUser._id, {
            $inc: { totalIncome: newIncome.income },
          });
        }
      });
    }
    // const token = await CreateToken(newUser.id);

    return NextResponse.json(
      { message: "Signup successfull", user: newUser },
      { status: 200 }
    );
    // return NextResponse.json(
    //   { message: "Signup successfull", user: userData },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
