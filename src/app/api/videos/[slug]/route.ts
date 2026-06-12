import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const video = await prisma.video.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (!video) {
      return errorResponse("Video not found", 404)
    }
    return successResponse(video)
  } catch {
    return errorResponse("Failed to fetch video", 500)
  }
}
