import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

type Props = {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
};

export default function ToolLayout({ title, description, icon, children }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-6">
        <article className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">{siteConfig.name}</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
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
