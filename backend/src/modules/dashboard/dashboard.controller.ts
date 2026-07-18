// src/modules/dashboard/dashboard.controller.ts
import { NextFunction, Request, Response } from "express"

import { dashboardService } from "./dashboard.service"

export class DashboardController {
  async getSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId

      const result = await dashboardService.getSummary(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const dashboardController = new DashboardController()