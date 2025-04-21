"use client"

import { useEffect, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView, trackContentEngagement, trackNavigation } from "@/lib/analytics"

export function useAnalytics() {
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

  // Track content engagement
  const trackEngagement = useCallback(
    (
      contentId: string,
      contentType: "blog" | "case_study" | "video" | "tutorial",
      action: "like" | "bookmark" | "share" | "comment" | "subscribe",
      value?: number,
    ) => {
      trackContentEngagement({
        contentId,
        contentType,
        action,
        value,
      })
    },
    [],
  )

  // Track navigation
  const trackNav = useCallback(
    (action: "click" | "scroll" | "tab_change" | "menu_open", destination: string) => {
      trackNavigation({
        action,
        destination,
        source: pathname || "/",
      })
    },
    [pathname],
  )

  return {
    trackEngagement,
    trackNav,
  }
}
