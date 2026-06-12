import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateResetToken } from "@/lib/auth"
import { forgotPasswordSchema } from "@/lib/validations"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = forgotPasswordSchema.safeParse(body)
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { email } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return successResponse({ message: "If that email exists, a reset link has been sent" })
    }

    const resetToken = generateResetToken()

    await prisma.user.update({
      where: { id: user.id },
      data: { otpSecret: resetToken },
    })

    // TODO: Send email with reset link
    // await sendResetEmail(email, resetToken)

    return successResponse({ message: "If that email exists, a reset link has been sent" })
  } catch {
    return errorResponse("Failed to process request", 500)
  }
}
