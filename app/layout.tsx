import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import { Partytown } from "@builder.io/partytown/react";
import "./globals.css";
import { siteConfig } from "@/config/site";
import NavigationProvider from "@/components/NavigationProvider";

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
  description: "Free online tools for writing, design, coding, and math. Word counter, image compressor, password generator, calculators & 100+ utilities. No sign-up needed.",
  keywords: ["free online tools", "word counter", "image compressor", "password generator", "BMI calculator", "JSON validator", "CSS gradient generator", "text case converter", "base64 encoder", "markdown previewer", "color palette generator", "QR code generator", "developer tools", "writing tools", "productivity tools"],

  authors: [{ name: "Productive Toolbox Team" }],
  creator: "Productive Toolbox",
  publisher: "Productive Toolbox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - 100+ Free Online Tools`,
    description: "Free online tools for writing, design, coding, and math. Word counter, image compressor, password generator, calculators & 100+ utilities. No sign-up needed.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Productive Toolbox" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - 100+ Free Online Tools`,
    description: "100+ free online tools for writing, design, coding & math. No sign-up needed.",
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
        <meta httpEquiv="origin-trial" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Partytown 
          debug={false} 
          forward={["dataLayer.push"]} 
          resolveUrl={(url) => {
            if (url.hostname === 'www.googletagmanager.com') {
              const proxyUrl = new URL('/gtm-proxy', location.origin);
              proxyUrl.searchParams.append('id', url.searchParams.get('id') || '');
              return proxyUrl.toString();
            }
            return url.toString();
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
        <Script
          src={`/gtm-proxy?id=${GA_MEASUREMENT_ID}`}
          type="text/partytown"
        />
        <Script id="google-analytics" type="text/partytown">
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
