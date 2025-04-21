import type { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase-client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manthantiwari.com"

  // Fetch blog posts from Supabase
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, date")
    .order("date", { ascending: false })

  // Generate blog URLs
  const blogUrls =
    !error && posts
      ? posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : []

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...blogUrls]
}
