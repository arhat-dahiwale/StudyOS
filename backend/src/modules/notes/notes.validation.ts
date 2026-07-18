// src/modules/notes/notes.validation.ts
import { body } from "express-validator"

export const createNoteValidator = [
  body("subjectId")
    .notEmpty()
    .withMessage("Subject is required"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required"),
]

export const updateNoteValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty"),
]