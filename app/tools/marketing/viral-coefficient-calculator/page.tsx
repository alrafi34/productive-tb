import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { viralCoefficientCalculatorConfig as config } from "@/tools/viral-coefficient-calculator/config";
import { categories } from "@/config/tools";

const ViralCoefficientCalculatorUI = dynamic(
  () => import("@/tools/viral-coefficient-calculator/ui")
);

const canonicalUrl = `${siteConfig.url}/tools/marketing/viral-coefficient-calculator`;

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Viral+Coefficient+Calculator", width: 1200, height: 630, alt: "Viral Coefficient Calculator" }],
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    images: ["/og?title=Viral+Coefficient+Calculator"],
    card: "summary_large_image",
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function ViralCoefficientCalculatorPage() {
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
        <ViralCoefficientCalculatorUI />
      </ToolLayout>
    </>
  );
}
