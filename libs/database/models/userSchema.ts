import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
  password: String,
  phoneNumber: String,
});

const USER = mongoose.models.User || mongoose.model("User", UserSchema);

export default USER;
