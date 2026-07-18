import { ReactNode } from "react"

import { AppNavbar } from "./app-navbar"
import { AppSidebar } from "./app-sidebar"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppNavbar />

        <main className="flex-1 p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}