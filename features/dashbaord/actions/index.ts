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

  revalidatePath("/dashboard");
  return playground;
};

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("You must be logged in.");
  }

  return db.playground.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
      Starmark: {
        where: {
          userId: user.id,
        },
        select: {
          isMarked: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteProjectById = async (projectId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("You must be logged in.");
  }

  const result = await db.playground.deleteMany({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (result.count === 0) {
    throw new Error("Project not found or access denied.");
  }
  revalidatePath("/dashboard");
};

export const editProjectById = async (
  projectId: string,
  data: { title: string; description?: string }
) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("You must be logged in.");
  }

  const title = data.title.trim();

  if (!title) {
    throw new Error("Project title cannot be empty.");
  }

  const result = await db.playground.updateMany({
    where: {
      id: projectId,
      userId: user.id,
    },
    data: {
      title,
      description: data.description?.trim() || "",
    },
  });

  if (result.count === 0) {
    throw new Error("Project not found or access denied.");
  }
  revalidatePath("/dashboard");
};

export const duplicateProjectById = async (projectId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("You must be logged in.");
  }

  const originalProject = await db.playground.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!originalProject) {
    throw new Error("Project not found or access denied.");
  }

  const duplicatedPlayground = await db.playground.create({
    data: {
      title: `${originalProject.title} (Copy)`,
      description: originalProject.description,
      template: originalProject.template,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
  return duplicatedPlayground;
};
