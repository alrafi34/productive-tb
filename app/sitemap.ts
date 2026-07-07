import { MetadataRoute } from 'next';
import { tools, categories } from '@/config/tools';
import { siteConfig } from '@/config/site';

// Build time is used as a stable base for lastModified.
// Static pages like homepage and category pages are marked as "today"
// to encourage Google to re-crawl them frequently.
// Tool pages use the build date — update this when tool content is updated.
const BUILD_DATE = new Date();

// Approximate date a tool's content was last meaningfully updated.
// If a tool has no individual timestamp, falls back to BUILD_DATE.
// Add entries here whenever you expand a tool's seo-content.tsx.
const TOOL_UPDATED_DATES: Record<string, Date> = {
  // Tier 1 tools — manually expanded content
  // 'word-counter': new Date('2026-07-01'),
  // 'bmi-calculator': new Date('2026-07-01'),
  // Add more as you expand content
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // ── Static core pages ────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Category pages ───────────────────────────────────────────────
  // Marked weekly — new tools get added to categories regularly.
  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ── Individual tool pages ────────────────────────────────────────
  // Uses per-tool date from TOOL_UPDATED_DATES if available,
  // otherwise falls back to BUILD_DATE.
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: TOOL_UPDATED_DATES[tool.slug] ?? BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryUrls, ...toolUrls];
}
