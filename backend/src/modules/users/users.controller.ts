// src/modules/users/users.controller.ts
import { NextFunction, Request, Response } from "express"

import { usersService } from "./users.service"

export class UsersController {
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId

      const result = await usersService.getProfile(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId
      const { email, fullName, profilePic } = req.body

      const result = await usersService.updateProfile(
        userId,
        {
          email,
          fullName,
          profilePic,
        }
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const usersController = new UsersController()