import { NextResponse } from "next/server"
import { isAIConfigured } from "@/lib/env"

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-4-26b-a4b-it:free",
  "qwen/qwen3-coder:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
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
            "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://pogotunes.netlify.app",
            "X-Title": "Pogo Tunes",
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

      const errBody = await response.text()
      lastErr = `Model ${model}: HTTP ${response.status} - ${errBody.slice(0, 200)}`
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
