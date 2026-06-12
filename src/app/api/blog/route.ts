import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50)
    const page = Math.max(Number(searchParams.get("page")) || 1, 1)

    const [posts, total] = await Promise.all([
      prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
    ])

    return successResponse({
      data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch {
    return errorResponse("Failed to fetch blog posts", 500)
  }
}
