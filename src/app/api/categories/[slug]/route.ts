import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        lessons: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" } },
        quizzes: { where: { status: "PUBLISHED" } },
        games: { where: { status: "PUBLISHED" } },
        videos: { where: { status: "PUBLISHED" } },
        flashcards: { where: { status: "PUBLISHED" } },
      },
    })
    if (!category) {
      return errorResponse("Category not found", 404)
    }
    return successResponse(category)
  } catch {
    return errorResponse("Failed to fetch category", 500)
  }
}
