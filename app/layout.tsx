import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import NavigationProvider from "@/components/NavigationProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Derived from the registry so the count never drifts out of date.
   Safe to import here: layout is server-only, so the catalogue is
   never shipped to the browser. */
const TOTAL_TOOLS = tools.length;

const SITE_DESCRIPTION = `${TOTAL_TOOLS} free online calculators and tools for electrical, structural, mechanical, land and data work — plus everyday text, image and developer utilities. Runs in your browser. No sign-up needed.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${TOTAL_TOOLS} Free Engineering & Technical Calculators`,
    template: `%s | ${siteConfig.name}`
  },
  description: SITE_DESCRIPTION,
  keywords: ["free online calculators", "engineering calculators", "electrical calculator", "voltage drop calculator", "wire size calculator", "beam load calculator", "structural calculator", "construction calculator", "mechanical engineering calculator", "torque calculator", "land area calculator", "data analytics calculator", "statistics calculator", "developer tools", "word counter", "free online tools"],

  authors: [{ name: "Productive Toolbox Team" }],
  creator: "Productive Toolbox",
  publisher: "Productive Toolbox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${TOTAL_TOOLS} Free Engineering & Technical Calculators`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og?title=Productive+Toolbox", width: 1200, height: 630, alt: "Productive Toolbox" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${TOTAL_TOOLS} Free Engineering & Technical Calculators`,
    description: `${TOTAL_TOOLS} free engineering, construction and data calculators. Runs in your browser. No sign-up needed.`,
    images: ["/og?title=Productive+Toolbox"]
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon-180x180.png',
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="origin-trial" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
        <Analytics />
        <SpeedInsights />
        {/* GA4 — loads after page is interactive, no render blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6FDH4F2C7M"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6FDH4F2C7M');
          `}
        </Script>
      </body>
    </html>
  );
}
