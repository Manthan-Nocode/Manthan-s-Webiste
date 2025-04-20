"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SkillCategory } from "@/types"
import { cn } from "@/lib/utils"
import { renderIcon } from "@/lib/icon-utils"

// Update the interface to match the actual data structure
interface SkillsSectionProps {
  skillCategories: SkillCategory[]
  skillCategoryIcons: {
    technical: { name: string; icon: string }[]
    soft: { name: string; icon: string }[]
  }
  softSkillCategoryIcons: {
    soft: { name: string; icon: string }[]
  }
}

// This interface looks correct, no changes needed

// Add defensive rendering to handle empty or undefined skillCategories

// Update the component to correctly access the array within the object

// Helper function to get badges for a skill based on its name and description
function getSkillBadges(
  skill: { name: string; description: string },
  isSkillType = "technical",
): { text: string; color: string }[] {
  const badges: { text: string; color: string }[] = []
  const name = skill.name.toLowerCase()
  const description = skill.description.toLowerCase()

  if (isSkillType === "technical") {
    // Workflow Automation tools
    if (
      name.includes("workflow") ||
      name.includes("automation") ||
      description.includes("workflow") ||
      description.includes("automate")
    ) {
      badges.push({ text: "Zapier", color: "orange" })
      badges.push({ text: "Power Automate", color: "blue" })
      badges.push({ text: "n8n", color: "green" })
      badges.push({ text: "Make.com", color: "purple" })
    }

    // API Integration
    if (name.includes("api") || description.includes("api") || description.includes("connect")) {
      badges.push({ text: "Postman", color: "orange" })
      badges.push({ text: "REST APIs", color: "blue" })
      badges.push({ text: "Webhooks", color: "indigo" })
    }

    // LLM Integration
    if (
      name.includes("llm") ||
      name.includes("ai") ||
      description.includes("ai") ||
      description.includes("intelligence")
    ) {
      badges.push({ text: "OpenAI", color: "green" })
      badges.push({ text: "LangChain", color: "blue" })
      badges.push({ text: "Hugging Face", color: "yellow" })
    }

    // No-Code Development
    if (name.includes("no-code") || description.includes("no-code") || description.includes("without writing code")) {
      badges.push({ text: "Xano", color: "blue" })
      badges.push({ text: "V0 by Vercel", color: "blue" }) // Changed from black to blue
      badges.push({ text: "Bubble", color: "teal" })
    }

    // Data Management
    if (name.includes("data") || description.includes("data")) {
      badges.push({ text: "SQL", color: "blue" })
      badges.push({ text: "Airtable", color: "green" })
      badges.push({ text: "Notion", color: "indigo" })
    }

    // Analytics & Reporting
    if (
      name.includes("analytics") ||
      name.includes("reporting") ||
      description.includes("dashboard") ||
      description.includes("insight")
    ) {
      badges.push({ text: "Power BI", color: "yellow" })
      badges.push({ text: "Tableau", color: "blue" })
      badges.push({ text: "Google Analytics", color: "orange" })
    }

    // SDLC Implementation
    if (name.includes("sdlc") || description.includes("software development")) {
      badges.push({ text: "Jira", color: "blue" })
      badges.push({ text: "GitHub", color: "purple" })
      badges.push({ text: "GitLab", color: "orange" })
    }
  } else {
    // Soft Skills badges

    // Problem Solving
    if (name.includes("problem") || description.includes("problem") || description.includes("solution")) {
      badges.push({ text: "Design Thinking", color: "blue" })
      badges.push({ text: "Root Cause Analysis", color: "green" })
      badges.push({ text: "Critical Thinking", color: "purple" })
    }

    // Client Communication
    if (
      name.includes("communication") ||
      name.includes("client") ||
      description.includes("communication") ||
      description.includes("translat")
    ) {
      badges.push({ text: "Client Presentations", color: "indigo" })
      badges.push({ text: "Technical Writing", color: "blue" })
      badges.push({ text: "Stakeholder Management", color: "green" })
    }

    // Project Management
    if (name.includes("project") || description.includes("project") || description.includes("deliver")) {
      badges.push({ text: "Agile", color: "blue" })
      badges.push({ text: "Scrum", color: "green" })
      badges.push({ text: "Kanban", color: "purple" })
    }

    // Team Collaboration
    if (
      name.includes("team") ||
      name.includes("collaboration") ||
      description.includes("team") ||
      description.includes("across")
    ) {
      badges.push({ text: "Cross-functional Teams", color: "blue" })
      badges.push({ text: "Remote Collaboration", color: "indigo" })
      badges.push({ text: "Mentoring", color: "green" })
    }

    // Leadership
    if (name.includes("leadership") || description.includes("lead")) {
      badges.push({ text: "Team Leadership", color: "blue" })
      badges.push({ text: "Strategic Planning", color: "purple" })
      badges.push({ text: "Change Management", color: "green" })
    }

    // Creativity
    if (name.includes("creativity") || description.includes("creative")) {
      badges.push({ text: "Brainstorming", color: "pink" })
      badges.push({ text: "Innovation Workshops", color: "purple" })
      badges.push({ text: "Design Sprints", color: "blue" })
    }

    // Stakeholder Management
    if (name.includes("stakeholder") || description.includes("stakeholder")) {
      badges.push({ text: "Stakeholder Mapping", color: "indigo" })
      badges.push({ text: "Influence Strategies", color: "blue" })
      badges.push({ text: "Engagement Planning", color: "purple" })
    }

    // Change Management
    if (name.includes("change") || description.includes("change") || description.includes("transition")) {
      badges.push({ text: "ADKAR Model", color: "blue" })
      badges.push({ text: "Kotter's 8-Step", color: "purple" })
      badges.push({ text: "Impact Assessment", color: "green" })
    }

    // Requirements Analysis
    if (name.includes("requirements") || description.includes("requirements") || description.includes("elicit")) {
      badges.push({ text: "User Stories", color: "blue" })
      badges.push({ text: "BPMN", color: "orange" })
      badges.push({ text: "Use Cases", color: "green" })
    }

    // Business Process Modeling
    if (name.includes("process") || description.includes("process") || description.includes("modeling")) {
      badges.push({ text: "BPMN 2.0", color: "blue" })
      badges.push({ text: "UML", color: "purple" })
      badges.push({ text: "Flowcharting", color: "green" })
    }
  }

  // Limit to 3 badges maximum
  return badges.slice(0, 3)
}

export default function SkillsSection({
  skillCategories = [],
  skillCategoryIcons,
  softSkillCategoryIcons,
}: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState("technical")
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  // Get the active category icons based on the current tab
  const activeCategoryIcons =
    activeTab === "technical"
      ? [
          { name: "Development", icon: "Code" },
          { name: "Automation", icon: "Zap" },
          { name: "AI & LLM", icon: "Brain" },
          { name: "SDLC", icon: "GitMerge" },
        ]
      : [
          { name: "Leadership", icon: "Briefcase" },
          { name: "Problem Solving", icon: "Brain" },
          { name: "Communication", icon: "MessageSquare" },
          { name: "Creativity", icon: "PenTool" },
        ]

  // Get active skills based on the current tab with defensive check
  const activeCategory = Array.isArray(skillCategories)
    ? skillCategories.find((category) => category?.id === activeTab)
    : null
  const activeSkills = activeCategory?.skills || []

  // Standardized card hover animation class
  const cardHoverClass = "transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"

  // Add a check for empty skillCategories
  const hasSkillCategories = Array.isArray(skillCategories) && skillCategories.length > 0

  return (
    <section id="skills" className="w-full py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              MY EXPERTISE
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Skills & <span className="text-blue-600">Expertise</span>
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-6">
          My journey has equipped me with a unique skill set that allows me to bridge the gap between{" "}
          <span className="text-blue-600">business needs</span> and{" "}
          <span className="text-blue-600">technical solutions</span>.
        </p>

        <div className="flex justify-center mb-6">
          <Tabs defaultValue="technical" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl w-full">
              <TabsTrigger
                value="technical"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {renderIcon("Code", "h-5 w-5")}
                <span className="font-medium">Technical Skills</span>
              </TabsTrigger>
              <TabsTrigger
                value="soft"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {renderIcon("Brain", "h-5 w-5")}
                <span className="font-medium">Soft Skills</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Skill Category Buttons */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {activeCategoryIcons.map((category, index) => (
              <div
                key={index}
                className={cn(
                  `bg-white rounded-xl shadow-sm p-3 flex flex-col items-center justify-center cursor-pointer ${cardHoverClass}`,
                  hoveredSkill === index ? "bg-blue-50 border-blue-200 border" : "",
                )}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className={cn("p-3 rounded-full mb-2", hoveredSkill === index ? "bg-blue-100" : "bg-gray-100")}>
                  <div className={cn(hoveredSkill === index ? "text-blue-600" : "text-gray-600")}>
                    {renderIcon(category.icon, "h-5 w-5")}
                  </div>
                </div>
                <span className="font-medium text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeSkills.map((skill, index) => (
            <div
              key={index}
              className={cn(
                `bg-white rounded-lg shadow-sm overflow-hidden border-t-4 ${cardHoverClass}`,
                // Use inline styles for border color to ensure it works on mobile
                "skill-card-border",
              )}
              style={{ borderTopColor: getBorderColor(skill.color) }}
            >
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div
                    className="p-3 rounded-lg skill-card-icon"
                    style={{ backgroundColor: getIconBgColor(skill.color) }}
                  >
                    {renderIcon(skill.icon, "h-5 w-5 text-white")}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    {skill.projects && <p className="text-gray-500 text-sm">{skill.projects} projects completed</p>}
                  </div>
                </div>
                <p className="text-gray-600">{skill.description}</p>

                {/* Add badges here */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {getSkillBadges(skill, activeTab).map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`text-xs px-2 py-1 rounded-full bg-${badge.color}-100 text-${badge.color}-600`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-10 bg-white p-6 rounded-lg shadow-sm ${cardHoverClass}`}>
          <h3 className="text-2xl font-semibold mb-3">My Approach</h3>
          <p className="text-gray-700">
            I believe in <span className="text-blue-600">simplicity over complexity</span>. Every solution I build
            focuses on delivering real
            <span className="text-blue-600"> business value</span> with minimal maintenance overhead. My goal is to make
            technology work for you, not the other way around.
          </p>
        </div>
      </div>
    </section>
  )
}

// Helper function to get border color
function getBorderColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#3b82f6",
    indigo: "#6366f1",
    purple: "#8b5cf6",
    green: "#10b981",
    teal: "#14b8a6",
    orange: "#f97316",
  }

  return colorMap[color] || "#3b82f6" // Default to blue if color not found
}

// Helper function to get icon background color
function getIconBgColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: "#3b82f6",
    indigo: "#6366f1",
    purple: "#8b5cf6",
    green: "#10b981",
    teal: "#14b8a6",
    orange: "#f97316",
  }

  return colorMap[color] || "#3b82f6" // Default to blue if color not found
}
