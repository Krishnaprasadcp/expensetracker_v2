import mongoose from "mongoose";

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

const USER = mongoose.models.User || mongoose.model("User", UserSchema);

export default USER;
