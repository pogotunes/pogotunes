import { successResponse, errorResponse, clearAuthCookie } from "@/lib/api-utils"

export async function POST() {
  try {
    await clearAuthCookie()
    return successResponse({ message: "Logged out successfully" })
  } catch {
    return errorResponse("Logout failed", 500)
  }
}
