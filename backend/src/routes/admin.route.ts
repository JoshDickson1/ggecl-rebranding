import { Router } from "express"
import { Admin } from "../models/admin.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" })
  }

  const admin = await Admin.findOne({ email })
  if (!admin || !admin.password) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const valid = await bcrypt.compare(String(password), admin.password)
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  )

  res.json({ token })
})

// Logout (stateless)
router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out" })
})

export default router
