import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next"
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
      </body>
    </html>
  );
}
