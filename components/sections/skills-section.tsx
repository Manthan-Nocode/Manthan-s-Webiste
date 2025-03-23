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
    <section id="skills" className="w-full py-12 px-4 bg-gray-50">
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
                `border-${skill.color}-500`,
              )}
            >
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className={cn("p-3 rounded-lg", `bg-${skill.color}-500`)}>
                    {renderIcon(skill.icon, "h-5 w-5 text-white")}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    {skill.projects && <p className="text-gray-500 text-sm">{skill.projects} projects completed</p>}
                  </div>
                </div>
                <p className="text-gray-600">{skill.description}</p>
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

