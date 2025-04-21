import { Metadata } from 'next'

// For metadata generation
export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug || '';
  
  return {
    title: `Blog Post: ${slug} | Manthan Tiwari`,
    description: `Blog post details for ${slug}`
  }
}

// For the page component
export default async function Page(props: any) {
  const params = await props.params;
  const slug = params?.slug || '';
  
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