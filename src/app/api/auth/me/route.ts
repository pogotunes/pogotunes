import { successResponse, errorResponse, getAuthUser, sanitizeUser } from "@/lib/api-utils"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return errorResponse("Not authenticated", 401)
    }
    return successResponse(sanitizeUser(user))
  } catch {
    return errorResponse("Failed to get user", 500)
  }
}
