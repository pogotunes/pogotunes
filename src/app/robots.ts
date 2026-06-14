import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "")

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/user", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
