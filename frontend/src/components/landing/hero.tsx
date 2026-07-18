"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6">
      <div className="max-w-3xl">
        <span className="rounded-full border px-3 py-1 text-sm font-medium">
          Student Productivity Platform
        </span>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl">
          Organize your
          <span className="text-primary"> entire academic life </span>
          in one place.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Manage subjects, write notes, track assignments, and record your
          study sessions with a clean and intuitive workspace designed for
          students.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/register">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}