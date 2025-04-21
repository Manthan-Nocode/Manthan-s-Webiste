interface HowToStep {
  name: string
  text: string
  url?: string
  image?: {
    url: string
    width: string
    height: string
  }
}

interface HowToStructuredDataProps {
  name: string
  description: string
  totalTime: string
  estimatedCost?: {
    currency: string
    value: string
  }
  steps: HowToStep[]
}

export default function HowToStructuredData({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
}: HowToStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manthantiwari.com"

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    totalTime: totalTime,
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image.url.startsWith("http") ? step.image.url : `${baseUrl}${step.image.url}`,
          width: step.image.width,
          height: step.image.height,
        },
      }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema),
      }}
    />
  )
}
