/**
 * Simple HTML sanitizer to prevent XSS attacks
 * Note: In production, use a proper library like DOMPurify
 * @param html The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  // This is a very basic implementation
  // For production, use a proper sanitizer library
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

/**
 * Safely logs errors without exposing sensitive information
 * @param context The context where the error occurred
 * @param error The error object
 */
export function safeLogError(context: string, error: unknown): void {
  // Log a sanitized version of the error
  console.error(`Error in ${context}:`, error instanceof Error ? error.name : "Unknown error")

  // In a production environment, you might want to send this to a monitoring service
  // but ensure no sensitive data is included
}

/**
 * Returns a user-friendly error message without exposing sensitive details
 * @param error The error object
 * @param fallbackMessage A fallback message to show users
 * @returns A safe error message
 */
export function getSafeErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  // For validation errors, we can return the message as it's user-facing
  if (error instanceof Error && error.name === "ValidationError") {
    return error.message
  }

  // For all other errors, return the fallback message
  return fallbackMessage
}

/**
 * Logs security events for monitoring and auditing
 * @param event The security event type
 * @param metadata Additional metadata about the event
 */
export function logSecurityEvent(event: string, metadata: Record<string, any> = {}): void {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    ...metadata,
  }

  // In development, just log to console
  console.log(`[SECURITY EVENT] ${event}:`, logData)

  // In production, send to a proper logging service
  if (process.env.NODE_ENV === "production") {
    // Implement production logging here
    // e.g., send to a logging service or analytics platform
  }
}
