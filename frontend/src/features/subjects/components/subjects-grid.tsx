"use client"

import { Subject } from "../types/subjects.types"
import { SubjectCard } from "./subject-card"

interface SubjectsGridProps {
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
  onEdit: (subject: Subject) => void
  onDelete: (subject: Subject) => void
}

export function SubjectsGrid({
  subjects,
  onSubjectClick,
  onEdit,
  onDelete,
}: SubjectsGridProps) {
  if (subjects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">
          No subjects yet
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first subject to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onClick={onSubjectClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}