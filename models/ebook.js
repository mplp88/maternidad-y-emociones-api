import { Schema, model } from "mongoose";
import slugify from "slugify";

const ebookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      default: Date.now,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "Maternidad y Emociones",
    },
    coverImage: {
      type: String,
      default: "", // URL de una imagen de portada del ebook
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isFree: {
      type: Boolean,
      default: true, // para diferenciar los gratuitos de los pagos en el futuro
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

ebookSchema.pre("validate", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Ebook = model("Ebook", ebookSchema);
