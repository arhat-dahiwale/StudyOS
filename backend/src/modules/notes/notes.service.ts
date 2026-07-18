// src/modules/notes/notes.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { notesRepository } from "./notes.repository"

export class NotesService {
  async createNote(
    subjectId: string,
    note: {
      title: string
      content: string
    }
  ) {
    const createdNote = await notesRepository.createNote(subjectId, note)

    return {
      success: true,
      note: createdNote,
    }
  }

  async getAllNotes(userId: string) {
    const notes = await notesRepository.getAllNotes(userId)

    return {
      success: true,
      notes,
    }
  }

  async getNoteById(userId: string, noteId: string) {
    const note = await notesRepository.getNoteById(userId, noteId)

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return {
      success: true,
      note,
    }
  }

  async updateNote(
    userId: string,
    noteId: string,
    updates: {
      title?: string
      content?: string
    }
  ) {
    const note = await notesRepository.updateNote(
      userId,
      noteId,
      updates
    )

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return {
      success: true,
      note,
    }
  }

  async archiveNote(userId: string, noteId: string) {
    const note = await notesRepository.archiveNote(userId, noteId)

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return {
      success: true,
      message: "Note archived successfully",
    }
  }

  async unarchiveNote(userId: string, noteId: string) {
    const note = await notesRepository.unarchiveNote(userId, noteId)

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return {
      success: true,
      message: "Note unarchived successfully",
    }
  }

  async deleteNote(userId: string, noteId: string) {
    const note = await notesRepository.deleteNote(userId, noteId)

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return {
      success: true,
      message: "Note deleted successfully",
    }
  }
}

export const notesService = new NotesService()