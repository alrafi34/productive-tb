import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { backlinkRatioCalculatorConfig as config } from "@/tools/backlink-ratio-calculator/config";
import { categories } from "@/config/tools";

const BacklinkRatioCalculatorUI = dynamic(
  () => import("@/tools/backlink-ratio-calculator/ui")
);

const canonicalUrl = `${siteConfig.url}/tools/marketing/backlink-ratio-calculator`;

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function BacklinkRatioCalculatorPage() {
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
        <BacklinkRatioCalculatorUI />
      </ToolLayout>
    </>
  );
}
