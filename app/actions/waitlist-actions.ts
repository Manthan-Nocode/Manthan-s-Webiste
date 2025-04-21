"use server"

import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase-client"
import { cookies } from "next/headers"
import { logSecurityEvent } from "@/lib/security-utils"
import { headers } from "next/headers"

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

export async function addToWaitlist(formData: FormData) {
  // Rate limiting check
  const cookieStore = cookies()
  const lastSubmission = cookieStore.get("last_waitlist_submission")
  const clientIp = headers().get("x-forwarded-for") || "unknown"

  if (lastSubmission) {
    const lastTime = Number.parseInt(lastSubmission.value)
    const now = Date.now()

    // Limit to one submission per minute
    if (now - lastTime < 60000) {
      logSecurityEvent("rate_limit_exceeded", {
        action: "waitlist_submission",
        ip: clientIp,
      })

      return {
        success: false,
        message: "Please wait a moment before submitting again",
      }
    }
  }

  // Get and validate email
  const email = formData.get("email")?.toString() || ""

  try {
    // Validate email
    emailSchema.parse(email)

    // Use server Supabase client
    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingEmails, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .limit(1)

    if (checkError) {
      logSecurityEvent("database_error", {
        action: "waitlist_check",
        error: checkError.message,
      })

      return {
        success: false,
        message: "Error processing your request. Please try again.",
      }
    }

    // If email already exists, return success but with a different message
    if (existingEmails && existingEmails.length > 0) {
      // Set rate limiting cookie
      cookieStore.set("last_waitlist_submission", Date.now().toString(), {
        maxAge: 60, // 1 minute
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      return {
        success: true,
        message: "You're already on our waitlist! We'll notify you when we launch.",
        alreadyExists: true,
      }
    }

    // Add email to waitlist
    const { error: insertError } = await supabase.from("waitlist").insert([
      {
        email,
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      logSecurityEvent("database_error", {
        action: "waitlist_insert",
        error: insertError.message,
      })

      return {
        success: false,
        message: "Error processing your request. Please try again.",
      }
    }

    // Set rate limiting cookie
    cookieStore.set("last_waitlist_submission", Date.now().toString(), {
      maxAge: 60, // 1 minute
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    logSecurityEvent("waitlist_signup", {
      email_domain: email.split("@")[1],
    })

    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll notify you when we launch.",
    }
  } catch (error) {
    logSecurityEvent("waitlist_error", {
      error: error instanceof Error ? error.message : "Unknown error",
    })

    if (error instanceof z.ZodError) {
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
