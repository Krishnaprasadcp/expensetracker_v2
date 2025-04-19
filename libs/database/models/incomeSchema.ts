import mongoose from "mongoose";
interface Income extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  monthlyIncome?: {
    name: string;
    income: number;
  }[];
  otherIncome?: {
    name: string;
    income: number;
  }[];
  totalIncome: number;
}

const IncomeEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  income: { type: Number, required: true },
  addToThisMonth: { type: Boolean, default: true, required: true },
  reccurenceDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});
const IncomeSchema = new mongoose.Schema<Income>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monthlyIncome: [IncomeEntrySchema],
  otherIncome: [IncomeEntrySchema],
  totalIncome: {
    type: Number,
    default: 0.0,
  },
});

IncomeSchema.pre("save", function (next) {
  this.totalIncome =
    (this.monthlyIncome?.reduce((sum, entry) => sum + entry.income, 0) || 0) +
    (this.otherIncome?.reduce((sum, entry) => sum + entry.income, 0) || 0);
  next();
});

const INCOME =
  mongoose.models.Income || mongoose.model<Income>("Income", IncomeSchema);
export default INCOME;
export type { Income };
