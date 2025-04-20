"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageSquare,
  Heart,
  Bookmark,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/services/api"
import type { BlogPost, PortfolioItem, CaseStudy, SkillCategory } from "@/types"
import { toast } from "sonner"

// Add TypeScript declaration for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (...args: any[]) => void
  }
}

export default function BlogPostPage({ slug }: { slug: string }) {
  // State for blog data
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add these state variables with proper type annotations
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])

  // Social interaction states
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // Fetch the blog post
        const blogPost = await api.getBlogPostBySlug(slug)

        if (!blogPost) {
          setError("Blog post not found")
          return
        }

        setPost(blogPost)

        // Fetch related posts
        const related = await api.getRelatedBlogPosts(slug, blogPost.tags)
        setRelatedPosts(related)

        // Make sure these lines use the correct types
        const portfolioData: PortfolioItem[] = []
        const caseStudiesData: CaseStudy[] = []
        const skillsData: SkillCategory[] = []

        setPortfolioItems(portfolioData || []) // portfolioData should be PortfolioItem[]
        setCaseStudies(caseStudiesData || []) // caseStudiesData should be CaseStudy[]
        setSkillCategories(skillsData || []) // skillsData should be SkillCategory[]

        // Track content loaded event
        window.gtag?.("event", "blog_content_loaded", {
          blog_title: blogPost.title,
          blog_category: blogPost.category,
        })
      } catch (err) {
        console.error("Error fetching blog post:", err)
        const errorMessage = err instanceof Error ? err.message : "Error loading blog post"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")

      // Track share event
      window.gtag?.("event", "blog_share", {
        method: "copy_link",
        blog_title: post?.title,
      })
    }
  }

  // Handle like and bookmark actions
  const handleLike = () => {
    setIsLiked(!isLiked)
    // Track like event
    window.gtag?.("event", "blog_interaction", {
      action: isLiked ? "unlike" : "like",
      blog_title: post?.title,
    })

    toast.success(isLiked ? "Removed like" : "Added like")
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Track bookmark event
    window.gtag?.("event", "blog_interaction", {
      action: isBookmarked ? "unbookmark" : "bookmark",
      blog_title: post?.title,
    })

    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks")
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")

    // Track newsletter signup
    window.gtag?.("event", "newsletter_signup", {
      source: "blog_post",
      blog_title: post?.title,
    })

    toast.success(`Subscribed with email: ${email}`)
    // Reset the form
    e.currentTarget.reset()
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link href="/learn">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-16">
      {/* Structured data for blog post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image || "/images/blog-default.jpg",
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Manthan Tiwari",
              logo: {
                "@type": "ImageObject",
                url: "/images/logo.png",
              },
            },
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/blog/${post.slug}`,
            },
            keywords: post.tags.join(", "),
          }),
        }}
      />

      {/* Back navigation */}
      <div className="w-full max-w-4xl px-4 mb-6">
        <Link href="/learn" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Articles
        </Link>
      </div>

      <article className="w-full max-w-4xl px-4">
        {/* Header */}
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
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.authorAvatar || "/placeholder.svg?height=40&width=40"} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800">{post.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${post.image}`}></div>
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt={post.title}
            fill
            className="object-cover opacity-30"
          />
        </div>

        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-10">
          {/* Introduction */}
          <p className="text-xl leading-relaxed text-gray-700 mb-6">{post.excerpt}</p>

          <h2>Understanding the Challenge</h2>
          <p>
            In today's rapidly evolving business landscape, organizations face increasing pressure to streamline
            operations, reduce costs, and improve efficiency. Manual processes not only consume valuable time but also
            introduce the risk of human error, leading to decreased productivity and potentially costly mistakes.
          </p>

          <p>
            The challenge becomes particularly acute as businesses scale. What might have been manageable manual
            processes for a small operation quickly become bottlenecks as transaction volumes increase and complexity
            grows. Without proper automation, businesses find themselves caught in a cycle of hiring more staff to
            handle manual tasks rather than focusing on strategic growth initiatives.
          </p>

          <h2>Key Benefits of {post.tags[0]} Automation</h2>
          <p>Implementing a strategic automation approach offers multiple significant advantages:</p>

          <ul>
            <li>
              <strong>Increased efficiency and productivity:</strong> By eliminating repetitive manual tasks, employees
              can focus on higher-value activities that require human creativity and decision-making.
            </li>
            <li>
              <strong>Reduced error rates:</strong> Automated processes execute consistently, eliminating the
              variability and errors that often accompany manual work.
            </li>
            <li>
              <strong>Enhanced scalability:</strong> Automated systems can handle growing transaction volumes without
              proportional increases in resources.
            </li>
            <li>
              <strong>Improved data quality and insights:</strong> Automation centralizes data collection and
              standardizes formats, enabling better analytics and decision-making.
            </li>
            <li>
              <strong>Better customer experience:</strong> Faster, more accurate processes translate to improved service
              delivery and customer satisfaction.
            </li>
          </ul>

          {/* The rest of the blog content would be here */}
        </div>

        {/* Article actions */}
        <div className="flex flex-wrap justify-between items-center py-6 border-t border-b border-gray-200 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${isLiked ? "bg-red-50 text-red-600 border-red-200" : ""}`}
              onClick={handleLike}
              aria-label={isLiked ? "Unlike this article" : "Like this article"}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
              <span>{isLiked ? "Liked" : "Like"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${isBookmarked ? "bg-blue-50 text-blue-600 border-blue-200" : ""}`}
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current text-blue-500" : ""}`} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </Button>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <span className="text-sm text-gray-500">Share:</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Share on Twitter"
                onClick={() => {
                  window.gtag?.("event", "blog_share", {
                    method: "twitter",
                    blog_title: post.title,
                  })
                }}
              >
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Share on LinkedIn"
                onClick={() => {
                  window.gtag?.("event", "blog_share", {
                    method: "linkedin",
                    blog_title: post.title,
                  })
                }}
              >
                <Linkedin className="h-4 w-4 text-[#0077B5]" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Share on Facebook"
                onClick={() => {
                  window.gtag?.("event", "blog_share", {
                    method: "facebook",
                    blog_title: post.title,
                  })
                }}
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
        </div>

        {/* Author info */}
        <div className="bg-blue-50 rounded-lg p-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.authorAvatar || "/placeholder.svg?height=64&width=64"} alt={post.author} />
              <AvatarFallback className="text-lg">{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
              <p className="text-gray-700 mb-4">
                {post.author} is a business automation expert with over 8 years of experience helping organizations
                implement efficient processes and leverage technology for growth. Specializing in no-code solutions and
                AI integration, they've helped dozens of companies achieve significant operational improvements.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200"
                  onClick={() => {
                    window.gtag?.("event", "author_profile_view", {
                      author_name: post.author,
                    })
                  }}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    window.gtag?.("event", "author_follow", {
                      author_name: post.author,
                    })
                  }}
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className={`h-40 bg-gradient-to-r ${related.image}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=120&width=200"
                        alt={related.title}
                        width={200}
                        height={120}
                        className="opacity-30"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{related.excerpt}</p>
                    <Link
                      href={`/blog/${related.slug}`}
                      onClick={() => {
                        window.gtag?.("event", "related_post_click", {
                          current_post: post.title,
                          clicked_post: related.title,
                        })
                      }}
                    >
                      <Button variant="link" className="px-0 text-blue-600 hover:text-blue-700">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comments section - simplified version */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Join the conversation</h3>
            <p className="text-gray-600 mb-4">Sign in to comment on this article and engage with other readers.</p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                window.gtag?.("event", "comment_section_interaction", {
                  action: "sign_in_click",
                  blog_title: post.title,
                })
              }}
            >
              Sign In to Comment
            </Button>
          </div>
        </div>
      </article>

      {/* Newsletter signup */}
      <div className="w-full max-w-4xl px-4 mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-700 mb-4">
                Get the latest articles, tutorials, and industry insights delivered straight to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                  required
                  aria-label="Email address for newsletter"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-4 rounded-full h-24 w-24 flex items-center justify-center shadow-md">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    d="M22 6C22 7.65685 20.6569 9 19 9C17.3431 9 16 7.65685 16 6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H22V16C22 14.3431 20.6569 13 19 13C18.0444 13 17.1931 13.4468 16.6438 14.1429"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10L12 7L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
