"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  fill?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  objectPosition?: string
  onLoad?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fill = false,
  objectFit = "cover",
  objectPosition = "center",
  onLoad,
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true)
  const [blurDataUrl, setBlurDataUrl] = useState("")

  // Generate a simple color placeholder
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const canvas = document.createElement("canvas")
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#e2e8f0" // Light gray (tailwind slate-200)
      ctx.fillRect(0, 0, 10, 10)
      setBlurDataUrl(canvas.toDataURL())
    }
  }, [])

  const handleImageLoad = () => {
    setLoading(false)
    if (onLoad) {
      onLoad()
    }
  }

  return (
    <div
      className={cn("overflow-hidden", loading && "animate-pulse bg-slate-200", className)}
      style={{
        ...(fill ? { position: "relative", width: "100%", height: "100%" } : {}),
        ...(!fill && width && height ? { aspectRatio: `${width}/${height}` } : {}),
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        className={cn(
          "transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100",
          objectFit && `object-${objectFit}`,
        )}
        style={{
          objectPosition: objectPosition,
        }}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
