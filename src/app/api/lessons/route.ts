import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const difficulty = searchParams.get("difficulty")
    const type = searchParams.get("type")
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)
    const page = Math.max(Number(searchParams.get("page")) || 1, 1)

    const where: Record<string, unknown> = { status: "PUBLISHED" }
    if (categoryId) where.categoryId = categoryId
    if (difficulty) where.difficulty = difficulty
    if (type) where.type = type

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where: where as any,
        include: { category: true },
        orderBy: { order: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lesson.count({ where: where as any }),
    ])

    return successResponse({
      data: lessons,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch {
    return errorResponse("Failed to fetch lessons", 500)
  }
}
