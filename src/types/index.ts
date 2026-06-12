export type UserRole = 'USER' | 'TEACHER' | 'ADMIN' | 'SUPERADMIN'
export type LessonType = 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'GAME' | 'FLASHCARD' | 'PRACTICE'
export type QuizType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'MATCH' | 'FILL_BLANKS' | 'DRAG_DROP' | 'MEMORY' | 'IMAGE_QUIZ' | 'TIMED'
export type GameType = 'MEMORY' | 'PUZZLE' | 'SORTING' | 'MATCHING' | 'DRAG_DROP' | 'TAP' | 'SPEED' | 'SPELLING' | 'COUNTING' | 'COLOR' | 'SHAPE' | 'MAZE'
export type Difficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED'

export interface User {
  id: string
  email?: string
  name?: string
  displayName?: string
  avatar?: string
  role: UserRole
  phone?: string
  googleId?: string
  facebookId?: string
  githubId?: string
  isActive: boolean
  isPremium: boolean
  premiumUntil?: string
  lastLoginAt?: string
  twoFactorAuth: boolean
  createdAt: string
  updatedAt: string
  profile?: Profile
  settings?: UserSettings
}

export interface Profile {
  id: string
  userId: string
  bio?: string
  age?: number
  grade?: string
  school?: string
  parentEmail?: string
  parentPhone?: string
  country?: string
  city?: string
  timezone?: string
  language: string
  xp: number
  coins: number
  stars: number
  level: number
  streak: number
  longestStreak: number
  lastActiveAt: string
  totalLessons: number
  totalQuizzes: number
  totalGames: number
  totalVideos: number
  totalPoints: number
  accuracy: number
  createdAt: string
  updatedAt: string
}

export interface UserSettings {
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
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  userId: string
  token: string
  device?: string
  browser?: string
  os?: string
  ip?: string
  location?: string
  isActive: boolean
  lastUsedAt: string
  expiresAt: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  image?: string
  color?: string
  order: number
  parentId?: string
  parent?: Category
  children: Category[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  categoryId: string
  category: Category
  image?: string
  videoUrl?: string
  duration?: number
  difficulty: Difficulty
  type: LessonType
  status: ContentStatus
  order: number
  isFree: boolean
  tags: string[]
  seoTitle?: string
  seoDesc?: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
  nextLesson?: Lesson
  prevLesson?: Lesson
  progress?: Progress[]
  bookmarks?: Bookmark[]
  comments?: Comment[]
}

export interface Video {
  id: string
  title: string
  slug: string
  description?: string
  categoryId: string
  category: Category
  url: string
  thumbnail?: string
  duration?: number
  transcript?: string
  notes?: string
  status: ContentStatus
  order: number
  isFree: boolean
  tags: string[]
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  title: string
  slug: string
  description?: string
  categoryId: string
  category: Category
  image?: string
  type: QuizType
  difficulty: Difficulty
  status: ContentStatus
  timeLimit?: number
  passingScore: number
  maxAttempts: number
  questions: Question[]
  isFree: boolean
  tags: string[]
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  quizId: string
  text: string
  image?: string
  options: string[]
  correctAnswer: string
  order: number
  points: number
  hint?: string
  explanation?: string
  createdAt: string
  updatedAt: string
}

export interface Flashcard {
  id: string
  title: string
  slug: string
  description?: string
  categoryId: string
  category: Category
  image?: string
  status: ContentStatus
  cards: FlashcardCard[]
  isFree: boolean
  tags: string[]
  viewCount: number
  createdAt: string
  updatedAt: string
}

export interface FlashcardCard {
  id: string
  flashcardId: string
  front: string
  back: string
  image?: string
  audio?: string
  order: number
  createdAt: string
}

export interface Game {
  id: string
  title: string
  slug: string
  description?: string
  categoryId: string
  category: Category
  image?: string
  type: GameType
  difficulty: Difficulty
  status: ContentStatus
  config?: GameConfig
  isFree: boolean
  tags: string[]
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
}

export interface GameConfig {
  gridSize?: number
  timeLimit?: number
  lives?: number
  rounds?: number
  speed?: number
  items?: string[]
  colors?: string[]
  shapes?: string[]
  soundEnabled?: boolean
  difficultyMultiplier?: number
}

export interface Progress {
  id: string
  userId: string
  lessonId?: string
  lesson?: Lesson
  completed: boolean
  score?: number
  timeSpent?: number
  attempts: number
  createdAt: string
  updatedAt: string
}

export interface QuizProgress {
  id: string
  userId: string
  quizId: string
  quiz: Quiz
  score: number
  total: number
  answers?: Record<string, string>
  timeSpent?: number
  attempt: number
  passed: boolean
  createdAt: string
}

export interface Achievement {
  id: string
  name: string
  description?: string
  icon?: string
  type: string
  xpReward: number
  coinReward: number
  starsReward: number
  requirement?: number
  criteria?: Record<string, unknown>
  isHidden: boolean
  createdAt: string
  updatedAt: string
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  achievement: Achievement
  progress: number
  unlockedAt: string
  notified: boolean
}

export interface Certificate {
  id: string
  userId: string
  title: string
  description?: string
  image?: string
  type: string
  categoryId?: string
  issuedAt: string
  createdAt: string
}

export interface Bookmark {
  id: string
  userId: string
  lessonId?: string
  lesson?: Lesson
  videoId?: string
  video?: Video
  quizId?: string
  quiz?: Quiz
  gameId?: string
  game?: Game
  flashcardId?: string
  flashcard?: Flashcard
  createdAt: string
}

export interface Comment {
  id: string
  userId: string
  user: User
  lessonId?: string
  lesson?: Lesson
  videoId?: string
  video?: Video
  content: string
  parentId?: string
  parent?: Comment
  replies: Comment[]
  likes: number
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface Like {
  id: string
  userId: string
  lessonId?: string
  videoId?: string
  quizId?: string
  gameId?: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message?: string
  type: string
  link?: string
  read: boolean
  createdAt: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  image?: string
  author?: string
  category?: string
  tags: string[]
  status: ContentStatus
  seoTitle?: string
  seoDesc?: string
  viewCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Newsletter {
  id: string
  email: string
  isActive: boolean
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface SearchResult {
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  type: LessonType | 'BLOG' | 'VIDEO' | 'GAME' | 'QUIZ' | 'FLASHCARD'
  url: string
  category?: string
  difficulty?: Difficulty
  tags: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LeaderboardEntry {
  userId: string
  name: string
  avatar?: string
  xp: number
  level: number
  streak: number
  rank: number
}

export interface SearchFilters {
  category?: string
  difficulty?: string
  type?: string
  age?: string
  sort?: string
  query?: string
}

export interface QuizResult {
  quizId: string
  score: number
  total: number
  answers: Record<string, string>
  timeSpent: number
  passed: boolean
  attempt: number
}

export interface GameResult {
  gameId: string
  score: number
  level: number
  timeSpent: number
  completed: boolean
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginInput {
  email: string
  password: string
}
