import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";

/* ─── Category accent colours ─── */
const categoryAccent: Record<string, { badge: string; icon: string }> = {
  math:          { badge: "bg-violet-100 text-violet-700",  icon: "bg-violet-50 border-violet-100"  },
  developer:     { badge: "bg-blue-100 text-blue-700",      icon: "bg-blue-50 border-blue-100"      },
  writing:       { badge: "bg-emerald-100 text-emerald-700",icon: "bg-emerald-50 border-emerald-100"},
  design:        { badge: "bg-pink-100 text-pink-700",      icon: "bg-pink-50 border-pink-100"      },
  security:      { badge: "bg-red-100 text-red-700",        icon: "bg-red-50 border-red-100"        },
  image:         { badge: "bg-amber-100 text-amber-700",    icon: "bg-amber-50 border-amber-100"    },
  creator:       { badge: "bg-orange-100 text-orange-700",  icon: "bg-orange-50 border-orange-100"  },
  visualization: { badge: "bg-cyan-100 text-cyan-700",      icon: "bg-cyan-50 border-cyan-100"      },
  productivity:  { badge: "bg-lime-100 text-lime-700",      icon: "bg-lime-50 border-lime-100"      },
  multimedia:    { badge: "bg-indigo-100 text-indigo-700",  icon: "bg-indigo-50 border-indigo-100"  },
};
const defaultAccent = { badge: "bg-gray-100 text-gray-700", icon: "bg-gray-50 border-gray-100" };

export async function generateStaticParams() {
  /* Generate params for every category slug */
  return categories.map(cat => ({ tool: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return { title: "Not Found" };

  const count = tools.filter(t => t.category === slug).length;
  return {
    title: `${cat.name} – ${count} Free Online Tools | Productive Toolbox`,
    description: `Explore ${count} free ${cat.name.toLowerCase()} directly in your browser. ${cat.description}`,
    openGraph: {
      title: `${cat.name} – Productive Toolbox`,
      description: `${count} free, browser-based ${cat.name.toLowerCase()}`,
      url: `${siteConfig.url}/tools/${slug}`,
    },
    alternates: { canonical: `${siteConfig.url}/tools/${slug}` },
  };
}

export default async function CategoryOrRedirectPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: slug } = await params;

  /* ── Case 1: slug matches a category → render category page ── */
  const cat = categories.find(c => c.slug === slug);
  if (cat) {
    const catTools = tools.filter(t => t.category === slug);
    const otherCategories = categories.filter(c => c.slug !== slug);
    const accent = categoryAccent[slug] ?? defaultAccent;

    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-12 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">{siteConfig.name}</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">All Tools</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium">{cat.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                <header className="mb-10">
                  <div className="flex items-center gap-5 mb-5">
                    <div className={`w-16 h-16 flex items-center justify-center text-3xl rounded-2xl border-2 ${accent.icon} shadow-sm`}>
                      {cat.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {cat.name}
                        </h1>
                        <span className={`hidden sm:inline text-xs font-bold px-3 py-1 rounded-full ${accent.badge} uppercase tracking-widest`}>
                          {catTools.length} tools
                        </span>
                      </div>
                      <p className="text-gray-500 text-base" style={{ fontFamily: "var(--font-body)" }}>
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </header>
                <CategoryToolsGrid category={cat} />
              </div>

              {/* Sidebar */}
              <aside className="lg:w-64 xl:w-72 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-8">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">
                    Other Categories
                  </h2>
                  <ul className="space-y-1">
                    {otherCategories.map(other => {
                      const count = tools.filter(t => t.category === other.slug).length;
                      return (
                        <li key={other.slug}>
                          <Link
                            href={`/tools/${other.slug}`}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors group"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="text-lg leading-none">{other.icon}</span>
                              <span className="truncate">{other.name}</span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-primary/60 transition-colors shrink-0">
                              {count}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-gray-50">
                    <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                      ← All Categories
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Case 2: slug matches a known tool → redirect to /tools/[category]/[slug] ── */
  const tool = tools.find(t => t.slug === slug);
  if (tool) {
    redirect(`/tools/${tool.category}/${tool.slug}`);
  }

  /* ── Case 3: nothing matched ── */
  notFound();
}
