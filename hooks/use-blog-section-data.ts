"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import type { BlogPost } from "@/types"

export function useBlogSectionData() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setIsLoading(true)
        const posts = await api.getBlogPosts()
        setBlogPosts(posts)
      } catch (err) {
        console.error("Error loading blog posts:", err)
        setError("Failed to load blog posts")
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  return { blogPosts, isLoading, error }
}
