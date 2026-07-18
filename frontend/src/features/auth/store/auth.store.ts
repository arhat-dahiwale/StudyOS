// src/features/auth/store/auth.store.ts
import { create } from "zustand"

interface AuthState {
  token: string | null

  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  login: (token) => {
    localStorage.setItem("token", token)

    document.cookie = `token=${token}; path=/`

    set({
      token,
    })
  },

  logout: () => {
    localStorage.removeItem("token")

    document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    set({
      token: null,
    })
  },
}))