import { Schema, model } from "mongoose";
import slugify from "slugify";

const linkSchema = new Schema({
  instagram: { type: String, required: false },
  facebook: { type: String, required: false },
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: String, required: true },
  imageUrl: { type: String, required: false },
  imageUrls: { type: [String], required: false },
  slug: { type: String, required: true, unique: true },
  links: { type: linkSchema, required: false },
});

blogSchema.pre("validate", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog = model("Blog", blogSchema);
