import { Router } from "express"
import { Blog } from "../models/blog.model"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

// Create blog
router.post("/", authMiddleware, async (req, res) => {
  const { title, content, author } = req.body
  const blog = await Blog.create({ title, content, author })
  res.status(201).json(blog)
})

// Get all blogs
router.get("/", async (_, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 })
  res.json(blogs)
})

// Delete blog
router.delete("/:id", authMiddleware, async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if (!blog) return res.status(404).json({ message: "Not found" })
  res.json({ message: "Deleted" })
})

export default router
