"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Lock,
  BookOpen,
  Video,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  Mail,
  Tag,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { api } from "@/services/api"
import type { BlogPost } from "@/types"
import { toast } from "sonner"
import ErrorBoundary from "@/components/error-boundary"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("blogs")
  const [email, setEmail] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch blog posts on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const posts = await api.getBlogPosts()
        setBlogPosts(posts)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await api.joinWaitlist(email)
      if (result.success) {
        toast.success(result.message)
        setEmail("")
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error("Failed to join waitlist. Please try again.")
      console.error("Error joining waitlist:", err)
    }
  }

  // Show loading state
  if (loading && activeTab === "blogs") {
    return (
      <main className="flex min-h-screen flex-col items-center pt-28">
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-600">LEARNING RESOURCES</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800">Expand Your</span> <span className="text-blue-600">Knowledge</span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Access a comprehensive library of resources to help you master business automation and AI implementation.
              From beginner guides to advanced techniques, we've got you covered.
            </p>
          </div>
        </div>

        <div className="w-full py-12 px-4">
          <div className="container mx-auto flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <ErrorBoundary>
        {/* Header Section */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 pt-28 pb-16 px-4 relative">
          <div className="absolute top-8 left-4 md:left-8">
            <Link href="/" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Homepage
            </Link>
          </div>
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-blue-100 border border-blue-200">
              <span className="text-sm font-medium text-blue-600">LEARNING RESOURCES</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800">Expand Your</span> <span className="text-blue-600">Knowledge</span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Access a comprehensive library of resources to help you master business automation and AI implementation.
              From beginner guides to advanced techniques, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => setActiveTab("blogs")} className="bg-blue-600 hover:bg-blue-700 px-6">
                Explore Blogs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="w-full py-12 px-4 bg-white">
          <div className="container mx-auto">
            <Tabs defaultValue="blogs" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 bg-transparent mb-8 justify-center">
                <TabsTrigger
                  value="courses"
                  className="w-full sm:w-auto py-2 px-4 rounded-full bg-gray-100 text-gray-700 transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </TabsTrigger>
                <TabsTrigger
                  value="blogs"
                  className="w-full sm:w-auto py-2 px-4 rounded-full bg-gray-100 text-gray-700 transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Blogs
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="w-full sm:w-auto py-2 px-4 rounded-full bg-gray-100 text-gray-700 transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab - Locked */}
              <TabsContent value="courses" className="w-full">
                <div className="bg-blue-50 rounded-lg p-8 text-center mb-8 border border-blue-100">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Lock className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Courses Coming Soon</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    We're developing comprehensive courses on business automation, AI implementation, and no-code
                    solutions. Join our waitlist to get early access and special launch discounts.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Expected Launch</p>
                        <p className="text-sm text-gray-500">Q2 2024</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Course Duration</p>
                        <p className="text-sm text-gray-500">4-6 weeks per course</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="relative overflow-hidden border-gray-200 opacity-75">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
                        <div className="bg-white p-3 rounded-full shadow-md">
                          <Lock className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Coming Soon</Badge>
                      </div>
                      <div className="relative h-48 bg-gradient-to-r from-blue-300 to-indigo-400">
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Course"
                            width={300}
                            height={200}
                            className="opacity-30"
                          />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Automation Fundamentals</CardTitle>
                        <CardDescription>Master the basics of business process automation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-2">
                          Learn how to identify automation opportunities and implement solutions using no-code tools.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>6 weeks • 12 modules</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                          Coming Soon
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Blogs Tab - Accessible */}
              <TabsContent value="blogs" className="w-full">
                {error ? (
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
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((blog, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden border-gray-200 group hover:shadow-md transition-all duration-300 opacity-0 animate-in fade-in duration-500 relative flex flex-col"
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

                        <CardHeader className="pb-2 relative">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="bg-blue-100 rounded-full p-1 h-6 w-6 flex items-center justify-center">
                              <User className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">{blog.author}</span>
                          </div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors duration-200 overflow-hidden text-ellipsis line-clamp-2">
                            {blog.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{blog.date}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{blog.readTime}</span>
                            </span>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pb-3 flex-grow">
                          <p className="text-gray-600 mb-3 overflow-hidden text-ellipsis line-clamp-3">
                            {blog.excerpt}
                          </p>
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
                        </CardContent>

                        <CardFooter className="pt-0 border-t border-gray-100 mt-auto">
                          <Link href={`/blog/${blog.slug}`} className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 group overflow-hidden relative">
                              <span className="inline-flex items-center transition-transform duration-300 group-hover:translate-x-1">
                                Read Article{" "}
                                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                              <span className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-10"></span>
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-center mt-10">
                  <Button
                    variant="outline"
                    className="border-gray-300 group hover:border-blue-300 transition-all duration-300"
                  >
                    <span className="inline-flex items-center">
                      Load More Articles
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>

                <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100 shadow-sm opacity-0 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">Stay Updated with Our Newsletter</h3>
                      <p className="text-gray-600 mb-4">
                        Get exclusive content, early access to new articles, and industry insights delivered straight to
                        your inbox.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Your email address"
                          className="bg-white border-gray-200 focus:border-blue-300 transition-colors duration-200"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap transition-all duration-300 hover:shadow-md">
                          Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <div className="bg-white p-6 rounded-full h-28 w-28 flex items-center justify-center shadow-md">
                        <Mail className="h-14 w-14 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Videos Tab - Locked */}
              <TabsContent value="videos" className="w-full">
                <div className="bg-blue-50 rounded-lg p-8 text-center mb-8 border border-blue-100">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Lock className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Video Tutorials Coming Soon</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    We're creating a library of video tutorials covering everything from basic automation concepts to
                    advanced implementation techniques. Join our waitlist to be notified when our video content
                    launches.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Expected Launch</p>
                        <p className="text-sm text-gray-500">Q3 2024</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <Video className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Content Format</p>
                        <p className="text-sm text-gray-500">Step-by-step tutorials</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="relative overflow-hidden border-gray-200 opacity-75">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
                        <div className="bg-white p-3 rounded-full shadow-md">
                          <Lock className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Coming Soon</Badge>
                      </div>
                      <div className="relative h-64 bg-gradient-to-r from-indigo-300 to-purple-400">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <Video className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Getting Started with No-Code Automation</CardTitle>
                        <CardDescription>Video Series • 5 Episodes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-2">
                          A comprehensive introduction to no-code automation tools and techniques for beginners.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>45 minutes total</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                          Coming Soon
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist-section" className="w-full py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-2 text-center">Join the Waitlist</h2>
              <p className="text-gray-600 text-center mb-6">
                Be the first to know when our courses and video tutorials launch. Get early access and exclusive
                discounts.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Expected Launch</p>
                    <p className="text-sm text-gray-600">
                      We're planning to launch our learning platform in Q2 2024 with regular content updates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Early Access</p>
                    <p className="text-sm text-gray-600">
                      Waitlist members will receive early access to our content and special launch discounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Return to Home Page
              </Link>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </main>
  )
}

