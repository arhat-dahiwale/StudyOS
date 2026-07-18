// src/modules/study-sessions/study-sessions.validation.ts
import { body } from "express-validator"

export const startStudySessionValidator = [
  body("subjectId")
    .notEmpty()
    .withMessage("Subject is required"),

  body("assignmentId")
    .optional()
    .isUUID()
    .withMessage("Invalid assignment ID"),
]