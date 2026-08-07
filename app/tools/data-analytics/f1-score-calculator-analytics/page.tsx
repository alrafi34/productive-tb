import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { f1ScoreCalculatorAnalyticsConfig as config } from "@/tools/f1-score-calculator-analytics/config";
import { categories } from "@/config/tools";

const F1ScoreCalculatorAnalyticsUI = dynamic(
  () => import("@/tools/f1-score-calculator-analytics/ui")
);

const canonicalUrl = `${siteConfig.url}/tools/data-analytics/f1-score-calculator-analytics`;

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=F1+Score+Calculator", width: 1200, height: 630, alt: "F1 Score Calculator" }],
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    images: ["/og?title=F1+Score+Calculator"],
    card: "summary_large_image",
    title: config.seo.openGraph.title,
    description: config.seo.openGraph.description,
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function F1ScoreCalculatorAnalyticsPage() {
  const catObj = categories.find((c) => c.slug === "data-analytics");

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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.seo.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use the ${config.name}`,
    step: config.seo.howToSteps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <ToolLayout
        title={config.name}
        description={config.description}
        icon={config.icon}
        category={catObj}
      >
        <F1ScoreCalculatorAnalyticsUI />
      </ToolLayout>
    </>
  );
}
