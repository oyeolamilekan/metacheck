"use server"

import { load } from "cheerio"

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
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

    return metadata
  } catch (error) {
    console.error("Error fetching metadata:", error)
    throw new Error("Failed to fetch website metadata. Please check the URL and try again.")
  }
}

