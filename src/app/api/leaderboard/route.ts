import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: { select: { xp: true } },
        progress: {
          select: { score: true, completed: true },
          where: { completed: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    })

    const leaderboard = users
      .map((user) => ({
        id: user.id,
        name: user.name || user.email?.split("@")[0] || "Anonymous",
        xp: user.progress.reduce((sum, p) => sum + (p.score || 0), 0),
        lessonsCompleted: user.progress.filter((p) => p.completed).length,
      }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10)

    return successResponse(leaderboard)
  } catch {
    return errorResponse("Failed to fetch leaderboard", 500)
  }
}
