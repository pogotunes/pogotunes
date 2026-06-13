import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const category = await prisma.category.findFirst({
      where: { slug, isActive: true },
      include: {
        lessons: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, take: 20 },
        quizzes: { where: { status: "PUBLISHED" }, take: 10 },
        games: { where: { status: "PUBLISHED" }, take: 10 },
        videos: { where: { status: "PUBLISHED" }, take: 10 },
        flashcards: { where: { status: "PUBLISHED" }, take: 10 },
      },
    })
    if (!category) {
      return errorResponse("Category not found", 404)
    }
    return successResponse(category)
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return errorResponse("Failed to fetch category", 500)
  }
}
