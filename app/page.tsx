"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import Navigation from "@/components/layout/navigation"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/about-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import SkillsSection from "@/components/sections/skills-section"
import CaseStudiesSection from "@/components/sections/case-studies-section"
import ContactSection from "@/components/sections/contact-section"
import { useMobile } from "@/hooks/use-mobile"
import type { PortfolioItem, CaseStudy, SkillCategory } from "@/types"

export default function Home() {
  // State for mock data fetching
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMobile()

  // Navigation items
  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "portfolio", label: "Portfolio" },
    { id: "skills", label: "Skills" },
    { id: "strategic-innovation", label: "Learn", isLink: true, href: "/coming-soon" },
    { id: "case-studies", label: "Case Studies" },
  ]

  // Hero section features
  const heroFeatures = [
    { icon: "Zap", text: "Process Automation" },
    { icon: "BarChart2", text: "Workflow Optimization" },
    { icon: "Cpu", text: "No-Code Solutions" },
  ]

  // Problem statements for the flipping component
  const problemStatements = [
    "Repetitive tasks leading to employee burnout",
    "Manual processes causing costly errors",
    "Data silos preventing business insights",
    "Inefficient workflows slowing down operations",
    "Legacy systems limiting business growth",
    "Disconnected tools creating process gaps",
  ]

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Define fallback data loaders
        const loadFallbackPortfolio = async () => {
          const { portfolioItems } = await import("@/data/portfolio-items")
          return portfolioItems
        }

        const loadFallbackCaseStudies = async () => {
          const { caseStudies } = await import("@/data/case-studies")
          return caseStudies
        }

        const loadFallbackSkills = async () => {
          const { skillCategories } = await import("@/data/skills")
          return skillCategories
        }

        // Try API first, fall back to local data
        let portfolioData = []
        try {
          portfolioData = await api.getPortfolioItems()
          if (!portfolioData || portfolioData.length === 0) {
            portfolioData = await loadFallbackPortfolio()
          }
        } catch (err) {
          console.error("Error loading portfolio data:", err)
          portfolioData = await loadFallbackPortfolio()
        }

        let caseStudiesData = []
        try {
          caseStudiesData = await api.getCaseStudies()
          if (!caseStudiesData || caseStudiesData.length === 0) {
            caseStudiesData = await loadFallbackCaseStudies()
          }
        } catch (err) {
          console.error("Error loading case studies data:", err)
          caseStudiesData = await loadFallbackCaseStudies()
        }

        let skillsData = []
        try {
          skillsData = await api.getSkillCategories()
          if (!skillsData || skillsData.length === 0) {
            skillsData = await loadFallbackSkills()
          }
        } catch (err) {
          console.error("Error loading skills data:", err)
          skillsData = await loadFallbackSkills()
        }

        // Update state with the data (API or fallback)
        setPortfolioItems(portfolioData || [])
        setCaseStudies(caseStudiesData || [])
        setSkillCategories(skillsData || [])
      } catch (err) {
        console.error("Fatal error in data fetching:", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Force CSS reload
    const reloadCSS = () => {
      const links = document.getElementsByTagName("link")
      for (let i = 0; i < links.length; i++) {
        const link = links[i]
        if (link.rel === "stylesheet") {
          link.href = link.href.split("?")[0] + "?v=" + new Date().getTime()
        }
      }
    }

    // Reload CSS after a short delay to ensure DOM is ready
    setTimeout(reloadCSS, 500)
  }, [])

  // Scroll to section utilities
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeight = 80 // Height of the navigation bar
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: sectionTop - navHeight,
        behavior: "smooth",
      })
    }
  }

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-lg">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't load the content. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navigation */}
      <Navigation items={navigationItems} onContactClick={() => scrollToSection("contact")} />

      {/* Hero Section */}
      <HeroSection
        title="Simplifying Business Processes"
        subtitle="with No-Code Automation"
        features={heroFeatures}
        problemStatements={problemStatements}
        onViewWorkClick={() => scrollToSection("portfolio")}
        onContactClick={() => scrollToSection("contact")}
      />

      {/* About Section */}
      <AboutSection />

      {/* Portfolio Section */}
      <PortfolioSection
        portfolioItems={portfolioItems}
        onViewAllClick={() => console.log("View all projects clicked")}
      />

      {/* Skills Section */}
      <SkillsSection
        skillCategories={skillCategories}
        skillCategoryIcons={{
          technical: [
            { name: "Development", icon: "Code" },
            { name: "Automation", icon: "Zap" },
            { name: "AI & LLM", icon: "Brain" },
            { name: "SDLC", icon: "GitMerge" },
          ],
          soft: [
            { name: "Leadership", icon: "Briefcase" },
            { name: "Problem Solving", icon: "Brain" },
            { name: "Communication", icon: "MessageSquare" },
            { name: "Creativity", icon: "PenTool" },
          ],
        }}
        softSkillCategoryIcons={{
          soft: [
            { name: "Leadership", icon: "Briefcase" },
            { name: "Problem Solving", icon: "Brain" },
            { name: "Communication", icon: "MessageSquare" },
            { name: "Creativity", icon: "PenTool" },
          ],
        }}
      />

      {/* Case Studies Section */}
      <CaseStudiesSection caseStudies={caseStudies} />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}