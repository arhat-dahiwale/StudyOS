// src/modules/user-settings/user-settings.repository.ts
import { db } from "../../database/db"

export class UserSettingsRepository {
  async getSettings(userId: string) {
    const result = await db.query(
      `
      SELECT
        theme,
        daily_goal_minutes AS "dailyGoalMinutes",
        week_start AS "weekStart"
      FROM user_settings
      WHERE user_id = $1
      `,
      [userId]
    )

    return result.rows[0]
  }

  async updateSettings(
    userId: string,
    updates: {
      theme?: string
      dailyGoalMinutes?: number
      weekStart?: string
    }
  ) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1

    if (updates.theme !== undefined) {
      fields.push(`theme = $${index++}`)
      values.push(updates.theme)
    }

    if (updates.dailyGoalMinutes !== undefined) {
      fields.push(`daily_goal_minutes = $${index++}`)
      values.push(updates.dailyGoalMinutes)
    }

    if (updates.weekStart !== undefined) {
      fields.push(`week_start = $${index++}`)
      values.push(updates.weekStart)
    }

    fields.push(`updated_at = NOW()`)

    values.push(userId)

    const result = await db.query(
      `
      UPDATE user_settings
      SET ${fields.join(", ")}
      WHERE user_id = $${index}
      RETURNING
        theme,
        daily_goal_minutes AS "dailyGoalMinutes",
        week_start AS "weekStart"
      `,
      values
    )

    return result.rows[0]
  }

  async createDefaultSettings(userId: string) {
        await db.query(
            `
            INSERT INTO user_settings (
            user_id,
            theme,
            daily_goal_minutes,
            week_start
            )
            VALUES ($1, $2, $3, $4)
            `,
            [
            userId,
            "dark",
            120,
            "Monday",
            ]
        )
    }

}

export const userSettingsRepository = new UserSettingsRepository()