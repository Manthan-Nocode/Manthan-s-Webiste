// Type definitions for analytics events
type EventCategory = "engagement" | "navigation" | "conversion" | "content" | "error"

type EventActions = {
  engagement: "like" | "bookmark" | "share" | "comment" | "subscribe"
  navigation: "click" | "scroll" | "tab_change" | "menu_open"
  conversion: "form_submit" | "subscribe" | "contact" | "waitlist_join"
  content: "view" | "read" | "download" | "complete"
  error: "form_error" | "load_error" | "api_error"
}

interface AnalyticsEvent<T extends EventCategory> {
  category: T
  action: EventActions[T]
  label?: string
  value?: number
  nonInteraction?: boolean
  [key: string]: any
}

// Add type definition for window.gtag
interface WindowWithGtag extends Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
}

/**
 * Track an event with proper categorization and typing
 */
export function trackEvent<T extends EventCategory>({
  category,
  action,
  label,
  value,
  nonInteraction = false,
  ...rest
}: AnalyticsEvent<T>) {
  // Only track if consent has been given
  if (typeof window !== "undefined" && localStorage.getItem("analytics-consent") === "true") {
    window.gtag?.("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
      ...rest,
    })
  }
}

/**
 * Track page views
 */
export function trackPageView(url: string, title: string) {
  if (typeof window !== "undefined" && localStorage.getItem("analytics-consent") === "true") {
    window.gtag?.("event", "page_view", {
      page_title: title,
      page_location: url,
      page_path: url.split("?")[0],
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    })
  }
}

/**
 * Track content engagement
 */
/**
 * Track content engagement with expanded action types
 */
export function trackContentEngagement({
  contentId,
  contentType,
  action,
  value,
}: {
  contentId: string
  contentType: "blog" | "case_study" | "video" | "tutorial"
  action: EventActions["engagement"] | EventActions["content"]
  value?: number
}) {
  // Determine the appropriate category based on the action
  const category: EventCategory = 
    (action === "view" || action === "read" || action === "download" || action === "complete") 
      ? "content" 
      : "engagement";
  
  trackEvent({
    category,
    action: action as any, // Type assertion needed due to TypeScript's limitations with discriminated unions
    label: contentType,
    value,
    content_id: contentId,
    content_type: contentType,
  })
}

/**
 * Track form submissions
 */
export function trackFormSubmission({
  formId,
  formType,
  success = true,
  errorType = "",
}: {
  formId: string
  formType: "contact" | "waitlist" | "newsletter" | "other"
  success?: boolean
  errorType?: string
}) {
  if (success) {
    trackEvent({
      category: "conversion",
      action: "form_submit",
      label: formType,
      form_id: formId,
      form_type: formType,
    })
  } else {
    trackEvent({
      category: "error",
      action: "form_error",
      label: errorType,
      form_id: formId,
      form_type: formType,
      error_type: errorType,
    })
  }
}

/**
 * Track navigation events
 */
export function trackNavigation({
  action,
  destination,
  source,
}: {
  action: EventActions["navigation"]
  destination: string
  source: string
}) {
  trackEvent({
    category: "navigation",
    action,
    label: destination,
    destination,
    source,
  })
}
