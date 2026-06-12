import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  age: z.coerce.number().min(3, 'Must be at least 3').max(18, 'Must be under 18').optional(),
  grade: z.string().optional(),
  accountType: z.enum(['STUDENT', 'PARENT', 'TEACHER']).optional(),
  acceptTerms: z.boolean().refine(val => val === true, { message: 'You must accept the terms' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only numbers'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  displayName: z.string().optional(),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  age: z.number().min(3, 'Must be at least 3 years old').max(18, 'Must be under 18 years old').optional(),
  grade: z.string().optional(),
  school: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
})

export const lessonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  content: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  image: z.string().optional(),
  videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
  duration: z.number().min(0).optional(),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  type: z.enum(['VIDEO', 'ARTICLE', 'QUIZ', 'GAME', 'FLASHCARD', 'PRACTICE']),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']).optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  isFree: z.boolean().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  color: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().optional(),
})

export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']).optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment is too long'),
  lessonId: z.string().optional(),
  videoId: z.string().optional(),
  parentId: z.string().optional(),
})

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  type: z.string().optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type OtpInput = z.infer<typeof otpSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type LessonInput = z.infer<typeof lessonSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type BlogInput = z.infer<typeof blogSchema>
export type CommentInput = z.infer<typeof commentSchema>
export type SearchInput = z.infer<typeof searchSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong'

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++
  if (score <= 1) return 'weak'
  if (score === 2) return 'medium'
  if (score <= 4) return 'strong'
  return 'very-strong'
}
