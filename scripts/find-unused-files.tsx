"use client"

import { useEffect, useState } from "react"

export default function FindUnusedFiles() {
  const [unusedFiles, setUnusedFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function scanForUnusedFiles() {
      try {
        // This is a client-side simulation - in a real environment,
        // this would be a Node.js script running on the server
        const response = await fetch("/api/scan-unused-files")
        const data = await response.json()
        setUnusedFiles(data.unusedFiles)
      } catch (error) {
        console.error("Error scanning for unused files:", error)
      } finally {
        setLoading(false)
      }
    }

    scanForUnusedFiles()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Unused Files Scanner</h1>

      {loading ? (
        <p>Scanning for unused files...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Unused Files ({unusedFiles.length})</h2>
          {unusedFiles.length === 0 ? (
            <p className="text-green-600">No unused files found!</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {unusedFiles.map((file, index) => (
                <li key={index} className="text-red-600">
                  {file}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
