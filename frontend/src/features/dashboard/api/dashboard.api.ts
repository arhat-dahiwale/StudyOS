import { apiClient } from "@/services/api-client"

import { DashboardSummary } from "../types/dashboard.types"

export const dashboardApi = {
  getSummary() {
    return apiClient.get<DashboardSummary>(
      "/dashboard/summary"
    )
  },
}