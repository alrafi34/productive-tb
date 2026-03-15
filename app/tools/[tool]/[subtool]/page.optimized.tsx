import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { tools, categories } from "@/config/tools";
import { getToolBySlug } from "@/lib/tools-registry";

// REMOVED: export const dynamic = "force-dynamic";
// ADDED: Enable static generation for better performance
export const dynamicParams = true;

// Generate static params for top 20 most popular tools
export async function generateStaticParams() {
  const popularTools = [
    'word-counter', 'image-compressor', 'password-generator', 'bmi-calculator',
    'json-validator', 'css-gradient-generator', 'base64-encoder-decoder', 
    'markdown-previewer', 'color-palette-generator', 'hex-to-rgb-converter',
    'percentage-calculator', 'age-calculator', 'lorem-ipsum-generator',
    'text-reverser', 'image-resizer', 'qr-code-generator', 'url-encoder-decoder',
    'timestamp-unix-converter', 'random-number-generator', 'discount-calculator'
  ];

  return popularTools.flatMap(slug => {
    const tool = tools.find(t => t.slug === slug);
    return tool ? [{ tool: tool.category, subtool: slug }] : [];
  });
}

// Dynamic import mapping - loads components on-demand
const TOOL_COMPONENTS: Record<string, any> = {
  'word-counter': dynamic(() => import('@/tools/word-counter/ui'), { ssr: false }),
  'sentence-case-converter': dynamic(() => import('@/tools/sentence-case-converter/ui'), { ssr: false }),
  'paragraph-formatter': dynamic(() => import('@/tools/paragraph-formatter/ui'), { ssr: false }),
  'keyword-density-checker': dynamic(() => import('@/tools/keyword-density-checker/ui'), { ssr: false }),
  'text-reverser': dynamic(() => import('@/tools/text-reverser/ui'), { ssr: false }),
  'word-frequency-counter': dynamic(() => import('@/tools/word-frequency-counter/ui'), { ssr: false }),
  'image-compressor': dynamic(() => import('@/tools/image-compressor/ui'), { ssr: false }),
  'image-resizer': dynamic(() => import('@/tools/image-resizer/ui'), { ssr: false }),
  'lorem-ipsum-generator': dynamic(() => import('@/tools/lorem-ipsum-generator/ui'), { ssr: false }),
  'markdown-previewer': dynamic(() => import('@/tools/markdown-previewer/ui'), { ssr: false }),
  'text-to-clipboard': dynamic(() => import('@/tools/text-to-clipboard/ui'), { ssr: false }),
  'remove-duplicate-lines': dynamic(() => import('@/tools/remove-duplicate-lines/ui'), { ssr: false }),
  'find-and-replace': dynamic(() => import('@/tools/find-and-replace/ui'), { ssr: false }),
  'text-diff-checker': dynamic(() => import('@/tools/text-diff-checker/ui'), { ssr: false }),
  'bionic-reading-converter': dynamic(() => import('@/tools/bionic-reading-converter/ui'), { ssr: false }),
  'whitespace-remover': dynamic(() => import('@/tools/whitespace-remover/ui'), { ssr: false }),
  'table-to-markdown': dynamic(() => import('@/tools/table-to-markdown/ui'), { ssr: false }),
  'anagram-finder': dynamic(() => import('@/tools/anagram-finder/ui'), { ssr: false }),
  'palindrome-checker': dynamic(() => import('@/tools/palindrome-checker/ui'), { ssr: false }),
  'text-to-slug-converter': dynamic(() => import('@/tools/text-to-slug-converter/ui'), { ssr: false }),
  'random-name-picker': dynamic(() => import('@/tools/random-name-picker/ui'), { ssr: false }),
  'zalgo-text-generator': dynamic(() => import('@/tools/zalgo-text-generator/ui'), { ssr: false }),
  'nato-phonetic-converter': dynamic(() => import('@/tools/nato-phonetic-converter/ui'), { ssr: false }),
  'leetspeak-converter': dynamic(() => import('@/tools/leetspeak-converter/ui'), { ssr: false }),
  'upside-down-text-generator': dynamic(() => import('@/tools/upside-down-text-generator/ui'), { ssr: false }),
  'list-prefix-suffix': dynamic(() => import('@/tools/list-prefix-suffix/ui'), { ssr: false }),
  'morse-code-translator': dynamic(() => import('@/tools/morse-code-translator/ui'), { ssr: false }),
  'base64-image-encoder': dynamic(() => import('@/tools/base64-image-encoder/ui'), { ssr: false }),
  'favicon-generator': dynamic(() => import('@/tools/favicon-generator/ui'), { ssr: false }),
  'image-to-grayscale': dynamic(() => import('@/tools/image-to-grayscale/ui'), { ssr: false }),
  'exif-remover': dynamic(() => import('@/tools/exif-remover/ui'), { ssr: false }),
  'dithering-filter': dynamic(() => import('@/tools/dithering-filter/ui'), { ssr: false }),
  'duotone-filter': dynamic(() => import('@/tools/duotone-filter/ui'), { ssr: false }),
  'hex-to-rgb-converter': dynamic(() => import('@/tools/hex-to-rgb-converter/ui'), { ssr: false }),
  'color-palette-generator': dynamic(() => import('@/tools/color-palette-generator/ui'), { ssr: false }),
  'css-gradient-generator': dynamic(() => import('@/tools/css-gradient-generator/ui'), { ssr: false }),
  'css-box-shadow-generator': dynamic(() => import('@/tools/css-box-shadow-generator/ui'), { ssr: false }),
  'color-format-converter': dynamic(() => import('@/tools/color-format-converter/ui'), { ssr: false }),
  'css-glassmorphism-generator': dynamic(() => import('@/tools/css-glassmorphism-generator/ui'), { ssr: false }),
  'svg-path-visualizer': dynamic(() => import('@/tools/svg-path-visualizer/ui'), { ssr: false }),
  'contrast-checker': dynamic(() => import('@/tools/contrast-checker/ui'), { ssr: false }),
  'neumorphism-generator': dynamic(() => import('@/tools/neumorphism-generator/ui'), { ssr: false }),
  'hsl-color-slider': dynamic(() => import('@/tools/hsl-color-slider/ui'), { ssr: false }),
  'css-filter-tester': dynamic(() => import('@/tools/css-filter-tester/ui'), { ssr: false }),
  'css-animation-previewer': dynamic(() => import('@/tools/css-animation-previewer/ui'), { ssr: false }),
  'gradient-text-generator': dynamic(() => import('@/tools/gradient-text-generator/ui'), { ssr: false }),
  'color-palette-contrast-grid': dynamic(() => import('@/tools/color-palette-contrast-grid/ui'), { ssr: false }),
  'color-blindness-simulator': dynamic(() => import('@/tools/color-blindness-simulator/ui'), { ssr: false }),
  'random-hex-color-generator': dynamic(() => import('@/tools/random-hex-color-generator/ui'), { ssr: false }),
  'css-mesh-gradient-generator': dynamic(() => import('@/tools/css-mesh-gradient-generator/ui'), { ssr: false }),
  'css-cursor-style-previewer': dynamic(() => import('@/tools/css-cursor-style-previewer/ui'), { ssr: false }),
  'css-clamp-generator': dynamic(() => import('@/tools/css-clamp-generator/ui'), { ssr: false }),
  'hex-to-rgba-converter': dynamic(() => import('@/tools/hex-to-rgba-converter/ui'), { ssr: false }),
  'password-generator': dynamic(() => import('@/tools/password-generator/ui'), { ssr: false }),
  'wifi-password-generator': dynamic(() => import('@/tools/wifi-password-generator/ui'), { ssr: false }),
  'text-encrypt-decrypt': dynamic(() => import('@/tools/text-encrypt-decrypt/ui'), { ssr: false }),
  'username-generator': dynamic(() => import('@/tools/username-generator/ui'), { ssr: false }),
  'hash-generator': dynamic(() => import('@/tools/hash-generator/ui'), { ssr: false }),
  'password-strength-meter': dynamic(() => import('@/tools/password-strength-meter/ui'), { ssr: false }),
  'aspect-ratio-calculator': dynamic(() => import('@/tools/aspect-ratio-calculator/ui'), { ssr: false }),
  'golden-ratio-calculator': dynamic(() => import('@/tools/golden-ratio-calculator/ui'), { ssr: false }),
  'css-border-radius-blob': dynamic(() => import('@/tools/css-blob-generator/ui'), { ssr: false }),
  'color-palette-extractor': dynamic(() => import('@/tools/color-palette-extractor/ui'), { ssr: false }),
  'custom-scrollbar-styler': dynamic(() => import('@/tools/custom-scrollbar-styler/ui'), { ssr: false }),
  'css-keyframe-animator': dynamic(() => import('@/tools/css-keyframe-animator/ui'), { ssr: false }),
  'pattern-noise-generator': dynamic(() => import('@/tools/pattern-noise-generator/ui'), { ssr: false }),
  'glassmorphism-layer-tester': dynamic(() => import('@/tools/glassmorphism-layer-tester/ui'), { ssr: false }),
  'aes-encryptor': dynamic(() => import('@/tools/aes-encryptor/ui'), { ssr: false }),
  'email-obfuscator': dynamic(() => import('@/tools/email-obfuscator/ui'), { ssr: false }),
  'file-hash-generator': dynamic(() => import('@/tools/file-hash-generator/ui'), { ssr: false }),
  'bcrypt-hash-verifier': dynamic(() => import('@/tools/bcrypt-hash-verifier/ui'), { ssr: false }),
  'steganography-tool': dynamic(() => import('@/tools/steganography-tool/ui'), { ssr: false }),
  'sri-generator': dynamic(() => import('@/tools/sri-generator/ui'), { ssr: false }),
  'ip-address-masker': dynamic(() => import('@/tools/ip-address-masker/ui'), { ssr: false }),
  'checksum-calculator': dynamic(() => import('@/tools/checksum-calculator/ui'), { ssr: false }),
  'discount-calculator': dynamic(() => import('@/tools/discount-calculator/ui'), { ssr: false }),
  'percentage-calculator': dynamic(() => import('@/tools/percentage-calculator/ui'), { ssr: false }),
  'age-calculator': dynamic(() => import('@/tools/age-calculator/ui'), { ssr: false }),
  'bmi-calculator': dynamic(() => import('@/tools/bmi-calculator/ui'), { ssr: false }),
  'timestamp-unix-converter': dynamic(() => import('@/tools/timestamp-unix-converter/ui'), { ssr: false }),
  'loan-emi-calculator': dynamic(() => import('@/tools/loan-emi-calculator/ui'), { ssr: false }),
  'random-number-generator': dynamic(() => import('@/tools/random-number-generator/ui'), { ssr: false }),
  'currency-format-previewer': dynamic(() => import('@/tools/currency-format-previewer/ui'), { ssr: false }),
  'timer-stopwatch': dynamic(() => import('@/tools/timer-stopwatch/ui'), { ssr: false }),
  'percentage-increase-decrease': dynamic(() => import('@/tools/percentage-increase-decrease-calculator/ui'), { ssr: false }),
  'json-validator': dynamic(() => import('@/tools/json-validator/ui'), { ssr: false }),
  'base64-encoder-decoder': dynamic(() => import('@/tools/base64-encoder-decoder/ui'), { ssr: false }),
  'regex-tester': dynamic(() => import('@/tools/regex-tester/ui'), { ssr: false }),
  'matrix-calculator': dynamic(() => import('@/tools/matrix-calculator/ui'), { ssr: false }),
  'xml-to-json': dynamic(() => import('@/tools/xml-to-json/ui'), { ssr: false }),
  'json-to-csv': dynamic(() => import('@/tools/json-to-csv/ui'), { ssr: false }),
  'flowchart-logic-mapper': dynamic(() => import('@/tools/flowchart-logic-mapper/ui'), { ssr: false }),
  'venn-diagram-maker': dynamic(() => import('@/tools/venn-diagram-maker/ui'), { ssr: false }),
  'heatmap-grid': dynamic(() => import('@/tools/heatmap-grid/ui'), { ssr: false }),
  'word-cloud-generator': dynamic(() => import('@/tools/word-cloud-generator/ui'), { ssr: false }),
  'mind-map-builder': dynamic(() => import('@/tools/mind-map-builder/ui'), { ssr: false }),
  'bar-graph-generator': dynamic(() => import('@/tools/bar-graph-generator/ui'), { ssr: false }),
  'pomodoro-timer': dynamic(() => import('@/tools/pomodoro-timer/ui'), { ssr: false }),
  'url-encoder-decoder': dynamic(() => import('@/tools/url-encoder-decoder/ui'), { ssr: false }),
  'pie-chart-maker': dynamic(() => import('@/tools/pie-chart-maker/ui'), { ssr: false }),
  'sql-formatter': dynamic(() => import('@/tools/sql-formatter/ui'), { ssr: false }),
  'jwt-debugger': dynamic(() => import('@/tools/jwt-debugger/ui'), { ssr: false }),
  'binary-hex-decimal-converter': dynamic(() => import('@/tools/binary-hex-decimal-converter/ui'), { ssr: false }),
  'tip-calculator': dynamic(() => import('@/tools/tip-calculator/ui'), { ssr: false }),
  'standard-deviation-calculator': dynamic(() => import('@/tools/standard-deviation-calculator/ui'), { ssr: false }),
  'roman-numeral-converter': dynamic(() => import('@/tools/roman-numeral-converter/ui'), { ssr: false }),
  'fuel-cost-calculator': dynamic(() => import('@/tools/fuel-cost-calculator/ui'), { ssr: false }),
  'unit-ratio-calculator': dynamic(() => import('@/tools/unit-ratio-calculator/ui'), { ssr: false }),
  'date-difference-calculator': dynamic(() => import('@/tools/date-difference-calculator/ui'), { ssr: false }),
  'time-duration-calculator': dynamic(() => import('@/tools/time-duration-calculator/ui'), { ssr: false }),
  'temperature-conversion-scientific': dynamic(() => import('@/tools/temperature-conversion-scientific/ui'), { ssr: false }),
  'ohms-law-calculator': dynamic(() => import('@/tools/ohms-law-calculator/ui'), { ssr: false }),
  'centimeter-to-meter-converter': dynamic(() => import('@/tools/centimeter-to-meter-converter/ui'), { ssr: false }),
  'square-meter-to-square-foot-converter': dynamic(() => import('@/tools/square-meter-to-square-foot-converter/ui'), { ssr: false }),
  'meter-to-km-converter': dynamic(() => import('@/tools/meter-to-km-converter/ui'), { ssr: false }),
  'inch-to-cm-converter': dynamic(() => import('@/tools/inch-to-cm-converter/ui'), { ssr: false }),
  'average-calculator': dynamic(() => import('@/tools/average-calculator/ui'), { ssr: false }),
  'scientific-calculator': dynamic(() => import('@/tools/scientific-calculator/ui'), { ssr: false }),
  'fraction-calculator': dynamic(() => import('@/tools/fraction-calculator/ui'), { ssr: false }),
  'exponent-calculator': dynamic(() => import('@/tools/exponent-calculator/ui'), { ssr: false }),
  'square-root-calculator': dynamic(() => import('@/tools/square-root-calculator/ui'), { ssr: false }),
  'simple-interest-calculator': dynamic(() => import('@/tools/simple-interest-calculator/ui'), { ssr: false }),
  'compound-interest-calculator': dynamic(() => import('@/tools/compound-interest-calculator/ui'), { ssr: false }),
  'mortgage-calculator': dynamic(() => import('@/tools/mortgage-calculator/ui'), { ssr: false }),
  'investment-return-calculator': dynamic(() => import('@/tools/investment-return-calculator/ui'), { ssr: false }),
  'profit-margin-calculator': dynamic(() => import('@/tools/profit-margin-calculator/ui'), { ssr: false }),
  'gst-vat-calculator': dynamic(() => import('@/tools/gst-vat-calculator/ui'), { ssr: false }),
  'salary-calculator': dynamic(() => import('@/tools/salary-calculator/ui'), { ssr: false }),
  'bmr-calculator': dynamic(() => import('@/tools/bmr-calculator/ui'), { ssr: false }),
  'ideal-weight-calculator': dynamic(() => import('@/tools/ideal-weight-calculator/ui'), { ssr: false }),
  'body-fat-calculator': dynamic(() => import('@/tools/body-fat-calculator/ui'), { ssr: false }),
  'daily-calorie-calculator': dynamic(() => import('@/tools/daily-calorie-calculator/ui'), { ssr: false }),
  'power-consumption-calculator': dynamic(() => import('@/tools/power-consumption-calculator/ui'), { ssr: false }),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}): Promise<Metadata> {
  const { tool: category, subtool: slug } = await params;
  const config = getToolBySlug(slug);
  if (!config) return {};

  const seo = config.seo as any;
  const canonicalUrl = `${siteConfig.url}/tools/${category}/${slug}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      type: "website",
      url: canonicalUrl,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}) {
  const { tool: category, subtool: slug } = await params;
  const config = getToolBySlug(slug);
  const Component = TOOL_COMPONENTS[slug];
  
  if (!config || !Component) notFound();

  const canonicalUrl = `${siteConfig.url}/tools/${category}/${slug}`;
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

  const catObj = categories.find(c => c.slug === category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={config.name} description={config.description} icon={config.icon} category={catObj}>
        <Component />
      </ToolLayout>
    </>
  );
}
