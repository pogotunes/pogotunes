import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)

    const where: Prisma.GameWhereInput = { status: "PUBLISHED" }
    if (categoryId) where.categoryId = categoryId

    const games = await prisma.game.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return successResponse(games)
  } catch {
    return errorResponse("Failed to fetch games", 500)
  }
}
