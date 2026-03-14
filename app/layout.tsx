import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";

const GA_MEASUREMENT_ID = "G-MW1V4JYC2D";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 100+ Free Online Tools`,
    template: `%s | ${siteConfig.name}`
  },
  description: "Free online tools for productivity. Word counters, text formatters, image compressors, QR generators, and 100+ more utilities. No sign-up required.",
  keywords: ["free online tools", "productivity tools", "word counter", "text tools", "image tools", "writing tools", "online utilities", "free web tools", "text formatter", "case converter"],
  authors: [{ name: "Productive Toolbox Team" }],
  creator: "Productive Toolbox",
  publisher: "Productive Toolbox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - 100+ Free Online Tools`,
    description: "Free online tools for productivity. Word counters, text formatters, image compressors, and more. No sign-up required.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Productive Toolbox" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - 100+ Free Online Tools`,
    description: "Free online tools for productivity. No sign-up required.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: "Free online tools for productivity",
  sameAs: [
    "https://twitter.com/productivetoolbox",
    "https://github.com/productivetoolbox"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="48x48" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
