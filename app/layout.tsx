import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

// Add comprehensive metadata for SEO
export const metadata = {
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Proper viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
        {/* Force CSS reload by adding a version query parameter */}
        <link rel="stylesheet" href="/globals.css?v=1.0.1" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />
        {/* Apple mobile web app capable */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}