import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "asc" },
    })
    return successResponse(achievements)
  } catch {
    return errorResponse("Failed to fetch achievements", 500)
  }
}
