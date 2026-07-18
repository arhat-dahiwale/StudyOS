"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  Timer,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Subjects",
    href: "/subjects",
    icon: BookOpen,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: ClipboardList,
  },
  {
    label: "Study Sessions",
    href: "/study-sessions",
    icon: Timer,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold">
          StudyOS
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}