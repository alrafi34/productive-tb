import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { toolRobots } from "@/lib/indexing";
import { categories } from "@/config/tools";
import { toolConfig as config } from "@/tools/paragraph-formatter/config";

const ParagraphFormatterUI = dynamic(() => import("@/tools/paragraph-formatter/ui"));

const canonicalUrl = `${siteConfig.url}/tools/writing/paragraph-formatter`;

const seo = (config as any).seo ?? {};
const toolName = (config as any).name ?? (config as any).title ?? "paragraph-formatter";
const toolDescription = (config as any).description ?? "";
const toolIcon = (config as any).icon;
const title = seo.title ?? toolName;
const description = seo.description ?? toolDescription;
const ogTitle = seo.openGraph?.title ?? seo.og?.title ?? title;
const ogDescription = seo.openGraph?.description ?? seo.og?.description ?? description;
// encodeURIComponent only — the dynamic route this page was migrated off emitted
// %20 here, and these OG URLs are already indexed. Do not switch to "+".
const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(toolName)}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: seo.keywords ?? (config as any).keywords ?? [],
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
  ...toolRobots("paragraph-formatter"),
  // `robots` is only set by toolRobots() above, for tools in config/noindex.ts.
  // Otherwise it is left unset on purpose: the root layout sets robots.googleBot with
  // max-image-preview:large and max-snippet:-1, and Next replaces the parent
  // robots object wholesale rather than merging — declaring a bare
  // { index, follow } here would silently drop those two directives.
};

export default function ParagraphFormatterPage() {
  const catObj = categories.find((c) => c.slug === "writing");

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
        icon={toolIcon}
        category={catObj}
      >
        <ParagraphFormatterUI />
      </ToolLayout>
    </>
  );
}
