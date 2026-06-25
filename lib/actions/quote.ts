"use server";

import { prisma } from "@/lib/db";
import {
  QuoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validations/contact";
import {
  sendQuoteNotification,
  sendQuoteConfirmation,
} from "@/lib/email";
import type { ActionState } from "@/types";

export async function submitQuoteRequest(
  data: QuoteFormValues
): Promise<ActionState> {
  // Re-validate on the server
  const parsed = QuoteFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        projectType: parsed.data.projectType,
        budget: parsed.data.budget || null,
        timeline: parsed.data.timeline || null,
        description: parsed.data.description,
        services: parsed.data.services,
      },
    });

    // Fire-and-forget emails
    sendQuoteNotification(quoteRequest).catch((err) =>
      console.error("[quote] notification email failed:", err)
    );
    sendQuoteConfirmation(
      quoteRequest.email,
      quoteRequest.name,
      quoteRequest.projectType
    ).catch((err) =>
      console.error("[quote] confirmation email failed:", err)
    );

    return {
      success: true,
      message:
        "Quote request received! We'll prepare a tailored proposal within 2–3 business days.",
    };
  } catch (error) {
    console.error("[submitQuoteRequest]", error);
    return {
      success: false,
      message:
        "Something went wrong. Please try again or email us directly at hello@sobaltech.com.",
    };
  }
}
