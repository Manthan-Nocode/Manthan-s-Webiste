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
