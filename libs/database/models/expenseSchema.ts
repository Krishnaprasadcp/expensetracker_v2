import mongoose from "mongoose";

const ExpenseEntrySchema = new mongoose.Schema({
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
  reccurenceDate: { type: Date },

  createdAt: { type: Date, default: Date.now },
});
const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  monthlyExpense: [ExpenseEntrySchema],
  otherExpense: [ExpenseEntrySchema],
  totalExpense: {
    type: Number,
    default: 0.0,
  },
});

ExpenseSchema.pre("save", function (next) {
  this.totalExpense =
    (this.monthlyExpense?.reduce((sum, entry) => sum + entry.price, 0) || 0) +
    (this.otherExpense?.reduce((sum, entry) => sum + entry.price, 0) || 0);
  next();
});
const EXPENSES =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
export default EXPENSES;
