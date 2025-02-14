import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const USER = mongoose.models.User || mongoose.model("User", UserSchema);

export default USER;
