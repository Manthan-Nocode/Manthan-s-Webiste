"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function PrepareDeployment() {
  const [checking, setChecking] = useState(false)
  const [results, setResults] = useState<{
    buildSuccess: boolean
    errors: string[]
    warnings: string[]
    environmentVariables: {
      name: string
      status: "set" | "missing"
    }[]
  } | null>(null)

  async function handleCheck() {
    try {
      setChecking(true)

      // This is a client-side simulation - in a real environment,
      // this would be a Node.js script running on the server
      const response = await fetch("/api/check-deployment")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check deployment")
      }

      setResults(data)
    } catch (error) {
      console.error("Error checking deployment:", error)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Deployment Preparation</h1>

      <Button onClick={handleCheck} disabled={checking} className="mb-6">
        {checking ? "Checking..." : "Check Deployment Readiness"}
      </Button>

      {results && (
        <div className="space-y-6">
          <div
            className={`p-4 rounded-md ${results.buildSuccess ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
          >
            <h2 className="text-xl font-semibold mb-2">Build Status</h2>
            {results.buildSuccess
              ? "Build successful! Ready for deployment."
              : "Build failed. Please fix the errors below."}
          </div>

          {results.errors.length > 0 && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Errors</h2>
              <ul className="list-disc pl-5 space-y-1">
                {results.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {results.warnings.length > 0 && (
            <div className="p-4 bg-yellow-50 text-yellow-600 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Warnings</h2>
              <ul className="list-disc pl-5 space-y-1">
                {results.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-gray-50">Environment Variables</h2>
            <div className="divide-y">
              {results.environmentVariables.map((variable, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <span>{variable.name}</span>
                  <span className={variable.status === "set" ? "text-green-600" : "text-red-600"}>
                    {variable.status === "set" ? "Set" : "Missing"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

