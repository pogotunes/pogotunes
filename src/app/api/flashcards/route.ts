import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)

    const where: Record<string, unknown> = { status: "PUBLISHED" }
    if (categoryId) where.categoryId = categoryId

    const flashcards = await prisma.flashcard.findMany({
      where: where as any,
      include: { category: true, _count: { select: { cards: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return successResponse(flashcards)
  } catch {
    return errorResponse("Failed to fetch flashcards", 500)
  }
}
