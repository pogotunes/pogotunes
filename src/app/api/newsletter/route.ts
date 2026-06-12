import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse("Valid email is required", 400)
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletter.update({
          where: { id: existing.id },
          data: { isActive: true },
        })
        return successResponse({ message: "Re-subscribed successfully" })
      }
      return successResponse({ message: "Already subscribed" })
    }

    await prisma.newsletter.create({ data: { email } })
    return successResponse({ message: "Subscribed successfully" }, 201)
  } catch {
    return errorResponse("Failed to subscribe", 500)
  }
}
