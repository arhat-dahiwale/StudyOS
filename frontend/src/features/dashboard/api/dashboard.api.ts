// src/features/dashboard/api/dashboard.api.ts
import { apiClient } from "@/services/api-client"

import { DashboardResponse } from "../types/dashboard.types"

export const dashboardApi = {
  getSummary() {
    return apiClient.get<DashboardResponse>(
      "/dashboard/summary"
    )
  },
}