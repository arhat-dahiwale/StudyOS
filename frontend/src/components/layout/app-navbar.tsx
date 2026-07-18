"use client"

import { useRouter, usePathname } from "next/navigation"

import { LogOut, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/store/auth.store"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/subjects": "Subjects",
  "/notes": "Notes",
  "/assignments": "Assignments",
  "/study-sessions": "Study Sessions",
  "/settings": "Settings",
}

export function AppNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  const logout = useAuthStore((state) => state.logout)

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-8">
      <div>
        <h1 className="text-2xl font-bold">
          {pageTitles[pathname] ?? "StudyOS"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <UserCircle2 className="h-8 w-8 text-muted-foreground" />

        <Button
          variant="outline"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}