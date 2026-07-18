// src/modules/auth/auth.validation.ts
import { body } from "express-validator"

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),
]

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
]