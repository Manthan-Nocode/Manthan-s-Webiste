import type { BlogPost } from "@/types"

interface BlogStructuredDataProps {
  post: BlogPost
  url: string
}

export default function BlogStructuredData({ post, url }: BlogStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manthantiwari.com"
  const fullUrl = `${baseUrl}${url}`

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image || "/images/blog-default.jpg",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Manthan Tiwari",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content?.split(/\s+/).length || 0,
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${baseUrl}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: fullUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
