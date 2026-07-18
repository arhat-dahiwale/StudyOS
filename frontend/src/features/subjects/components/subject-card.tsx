"use client"

import * as Icons from "lucide-react"
import { Pencil, Trash2 } from "lucide-react"
import { LucideIcon, BookOpen } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Subject } from "../types/subjects.types"

interface SubjectCardProps {
  subject: Subject
  onClick: (subject: Subject) => void
  onEdit: (subject: Subject) => void
  onDelete: (subject: Subject) => void
}

export function SubjectCard({
  subject,
  onClick,
  onEdit,
  onDelete,
}: SubjectCardProps) {
  const Icon =
    (Icons[subject.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    BookOpen

  return (
    <Card
      onClick={() => onClick(subject)}
      className="cursor-pointer rounded-xl border-0 text-white shadow-md transition hover:scale-[1.02]"
      style={{ backgroundColor: subject.color }}
    >
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6" />

            <h2 className="text-lg font-semibold">
              {subject.name}
            </h2>
          </div>

          <span className="text-sm font-medium opacity-90">
            {subject.semester?.replace(/\D/g, "") || "-"}
          </span>
        </div>

        <hr className="my-4 border-white/30" />

        <ul className="flex-1 list-disc space-y-2 pl-5 text-sm">
          <li>{subject.notesCount} Notes</li>
          <li>{subject.assignmentsCount} Assignments</li>
        </ul>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(subject)
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(subject)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}