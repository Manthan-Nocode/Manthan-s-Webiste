import { createClient } from "@supabase/supabase-js"
import type { BlogPost, PortfolioItem, ContactFormData } from "@/types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fetch blog posts with optimized query (select only necessary columns)
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, published_at, tags")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw new Error(error.message)
  }

  return data || []
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, content, featured_image, published_at, tags, author")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    throw new Error(error.message)
  }

  return data
}

// Fetch portfolio items with optimized query
export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("id, title, description, image, tags, year, gradient, url")
    .order("year", { ascending: false })

  if (error) {
    console.error("Error fetching portfolio items:", error)
    throw new Error(error.message)
  }

  return data || []
}

// Submit contact form data
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  const { error } = await supabase.from("contact_submissions").insert([formData])

  if (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, message: "Failed to submit form. Please try again." }
  }

  return { success: true, message: "Thank you for your message! I will get back to you soon." }
}

