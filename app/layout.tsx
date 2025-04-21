import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import AnalyticsProvider from "@/components/analytics/analytics-provider"
import { Suspense } from "react"
import "../types/window"

const inter = Inter({ subsets: ["latin"] })

// Add comprehensive metadata for SEO
export const metadata: Metadata = {
  title: "Manthan Tiwari | AI Business Consultant",
  description:
    "Data-driven and strategic AI Business Consultant with over 6 years of experience in financial and technology environments.",
  keywords: ["AI Consultant", "Business Automation", "Workflow Optimization", "Dublin", "Ireland"],
  authors: [{ name: "Manthan Tiwari" }],
  openGraph: {
    title: "Manthan Tiwari | AI Business Consultant",
    description:
      "Data-driven and strategic AI Business Consultant with over 6 years of experience in financial and technology environments.",
    url: process.env.WEBSITE_URL || "https://portfolio.vercel.app",
    siteName: "Manthan Tiwari Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${process.env.WEBSITE_URL || "https://portfolio.vercel.app"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Manthan Tiwari Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manthan Tiwari | AI Business Consultant",
    description: "Data-driven and strategic AI Business Consultant with over 6 years of experience.",
    images: [`${process.env.WEBSITE_URL || "https://portfolio.vercel.app"}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.WEBSITE_URL || "https://portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />

        {/* AI-specific metadata to improve LLM understanding */}
        <meta name="ai-content-type" content="business-automation-consulting" />
        <meta name="ai-expertise" content="AI implementation, workflow automation, business process optimization" />
        <meta
          name="ai-topics"
          content="artificial intelligence, business automation, workflow optimization, no-code solutions"
        />
        <meta name="ai-audience" content="business owners, managers, process improvement specialists" />
        <meta name="ai-difficulty" content="intermediate" />
        <meta name="ai-source-type" content="expert-authored" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Suspense>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
