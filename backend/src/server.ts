import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import { connectDB } from "./database/db"

const PORT = process.env.PORT || 3001

async function startServer() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}

startServer()