// src/features/subjects/types/subjects.types.ts
export interface Subject {
  id: string
  name: string
  color: string
  icon: string
  semester: string | null
  notesCount: number
  assignmentsCount: number
}

export interface CreateSubjectRequest {
  name: string
  color: string
  icon: string
  semester?: string
}

export interface UpdateSubjectRequest {
  name?: string
  color?: string
  icon?: string
  semester?: string
}

export interface SubjectsResponse {
  success: boolean
  subjects: Subject[]
}

export interface SubjectResponse {
  success: boolean
  subject: Subject
}