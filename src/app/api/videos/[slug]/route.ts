import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const video = await prisma.video.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { category: true },
    })
    if (!video) {
      return errorResponse("Video not found", 404)
    }
    return successResponse(video)
  } catch (error) {
    console.error("Failed to fetch video:", error)
    return errorResponse("Failed to fetch video", 500)
  }
}
