import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, getAuthUser } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    const body = await request.json()
    const { quizId, score, total, answers, timeSpent, passed, attempt } = body

    if (!quizId || score === undefined || !total) {
      return errorResponse("Missing required fields: quizId, score, total", 400)
    }

    const quizProgress = await prisma.quizProgress.upsert({
      where: {
        userId_quizId_attempt: {
          userId: user.id,
          quizId,
          attempt: attempt ?? 1,
        },
      },
      update: {
        score,
        total,
        answers: answers ?? {},
        timeSpent: timeSpent ?? 0,
        passed: passed ?? score >= total * 0.6,
      },
      create: {
        userId: user.id,
        quizId,
        score,
        total,
        answers: answers ?? {},
        timeSpent: timeSpent ?? 0,
        passed: passed ?? score >= total * 0.6,
        attempt: attempt ?? 1,
      },
    })

    return successResponse(quizProgress, 201)
  } catch {
    return errorResponse("Failed to submit quiz result", 500)
  }
}
