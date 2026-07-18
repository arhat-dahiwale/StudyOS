// src/modules/study-sessions/study-sessions.types.ts
export interface StartStudySessionRequest {
  subjectId: string
  assignmentId?: string
}

export interface StudySession {
  id: string
  userId: string
  subjectId: string
  assignmentId: string | null
  status: "ACTIVE" | "PAUSED" | "COMPLETED"
  duration: number
  startedAt: string
  endedAt: string | null
}