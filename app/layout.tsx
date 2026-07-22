import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/interactive/CursorGlow";
import { JsonLd } from "@/components/seo/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — ${site.shortTitle}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  keywords: [
    "AI infrastructure",
    "agent observability",
    "developer tooling",
    "code intelligence",
    "Rust",
    "Go",
    "TypeScript",
    "software engineer portfolio",
  ],
  openGraph: {
    type: "website",
    url: site.siteUrl,
    title: `${site.name} — ${site.shortTitle}`,
    description: site.description,
    siteName: `${site.name}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.shortTitle}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} grain antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-copper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-obsidian"
        >
          Skip to content
        </a>
        <JsonLd />
        <CursorGlow />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
