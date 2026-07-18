// src/modules/assignments/assignments.routes.ts
import { Router } from "express"

import { authMiddleware } from "../../middleware/auth.middleware"
import { validate } from "../../middleware/validate.middleware"

import { assignmentsController } from "./assignments.controller"

import {
  createAssignmentValidator,
  updateAssignmentValidator,
  updateAssignmentStatusValidator,
} from "./assignments.validation"

const router = Router()

router.post(
  "/",
  authMiddleware,
  createAssignmentValidator,
  validate,
  assignmentsController.createAssignment
)

router.get(
  "/",
  authMiddleware,
  assignmentsController.getAllAssignments
)

router.get(
  "/:id",
  authMiddleware,
  assignmentsController.getAssignmentById
)

router.patch(
  "/:id",
  authMiddleware,
  updateAssignmentValidator,
  validate,
  assignmentsController.updateAssignment
)

router.patch(
  "/:id/status",
  authMiddleware,
  updateAssignmentStatusValidator,
  validate,
  assignmentsController.updateAssignmentStatus
)

router.delete(
  "/:id",
  authMiddleware,
  assignmentsController.deleteAssignment
)

export default router