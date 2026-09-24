import { MetadataRoute } from 'next';
import { tools, categories } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { TOOL_CONTENT_DATES, PAGE_CONTENT_DATES } from '@/config/content-dates';
import { NOINDEX_TOOLS } from '@/config/noindex';

/* lastModified comes from config/content-dates.ts — the date each page's
   content actually changed, derived from git by scripts/content-dates.mjs.
   It used to be the build time for every URL, so each deploy told Google
   that all pages changed at once and the signal was discounted (#17).
   A URL with no known date gets no lastModified rather than a made-up one. */

/* ISO dates compare correctly as strings. */
const latest = (dates: (string | undefined)[]) =>
  dates.reduce<string | undefined>((max, d) => (d && (!max || d > max) ? d : max), undefined);

const toolDate = (slug: string) => TOOL_CONTENT_DATES[slug];

/* Hub pages change when any tool they list changes, or when their own file does. */
const categoryDate = (slug: string) =>
  latest(tools.filter((t) => t.category === slug).map((t) => toolDate(t.slug)));
const catalogueDate = latest(tools.map((t) => toolDate(t.slug)));

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // ── Static core pages ────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latest([PAGE_CONTENT_DATES['/'], catalogueDate]),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: latest([PAGE_CONTENT_DATES['/tools'], catalogueDate]),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: PAGE_CONTENT_DATES['/about'],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: PAGE_CONTENT_DATES['/contact'],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: PAGE_CONTENT_DATES['/privacy'],
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: PAGE_CONTENT_DATES['/terms'],
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Category pages ───────────────────────────────────────────────
  // Marked weekly — new tools get added to categories regularly.
  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: categoryDate(cat.slug),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ── Individual tool pages ────────────────────────────────────────
  // Noindexed tools are left out: listing a URL while telling Google not to
  // index it is a contradictory signal.
  const toolUrls: MetadataRoute.Sitemap = tools.filter((tool) => !NOINDEX_TOOLS.has(tool.slug)).map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: toolDate(tool.slug),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryUrls, ...toolUrls];
}
