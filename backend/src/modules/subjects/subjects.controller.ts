// src/modules/subjects/subjects.controller.ts
import { NextFunction, Request, Response } from "express"

import { subjectsService } from "./subjects.service"

export class SubjectsController {
  async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result = await subjectsService.createSubject(
        userId,
        req.body
      )

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result = await subjectsService.getAllSubjects(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getSubjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const id = req.params.id
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: "Invalid id parameter" })
        return
      }

      const result = await subjectsService.getSubjectById(userId, id)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const id = req.params.id
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: "Invalid id parameter" })
        return
      }

      const result = await subjectsService.updateSubject(userId, id, req.body)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async deleteSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const id = req.params.id
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: "Invalid id parameter" })
        return
      }

      const result = await subjectsService.deleteSubject(userId, id)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const subjectsController = new SubjectsController()