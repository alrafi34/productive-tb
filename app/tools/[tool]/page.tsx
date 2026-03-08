import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";

import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
import WordCounterUI from "@/tools/word-counter/ui";

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
];

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) return {};
  
  const { seo } = entry.config;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      type: "website",
      url: `${siteConfig.url}/tools/${slug}`,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ToolPage(
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) notFound();
  const { config, Component } = entry;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${config.name} Tool`,
    description: config.description,
    url: `${siteConfig.url}/tools/${slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={config.name} description={config.description} icon={config.icon}>
        <Component />
      </ToolLayout>
    </>
  );
}
