import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return successResponse(categories)
  } catch {
    return errorResponse("Failed to fetch categories", 500)
  }
}
