import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import Footer from "@/components/Footer";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";
import SearchSection from "@/components/LazySearchSection";
import TestimonialsSection from "@/components/LazyTestimonialsSection";

export const metadata: Metadata = {
  title: "Productive Toolbox - 100+ Free Online Tools for Productivity",
  description: "Discover 100+ free online tools including word counters, text formatters, image compressors, QR code generators, and more. No sign-up required, 100% free.",
  openGraph: {
    title: "Productive Toolbox - 100+ Free Online Tools",
    description: "Free online tools for productivity. Word counters, text formatters, image tools, and more.",
    url: siteConfig.url,
    images: [{ url: "/og-home.png", width: 1200, height: 630 }]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: "Free online tools for productivity",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string"
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
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-gray-50 to-violet-50 py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 bg-violet-100 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                ✨ 100% Free · No Sign-up Required
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                100+ Free Tools to Make Your Life{" "}
                <span className="text-primary">Productive</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">{siteConfig.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/tools" className="bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Explore Tools →
                </Link>
                <Link href="#categories" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Browse Categories
                </Link>
              </div>
              <div className="flex gap-8 mt-10">
                {[["100+", "Free Tools"], ["5M+", "Happy Users"], ["0", "Sign-ups Needed"]].map(([val, label]) => (
                  <div key={label}>
                    <strong className="block text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>{val}</strong>
                    <span className="text-xs text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center animate-fade-in-up delay-200">
              <div className="w-full max-w-md animate-float">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* ── Popular Tools ── */}
        <section className="py-20 px-6" id="tools">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Popular Tools</h2>
            <p className="text-center text-gray-400 text-sm mb-12">The most-used tools by our community — free, fast, and no account needed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.slice(0, 12).map(tool => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
            <div className="text-center mt-10">
              <Link href="/tools" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                More Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="bg-gray-50 py-20 px-6" id="categories">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Browse by Category</h2>
            <p className="text-center text-gray-400 text-sm mb-12">Find the right tool for the job — organized by category.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {categories.map(cat => (
                <Link key={cat.slug} href={`/tools/${cat.slug}`}
                  className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                  <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-2xl">{cat.icon}</div>
                  <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{cat.name}</span>
                  <span className="text-xs text-gray-400 leading-relaxed">{cat.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <SearchSection />
        <TestimonialsSection />

      </main>

      <Footer />
    </>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="210" cy="200" rx="180" ry="130" fill="#ede9fe" opacity="0.5" />
      <rect x="60" y="60" width="160" height="110" rx="14" fill="white" filter="url(#s)" />
      <rect x="60" y="60" width="160" height="36" rx="14" fill="#058554" />
      <rect x="60" y="82" width="160" height="14" fill="#058554" />
      <text x="140" y="84" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui" fontWeight="600">Word Counter</text>
      <rect x="76" y="108" width="128" height="8" rx="4" fill="#e5e7eb" />
      <rect x="76" y="122" width="96" height="8" rx="4" fill="#e5e7eb" />
      <rect x="76" y="136" width="60" height="20" rx="6" fill="#058554" />
      <text x="106" y="150" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Count →</text>
      <rect x="240" y="40" width="140" height="100" rx="14" fill="white" filter="url(#s)" />
      <rect x="255" y="58" width="40" height="40" rx="8" fill="#ede9fe" />
      <text x="275" y="84" textAnchor="middle" fontSize="20">🖼️</text>
      <rect x="305" y="62" width="60" height="8" rx="4" fill="#e5e7eb" />
      <rect x="305" y="76" width="44" height="8" rx="4" fill="#e5e7eb" />
      <rect x="255" y="108" width="110" height="20" rx="6" fill="#058554" />
      <text x="310" y="122" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Compress Image</text>
      <rect x="100" y="190" width="130" height="110" rx="14" fill="white" filter="url(#s)" />
      <text x="165" y="225" textAnchor="middle" fontSize="28">📱</text>
      <rect x="116" y="240" width="98" height="8" rx="4" fill="#e5e7eb" />
      <rect x="116" y="254" width="70" height="8" rx="4" fill="#e5e7eb" />
      <rect x="116" y="270" width="98" height="20" rx="6" fill="#058554" />
      <text x="165" y="284" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Generate QR</text>
      <rect x="255" y="160" width="130" height="100" rx="14" fill="white" filter="url(#s)" />
      <circle cx="285" cy="190" r="16" fill="#f59e0b" />
      <circle cx="305" cy="190" r="16" fill="#10b981" opacity="0.8" />
      <circle cx="325" cy="190" r="16" fill="#058554" opacity="0.8" />
      <rect x="271" y="214" width="98" height="8" rx="4" fill="#e5e7eb" />
      <rect x="271" y="228" width="70" height="8" rx="4" fill="#e5e7eb" />
      <rect x="271" y="242" width="98" height="16" rx="6" fill="#058554" />
      <text x="320" y="254" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="600">Pick Color</text>
      <rect x="30" y="180" width="56" height="24" rx="12" fill="#058554" />
      <text x="58" y="196" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="700">FREE</text>
      <rect x="340" y="130" width="68" height="24" rx="12" fill="#10b981" />
      <text x="374" y="146" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" fontWeight="700">100+ Tools</text>
      <defs>
        <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#00000015" />
        </filter>
      </defs>
    </svg>
  );
}
