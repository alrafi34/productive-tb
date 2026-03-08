import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "All Tools - Browse 100+ Free Online Utilities",
  description: "Browse all 100+ free online tools organized by category. Word counters, text formatters, image tools, calculators, QR generators, and more. No sign-up required.",
  openGraph: {
    title: "All Tools - Productive Toolbox",
    description: "Browse 100+ free online tools for productivity",
    url: `${siteConfig.url}/tools`
  }
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Tools",
  description: "Browse all free online productivity tools",
  url: `${siteConfig.url}/tools`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: `${siteConfig.url}/tools/${tool.slug}`,
        description: tool.description,
        applicationCategory: "UtilityApplication"
      }
    }))
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${siteConfig.url}/tools`
    }
  ]
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">{siteConfig.name}</Link>
            <span>/</span>
            <span className="text-gray-600">All Tools</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              All Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse 100+ free online tools for productivity. No sign-up required.
            </p>
          </header>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link href="/tools" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold">
              All
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/tools?category=${cat.slug}`}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary text-sm font-semibold transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {siteConfig.name} · <Link href="/" className="hover:text-primary transition-colors">Home</Link>
      </footer>
    </>
  );
}
