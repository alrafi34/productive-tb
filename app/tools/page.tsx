import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolsFilter from "@/components/ToolsFilter";
import { tools } from "@/config/tools";
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

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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

          {/* Client Component for Filtering */}
          <ToolsFilter />
        </div>
      </main>
      <Footer />
    </>
  );
}
