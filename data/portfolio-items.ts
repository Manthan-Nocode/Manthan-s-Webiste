import type { PortfolioItem } from "@/types"

/**
 * Mock data for portfolio items
 * This would be fetched from a backend in a real application
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "enterprise-workflow",
    title: "Enterprise Workflow Automation",
    description:
      "Automated invoice processing system that reduced manual data entry by 95% and processing time from 3 days to 4 hours.",
    year: "2023",
    image: "/placeholder.svg?height=200&width=300",
    gradient: "from-blue-300 to-indigo-400",
    tags: ["Zapier", "Airtable", "Power Automate", "API Integration"],
    url: "#",
  },
  {
    id: "healthcare-data",
    title: "Healthcare Data Integration",
    description:
      "Connected 5 disparate healthcare systems to create a unified patient data platform, eliminating data silos and reducing reporting time by 80%.",
    year: "2022",
    image: "/placeholder.svg?height=200&width=300",
    gradient: "from-indigo-300 to-purple-400",
    tags: ["Make.com", "REST APIs", "Notion", "Webhooks"],
    url: "#",
  },
  {
    id: "sales-pipeline",
    title: "Sales Pipeline Automation",
    description:
      "Built an end-to-end sales automation system that increased lead conversion by 35% and reduced follow-up time by 60%.",
    year: "2022",
    image: "/placeholder.svg?height=200&width=300",
    gradient: "from-purple-300 to-pink-400",
    tags: ["n8n", "CRM Integration", "Email Automation", "Slack"],
    url: "#",
  },
]

