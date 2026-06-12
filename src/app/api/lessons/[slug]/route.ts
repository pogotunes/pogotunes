import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (!lesson) {
      return errorResponse("Lesson not found", 404)
    }
    return successResponse(lesson)
  } catch {
    return errorResponse("Failed to fetch lesson", 500)
  }
}
