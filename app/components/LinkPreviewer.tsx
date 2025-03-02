"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import GooglePreview from "./previews/GooglePreview"
import TwitterPreview from "./previews/TwitterPreview"
import FacebookPreview from "./previews/FacebookPreview"
import WhatsAppPreview from "./previews/WhatsAppPreview"
import LinkedInPreview from "./previews/LinkedInPreview"
import TelegramPreview from "./previews/TelegramPreview"
import DuckDuckGoPreview from "./previews/DuckDuckGoPreview"
import DiscordPreview from "./previews/DiscordPreview"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleTheme } from "./ToggleTheme"
import { useQuery } from "@tanstack/react-query"
import type { Metadata } from "../types/metadata"
import { AlertCircle } from "lucide-react"

export default function LinkPreviewer() {
  const [url, setUrl] = useState("")
  const {
    data: metadata,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery<Metadata, Error>({
    queryKey: ["metadata", url],
    queryFn: () => fetchMetadata(url),
    enabled: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Visualize Your Links</h1>
            <p className="text-xl text-muted-foreground">See how your content shines across platforms</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL"
              className="flex-grow"
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Preview"}
            </Button>
            <ToggleTheme />
          </form>
          {isError && error instanceof Error && (
            <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error.message}</span>
            </div>
          )}
          {metadata && (
            <div className="space-y-8 transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              <GooglePreview metadata={metadata} />
              <TwitterPreview metadata={metadata} />
              <FacebookPreview metadata={metadata} />
              <WhatsAppPreview metadata={metadata} />
              <LinkedInPreview metadata={metadata} />
              <TelegramPreview metadata={metadata} />
              <DuckDuckGoPreview metadata={metadata} />
              <DiscordPreview metadata={metadata} />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

