// src/modules/user-settings/user-settings.routes.ts
import { Router } from "express"

import { validate } from "../../middleware/validate.middleware"

import { userSettingsController } from "./user-settings.controller"
import { updateUserSettingsValidator } from "./user-settings.validation"
import { authMiddleware } from "../../middleware/auth.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  userSettingsController.getSettings
)

router.patch(
  "/",
  authMiddleware,
  updateUserSettingsValidator,
  validate,
  userSettingsController.updateSettings
)

export default router