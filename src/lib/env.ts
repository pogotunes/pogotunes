const requiredVars = [
  "DATABASE_URL",
  "JWT_SECRET",
] as const

const optionalVars = [
  "JWT_EXPIRES_IN",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "FACEBOOK_CLIENT_ID",
  "FACEBOOK_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "REDIS_URL",
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_AD_CLIENT",
] as const

type EnvVar = (typeof requiredVars)[number] | (typeof optionalVars)[number]

class EnvValidationError extends Error {
  constructor(missing: string[]) {
    super(`Missing required environment variables: ${missing.join(", ")}`)
    this.name = "EnvValidationError"
  }
}

let validated = false

export function validateEnv(): void {
  if (validated) return

  const missing: string[] = []
  for (const key of requiredVars) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
      throw new EnvValidationError(missing)
    }
    console.warn(`⚠️ Missing required env vars: ${missing.join(", ")}`)
  }

  validated = true
}

export function getEnvVar(key: EnvVar, fallback?: string): string {
  const val = process.env[key] || fallback
  if (!val) {
    throw new Error(`Environment variable ${key} is not set and no fallback provided`)
  }
  return val
}

export function isSocialAuthConfigured(): boolean {
  return !!(process.env.GOOGLE_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID || process.env.GITHUB_CLIENT_ID)
}

export function isEmailConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

export function isCloudinaryConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY)
}
