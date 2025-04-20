"use client"

// Add TypeScript declaration for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (...args: any[]) => void
  }
}

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function useAnalytics(eventName?: string) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Track page view in Google Analytics
      window.gtag?.("event", "page_view", {
        page_path: pathname,
        page_search: searchParams?.toString(),
        page_title: document.title,
      })

      // Track page view in Vercel Analytics
      window.va?.("page_view", {
        path: pathname,
        search: searchParams?.toString(),
        title: document.title,
      })

      // Track custom event if provided
      if (eventName) {
        window.gtag?.("event", eventName)
        window.va?.("event", { name: eventName })
      }
    }
  }, [pathname, searchParams, eventName])

  return null
}
