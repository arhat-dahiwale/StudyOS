// src/modules/notes/notes.types.ts
export interface CreateNoteRequest {
  subjectId: string
  title: string
  content: string
}

export interface UpdateNoteRequest {
  title?: string
  content?: string
}

export interface Note {
  id: string
  subjectId: string
  title: string
  content: string
  archivedAt: string | null
}