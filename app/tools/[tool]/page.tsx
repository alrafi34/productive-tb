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
import { tableToMarkdownConfig } from "@/tools/table-to-markdown/config";
import TableToMarkdownUI from "@/tools/table-to-markdown/ui";
import { anagramFinderConfig } from "@/tools/anagram-finder/config";
import AnagramFinderUI from "@/tools/anagram-finder/ui";
import { palindromeCheckerConfig } from "@/tools/palindrome-checker/config";
import PalindromeCheckerUI from "@/tools/palindrome-checker/ui";
import { textToSlugConverterConfig } from "@/tools/text-to-slug-converter/config";
import TextToSlugConverterUI from "@/tools/text-to-slug-converter/ui";
import { randomNamePickerConfig } from "@/tools/random-name-picker/config";
import RandomNamePickerUI from "@/tools/random-name-picker/ui";
import { zalgoTextGeneratorConfig } from "@/tools/zalgo-text-generator/config";
import ZalgoTextGeneratorUI from "@/tools/zalgo-text-generator/ui";
import { natoPhoneticConverterConfig } from "@/tools/nato-phonetic-converter/config";
import NATOPhoneticConverterUI from "@/tools/nato-phonetic-converter/ui";
import { leetspeakConverterConfig } from "@/tools/leetspeak-converter/config";
import LeetspeakConverterUI from "@/tools/leetspeak-converter/ui";
import { toolConfig as upsideDownTextGeneratorConfig } from "@/tools/upside-down-text-generator/config";
import UpsideDownTextGeneratorUI from "@/tools/upside-down-text-generator/ui";
import { toolConfig as listPrefixSuffixConfig } from "@/tools/list-prefix-suffix/config";
import ListPrefixSuffixUI from "@/tools/list-prefix-suffix/ui";
import { toolConfig as morseCodeTranslatorConfig } from "@/tools/morse-code-translator/config";
import MorseCodeTranslatorUI from "@/tools/morse-code-translator/ui";
import { toolConfig as base64ImageEncoderConfig } from "@/tools/base64-image-encoder/config";
import Base64ImageEncoderUI from "@/tools/base64-image-encoder/ui";
import { toolConfig as faviconGeneratorConfig } from "@/tools/favicon-generator/config";
import FaviconGeneratorUI from "@/tools/favicon-generator/ui";
import { toolConfig as imageToGrayscaleConfig } from "@/tools/image-to-grayscale/config";
import ImageToGrayscaleUI from "@/tools/image-to-grayscale/ui";
import { toolConfig as exifRemoverConfig } from "@/tools/exif-remover/config";
import ExifRemoverUI from "@/tools/exif-remover/ui";
import { toolConfig as ditheringFilterConfig } from "@/tools/dithering-filter/config";
import DitheringFilterUI from "@/tools/dithering-filter/ui";
import { toolConfig as duotoneFilterConfig } from "@/tools/duotone-filter/config";
import DuotoneFilterUI from "@/tools/duotone-filter/ui";
import { toolConfig as hexToRgbConverterConfig } from "@/tools/hex-to-rgb-converter/config";
import HexToRgbConverterUI from "@/tools/hex-to-rgb-converter/ui";
import { toolConfig as colorPaletteGeneratorConfig } from "@/tools/color-palette-generator/config";
import ColorPaletteGeneratorUI from "@/tools/color-palette-generator/ui";
import { toolConfig as cssGradientGeneratorConfig } from "@/tools/css-gradient-generator/config";
import CSSGradientGeneratorUI from "@/tools/css-gradient-generator/ui";
import { toolConfig as cssBoxShadowGeneratorConfig } from "@/tools/css-box-shadow-generator/config";
import CSSBoxShadowGeneratorUI from "@/tools/css-box-shadow-generator/ui";
import { toolConfig as colorFormatConverterConfig } from "@/tools/color-format-converter/config";
import ColorFormatConverterUI from "@/tools/color-format-converter/ui";

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
  { config: tableToMarkdownConfig, Component: TableToMarkdownUI },
  { config: anagramFinderConfig, Component: AnagramFinderUI },
  { config: palindromeCheckerConfig, Component: PalindromeCheckerUI },
  { config: textToSlugConverterConfig, Component: TextToSlugConverterUI },
  { config: randomNamePickerConfig, Component: RandomNamePickerUI },
  { config: zalgoTextGeneratorConfig, Component: ZalgoTextGeneratorUI },
  { config: natoPhoneticConverterConfig, Component: NATOPhoneticConverterUI },
  { config: leetspeakConverterConfig, Component: LeetspeakConverterUI },
  { config: upsideDownTextGeneratorConfig, Component: UpsideDownTextGeneratorUI },
  { config: listPrefixSuffixConfig, Component: ListPrefixSuffixUI },
  { config: morseCodeTranslatorConfig, Component: MorseCodeTranslatorUI },
  { config: base64ImageEncoderConfig, Component: Base64ImageEncoderUI },
  { config: faviconGeneratorConfig, Component: FaviconGeneratorUI },
  { config: imageToGrayscaleConfig, Component: ImageToGrayscaleUI },
  { config: exifRemoverConfig, Component: ExifRemoverUI },
  { config: ditheringFilterConfig, Component: DitheringFilterUI },
  { config: duotoneFilterConfig, Component: DuotoneFilterUI },
  { config: hexToRgbConverterConfig, Component: HexToRgbConverterUI },
  { config: colorPaletteGeneratorConfig, Component: ColorPaletteGeneratorUI },
  { config: cssGradientGeneratorConfig, Component: CSSGradientGeneratorUI },
  { config: cssBoxShadowGeneratorConfig, Component: CSSBoxShadowGeneratorUI },
  { config: colorFormatConverterConfig, Component: ColorFormatConverterUI },
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
