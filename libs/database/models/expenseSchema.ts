import mongoose from "mongoose";

// Define the ExpenseEntry interface for TypeScript
interface IExpenseEntry {
  _id: mongoose.Types.ObjectId; // Add _id for subdocument
  expenseName: string;
  category: string;
  price: number;
  createdAt: Date;
}

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  expenseName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },

});

const EXPENSES =
  mongoose.models.Expense ||
  mongoose.model<IExpenseEntry>("Expense", ExpenseSchema);
export default EXPENSES;
