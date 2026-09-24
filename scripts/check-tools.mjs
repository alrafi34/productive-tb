/**
 * Fails the build when the tool catalogue drifts out of sync:
 *
 *   1. a tools/<dir> whose config slug is missing from config/tools.ts
 *      (built but invisible to sitemap, search and navigation — see #7);
 *   2. a config/tools.ts entry with no tools/<dir> behind it;
 *   3. a config/tools.ts entry that no route serves at /tools/<category>/<slug>
 *      (listed in the sitemap but 404);
 *   4. a config/tools.ts entry with no date in config/content-dates.ts
 *      (its sitemap URL would have no <lastmod> — see #17).
 *
 * Folder names are not always the slug (css-blob-generator serves
 * css-border-radius-blob), so everything is keyed on the slug in each
 * tool's config.ts.
 *
 * Usage: node scripts/check-tools.mjs   (also runs before `pnpm build`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* Built and live, but deliberately kept out of the registry until the
   catalogue triage in #22 decides keep / consolidate / remove. */
const ALLOW_UNREGISTERED = new Set([
  'tip-calculator',
  'roman-numeral-converter',
  'profit-margin-calculator',
  'roi-calculator-marketing',
  'f1-score-calculator',
  'binary-to-decimal-calculator',
  'decimal-to-binary-calculator',
]);

// ── config/tools.ts — active (uncommented) entries only
const registry = new Map();
for (const line of read('config/tools.ts').split('\n')) {
  if (!/^\s*\{ slug: "/.test(line)) continue;
  const slug = line.match(/slug: "([^"]+)"/)[1];
  const category = line.match(/category: "([^"]+)"/)?.[1];
  if (category) registry.set(slug, category); // category rows have no `category:` key
}

// ── tools/<dir> → the slug its config declares
const folderBySlug = new Map();
const problems = [];
for (const dir of fs.readdirSync(path.join(ROOT, 'tools'))) {
  const cfg = path.join('tools', dir, 'config.ts');
  if (!fs.existsSync(path.join(ROOT, cfg))) continue;
  const slug = read(cfg).match(/slug:\s*["']([^"']+)["']/)?.[1];
  if (!slug) problems.push(`tools/${dir}: config.ts declares no slug`);
  else folderBySlug.set(slug, dir);
}

// ── what the dynamic route serves (by the slug of each imported config)
const dynamicRoute = read('app/tools/[tool]/[subtool]/page.tsx');
const dynamicSlugs = new Set();
for (const [, dir] of dynamicRoute.matchAll(/from "@\/tools\/([^"]+)\/config"/g)) {
  for (const [slug, d] of folderBySlug) if (d === dir) dynamicSlugs.add(slug);
}
const hasStaticRoute = (category, slug) =>
  fs.existsSync(path.join(ROOT, 'app/tools', category, slug, 'page.tsx'));

for (const [slug, dir] of folderBySlug) {
  if (!registry.has(slug) && !ALLOW_UNREGISTERED.has(slug)) {
    problems.push(`tools/${dir} (slug "${slug}") is not in config/tools.ts`);
  }
}
for (const [slug, category] of registry) {
  if (!folderBySlug.has(slug)) problems.push(`config/tools.ts "${slug}" has no tools/ folder`);
  else if (!hasStaticRoute(category, slug) && !dynamicSlugs.has(slug)) {
    problems.push(`config/tools.ts "${slug}" is not served at /tools/${category}/${slug}`);
  }
}
const dated = new Set(
  [...read('config/content-dates.ts').matchAll(/^\s*"([^"]+)": "\d{4}-\d{2}-\d{2}",$/gm)].map((m) => m[1])
);
for (const slug of registry.keys()) {
  if (!dated.has(slug)) {
    problems.push(`config/tools.ts "${slug}" has no date in config/content-dates.ts — run \`node scripts/content-dates.mjs\` and commit`);
  }
}
for (const slug of ALLOW_UNREGISTERED) {
  if (registry.has(slug)) problems.push(`"${slug}" is registered now — remove it from ALLOW_UNREGISTERED`);
}

if (problems.length) {
  console.error(`check-tools: ${problems.length} problem(s)\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log(`check-tools: ${registry.size} registered tools, all backed by a folder and a route.`);
