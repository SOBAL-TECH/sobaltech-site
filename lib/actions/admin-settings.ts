"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateSettings, getSettings } from "@/lib/settings";
import type { ActionState } from "@/types";

// ─── Validation schemas ───────────────────────────────────────────────────────

const GeneralSettingsSchema = z.object({
  site_name: z.string().min(1, "Site name is required").max(100),
  site_tagline: z.string().max(200).optional().default(""),
  site_description: z.string().max(500).optional().default(""),
});

const HeroSettingsSchema = z.object({
  hero_headline: z.string().min(1, "Headline is required").max(200),
  hero_subheadline: z.string().max(400).optional().default(""),
  hero_cta_primary: z.string().max(60).optional().default(""),
  hero_cta_secondary: z.string().max(60).optional().default(""),
});

const ContactSettingsSchema = z.object({
  contact_email: z.string().email("Please enter a valid email").max(200),
  contact_phone: z.string().max(30).optional().default(""),
  contact_address: z.string().max(300).optional().default(""),
  social_twitter: z.string().url("Please enter a valid URL").max(200).optional().or(z.literal("")),
  social_github: z.string().url("Please enter a valid URL").max(200).optional().or(z.literal("")),
  social_linkedin: z.string().url("Please enter a valid URL").max(200).optional().or(z.literal("")),
  social_facebook: z.string().url("Please enter a valid URL").max(200).optional().or(z.literal("")),
  social_instagram: z
    .string()
    .url("Please enter a valid URL")
    .max(200)
    .optional()
    .or(z.literal("")),
});

const SeoSettingsSchema = z.object({
  seo_default_title: z.string().max(70, "Max 70 characters").optional().default(""),
  seo_default_description: z.string().max(160, "Max 160 characters").optional().default(""),
  seo_og_image: z.string().url("Please enter a valid URL").optional().or(z.literal("")).default(""),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type GeneralSettingsValues = z.infer<typeof GeneralSettingsSchema>;
export type HeroSettingsValues = z.infer<typeof HeroSettingsSchema>;
export type ContactSettingsValues = z.infer<typeof ContactSettingsSchema>;
export type SeoSettingsValues = z.infer<typeof SeoSettingsSchema>;

// ─── Save actions ─────────────────────────────────────────────────────────────

export async function saveGeneralSettings(data: GeneralSettingsValues): Promise<ActionState> {
  const parsed = GeneralSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateSettings(parsed.data as Record<string, string>);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, message: "General settings saved." };
  } catch (error) {
    console.error("[saveGeneralSettings]", error);
    return { success: false, message: "Failed to save settings." };
  }
}

export async function saveHeroSettings(data: HeroSettingsValues): Promise<ActionState> {
  const parsed = HeroSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateSettings(parsed.data as Record<string, string>);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, message: "Hero settings saved." };
  } catch (error) {
    console.error("[saveHeroSettings]", error);
    return { success: false, message: "Failed to save settings." };
  }
}

export async function saveContactSettings(data: ContactSettingsValues): Promise<ActionState> {
  const parsed = ContactSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateSettings(parsed.data as Record<string, string>);
    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    return { success: true, message: "Contact settings saved." };
  } catch (error) {
    console.error("[saveContactSettings]", error);
    return { success: false, message: "Failed to save settings." };
  }
}

export async function saveSeoSettings(data: SeoSettingsValues): Promise<ActionState> {
  const parsed = SeoSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateSettings(parsed.data as Record<string, string>);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, message: "SEO settings saved." };
  } catch (error) {
    console.error("[saveSeoSettings]", error);
    return { success: false, message: "Failed to save settings." };
  }
}

// ─── Load all settings ────────────────────────────────────────────────────────

export async function loadAllSettings() {
  return getSettings();
}

// ─── Load inbox data ─────────────────────────────────────────────────────────

export async function getContactSubmissions() {
  const { prisma: db } = await import("@/lib/db");
  return db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getQuoteRequests() {
  const { prisma: db } = await import("@/lib/db");
  return db.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
}

// ─── Update inbox submission status ──────────────────────────────────────────

export async function updateContactStatus(
  id: string,
  status: "NEW" | "IN_REVIEW" | "RESPONDED" | "CLOSED",
): Promise<ActionState> {
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.contactSubmission.update({ where: { id }, data: { status } });
    revalidatePath("/admin/inbox");
    return { success: true, message: "Status updated." };
  } catch (error) {
    console.error("[updateContactStatus]", error);
    return { success: false, message: "Failed to update status." };
  }
}

export async function updateQuoteStatus(
  id: string,
  status: "NEW" | "IN_REVIEW" | "RESPONDED" | "CLOSED",
): Promise<ActionState> {
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.quoteRequest.update({ where: { id }, data: { status } });
    revalidatePath("/admin/inbox");
    return { success: true, message: "Status updated." };
  } catch (error) {
    console.error("[updateQuoteStatus]", error);
    return { success: false, message: "Failed to update status." };
  }
}
