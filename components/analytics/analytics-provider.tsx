"use client"

import type React from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"
import AnalyticsConsent from "./analytics-consent"

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Get page title
      const pageTitle = document.title

      // Construct full URL
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      // Track page view
      trackPageView(url, pageTitle)
    }
  }, [pathname, searchParams])

  return (
    <>
      {children}
      <AnalyticsConsent />
    </>
  )
}
