import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { adFrequencyCalculatorConfig as config } from "@/tools/ad-frequency-calculator/config";
import { categories } from "@/config/tools";

const AdFrequencyCalculatorUI = dynamic(
  () => import("@/tools/ad-frequency-calculator/ui")
);

const canonicalUrl = `${siteConfig.url}/tools/marketing/ad-frequency-calculator`;

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Ad+Frequency+Calculator", width: 1200, height: 630, alt: "Ad Frequency Calculator" }],
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    images: ["/og?title=Ad+Frequency+Calculator"],
    card: "summary_large_image",
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function AdFrequencyCalculatorPage() {
  const catObj = categories.find((c) => c.slug === "marketing");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${config.name} Tool`,
    description: config.description,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout
        title={config.name}
        description={config.description}
        icon={config.icon}
        category={catObj}
      >
        <AdFrequencyCalculatorUI />
      </ToolLayout>
    </>
  );
}
