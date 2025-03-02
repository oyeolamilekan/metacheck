/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchMetadata } from "./actions/fetchMetadata"
import GooglePreview from "./components/previews/GooglePreview"
import TwitterPreview from "./components/previews/TwitterPreview"
import FacebookPreview from "./components/previews/FacebookPreview"

export default function LinkPreviewer() {
  const [url, setUrl] = useState("")
  const [metadata, setMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await fetchMetadata(url)
      setMetadata(result)
    } catch (error) {
      console.error("Error fetching metadata:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL"
            className="flex-grow bg-[#202124] border-gray-700 text-white"
            required
          />
          <Button type="submit" disabled={loading} className="bg-[#8AB4F8] text-black hover:bg-[#6B9EF7]">
            {loading ? "Loading..." : "Preview"}
          </Button>
        </form>
        {metadata && (
          <div className="grid grid-cols-1 gap-6">
            <GooglePreview metadata={metadata} />
            <TwitterPreview metadata={metadata} />
            <FacebookPreview metadata={metadata} />
          </div>
        )}
      </div>
    </div>
  )
}

