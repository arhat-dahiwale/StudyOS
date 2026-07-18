// src/modules/user-settings/user-settings.validation.ts
import { body } from "express-validator"

export const updateUserSettingsValidator = [
  body("theme")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Invalid theme"),

  body("dailyGoalMinutes")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Daily goal must be at least 1 minute"),

  body("weekStart")
    .optional()
    .isIn(["Monday", "Sunday"])
    .withMessage("Invalid week start"),
]