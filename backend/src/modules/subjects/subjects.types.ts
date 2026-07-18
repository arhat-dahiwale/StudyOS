// src/modules/subjects/subjects.types.ts
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

export interface Subject {
  id: string
  name: string
  color: string
  icon: string
  semester: string | null
}