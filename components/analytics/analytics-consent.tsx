"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AnalyticsConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent has been given previously
    const hasConsent = localStorage.getItem("analytics-consent")

    if (!hasConsent) {
      setShowBanner(true)
    } else if (hasConsent === "true") {
      initializeAnalytics()
    }
  }, [])

  const acceptAnalytics = () => {
    localStorage.setItem("analytics-consent", "true")
    initializeAnalytics()
    setShowBanner(false)
  }

  const declineAnalytics = () => {
    localStorage.setItem("analytics-consent", "false")
    setShowBanner(false)
  }

  const initializeAnalytics = () => {
    // Define dataLayer
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }

    // Initialize GA
    gtag("js", new Date())
    gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX", {
      anonymize_ip: true,
      cookie_expires: 60 * 60 * 24 * 365, // 1 year
      cookie_flags: "SameSite=None;Secure",
    })

    // Load GA script
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"}`
    script.async = true
    document.head.appendChild(script)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Cookie Consent</h3>
          <p className="text-sm text-gray-700">
            We use analytics cookies to understand how you use our website and improve user experience. These cookies
            help us analyze which pages are visited and how visitors interact with the site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={declineAnalytics} className="whitespace-nowrap">
            Decline
          </Button>
          <Button onClick={acceptAnalytics} className="whitespace-nowrap bg-blue-600 hover:bg-blue-700">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
