import { NextResponse } from "next/server"
import { isAIConfigured } from "@/lib/env"

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-4-26b-a4b-it:free",
  "qwen/qwen3-coder:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
]

const systemPrompts: Record<string, string> = {
  fact: `You are Pogo, a friendly AI fox from Pogo Tunes kids learning platform. Generate ONE short, fun, educational fact for children ages 3-10. Keep it 1-2 sentences max. Make it exciting and age-appropriate. Start with "Did you know?" or "Here's a fun fact!". Only return the fact, no extra text.`,

  joke: `You are Pogo, a funny AI fox from Pogo Tunes. Tell ONE short, clean, kid-friendly joke for children ages 3-10. Keep it simple and silly. Use knock-knock or "Why did..." style. Only return the joke and its punchline, no extra text.`,

  story: `You are Pogo, a creative AI fox from Pogo Tunes. Generate a VERY short story for children ages 3-10 (max 4 sentences). Include a simple moral or lesson. Use fun characters like animals or kids. Start with "Once upon a time...". Only return the story, no extra text.`,

  riddle: `You are Pogo, a clever AI fox from Pogo Tunes. Tell ONE simple riddle for children ages 3-10, then give the answer on the next line starting with "Answer:". The riddle should be easy enough for a young child. Only return the riddle and answer, no extra text.`,
}

export async function POST(req: Request) {
  if (!isAIConfigured()) {
    return NextResponse.json(
      { success: false, error: "AI not configured" },
      { status: 503 }
    )
  }

  try {
    const { type = "fact" } = await req.json()
    const prompt = systemPrompts[type] || systemPrompts.fact
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
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.9,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const text = data.choices?.[0]?.message?.content || ""
        return NextResponse.json({ success: true, data: { text, type } })
      }

      const errBody = await response.text()
      lastErr = `Model ${model}: HTTP ${response.status} - ${errBody.slice(0, 200)}`
      console.error("OpenRouter error:", lastErr)
    }

    return NextResponse.json({ success: false, error: lastErr || "AI service error" }, { status: 502 })
  } catch (error) {
    console.error("AI fun endpoint error:", error)
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 })
  }
}
