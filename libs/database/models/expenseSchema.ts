import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["daily", "monthly"],
    required: true,
  },
  recurrence: {
    type: Object,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const EXPENSES =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default EXPENSES;
