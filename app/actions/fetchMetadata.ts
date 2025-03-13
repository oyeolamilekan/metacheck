"use server"

import { load } from "cheerio"
import { PostHog } from 'posthog-node'

// Initialize PostHog only in production
const posthog = process.env.NODE_ENV === 'production' 
  ? new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      { host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
    )
  : null

  console.log(process.env.NODE_ENV)

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://www.google.com/',
        'Cache-Control': 'max-age=0',
        'DNT': '1'
      },
    })

    posthog?.capture({
      distinctId: 'server',
      event: 'link_preview_fetch_attempted',
      properties: { url }
    })

    if (!response.ok) {
      posthog?.capture({
        distinctId: 'server',
        event: 'link_preview_failed',
        properties: { url, error: response.status }
      })
      throw new Error(`Failed to fetch the website. Status: ${response.status}`)
    }

    const html = await response.text()
    const $ = load(html)

    const metadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        "",
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image: $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || "",
      url: url,
      favicon:
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        new URL("/favicon.ico", url).toString(),
    }

    // Ensure image URLs are absolute
    if (metadata.image && !metadata.image.startsWith("http")) {
      metadata.image = new URL(metadata.image, url).toString()
    }

    posthog?.capture({
      distinctId: 'server',
      event: 'link_preview_success',
      properties: { url, domain: new URL(url).hostname }
    })

    return metadata
  } catch (error) {
    posthog?.capture({
      distinctId: 'server',
      event: 'link_preview_failed',
      properties: { url, error: error }
    })
    console.error("Error fetching metadata:", error)
    throw new Error("Failed to fetch website metadata. Please check the URL and try again.")
  }
}

