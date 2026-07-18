"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          StudyOS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm hover:text-primary">
            Features
          </a>

          <a href="#how-it-works" className="text-sm hover:text-primary">
            How it Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">
                Login
            </Button>
          </Link>


          <Link href="/register">
            <Button>
                Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}