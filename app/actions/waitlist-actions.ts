"use server"

import { supabase } from "@/lib/supabase-client"
import { cookies } from "next/headers"
import { z } from "zod"

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

export async function addToWaitlist(formData: FormData) {
  // Rate limiting check
  const cookieStore = cookies()
  const lastSubmission = cookieStore.get("last_waitlist_submission")

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

  // Get and validate email
  const email = formData.get("email")?.toString() || ""

  try {
    // Validate email
    emailSchema.parse(email)

    // Use a single database operation with upsert pattern
    const { error } = await supabase.from("waitlist").upsert([{ email }], {
      onConflict: "email",
      ignoreDuplicates: true,
    })

    if (error) {
      // Check if it's a unique constraint violation (email already exists)
      if (error.code === "23505") {
        // Set rate limiting cookie
        cookieStore.set("last_waitlist_submission", Date.now().toString(), {
          maxAge: 60, // 1 minute
          path: "/",
        })

        return {
          success: true,
          message: "You're already on our waitlist! We'll notify you when we launch.",
          alreadyExists: true,
        }
      }

      console.error("Error with waitlist operation:", error)
      return {
        success: false,
        message: "Error processing your request. Please try again.",
      }
    }

    // Set rate limiting cookie
    cookieStore.set("last_waitlist_submission", Date.now().toString(), {
      maxAge: 60, // 1 minute
      path: "/",
    })

    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll notify you when we launch.",
    }
  } catch (error) {
    console.error("Error in addToWaitlist:", error)
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

