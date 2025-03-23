import type { SkillCategory } from "@/types"

/**
 * Mock data for skills
 * This would be fetched from a backend in a real application
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "technical",
    name: "Technical Skills",
    icon: "Code",
    skills: [
      {
        name: "Workflow Automation",
        icon: "Zap",
        projects: 24,
        description: "I create seamless workflows that eliminate repetitive tasks and save hours of manual work.",
        color: "blue",
      },
      {
        name: "API Integration",
        icon: "Zap",
        projects: 18,
        description: "Connecting systems through APIs is my specialty, creating unified data ecosystems.",
        color: "indigo",
      },
      {
        name: "LLM Integration",
        icon: "Brain",
        projects: 12,
        description: "I implement custom LLM solutions that enhance business processes with AI-powered intelligence.",
        color: "purple",
      },
      {
        name: "Agile Methodologies",
        icon: "GitBranch",
        projects: 20,
        description:
          "I apply Scrum and Kanban frameworks to deliver iterative solutions with measurable business value.",
        color: "green",
      },
      {
        name: "No-Code Development",
        icon: "Cpu",
        projects: 30,
        description: "Building powerful applications without writing code is where I truly shine.",
        color: "blue",
      },
      {
        name: "Data Management",
        icon: "Database",
        projects: 15,
        description: "I transform raw data into structured, actionable insights that drive business decisions.",
        color: "indigo",
      },
      {
        name: "SDLC Implementation",
        icon: "GitMerge",
        projects: 16,
        description: "I establish robust software development lifecycles that ensure quality and maintainability.",
        color: "teal",
      },
      {
        name: "Analytics & Reporting",
        icon: "BarChart2",
        projects: 12,
        description: "I create dashboards that transform complex data into clear, actionable insights.",
        color: "purple",
      },
    ],
  },
  {
    id: "soft",
    name: "Soft Skills",
    icon: "Brain",
    skills: [
      {
        name: "Problem Solving",
        icon: "Lightbulb",
        description: "I thrive on finding elegant solutions to complex business challenges.",
        color: "orange",
      },
      {
        name: "Client Communication",
        icon: "MessageSquare",
        description: "Translating technical concepts into business language is my superpower.",
        color: "green",
      },
      {
        name: "Project Management",
        icon: "BarChart2",
        description: "I deliver projects on time and within scope, keeping stakeholders informed throughout.",
        color: "blue",
      },
      {
        name: "Team Collaboration",
        icon: "Users",
        description: "Working across departments to align technology with business goals is where I excel.",
        color: "purple",
      },
    ],
  },
]

/**
 * Skill categories with their respective icons for the skills section UI
 */
export const skillCategoryIcons = [
  { name: "Development", icon: "Code" },
  { name: "Automation", icon: "Zap" },
  { name: "AI & LLM", icon: "Brain" },
  { name: "SDLC", icon: "GitMerge" },
]

export const softSkillCategoryIcons = [
  { name: "Leadership", icon: "Briefcase" },
  { name: "Problem Solving", icon: "Brain" },
  { name: "Communication", icon: "MessageSquare" },
  { name: "Creativity", icon: "PenTool" },
]

