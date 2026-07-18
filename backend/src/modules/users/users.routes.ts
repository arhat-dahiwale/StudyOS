// src/modules/users/users.routes.ts
import { Router } from "express"

import { validate } from "../../middleware/validate.middleware"

import { usersController } from "./users.controller"
import { updateProfileValidator } from "./users.validation"
import { authMiddleware } from "../../middleware/auth.middleware"

const router = Router()

router.get(
  "/me",
  authMiddleware,
  usersController.getProfile
)

router.patch(
  "/me",
  authMiddleware,
  updateProfileValidator,
  validate,
  usersController.updateProfile
)

export default router