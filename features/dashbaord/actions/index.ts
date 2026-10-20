"use server";

import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { Templates } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPlayground = async (data: {
  title: string;
  template: Templates;
  description?: string;
}) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      throw new Error("You must be logged in to create a playground.");
    }

    const title = data.title.trim();

    if (!title) {
      throw new Error("Project title cannot be empty.");
    }

    const playground = await db.playground.create({
      data: {
        title,
        template: data.template,
        description: data.description?.trim() || "",
        userId: user.id,
      },
    });

    return playground;
  } catch (error) {
    console.error("Error creating playground:", error);
    throw error;
  }
};

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        Starmark: {
          where: {
            userId: user?.id,
          },
          select: {
            isMarked: true,
          }
        }
      }
    })

    return playground
  } catch (error) {
    console.error("Error fetching playgrounds:", error);
    throw error;
  }
};

export const deleteProjectById = async (projectId: string) => {
  try {
    await db.playground.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const editProjectById = async (projectId: string, data: { title: string; description?: string }) => {

  try {
    await db.playground.update({
      where: {
        id: projectId,
      },
      data: data
    })
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export const duplicateProjectById = async (projectId: string) => {
  try {
    const originalProject = await db.playground.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!originalProject) {
      throw new Error("Project not found.");
    }

    const duplicatedPlayground = await db.playground.create({
      data: {
        title: `${originalProject.title} (Copy)`,
        description: originalProject.description,
        template: originalProject.template,
        userId: originalProject.userId,
      }
    })

    revalidatePath("/dashboard");
    return duplicatedPlayground;
  } catch (error) {
    console.error("Error duplicating project:", error);
    return null
  }
};