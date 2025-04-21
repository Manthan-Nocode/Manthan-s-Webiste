import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/api' // Update this import to match your actual API function
import BlogPostPage from '@/components/blog-post-page' // Update this to match your actual component

// This is the correct type annotation for the generateMetadata function
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Get blog post data
  const post = await getBlogPostBySlug(params.slug)
  
  // If the post doesn't exist, return a basic metadata object
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
  
  // Return metadata for the post
  return {
    title: `${post.title} | AI & Automation Expert`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | AI & Automation Expert`,
      description: post.excerpt,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL || ''}${post.image}`],
      type: 'article',
    },
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
  
  // This is an async server component, so we can fetch data
  try {
    // Replace with your actual data fetching logic
    // const post = await getBlogPostBySlug(slug)
    
    // For now, just pass the slug to the client component
    return <BlogPostPage slug={slug} />
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return notFound()
  }
}