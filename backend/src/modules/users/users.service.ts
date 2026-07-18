// src/modules/users/users.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { usersRepository } from "./users.repository"

export class UsersService {
  async getProfile(userId: string) {
    const user = await usersRepository.getProfile(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    return {
      success: true,
      user,
    }
  }

  async updateProfile(userId: string,
    updates: {
      email?: string
      fullName?: string
      profilePic?: string
    }
  ) {
    const user = await usersRepository.updateProfile(userId, updates)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    return {
      success: true,
      user,
    }
  }
}

export const usersService = new UsersService()