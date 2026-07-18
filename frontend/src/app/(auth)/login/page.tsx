"use client"
import { LoginForm } from "@/features/auth/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold">
          Welcome back
        </h1>

        <p className="mt-2 text-muted-foreground">
          Sign in to continue.
        </p>

        <LoginForm />
      </div>
    </main>
  )
}