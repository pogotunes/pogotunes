import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse, getAuthUser, clearAuthCookie } from "@/lib/api-utils"

export async function DELETE() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    await prisma.user.delete({ where: { id: user.id } })
    await clearAuthCookie()

    return successResponse({ message: "Account deleted successfully" })
  } catch {
    return errorResponse("Failed to delete account", 500)
  }
}
