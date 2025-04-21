import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Environment variables are only accessible server-side
// This is a safe pattern for creating the Supabase client
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables. Please check your .env file.")

    // Return a mock client that doesn't expose error details to the client
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error("Configuration error") }),
          }),
          neq: () => ({
            order: () => ({
              limit: async () => ({ data: [], error: new Error("Configuration error") }),
            }),
          }),
          order: async () => ({ data: [], error: new Error("Configuration error") }),
        }),
        insert: async () => ({ error: new Error("Configuration error") }),
        upsert: async () => ({ error: new Error("Configuration error") }),
      }),
    } as any
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Create a singleton instance for the browser
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    // Server-side: Always create a new instance
    return createSupabaseClient()
  }

  // Client-side: Reuse the instance
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient()
  }

  return supabaseInstance
}

// Export a singleton instance of the Supabase client
export const supabase = getSupabaseClient()
