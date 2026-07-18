import { dashboardRepository } from "./dashboard.repository"

export class DashboardService {
  async getSummary(userId: string) {
    const summary = await dashboardRepository.getSummary(userId)

    return {
      success: true,
      summary: {
        subjectsCount: Number(summary.subjectsCount),
        notesCount: Number(summary.notesCount),
        pendingAssignments: Number(summary.pendingAssignments),
        completedAssignments: Number(summary.completedAssignments),
        totalStudyDuration: Number(summary.totalStudyDuration),
      },
    }
  }
}

export const dashboardService = new DashboardService()