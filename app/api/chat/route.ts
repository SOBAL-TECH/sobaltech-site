import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are SobalTech's website assistant.
Help visitors understand SobalTech's services, products, portfolio, pricing process, and next steps.
Keep answers concise, practical, and sales-supportive without being pushy.
If the visitor asks for a quote, recommend the request quote page.
If the visitor needs human help, recommend contacting hello@sobaltech.com.
Do not invent guarantees, exact prices, or client facts not present in the site.`;

function isValidMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (record.role === "user" || record.role === "assistant") &&
    typeof record.content === "string" &&
    record.content.trim().length > 0
  );
}

function extractOpenAIText(response: Record<string, unknown>): string {
  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  const output = response.output;
  if (!Array.isArray(output)) return "";

  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;

    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as Record<string, unknown>).text;
      if (typeof text === "string" && text.trim()) {
        return text;
      }
    }
  }

  return "";
}

function extractGeminiText(response: Record<string, unknown>): string {
  const candidates = response.candidates;
  if (!Array.isArray(candidates)) return "";

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const content = (candidate as Record<string, unknown>).content;
    if (!content || typeof content !== "object") continue;
    const parts = (content as Record<string, unknown>).parts;
    if (!Array.isArray(parts)) continue;

    const text = parts
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const value = (part as Record<string, unknown>).text;
        return typeof value === "string" ? value.trim() : "";
      })
      .filter(Boolean)
      .join("\n\n");

    if (text) return text;
  }

  return "";
}

async function generateGeminiReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

  const model = (process.env.GEMINI_MODEL ?? "gemini-2.0-flash").replace(
    /^models\//,
    ""
  );

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content.slice(0, 2000) }],
        })),
        generationConfig: {
          maxOutputTokens: 450,
          temperature: 0.4,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[chat] Gemini API error:", errorText);
    return "I could not reach the AI service right now. Please try again or contact hello@sobaltech.com.";
  }

  const data = (await response.json()) as Record<string, unknown>;
  return (
    extractGeminiText(data) ||
    "I received your message, but could not generate a response. Please try again."
  );
}

async function generateOpenAIReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const input = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...messages.map((message) => ({
      role: message.role,
      content: message.content.slice(0, 2000),
    })),
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.5",
      input,
      max_output_tokens: 450,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[chat] OpenAI API error:", errorText);
    return "I could not reach the AI service right now. Please try again or contact hello@sobaltech.com.";
  }

  const data = (await response.json()) as Record<string, unknown>;
  return (
    extractOpenAIText(data) ||
    "I received your message, but could not generate a response. Please try again."
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages) || !messages.every(isValidMessage)) {
    return NextResponse.json(
      { error: "Expected messages: { role, content }[]." },
      { status: 400 }
    );
  }

  const recentMessages = messages.slice(-10);

  try {
    if (process.env.GEMINI_API_KEY) {
      const message = await generateGeminiReply(recentMessages);
      return NextResponse.json({ message });
    }

    if (process.env.OPENAI_API_KEY) {
      const message = await generateOpenAIReply(recentMessages);
      return NextResponse.json({ message });
    }

    return NextResponse.json(
      {
        message:
          "Chatbot is installed, but GEMINI_API_KEY is not configured yet. Add it to your environment to enable live AI replies. OPENAI_API_KEY can also be used as an optional fallback.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong with the chatbot. Please try again or email hello@sobaltech.com.",
      },
      { status: 200 }
    );
  }
}
