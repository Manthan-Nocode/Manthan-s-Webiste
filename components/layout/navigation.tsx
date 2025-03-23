"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavigationItem {
  id: string
  label: string
  isLink?: boolean
  href?: string
}

interface NavigationProps {
  items: NavigationItem[]
  onContactClick: () => void
}

/**
 * Main navigation component
 * Handles scrolling to sections and active section highlighting
 */
export default function Navigation({ items, onContactClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home")

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

  const scrollToSection = (sectionId: string) => {
    // If it's the Learn link, navigate to the Coming Soon page
    if (sectionId === "strategic-innovation") {
      window.location.href = "/coming-soon"
      return
    }

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

  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-end py-3 px-2 md:px-4">
        <div className="flex items-center space-x-4 pr-1">
          {items.map((item) => {
            if (item.id === "strategic-innovation") {
              return (
                <button
                  key={item.id}
                  onClick={() => (window.location.href = "/coming-soon")}
                  className={`px-3 py-2 rounded-full transition-colors duration-200 text-gray-700 hover:bg-gray-50`}
                >
                  {item.label}
                </button>
              )
            }

            if (item.isLink && item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`hidden md:block px-3 py-2 rounded-full transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-full transition-colors duration-200 ${
                  activeSection === item.id ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                } ${item.id === "case-studies" ? "hidden md:block" : ""}`}
              >
                {item.label}
              </button>
            )
          })}

          <Button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 ml-2">
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  )
}

