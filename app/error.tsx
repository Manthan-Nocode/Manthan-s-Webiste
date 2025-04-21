"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { logSecurityEvent } from "@/lib/security-utils"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error without exposing sensitive details
    logSecurityEvent("client_error", {
      errorName: error.name,
      errorDigest: error.digest,
      // Don't log error.message or error.stack as they may contain sensitive info
    })
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">We apologize for the inconvenience. An unexpected error has occurred.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
