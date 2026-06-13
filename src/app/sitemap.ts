import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/forgot-password`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ]

  let categoryPages: MetadataRoute.Sitemap = []
  let lessonPages: MetadataRoute.Sitemap = []
  let videoPages: MetadataRoute.Sitemap = []
  let quizPages: MetadataRoute.Sitemap = []
  let gamePages: MetadataRoute.Sitemap = []
  let flashcardPages: MetadataRoute.Sitemap = []
  let blogPages: MetadataRoute.Sitemap = []

  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })
    categoryPages = categories.map((cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  } catch {}

  try {
    const lessons = await prisma.lesson.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    lessonPages = lessons.map((lesson) => ({
      url: `${baseUrl}/lessons/${lesson.slug}`,
      lastModified: lesson.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch {}

  try {
    const videos = await prisma.video.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    videoPages = videos.map((v) => ({
      url: `${baseUrl}/videos/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch {}

  try {
    const quizzes = await prisma.quiz.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    quizPages = quizzes.map((q) => ({
      url: `${baseUrl}/quiz/${q.slug}`,
      lastModified: q.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch {}

  try {
    const games = await prisma.game.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    gamePages = games.map((g) => ({
      url: `${baseUrl}/games/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch {}

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    flashcardPages = flashcards.map((f) => ({
      url: `${baseUrl}/flashcards/${f.slug}`,
      lastModified: f.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch {}

  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    })
    blogPages = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  } catch {}

  return [
    ...staticPages,
    ...categoryPages,
    ...lessonPages,
    ...videoPages,
    ...quizPages,
    ...gamePages,
    ...flashcardPages,
    ...blogPages,
  ]
}
