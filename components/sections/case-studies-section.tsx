"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CaseStudy } from "@/types"
import { cn } from "@/lib/utils"

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
}

/**
 * Case studies section component
 * Displays success stories with tabs for different industries
 */
export default function CaseStudiesSection({ caseStudies = [] }: CaseStudiesSectionProps) {
  // Add a check for empty caseStudies
  const hasCaseStudies = Array.isArray(caseStudies) && caseStudies.length > 0

  const [activeCaseStudy, setActiveCaseStudy] = useState(hasCaseStudies ? caseStudies[0]?.id || "" : "")

  // Get the active case study data with defensive check
  const activeStudy = hasCaseStudies
    ? caseStudies.find((study) => study.id === activeCaseStudy) || caseStudies[0]
    : null

  return (
    <section id="case-studies" className="w-full py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50">
            <span className="text-sm font-medium text-blue-600">SUCCESS STORIES</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Real <span className="text-blue-600">Results</span> for Real Businesses
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Explore detailed case studies showing how my automation solutions have transformed operations and delivered
          measurable ROI.
        </p>

        {!hasCaseStudies ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Case studies are loading or unavailable at the moment.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6 w-full">
              <Tabs
                defaultValue={caseStudies[0]?.id || ""}
                className="w-full max-w-3xl mx-auto"
                onValueChange={setActiveCaseStudy}
                value={activeCaseStudy}
              >
                <TabsList className="flex flex-col md:flex-row w-full gap-2 md:gap-3 bg-transparent mb-6">
                  {caseStudies.map((study) => (
                    <TabsTrigger
                      key={study.id}
                      value={study.id}
                      className="w-full py-2 md:py-2.5 px-3 md:px-4 rounded-full bg-gray-100 text-gray-700 text-sm md:text-base transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      {study.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {activeStudy && (
              <div className="max-w-3xl mx-auto">
                <div
                  className={`bg-gradient-to-br ${activeStudy.gradient} rounded-lg shadow-md p-5 sm:p-6 border border-blue-100`}
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1 text-indigo-800">{activeStudy.title}</h3>
                      <p className="text-blue-600 font-medium">{activeStudy.client}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white bg-opacity-70 p-4 rounded-md border-l-4 border-blue-500 shadow-sm">
                        <h4 className="text-lg font-medium mb-1 text-blue-700">The Challenge</h4>
                        <p className="text-gray-700">{activeStudy.challenge}</p>
                      </div>

                      <div className="bg-white bg-opacity-70 p-4 rounded-md border-l-4 border-indigo-500 shadow-sm">
                        <h4 className="text-lg font-medium mb-1 text-indigo-700">The Solution</h4>
                        <p className="text-gray-700">{activeStudy.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3 text-purple-700">The Results</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeStudy.results.map((result, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-white bg-opacity-70 p-3 rounded-md border shadow-sm case-study-result"
                            style={{ borderColor: getResultBorderColor(result.color) }}
                          >
                            <div
                              className="p-2 rounded-full mt-1 case-study-icon"
                              style={{
                                backgroundColor: getResultBgColor(result.color),
                                color: getResultTextColor(result.color),
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.2" />
                                <path
                                  d="M5.5 8L7 9.5L10.5 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="case-study-text">
                              <p
                                className="font-medium case-study-title"
                                style={{ color: getResultTitleColor(result.color) }}
                              >
                                {result.title}
                              </p>
                              <p className="text-gray-700 text-sm">{result.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <Button
                        className={cn(
                          "w-full sm:w-auto shadow-md transition-transform duration-300 hover:scale-105",
                          activeStudy.id === "manufacturing"
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            : activeStudy.id === "financial"
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700",
                        )}
                      >
                        Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// Helper functions for case study result colors
function getResultBorderColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#dbeafe",
    indigo: "#e0e7ff",
    purple: "#ede9fe",
    pink: "#fce7f3",
    fuchsia: "#fae8ff",
  }

  return colorMap[color] || "#dbeafe" // Default to blue if color not found
}

function getResultBgColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#eff6ff",
    indigo: "#eef2ff",
    purple: "#f5f3ff",
    pink: "#fdf2f8",
    fuchsia: "#fdf4ff",
  }

  return colorMap[color] || "#eff6ff" // Default to blue if color not found
}

function getResultTextColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#3b82f6",
    indigo: "#6366f1",
    purple: "#8b5cf6",
    pink: "#ec4899",
    fuchsia: "#d946ef",
  }

  return colorMap[color] || "#3b82f6" // Default to blue if color not found
}

function getResultTitleColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#1e40af",
    indigo: "#3730a3",
    purple: "#6b21a8",
    pink: "#9d174d",
    fuchsia: "#86198f",
  }

  return colorMap[color] || "#1e40af" // Default to blue if color not found
}
