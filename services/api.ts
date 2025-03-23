import type { BlogPost, ContactFormData, PortfolioItem, CaseStudy, SkillCategory } from "@/types"
import { portfolioItems, caseStudies, skillCategories } from "@/data"
import { supabase } from "@/lib/supabase-client"

/**
 * API client for fetching data from Supabase
 * Falls back to mock data if Supabase is not available or encounters an error
 */
export const api = {
  /**
   * Fetch all blog posts
   */
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

      if (error) {
        console.error("Error fetching blog posts from Supabase:", error)
        return []
      }

      // Transform Supabase data to match our BlogPost type
      return data.map((post) => ({
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
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      return []
    }
  },

  /**
   * Fetch a single blog post by slug
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

      if (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error)
        return null
      }

      if (!data) return null

      return {
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
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error)
      return null
    }
  },

  /**
   * Fetch related blog posts based on tags
   */
  async getRelatedBlogPosts(currentPostSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
    try {
      // This is a simplified approach - in a real app, you might want to use a more sophisticated
      // algorithm to find related posts based on tags, categories, etc.
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .neq("slug", currentPostSlug)
        .order("date", { ascending: false })
        .limit(limit + 5) // Fetch extra to filter by tags

      if (error) {
        console.error("Error fetching related blog posts:", error)
        return []
      }

      // Filter posts that have at least one matching tag
      // This is done client-side since Supabase doesn't support array overlap operations directly
      const relatedPosts = data
        .filter((post) => post.tags.some((tag) => tags.includes(tag)))
        .slice(0, limit)
        .map((post) => ({
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

      return relatedPosts
    } catch (error) {
      console.error("Error fetching related blog posts:", error)
      return []
    }
  },

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    try {
      // setLoading?.(true); // Removed setLoading as it's not defined in the original code
      const { data, error } = await supabase.from("portfolio_items").select("*").order("year", { ascending: false })

      if (error) {
        console.error("Error fetching portfolio items:", error)
        return portfolioItems // Fallback to mock data
      }

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        year: item.year,
        image: item.image,
        gradient: item.gradient,
        tags: item.tags,
        url: item.url || undefined,
      }))
    } catch (error) {
      console.error("Error fetching portfolio items:", error)
      return portfolioItems // Fallback to mock data
    }
    // finally { // Removed finally as setLoading is not defined in the original code
    //   setLoading?.(false);
    // }
  },

  /**
   * Fetch case studies
   */
  async getCaseStudies(): Promise<CaseStudy[]> {
    try {
      // First get the case studies
      const { data: caseStudiesData, error: caseStudiesError } = await supabase.from("case_studies").select("*")

      if (caseStudiesError) {
        console.error("Error fetching case studies:", caseStudiesError)
        return caseStudies // Fallback to mock data
      }

      // Then get all results for all case studies
      const { data: resultsData, error: resultsError } = await supabase.from("case_study_results").select("*")

      if (resultsError) {
        console.error("Error fetching case study results:", resultsError)
        return caseStudies // Fallback to mock data
      }

      // Map the results to their respective case studies
      return caseStudiesData.map((study) => {
        const studyResults = resultsData
          .filter((result) => result.case_study_id === study.id)
          .map((result) => ({
            title: result.title,
            description: result.description,
            icon: result.icon,
            color: result.color,
          }))

        return {
          id: study.id,
          title: study.title,
          client: study.client,
          challenge: study.challenge,
          solution: study.solution,
          gradient: study.gradient,
          results: studyResults,
        }
      })
    } catch (error) {
      console.error("Error fetching case studies:", error)
      return caseStudies // Fallback to mock data
    }
  },

  /**
   * Fetch a single case study by ID
   */
  async getCaseStudyById(id: string): Promise<CaseStudy | null> {
    try {
      // Get the case study
      const { data: study, error: studyError } = await supabase.from("case_studies").select("*").eq("id", id).single()

      if (studyError) {
        console.error(`Error fetching case study with id ${id}:`, studyError)
        return caseStudies.find((study) => study.id === id) || null // Fallback to mock data
      }

      // Get the results for this case study
      const { data: resultsData, error: resultsError } = await supabase
        .from("case_study_results")
        .select("*")
        .eq("case_study_id", id)

      if (resultsError) {
        console.error(`Error fetching results for case study with id ${id}:`, resultsError)
        return caseStudies.find((s) => s.id === id) || null // Fallback to mock data
      }

      const results = resultsData.map((result) => ({
        title: result.title,
        description: result.description,
        icon: result.icon,
        color: result.color,
      }))

      return {
        id: study.id,
        title: study.title,
        client: study.client,
        challenge: study.challenge,
        solution: study.solution,
        gradient: study.gradient,
        results,
      }
    } catch (error) {
      console.error(`Error fetching case study with id ${id}:`, error)
      return caseStudies.find((study) => study.id === id) || null // Fallback to mock data
    }
  },

  /**
   * Fetch skill categories
   */
  async getSkillCategories(): Promise<SkillCategory[]> {
    try {
      // First get the skill categories
      const { data: categoriesData, error: categoriesError } = await supabase.from("skill_categories").select("*")

      if (categoriesError) {
        console.error("Error fetching skill categories:", categoriesError)
        return skillCategories // Fallback to mock data
      }

      // Then get all skills
      const { data: skillsData, error: skillsError } = await supabase.from("skills").select("*")

      if (skillsError) {
        console.error("Error fetching skills:", skillsError)
        return skillCategories // Fallback to mock data
      }

      // Map the skills to their respective categories
      return categoriesData.map((category) => {
        const categorySkills = skillsData
          .filter((skill) => skill.category_id === category.id)
          .map((skill) => ({
            name: skill.name,
            icon: skill.icon,
            projects: skill.projects || undefined,
            description: skill.description,
            color: skill.color,
          }))

        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          skills: categorySkills,
        }
      })
    } catch (error) {
      console.error("Error fetching skill categories:", error)
      return skillCategories // Fallback to mock data
    }
  },

  /**
   * Submit contact form
   */
  async submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        },
      ])

      if (error) {
        console.error("Error submitting contact form:", error)
        return {
          success: false,
          message: "There was an error submitting your message. Please try again.",
        }
      }

      return {
        success: true,
        message: "Your message has been successfully submitted. We'll get back to you soon!",
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      return {
        success: false,
        message: "There was an error submitting your message. Please try again.",
      }
    }
  },

  /**
   * Join waitlist (for courses/videos)
   */
  async joinWaitlist(email: string): Promise<{ success: boolean; message: string }> {
    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      }
    }

    try {
      // Check if email already exists in waitlist
      const { data: existingEmails, error: checkError } = await supabase
        .from("waitlist")
        .select("email")
        .eq("email", email)

      if (checkError) {
        console.error("Error checking waitlist for existing email:", checkError)
        return {
          success: false,
          message: "There was an error joining the waitlist. Please try again.",
        }
      }

      // If email already exists, return success but with a different message
      if (existingEmails && existingEmails.length > 0) {
        return {
          success: true,
          message: "You're already on our waitlist! We'll notify you when we launch.",
        }
      }

      // Add email to waitlist
      const { error: insertError } = await supabase.from("waitlist").insert([{ email }])

      if (insertError) {
        console.error("Error adding email to waitlist:", insertError)
        return {
          success: false,
          message: "There was an error joining the waitlist. Please try again.",
        }
      }

      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when we launch.",
      }
    } catch (error) {
      console.error("Error joining waitlist:", error)
      return {
        success: false,
        message: "There was an error joining the waitlist. Please try again.",
      }
    }
  },
}

