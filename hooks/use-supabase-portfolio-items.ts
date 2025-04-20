"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { PortfolioItem } from "@/types"

export function useSupabasePortfolioItems() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPortfolioItems() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.from("portfolio_items").select("*").order("year", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        // Transform the data to match our PortfolioItem type
        const transformedData: PortfolioItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          year: item.year,
          image: item.image,
          gradient: item.gradient,
          tags: item.tags,
          url: item.url || undefined,
        }))

        setItems(transformedData)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError(err instanceof Error ? err.message : "Failed to load portfolio items")
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [])

  return { items, loading, error }
}
