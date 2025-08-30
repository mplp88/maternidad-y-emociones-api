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
  const { title, content, author, summary, imageUrls, links } = req.body;
  const blog = new Blog({ title, content, author, summary, imageUrls, links });
  await blog.save();
  res.status(201).json(blog);
});

router.put("/:slug", verifyToken, async (req, res) => {
  const { title, content, author, summary, imageUrls, slug, links } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        author,
        summary,
        imageUrls,
        links,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Post not found" });
    res.json({ blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:slug/comments", async (req, res) => {
  const { slug } = req.params;
  const { comment } = req.body;

  if (!comment.author || !comment.content) {
    return res
      .status(400)
      .json({ ok: false, error: "Author and content are required" });
  }

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ ok: false, error: "Post not found" });

    blog.comments.push(comment);
    await blog.save();

    res.status(200).json({ ok: true, comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.delete("/:slug/comments/:commentId", async (req, res) => {
  const { slug, commentId } = req.params;

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ ok: false, error: "Post not found" });

    blog.comments = blog.comments.filter((comment) => comment._id.toString() !== commentId);
    await blog.save();

    res.status(200).json({ ok: true, comments: blog.comments });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

router.put("/:slug/like", async (req, res) => {
  const { slug } = req.params;
  const { clientId } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: "Client ID is required" });
  }

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ error: "Post not found" });

    const alreadyLiked = blog.likes.includes(clientId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter((id) => id !== clientId);
      await blog.save();
      return res.json({ liked: false });
    } else {
      blog.likes.push(clientId);
      await blog.save();
      return res.json({ liked: true });
    }
  } catch (error) {
    console.error("Error adding like:", error);
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
