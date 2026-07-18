// src/features/subjects/api/subjects.api.ts
import { apiClient } from "@/services/api-client"

import {
  CreateSubjectRequest,
  UpdateSubjectRequest,
  SubjectResponse,
  SubjectsResponse,
} from "../types/subjects.types"

export const subjectsApi = {
  getAll() {
    return apiClient.get<SubjectsResponse>("/subjects")
  },

  getById(id: string) {
    return apiClient.get<SubjectResponse>(`/subjects/${id}`)
  },

  create(data: CreateSubjectRequest) {
    return apiClient.post<SubjectResponse>("/subjects", data)
  },

  update(id: string, data: UpdateSubjectRequest) {
    return apiClient.patch<SubjectResponse>(`/subjects/${id}`, data)
  },

  delete(id: string) {
    return apiClient.delete(`/subjects/${id}`)
  },
}