// src/modules/users/users.validation.ts
import { body } from "express-validator"

export const updateProfileValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("profilePic")
    .optional()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),
]