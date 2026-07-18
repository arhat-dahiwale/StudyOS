// @ts-ignore
import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

export const db = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

export async function connectDB() {
  try {
    await db.query("SELECT 1")
    console.log("✅ Connected to PostgreSQL")
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL")
    console.error(error)
    process.exit(1)
  }
}