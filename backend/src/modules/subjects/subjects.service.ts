// src/modules/subjects/subjects.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { subjectsRepository } from "./subjects.repository"

export class SubjectsService {
  async createSubject(userId: string, subject: {
    name: string
    color: string
    icon: string
    semester?: string
  }) {
    const createdSubject = await subjectsRepository.createSubject(
      userId,
      subject
    )

    return {
      success: true,
      subject: createdSubject,
    }
  }

  async getAllSubjects(userId: string) {
    const subjects = await subjectsRepository.getAllSubjects(userId)

    return {
      success: true,
      subjects: subjects.map((subject: any) => ({
        ...subject,
        notesCount: Number(subject.notesCount),
        assignmentsCount: Number(subject.assignmentsCount),
      })),
    }
  }

  async getSubjectById(userId: string, subjectId: string) {
    const subject = await subjectsRepository.getSubjectById(
      userId,
      subjectId
    )

    if (!subject) {
      throw new ApiError(404, "Subject not found")
    }

    return {
      success: true,
      subject,
    }
  }

  async updateSubject(
    userId: string,
    subjectId: string,
    updates: {
      name?: string
      color?: string
      icon?: string
      semester?: string
    }
  ) {
    const subject = await subjectsRepository.updateSubject(
      userId,
      subjectId,
      updates
    )

    if (!subject) {
      throw new ApiError(404, "Subject not found")
    }

    return {
      success: true,
      subject,
    }
  }

  async deleteSubject(userId: string, subjectId: string) {
    const subject = await subjectsRepository.deleteSubject(
      userId,
      subjectId
    )

    if (!subject) {
      throw new ApiError(404, "Subject not found")
    }

    return {
      success: true,
      message: "Subject deleted successfully",
    }
  }
}

export const subjectsService = new SubjectsService()