"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { fetchMetadata } from "../actions/fetchMetadata"
import { ToggleTheme } from "./ToggleTheme"
import { Package, AlertCircle, Github } from "lucide-react"
import GooglePreview from "./previews/GooglePreview"
import TwitterPreview from "./previews/TwitterPreview"
import FacebookPreview from "./previews/FacebookPreview"
import WhatsAppPreview from "./previews/WhatsAppPreview"
import LinkedInPreview from "./previews/LinkedInPreview"
import TelegramPreview from "./previews/TelegramPreview"
import DuckDuckGoPreview from "./previews/DuckDuckGoPreview"
import DiscordPreview from "./previews/DiscordPreview"
import MastodonPreview from "./previews/MastodonPreview"
import { UrlInputForm } from "./UrlInputForm"

const queryClient = new QueryClient()

// Removes scheme and trailing slashes from the URL
const cleanUrl = (inputUrl: string) => {
  if (!inputUrl) return ""
  return inputUrl.replace(/^(https?:\/\/)/i, '').replace(/\/$/, '')
}

// Adds https:// to the cleaned URL
const normalizeUrl = (inputUrl: string) => {
  const cleaned = cleanUrl(inputUrl)
  return cleaned ? `https://${cleaned}` : ""
}

function LinkPreviewerContent({ initialUrl = "" }: { initialUrl?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState(cleanUrl(initialUrl))

  const {
    data: metadata,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["metadata", normalizeUrl(url)],
    queryFn: () => fetchMetadata(normalizeUrl(url)),
    enabled: !!url,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUrl(input)

    if (!input.trim()) {
      // Remove the "url" parameter from the query string if the input is empty
      const params = new URLSearchParams(searchParams.toString())
      params.delete("url")
      router.replace(`?${params.toString()}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = url.trim()
    if (input) {
      const normalized = normalizeUrl(input)
      setUrl(normalized) // Keep the normalized URL in the input field
      router.push(`?url=${encodeURIComponent(cleanUrl(input))}`) // Add the cleaned URL to the query string
      refetch()
    }
  }

  useEffect(() => {
    const urlParam = searchParams.get("url")
    if (urlParam) {
      const normalized = normalizeUrl(urlParam)
      setUrl(normalized) // Set the normalized URL in the input field
      refetch()
    }
  }, [searchParams, refetch])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex">
            <div className="flex items-center gap-2">
              <ToggleTheme />
              <a
                href="https://github.com/oyeolamilekan/metacheck"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
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
          <UrlInputForm
            url={url}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

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
              <MastodonPreview metadata={metadata} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          Made by <a
            href="https://mvp.appstate.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline"
          >
            Appstate
          </a>
        </footer>
      </div>
    </div>
  )
}

export default function LinkPreviewerV2({ initialUrl }: { initialUrl?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LinkPreviewerContent initialUrl={initialUrl} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

