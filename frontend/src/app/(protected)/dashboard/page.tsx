"use client"

import { useEffect, useState } from "react"

import { dashboardApi } from "@/features/dashboard/api/dashboard.api"
import { SummaryCards } from "@/features/dashboard/components/summary-cards"
import { DashboardSummary } from "@/features/dashboard/types/dashboard.types"

export default function DashboardPage() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null)

  useEffect(() => {
    async function loadDashboard() {
      const response = await dashboardApi.getSummary()

      setSummary(response.data.summary)
    }

    loadDashboard()
  }, [])

  if (!summary) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back to StudyOS.
        </p>
      </div>

      <SummaryCards summary={summary} />
    </div>
  )
}