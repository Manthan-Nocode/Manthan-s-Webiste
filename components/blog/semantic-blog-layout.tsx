"use client"

import type React from "react"

import type { BlogPost } from "@/types"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "@/components/ui/optimized-image"
import BlogStructuredData from "@/components/seo/blog-structured-data"
import { trackContentEngagement } from "@/lib/analytics"
import { useEffect, useRef } from "react"

interface TableOfContentsItem {
  id: string
  title: string
}

interface SemanticBlogLayoutProps {
  post: BlogPost
  tableOfContents: TableOfContentsItem[]
  children: React.ReactNode
}

export default function SemanticBlogLayout({ post, tableOfContents, children }: SemanticBlogLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Track reading progress
  useEffect(() => {
    if (!contentRef.current) return

    let hasTrackedRead = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the content is 50% visible and we haven't tracked a read yet
          if (entry.isIntersecting && entry.intersectionRatio > 0.5 && !hasTrackedRead) {
            trackContentEngagement({
              contentId: post.id,
              contentType: "blog",
              action: "read",
            })
            hasTrackedRead = true
          }
        })
      },
      {
        threshold: [0.5],
      },
    )

    observer.observe(contentRef.current)

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current)
      }
    }
  }, [post.id])

  // Track view on mount
  useEffect(() => {
    trackContentEngagement({
      contentId: post.id,
      contentType: "blog",
      action: "view",
    })
  }, [post.id])

  // Format date for ISO
  const isoDate = new Date(post.date).toISOString()

  return (
    <article className="w-full max-w-4xl mx-auto px-4">
      {/* Add structured data */}
      <BlogStructuredData post={post} url={`/blog/${post.slug}`} />

      {/* Header with semantic metadata */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{post.category}</Badge>
          {post.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 rounded-full overflow-hidden relative">
              <OptimizedImage
                src={post.authorAvatar || "/placeholder.svg?height=40&width=40"}
                alt={post.author}
                width={40}
                height={40}
                priority
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">{post.author}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                <time dateTime={isoDate}>{post.date}</time>
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents for accessibility and LLM navigation */}
      <nav className="toc bg-gray-50 p-4 rounded-lg mb-8" aria-labelledby="toc-heading">
        <h2 id="toc-heading" className="text-lg font-semibold mb-2">
          Table of Contents
        </h2>
        <ol className="list-decimal pl-5">
          {tableOfContents.map((section) => (
            <li key={section.id} className="mb-1">
              <a href={`#${section.id}`} className="text-blue-600 hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Article summary for humans and LLMs */}
      <div className="summary bg-blue-50 p-4 rounded-lg mb-8 border-l-4 border-blue-500">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">{post.excerpt}</p>
      </div>

      {/* Main content with semantic sections */}
      <div ref={contentRef} className="content prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  )
}
