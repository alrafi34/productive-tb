/**
 * Gives tools their own static route, app/tools/<category>/<slug>/page.tsx,
 * instead of the shared dynamic route (#3, #14, #71).
 *
 * The dynamic route bundles every tool's config and ships far more
 * JavaScript; a dedicated route loads only its own tool. Each new file is
 * app/tools/land/hectare-to-acre-converter/page.tsx with the names swapped,
 * so head tags, canonical URL, robots and JSON-LD stay exactly as they are
 * (og:image keeps the dynamic route's %20 spaces).
 * The tool also stays in the dynamic route's TOOLS list, where the static
 * route simply takes precedence for its URL.
 *
 * Usage: node scripts/add-static-routes.mjs <slug> [<slug> …]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const TEMPLATE = read('app/tools/land/hectare-to-acre-converter/page.tsx');

const registry = new Map();
for (const line of read('config/tools.ts').split('\n')) {
  const m = /^\s*\{ slug: "([^"]+)".*category: "([^"]+)"/.exec(line);
  if (m) registry.set(m[1], m[2]);
}

// tools/<dir>/config.ts → slug and its first exported const
const bySlug = new Map();
for (const dir of fs.readdirSync(path.join(ROOT, 'tools'))) {
  const file = path.join('tools', dir, 'config.ts');
  if (!fs.existsSync(path.join(ROOT, file))) continue;
  const src = read(file);
  const slug = /slug:\s*["']([^"']+)["']/.exec(src)?.[1];
  const exp = /export const ([A-Za-z0-9_]+)/.exec(src)?.[1];
  const category = /category:\s*["']([^"']+)["']/.exec(src)?.[1];
  if (slug && exp) bySlug.set(slug, { dir, exp, category });
}

const pascal = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
// Component names must be valid identifiers: "3d-volume-…" → "Tool3dVolume…"
const componentName = (s) => (/^[0-9]/.test(s) ? 'Tool' : '') + pascal(s);

let written = 0;
for (const slug of process.argv.slice(2)) {
  const tool = bySlug.get(slug);
  // Unregistered tools (ALLOW_UNREGISTERED in check-tools.mjs) live under their config's category
  const category = registry.get(slug) ?? tool?.category;
  if (!category || !tool) throw new Error(`${slug}: no tools/<dir>/config.ts or no category`);
  const out = path.join('app/tools', category, slug, 'page.tsx');
  if (fs.existsSync(path.join(ROOT, out))) {
    console.log(`skip ${out} (exists)`);
    continue;
  }
  const name = componentName(slug);
  const page = TEMPLATE
    .replace('import { hectareToAcreConverterConfig as config } from "@/tools/hectare-to-acre-converter/config";',
      `import { ${tool.exp} as config } from "@/tools/${tool.dir}/config";`)
    .replace('const HectareToAcreConverterUI = dynamic(() => import("@/tools/hectare-to-acre-converter/ui"));',
      `const ${name}UI = dynamic(() => import("@/tools/${tool.dir}/ui"));`)
    .replace('`${siteConfig.url}/tools/land/hectare-to-acre-converter`', `\`\${siteConfig.url}/tools/${category}/${slug}\``)
    .replace('toolRobots("hectare-to-acre-converter")', `toolRobots("${slug}")`)
    .replace('export default function HectareToAcreConverterPage()', `export default function ${name}Page()`)
    .replace('categories.find((c) => c.slug === "land")', `categories.find((c) => c.slug === "${category}")`)
    .replace('slug="hectare-to-acre-converter"', `slug="${slug}"`)
    .replace('<HectareToAcreConverterUI />', `<${name}UI />`)
    // These tools were served by the dynamic route, whose og:image URL encodes
    // spaces as %20; keep it so the image URLs already shared do not change.
    .replace('// `+` rather than %20 so these URLs stay identical to what is already indexed.\n', '// %20 spaces, as the dynamic route that served this tool before emitted.\n')
    .replace('encodeURIComponent(toolName).replace(/%20/g, "+")', 'encodeURIComponent(toolName)')
    // The dynamic route fell back to the plain config fields for tools with
    // no `seo` block or `name`; keep those fallbacks.
    .replace('const toolName = (config as any).name;', `const toolName = (config as any).name ?? (config as any).title ?? "${slug}";`)
    .replace('?? seo.og?.title ?? seo.title;', '?? seo.og?.title ?? seo.title ?? toolName;')
    .replace('?? seo.og?.description ?? seo.description;', '?? seo.og?.description ?? seo.description ?? toolDescription;')
    .replace('  title: seo.title,', '  title: seo.title ?? toolName,')
    .replace('  description: seo.description,', '  description: seo.description ?? toolDescription,')
    .replace('  keywords: seo.keywords,', '  keywords: seo.keywords ?? (config as any).keywords,');
  if (/hectare|HectareToAcre|replace\(\/%20/.test(page)) throw new Error(`${slug}: template substitution incomplete`);
  if ((page.match(/\?\? toolName|\?\? toolDescription|\?\? \(config as any\)\.(title|keywords)/g) ?? []).length !== 6) throw new Error(`${slug}: config fallbacks not applied`);
  fs.mkdirSync(path.dirname(path.join(ROOT, out)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, out), page);
  written++;
}
console.log(`add-static-routes: ${written} route(s) written`);
