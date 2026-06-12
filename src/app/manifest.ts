import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pogo Tunes - Educational Platform for Kids",
    short_name: "Pogo Tunes",
    description: "World's best educational platform for kids. Learn math, reading, coding, science and more through fun games and lessons.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a1a",
    theme_color: "#6C63FF",
    orientation: "any",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["education", "kids", "learning", "games"],
    lang: "en",
    dir: "ltr",
  }
}
