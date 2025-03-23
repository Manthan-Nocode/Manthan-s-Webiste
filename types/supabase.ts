export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          date: string
          read_time: string
          excerpt: string
          image: string
          is_new: boolean
          category: string
          author: string
          author_avatar: string | null
          views: string
          likes: string
          comments: string
          tags: string[]
          content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          date: string
          read_time: string
          excerpt: string
          image: string
          is_new?: boolean
          category: string
          author: string
          author_avatar?: string | null
          views: string
          likes: string
          comments: string
          tags: string[]
          content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          date?: string
          read_time?: string
          excerpt?: string
          image?: string
          is_new?: boolean
          category?: string
          author?: string
          author_avatar?: string | null
          views?: string
          likes?: string
          comments?: string
          tags?: string[]
          content?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

