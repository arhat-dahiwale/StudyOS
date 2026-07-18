// src/modules/notes/notes.repository.ts
import { db } from "../../database/db"

export class NotesRepository {
  async createNote(
    subjectId: string,
    note: {
      title: string
      content: string
    }
  ) {
    const result = await db.query(
      `
      INSERT INTO notes (
        subject_id,
        title,
        content
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        subject_id AS "subjectId",
        title,
        content,
        archived_at AS "archivedAt"
      `,
      [subjectId, note.title, note.content]
    )

    return result.rows[0]
  }

  async getAllNotes(userId: string) {
    const result = await db.query(
      `
      SELECT
        n.id,
        n.subject_id AS "subjectId",
        n.title,
        n.content,
        n.archived_at AS "archivedAt"
      FROM notes n
      INNER JOIN subjects s
        ON n.subject_id = s.id
      WHERE s.user_id = $1
      ORDER BY n.created_at DESC
      `,
      [userId]
    )

    return result.rows
  }

  async getNoteById(userId: string, noteId: string) {
    const result = await db.query(
      `
      SELECT
        n.id,
        n.subject_id AS "subjectId",
        n.title,
        n.content,
        n.archived_at AS "archivedAt"
      FROM notes n
      INNER JOIN subjects s
        ON n.subject_id = s.id
      WHERE n.id = $1
        AND s.user_id = $2
      `,
      [noteId, userId]
    )

    return result.rows[0]
  }

  async updateNote(
    userId: string,
    noteId: string,
    updates: {
      title?: string
      content?: string
    }
  ) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1

    if (updates.title !== undefined) {
      fields.push(`title = $${index++}`)
      values.push(updates.title)
    }

    if (updates.content !== undefined) {
      fields.push(`content = $${index++}`)
      values.push(updates.content)
    }

    fields.push(`updated_at = NOW()`)

    values.push(noteId)
    values.push(userId)

    const result = await db.query(
      `
      UPDATE notes
      SET ${fields.join(", ")}
      FROM subjects
      WHERE notes.subject_id = subjects.id
        AND notes.id = $${index}
        AND subjects.user_id = $${index + 1}
      RETURNING
        notes.id,
        notes.subject_id AS "subjectId",
        notes.title,
        notes.content,
        notes.archived_at AS "archivedAt"
      `,
      values
    )

    return result.rows[0]
  }

  async archiveNote(userId: string, noteId: string) {
    const result = await db.query(
      `
      UPDATE notes
      SET archived_at = NOW()
      FROM subjects
      WHERE notes.subject_id = subjects.id
        AND notes.id = $1
        AND subjects.user_id = $2
      RETURNING notes.id
      `,
      [noteId, userId]
    )

    return result.rows[0]
  }

  async unarchiveNote(userId: string, noteId: string) {
    const result = await db.query(
      `
      UPDATE notes
      SET archived_at = NULL
      FROM subjects
      WHERE notes.subject_id = subjects.id
        AND notes.id = $1
        AND subjects.user_id = $2
      RETURNING notes.id
      `,
      [noteId, userId]
    )

    return result.rows[0]
  }

  async deleteNote(userId: string, noteId: string) {
    const result = await db.query(
      `
      DELETE FROM notes
      USING subjects
      WHERE notes.subject_id = subjects.id
        AND notes.id = $1
        AND subjects.user_id = $2
      RETURNING notes.id
      `,
      [noteId, userId]
    )

    return result.rows[0]
  }
}

export const notesRepository = new NotesRepository()