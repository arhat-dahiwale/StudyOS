// src/modules/user-settings/user-settings.controller.ts
import { NextFunction, Request, Response } from "express"

import { userSettingsService } from "./user-settings.service"

export class UserSettingsController {
  async getSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId

      const result = await userSettingsService.getSettings(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId
      const { theme, dailyGoalMinutes, weekStart } = req.body

      const result = await userSettingsService.updateSettings(
        userId,
        {
          theme,
          dailyGoalMinutes,
          weekStart,
        }
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const userSettingsController = new UserSettingsController()