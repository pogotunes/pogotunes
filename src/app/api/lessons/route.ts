import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import type { LessonType, Difficulty } from "@prisma/client"
import { errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const difficulty = searchParams.get("difficulty")
    const type = searchParams.get("type")
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)
    const page = Math.max(Number(searchParams.get("page")) || 1, 1)

    const where: Prisma.LessonWhereInput = { status: "PUBLISHED" }
    if (categoryId) where.categoryId = categoryId
    if (difficulty) where.difficulty = difficulty as Difficulty
    if (type) where.type = type as LessonType

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        include: { category: true },
        orderBy: { order: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lesson.count({ where }),
    ])

    return Response.json({
      success: true,
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
