import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const game = await prisma.game.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { category: true },
    })
    if (!game) {
      return errorResponse("Game not found", 404)
    }
    return successResponse(game)
  } catch (error) {
    console.error("Failed to fetch game:", error)
    return errorResponse("Failed to fetch game", 500)
  }
}
