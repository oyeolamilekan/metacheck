"use client"

import type React from "react"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { fetchMetadata } from "../lib/fetchMetadata"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleTheme } from "./ToggleTheme"
import { Package, Send, AlertCircle, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import GooglePreview from "./previews/GooglePreview"
import TwitterPreview from "./previews/TwitterPreview"
import FacebookPreview from "./previews/FacebookPreview"
import WhatsAppPreview from "./previews/WhatsAppPreview"
import LinkedInPreview from "./previews/LinkedInPreview"
import TelegramPreview from "./previews/TelegramPreview"
import DuckDuckGoPreview from "./previews/DuckDuckGoPreview"
import DiscordPreview from "./previews/DiscordPreview"

const queryClient = new QueryClient()

function LinkPreviewerContent() {
  const [url, setUrl] = useState("")

  const {
    data: metadata,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["metadata", url],
    queryFn: () => fetchMetadata(url),
    enabled: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex">
            <ToggleTheme />
            <Github className="w-6 h-6"/>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
              Preview Links in Style
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              See how your links look across different platforms
            </p>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="relative mb-12">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="w-full h-14 pl-4 pr-12 bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "absolute right-2 top-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-all",
                isLoading && "opacity-50",
              )}
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          </form>

          {/* Error Message */}
          {isError && (
            <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>
                {error instanceof Error
                  ? error.message
                  : "An error occurred while fetching the preview. Please check the URL and try again."}
              </span>
            </div>
          )}

          {/* Preview Cards */}
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
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          Made by 
        </footer>
      </div>
    </div>
  )
}

export default function LinkPreviewerV2() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LinkPreviewerContent />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

