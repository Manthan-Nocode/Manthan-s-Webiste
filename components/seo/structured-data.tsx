"use client"

import { useRouter } from "next/router"

interface StructuredDataProps {
  type: "WebSite" | "WebPage" | "Article" | "Person" | "Organization" | "Service" | "FAQPage"
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"

  // Base schema with @context
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  }

  // Merge base schema with provided data
  const schema = { ...baseSchema, ...data }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

