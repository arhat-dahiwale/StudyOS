// src/modules/subjects/subjects.routes.ts
import { Router } from "express"

import { authMiddleware } from "../../middleware/auth.middleware"
import { validate } from "../../middleware/validate.middleware"

import { subjectsController } from "./subjects.controller"
import {
  createSubjectValidator,
  updateSubjectValidator,
} from "./subjects.validation"

const router = Router()

router.post(
  "/",
  authMiddleware,
  createSubjectValidator,
  validate,
  subjectsController.createSubject
)

router.get(
  "/",
  authMiddleware,
  subjectsController.getAllSubjects
)

router.get(
  "/:id",
  authMiddleware,
  subjectsController.getSubjectById
)

router.patch(
  "/:id",
  authMiddleware,
  updateSubjectValidator,
  validate,
  subjectsController.updateSubject
)

router.delete(
  "/:id",
  authMiddleware,
  subjectsController.deleteSubject
)

export default router