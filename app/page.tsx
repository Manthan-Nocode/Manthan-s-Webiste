"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import Navigation from "@/components/layout/navigation"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/about-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import SkillsSection from "@/components/sections/skills-section"
import CaseStudiesSection from "@/components/sections/case-studies-section"
import {
  Zap,
  BarChart2,
  Cpu,
  Lightbulb,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  // State for mock data fetching
  const [portfolioItems, setPortfolioItems] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [skillCategories, setSkillCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState("home")
  const [activeTab, setActiveTab] = useState("technical")
  const [activeCaseStudy, setActiveCaseStudy] = useState("manufacturing")
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Navigation items
  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "portfolio", label: "Portfolio" },
    { id: "skills", label: "Skills" },
    { id: "strategic-innovation", label: "Learn", isLink: true, href: "/coming-soon" },
    { id: "case-studies", label: "Case Studies" },
  ]

  // Hero section features - we'll keep these for compatibility but they won't be used
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
          console.log("Portfolio data loaded:", portfolioData?.length || 0, "items")
          if (!portfolioData || portfolioData.length === 0) {
            portfolioData = await loadFallbackPortfolio()
            console.log("Using fallback portfolio data")
          }
        } catch (err) {
          console.error("Error loading portfolio data:", err)
          portfolioData = await loadFallbackPortfolio()
        }

        let caseStudiesData = []
        try {
          caseStudiesData = await api.getCaseStudies()
          console.log("Case studies loaded:", caseStudiesData?.length || 0, "items")
          if (!caseStudiesData || caseStudiesData.length === 0) {
            caseStudiesData = await loadFallbackCaseStudies()
            console.log("Using fallback case studies data")
          }
        } catch (err) {
          console.error("Error loading case studies data:", err)
          caseStudiesData = await loadFallbackCaseStudies()
        }

        let skillsData = []
        try {
          skillsData = await api.getSkillCategories()
          console.log("Skills loaded:", skillsData?.length || 0, "categories")
          if (!skillsData || skillsData.length === 0) {
            skillsData = await loadFallbackSkills()
            console.log("Using fallback skills data")
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
        setError(err.message || "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100 // Adjust offset for better detection

      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Scroll to section utilities
  const scrollToSection = (sectionId) => {
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

  // Skill categories with their respective icons
  const skillCategoryIcons = {
    technical: [
      { name: "Development", icon: "Code" },
      { name: "Automation", icon: "Zap" },
      { name: "Analytics", icon: "BarChart2" },
      { name: "Integration", icon: "Cpu" },
    ],
    soft: [
      { name: "Leadership", icon: "Briefcase" },
      { name: "Problem Solving", icon: "Brain" },
      { name: "Communication", icon: "MessageSquare" },
      { name: "Creativity", icon: "PenTool" },
    ],
  }

  const softSkillCategoryIcons = {
    soft: [
      { name: "Leadership", icon: "Briefcase" },
      { name: "Problem Solving", icon: "Brain" },
      { name: "Communication", icon: "MessageSquare" },
      { name: "Creativity", icon: "PenTool" },
    ],
  }

  // Standardized card hover animation class
  const cardHoverClass = "transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"

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

      {/* Strategic Innovation Section */}
      <section id="strategic-innovation" className="w-full py-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
              <Zap className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                STRATEGIC INNOVATION
              </span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Transforming Businesses
            <br />
            <span className="text-blue-600">Through Strategic Innovation</span>
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            As a strategic advisor and tech entrepreneur, I help businesses leverage AI and automation to unlock growth.
            My expertise spans product management, business strategy, and technological innovation—delivering solutions
            that drive both efficiency and strategic advantage.
          </p>

          <div className="flex justify-center mb-10">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Schedule a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 ${cardHoverClass}`}>
              <div className="bg-blue-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Strategic AI Implementation</h3>
              <p className="text-gray-600 mb-5">
                Leverage AI to solve complex business challenges and unlock new opportunities. Transform bottlenecks
                into breakthrough moments with data-driven solutions.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 ${cardHoverClass}`}>
              <div className="bg-purple-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Strategy & Innovation</h3>
              <p className="text-gray-600 mb-5">
                Drive product success through strategic vision and market insight. Two-time tech entrepreneur with
                proven track record of launching successful products.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 ${cardHoverClass}`}>
              <div className="bg-violet-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Business Transformation</h3>
              <p className="text-gray-600 mb-5">
                Guide organizations through digital transformation with a focus on strategic growth. Blend technology
                and business strategy for measurable results.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-md ${cardHoverClass}`}
          >
            <p className="text-gray-700 italic mb-3 relative pl-4">
              <span className="absolute left-0 top-0 text-indigo-400 text-3xl">"</span>
              <span className="relative z-10">
                Their strategic vision transformed our business operations. Not just through automation, but by
                reimagining our entire approach to technology and innovation. The impact on our bottom line has been
                remarkable.
              </span>
              <span className="absolute bottom-0 right-0 text-indigo-400 text-3xl">"</span>
            </p>
            <p className="text-indigo-700 font-medium">— Michael Chen, CEO</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection
        portfolioItems={portfolioItems}
        onViewAllClick={() => console.log("View all projects clicked")}
      />

      {/* Skills Section */}
      <SkillsSection
        skillCategories={skillCategories}
        skillCategoryIcons={skillCategoryIcons}
        softSkillCategoryIcons={softSkillCategoryIcons}
      />

      {/* Case Studies Section */}
      <CaseStudiesSection caseStudies={caseStudies} />

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50">
              <span className="text-sm font-medium text-blue-600">GET IN TOUCH</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Ready to <span className="text-blue-600">Automate</span> Your Business?
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Let's discuss how automation can transform your operations and drive growth. Reach out for a free
            consultation.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-5">Contact Information</h3>

                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700">hello@automationexpert.com</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700">San Francisco, CA</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700">Book a consultation</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Connect With Me</h3>

                <div className="flex gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Linkedin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Github className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Twitter className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-5">Send Me a Message</h3>

                <form className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input id="name" placeholder="John Doe" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <Input id="company" placeholder="Your Company" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can I help you?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your automation needs..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-600">
              Looking for immediate assistance? Schedule a
              <a href="#" className="underline ml-1">
                free 30-minute consultation
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

