import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";
import SearchSection from "@/components/SearchSection";
import TestimonialsSection from "@/components/TestimonialsSection";

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

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            <div>
              <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                <img src="/favicon.svg" alt="" className="w-7 h-7" />
                {siteConfig.name}
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">Free micro-tools for everyday productivity. No sign-up, no paywalls.</p>
              <div className="flex gap-3">
                {[
                  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                ].map(({ label, path }) => (
                  <a key={label} href="#" aria-label={label}
                    className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Tools</p>
              <ul className="space-y-2.5">
                {[["writing", "Writing Tools"], ["image", "Image Tools"], ["math", "Math Tools"], ["creator", "Creator Tools"]].map(([slug, label]) => (
                  <li key={slug}><Link href={`/tools/${slug}`} className="text-sm text-gray-500 hover:text-primary transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Company</p>
              <ul className="space-y-2.5">
                {[["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"]].map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-sm text-gray-500 hover:text-primary transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Stay Updated</p>
              <p className="text-xs text-gray-500 mb-4">Get notified when new tools drop. No spam.</p>
              <div className="flex rounded-lg overflow-hidden">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-gray-800 text-sm text-white px-4 py-2.5 outline-none placeholder:text-gray-600" />
                <button className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-4 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-5">
              {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-xs text-gray-600 hover:text-primary transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
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
