import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const flashcard = await prisma.flashcard.findUnique({
      where: { slug },
      include: {
        category: true,
        cards: { orderBy: { order: "asc" } },
      },
    })
    if (!flashcard) {
      return errorResponse("Flashcard set not found", 404)
    }
    return successResponse(flashcard)
  } catch {
    return errorResponse("Failed to fetch flashcard set", 500)
  }
}
