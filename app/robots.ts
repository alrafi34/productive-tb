import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/* SEO-tool and data-mining crawlers. They bring no visitors and play no part
   in Google or Bing rankings, but each crawls every page and uses up the
   hosting quota. Search engines and AI answer engines stay allowed. */
const NON_SEARCH_CRAWLERS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'serpstatbot',
  'Barkrowler',
  'PetalBot',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      { userAgent: NON_SEARCH_CRAWLERS, disallow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
