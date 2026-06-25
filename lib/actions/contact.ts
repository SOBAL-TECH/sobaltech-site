"use server";

import { prisma } from "@/lib/db";
import {
  ContactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email";
import type { ActionState } from "@/types";

export async function submitContactForm(
  data: ContactFormValues
): Promise<ActionState> {
  // Re-validate on the server (never trust client-only validation)
  const parsed = ContactFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    // Fire-and-forget emails — errors don't fail the submission
    sendContactNotification(submission).catch((err) =>
      console.error("[contact] notification email failed:", err)
    );
    sendContactConfirmation(submission.email, submission.name).catch((err) =>
      console.error("[contact] confirmation email failed:", err)
    );

    return {
      success: true,
      message:
        "Message received! We'll get back to you within 1–2 business days.",
    };
  } catch (error) {
    console.error("[submitContactForm]", error);
    return {
      success: false,
      message:
        "Something went wrong. Please try again or email us directly at hello@sobaltech.com.",
    };
  }
}
