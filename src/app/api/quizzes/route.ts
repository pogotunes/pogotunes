import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)

    const where: Prisma.QuizWhereInput = { status: "PUBLISHED" }
    if (categoryId) where.categoryId = categoryId

    const quizzes = await prisma.quiz.findMany({
      where,
      include: { category: true, _count: { select: { questions: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return successResponse(quizzes)
  } catch {
    return errorResponse("Failed to fetch quizzes", 500)
  }
}
