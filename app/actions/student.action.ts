"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createStudent(data: {
  firstName: string;
  lastName: string;
  urlPhoto?: string;
  classroomId: string;
}) {
  try {
    const student = await prisma.student.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        urlPhoto: data.urlPhoto || null,
        classroomId: data.classroomId,
      },
    });

    revalidatePath("/classroom");

    return { success: true, data: student };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating student:", error.message);
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create student" };
  }
}

export async function getStudentsByClassroom(classroomId: string) {
  try {
    const students = await prisma.student.findMany({
      where: {
        classroomId: classroomId,
      },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    });

    return { success: true, data: students };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch students" };
  }
}

export async function getStudentById(studentId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return { success: false, error: "Student not found" };
    }

    return { success: true, data: student };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch student" };
  }
}

export async function updateStudent(
  studentId: string,
  data: {
    firstName?: string;
    lastName?: string;
    urlPhoto?: string;
  }
) {
  try {
    const student = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        ...(data.firstName !== undefined && { firstName: data.firstName }),
        ...(data.lastName !== undefined && { lastName: data.lastName }),
        ...(data.urlPhoto !== undefined && { urlPhoto: data.urlPhoto || null }),
      },
    });

    revalidatePath("/classroom");

    return { success: true, data: student };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating student:", error.message);
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update student" };
  }
}

export async function deleteStudent(studentId: string) {
  try {
    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    revalidatePath("/classroom");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting student:", error.message);
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to delete student" };
  }
}
