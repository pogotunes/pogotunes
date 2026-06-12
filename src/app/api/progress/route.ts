import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, getAuthUser } from "@/lib/api-utils"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    const progress = await prisma.progress.findMany({
      where: { userId: user.id },
      include: { lesson: { select: { id: true, title: true, slug: true } } },
      orderBy: { updatedAt: "desc" },
    })

    return successResponse(progress)
  } catch {
    return errorResponse("Failed to fetch progress", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    const body = await request.json()
    const { lessonId, completed, score, timeSpent } = body

    if (!lessonId) {
      return errorResponse("lessonId is required", 400)
    }

    const existing = await prisma.progress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId } },
    })

    if (existing) {
      const updated = await prisma.progress.update({
        where: { id: existing.id },
        data: {
          completed: completed ?? existing.completed,
          score: score ?? existing.score,
          timeSpent: timeSpent ?? existing.timeSpent,
          attempts: { increment: 1 },
        },
      })
      return successResponse(updated)
    }

    const created = await prisma.progress.create({
      data: {
        userId: user.id,
        lessonId,
        completed: completed ?? false,
        score,
        timeSpent,
        attempts: 1,
      },
    })

    return successResponse(created, 201)
  } catch {
    return errorResponse("Failed to save progress", 500)
  }
}
