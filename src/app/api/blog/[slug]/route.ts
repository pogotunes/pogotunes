import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await prisma.blog.findUnique({ where: { slug } })
    if (!post) return errorResponse("Blog post not found", 404)
    return successResponse(post)
  } catch {
    return errorResponse("Failed to fetch blog post", 500)
  }
}
