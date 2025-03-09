import mongoose from "mongoose";

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
});

const USER = mongoose.models.User || mongoose.model("User", UserSchema);

export default USER;
