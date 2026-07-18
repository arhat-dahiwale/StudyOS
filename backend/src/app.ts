// src/app.ts
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { notFoundHandler } from "./middleware/not-found.middleware"
import { errorHandler } from "./middleware/error.middleware"
import authRoutes from "../src/modules/auth/auth.routes"
import userRoutes from "../src/modules/users/users.routes"
import userSettingsRoutes from "./modules/user-settings/user-settings.routes"
import subjectsRoutes from "./modules/subjects/subjects.routes"
import notesRoutes from "./modules/notes/notes.routes"
import assignmentsRoutes from "./modules/assignments/assignments.routes"
import studySessionsRoutes from "./modules/study-sessions/study-sessions.routes"
import dashboardRoutes from "./modules/dashboard/dashboard.routes"






const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/user-settings", userSettingsRoutes)
app.use("/subjects", subjectsRoutes)
app.use("/notes", notesRoutes)
app.use("/assignments", assignmentsRoutes)
app.use("/study-sessions", studySessionsRoutes)
app.use("/dashboard", dashboardRoutes)



app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyOS API is running",
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app