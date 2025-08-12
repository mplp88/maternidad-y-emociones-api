import express from "express";
import axios from "axios";
import multer from "multer";
import crypto from "crypto";
import { config } from "dotenv";
import { verifyToken } from "../middleware/authMiddleware.js";
import FormData from "form-data";

config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    // Generar la signature
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${API_SECRET}`)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", req.file.buffer, { filename: req.file.originalname });
    formData.append("timestamp", timestamp);
    formData.append("api_key", API_KEY);
    formData.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
