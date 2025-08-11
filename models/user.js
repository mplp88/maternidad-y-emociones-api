
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export const User = model("User", userSchema);
