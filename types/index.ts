/**
 * Type definitions for the application
 */

// Blog post types
export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  readTime: string
  excerpt: string
  image: string
  isNew: boolean
  category: string
  author: string
  authorAvatar?: string
  views: string
  likes: string
  comments: string
  tags: string[]
  content?: string
}

// Portfolio item types
export interface PortfolioItem {
  id: string
  title: string
  description: string
  year: string
  image: string
  gradient: string
  tags: string[]
  url?: string
}

// Case study types
export interface CaseStudy {
  id: string
  title: string
  client: string
  challenge: string
  solution: string
  results: Result[]
  gradient: string
}

export interface Result {
  title: string
  description: string
  icon: string
  color: string
}

// Skill types
export interface Skill {
  name: string
  icon: string
  projects?: number
  description: string
  color: string
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  skills: Skill[]
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

// Hero section types
export interface HeroFeature {
  icon: string
  text: string
}

