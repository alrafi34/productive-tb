# Task: Reduce the dynamic tool route's payload

**Repo:** `/Users/rafipersonal/Desktop/ptb/productive-tb`
**Constraint: no calculator's behaviour, output, or UI may change. This is a module-graph refactor only.**

---

## Context

`app/tools/[tool]/[subtool]/page.tsx` is a single module that statically imports roughly 280 tool configs and creates roughly 280 `next/dynamic` wrappers:

```ts
import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
// ... ~280 of these

const WordCounterUI = dynamic(() => import("@/tools/word-counter/ui"));
// ... ~280 of these

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
  // ... ~280 entries
];
```

Every page served by this route pulls the entire graph. The previous build reported an 8.7 MB payload for this route.

The repo already contains the correct pattern. `app/tools/electrical/voltage-drop-calculator/page.tsx` is a dedicated route importing exactly one config and one UI:

```ts
import ToolLayout from "@/components/ToolLayout";
import VoltageDropCalculatorUI from "@/tools/voltage-drop-calculator/ui";
import { voltageDropCalculatorConfig } from "@/tools/voltage-drop-calculator/config";

export const metadata: Metadata = { /* built from config */ };

export default function VoltageDropCalculatorPage() {
  return (
    <ToolLayout title={...} description={...} icon={...}>
      <VoltageDropCalculatorUI />
    </ToolLayout>
  );
}
```

About 78 electrical tools already use this. `app/tools/architecture/` has only one such route, so the site's highest-click page — `parking-space-calculator`, 195 clicks in 28 days — is still served by the heavy dynamic route.

---

## Phase 0 — Establish a baseline (do this first, do not skip)

```bash
npm run build 2>&1 | tee /tmp/build-before.txt
```

Record from the build output:

- First Load JS for `/tools/[tool]/[subtool]`
- First Load JS for `/tools/electrical/voltage-drop-calculator` (the reference "good" route)
- Total route count and build time

Also capture the rendered HTML of the target pages so you can diff later:

```bash
mkdir -p /tmp/before
for p in architecture/parking-space-calculator architecture/shadow-length-calculator \
         architecture/escalation-cost-calculator land/decimal-land-calculator \
         land/plot-division-calculator; do
  curl -s "https://productivetoolbox.com/tools/$p" > "/tmp/before/$(basename $p).html"
done
```

Write the baseline numbers into this file under "Results" before continuing.

---

## Phase 1 — Dedicated routes for the top traffic pages

Low risk, immediate benefit. Do this phase completely and verify before starting Phase 2.

Create dedicated route files for these tools, following the `voltage-drop-calculator` pattern exactly. All are currently served by the dynamic route.

| Tool slug | Route path | Clicks (28d) |
|---|---|---|
| parking-space-calculator | `app/tools/architecture/parking-space-calculator/page.tsx` | 195 |
| plot-division-calculator | `app/tools/land/plot-division-calculator/page.tsx` | 181 |
| shadow-length-calculator | `app/tools/architecture/shadow-length-calculator/page.tsx` | 146 |
| escalation-cost-calculator | `app/tools/architecture/escalation-cost-calculator/page.tsx` | 139 |
| decimal-land-calculator | `app/tools/land/decimal-land-calculator/page.tsx` | 100 |
| subdivision-cost-calculator | `app/tools/land/subdivision-cost-calculator/page.tsx` | 65 |
| katha-land-calculator | `app/tools/land/katha-land-calculator/page.tsx` | 19 |
| land-price-calculator | `app/tools/land/land-price-calculator/page.tsx` | 34 |
| door-area-calculator | `app/tools/architecture/door-area-calculator/page.tsx` | 35 |
| map-scale-calculator | `app/tools/land/map-scale-calculator/page.tsx` | 13 |

Confirm each slug's category against `config/tools` before creating the path. If a slug's category there differs from the table, trust `config/tools` — the canonical URL is derived from it, and a mismatch would create a duplicate URL.

### Requirements for each new route file

Match the metadata and schema output of the dynamic route exactly. The recent SEO work must survive:

- `alternates.canonical` — identical URL to what the dynamic route produced
- `openGraph.images` and `twitter.images` — per-tool `/og?title=...`, not the site default
- `BreadcrumbList`, `SoftwareApplication`, and where the config provides them, `FAQPage` and `HowTo` JSON-LD
- The `category` prop passed to `ToolLayout` so the breadcrumb keeps all three levels

Check where `BreadcrumbList` is currently emitted — the dynamic route, or `ToolLayout`. If it lives in the dynamic route, the new files need it too. Note that the existing electrical routes do not pass `category` to `ToolLayout`; if that is producing a two-level breadcrumb there, fix it in the same pass, but only if it is a one-line change.

### Do not

- Modify any file under `tools/<slug>/` — no config, ui, logic, types, or seo-content changes
- Remove these tools from the `TOOLS` array in the dynamic route yet. Next.js prefers the more specific static route, so the dynamic route becomes an unused fallback for them. Leaving the entries in place means Phase 1 is reversible by deleting the new files and nothing else.

### Verify Phase 1

```bash
npm run build 2>&1 | tee /tmp/build-after-p1.txt
```

Then for each of the 10 URLs, diff the rendered head against the baseline:

```bash
diff <(grep -oE '<(title|meta|link)[^>]*>' /tmp/before/parking-space-calculator.html) \
     <(curl -s http://localhost:3000/tools/architecture/parking-space-calculator | grep -oE '<(title|meta|link)[^>]*>')
```

The only acceptable differences are none. If canonical, og:image, or title changed, the new route is wrong.

Also confirm each page still contains `Related Tools` and `BreadcrumbList`, and manually exercise two calculators in the browser to confirm inputs and results are unchanged.

---

## Phase 2 — Make the dynamic route lazy

This fixes the class of problem rather than ten instances of it. Attempt only after Phase 1 is verified and committed separately.

Replace the ~280 static config imports with a slug-keyed map of dynamic import functions:

```ts
const TOOL_LOADERS: Record<string, {
  config: () => Promise<any>;
  Component: React.ComponentType;
}> = {
  "word-counter": {
    config: () => import("@/tools/word-counter/config").then(m => m.toolConfig),
    Component: dynamic(() => import("@/tools/word-counter/ui")),
  },
  // ...
};
```

Then `generateMetadata` and the page component `await` only the entry they need.

Two complications to handle:

1. **Export names are inconsistent.** Some configs export `toolConfig`, others export a named const such as `removeDuplicateLinesConfig` or `voltageDropCalculatorConfig`. The `.then(m => ...)` accessor must match each one. Getting this wrong fails at runtime, not build time, so verify every entry resolves.

2. **`generateStaticParams` must keep working.** It currently reads from `config/tools`, which is a light module — that part is fine. Do not make it depend on the loader map.

This file is very large and hand-editing 280 entries invites mistakes. Consider generating the map with a script that reads `tools/*/config.ts`, detects the export name, and writes the file. Commit the generator alongside the output.

### Verify Phase 2

Same build comparison, plus: load one tool from each of the categories (`writing`, `image`, `design`, `security`, `math`, `developer`, `land`, `architecture`, `electrical`, `data-analytics`, `marketing`, `computer-science`) and confirm each renders and calculates correctly. A wrong export accessor will 500 only on the affected tool.

If Phase 2 proves unstable, revert it and keep Phase 1. Phase 1 alone protects the pages that carry the traffic.

---

## Out of scope

Do not touch these — they are separate tasks with separate risk profiles:

- The 9 pages that do not server-render their body (`useSearchParams` without Suspense, `if (!mounted)` guards)
- The 6 tools with no `RelatedTools` call: `bionic-reading-converter`, `find-and-replace`, `remove-duplicate-lines`, `table-to-markdown`, `text-diff-checker`, `whitespace-remover`
- `lib/tools-registry.ts`, which is now dead code
- Title length editing
- Any change to calculator logic, formulas, or default values

---

## Acceptance criteria

- [ ] Build exits 0 with no route conflicts
- [ ] First Load JS for `/tools/[tool]/[subtool]` is measurably lower than baseline
- [ ] The 10 Phase 1 pages have their own routes and are pre-rendered
- [ ] For all 10: title, canonical, og:image, twitter:image, `BreadcrumbList`, and `Related Tools` are byte-identical to the pre-change output
- [ ] Two calculators manually exercised, results unchanged
- [ ] Phase 1 and Phase 2 are separate commits

## Results

Fill in after each phase.

| Metric | Before | After P1 | After P2 |
|---|---|---|---|
| First Load JS — dynamic route | | | |
| First Load JS — parking-space-calculator | | | |
| Build time | | | |
| Total routes | | | |

Note whether figures are gzipped or uncompressed, and whether they come from the local build or the deployed site.
