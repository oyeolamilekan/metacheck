# MetaCheck

MetaCheck is a web application that allows you to preview how your website links will appear on various social media platforms and search engines. It helps you optimize your website's metadata (Open Graph tags, Twitter Cards, meta title, meta description, favicon) to ensure your links are engaging and informative when shared.

## Features

- **Multi-Platform Previews:** See how your link will look on:
    - Google
    - Twitter
    - Facebook
    - WhatsApp
    - LinkedIn
    - Telegram
    - DuckDuckGo
    - Discord
    - Mastodon
- **Metadata Analysis:** Fetches and displays key metadata from your URL, including:
    - Title
    - Description
    - Image
    - Favicon
- **URL Normalization:** Automatically cleans and normalizes input URLs (adds `https://`, removes trailing slashes).
- **Real-time Fetching:** Retrieves metadata on demand when you submit a URL.
- **Dark/Light Mode:** Supports system preference for theme and allows manual toggling.
- **Responsive Design:** Adapts to different screen sizes for a seamless experience on desktop and mobile.
- **Error Handling:** Provides clear error messages if metadata fetching fails.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (for UI components)
- **State Management:** React Query (for fetching and caching metadata)
- **Metadata Fetching:** Cheerio (for parsing HTML on the server-side)
- **Analytics:** PostHog
- **Icons:** Lucide React

## Project Structure

The project is organized within the `app` directory, following Next.js App Router conventions:

```
/app
├── actions/
│   └── fetchMetadata.ts       # Server action to fetch URL metadata
├── components/
│   ├── previews/              # Individual preview components for each platform
│   │   ├── DiscordPreview.tsx
│   │   ├── DuckDuckGoPreview.tsx
│   │   ├── FacebookPreview.tsx
│   │   ├── GooglePreview.tsx
│   │   ├── LinkedInPreview.tsx
│   │   ├── MastodonPreview.tsx
│   │   ├── TelegramPreview.tsx
│   │   ├── TwitterPreview.tsx
│   │   └── WhatsAppPreview.tsx
│   ├── LinkPreviewerV2.tsx    # Main component for the link previewer UI and logic
│   └── ToggleTheme.tsx        # Component for switching between light and dark themes
├── fonts/                     # Local font files (Geist Sans, Geist Mono)
├── site/
│   └── [domain]/
│       └── page.tsx           # Dynamic route for site-specific previews (potential future feature)
├── types/
│   └── metadata.ts            # TypeScript types for metadata
├── favicon.ico                # Application favicon
├── globals.css                # Global CSS styles
├── layout.tsx                 # Root layout component
├── page.tsx                   # Main entry page for the application
└── providers.tsx              # Client-side providers (PostHog)

/public
└── seo-image.png              # Image used for SEO and social sharing of MetaCheck itself
```

## Key Components and Logic

- **`app/page.tsx`:** The main entry point of the application, rendering the `LinkPreviewerV2` component.
- **`app/components/LinkPreviewerV2.tsx`:**
    - Manages the URL input state.
    - Handles form submission and triggers metadata fetching using React Query.
    - Displays loading states, error messages, and the various platform preview components.
    - Implements URL normalization.
    - Provides the main UI structure, including header, input form, and footer.
- **`app/actions/fetchMetadata.ts`:**
    - A server action responsible for fetching the HTML content of the provided URL.
    - Uses `cheerio` to parse the HTML and extract relevant metadata (OG tags, Twitter cards, title, description, image, favicon).
    - Includes error handling and basic user-agent spoofing to improve fetch success rates.
    - Integrates with PostHog for analytics on fetch attempts, successes, and failures.
- **Preview Components (`app/components/previews/*.tsx`):**
    - Each component takes the fetched `metadata` as a prop.
    - Renders a visual representation of how a link would appear on that specific platform, using the metadata.
- **`app/layout.tsx`:**
    - Sets up global HTML structure, including language and fonts.
    - Defines global metadata for the MetaCheck application itself (for SEO and social sharing).
    - Includes Vercel Analytics.
- **`app/providers.tsx`:**
    - Wraps the application with client-side providers, specifically for PostHog analytics, ensuring page views are tracked correctly.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:oyeolamilekan/metacheck.git
    cd metacheck
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your PostHog API key and host if you want to use analytics:
    ```env
    NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
    NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
    ```
    If you don't have PostHog keys, the application will still run, but analytics events will not be sent.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

1.  The user enters a URL into the input field on the `LinkPreviewerV2` component.
2.  On submission, the `handleSubmit` function normalizes the URL and calls `refetch` from React Query.
3.  React Query triggers the `fetchMetadata` server action, passing the normalized URL.
4.  The `fetchMetadata` action:
    a.  Makes a `fetch` request to the target URL with a specific User-Agent header to mimic a browser.
    b.  If the request is successful, it parses the HTML response using `cheerio`.
    c.  It extracts metadata by looking for common meta tags (Open Graph, Twitter, standard meta tags).
    d.  It attempts to find a favicon URL.
    e.  It ensures image URLs are absolute.
    f.  Returns the extracted metadata object.
5.  If `fetchMetadata` is successful, React Query updates the `metadata` state in `LinkPreviewerV2`.
6.  The `LinkPreviewerV2` component re-renders, and if `metadata` is available, it passes this data to each of the preview components (e.g., `GooglePreview`, `TwitterPreview`).
7.  Each preview component then displays the link information styled according to its respective platform.
8.  If `fetchMetadata` encounters an error (e.g., URL is unreachable, no metadata found), an error message is displayed to the user.

## Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by [Appstate](https://mvp.appstate.co/)
