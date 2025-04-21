import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// This is the correct type annotation for the generateMetadata function
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Get the slug from params
  const { slug } = params
  
  // Return basic metadata (you can enhance this later)
  return {
    title: `Blog Post: ${slug} | Manthan Tiwari`,
    description: "Blog post description will go here",
  }
}

// The page component must also have proper type annotations
export default async function Page({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Get the slug from params
  const { slug } = params
  
  // Simple placeholder implementation
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Blog Post: {slug}</h1>
      <p className="mt-4">
        This is a placeholder for blog post with slug: {slug}
      </p>
      <p className="mt-4">
        You can replace this with your actual blog post component later.
      </p>
    </div>
  )
}