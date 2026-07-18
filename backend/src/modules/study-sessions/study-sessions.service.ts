// src/modules/study-sessions/study-sessions.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { studySessionsRepository } from "./study-sessions.repository"

export class StudySessionsService {
  async startSession(
    userId: string,
    session: {
      subjectId: string
      assignmentId?: string
    }
  ) {
    const createdSession =
      await studySessionsRepository.startSession(userId, session)

    return {
      success: true,
      session: createdSession,
    }
  }

  async getAllSessions(userId: string) {
    const sessions =
      await studySessionsRepository.getAllSessions(userId)

    return {
      success: true,
      sessions,
    }
  }

  async getSessionById(userId: string, sessionId: string) {
    const session =
      await studySessionsRepository.getSessionById(
        userId,
        sessionId
      )

    if (!session) {
      throw new ApiError(404, "Study session not found")
    }

    return {
      success: true,
      session,
    }
  }

  async pauseSession(userId: string, sessionId: string) {
    const session =
      await studySessionsRepository.updateSessionStatus(
        userId,
        sessionId,
        "PAUSED"
      )

    if (!session) {
      throw new ApiError(404, "Study session not found")
    }

    return {
      success: true,
      session,
    }
  }

  async resumeSession(userId: string, sessionId: string) {
    const session =
      await studySessionsRepository.updateSessionStatus(
        userId,
        sessionId,
        "ACTIVE"
      )

    if (!session) {
      throw new ApiError(404, "Study session not found")
    }

    return {
      success: true,
      session,
    }
  }

  async endSession(userId: string, sessionId: string) {
    const session =
      await studySessionsRepository.getSessionById(
        userId,
        sessionId
      )

    if (!session) {
      throw new ApiError(404, "Study session not found")
    }

    const startedAt = new Date(session.startedAt).getTime()
    const endedAt = Date.now()

    const duration = Math.floor(
      (endedAt - startedAt) / (1000 * 60)
    )

    const completedSession =
      await studySessionsRepository.endSession(
        userId,
        sessionId,
        duration
      )

    return {
      success: true,
      session: completedSession,
    }
  }
}

export const studySessionsService = new StudySessionsService()