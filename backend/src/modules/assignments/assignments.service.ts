// src/modules/assignments/assignments.service.ts
import { ApiError } from "../../shared/utils/api-error"
import { assignmentsRepository } from "./assignments.repository"

export class AssignmentsService {
  async createAssignment(
    subjectId: string,
    assignment: {
      title: string
      description?: string
      priority: string
      dueDate?: string
    }
  ) {
    const createdAssignment =
      await assignmentsRepository.createAssignment(
        subjectId,
        assignment
      )

    return {
      success: true,
      assignment: createdAssignment,
    }
  }

  async getAllAssignments(userId: string) {
    const assignments =
      await assignmentsRepository.getAllAssignments(userId)

    return {
      success: true,
      assignments,
    }
  }

  async getAssignmentById(userId: string, assignmentId: string) {
    const assignment =
      await assignmentsRepository.getAssignmentById(
        userId,
        assignmentId
      )

    if (!assignment) {
      throw new ApiError(404, "Assignment not found")
    }

    return {
      success: true,
      assignment,
    }
  }

  async updateAssignment(
    userId: string,
    assignmentId: string,
    updates: {
      title?: string
      description?: string
      priority?: string
      dueDate?: string
    }
  ) {
    const assignment =
      await assignmentsRepository.updateAssignment(
        userId,
        assignmentId,
        updates
      )

    if (!assignment) {
      throw new ApiError(404, "Assignment not found")
    }

    return {
      success: true,
      assignment,
    }
  }

  async updateAssignmentStatus(
    userId: string,
    assignmentId: string,
    status: string
  ) {
    const assignment =
      await assignmentsRepository.updateAssignmentStatus(
        userId,
        assignmentId,
        status
      )

    if (!assignment) {
      throw new ApiError(404, "Assignment not found")
    }

    return {
      success: true,
      assignment,
    }
  }

  async deleteAssignment(userId: string, assignmentId: string) {
    const assignment =
      await assignmentsRepository.deleteAssignment(
        userId,
        assignmentId
      )

    if (!assignment) {
      throw new ApiError(404, "Assignment not found")
    }

    return {
      success: true,
      message: "Assignment deleted successfully",
    }
  }
}

export const assignmentsService = new AssignmentsService()