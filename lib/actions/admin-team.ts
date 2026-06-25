"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  TeamMemberFormSchema,
  type TeamMemberFormValues,
} from "@/lib/validations/team";
import type { ActionState } from "@/types";

export async function createTeamMember(data: TeamMemberFormValues): Promise<ActionState> {
  const parsed = TeamMemberFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.teamMember.create({
      data: {
        name: parsed.data.name,
        role: parsed.data.role,
        bio: parsed.data.bio || null,
        avatar: parsed.data.avatar || null,
        email: parsed.data.email || null,
        linkedIn: parsed.data.linkedIn || null,
        twitter: parsed.data.twitter || null,
        github: parsed.data.github || null,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
      },
    });

    revalidatePath("/admin/team");
    revalidatePath("/about");

    return { success: true, message: "Team member created successfully." };
  } catch (error) {
    console.error("[createTeamMember]", error);
    return { success: false, message: "Failed to create team member. Please try again." };
  }
}

export async function updateTeamMember(
  id: string,
  data: TeamMemberFormValues
): Promise<ActionState> {
  const parsed = TeamMemberFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.teamMember.update({
      where: { id },
      data: {
        name: parsed.data.name,
        role: parsed.data.role,
        bio: parsed.data.bio || null,
        avatar: parsed.data.avatar || null,
        email: parsed.data.email || null,
        linkedIn: parsed.data.linkedIn || null,
        twitter: parsed.data.twitter || null,
        github: parsed.data.github || null,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
      },
    });

    revalidatePath("/admin/team");
    revalidatePath("/about");

    return { success: true, message: "Team member updated successfully." };
  } catch (error) {
    console.error("[updateTeamMember]", error);
    return { success: false, message: "Failed to update team member. Please try again." };
  }
}

export async function deleteTeamMember(id: string): Promise<ActionState> {
  try {
    await prisma.teamMember.delete({ where: { id } });

    revalidatePath("/admin/team");
    revalidatePath("/about");

    return { success: true, message: "Team member deleted successfully." };
  } catch (error) {
    console.error("[deleteTeamMember]", error);
    return { success: false, message: "Failed to delete team member. Please try again." };
  }
}

export async function toggleTeamMemberPublish(id: string): Promise<ActionState> {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
      select: { isPublished: true },
    });
    if (!member) {
      return { success: false, message: "Team member not found." };
    }

    await prisma.teamMember.update({
      where: { id },
      data: { isPublished: !member.isPublished },
    });

    revalidatePath("/admin/team");
    revalidatePath("/about");

    return {
      success: true,
      message: member.isPublished ? "Team member hidden." : "Team member published.",
    };
  } catch (error) {
    console.error("[toggleTeamMemberPublish]", error);
    return { success: false, message: "Failed to update team member. Please try again." };
  }
}

export async function getAllTeamMembersAdmin() {
  return prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}
