import { createClient } from "@supabase/supabase-js"
import type { BlogPost, PortfolioItem, ContactFormData } from "@/types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fetch blog posts with optimized query (select only necessary columns)
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, published_at, tags")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      throw new Error(error.message)
    }

    // Transform the data to match our BlogPost type
    return data
      ? data.map(
          (item): BlogPost => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            date: item.published_at || "",
            readTime: "5 min read", // Default value
            excerpt: item.excerpt || "",
            image: item.featured_image || "from-blue-300 to-indigo-400", // Default gradient
            isNew: false, // Default value
            category: "Technology", // Default value
            author: "Admin", // Default value
            views: "0",
            likes: "0",
            comments: "0",
            tags: item.tags || [],
            content: "",
          }),
        )
      : []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, content, featured_image, published_at, tags, author")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error)
      throw new Error(error.message)
    }

    if (!data) return null

    // Transform to match BlogPost type
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      date: data.published_at || "",
      readTime: "5 min read", // Default value
      excerpt: data.content?.substring(0, 150) + "..." || "",
      image: data.featured_image || "from-blue-300 to-indigo-400", // Default gradient
      isNew: false, // Default value
      category: "Technology", // Default value
      author: data.author || "Admin",
      authorAvatar: undefined,
      views: "0",
      likes: "0",
      comments: "0",
      tags: data.tags || [],
      content: data.content || "",
    }
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// Fetch portfolio items with optimized query
export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("id, title, description, image, tags, year, gradient, url")
      .order("year", { ascending: false })

    if (error) {
      console.error("Error fetching portfolio items:", error)
      throw new Error(error.message)
    }

    // Transform to match PortfolioItem type
    return data
      ? data.map(
          (item): PortfolioItem => ({
            id: item.id,
            title: item.title,
            description: item.description || "",
            year: item.year || "",
            image: item.image || "/placeholder.svg?height=200&width=300",
            gradient: item.gradient || "from-blue-300 to-indigo-400",
            tags: item.tags || [],
            url: item.url,
          }),
        )
      : []
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    return []
  }
}

// Submit contact form data
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    if (!formData || !formData.email || !formData.name || !formData.message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    const { error } = await supabase.from("contact_submissions").insert([formData])

    if (error) {
      console.error("Error submitting contact form:", error)
      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      }
    }

    return {
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}