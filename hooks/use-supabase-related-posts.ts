"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { BlogPost } from "@/types"

export function useSupabaseRelatedPosts(currentSlug: string, tags: string[], limit = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRelatedPosts() {
      if (!currentSlug || !tags.length) return

      try {
        setLoading(true)
        setError(null)

        // Fetch posts that aren't the current one
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .neq("slug", currentSlug)
          .order("date", { ascending: false })
          .limit(limit + 5) // Fetch extra to filter by tags

        if (error) {
          throw new Error(error.message)
        }

        // Filter posts that have at least one matching tag
        // This is done client-side since Supabase doesn't support array overlap operations directly
        const filteredData = data.filter((post) => post.tags.some((tag) => tags.includes(tag))).slice(0, limit)

        // Transform the data to match our BlogPost type
        const transformedData: BlogPost[] = filteredData.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          date: post.date,
          readTime: post.read_time,
          excerpt: post.excerpt,
          image: post.image,
          isNew: post.is_new,
          category: post.category,
          author: post.author,
          authorAvatar: post.author_avatar || undefined,
          views: post.views,
          likes: post.likes,
          comments: post.comments,
          tags: post.tags,
          content: post.content || undefined,
        }))

        setPosts(transformedData)
      } catch (err) {
        console.error("Error fetching related blog posts:", err)
        setError("Failed to load related posts")
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentSlug, tags, limit])

  return { posts, loading, error }
}

