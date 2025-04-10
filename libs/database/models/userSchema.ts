import mongoose from "mongoose";
import INCOME from "./incomeSchema";
import EXPENSES from "./expenseSchema";

const categorySchema = new mongoose.Schema({
  option: { type: String, required: true },
  value: { type: String, required: true, lowercase: true },
});

const UserSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  phoneNumber: {
    type: String,
  },
  categories: {
    type: [categorySchema],
    default: [
      { option: "Food", value: "food" },
      { option: "Stationery", value: "stationery" },
      { option: "Bakery", value: "bakery" },
      { option: "Vegitables", value: "vegitables" },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre(
  "deleteOne",
  {
    document: true,
    query: false,
  },
  async function (next) {
    const user = this;
    console.log(user._id);

    await INCOME.deleteMany({ userId: user._id });
    await EXPENSES.deleteMany({ userId: user._id });
    next();
  }
);
const USER = mongoose.models.User || mongoose.model("User", UserSchema);

export default USER;
