import { Router } from "express"
import { Admin } from "../models/admin.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(401).json({ message: "Invalid credentials" })

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  })

  res.json({ token })
})

// Logout (stateless JWT—frontend removes token)
router.post("/logout", (_, res) => {
  res.json({ message: "Logged out successfully" })
})

export default router
