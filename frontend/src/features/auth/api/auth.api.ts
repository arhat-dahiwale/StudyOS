// src/features/auth/api/auth.api.ts
import { apiClient } from "@/services/api-client"

import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth.types"

export const authApi = {
  register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>(
      "/auth/register",
      data
    )
  },

  login(data: LoginRequest) {
    return apiClient.post<AuthResponse>(
      "/auth/login",
      data
    )
  },
}