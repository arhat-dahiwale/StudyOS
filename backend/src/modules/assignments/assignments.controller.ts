// src/modules/assignments/assignments.controller.ts
import { NextFunction, Request, Response } from "express"

import { assignmentsService } from "./assignments.service"

export class AssignmentsController {
  async createAssignment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { subjectId, title, description, priority, dueDate } = req.body

      const result = await assignmentsService.createAssignment(
        subjectId,
        {
          title,
          description,
          priority,
          dueDate,
        }
      )

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result =
        await assignmentsService.getAllAssignments(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAssignmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const id = req.params.id as string

      const result =
        await assignmentsService.getAssignmentById(
          userId,
          id
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const id = req.params.id as string

      const result =
        await assignmentsService.updateAssignment(
          userId,
          id,
          req.body
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateAssignmentStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user.userId
      const id = req.params.id as string

      const result =
        await assignmentsService.updateAssignmentStatus(
          userId,
          id,
          req.body.status
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async deleteAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const id = req.params.id as string

      const result =
        await assignmentsService.deleteAssignment(
          userId,
          id
        )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const assignmentsController = new AssignmentsController()