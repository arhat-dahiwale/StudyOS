// src/modules/auth/auth.routes.ts
import { Router } from "express"
import { validationResult } from "express-validator"
import { authController } from "./auth.controller"
import { registerValidator, loginValidator } from "./auth.validation"
import { validate } from "../../middleware/validate.middleware"

const router = Router();

router.post("/register",registerValidator,validate, authController.register);

router.post("/login",loginValidator,validate, authController.login);

export default router