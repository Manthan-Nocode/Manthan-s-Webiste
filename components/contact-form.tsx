"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { submitContactForm } from "@/app/actions/contact-actions"
import { z } from "zod"

// Client-side validation schema (should match server-side)
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100, "Company name is too long").optional(),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000, "Message is too long"),
})

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Get form data
    const formData = new FormData(e.currentTarget)

    // Client-side validation
    try {
      const formValues = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        company: formData.get("company")?.toString() || "",
        subject: formData.get("subject")?.toString() || "",
        message: formData.get("message")?.toString() || "",
      }

      contactSchema.parse(formValues)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
        setLoading(false)
        return
      }
    }

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        toast.success(result.message)
        // Reset form
        e.currentTarget.reset()
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error("There was an error submitting your message. Please try again.")
      console.error("Error submitting contact form:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <Input
          id="company"
          name="company"
          placeholder="Your Company"
          aria-invalid={errors.company ? "true" : "false"}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={errors.company ? "border-red-500" : ""}
        />
        {errors.company && (
          <p id="company-error" className="mt-1 text-sm text-red-500">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can I help you?"
          required
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={errors.subject ? "border-red-500" : ""}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your automation needs..."
          className={`min-h-[100px] ${errors.message ? "border-red-500" : ""}`}
          required
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
        {loading ? "Sending..." : "Send Message"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  )
}
