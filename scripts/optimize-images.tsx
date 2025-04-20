"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function OptimizeImages() {
  const [optimizing, setOptimizing] = useState(false)
  const [results, setResults] = useState<{ file: string; originalSize: number; newSize: number }[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleOptimize() {
    try {
      setOptimizing(true)
      setError(null)

      // This is a client-side simulation - in a real environment,
      // this would be a Node.js script running on the server
      const response = await fetch("/api/optimize-images")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to optimize images")
      }

      setResults(data.results)
    } catch (err) {
      console.error("Error optimizing images:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setOptimizing(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Optimization Tool</h1>

      <Button onClick={handleOptimize} disabled={optimizing} className="mb-6">
        {optimizing ? "Optimizing..." : "Optimize Images"}
      </Button>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md">{error}</div>}

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">File</th>
                  <th className="px-4 py-2 text-right">Original Size</th>
                  <th className="px-4 py-2 text-right">New Size</th>
                  <th className="px-4 py-2 text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {results.map((result, index) => {
                  const savings = result.originalSize - result.newSize
                  const savingsPercent = Math.round((savings / result.originalSize) * 100)

                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2 text-left">{result.file}</td>
                      <td className="px-4 py-2 text-right">{formatBytes(result.originalSize)}</td>
                      <td className="px-4 py-2 text-right">{formatBytes(result.newSize)}</td>
                      <td className="px-4 py-2 text-right text-green-600">
                        {formatBytes(savings)} ({savingsPercent}%)
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="px-4 py-2 text-left">Total</td>
                  <td className="px-4 py-2 text-right">
                    {formatBytes(results.reduce((sum, result) => sum + result.originalSize, 0))}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatBytes(results.reduce((sum, result) => sum + result.newSize, 0))}
                  </td>
                  <td className="px-4 py-2 text-right text-green-600">
                    {formatBytes(results.reduce((sum, result) => sum + (result.originalSize - result.newSize), 0))}(
                    {Math.round(
                      (results.reduce((sum, result) => sum + (result.originalSize - result.newSize), 0) /
                        results.reduce((sum, result) => sum + result.originalSize, 0)) *
                        100,
                    )}
                    %)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
