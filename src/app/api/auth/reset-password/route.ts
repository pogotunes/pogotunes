import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, verifyToken } from "@/lib/auth"
import { resetPasswordSchema } from "@/lib/validations"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = resetPasswordSchema.safeParse(body)
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { token, password } = parsed.data

    let payload: { type: string }
    try {
      payload = verifyToken<{ type: string }>(token)
    } catch {
      return errorResponse("Invalid or expired reset token", 400)
    }

    if (payload.type !== "password-reset") {
      return errorResponse("Invalid reset token", 400)
    }

    const user = await prisma.user.findFirst({
      where: { otpSecret: token },
    })
    if (!user) {
      return errorResponse("Invalid or expired reset token", 400)
    }

    const hashedPassword = await hashPassword(password)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, otpSecret: null },
    })

    return successResponse({ message: "Password reset successfully" })
  } catch {
    return errorResponse("Failed to reset password", 500)
  }
}
