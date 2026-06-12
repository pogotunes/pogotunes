export const appConfig = {
  name: 'Pogo Tunes',
  description: 'World\'s best educational platform for kids',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  locale: 'en-US',
  timezone: 'UTC',
  version: '1.0.0',
  supportEmail: 'support@pogotunes.com',
  supportPhone: '+1-800-POGO-TUNES',
}

export const seoConfig = {
  defaultTitle: 'Pogo Tunes - Learn & Play!',
  titleTemplate: '%s | Pogo Tunes',
  defaultDescription: 'World\'s best educational platform for kids. Learn math, science, reading, coding and more through fun games and interactive lessons.',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-default.png',
  twitterHandle: '@pogotunes',
  locale: 'en_US',
  additionalMetaTags: [
    { name: 'application-name', content: 'Pogo Tunes' },
    { name: 'theme-color', content: '#FF6B6B' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  ],
}

export const authConfig = {
  sessionMaxAge: 7 * 24 * 60 * 60,
  otpExpiry: 10 * 60 * 1000,
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000,
  passwordMinLength: 6,
  passwordResetExpiry: 60 * 60 * 1000,
  providers: ['credentials', 'google', 'facebook', 'github'] as const,
  oauthRedirectUrl: '/auth/callback',
}

export const paginationConfig = {
  defaultPageSize: 12,
  maxPageSize: 100,
  pageSizeOptions: [12, 24, 48, 96] as const,
  nearbyPages: 2,
}

export const uploadConfig = {
  maxFileSize: 5 * 1024 * 1024,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  allowedAudioTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  maxImageDimensions: { width: 3840, height: 2160 },
  imageQuality: 80,
  uploadDir: 'uploads',
  avatarsDir: 'uploads/avatars',
  lessonsDir: 'uploads/lessons',
  gamesDir: 'uploads/games',
}

export const gameConfig = {
  defaultLives: 3,
  maxLives: 5,
  lifeRegenTime: 5 * 60 * 1000,
  pointsPerCorrect: 10,
  pointsPerSecond: 5,
  streakBonus: 1.5,
  levelThresholds: [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500],
  memoryGridSizes: {
    EASY: { rows: 2, cols: 2 },
    MEDIUM: { rows: 3, cols: 4 },
    HARD: { rows: 4, cols: 4 },
    EXPERT: { rows: 6, cols: 6 },
  },
  puzzleTimeLimits: {
    EASY: 120,
    MEDIUM: 90,
    HARD: 60,
    EXPERT: 30,
  },
}

export const achievementConfig = {
  checkInterval: 60 * 1000,
  notificationOnUnlock: true,
  maxDisplayQueue: 10,
}

export const cacheConfig = {
  pages: {
    ttl: 60 * 5,
    staleTtl: 60 * 60,
  },
  api: {
    ttl: 60 * 2,
    staleTtl: 60 * 30,
  },
  images: {
    ttl: 60 * 60 * 24,
  },
  revalidation: {
    lesson: 60 * 5,
    category: 60 * 10,
    leaderboard: 60 * 2,
    blog: 60 * 5,
  },
}

export const featureFlags = {
  enableOAuth: true,
  enablePremium: true,
  enableAchievements: true,
  enableCertificates: true,
  enableLeaderboard: true,
  enableBlog: true,
  enableNewsletter: true,
  enableComments: true,
  enableAnalytics: false,
  enableAds: false,
  enableGamification: true,
  enableSocialLogin: true,
  enableTwoFactor: false,
  enableDarkMode: true,
  enableAnimations: true,
  enableSoundEffects: true,
  enableDragDropQuiz: true,
  enableTimedQuiz: true,
  enableVideoTranscription: true,
  enableFlashcardAudio: true,
  maintenanceMode: false,
}
