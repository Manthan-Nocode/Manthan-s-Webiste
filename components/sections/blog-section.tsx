"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import type { BlogPost } from "@/types"

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchBlogPosts() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("date", { ascending: false })
          .limit(3)

        if (error) {
          throw new Error(error.message)
        }

        // Only update state if component is still mounted
        if (isMounted) {
          setPosts(data || [])
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load blog posts")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBlogPosts()

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="blog" className="w-full py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              LATEST INSIGHTS
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          From The <span className="text-blue-600">Blog</span>
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Explore my latest thoughts on automation, no-code tools, and digital transformation.
        </p>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`h-48 bg-gradient-to-r ${post.image || "from-blue-300 to-indigo-400"}`}>
                    {post.isNew && (
                      <div className="bg-blue-600 text-white text-xs px-2 py-1 absolute top-4 right-4 rounded">NEW</div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} passHref>
                      <Button variant="link" className="text-blue-600 p-0">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/blog" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

