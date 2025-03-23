"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavigationProps {
  items: Array<{
    id: string
    label: string
    isLink?: boolean
    href?: string
  }>
  onContactClick: () => void
}

export default function MobileNavigation({ items, onContactClick }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".mobile-nav") && !target.closest(".mobile-menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
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
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div className={`mobile-nav ${isOpen ? "mobile-nav-open" : "mobile-nav-closed"} p-6`}>
        <div className="flex justify-end mb-6">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-4">
          {items.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="justify-start text-lg py-3"
              onClick={() => (item.isLink ? (window.location.href = item.href!) : scrollToSection(item.id))}
            >
              {item.label}
            </Button>
          ))}

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
            onClick={() => {
              setIsOpen(false)
              onContactClick()
            }}
          >
            Contact Me
          </Button>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />}
    </>
  )
}

