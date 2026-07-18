// src/modules/user-settings/user-settings.types.ts
export interface UserSettings {
  theme: string
  dailyGoalMinutes: number
  weekStart: string
}

export interface UpdateUserSettingsRequest {
  theme?: string
  dailyGoalMinutes?: number
  weekStart?: string
}