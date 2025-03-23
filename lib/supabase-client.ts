import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables. Please check your .env file.")
      // Return a mock client or throw an error depending on your needs
      // For now, we'll continue with empty strings but log the error
    }

    supabaseInstance = createClient<Database>(supabaseUrl || "", supabaseAnonKey || "")
  }

  return supabaseInstance
}

export const supabase = getSupabaseClient()

