import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, getAuthUser } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    const body = await request.json()
    const { gameId, score, completed } = body

    if (!gameId || score === undefined) {
      return errorResponse("Missing required fields: gameId, score", 400)
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    })

    if (!game) {
      return errorResponse("Game not found", 404)
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: gameId,
        },
      },
      update: {
        completed: completed ?? true,
        score,
        attempts: { increment: 1 },
      },
      create: {
        userId: user.id,
        lessonId: gameId,
        completed: completed ?? true,
        score,
        attempts: 1,
      },
    })

    return successResponse({
      highScore: progress.score,
      attempts: progress.attempts,
    })
  } catch {
    return errorResponse("Failed to submit game result", 500)
  }
}
