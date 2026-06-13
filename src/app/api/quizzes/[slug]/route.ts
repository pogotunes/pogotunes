import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const quiz = await prisma.quiz.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: true,
        questions: { orderBy: { order: "asc" } },
      },
    })
    if (!quiz) {
      return errorResponse("Quiz not found", 404)
    }
    return successResponse(quiz)
  } catch (error) {
    console.error("Failed to fetch quiz:", error)
    return errorResponse("Failed to fetch quiz", 500)
  }
}
