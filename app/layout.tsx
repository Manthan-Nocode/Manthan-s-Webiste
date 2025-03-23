import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
// Import the ErrorBoundary at the top of the file
import ErrorBoundary from "@/components/error-boundary"

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

// Wrap the children with ErrorBoundary in the RootLayout component
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
      </head>
      <body className={inter.className}>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}

