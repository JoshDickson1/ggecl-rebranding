import dotenv from "dotenv";
import app from "./app";

dotenv.config()

const PORT = process.env.PORT || 4000

async function start() {

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
  })

  
}

start()
