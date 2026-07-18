// src/modules/user-settings/user-settings.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { userSettingsRepository } from "./user-settings.repository"

export class UserSettingsService {
  async getSettings(userId: string) {
    const settings = await userSettingsRepository.getSettings(userId)

    if (!settings) {
      throw new ApiError(404, "User settings not found")
    }

    return {
      success: true,
      settings,
    }
  }

  async updateSettings(
    userId: string,
    updates: {
      theme?: string
      dailyGoalMinutes?: number
      weekStart?: string
    }
  ) {
    const settings = await userSettingsRepository.updateSettings(
      userId,
      updates
    )

    if (!settings) {
      throw new ApiError(404, "User settings not found")
    }

    return {
      success: true,
      settings,
    }
  }
}

export const userSettingsService = new UserSettingsService()