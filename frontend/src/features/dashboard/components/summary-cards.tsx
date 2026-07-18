"use client"

import { Card } from "@/components/ui/card"

import { DashboardSummary } from "../types/dashboard.types"

interface SummaryCardsProps {
  summary: DashboardSummary
}

export function SummaryCards({
  summary,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Subjects",
      value: summary.subjectsCount,
    },
    {
      title: "Notes",
      value: summary.notesCount,
    },
    {
      title: "Pending Assignments",
      value: summary.pendingAssignments,
    },
    {
      title: "Completed Assignments",
      value: summary.completedAssignments,
    },
    {
      title: "Study Minutes",
      value: summary.totalStudyDuration,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="p-6"
        >
          <p className="text-sm text-muted-foreground">
            {card.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {card.value}
          </h2>
        </Card>
      ))}
    </div>
  )
}