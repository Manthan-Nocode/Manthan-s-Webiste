"use client"

import { Button } from "@/components/ui/button"
import { FlippingStatement } from "@/components/ui/flipping-statement"
import { ArrowRight, Zap, BrainCircuit, Gauge } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import type { HeroFeature } from "@/types"

type HeroSectionProps = {
  title: string
  subtitle: string
  features: HeroFeature[]
  problemStatements: string[]
  onViewWorkClick: () => void
  onContactClick: () => void
}

/**
 * Hero section component for the home page
 */
export default function HeroSection({
  title,
  subtitle,
  features,
  problemStatements,
  onViewWorkClick,
  onContactClick,
}: HeroSectionProps) {
  const isMobile = useMobile()

  // Standardized card hover animation class
  const cardHoverClass = "transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"

  return (
    <section id="home" className="w-full pt-28 pb-12 px-4 animate-fade-in">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-2"></div>
          <span className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium">
            Available for new opportunities
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gray-800">
            Turning <span className="text-blue-600">Strategy</span> into
          </span>
          <br className="hidden sm:block" />
          <span className="text-blue-600">Measurable Results</span>
          <div className="mt-2 text-lg sm:text-xl md:text-2xl font-medium text-gray-700">
            AI & No-Code Automation Expert
          </div>
        </h1>

        <div className="max-w-2xl mx-auto mb-6">
          <p className="text-gray-700 mb-1">Solving:</p>
          <FlippingStatement statements={problemStatements} interval={4000} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button onClick={onViewWorkClick} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6">
            View My Work <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={onContactClick} variant="outline" className="w-full sm:w-auto border-gray-300">
            Contact Me
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className={`flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-full ${cardHoverClass}`}>
            <div className="bg-blue-100 p-2 rounded-full">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gray-700">AI-Powered Solutions</span>
          </div>

          <div className={`flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-full ${cardHoverClass}`}>
            <div className="bg-blue-100 p-2 rounded-full">
              <Gauge className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gray-700">Measurable Results</span>
          </div>

          <div className={`flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-full ${cardHoverClass}`}>
            <div className="bg-blue-100 p-2 rounded-full">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gray-700">Strategic Automation</span>
          </div>
        </div>
      </div>
    </section>
  )
}

