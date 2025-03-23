"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mail, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { addToWaitlist } from "@/app/actions/waitlist-actions"

// Define form states for better type safety
type FormState = "idle" | "submitting" | "success"

export default function ComingSoonPage() {
  const [formState, setFormState] = useState<FormState>("idle")

  const handleSubmit = async (formData: FormData) => {
    setFormState("submitting")

    try {
      const result = await addToWaitlist(formData)

      if (result.success) {
        setFormState("success")
        toast.success(result.message)
      } else {
        setFormState("idle")
        toast.error(result.message)
      }
    } catch (error) {
      setFormState("idle")
      toast.error("There was an error joining the waitlist. Please try again.")
      console.error("Error submitting to waitlist:", error)
    }
  }

  // Render success view when form is successfully submitted
  if (formState === "success") {
    return <SuccessView />
  }

  // Render the main form view
  return (
    <main className="flex min-h-screen flex-col items-center pt-28 pb-16">
      {/* Back navigation */}
      <div className="w-full max-w-4xl px-4 mb-6">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </div>

      {/* Header Section */}
      <HeaderSection />

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <WhatToExpectSection />
                <WaitlistFormSection handleSubmit={handleSubmit} isSubmitting={formState === "submitting"} />
              </div>
            </CardContent>
          </Card>

          <ResourceCards />
        </div>
      </div>
    </main>
  )
}

// Extracted components for better code organization and performance
function HeaderSection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 mb-12">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-blue-100 border border-blue-200">
          <span className="text-sm font-medium text-blue-600">COMING SOON</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gray-800">Our</span> <span className="text-blue-600">Learning Hub</span>
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          We're working hard to bring you valuable resources on business automation, AI implementation, and no-code
          solutions. Join our waitlist to be the first to know when we launch.
        </p>
      </div>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start">
      <div className="mr-3 mt-1">
        <CheckCircle className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-blue-100">{description}</p>
      </div>
    </li>
  )
}

function WhatToExpectSection() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
      <ul className="space-y-4">
        <FeatureItem
          title="Expert Blog Articles"
          description="In-depth guides and case studies on automation and AI implementation"
        />
        <FeatureItem title="Video Tutorials" description="Step-by-step visual guides to help you implement solutions" />
        <FeatureItem
          title="Online Courses"
          description="Comprehensive learning paths for beginners to advanced users"
        />
      </ul>
      <div className="mt-8 flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-full">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">Expected Launch</p>
          <p className="text-sm text-blue-100">end of Q2 2025</p>
        </div>
      </div>
    </div>
  )
}

function WaitlistFormSection({
  handleSubmit,
  isSubmitting,
}: {
  handleSubmit: (formData: FormData) => Promise<void>
  isSubmitting: boolean
}) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Join the Waitlist</h2>
      <p className="text-gray-600 mb-6">
        Be the first to know when our learning resources are available. Get early access and exclusive content.
      </p>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="flex">
            <div className="bg-gray-100 flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-l-none"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Join Waitlist"}
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
        <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe at any time.</p>
      </form>
    </div>
  )
}

function SuccessView() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-28 pb-16">
      <div className="w-full max-w-4xl px-4 mb-6">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </div>

      <HeaderSection />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-md overflow-hidden text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You for Joining Our Waitlist!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We've added your email to our notification list. We'll let you know as soon as our learning resources are
              available.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Return to Homepage <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <ResourceCards />
        </div>
      </div>
    </main>
  )
}

// Optimized resource cards component
function ResourceCards() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <ResourceCard
        title="Blog Articles"
        description="In-depth articles on automation strategies, case studies, and implementation guides."
        type="document"
        colorClass="blue"
      />
      <ResourceCard
        title="Video Tutorials"
        description="Step-by-step video guides showing you how to implement automation solutions."
        type="video"
        colorClass="indigo"
      />
      <ResourceCard
        title="Online Courses"
        description="Comprehensive courses to master automation and no-code development."
        type="education"
        colorClass="purple"
      />
    </div>
  )
}

// Optimized resource card component with memoized SVG paths
function ResourceCard({
  title,
  description,
  type,
  colorClass,
}: {
  title: string
  description: string
  type: "document" | "video" | "education"
  colorClass: "blue" | "indigo" | "purple"
}) {
  // Get the appropriate icon based on type
  const icon = getResourceIcon(type)

  // Get the appropriate color classes
  const { bgColor, textColor } = getColorClasses(colorClass)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
      <div className={`${bgColor} p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4`}>
        <svg className={`h-6 w-6 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Helper function to get the appropriate icon based on type
function getResourceIcon(type: "document" | "video" | "education") {
  switch (type) {
    case "document":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      )
    case "video":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      )
    case "education":
      return (
        <>
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </>
      )
  }
}

// Helper function to get the appropriate color classes
function getColorClasses(colorClass: "blue" | "indigo" | "purple") {
  switch (colorClass) {
    case "blue":
      return {
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
      }
    case "indigo":
      return {
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-600",
      }
    case "purple":
      return {
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
      }
  }
}

