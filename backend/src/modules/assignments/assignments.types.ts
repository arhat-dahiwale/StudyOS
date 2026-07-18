// src/modules/assignments/assignments.types.ts
export interface CreateAssignmentRequest {
  subjectId: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: string
}

export interface UpdateAssignmentRequest {
  title?: string
  description?: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: string
}

export interface UpdateAssignmentStatusRequest {
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
}

export interface Assignment {
  id: string
  subjectId: string
  title: string
  description: string | null
  priority: "LOW" | "MEDIUM" | "HIGH"
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  dueDate: string | null
  completedAt: string | null
}