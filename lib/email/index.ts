import { Resend } from "resend";
import type { ContactSubmission, QuoteRequest } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "SobalTech <noreply@sobaltech.com>";
const NOTIFY_ADDRESS =
  process.env.EMAIL_NOTIFY ?? "hello@sobaltech.com";

// ─── Contact notification to admin ────────────────────────────────────────────

export async function sendContactNotification(
  data: ContactSubmission
): Promise<void> {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_ADDRESS,
    subject: `New Contact: ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #6366f1; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Submission</h1>
        </div>
        <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td>
              <td style="padding: 8px 0; color: #1f2937;">
                <a href="mailto:${data.email}" style="color: #6366f1;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone</td><td style="padding: 8px 0; color: #1f2937;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Company</td><td style="padding: 8px 0; color: #1f2937;">${data.company}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Subject</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.subject}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: 600; color: #374151; margin-bottom: 8px;">Message</p>
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; color: #1f2937; white-space: pre-wrap;">${data.message}</div>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/contacts/${data.id}"
               style="background: #6366f1; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              View in Admin
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

// ─── Quote request notification to admin ──────────────────────────────────────

export async function sendQuoteNotification(
  data: QuoteRequest
): Promise<void> {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_ADDRESS,
    subject: `New Quote Request: ${data.projectType}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #6366f1; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
        </div>
        <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Name</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${data.email}" style="color: #6366f1;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone</td><td style="padding: 8px 0; color: #1f2937;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Company</td><td style="padding: 8px 0; color: #1f2937;">${data.company}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Project Type</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.projectType}</td>
            </tr>
            ${data.budget ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Budget</td><td style="padding: 8px 0; color: #1f2937;">${data.budget}</td></tr>` : ""}
            ${data.timeline ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Timeline</td><td style="padding: 8px 0; color: #1f2937;">${data.timeline}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Services</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.services.join(", ")}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: 600; color: #374151; margin-bottom: 8px;">Project Description</p>
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; color: #1f2937; white-space: pre-wrap;">${data.description}</div>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/quotes/${data.id}"
               style="background: #6366f1; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              View in Admin
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

// ─── Confirmation email to the sender ─────────────────────────────────────────

export async function sendContactConfirmation(
  email: string,
  name: string
): Promise<void> {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "We received your message — SobalTech",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #6366f1; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">SobalTech</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Building digital excellence</p>
        </div>
        <div style="background: white; padding: 32px 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1f2937; margin: 0 0 16px;">Thanks for reaching out, ${name}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
            We've received your message and will get back to you within <strong>1–2 business days</strong>.
          </p>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            In the meantime, feel free to explore our portfolio or learn more about what we do.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}"
               style="background: #6366f1; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Visit SobalTech
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
            You're receiving this email because you submitted a contact form at
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #6366f1;">sobaltech.com</a>.
          </p>
        </div>
      </div>
    `,
  });
}

// ─── Quote confirmation email to the requester ────────────────────────────────

export async function sendQuoteConfirmation(
  email: string,
  name: string,
  projectType: string
): Promise<void> {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Quote request received — SobalTech",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #6366f1; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">SobalTech</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Building digital excellence</p>
        </div>
        <div style="background: white; padding: 32px 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1f2937; margin: 0 0 16px;">Thanks for your interest, ${name}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
            We've received your quote request for <strong>${projectType}</strong> and our team is already reviewing it.
          </p>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            We'll send you a detailed proposal within <strong>2–3 business days</strong>.
          </p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <p style="color: #374151; font-weight: 600; margin: 0 0 8px;">What happens next?</p>
            <ol style="color: #4b5563; padding-left: 20px; margin: 0; line-height: 2;">
              <li>Our team reviews your project requirements</li>
              <li>We prepare a tailored proposal with timeline and pricing</li>
              <li>We schedule a discovery call to discuss your project</li>
            </ol>
          </div>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/portfolio"
               style="background: #6366f1; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">
              View Our Work
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
            Questions? Reply to this email or contact us at
            <a href="mailto:${NOTIFY_ADDRESS}" style="color: #6366f1;">${NOTIFY_ADDRESS}</a>.
          </p>
        </div>
      </div>
    `,
  });
}
