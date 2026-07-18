// src/modules/subjects/subjects.validation.ts
import { body } from "express-validator"

export const createSubjectValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required"),

  body("color")
    .trim()
    .notEmpty()
    .withMessage("Color is required"),

  body("icon")
    .trim()
    .notEmpty()
    .withMessage("Icon is required"),

  body("semester")
    .optional()
    .trim(),
]

export const updateSubjectValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subject name cannot be empty"),

  body("color")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Color cannot be empty"),

  body("icon")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Icon cannot be empty"),

  body("semester")
    .optional()
    .trim(),
]