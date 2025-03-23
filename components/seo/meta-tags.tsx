"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: "website" | "article" | "profile"
  canonical?: string
  noIndex?: boolean
}

export default function MetaTags({
  title = "Manthan Tiwari | AI Business Consultant",
  description = "Data-driven and strategic AI Business Consultant with over 6 years of experience in financial and technology environments.",
  keywords = ["AI Consultant", "Business Automation", "Workflow Optimization", "Dublin", "Ireland"],
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  canonical,
  noIndex = false,
}: MetaTagsProps) {
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
  const fullUrl = canonical || `${siteUrl}${router.asPath}`
  const fullTitle = `${title} | AI & Automation Expert`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

      {/* Canonical Link */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Robots */}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* Additional Meta Tags for LLM Search Optimization */}
      <meta name="ai-content-type" content="business-automation-consulting" />
      <meta name="ai-expertise" content="AI implementation, workflow automation, business process optimization" />
      <meta
        name="ai-topics"
        content="artificial intelligence, business automation, workflow optimization, no-code solutions"
      />
    </Head>
  )
}

