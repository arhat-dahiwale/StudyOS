// src/modules/auth/auth.repository.ts
import { db } from "../../database/db"

export class AuthRepository {
  async findUserByEmail(email: string) {
    const result = await db.query(
      `
      SELECT
        id,
        email,
        password_hash,
        full_name,
        profile_pic
      FROM users
      WHERE email = $1
      `,
      [email]
    )

    return result.rows[0]
  }

  async createUser(
    email: string,
    passwordHash: string,
    fullName: string
  ) {
    const result = await db.query(
      `
      INSERT INTO users (
        email,
        password_hash,
        full_name
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        email,
        full_name,
        profile_pic,
        created_at
      `,
      [email, passwordHash, fullName]
    )

    return result.rows[0]
  }
}

export const authRepository = new AuthRepository()