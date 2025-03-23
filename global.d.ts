// Type definitions for Google Analytics and Vercel Analytics
interface Window {
  // Google Analytics
  gtag?: (...args: any[]) => void
  // Vercel Analytics
  va?: (...args: any[]) => void
}

