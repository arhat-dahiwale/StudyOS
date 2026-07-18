// src/modules/assignments/assignments.repository.ts
import { db } from "../../database/db"

export class AssignmentsRepository {
  async createAssignment(
    subjectId: string,
    assignment: {
      title: string
      description?: string
      priority: string
      dueDate?: string
    }
  ) {
    const result = await db.query(
      `
      INSERT INTO assignments (
        subject_id,
        title,
        description,
        priority,
        status,
        due_date
      )
      VALUES ($1, $2, $3, $4, 'PENDING', $5)
      RETURNING
        id,
        subject_id AS "subjectId",
        title,
        description,
        priority,
        status,
        due_date AS "dueDate",
        completed_at AS "completedAt"
      `,
      [
        subjectId,
        assignment.title,
        assignment.description ?? null,
        assignment.priority,
        assignment.dueDate ?? null,
      ]
    )

    return result.rows[0]
  }

  async getAllAssignments(userId: string) {
    const result = await db.query(
      `
      SELECT
        a.id,
        a.subject_id AS "subjectId",
        a.title,
        a.description,
        a.priority,
        a.status,
        a.due_date AS "dueDate",
        a.completed_at AS "completedAt"
      FROM assignments a
      INNER JOIN subjects s
        ON a.subject_id = s.id
      WHERE s.user_id = $1
      ORDER BY a.due_date ASC NULLS LAST
      `,
      [userId]
    )

    return result.rows
  }

  async getAssignmentById(userId: string, assignmentId: string) {
    const result = await db.query(
      `
      SELECT
        a.id,
        a.subject_id AS "subjectId",
        a.title,
        a.description,
        a.priority,
        a.status,
        a.due_date AS "dueDate",
        a.completed_at AS "completedAt"
      FROM assignments a
      INNER JOIN subjects s
        ON a.subject_id = s.id
      WHERE a.id = $1
        AND s.user_id = $2
      `,
      [assignmentId, userId]
    )

    return result.rows[0]
  }

  async updateAssignment(
    userId: string,
    assignmentId: string,
    updates: {
      title?: string
      description?: string
      priority?: string
      dueDate?: string
    }
  ) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1

    if (updates.title !== undefined) {
      fields.push(`title = $${index++}`)
      values.push(updates.title)
    }

    if (updates.description !== undefined) {
      fields.push(`description = $${index++}`)
      values.push(updates.description)
    }

    if (updates.priority !== undefined) {
      fields.push(`priority = $${index++}`)
      values.push(updates.priority)
    }

    if (updates.dueDate !== undefined) {
      fields.push(`due_date = $${index++}`)
      values.push(updates.dueDate)
    }

    fields.push(`updated_at = NOW()`)

    values.push(assignmentId)
    values.push(userId)

    const result = await db.query(
      `
      UPDATE assignments
      SET ${fields.join(", ")}
      FROM subjects
      WHERE assignments.subject_id = subjects.id
        AND assignments.id = $${index}
        AND subjects.user_id = $${index + 1}
      RETURNING
        assignments.id,
        assignments.subject_id AS "subjectId",
        assignments.title,
        assignments.description,
        assignments.priority,
        assignments.status,
        assignments.due_date AS "dueDate",
        assignments.completed_at AS "completedAt"
      `,
      values
    )

    return result.rows[0]
  }

  async updateAssignmentStatus(
    userId: string,
    assignmentId: string,
    status: string
  ) {
    const result = await db.query(
      `
      UPDATE assignments
      SET
        status = CAST($1 AS assignment_status),
        completed_at = CASE
          WHEN CAST($1 AS assignment_status) = 'COMPLETED' THEN NOW()
          ELSE NULL
        END,
        updated_at = NOW()
      FROM subjects
      WHERE assignments.subject_id = subjects.id
        AND assignments.id = $2
        AND subjects.user_id = $3
      RETURNING
        assignments.id,
        assignments.subject_id AS "subjectId",
        assignments.title,
        assignments.description,
        assignments.priority,
        assignments.status,
        assignments.due_date AS "dueDate",
        assignments.completed_at AS "completedAt"
      `,
      [status, assignmentId, userId]
    )

    return result.rows[0]
  }

  async deleteAssignment(userId: string, assignmentId: string) {
    const result = await db.query(
      `
      DELETE FROM assignments
      USING subjects
      WHERE assignments.subject_id = subjects.id
        AND assignments.id = $1
        AND subjects.user_id = $2
      RETURNING assignments.id
      `,
      [assignmentId, userId]
    )

    return result.rows[0]
  }
}

export const assignmentsRepository = new AssignmentsRepository()