"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createClassroom(data: { grade: number; section: string }) {
  try {
    const classroom = await prisma.classroom.create({
      data: {
        grade: data.grade,
        section: data.section,
      },
    });

    revalidatePath("/");

    return { success: true, data: classroom };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create classroom" };
  }
}

export async function getClassrooms() {
  try {
    const classrooms = await prisma.classroom.findMany({
      orderBy: [{ grade: "asc" }, { section: "asc" }],
    });

    return { success: true, data: classrooms };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch classrooms" };
  }
}

export async function getClassroomBySection(section: string) {
  try {
    const classroom = await prisma.classroom.findFirst({
      where: {
        section: {
          equals: section,
          mode: "insensitive",
        },
      },
    });

    if (!classroom) {
      return { success: false, error: "Classroom not found" };
    }

    return { success: true, data: classroom };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch classroom" };
  }
}
