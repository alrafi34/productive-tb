import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

type Props = {
  title: string;
  description: string;
  icon: string;
  category?: { slug: string; name: string };
  children: React.ReactNode;
};

export default function ToolLayout({ title, description, icon, category, children }: Props) {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-6">
        <article className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
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
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl" aria-hidden="true">{icon}</span>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{title}</h1>
            </div>
            <p className="text-gray-500 text-sm">{description}</p>
          </header>

          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
