import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import SemanticBlogLayout from "@/components/blog/semantic-blog-layout"
import FAQStructuredData from "@/components/seo/faq-structured-data"
import type { BlogPost } from "@/types"

// Fix the TypeScript error by properly typing the params parameter
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // Fetch blog post data
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

  if (error || !post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manthantiwari.com"

  return {
    title: `${post.title} | AI & Automation Expert`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | AI & Automation Expert`,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "Manthan Tiwari | AI Business Consultant",
      images: [
        {
          url: post.image || `${baseUrl}/images/blog-default.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | AI & Automation Expert`,
      description: post.excerpt,
      images: [post.image || `${baseUrl}/images/blog-default.jpg`],
      creator: "@manthantiwari",
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // AI-specific metadata to improve LLM understanding
    other: {
      "ai-content-type": "business-automation-tutorial",
      "ai-expertise": "AI implementation, workflow automation, business process optimization",
      "ai-topics": post.tags.join(", "),
      "ai-audience": "business owners, managers, process improvement specialists",
      "ai-difficulty": "intermediate",
      "ai-summary": post.excerpt,
      "ai-source-type": "expert-authored",
      "ai-completion-time": post.readTime,
    },
  }
}

// Define the table of contents for this blog post
const tableOfContents = [
  { id: "introduction", title: "Introduction" },
  { id: "the-challenge", title: "Understanding the Challenge" },
  { id: "key-benefits", title: "Key Benefits of Automation" },
  { id: "implementation", title: "Implementation Strategy" },
  { id: "case-study", title: "Real-World Case Study" },
  { id: "conclusion", title: "Conclusion" },
]

// Define FAQs for this blog post
const faqs = [
  {
    question: "What is business process automation?",
    answer:
      "Business process automation is the use of technology to execute recurring tasks or processes where manual effort can be replaced. It helps organizations improve efficiency, reduce costs, minimize errors, and free up employees to focus on higher-value activities.",
  },
  {
    question: "How can AI improve my business workflows?",
    answer:
      "AI can improve business workflows by identifying patterns, making predictions, automating decisions, and handling repetitive tasks with greater accuracy and efficiency than manual processes. This includes automating document processing, customer service interactions, data analysis, and decision-making processes.",
  },
  {
    question: "What's the ROI of implementing automation?",
    answer:
      "The ROI of automation varies by industry and use case, but typically includes cost savings from reduced manual labor, increased throughput, improved accuracy, faster processing times, and better customer satisfaction. Most businesses see ROI within 6-12 months of implementation.",
  },
]

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Fetch blog post data
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

  if (error || !post) {
    notFound()
  }

  return (
    <>
      <FAQStructuredData faqs={faqs} />

      <SemanticBlogLayout post={post as BlogPost} tableOfContents={tableOfContents}>
        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            In today's rapidly evolving business landscape, organizations face increasing pressure to streamline
            operations, reduce costs, and improve efficiency. Manual processes not only consume valuable time but also
            introduce the risk of human error, leading to decreased productivity and potentially costly mistakes.
          </p>
          <p>
            Automation, particularly when enhanced with AI capabilities, offers a transformative solution to these
            challenges. By identifying repetitive tasks and implementing intelligent workflows, businesses can achieve
            significant operational improvements while freeing up human resources for more strategic activities.
          </p>
        </section>

        <section id="the-challenge">
          <h2>Understanding the Challenge</h2>
          <p>
            The challenge becomes particularly acute as businesses scale. What might have been manageable manual
            processes for a small operation quickly become bottlenecks as transaction volumes increase and complexity
            grows. Without proper automation, businesses find themselves caught in a cycle of hiring more staff to
            handle manual tasks rather than focusing on strategic growth initiatives.
          </p>
          <p>Common pain points include:</p>
          <ul>
            <li>Data entry errors and inconsistencies</li>
            <li>Slow processing times leading to customer dissatisfaction</li>
            <li>Information silos preventing cross-departmental collaboration</li>
            <li>Difficulty scaling operations to meet growing demand</li>
            <li>Limited visibility into process performance and bottlenecks</li>
          </ul>
        </section>

        <section id="key-benefits">
          <h2>Key Benefits of Automation</h2>
          <p>Implementing a strategic automation approach offers multiple significant advantages:</p>
          <ul>
            <li>
              <strong>Increased efficiency and productivity:</strong> By eliminating repetitive manual tasks, employees
              can focus on higher-value activities that require human creativity and decision-making.
            </li>
            <li>
              <strong>Reduced error rates:</strong> Automated processes execute consistently, eliminating the
              variability and errors that often accompany manual work.
            </li>
            <li>
              <strong>Enhanced scalability:</strong> Automated systems can handle growing transaction volumes without
              proportional increases in resources.
            </li>
            <li>
              <strong>Improved data quality and insights:</strong> Automation centralizes data collection and
              standardizes formats, enabling better analytics and decision-making.
            </li>
            <li>
              <strong>Better customer experience:</strong> Faster, more accurate processes translate to improved service
              delivery and customer satisfaction.
            </li>
          </ul>
        </section>

        <section id="implementation">
          <h2>Implementation Strategy</h2>
          <p>A successful automation implementation follows these key steps:</p>
          <ol>
            <li>
              <strong>Process assessment and mapping:</strong> Document current workflows, identifying pain points,
              bottlenecks, and opportunities for improvement.
            </li>
            <li>
              <strong>ROI analysis:</strong> Calculate the potential return on investment for each automation
              opportunity, prioritizing those with the highest impact.
            </li>
            <li>
              <strong>Technology selection:</strong> Choose the right tools and platforms based on your specific
              requirements, existing systems, and budget constraints.
            </li>
            <li>
              <strong>Phased implementation:</strong> Start with pilot projects to demonstrate value and refine your
              approach before scaling to larger initiatives.
            </li>
            <li>
              <strong>Change management:</strong> Prepare your team for the transition with proper training,
              communication, and support.
            </li>
            <li>
              <strong>Continuous improvement:</strong> Monitor performance, gather feedback, and iterate on your
              automation solutions to maximize long-term value.
            </li>
          </ol>
        </section>

        <section id="case-study">
          <h2>Real-World Case Study</h2>
          <p>
            A mid-sized financial services company was struggling with their document processing workflow. Each month,
            they manually processed over 5,000 documents, requiring 8 full-time employees and taking an average of 3
            days per document. Errors were common, leading to customer complaints and compliance risks.
          </p>
          <p>By implementing an AI-powered document automation solution, they achieved:</p>
          <ul>
            <li>90% reduction in processing time (from 3 days to 4 hours)</li>
            <li>85% decrease in error rates</li>
            <li>Reallocation of 6 employees to higher-value customer service roles</li>
            <li>$450,000 annual cost savings</li>
            <li>Improved customer satisfaction scores by 35%</li>
          </ul>
          <p>
            The initial investment was recouped within 5 months, and the solution continues to deliver increasing value
            as the company grows.
          </p>
        </section>

        <section id="conclusion">
          <h2>Conclusion</h2>
          <p>
            Business process automation, especially when enhanced with AI capabilities, represents a significant
            opportunity for organizations to improve efficiency, reduce costs, and enhance customer experiences. By
            taking a strategic approach to implementation—starting with a thorough assessment of current processes and
            prioritizing high-impact opportunities—businesses can achieve meaningful results quickly and build momentum
            for broader digital transformation initiatives.
          </p>
          <p>
            The key to success lies in viewing automation not just as a cost-cutting measure, but as a strategic enabler
            that frees up human talent for more creative, high-value work. When implemented thoughtfully, automation
            becomes a competitive advantage that allows organizations to scale operations, improve quality, and respond
            more quickly to changing market conditions.
          </p>
        </section>
      </SemanticBlogLayout>
    </>
  )
}
