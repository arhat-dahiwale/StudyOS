// src/modules/users/users.repository.ts
import { db } from "../../database/db"

export class UsersRepository {
    async getProfile(userId : string) {
        const result = await db.query(
            `
            SELECT id, email, full_name as "fullName", profile_pic as "profilePic"
            FROM users
            WHERE id= $1
            `, [userId]
        )
        return result.rows[0];
    }

    async updateProfile(userId:string, updates:{
        email?:string
        fullName?:string
        profilePic?:string
    }) {
        const fields: string[] = []
        const values: any[] = []

        let index = 1

        if (updates.email !== undefined) {
        fields.push(`email = $${index++}`)
        values.push(updates.email)
        }

        if (updates.fullName !== undefined) {
        fields.push(`full_name = $${index++}`)
        values.push(updates.fullName)
        }

        if (updates.profilePic !== undefined) {
        fields.push(`profile_pic = $${index++}`)
        values.push(updates.profilePic)
        }

        fields.push(`updated_at = NOW()`)

        values.push(userId)

        const result = await db.query(
        `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING
            id,
            email,
            full_name AS "fullName",
            profile_pic AS "profilePic"
        `,
        values
        )

        return result.rows[0]
    }
}

export const usersRepository = new UsersRepository();