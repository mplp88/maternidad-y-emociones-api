import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Blog } from "../models/blog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const order = req.query.order || "desc";
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { title, content, author, summary, imageUrl } = req.body;
  const blog = new Blog({ title, content, author, summary, imageUrl });
  await blog.save();
  res.status(201).json(blog);
});

router.put('/:slug', verifyToken, async (req, res) => {
  const { title, content, author, summary, imageUrl, slug } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { title, content, author, summary, imageUrl },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json({ blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
