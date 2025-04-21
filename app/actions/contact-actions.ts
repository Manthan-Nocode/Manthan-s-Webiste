"use server"

import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase-client"
import { cookies } from "next/headers"
import { sanitizeHtml } from "@/lib/security-utils"

// Define schema for validation
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message is too short").max(3000),
})

export async function submitContactForm(formData: FormData) {
  // Rate limiting check
  const cookieStore = cookies()
  const lastSubmission = cookieStore.get("last_contact_submission")

  if (lastSubmission) {
    const lastTime = Number.parseInt(lastSubmission.value)
    const now = Date.now()

    // Limit to one submission per minute
    if (now - lastTime < 60000) {
      return {
        success: false,
        message: "Please wait a moment before submitting again",
      }
    }
  }

  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    }

    // Validate the data
    const validatedData = ContactSchema.parse(rawData)

    // Sanitize the message to prevent XSS
    const sanitizedMessage = sanitizeHtml(validatedData.message)

    // Submit to Supabase using server client
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || "",
        subject: validatedData.subject,
        message: sanitizedMessage,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Error submitting contact form:", error)
      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      }
    }

    // Set rate limiting cookie
    cookieStore.set("last_contact_submission", Date.now().toString(), {
      maxAge: 60, // 1 minute
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return {
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
