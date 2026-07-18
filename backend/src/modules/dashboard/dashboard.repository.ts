// src/modules/dashboard/dashboard.repository.ts
import { db } from "../../database/db"

export class DashboardRepository {
  async getSummary(userId: string) {
    const result = await db.query(
      `
      SELECT
        (
          SELECT COUNT(*)
          FROM subjects
          WHERE user_id = $1
        ) AS "subjectsCount",

        (
          SELECT COUNT(*)
          FROM notes n
          JOIN subjects s
            ON n.subject_id = s.id
          WHERE s.user_id = $1
        ) AS "notesCount",

        (
          SELECT COUNT(*)
          FROM assignments a
          JOIN subjects s
            ON a.subject_id = s.id
          WHERE s.user_id = $1
            AND a.status = 'PENDING'
        ) AS "pendingAssignments",

        (
          SELECT COUNT(*)
          FROM assignments a
          JOIN subjects s
            ON a.subject_id = s.id
          WHERE s.user_id = $1
            AND a.status = 'COMPLETED'
        ) AS "completedAssignments",

        (
          SELECT COALESCE(SUM(duration),0)
          FROM study_sessions
          WHERE user_id = $1
        ) AS "totalStudyDuration"
      `,
      [userId]
    )

    return result.rows[0]
  }
}

export const dashboardRepository = new DashboardRepository()