"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { authApi } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
  email: z.email({
    message: "Invalid email",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()

  const login = useAuthStore((state) => state.login)

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true)

      const response = await authApi.login(data)

      login(response.data.token)

      toast.success("Logged in successfully")

      router.push("/dashboard")
    } catch {
      toast.error("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-5"
    >
      <div>
        <Label>Email</Label>

        <Input
          {...register("email")}
          placeholder="john@example.com"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <Label>Password</Label>

        <Input
          type="password"
          {...register("password")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        >
        {loading ? "Signing In..." : "Login"}
      </Button>
    </form>
  )
}