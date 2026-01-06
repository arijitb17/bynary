import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "BYNARY | Premium Web Design & Branding Agency",
    template: "%s | BYNARY",
  },
  description:
    "Transform your business with BYNARY's expert web design, branding, and digital marketing services. We create brands that stick through bold design, sharp strategy, and smart marketing that drives recognition, engagement, and long-term brand loyalty.",
  
  // Keywords
  keywords: [
    "web design agency",
    "branding agency",
    "digital marketing",
    "brand identity",
    "website development",
    "UI UX design",
    "creative agency",
    "brand strategy",
    "logo design",
    "web development",
    "responsive design",
    "modern web design",
    "startup branding",
    "business branding",
    "visual identity",
    "BYNARY",
  ],

  // Authors & Creator
  authors: [{ name: "BYNARY Team" }],
  creator: "BYNARY",
  publisher: "BYNARY",

  // Localization
  metadataBase: new URL("https://bynary.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bynary.in",
    siteName: "BYNARY",
    title: "BYNARY | Premium Web Design & Branding Agency",
    description:
      "Transform your business with bold design, sharp strategy, and smart marketing. We help founders grow through expert web design, branding, and digital marketing that drives real results.",
    images: [
      {
        url: "/logo.jpg", // Create a 1200x630 image for this
        width: 1200,
        height: 630,
        alt: "BYNARY - We Create Brands That Stick",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@bynary.in",
    creator: "@bynary.in",
    title: "BYNARY | Premium Web Design & Branding Agency",
    description:
      "Transform your business with bold design, sharp strategy, and smart marketing that drives recognition, engagement, and long-term brand loyalty.",
    images: ["/twitter-image.jpg"], // Create a 1200x600 image
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // Verification
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
  },

  // App Information
  applicationName: "BYNARY",
  category: "Business",

  // Additional
  other: {
    "msapplication-TileColor": "#1a1a1a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BYNARY",
              url: "https://bynary.in",
              logo: "https://bynary.in/logo.png",
              description:
                "Premium web design and branding agency helping businesses transform through bold design and strategic marketing.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/in/bynary-in-b9a33839b/",
                "https://www.instagram.com/bynary.in/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: "English",
              },
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BYNARY",
              url: "https://bynary.in",
              description:
                "Transform your business with expert web design, branding, and digital marketing services.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bynary.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "BYNARY",
              image: "https://bynary.in/logo.png",
              "@id": "https://bynary.in",
              url: "https://bynary.in",
              priceRange: "Low",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Barsapara, Bhalarumukh, GSRoad",
                addressLocality: "Guwahati",
                addressRegion: "Assam",
                postalCode: "781034",
                addressCountry: "IND",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 0.0, // Update with your coordinates
                longitude: 0.0, // Update with your coordinates
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                "https://www.linkedin.com/in/bynary-in-b9a33839b/",
                "https://www.instagram.com/bynary.in/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SmoothScroll>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}