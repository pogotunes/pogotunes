import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const flashcard = await prisma.flashcard.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: true,
        cards: { orderBy: { order: "asc" } },
      },
    })
    if (!flashcard) {
      return errorResponse("Flashcard set not found", 404)
    }
    return successResponse(flashcard)
  } catch (error) {
    console.error("Failed to fetch flashcard:", error)
    return errorResponse("Failed to fetch flashcard set", 500)
  }
}
