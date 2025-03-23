"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSupabaseBlogPosts } from "@/hooks/use-supabase-blog-posts"

export default function BlogList() {
  const { posts, loading, error } = useSupabaseBlogPosts()
  const [visiblePosts, setVisiblePosts] = useState(6)

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 3)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading blog posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-8 text-center mb-8 border border-red-100">
        <div className="text-red-500 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Failed to load blog posts</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
          Retry
        </Button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-blue-50 rounded-lg p-8 text-center mb-8 border border-blue-100">
        <h2 className="text-xl font-bold mb-2">No blog posts found</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-4">
          There are currently no blog posts available. Please check back later.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, visiblePosts).map((blog, index) => (
          <div
            key={blog.id}
            className="overflow-hidden border-gray-200 group hover:shadow-md transition-all duration-300 opacity-0 animate-in fade-in duration-500 relative flex flex-col rounded-lg border"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`relative h-48 bg-gradient-to-r ${blog.image} overflow-hidden`}>
              {blog.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-blue-600 text-white animate-pulse">New</Badge>
                </div>
              )}
              <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
                <Badge className="bg-white text-gray-700 hover:bg-white shadow-sm">{blog.category}</Badge>
              </div>
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Blog"
                  width={300}
                  height={200}
                  className="opacity-30 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-4 pb-2 relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-blue-100 rounded-full p-1 h-6 w-6 flex items-center justify-center">
                  <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{blog.author}</span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200 overflow-hidden text-ellipsis line-clamp-2">
                {blog.title}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{blog.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{blog.readTime}</span>
                </span>
              </div>
            </div>

            <div className="px-4 pb-3 flex-grow">
              <p className="text-gray-600 mb-3 overflow-hidden text-ellipsis line-clamp-3">{blog.excerpt}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 pt-0 pb-4 border-t border-gray-100 mt-auto">
              <Link href={`/blog/${blog.slug}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 group overflow-hidden relative">
                  <span className="inline-flex items-center transition-transform duration-300 group-hover:translate-x-1">
                    Read Article{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-10"></span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={loadMorePosts}
            variant="outline"
            className="border-gray-300 group hover:border-blue-300 transition-all duration-300"
          >
            <span className="inline-flex items-center">
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

