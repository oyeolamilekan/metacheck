import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MetaCheck – Easily preview your website’s OG image, meta tags, favicon, and more.",
  description: "Ensure your website links display perfectly on social media and messaging apps with MetaCheck. Analyze and preview your OG image, meta tags, favicon, and more for free. Optimize your link previews for better engagement and click-through rates.",
  keywords: [
    "link preview tool",
    "meta tag analyzer",
    "open graph checker",
    "website meta preview",
    "SEO metadata checker",
    "social media link preview",
    "favicon checker",
    "meta description preview",
    "OG image checker",
    "Twitter card validator",
    "website preview tool",
    "Facebook link debugger",
    "website SEO checker",
    "structured data testing tool",
    "free meta tag checker"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
