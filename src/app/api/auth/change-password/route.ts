import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, hashPassword } from "@/lib/auth"
import { successResponse, errorResponse, getAuthUser } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return errorResponse("Current password and new password are required", 400)
    }

    if (newPassword.length < 6) {
      return errorResponse("New password must be at least 6 characters", 400)
    }

    const valid = await verifyPassword(currentPassword, user.password!)
    if (!valid) {
      return errorResponse("Current password is incorrect", 401)
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return successResponse({ message: "Password changed successfully" })
  } catch {
    return errorResponse("Failed to change password", 500)
  }
}
