import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              <Image src="/favicon.svg" alt="" width={28} height={28} className="w-7 h-7" />
              {siteConfig.name}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">Free micro-tools for everyday productivity. No sign-up, no paywalls.</p>
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
  );
}
