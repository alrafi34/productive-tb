# Productive Toolbox — SEO Code Audit

**Repo:** `/Users/rafipersonal/Desktop/ptb/productive-tb`
**Stack:** Next.js 16.1.6 (App Router), React 19.2.3, Tailwind 4, deployed on Vercel
**Data source:** Google Search Console, last 28 days (395,667 impressions / 1,905 clicks / 579 URLs)
**Audit date:** 2026-08-07
**Scope:** read-only. No files were modified.

---

## How to use this document

Each finding has a **Verified** or **Needs verification** tag. Verified findings were confirmed by reading the code and/or the live HTML. Findings tagged *Needs verification* are the most probable explanation but require one check before acting.

Tasks are ordered by expected impact per hour of work. Do them in order.

---

## Executive summary

The site has no crawling, indexing, canonical, or redirect problems. Those are all correctly configured. The problems are in **rendering, page weight, and prioritisation** — and they concentrate on exactly the pages that are performing best in search.

Five findings, in priority order:

| # | Finding | Severity | Effort |
|---|---|---|---|
| 1 | Related Tools section renders nothing on live pages | Critical | S |
| 2 | Entire ~280-tool registry ships in the client JS bundle | Critical | M |
| 3 | Only 27 tools are pre-rendered — and they are the wrong 27 | High | S |
| 4 | Title tag contains the brand name twice | Medium | S |
| 5 | `og:image` is dropped on every tool page | Medium | S |

Plus one lower-priority item (missing BreadcrumbList schema) and repo hygiene notes.

---

## Finding 1 — Related Tools renders nothing

**Severity: Critical · Effort: S · Status: Verified (absence) / Needs verification (cause)**

### Evidence

`components/RelatedTools.tsx` exists and is correctly written. It is imported and called at the bottom of tool UI files, e.g. `tools/decimal-land-calculator/ui.tsx`:

```tsx
<RelatedTools
  currentTool="decimal-land-calculator"
  tools={[
    "katha-land-calculator",
    "bigha-land-calculator",
    "acre-to-square-feet-converter",
    "hectare-to-acre-converter",
  ]}
/>
```

But the section does not appear in the served HTML. Confirmed with:

```bash
curl -s https://productivetoolbox.com/tools/land/decimal-land-calculator | grep -c "Related Tools"
# returns 0
```

The document ends at the "Who Uses This…" section, then goes straight to `</article></main><footer>`.

### Why it happens

`RelatedTools.tsx` resolves each slug through `getToolBySlug()` in `lib/tools-registry.ts`, then:

```tsx
if (relatedTools.length === 0) return null;
```

If the lookups fail, the component silently renders nothing. `getToolBySlug` reads from a `TOOLS_REGISTRY` object keyed by slug. The four slugs above are all real tools (they appear in the `TOOLS` array in `app/tools/[tool]/[subtool]/page.tsx`), so the most likely cause is that they are **missing as keys from `TOOLS_REGISTRY`**, or the key strings do not match the slugs exactly.

### Verify first

```bash
cd ~/Desktop/ptb/productive-tb
grep -c "':" lib/tools-registry.ts          # how many registry keys exist
grep -n "katha-land-calculator" lib/tools-registry.ts
grep -n "hectare-to-acre-converter" lib/tools-registry.ts
```

If those greps return nothing, the registry is incomplete — that is the bug.

### Fix

1. Make `TOOLS_REGISTRY` complete. Better: derive it from a single source of truth instead of maintaining a hand-written map alongside the `TOOLS` array in the page file and the `tools` array in `config/tools`. There are currently **three** parallel lists of tools that can drift apart.
2. Replace the silent `return null` with a dev-time warning so a missing slug is visible instead of invisible:

```tsx
if (process.env.NODE_ENV !== 'production' && relatedTools.length < slugs.length) {
  console.warn(`[RelatedTools] unresolved slugs on ${currentTool}:`,
    slugs.filter(s => !getToolBySlug(s)));
}
```

3. Add a build-time assertion that every slug passed to `RelatedTools` resolves. With 508 tools, this will break again otherwise.

### Why it matters

This is the direct explanation for **1.2 pages per session** (5,000 visitors → 6,000 pageviews). Every tool page is currently a dead end. It also means near-zero internal link equity flowing between tool pages, which contributes to the average position of 24+ across most categories.

---

## Finding 2 — The whole tool registry ships to the browser

**Severity: Critical · Effort: M · Status: Verified**

### Evidence

Chain of imports:

```
tools/<any-tool>/ui.tsx          ← "use client"
  └── components/RelatedTools.tsx
        ├── lib/tools-registry.ts   ← static-imports ~280 tool configs
        └── config/tools            ← full tool catalogue
```

`lib/tools-registry.ts` opens with roughly 280 lines of the form:

```ts
import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
```

Because `RelatedTools` is pulled into a `"use client"` module, **every one of those configs is bundled into the client JavaScript for every tool page**.

These configs are not small. `tools/decimal-land-calculator/config.ts` alone contains a 25-item keyword array, a full FAQ set, `howToSteps`, OG blocks and long-form SEO copy. Multiply by ~280.

Note the contrast with `app/layout.tsx`, which is explicitly aware of this risk:

```ts
/* Safe to import here: layout is server-only, so the catalogue is
   never shipped to the browser. */
```

That reasoning is correct for the layout, but the same catalogue leaks to the client through `RelatedTools`.

### Verify

```bash
npm run build
# then inspect .next/analyze or check First Load JS per route in the build output
```

Look at the First Load JS figure for `/tools/[tool]/[subtool]`. If it is well into the hundreds of KB, this is confirmed.

### Fix

Move `RelatedTools` out of the client boundary. It is a pure presentational component with no interactivity — it should never have been in a client bundle.

**Preferred approach:** render it from the server page instead of from inside each tool's UI.

- In `app/tools/[tool]/[subtool]/page.tsx`, render `<RelatedTools />` after `<Component />`, inside `ToolLayout`.
- Source the related slugs from the tool's own config (add a `related: string[]` field to each `toolConfig`) rather than hard-coding them in `ui.tsx`.
- Remove the `RelatedTools` import from all `ui.tsx` files.

This fixes Finding 1 and Finding 2 in the same change, and puts the links in server-rendered HTML where Googlebot sees them on the first pass.

**If that refactor is too large for now:** at minimum, stop importing the full registry. Pass the resolved related-tool objects down as props from the server component, so `RelatedTools` receives plain data and imports nothing.

### Why it matters

Page weight is a ranking input via Core Web Vitals, and a very large JS payload hurts INP and LCP on mobile — which is where most of this traffic is. This is a plausible contributor to the 343 pages (of 579) with zero clicks and average position 24+.

---

## Finding 3 — Pre-rendering is inverted

**Severity: High · Effort: S · Status: Verified**

### Evidence

`app/tools/[tool]/[subtool]/page.tsx`:

```ts
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const popularTools = [
    "word-counter", "image-compressor", "password-generator", "bmi-calculator",
    "json-validator", "css-gradient-generator", "base64-encoder-decoder",
    "markdown-previewer", "color-palette-generator", "hex-to-rgb-converter",
    "percentage-calculator", "age-calculator", "lorem-ipsum-generator",
    ...
  ];
```

27 tools are pre-rendered. Cross-referencing against actual GSC performance:

**Pre-rendered, but not performing:**

| Tool | Clicks (28d) | Avg position |
|---|---|---|
| bmi-calculator | 4 | 48.4 |
| word-counter | 4 | 29.1 |
| percentage-calculator | 3 | 17.5 |
| age-calculator | 0 | ~10.6 |
| discount-calculator | 14 | 12.3 |

**Not pre-rendered, but carrying the site:**

| Tool | Clicks (28d) | Avg position |
|---|---|---|
| parking-space-calculator | 195 | 7.8 |
| plot-division-calculator | 181 | 6.2 |
| shadow-length-calculator | 146 | 7.3 |
| escalation-cost-calculator | 139 | 9.1 |
| decimal-land-calculator | 100 | 7.0 |
| subdivision-cost-calculator | 65 | 7.5 |
| electric-motor-power-calculator | 64 | 10.8 |

The `popularTools` list appears to be a guess made before traffic data existed. It is now measurably backwards.

Every non-listed page is generated on demand. Because the route module statically imports ~280 configs and ~280 `dynamic()` UI components, a cold render is expensive — and Googlebot hitting a cold cache pays that cost in TTFB, on exactly the pages that rank.

### Fix

Replace the hard-coded list with the top ~60 pages by GSC clicks. At minimum include the seven above. Better: pre-render all tools that had any clicks in the last 28 days (236 of 579 pages had ≥1 click).

Consider raising `revalidate` from 3600 to something much longer (86400 or more). Tool pages are static content — hourly revalidation buys nothing and multiplies cold renders.

---

## Finding 4 — Brand name appears twice in every title

**Severity: Medium · Effort: S · Status: Verified**

### Evidence

`app/layout.tsx`:

```ts
title: {
  default: `${siteConfig.name} - ${TOTAL_TOOLS} Free Engineering & Technical Calculators`,
  template: `%s | ${siteConfig.name}`
}
```

`tools/decimal-land-calculator/config.ts`:

```ts
seo: {
  title: "Decimal Land Calculator — Free Shotok to Decimal Converter | Productive Toolbox",
```

`generateMetadata` passes `seo.title` straight through, so the template appends the brand a second time. Live output:

```
Decimal Land Calculator — Free Shotok to Decimal Converter | Productive Toolbox | Productive Toolbox
```

99 characters. Google truncates around 60, so the SERP shows roughly:

```
Decimal Land Calculator — Free Shotok to Decim…
```

The differentiating part of the title is cut off.

### Fix

Strip the suffix from the config files, not from the template — the template is correct and should stay.

```bash
# find every affected config
grep -rln "| Productive Toolbox\"" tools/*/config.ts | wc -l
```

Then remove ` | Productive Toolbox` from each `seo.title`. This is a mechanical find-and-replace across the `tools/` directory.

While doing this, audit title length. Target 50–60 characters **including** the ` | Productive Toolbox` suffix, which leaves ~38 characters for the tool-specific part.

---

## Finding 5 — `og:image` is dropped on tool pages

**Severity: Medium · Effort: S · Status: Verified**

### Evidence

`app/layout.tsx` defines `openGraph.images`. But `generateMetadata` in the tool route returns its own `openGraph` object **without** an `images` key:

```ts
openGraph: {
  title: ..., description: ..., type: "website",
  url: canonicalUrl, siteName: siteConfig.name,
},
```

Next.js replaces the parent `openGraph` object wholesale rather than deep-merging it, so the image is lost. Confirmed in the live HTML: the tool page emits `og:title`, `og:description`, `og:url`, `og:type` — and **no `og:image`**.

Separately, the live HTML shows site-level values for the Twitter tags:

```html
<meta name="twitter:title" content="Productive Toolbox - 508 Free Engineering & Technical Calculators"/>
<meta name="twitter:image" content="https://productivetoolbox.com/og?title=Productive+Toolbox"/>
```

even though `generateMetadata` sets `twitter.title` per tool. Worth investigating during the fix — check whether the built output differs from what the source implies.

### Fix

Add per-tool images to both blocks in `generateMetadata`. The `/og` route already accepts a title parameter:

```ts
const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(title)}`;

openGraph: {
  ...,
  images: [{ url: ogImage, width: 1200, height: 630, alt: toolName }],
},
twitter: {
  card: "summary_large_image",
  title: ..., description: ...,
  images: [ogImage],
},
```

### Why it matters

Every share of a tool page on WhatsApp, Facebook, LinkedIn or Slack currently shows a generic site card instead of the tool. For a utility site, peer sharing is a meaningful acquisition channel and a natural backlink source.

---

## Finding 6 — Missing BreadcrumbList schema

**Severity: Low–Medium · Effort: S · Status: Verified**

The tool page emits three JSON-LD blocks: `SoftwareApplication`, `FAQPage` (when `seo.faq` exists), and `HowTo` (when `seo.howToSteps` exists). Good coverage.

`ToolLayout.tsx` renders a visual breadcrumb, but there is no corresponding `BreadcrumbList` JSON-LD. Adding it changes how the URL line renders in search results:

```
productivetoolbox.com › tools › land › decimal-land-calculator
```

becomes

```
Productive Toolbox › Land & Surveying › Decimal Land Calculator
```

Add it in `page.tsx` alongside the existing schema blocks, using the same `catObj` that is already resolved for `ToolLayout`.

Note on expectations: Google has heavily restricted FAQ rich results, so the existing `FAQPage` schema will rarely produce a visible rich result. `BreadcrumbList` still renders reliably.

---

## Correction to an earlier hypothesis

Before reading the code, I flagged two `BAILOUT_TO_CLIENT_SIDE_RENDERING` markers in the served HTML as a possible cause of the missing Related Tools section.

That was wrong. Those markers sit at the very end of `<body>` and correspond to `<Analytics />` and `<SpeedInsights />` from Vercel in `app/layout.tsx`. They are expected behaviour and have no SEO impact. The real cause of the missing section is Finding 1.

The tool UI components do server-render correctly — the long-form SEO sections from `seo-content.tsx` appear in the HTML as expected.

---

## Repo hygiene (no SEO impact, but worth resolving)

Several parallel "optimized" variants exist and it is not obvious which are live:

- `app/layout.tsx` vs `app/layout.optimized.tsx`
- `next.config.ts` vs `next.config.optimized.ts`
- `components/NavigationProvider.tsx` vs `.optimized.tsx` vs `.optimized.v2.tsx`

The live config is `next.config.ts` and contains only `optimizePackageImports: ["lucide-react"]`. `next.config.optimized.ts` was not reviewed — if it contains image/bundle settings that were never merged, that is worth checking as part of Finding 2.

Five status documents sit in the repo root (`FINAL_STATUS.md`, `IMPLEMENTATION_COMPLETE.md`, `IMPLEMENTATION_INSTRUCTIONS.md`, `PERFORMANCE_OPTIMIZATION_GUIDE.md`, `TOOL_INTEGRATION_SUMMARY.md`). Not reviewed in this audit; some may already describe intended fixes for the findings above.

There are also three separate sources of truth for the tool list:

1. `TOOLS` array in `app/tools/[tool]/[subtool]/page.tsx` (config + component pairs)
2. `TOOLS_REGISTRY` object in `lib/tools-registry.ts` (slug → config)
3. `tools` array in `config/tools` (slug → category)

Finding 1 is very likely a direct consequence of these drifting apart. Consolidating them into one generated source would prevent the class of bug rather than the instance.

---

## Suggested order of work

**Day 1**
1. Verify and fix Finding 1 (Related Tools). Confirm with `curl … | grep "Related Tools"`.
2. Fix Finding 4 (title suffix) — mechanical, site-wide.

**Day 2–3**
3. Fix Finding 2 (move `RelatedTools` to the server boundary). Measure First Load JS before and after.
4. Fix Finding 3 (`generateStaticParams` from real GSC data; raise `revalidate`).

**Day 4**
5. Fix Finding 5 (`og:image`) and Finding 6 (BreadcrumbList).

**After deploy**
- Re-submit the sitemap in Search Console.
- Request indexing for the seven top-performing tool URLs listed in Finding 3.
- Re-export GSC data in 28 days and compare pages-per-session and average position for the `architecture`, `land` and `electrical` categories.

---

## What this audit did not cover

- `config/tools` and `config/site` contents
- The `new-tools/` directory
- Individual `seo-content.tsx` files (content quality, template repetition across 508 pages)
- Category and homepage routes
- `app/sitemap.ts` internals (the output was verified as correct externally: 0 www URLs)
- Actual bundle sizes — Finding 2 is verified structurally but not yet measured

Content quality across the 508 tool pages is a separate concern and is addressed in the strategy discussion, not here.
