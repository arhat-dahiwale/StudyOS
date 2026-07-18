import { ReactNode } from "react"

import { AppLayout } from "@/components/layout/app-layout"

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return <AppLayout>{children}</AppLayout>
}