// src/modules/study-sessions/study-sessions.controller.ts
import { NextFunction, Request, Response } from "express"

import { studySessionsService } from "./study-sessions.service"

export class StudySessionsController {
  async startSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.startSession(
          userId,
          req.body
        )

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.getAllSessions(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getSessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.getSessionById(
          userId,
          req.params.id as string
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async pauseSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.pauseSession(
          userId,
          req.params.id as string
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async resumeSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.resumeSession(
          userId,
          req.params.id as string
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async endSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await studySessionsService.endSession(
          userId,
          req.params.id as string
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const studySessionsController = new StudySessionsController()