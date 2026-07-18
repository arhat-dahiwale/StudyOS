// src/modules/users/users.types.ts
export interface UpdateProfileRequest {
    email:string
    fullName : string
    profilePic?: string
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  profilePic: string | null
}

