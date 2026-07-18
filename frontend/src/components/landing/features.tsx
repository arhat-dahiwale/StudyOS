import {
  BookOpen,
  FileText,
  ClipboardCheck,
  Timer,
} from "lucide-react"

import { Card } from "@/components/ui/card"

const features = [
  {
    title: "Subjects",
    description:
      "Organize your courses semester-wise with personalized colors and icons.",
    icon: BookOpen,
  },
  {
    title: "Notes",
    description:
      "Write, edit, archive and manage all your study notes in one place.",
    icon: FileText,
  },
  {
    title: "Assignments",
    description:
      "Track deadlines, priorities and completion status effortlessly.",
    icon: ClipboardCheck,
  },
  {
    title: "Study Sessions",
    description:
      "Record your study time and stay consistent with focused sessions.",
    icon: Timer,
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          Everything you need to study efficiently
        </h2>

        <p className="mt-4 text-muted-foreground">
          Built specifically for students to stay organized and productive.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <Card
              key={feature.title}
              className="p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon className="mb-4 h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}