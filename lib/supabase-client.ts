import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a singleton instance for the browser
let supabaseInstance: ReturnType<typeof createBrowserSupabaseClient> | null = null

/**
 * Creates a Supabase client for browser usage with anon key
 * This client respects RLS policies and is safe for client-side use
 */
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables. Please check your .env file.")
    throw new Error("Supabase configuration error")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

/**
 * Creates a Supabase client for server-side usage
 * This should ONLY be used in server components, API routes, or server actions
 * NEVER expose this client to the browser
 */
export function createServerSupabaseClient() {
  // Ensure this code only runs on the server
  if (typeof window !== "undefined") {
    throw new Error("Server Supabase client cannot be used in browser context")
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

/**
 * Returns a browser Supabase client
 * Safe for client-side usage
 */
export function getSupabaseClient() {
  if (typeof window === "undefined") {
    // Server-side: Create a new client with anon key (NOT service key)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  }

  // Client-side: Reuse the instance
  if (!supabaseInstance) {
    supabaseInstance = createBrowserSupabaseClient()
  }

  return supabaseInstance
}

// Export a singleton instance of the Supabase client for browser usage
export const supabase = getSupabaseClient()
