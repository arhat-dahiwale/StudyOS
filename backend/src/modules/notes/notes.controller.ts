// src/modules/notes/notes.controller.ts
import { NextFunction, Request, Response } from "express"

import { notesService } from "./notes.service"

export class NotesController {
  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const { subjectId, title, content } = req.body

      const result = await notesService.createNote(
        subjectId,
        {
          title,
          content,
        }
      )

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId

      const result = await notesService.getAllNotes(userId)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const noteId = req.params.id as string

      const result = await notesService.getNoteById(
        userId,
        noteId
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const noteId = req.params.id as string

      const result = await notesService.updateNote(
        userId,
        noteId,
        req.body
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async archiveNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const noteId = req.params.id as string

      const result = await notesService.archiveNote(
        userId,
        noteId
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async unarchiveNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const noteId = req.params.id as string

      const result = await notesService.unarchiveNote(
        userId,
        noteId
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.userId
      const noteId = req.params.id as string

      const result = await notesService.deleteNote(
        userId,
        noteId
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const notesController = new NotesController()