"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "./mobile-navigation"
// Import the useRouter hook at the top of the file
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

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
  // Add the router inside the component function
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style on scroll
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
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
    if (sectionId.startsWith("/")) {
      // Use router for page navigation
      router.push(sectionId)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {items.map((item) => (
            <button
              key={item.id}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                activeSection === item.id ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => (item.isLink ? router.push(item.href!) : scrollToSection(item.id))}
              aria-current={activeSection === item.id ? "page" : undefined}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}

          <Button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 text-white">
            Contact Me
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <div
          id="mobile-navigation"
          className={`mobile-nav ${isOpen ? "mobile-nav-open" : "mobile-nav-closed"} p-6`}
          role="menu"
          aria-hidden={!isOpen}
        >
          <MobileNavigation items={items} onContactClick={onContactClick} />
        </div>
      </div>
    </header>
  )
}

