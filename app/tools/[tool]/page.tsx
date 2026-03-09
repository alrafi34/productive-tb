import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";

import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
import WordCounterUI from "@/tools/word-counter/ui";
import { toolConfig as sentenceCaseConfig } from "@/tools/sentence-case-converter/config";
import SentenceCaseConverterUI from "@/tools/sentence-case-converter/ui";
import { toolConfig as paragraphFormatterConfig } from "@/tools/paragraph-formatter/config";
import ParagraphFormatterUI from "@/tools/paragraph-formatter/ui";
import { toolConfig as keywordDensityConfig } from "@/tools/keyword-density-checker/config";
import KeywordDensityCheckerUI from "@/tools/keyword-density-checker/ui";
import { toolConfig as textReverserConfig } from "@/tools/text-reverser/config";
import TextReverserUI from "@/tools/text-reverser/ui";
import { toolConfig as wordFrequencyConfig } from "@/tools/word-frequency-counter/config";
import WordFrequencyCounterUI from "@/tools/word-frequency-counter/ui";
import { toolConfig as imageCompressorConfig } from "@/tools/image-compressor/config";
import ImageCompressorUI from "@/tools/image-compressor/ui";
import { toolConfig as imageResizerConfig } from "@/tools/image-resizer/config";
import ImageResizerUI from "@/tools/image-resizer/ui";
import { toolConfig as loremIpsumConfig } from "@/tools/lorem-ipsum-generator/config";
import LoremIpsumGeneratorUI from "@/tools/lorem-ipsum-generator/ui";
import { toolConfig as markdownPreviewerConfig } from "@/tools/markdown-previewer/config";
import MarkdownPreviewerUI from "@/tools/markdown-previewer/ui";
import { toolConfig as textToClipboardConfig } from "@/tools/text-to-clipboard/config";
import TextToClipboardUI from "@/tools/text-to-clipboard/ui";
import { removeDuplicateLinesConfig } from "@/tools/remove-duplicate-lines/config";
import RemoveDuplicateLinesUI from "@/tools/remove-duplicate-lines/ui";
import { findAndReplaceConfig } from "@/tools/find-and-replace/config";
import FindAndReplaceUI from "@/tools/find-and-replace/ui";
import { textDiffCheckerConfig } from "@/tools/text-diff-checker/config";
import TextDiffCheckerUI from "@/tools/text-diff-checker/ui";
import { bionicReadingConverterConfig } from "@/tools/bionic-reading-converter/config";
import BionicReadingConverterUI from "@/tools/bionic-reading-converter/ui";
import { whitespaceRemoverConfig } from "@/tools/whitespace-remover/config";
import WhitespaceRemoverUI from "@/tools/whitespace-remover/ui";

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
  { config: sentenceCaseConfig, Component: SentenceCaseConverterUI },
  { config: paragraphFormatterConfig, Component: ParagraphFormatterUI },
  { config: keywordDensityConfig, Component: KeywordDensityCheckerUI },
  { config: textReverserConfig, Component: TextReverserUI },
  { config: wordFrequencyConfig, Component: WordFrequencyCounterUI },
  { config: imageCompressorConfig, Component: ImageCompressorUI },
  { config: imageResizerConfig, Component: ImageResizerUI },
  { config: loremIpsumConfig, Component: LoremIpsumGeneratorUI },
  { config: markdownPreviewerConfig, Component: MarkdownPreviewerUI },
  { config: textToClipboardConfig, Component: TextToClipboardUI },
  { config: removeDuplicateLinesConfig, Component: RemoveDuplicateLinesUI },
  { config: findAndReplaceConfig, Component: FindAndReplaceUI },
  { config: textDiffCheckerConfig, Component: TextDiffCheckerUI },
  { config: bionicReadingConverterConfig, Component: BionicReadingConverterUI },
  { config: whitespaceRemoverConfig, Component: WhitespaceRemoverUI },
];

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) return {};
  
  const seo = entry.config.seo as any;
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
