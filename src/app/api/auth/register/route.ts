import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, generateToken } from "@/lib/auth"
import { registerSchema } from "@/lib/validations"
import { successResponse, errorResponse, setAuthCookie, sanitizeUser } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return errorResponse("An account with this email already exists", 409)
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        displayName: name,
        password: hashedPassword,
        profile: { create: {} },
        settings: { create: {} },
      },
      include: { profile: true, settings: true },
    })

    const token = generateToken({ userId: user.id })
    await setAuthCookie(token)

    return successResponse(sanitizeUser(user), 201)
  } catch (error) {
    console.error("Register error:", error)
    return errorResponse("Registration failed", 500)
  }
}
