// src/modules/notes/notes.routes.ts
import { Router } from "express"

import { authMiddleware } from "../../middleware/auth.middleware"
import { validate } from "../../middleware/validate.middleware"

import { notesController } from "./notes.controller"
import {
  createNoteValidator,
  updateNoteValidator,
} from "./notes.validation"

const router = Router()

router.post(
  "/",
  authMiddleware,
  createNoteValidator,
  validate,
  notesController.createNote
)

router.get(
  "/",
  authMiddleware,
  notesController.getAllNotes
)

router.get(
  "/:id",
  authMiddleware,
  notesController.getNoteById
)

router.patch(
  "/:id",
  authMiddleware,
  updateNoteValidator,
  validate,
  notesController.updateNote
)

router.patch(
  "/:id/archive",
  authMiddleware,
  notesController.archiveNote
)

router.patch(
  "/:id/unarchive",
  authMiddleware,
  notesController.unarchiveNote
)

router.delete(
  "/:id",
  authMiddleware,
  notesController.deleteNote
)

export default router