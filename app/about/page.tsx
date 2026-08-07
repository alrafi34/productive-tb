import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";

/* Keep in sync with the address shown on the Contact page. */
const CONTACT_EMAIL = "contact@productivetoolbox.com";

const TOTAL_TOOLS = tools.length;
const TOTAL_CATEGORIES = categories.length;

const countByCategory = tools.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});

const TOP_CATEGORIES = [...categories]
  .sort((a, b) => (countByCategory[b.slug] ?? 0) - (countByCategory[a.slug] ?? 0))
  .slice(0, 8);

export const metadata: Metadata = {
  title: "About Us",
  description: `What Productive Toolbox is, who builds it, how ${TOTAL_TOOLS} free browser-based engineering and technical calculators are made, how the site is funded, and the limits you should know about.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `${TOTAL_TOOLS} free calculators across ${TOTAL_CATEGORIES} categories, running entirely in your browser.`,
    url: `${siteConfig.url}/about`,
  },
};

const PRINCIPLES = [
  {
    icon: "🔓",
    title: "Free, with no account",
    body: `All ${TOTAL_TOOLS} tools open instantly. There is no registration, no email wall, no trial period and no premium tier holding back features.`,
  },
  {
    icon: "💻",
    title: "Calculations stay on your device",
    body: "Tools run as JavaScript in your browser. The numbers, text and files you enter are not uploaded to us, not stored, and not visible to us.",
  },
  {
    icon: "📖",
    title: "Methods you can check",
    body: "Each calculator states the formula or method behind it, so you can verify the result rather than trusting an unexplained number.",
  },
  {
    icon: "⚡",
    title: "Fast and lightweight",
    body: "Pages are statically generated and kept deliberately small, so a tool loads quickly even on a slow connection or an old phone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-600 font-medium">About</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">About</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A calculator library for people who work in numbers
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {siteConfig.name} is a free collection of {TOTAL_TOOLS} browser-based calculators and utilities
              across {TOTAL_CATEGORIES} categories — weighted heavily toward electrical, structural, mechanical,
              land and data work.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-14 border-b border-slate-100">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              [String(TOTAL_TOOLS), "Free tools"],
              [String(TOTAL_CATEGORIES), "Categories"],
              ["0", "Accounts required"],
              ["100%", "Runs in-browser"],
            ].map(([value, label]) => (
              <div key={label}>
                <div
                  className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {value}
                </div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why it exists */}
        <section className="px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Why it exists</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Most technical calculations are small, repetitive and badly served
            </h2>
            <div className="space-y-5 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              <p>
                If you need to size a cable, check a voltage drop, estimate bricks for a wall or work out a
                sample size, the calculation itself takes seconds. Finding somewhere trustworthy to do it
                usually takes longer than the maths.
              </p>
              <p>
                The options tend to be a spreadsheet you have to rebuild, a textbook you have to find, or a
                website that wants your email address before it will divide two numbers — often buried under
                pop-ups and interstitials.
              </p>
              <p>
                {siteConfig.name} exists to remove that friction. Every tool is one page, opens immediately,
                states its method, and does one job properly. You get your number and get back to the actual
                work.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="px-6 py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">How it&apos;s built</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Four rules we hold to
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {PRINCIPLES.map(p => (
                <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <span className="inline-flex w-12 h-12 items-center justify-center text-2xl bg-slate-50 border border-slate-100 rounded-xl mb-4">
                    {p.icon}
                  </span>
                  <h3
                    className="text-base font-semibold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">The library</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What&apos;s actually inside
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                The largest categories, with live counts taken straight from the catalogue.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {TOP_CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-primary/40 transition-colors"
                >
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {cat.name}
                    </span>
                    <span className="block text-xs text-slate-500 truncate">{cat.description}</span>
                  </span>
                  <span className="text-sm font-bold text-slate-400 tabular-nums shrink-0">
                    {countByCategory[cat.slug] ?? 0}
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                See all {TOTAL_CATEGORIES} categories →
              </Link>
            </div>
          </div>
        </section>

        {/* Accuracy — trust section */}
        <section className="px-6 py-16 sm:py-20 bg-slate-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Honesty</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What these tools are — and what they are not
            </h2>
            <div className="space-y-5 text-[15px] sm:text-base text-slate-400 leading-relaxed">
              <p>
                Every calculator implements a recognised formula for its subject, and we take accuracy
                seriously. But a web calculator cannot know your local building code, your regulatory
                environment, your safety factors or the specific conditions of your project.
              </p>
              <p>
                <strong className="text-white">
                  These tools are calculation aids, not a substitute for professional judgement.
                </strong>{" "}
                They are built for design checks, estimating, cross-checking your own working and learning. For
                anything regulated or safety-critical, the result must be verified and signed off by a licensed
                professional in your jurisdiction.
              </p>
              <p>
                If you find a tool that gives a wrong result or uses an outdated method, please tell us. Reports
                from people who use these calculations professionally are the single most valuable feedback we
                receive.
              </p>
              <p className="pt-2">
                <Link href="/contact" className="text-primary font-semibold hover:underline">
                  Report an error →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Funding transparency */}
        <section className="px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">How it&apos;s funded</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Advertising keeps it free
            </h2>
            <div className="space-y-5 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              <p>
                Hosting {TOTAL_TOOLS} tools costs money. Rather than charge for access or sell subscriptions,
                the site is funded by displaying advertisements alongside the tools.
              </p>
              <p>
                That is the whole business model — we do not sell your personal information, we do not sell your
                data to third parties, and we never see or store what you type into a calculator. Advertising
                partners do set cookies, and exactly how that works, along with how to opt out of personalised
                ads, is set out plainly in our{" "}
                <Link href="/privacy" className="text-primary font-medium hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                We try to keep advertising out of the way of the actual calculation. If you ever find an advert
                that breaks a tool or makes a page unusable,{" "}
                <Link href="/contact" className="text-primary font-medium hover:underline">
                  let us know
                </Link>{" "}
                and we will deal with it.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-6 pb-20 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-primary px-6 py-16 text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Missing a tool you need?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto leading-relaxed mb-8">
                Tell us the calculation and the field you work in. Requests from working professionals shape
                what gets built next.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="bg-white text-primary hover:bg-slate-50 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Request a tool
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="border border-white/35 text-white hover:bg-white/10 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
