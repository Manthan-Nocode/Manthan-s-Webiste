import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Update the type definition for params
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { slug } = params
  
  return {
    title: `Blog Post: ${slug} | Manthan Tiwari`,
    description: "Blog post description will go here",
  }
}

// Update the component to use the correct PageProps type from Next.js
import { PageProps } from 'next'

export default async function Page({ 
  params 
}: PageProps) {
  // Safely access the slug from params
  const slug = params?.slug as string
  
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