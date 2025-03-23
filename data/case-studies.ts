import type { CaseStudy } from "@/types"

/**
 * Mock data for case studies
 * This would be fetched from a backend in a real application
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "manufacturing",
    title: "Manufacturing Process Automation",
    client: "Industrial Solutions Inc.",
    challenge: "Manual quality control reporting was causing delays and errors in production.",
    solution:
      "Implemented an automated quality control system that captures data in real-time and generates reports automatically.",
    gradient: "from-blue-50 to-indigo-50",
    results: [
      {
        title: "Reduced reporting time",
        description: "from 5 hours to 15 minutes daily",
        icon: "CheckCircle",
        color: "blue",
      },
      {
        title: "Decreased quality issues",
        description: "by 45% through faster detection",
        icon: "CheckCircle",
        color: "indigo",
      },
      {
        title: "Saved $120,000 annually",
        description: "in labor and error costs",
        icon: "CheckCircle",
        color: "purple",
      },
      {
        title: "Improved production",
        description: "capacity by 15%",
        icon: "CheckCircle",
        color: "blue",
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Services Workflow Optimization",
    client: "Global Finance Partners",
    challenge: "Client onboarding process was taking 2 weeks, causing customer dissatisfaction.",
    solution: "Created an automated client onboarding system with document verification and approval workflows.",
    gradient: "from-purple-50 to-blue-50",
    results: [
      {
        title: "Reduced onboarding time",
        description: "from 2 weeks to 2 days",
        icon: "CheckCircle",
        color: "purple",
      },
      {
        title: "Improved compliance",
        description: "accuracy to 99.8%",
        icon: "CheckCircle",
        color: "blue",
      },
      {
        title: "Increased new client",
        description: "acquisition by 30%",
        icon: "CheckCircle",
        color: "indigo",
      },
      {
        title: "Customer satisfaction",
        description: "scores improved by 40%",
        icon: "CheckCircle",
        color: "purple",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Order Processing Automation",
    client: "Retail Innovations Co.",
    challenge: "Manual order processing was causing shipping delays and customer service issues.",
    solution:
      "Developed an end-to-end order automation system connecting inventory, shipping, and customer communication.",
    gradient: "from-pink-50 to-purple-50",
    results: [
      {
        title: "Decreased order processing",
        description: "time by 85%",
        icon: "CheckCircle",
        color: "pink",
      },
      {
        title: "Reduced shipping errors",
        description: "by 93%",
        icon: "CheckCircle",
        color: "purple",
      },
      {
        title: "Saved $200,000 in annual",
        description: "operational costs",
        icon: "CheckCircle",
        color: "fuchsia",
      },
      {
        title: "Customer retention",
        description: "increased by 25%",
        icon: "CheckCircle",
        color: "pink",
      },
    ],
  },
]

