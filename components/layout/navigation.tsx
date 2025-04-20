"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "./mobile-navigation"
import { useRouter } from "next/navigation"

interface NavigationProps {
  items: Array<{
    id: string
    label: string
    isLink?: boolean
    href?: string
  }>
  onContactClick: () => void
}

export default function Navigation({ items, onContactClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  // Improved scroll detection with throttling
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY

      // Update navbar style on scroll
      if (lastScrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Update active section based on scroll position
          const sections = document.querySelectorAll("section")
          const scrollPosition = lastScrollY + 150 // Adjust offset for better detection

          let currentSection = "home"

          sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150
            const sectionHeight = section.clientHeight

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSection = section.id
            }
          })

          if (currentSection !== activeSection) {
            setActiveSection(currentSection)
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Improved smooth scrolling function
  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (sectionId.startsWith("/")) {
        // Use router for page navigation
        router.push(sectionId)
        return
      }

      const section = document.getElementById(sectionId)
      if (section) {
        // Get the header height dynamically
        const header = document.querySelector("header") as HTMLElement
        const headerHeight = header ? header.offsetHeight : 0

        // Use native smooth scrolling with proper offset
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    },
    [router],
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex-1 md:flex-none">{/* Logo or brand could go here */}</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {items.map(
            (item) =>
              // Skip rendering the case-studies button
              item.id !== "case-studies" && (
                <button
                  key={item.id}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.id ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => (item.isLink && item.href ? router.push(item.href) : scrollToSection(item.id))}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  role="menuitem"
                >
                  {item.label}
                </button>
              ),
          )}

          <Button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 text-white">
            Hire Me
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavigation
            items={items.filter((item) => item.id !== "case-studies")}
            onContactClick={onContactClick}
            scrollToSection={scrollToSection}
          />
        </div>
      </div>
    </header>
  )
}
