"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FlippingStatementProps {
  statements: string[]
  interval?: number
  className?: string
  textClassName?: string
}

export function FlippingStatement({ statements, interval = 3000, className, textClassName }: FlippingStatementProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (statements.length <= 1) return

    // Handle the transition effect
    const intervalId = setInterval(() => {
      // First fade out
      setIsVisible(false)

      // After fading out, change the text and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length)
        setIsVisible(true)
      }, 500) // Half of the transition time
    }, interval)

    return () => clearInterval(intervalId)
  }, [statements, interval])

  return (
    <div className={cn("relative h-[4rem] md:h-20 overflow-hidden", className)}>
      <p
        className={cn(
          "absolute w-full text-xl sm:text-2xl md:text-3xl text-indigo-600 font-medium transition-all duration-500 ease-in-out",
          isVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-4",
          textClassName,
        )}
      >
        "{statements[currentIndex]}"
      </p>
    </div>
  )
}

