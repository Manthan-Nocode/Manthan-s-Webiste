import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory store for rate limiting
// Note: In production, use Redis or another persistent store
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const MAX_REQUESTS = 60 // Maximum requests per window

/**
 * Rate limiter middleware for API routes
 * @param req The incoming request
 * @returns NextResponse or undefined if the request should proceed
 */
export function rateLimiter(req: NextRequest): NextResponse | undefined {
  // Get client IP
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

  const now = Date.now()
  const currentLimit = rateLimit.get(ip)

  // If this IP hasn't been seen or the window has expired, create a new entry
  if (!currentLimit || currentLimit.resetTime < now) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return undefined // Allow the request to proceed
  }

  // If within the window but under the limit, increment and allow
  if (currentLimit.count < MAX_REQUESTS) {
    currentLimit.count++
    return undefined // Allow the request to proceed
  }

  // Rate limit exceeded
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: "Too many requests, please try again later.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": `${Math.ceil((currentLimit.resetTime - now) / 1000)}`,
      },
    },
  )
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, limit] of rateLimit.entries()) {
    if (limit.resetTime < now) {
      rateLimit.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)
