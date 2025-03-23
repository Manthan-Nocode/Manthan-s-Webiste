"use client"
import { FlippingStatement } from "@/components/ui/flipping-statement"

interface FlippingProblemStatementProps {
  statements: string[]
}

export function FlippingProblemStatement({ statements }: FlippingProblemStatementProps) {
  return <FlippingStatement statements={statements} />
}

