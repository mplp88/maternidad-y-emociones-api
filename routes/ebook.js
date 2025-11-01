import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Ebook } from "../models/ebook.js";
import axios from "axios";
import multer from "multer";
import crypto from "crypto";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const order = req.query.order || "desc";
  try {
    const ebooks = await Ebook.find()
      .sort({ createdAt: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    res.json({ ebooks });
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//TODO: Test Upload
router.post("/", verifyToken, async (req, res) => {
  const { title, description, downloadUrl, author, coverImage, slug, isFree } =
    req.body;

  const ebook = new Ebook({
    title,
    description,
    downloadUrl,
    author,
    coverImage,
    slug,
    isFree,
  });

  await ebook.save();
  res.status(201).json(ebook);
});

//TODO: Test Cover Upload
router.post("/upload/cover-image", verifyToken, upload.single("file"), async (req, res) => {
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

//TODO: Test File Upload
router.post("/upload/file", verifyToken, upload.single("file"), async (req, res) => {
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
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
    });
    formData.append("timestamp", timestamp);
    formData.append("api_key", API_KEY);
    formData.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register-download/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const ebook = await Ebook.findOne({ slug });
    if (!ebook) {
      return res.status(404).json({ error: "Ebook not found" });
    }
    ebook.downloads += 1;
    await ebook.save();
    res.json({ message: "Download registered", downloads: ebook.downloads });
  } catch (error) {
    console.error("Error registering download:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

export default router;
