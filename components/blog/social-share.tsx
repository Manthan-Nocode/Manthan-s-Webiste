"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Facebook, Copy } from "lucide-react"
import { toast } from "sonner"
import { trackContentEngagement } from "@/lib/analytics"

interface SocialShareProps {
  title: string
  url: string
  contentId: string
  contentType: "blog" | "case_study" | "video" | "tutorial"
}

export default function SocialShare({ title, url, contentId, contentType }: SocialShareProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manthantiwari.com"
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`

  const copyLinkToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(fullUrl)
      toast.success("Link copied to clipboard!")

      // Track share event
      trackContentEngagement({
        contentId,
        contentType,
        action: "share",
      })
    }
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`
    window.open(twitterUrl, "_blank")

    // Track share event
    trackContentEngagement({
      contentId,
      contentType,
      action: "share",
    })
  }

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
    window.open(linkedinUrl, "_blank")

    // Track share event
    trackContentEngagement({
      contentId,
      contentType,
      action: "share",
    })
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    window.open(facebookUrl, "_blank")

    // Track share event
    trackContentEngagement({
      contentId,
      contentType,
      action: "share",
    })
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Share:</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={shareOnTwitter}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-[#1DA1F2]" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={shareOnLinkedIn}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 text-[#0077B5]" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={shareOnFacebook}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4 text-[#1877F2]" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={copyLinkToClipboard}
          aria-label="Copy link to clipboard"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  )
}
