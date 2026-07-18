export interface DashboardSummary {
  subjectsCount: number
  notesCount: number
  pendingAssignments: number
  completedAssignments: number
  totalStudyDuration: number
}

export interface DashboardResponse {
  success: boolean
  summary: DashboardSummary
}