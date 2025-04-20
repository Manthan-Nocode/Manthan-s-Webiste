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
  scrollToSection: (sectionId: string) => void
}

export default function MobileNavigation({ items, onContactClick, scrollToSection }: MobileNavigationProps) {
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

  const handleNavigation = (item: { id: string; isLink?: boolean; href?: string }) => {
    setIsOpen(false)

    if (item.isLink && item.href) {
      window.location.href = item.href
    } else {
      scrollToSection(item.id)
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

      {/* Semi-transparent overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-nav fixed top-0 right-0 h-screen w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4 border-b border-gray-100">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col p-4">
          {items.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="justify-start text-lg py-6 border-b border-gray-100"
              onClick={() => handleNavigation(item)}
            >
              {item.label}
            </Button>
          ))}

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white mt-6"
            onClick={() => {
              setIsOpen(false)
              onContactClick()
            }}
          >
            Hire Me
          </Button>
        </nav>
      </div>
    </>
  )
}
