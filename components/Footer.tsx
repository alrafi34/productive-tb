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
  );
}
