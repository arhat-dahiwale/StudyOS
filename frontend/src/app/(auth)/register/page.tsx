"use client"
import { RegisterForm } from "@/features/auth/components/register-form"

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold">
          Create your account
        </h1>

        <p className="mt-2 text-muted-foreground">
          Start organizing your academic life with StudyOS.
        </p>

        <RegisterForm />
      </div>
    </main>
  )
}