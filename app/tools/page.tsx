import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "All Tool Categories – Browse 500+ Free Online Utilities | Productive Toolbox",
  description:
    "Browse our complete library of 500+ free online tools organized by category. Math calculators, developer utilities, writing tools, design helpers, and much more. No sign-up required.",
  openGraph: {
    title: "All Tools – Productive Toolbox",
    description: "Browse 500+ free online tools by category",
    url: `${siteConfig.url}/tools`,
  },
};

const categoryStyles: Record<string, { bg: string; border: string; badge: string; dot: string }> = {
  developer:        { bg: "from-blue-50 to-white",   border: "border-blue-100 hover:border-blue-300",   badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-500"   },
  writing:          { bg: "from-emerald-50 to-white", border: "border-emerald-100 hover:border-emerald-300", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  design:           { bg: "from-pink-50 to-white",    border: "border-pink-100 hover:border-pink-300",    badge: "bg-pink-100 text-pink-700",    dot: "bg-pink-500"   },
  security:         { bg: "from-red-50 to-white",     border: "border-red-100 hover:border-red-300",     badge: "bg-red-100 text-red-700",     dot: "bg-red-500"    },
  image:            { bg: "from-amber-50 to-white",   border: "border-amber-100 hover:border-amber-300",  badge: "bg-amber-100 text-amber-700",  dot: "bg-amber-500"  },
  creator:          { bg: "from-orange-50 to-white",  border: "border-orange-100 hover:border-orange-300",badge: "bg-orange-100 text-orange-700",dot: "bg-orange-500" },
  visualization:    { bg: "from-cyan-50 to-white",    border: "border-cyan-100 hover:border-cyan-300",    badge: "bg-cyan-100 text-cyan-700",    dot: "bg-cyan-500"   },
  productivity:     { bg: "from-lime-50 to-white",    border: "border-lime-100 hover:border-lime-300",    badge: "bg-lime-100 text-lime-600",    dot: "bg-lime-500"   },
  multimedia:       { bg: "from-indigo-50 to-white",  border: "border-indigo-100 hover:border-indigo-300",badge: "bg-indigo-100 text-indigo-700",dot: "bg-indigo-500" },
  calculator:       { bg: "from-teal-50 to-white",    border: "border-teal-100 hover:border-teal-300",    badge: "bg-teal-100 text-teal-700",    dot: "bg-teal-500"   },
  electrical:       { bg: "from-yellow-50 to-white",  border: "border-yellow-100 hover:border-yellow-300",badge: "bg-yellow-100 text-yellow-700",dot: "bg-yellow-500" },
  land:             { bg: "from-green-50 to-white",   border: "border-green-100 hover:border-green-300",  badge: "bg-green-100 text-green-700",  dot: "bg-green-500"  },
  architecture:     { bg: "from-stone-50 to-white",   border: "border-stone-100 hover:border-stone-300",  badge: "bg-stone-100 text-stone-700",  dot: "bg-stone-500"  },
  mechanical:       { bg: "from-slate-50 to-white",   border: "border-slate-100 hover:border-slate-300",  badge: "bg-slate-100 text-slate-700",  dot: "bg-slate-500"  },
  "computer-science": { bg: "from-purple-50 to-white",border: "border-purple-100 hover:border-purple-300",badge: "bg-purple-100 text-purple-700",dot: "bg-purple-500" },
  marketing:        { bg: "from-rose-50 to-white",    border: "border-rose-100 hover:border-rose-300",    badge: "bg-rose-100 text-rose-700",    dot: "bg-rose-500"   },
  "data-analytics": { bg: "from-sky-50 to-white",     border: "border-sky-100 hover:border-sky-300",      badge: "bg-sky-100 text-sky-700",      dot: "bg-sky-500"    },
};

const defaultStyle = { bg: "from-gray-50 to-white", border: "border-gray-200 hover:border-gray-400", badge: "bg-gray-100 text-gray-700", dot: "bg-gray-500" };

export default function ToolsPage() {
  const totalTools = tools.length;

  /* Count how many tools belong to each category */
  const countsByCategory = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = tools.filter(t => t.category === cat.slug).length;
    return acc;
  }, {});

  /* Pick 3 preview tool names per category */
  const previewByCategory = categories.reduce<Record<string, string[]>>((acc, cat) => {
    acc[cat.slug] = tools
      .filter(t => t.category === cat.slug)
      .slice(0, 3)
      .map(t => t.name);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">{siteConfig.name}</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">All Tools</span>
          </nav>

          {/* Hero Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block animate-pulse" />
              {totalTools}+ Free Tools — No Sign-up Required
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Browse by Category
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              From math calculators to developer utilities — pick a category to explore your tools.
            </p>
          </header>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(cat => {
              const style = categoryStyles[cat.slug] ?? defaultStyle;
              const count = countsByCategory[cat.slug] ?? 0;
              const previews = previewByCategory[cat.slug] ?? [];

              return (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className={`group relative bg-gradient-to-b ${style.bg} border-2 ${style.border} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5`}
                >
                  {/* Icon + Count badge */}
                  <div className="flex items-start justify-between">
                    <span className="text-4xl leading-none">{cat.icon}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${style.badge} uppercase tracking-widest`}>
                      {count} tools
                    </span>
                  </div>

                  {/* Name + Description */}
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {cat.name}
                    </h2>
                    <p className="text-sm text-gray-500 leading-snug" style={{ fontFamily: "var(--font-body)" }}>
                      {cat.description}
                    </p>
                  </div>

                  {/* Preview tool names */}
                  {previews.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                      {previews.map(name => (
                        <li key={name} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${style.dot}`} />
                          <span className="truncate">{name}</span>
                        </li>
                      ))}
                      {count > 3 && (
                        <li className="text-xs font-bold text-primary">+ {count - 3} more tools →</li>
                      )}
                    </ul>
                  )}

                  {/* Hover CTA */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors uppercase tracking-widest">
                      Explore
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stats footer bar */}
          <div className="mt-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
              <div>
                <p className="text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{totalTools}+</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Total Tools</p>
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{categories.length}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-heading)" }}>100%</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Free</p>
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>0</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Sign-ups Required</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
