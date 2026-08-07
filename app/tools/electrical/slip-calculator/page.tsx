import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { categories } from "@/config/tools";
import { slipCalculatorConfig as config } from "@/tools/slip-calculator/config";

const SlipCalculatorUI = dynamic(() => import("@/tools/slip-calculator/ui"));

const canonicalUrl = `${siteConfig.url}/tools/electrical/slip-calculator`;

const seo = (config as any).seo ?? {};
const toolName = (config as any).name;
const toolDescription = (config as any).description ?? "";
const ogTitle = seo.openGraph?.title ?? seo.og?.title ?? seo.title;
const ogDescription = seo.openGraph?.description ?? seo.og?.description ?? seo.description;
// `+` rather than %20 so these URLs stay identical to what is already indexed.
const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(toolName).replace(/%20/g, "+")}`;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
    images: [{ url: ogImage, width: 1200, height: 630, alt: toolName }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage],
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function SlipCalculatorPage() {
  const catObj = categories.find((c) => c.slug === "electrical");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${toolName} Tool`,
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const faqItems: { q: string; a: string }[] = seo.faq ?? [];
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;

  const howToSteps: { name: string; text: string }[] = seo.howToSteps ?? [];
  const howToSchema = howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${toolName}`,
    description: toolDescription,
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <ToolLayout
        title={toolName}
        description={toolDescription}
        icon={(config as any).icon}
        category={catObj}
      >
        <SlipCalculatorUI />
      </ToolLayout>
    </>
  );
}
