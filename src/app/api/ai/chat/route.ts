import { NextResponse } from "next/server"
import { isAIConfigured } from "@/lib/env"

const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "cognitivecomputations/dolphin3.0-mistral-7b:free",
]

export async function POST(req: Request) {
  if (!isAIConfigured()) {
    return NextResponse.json(
      { success: false, error: "AI is not configured. Set OPENROUTER_API_KEY." },
      { status: 503 }
    )
  }

  try {
    const { message, context } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      )
    }

    const systemPrompt = context
      ? `You are Pogo, a friendly AI tutor for the Pogo Tunes kids learning platform. Keep answers short, fun, and educational for young children (ages 3-10). Use simple words. ${context}`
      : `You are Pogo, a friendly AI tutor for the Pogo Tunes kids learning platform. Keep answers short, fun, and educational for young children (ages 3-10). Use simple words.`

    let lastErr = ""

    for (const model of FREE_MODELS) {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content || ""
        return NextResponse.json({ success: true, data: { reply } })
      }

      const err = await response.text()
      lastErr = `Model ${model}: HTTP ${response.status} - ${err.slice(0, 200)}`
      console.error("OpenRouter error:", lastErr)
    }

    return NextResponse.json({ success: false, error: lastErr || "AI service error" }, { status: 502 })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
