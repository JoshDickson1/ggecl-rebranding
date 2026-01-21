import { Schema, model } from "mongoose"

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
  },
  { timestamps: true }
)

export const Admin = model("Admin", adminSchema)
