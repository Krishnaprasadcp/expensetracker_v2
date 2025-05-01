import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  incomeName: { type: String, required: true },
  income: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const INCOME = mongoose.models.Income || mongoose.model("Income", IncomeSchema);
export default INCOME;
