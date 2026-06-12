import type { Metadata } from "next"
import { Baloo_2, Nunito } from "next/font/google"
import { Providers } from "@/providers"
import { validateEnv } from "@/lib/env"
import "./globals.css"

validateEnv()

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pogo Tunes - Learn & Play with Fun!",
  description:
    "The most fun way for kids to learn ABCs, numbers, shapes, and more! Join millions of happy learners worldwide.",
  keywords: [
    "kids learning",
    "educational games",
    "preschool",
    "kindergarten",
    "ABCs",
    "numbers",
    "phonics",
    "children education",
  ],
  openGraph: {
    title: "Pogo Tunes - Learn & Play with Fun!",
    description:
      "The most fun way for kids to learn ABCs, numbers, shapes, and more!",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
