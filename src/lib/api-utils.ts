import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, generateToken } from "./auth"
import { prisma } from "./prisma"

const COOKIE_NAME = "pogotunes-token"

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const payload = verifyToken<{ userId: string }>(token)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true, settings: true },
    })
    return user
  } catch {
    return null
  }
}

export function sanitizeUser(user: {
  id: string
  email: string | null
  name: string | null
  displayName: string | null
  avatar: string | null
  role: string
  phone: string | null
  googleId: string | null
  facebookId: string | null
  githubId: string | null
  isActive: boolean
  isPremium: boolean
  premiumUntil: Date | null
  lastLoginAt: Date | null
  twoFactorAuth: boolean
  createdAt: Date
  updatedAt: Date
  profile?: {
    id: string
    userId: string
    bio: string | null
    age: number | null
    grade: string | null
    school: string | null
    parentEmail: string | null
    parentPhone: string | null
    country: string | null
    city: string | null
    timezone: string | null
    language: string
    xp: number
    coins: number
    stars: number
    level: number
    streak: number
    longestStreak: number
    lastActiveAt: Date
    totalLessons: number
    totalQuizzes: number
    totalGames: number
    totalVideos: number
    totalPoints: number
    accuracy: number
    createdAt: Date
    updatedAt: Date
  } | null
  settings?: {
    id: string
    userId: string
    theme: string
    fontSize: string
    reducedMotion: boolean
    highContrast: boolean
    emailNotifications: boolean
    pushNotifications: boolean
    soundEnabled: boolean
    autoPlay: boolean
    createdAt: Date
    updatedAt: Date
  } | null
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    displayName: user.displayName,
    avatar: user.avatar,
    role: user.role,
    phone: user.phone,
    isActive: user.isActive,
    isPremium: user.isPremium,
    premiumUntil: user.premiumUntil?.toISOString() ?? null,
    lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    twoFactorAuth: user.twoFactorAuth,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    profile: user.profile
      ? {
          ...user.profile,
          lastActiveAt: user.profile.lastActiveAt.toISOString(),
          createdAt: user.profile.createdAt.toISOString(),
          updatedAt: user.profile.updatedAt.toISOString(),
        }
      : null,
    settings: user.settings
      ? {
          ...user.settings,
          createdAt: user.settings.createdAt.toISOString(),
          updatedAt: user.settings.updatedAt.toISOString(),
        }
      : null,
  }
}
