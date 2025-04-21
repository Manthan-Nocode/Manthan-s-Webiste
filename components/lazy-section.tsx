"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"

interface LazySectionProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
}

export default function LazySection({ component, fallback, props = {} }: LazySectionProps) {
  const LazyComponent = lazy(component)

  return (
    <Suspense
      fallback={
        fallback || (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  )
}
