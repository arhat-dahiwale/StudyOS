// src/modules/study-sessions/study-sessions.routes.ts
import { Router } from "express"

import { authMiddleware } from "../../middleware/auth.middleware"
import { validate } from "../../middleware/validate.middleware"

import { studySessionsController } from "./study-sessions.controller"
import { startStudySessionValidator } from "./study-sessions.validation"

const router = Router()

router.post(
  "/start",
  authMiddleware,
  startStudySessionValidator,
  validate,
  studySessionsController.startSession
)

router.patch(
  "/:id/pause",
  authMiddleware,
  studySessionsController.pauseSession
)

router.patch(
  "/:id/resume",
  authMiddleware,
  studySessionsController.resumeSession
)

router.patch(
  "/:id/end",
  authMiddleware,
  studySessionsController.endSession
)

router.get(
  "/",
  authMiddleware,
  studySessionsController.getAllSessions
)

router.get(
  "/:id",
  authMiddleware,
  studySessionsController.getSessionById
)

export default router