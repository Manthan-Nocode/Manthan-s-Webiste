import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

/**
 * Creates and returns a Supabase client instance
 * Uses environment variables for configuration
 * @returns Supabase client instance
 */
export function getSupabaseClient() {
  // Check if we already have an instance to avoid creating multiple clients
  if (typeof window !== "undefined" && (window as any).__supabaseClient) {
    return (window as any).__supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables. Please check your .env file.")

    // Create a mock client that logs errors instead of throwing them
    const mockClient = {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error("Supabase configuration missing") }),
          }),
          neq: () => ({
            order: () => ({
              limit: async () => ({ data: [], error: new Error("Supabase configuration missing") }),
            }),
          }),
          order: async () => ({ data: [], error: new Error("Supabase configuration missing") }),
        }),
        insert: async () => ({ error: new Error("Supabase configuration missing") }),
        upsert: async () => ({ error: new Error("Supabase configuration missing") }),
      }),
    }

    return mockClient as any
  }

  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  // Store the client instance for reuse if in browser environment
  if (typeof window !== "undefined") {
    ;(window as any).__supabaseClient = client
  }

  return client
}

// Export a singleton instance of the Supabase client
export const supabase = getSupabaseClient()
