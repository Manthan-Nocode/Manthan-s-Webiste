import * as Icons from "lucide-react"
import { createElement } from "react"

/**
 * Utility function to dynamically render Lucide React icons
 * @param iconName - Name of the icon from lucide-react
 * @param className - Optional class name for styling the icon
 * @returns React component of the requested icon
 */
export function renderIcon(iconName: string, className?: string) {
  // Cast to any to access dynamic properties
  const IconComponent = (Icons as any)[iconName]

  if (IconComponent) {
    return createElement(IconComponent, { className: className || "" })
  }

  // Fallback to a default icon if the requested one doesn't exist
  return createElement(Icons.HelpCircle, { className: className || "" })
}

/**
 * Map color names to their Tailwind classes
 * Used for dynamic color application
 */
export const colorMap = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-500",
    hover: "hover:bg-blue-600",
  },
  indigo: {
    bg: "bg-indigo-500",
    text: "text-indigo-600",
    border: "border-indigo-500",
    hover: "hover:bg-indigo-600",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-600",
    border: "border-purple-500",
    hover: "hover:bg-purple-600",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-600",
    border: "border-pink-500",
    hover: "hover:bg-pink-600",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-500",
    hover: "hover:bg-orange-600",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-600",
    border: "border-green-500",
    hover: "hover:bg-green-600",
  },
}

