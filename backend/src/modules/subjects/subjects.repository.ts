// src/modules/subjects/subjects.repository.ts
import { db } from "../../database/db"

export class SubjectsRepository {
  async createSubject(
    userId: string,
    subject: {
      name: string
      color: string
      icon: string
      semester?: string
    }
  ) {
    const result = await db.query(
      `
      INSERT INTO subjects (
        user_id,
        name,
        color,
        icon,
        semester
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        color,
        icon,
        semester
      `,
      [
        userId,
        subject.name,
        subject.color,
        subject.icon,
        subject.semester ?? null,
      ]
    )

    return result.rows[0]
  }

  async getAllSubjects(userId: string) {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        color,
        icon,
        semester
      FROM subjects
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    )

    return result.rows
  }

  async getSubjectById(userId: string, subjectId: string) {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        color,
        icon,
        semester
      FROM subjects
      WHERE id = $1
        AND user_id = $2
      `,
      [subjectId, userId]
    )

    return result.rows[0]
  }

  async updateSubject(
    userId: string,
    subjectId: string,
    updates: {
      name?: string
      color?: string
      icon?: string
      semester?: string
    }
  ) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1

    if (updates.name !== undefined) {
      fields.push(`name = $${index++}`)
      values.push(updates.name)
    }

    if (updates.color !== undefined) {
      fields.push(`color = $${index++}`)
      values.push(updates.color)
    }

    if (updates.icon !== undefined) {
      fields.push(`icon = $${index++}`)
      values.push(updates.icon)
    }

    if (updates.semester !== undefined) {
      fields.push(`semester = $${index++}`)
      values.push(updates.semester)
    }

    fields.push(`updated_at = NOW()`)

    values.push(subjectId)
    values.push(userId)

    const result = await db.query(
      `
      UPDATE subjects
      SET ${fields.join(", ")}
      WHERE id = $${index}
        AND user_id = $${index + 1}
      RETURNING
        id,
        name,
        color,
        icon,
        semester
      `,
      values
    )

    return result.rows[0]
  }

  async deleteSubject(userId: string, subjectId: string) {
    const result = await db.query(
      `
      DELETE FROM subjects
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [subjectId, userId]
    )

    return result.rows[0]
  }
}

export const subjectsRepository = new SubjectsRepository()