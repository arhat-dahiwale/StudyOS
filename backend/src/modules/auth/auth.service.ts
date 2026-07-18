// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { authRepository } from "./auth.repository"
import { ApiError } from "../../shared/utils/api-error";
import { userSettingsRepository } from "../user-settings/user-settings.repository"

export class AuthService {
    async register(email:string, password:string, fullName:string) {
        const existingUser = await authRepository.findUserByEmail(email);
        if (existingUser) {
            throw new ApiError(409, "Email already exists")
        }
        const passHash = await bcrypt.hash(password,10);
        const user = await authRepository.createUser(email,passHash,fullName);
        await userSettingsRepository.createDefaultSettings(user.id)
        const token = jwt.sign(
            {
             userId:user.id,
             email:user.email,
            },
            process.env.JWT_SECRET!,
            {
             expiresIn:"7d",
            }
        )

        return {
            success:true,
            token,
        }
    }

    async login(email:string, password:string) {
        const user = await authRepository.findUserByEmail(email);
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }
        const isPassCorrect = await bcrypt.compare(password,user.password_hash);
        if (!isPassCorrect)  throw new ApiError(401, "Invalid email or password");
        const token = jwt.sign(
            {
                userId : user.id,
                email:user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn:"7d",
            }
        )
        return {
            success:true,
            token,
        }
    }
}

export const authService = new AuthService();