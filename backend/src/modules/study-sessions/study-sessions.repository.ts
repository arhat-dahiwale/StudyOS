// src/modules/study-sessions/study-sessions.repository.ts
import { db } from "../../database/db"

export class StudySessionsRepository {
  async startSession(
    userId: string,
    session: {
      subjectId: string
      assignmentId?: string
    }
  ) {
    const result = await db.query(
      `
      INSERT INTO study_sessions (
        user_id,
        subject_id,
        assignment_id,
        status,
        duration,
        started_at
      )
      VALUES ($1, $2, $3, 'ACTIVE', 0, NOW())
      RETURNING
        id,
        user_id AS "userId",
        subject_id AS "subjectId",
        assignment_id AS "assignmentId",
        status,
        duration,
        started_at AS "startedAt",
        ended_at AS "endedAt"
      `,
      [
        userId,
        session.subjectId,
        session.assignmentId ?? null,
      ]
    )

    return result.rows[0]
  }

  async getAllSessions(userId: string) {
    const result = await db.query(
      `
      SELECT
        id,
        user_id AS "userId",
        subject_id AS "subjectId",
        assignment_id AS "assignmentId",
        status,
        duration,
        started_at AS "startedAt",
        ended_at AS "endedAt"
      FROM study_sessions
      WHERE user_id = $1
      ORDER BY started_at DESC
      `,
      [userId]
    )

    return result.rows
  }

  async getSessionById(userId: string, sessionId: string) {
    const result = await db.query(
      `
      SELECT
        id,
        user_id AS "userId",
        subject_id AS "subjectId",
        assignment_id AS "assignmentId",
        status,
        duration,
        started_at AS "startedAt",
        ended_at AS "endedAt"
      FROM study_sessions
      WHERE id = $1
        AND user_id = $2
      `,
      [sessionId, userId]
    )

    return result.rows[0]
  }

  async updateSessionStatus(
    userId: string,
    sessionId: string,
    status: string
  ) {
    const result = await db.query(
      `
      UPDATE study_sessions
      SET
        status = $1::study_session_status,
        updated_at = NOW()
      WHERE id = $2
        AND user_id = $3
      RETURNING
        id,
        user_id AS "userId",
        subject_id AS "subjectId",
        assignment_id AS "assignmentId",
        status,
        duration,
        started_at AS "startedAt",
        ended_at AS "endedAt"
      `,
      [status, sessionId, userId]
    )

    return result.rows[0]
  }

  async endSession(
    userId: string,
    sessionId: string,
    duration: number
  ) {
    const result = await db.query(
      `
      UPDATE study_sessions
      SET
        status = 'COMPLETED',
        duration = $1,
        ended_at = NOW(),
        updated_at = NOW()
      WHERE id = $2
        AND user_id = $3
      RETURNING
        id,
        user_id AS "userId",
        subject_id AS "subjectId",
        assignment_id AS "assignmentId",
        status,
        duration,
        started_at AS "startedAt",
        ended_at AS "endedAt"
      `,
      [duration, sessionId, userId]
    )

    return result.rows[0]
  }
}

export const studySessionsRepository = new StudySessionsRepository()