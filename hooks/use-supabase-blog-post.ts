"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { BlogPost } from "@/types"

export function useSupabaseBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

        if (error) {
          throw new Error(error.message)
        }

        // Transform the data to match our BlogPost type
        const transformedData: BlogPost = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          date: data.date,
          readTime: data.read_time,
          excerpt: data.excerpt,
          image: data.image,
          isNew: data.is_new,
          category: data.category,
          author: data.author,
          authorAvatar: data.author_avatar || undefined,
          views: data.views,
          likes: data.likes,
          comments: data.comments,
          tags: data.tags,
          content: data.content || undefined,
        }

        setPost(transformedData)
      } catch (err) {
        console.error(`Error fetching blog post with slug ${slug}:`, err)
        setError(err instanceof Error ? err.message : "Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  return { post, loading, error }
}

