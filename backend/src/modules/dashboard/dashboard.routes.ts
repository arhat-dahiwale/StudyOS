// src/modules/dashboard/dashboard.routes.ts
import { Router } from "express"

import { authMiddleware } from "../../middleware/auth.middleware"

import { dashboardController } from "./dashboard.controller"

const router = Router()

router.get(
  "/summary",
  authMiddleware,
  dashboardController.getSummary
)

export default router