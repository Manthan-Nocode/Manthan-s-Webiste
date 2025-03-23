"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { BlogPost } from "@/types"

export function useSupabaseBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        // Transform the data to match our BlogPost type
        const transformedData: BlogPost[] = data.map((post) => ({
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
        console.error("Error fetching blog posts:", err)
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return { posts, loading, error }
}

