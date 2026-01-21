import dotenv from "dotenv"
import app from "./app"
import { connectDB } from "./lib/db"

dotenv.config()

const PORT = process.env.PORT || 4000

async function start() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
  })
}

start()
