import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { Admin } from "./models/admin.model"

dotenv.config()

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("MongoDB connected")

    const existing = await Admin.findOne({ email: "jodicksonjoshua@gmail.com" })
    if (existing) {
      console.log("Admin already exists")
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash("123456", 10)

    const admin = await Admin.create({
      email: "jodicksonjoshua@gmail.com",
      password: hashedPassword,
    })

    console.log("Admin created:", admin.email)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seedAdmin()
