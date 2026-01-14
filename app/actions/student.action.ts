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
