/**
 * Codemod: normalize dedicated tool routes to the reference shape.
 *
 * Reference: app/tools/architecture/parking-space-calculator/page.tsx
 *
 * Rewrites every app/tools/<category>/<slug>/page.tsx from a single template so
 * that all of them emit the same head tags and JSON-LD. Reads the category and
 * slug from the folder path, and keeps whatever config export name and UI
 * component name the file already used.
 *
 * Deliberately preserved, because these are indexed or user-visible:
 *   - seo.title / seo.description are read from the config, never regenerated
 *   - canonical + og:url are folder-derived, which matches what all 221 routes
 *     that already had a canonical were emitting
 *   - the og image keeps `+` space encoding so existing image URLs do not move
 *   - routes whose UI needs useSearchParams keep their <Suspense> boundary
 *   - robots is left unset so the layout's googleBot directives survive
 *
 * Usage: node scripts/normalize-tool-routes.mjs [--only <file-list.txt>] [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = '/Users/rafipersonal/Desktop/ptb/productive-tb';
process.chdir(ROOT);

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0
  ? new Set(fs.readFileSync(args[onlyIdx + 1], 'utf8').split('\n').filter(Boolean))
  : null;

// Routes that must keep a Suspense boundary: their UI calls useSearchParams,
// which cannot be statically rendered without one.
const NEEDS_SUSPENSE = new Set([
  'computer-science/download-time-calculator',
  'mechanical/acceleration-calculator',
  'mechanical/velocity-calculator',
]);

// The two re-export stubs get a real route file; the originals under tools/
// are left in place and simply become unused.
const STUBS = {
  'electrical/frequency-response-calculator': 'frequencyResponseCalculatorConfig',
  'electrical/voltage-regulation-calculator': 'voltageRegulationCalculatorConfig',
};

const pascal = (slug) =>
  slug.split('-').map((w) => (/^\d/.test(w) ? w : w[0].toUpperCase() + w.slice(1))).join('');

function extract(file, cat, slug) {
  const src = fs.readFileSync(file, 'utf8');
  const key = `${cat}/${slug}`;

  if (STUBS[key]) {
    return { cfg: STUBS[key], comp: `${pascal(slug)}UI`, suspense: NEEDS_SUSPENSE.has(key) };
  }

  const cfgMatch = src.match(/import\s*\{\s*([A-Za-z0-9_]+)(?:\s+as\s+[A-Za-z0-9_]+)?\s*\}\s*from\s*"@\/tools\/[^"]+\/config"/);
  if (!cfgMatch) throw new Error(`${file}: cannot find config import`);

  const compMatch =
    src.match(/import\s+([A-Za-z0-9_]+)\s+from\s+"@\/tools\/[^"]+\/ui"/) ||
    src.match(/const\s+([A-Za-z0-9_]+)\s*=\s*dynamic\(/);
  if (!compMatch) throw new Error(`${file}: cannot find UI component`);

  return { cfg: cfgMatch[1], comp: compMatch[1], suspense: NEEDS_SUSPENSE.has(key) };
}

const template = ({ cat, slug, cfg, comp, suspense }) => `import type { Metadata } from "next";
import dynamic from "next/dynamic";${suspense ? '\nimport { Suspense } from "react";' : ''}
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { categories } from "@/config/tools";
import { ${cfg} as config } from "@/tools/${slug}/config";

const ${comp} = dynamic(() => import("@/tools/${slug}/ui"));

const canonicalUrl = \`\${siteConfig.url}/tools/${cat}/${slug}\`;

const seo = (config as any).seo ?? {};
const toolName = (config as any).name;
const toolDescription = (config as any).description ?? "";
const ogTitle = seo.openGraph?.title ?? seo.og?.title ?? seo.title;
const ogDescription = seo.openGraph?.description ?? seo.og?.description ?? seo.description;
// \`+\` rather than %20 so these URLs stay identical to what is already indexed.
const ogImage = \`\${siteConfig.url}/og?title=\${encodeURIComponent(toolName).replace(/%20/g, "+")}\`;

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
  // No \`robots\` key on purpose. The root layout sets robots.googleBot with
  // max-image-preview:large and max-snippet:-1, and Next replaces the parent
  // robots object wholesale rather than merging — declaring a bare
  // { index, follow } here would silently drop those two directives.
};

export default function ${pascal(slug)}Page() {
  const catObj = categories.find((c) => c.slug === "${cat}");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: \`\${toolName} Tool\`,
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
    name: \`How to use \${toolName}\`,
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
${suspense ? `        <Suspense>\n          <${comp} />\n        </Suspense>` : `        <${comp} />`}
      </ToolLayout>
    </>
  );
}
`;

const files = execSync('find app/tools -mindepth 3 -name page.tsx -not -path "*[[]*"')
  .toString().trim().split('\n');

const catSlugs = new Set(
  [...fs.readFileSync('config/tools.ts', 'utf8')
    .slice(fs.readFileSync('config/tools.ts', 'utf8').indexOf('export const categories'))
    .matchAll(/\{\s*slug:\s*"([^"]+)"/g)].map((m) => m[1])
);

let written = 0, skipped = 0;
const errors = [];
for (const file of files) {
  const [, , cat, slug] = file.split('/');
  if (only && !only.has(file)) { skipped++; continue; }
  if (!catSlugs.has(cat)) { errors.push(`${file}: category "${cat}" not in categories[]`); continue; }
  try {
    const out = template({ cat, slug, ...extract(file, cat, slug) });
    if (!dry) fs.writeFileSync(file, out);
    written++;
  } catch (e) {
    errors.push(e.message);
  }
}
console.log(`${dry ? '[dry] ' : ''}rewritten: ${written}   skipped: ${skipped}   errors: ${errors.length}`);
errors.forEach((e) => console.log('  ERROR ' + e));
if (errors.length) process.exit(1);
