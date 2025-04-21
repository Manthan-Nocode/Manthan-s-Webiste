// Update app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

// Helper function to handle both Promise and non-Promise params
async function resolveParams<T>(params: Promise<T> | T): Promise<T> {
  return params instanceof Promise ? await params : params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}): Promise<Metadata> {
  const resolvedParams = await resolveParams(params);
  const { slug } = resolvedParams;
  
  return {
    title: `Blog Post: ${slug} | Manthan Tiwari`,
    description: "Blog post description will go here",
  }
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  const resolvedParams = await resolveParams(params);
  const { slug } = resolvedParams;
  
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