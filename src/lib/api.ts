const API_BASE = '/api'

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      response.status,
      errorData.message || errorData.error || `Request failed with status ${response.status}`,
      errorData.code
    )
  }

  const data = await response.json()
  return data
}

export const api = {
  get<T>(endpoint: string, options?: RequestInit) {
    return fetcher<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return fetcher<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return fetcher<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestInit) {
    return fetcher<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  delete<T>(endpoint: string, options?: RequestInit) {
    return fetcher<T>(endpoint, { ...options, method: 'DELETE' })
  },
}

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
    session: ['auth', 'session'] as const,
    loginHistory: ['auth', 'loginHistory'] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    profile: (id: string) => ['users', id, 'profile'] as const,
    settings: (id: string) => ['users', id, 'settings'] as const,
    progress: (id: string) => ['users', id, 'progress'] as const,
    achievements: (id: string) => ['users', id, 'achievements'] as const,
    bookmarks: (id: string) => ['users', id, 'bookmarks'] as const,
  },
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', slug] as const,
    lessons: (slug: string) => ['categories', slug, 'lessons'] as const,
  },
  lessons: {
    all: ['lessons'] as const,
    detail: (slug: string) => ['lessons', slug] as const,
    featured: ['lessons', 'featured'] as const,
    popular: ['lessons', 'popular'] as const,
    recent: ['lessons', 'recent'] as const,
    related: (id: string) => ['lessons', id, 'related'] as const,
  },
  videos: {
    all: ['videos'] as const,
    detail: (slug: string) => ['videos', slug] as const,
    featured: ['videos', 'featured'] as const,
  },
  quizzes: {
    all: ['quizzes'] as const,
    detail: (slug: string) => ['quizzes', slug] as const,
    questions: (slug: string) => ['quizzes', slug, 'questions'] as const,
    results: (id: string) => ['quizzes', id, 'results'] as const,
  },
  games: {
    all: ['games'] as const,
    detail: (slug: string) => ['games', slug] as const,
    leaderboard: ['games', 'leaderboard'] as const,
  },
  flashcards: {
    all: ['flashcards'] as const,
    detail: (slug: string) => ['flashcards', slug] as const,
    cards: (slug: string) => ['flashcards', slug, 'cards'] as const,
  },
  progress: {
    all: ['progress'] as const,
    lesson: (lessonId: string) => ['progress', 'lesson', lessonId] as const,
    quiz: (quizId: string) => ['progress', 'quiz', quizId] as const,
    stats: ['progress', 'stats'] as const,
  },
  achievements: {
    all: ['achievements'] as const,
    detail: (id: string) => ['achievements', id] as const,
    user: (userId: string) => ['achievements', 'user', userId] as const,
  },
  leaderboard: {
    all: ['leaderboard'] as const,
    category: (slug: string) => ['leaderboard', 'category', slug] as const,
    weekly: ['leaderboard', 'weekly'] as const,
    monthly: ['leaderboard', 'monthly'] as const,
  },
  blog: {
    all: ['blog'] as const,
    detail: (slug: string) => ['blog', slug] as const,
    recent: ['blog', 'recent'] as const,
  },
  search: {
    results: (query: string) => ['search', query] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    unread: ['notifications', 'unread'] as const,
  },
  certificates: {
    all: ['certificates'] as const,
    detail: (id: string) => ['certificates', id] as const,
    user: (userId: string) => ['certificates', 'user', userId] as const,
  },
  comments: {
    byLesson: (lessonId: string) => ['comments', 'lesson', lessonId] as const,
    byVideo: (videoId: string) => ['comments', 'video', videoId] as const,
  },
}

export type { ApiError as ApiErrorType }
