// src/modules/auth/auth.controller.ts
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
    async register(req: Request, res:Response, next:NextFunction) {
        try {
            const {email, password, fullName} = req.body;
            const result = await authService.register(email, password,fullName);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res:Response, next:NextFunction) {
        try {
            const {email, password} = req.body;
            const result = await authService.login(email,password);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export const authController = new AuthController();