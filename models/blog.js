import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, required: true },
});

export const Blog = model("Blog", blogSchema);
