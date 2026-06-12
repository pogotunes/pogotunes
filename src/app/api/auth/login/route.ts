import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, generateToken } from "@/lib/auth"
import { loginSchema } from "@/lib/validations"
import { successResponse, errorResponse, setAuthCookie, sanitizeUser } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { email, password } = parsed.data

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true, settings: true },
    })
    if (!user || !user.password) {
      return errorResponse("Invalid email or password", 401)
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return errorResponse("Invalid email or password", 401)
    }

    if (!user.isActive) {
      return errorResponse("Account has been deactivated", 403)
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    const token = generateToken({ userId: user.id })
    await setAuthCookie(token)

    return successResponse(sanitizeUser(user))
  } catch (error) {
    console.error("Login error:", error)
    return errorResponse("Login failed", 500)
  }
}
