import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToolNavProvider } from "@/components/ToolNavContext";
import { siteConfig } from "@/config/site";
import { getToolNav, type ToolNav } from "@/lib/tool-nav";

type Props = {
  title: string;
  description: string;
  icon: string;
  category?: { slug: string; name: string };
  /* The tool's registry slug. Drives the family strip, the side rail and the
     related links rendered inside the tool UI. */
  slug?: string;
  children: React.ReactNode;
};

export default function ToolLayout({ title, description, icon, category, slug, children }: Props) {
  /* BreadcrumbList mirroring the visual breadcrumb below — Google requires the
     two to match. Emitted here so every tool page gets it, whether it is served
     by the dynamic [tool]/[subtool] route or its own route file. The final item
     carries no `item` URL, which is correct for the current page. */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
      ...(category
        ? [{
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${siteConfig.url}/tools/${category.slug}`,
          }]
        : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: title },
    ],
  };

  const nav = slug ? getToolNav(slug) : null;
  const hasRail = nav !== null && !nav.wide && nav.related.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50 py-8 md:py-10 px-4 sm:px-6">
        <article className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">{siteConfig.name}</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
            {category && (
              <>
                <span>/</span>
                <Link href={`/tools/${category.slug}`} className="hover:text-primary transition-colors capitalize">
                  {category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-600">{title}</span>
          </nav>

          {/* Tool header with semantic H1 */}
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl" aria-hidden="true">{icon}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h1>
            </div>
            <p className="text-gray-500 text-sm">{description}</p>
          </header>

          {nav && nav.family.length > 0 && <FamilyStrip nav={nav} />}

          <ToolNavProvider value={nav}>
            {hasRail ? (
              <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-8 xl:items-start">
                <div className="min-w-0">{children}</div>
                <ToolRail nav={nav} />
              </div>
            ) : (
              children
            )}
          </ToolNavProvider>
        </article>
      </main>
      <Footer />
    </>
  );
}

/* Sibling tools in the same family, as tabs right above the tool. The
   current tool leads so it is never scrolled out of view on phones. */
function FamilyStrip({ nav }: { nav: ToolNav }) {
  const ordered = [
    ...nav.family.filter((t) => t.slug === nav.slug),
    ...nav.family.filter((t) => t.slug !== nav.slug),
  ];
  return (
    <nav aria-label="Similar tools" className="mb-6">
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:overflow-visible [scrollbar-width:none]">
        {ordered.map((t) => {
          const current = t.slug === nav.slug;
          return (
            <Link
              key={t.slug}
              href={t.href}
              aria-current={current ? "page" : undefined}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                current
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              <span aria-hidden="true">{t.icon}</span>
              {t.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const RAIL_COUNT = 8;

/* Desktop side rail: stays in view while the tool and its explanation
   scroll past. Below xl the chips under the tool take over. */
function ToolRail({ nav }: { nav: ToolNav }) {
  return (
    <aside aria-label="Related tools" className="hidden xl:flex flex-col gap-4 sticky top-20">
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Related tools
        </p>
        <ul>
          {nav.related.slice(0, RAIL_COUNT).map((t) => (
            <li key={t.slug}>
              <Link
                href={t.href}
                className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                <span className="w-7 h-7 shrink-0 grid place-items-center rounded-lg bg-gray-50 group-hover:bg-white text-base" aria-hidden="true">
                  {t.icon}
                </span>
                <span className="min-w-0 leading-snug">{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        {nav.category && (
          <Link
            href={`/tools/${nav.category.slug}`}
            className="mt-2 block border-t border-gray-100 pt-3 text-sm font-semibold text-primary hover:underline"
          >
            All {nav.category.count} {nav.category.name} →
          </Link>
        )}
      </div>

      {nav.popular.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Popular tools
          </p>
          <div className="flex flex-wrap gap-1.5">
            {nav.popular.map((t) => (
              <Link
                key={t.slug}
                href={t.href}
                className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-700 hover:text-primary transition-colors"
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
