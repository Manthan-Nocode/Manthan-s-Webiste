"use client"

import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/types"

type PortfolioSectionProps = {
  portfolioItems: PortfolioItem[]
  onViewAllClick: () => void
}

/**
 * Portfolio section component displaying featured projects
 */
export default function PortfolioSection({ portfolioItems = [], onViewAllClick }: PortfolioSectionProps) {
  // Standardized card hover animation class
  const cardHoverClass = "transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"

  // Add a check for empty portfolioItems
  const hasPortfolioItems = Array.isArray(portfolioItems) && portfolioItems.length > 0

  return (
    <section id="portfolio" className="w-full py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              FEATURED PROJECTS
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My Automation <span className="text-blue-600">Portfolio</span>
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Explore my recent projects that have transformed business operations and delivered measurable results through
          no-code automation.
        </p>

        {!hasPortfolioItems ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Portfolio items are loading or unavailable at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div key={item.id} className="portfolio-card rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <div className={`relative bg-gradient-to-r ${item.gradient} h-48`}>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs">{item.year}</div>
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="opacity-30"
                      priority={index < 3} // Prioritize loading for first 3 images
                      loading={index >= 3 ? "lazy" : "eager"} // Lazy load the rest
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      className="text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                      variant="link"
                    >
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button onClick={onViewAllClick} className="bg-blue-600 hover:bg-blue-700 px-6">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
