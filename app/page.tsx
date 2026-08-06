import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import TestimonialsSection from "@/components/LazyTestimonialsSection";
import { tools, categories } from "@/config/tools";
import { siteConfig } from "@/config/site";

/* ────────────────────────────────────────────────────────────
   Derived catalogue data — single source of truth is config/tools.ts,
   so every number on this page stays correct as tools are added.
   ──────────────────────────────────────────────────────────── */

const TOTAL_TOOLS = tools.length;
const TOTAL_CATEGORIES = categories.length;

const countByCategory = tools.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});

const bySlug = new Map(tools.map(t => [t.slug, t]));
const pick = (slugs: string[]) => slugs.map(s => bySlug.get(s)).filter(Boolean) as typeof tools;

const href = (t: (typeof tools)[number]) => `/tools/${t.category}/${t.slug}`;

/* The six technical disciplines that make up the bulk of the catalogue */
const DISCIPLINES = [
  { slug: "electrical", blurb: "Load, voltage drop, cable sizing, protection and power quality.", accent: "text-amber-600 bg-amber-50 border-amber-100" },
  { slug: "architecture", blurb: "Areas, volumes, material take-offs and structural members.", accent: "text-stone-600 bg-stone-50 border-stone-100" },
  { slug: "data-analytics", blurb: "Statistics, model metrics, pipelines and storage sizing.", accent: "text-sky-600 bg-sky-50 border-sky-100" },
  { slug: "mechanical", blurb: "Force, torque, gearing, fluid flow and thermal work.", accent: "text-slate-600 bg-slate-50 border-slate-100" },
  { slug: "land", blurb: "Area conversion, plot measurement and regional land units.", accent: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { slug: "computer-science", blurb: "Complexity, model accuracy, token cost and cloud spend.", accent: "text-purple-600 bg-purple-50 border-purple-100" },
];

const POPULAR = pick([
  "voltage-drop-calculator",
  "beam-load-calculator",
  "wire-size-calculator",
  "torque-calculator",
  "arc-flash-calculator",
  "percentage-calculator",
  "word-counter",
  "password-generator",
  "json-validator",
]);

const EVERYDAY = pick([
  "word-counter",
  "image-compressor",
  "qr-code-generator",
  "password-generator",
  "json-validator",
  "color-palette-generator",
  "base64-encoder-decoder",
  "age-calculator",
]);

const RECENT = tools.slice(-6);

const AUDIENCES = [
  { icon: "⚡", title: "Electrical engineers", body: "Size conductors, check voltage drop and run protection studies without opening a spreadsheet.", cat: "electrical" },
  { icon: "🏗️", title: "Architects & builders", body: "Estimate materials, areas and structural loads at concept stage in seconds.", cat: "architecture" },
  { icon: "📊", title: "Analysts & data teams", body: "Sample sizes, model metrics and pipeline maths with the formula shown alongside.", cat: "data-analytics" },
  { icon: "🎓", title: "Engineering students", body: "Check your working against a clean reference implementation, free and unlimited.", cat: "mechanical" },
];

const VALUE_PROPS = [
  {
    title: "Runs in your browser",
    body: "Calculations happen locally on your device. Your inputs are not uploaded or stored on our servers.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    title: "No account, ever",
    body: `All ${TOTAL_TOOLS} tools open instantly. No sign-up wall, no trial timer, no credit card.`,
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    title: "Formulas you can check",
    body: "Every calculator states the method it uses, so you can verify the result instead of trusting a black box.",
    icon: (
      <>
        <path d="M4 4h16v4l-6 6v6l-4 2v-8L4 8z" />
      </>
    ),
  },
  {
    title: "Built for speed",
    body: "Static pages, no heavy frameworks on the tool itself — load, calculate, close the tab.",
    icon: (
      <>
        <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
      </>
    ),
  },
];

const FAQS = [
  {
    q: `Are all ${TOTAL_TOOLS} tools really free?`,
    a: "Yes. Every tool on Productive Toolbox is free to use with no usage limit, no premium tier and no feature locked behind payment.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There is no sign-up, no login and no email required. Open any tool and start using it immediately.",
  },
  {
    q: "How accurate are the engineering calculators?",
    a: "Each calculator implements the standard formula for its subject and states the method it uses alongside the result. They are built for design checks, estimating and learning. For regulated or safety-critical work, always verify the output against your local code and have it reviewed by a qualified professional.",
  },
  {
    q: "Is the data I enter kept private?",
    a: "Tool calculations run in your browser, so the values you type are processed on your own device rather than being sent to and stored on our servers.",
  },
  {
    q: "Can I use these tools for commercial or client work?",
    a: "Yes. There is no restriction on professional use. As with any calculation aid, you remain responsible for validating results before they inform a real design or deliverable.",
  },
  {
    q: "How often are new tools added?",
    a: `The library currently spans ${TOTAL_CATEGORIES} categories and grows regularly — the newest additions are listed on this page under "Recently added".`,
  },
];

/* ─── SEO schema ─── */

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: `${TOTAL_TOOLS} free engineering and technical calculators that run in your browser`,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  title: `${TOTAL_TOOLS} Free Engineering & Technical Calculators | Productive Toolbox`,
  description: `${TOTAL_TOOLS} free online calculators and tools for electrical, architectural, mechanical, land and data work — plus everyday text, image and developer utilities. Runs in your browser. No sign-up.`,
  openGraph: {
    title: `${TOTAL_TOOLS} Free Engineering & Technical Calculators`,
    description: `Electrical, structural, mechanical, land and data calculators — free, instant, no account required.`,
    url: siteConfig.url,
    images: [
      {
        url: `/og?title=Productive+Toolbox&subtitle=${TOTAL_TOOLS}+Free+Engineering+%26+Technical+Calculators`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: { canonical: siteConfig.url },
};

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main className="bg-white">

        {/* ═══ 1 · Hero — search is the primary action ═══ */}
        <section id="search-section" className="relative overflow-hidden border-b border-slate-100">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60rem 30rem at 50% -8rem, rgba(5,133,84,0.10), transparent 70%), linear-gradient(to bottom, #ffffff, #f8fafc)",
            }}
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/8 border border-primary/15 px-3.5 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Free forever · No sign-up · Runs in your browser
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-slate-900 tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {TOTAL_TOOLS} engineering calculators,
              <br className="hidden sm:block" />{" "}
              <span className="text-primary">one search away</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-9">
              Electrical, structural, mechanical, land and data tools built for real work — plus everyday
              text, image and developer utilities. Open it, get your number, close the tab.
            </p>

            <HeroSearch totalTools={TOTAL_TOOLS} />

            {/* Trust stats */}
            <dl className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-6 mt-14 pt-10 border-t border-slate-200/70 max-w-2xl mx-auto">
              {[
                [TOTAL_TOOLS, "Free tools"],
                [TOTAL_CATEGORIES, "Categories"],
                ["0", "Sign-ups"],
                ["100%", "In-browser"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span
                      className="block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {value}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ═══ 2 · Discipline spotlight — the real depth of the catalogue ═══ */}
        <section className="py-20 sm:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="Where the depth is"
              title="Built around technical disciplines"
              sub="Most tool sites stop at a word counter. These are the areas where the library goes deep."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DISCIPLINES.map(d => {
                const cat = categories.find(c => c.slug === d.slug);
                if (!cat) return null;
                const count = countByCategory[d.slug] ?? 0;
                const samples = tools.filter(t => t.category === d.slug).slice(0, 3);

                return (
                  <div
                    key={d.slug}
                    className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className={`w-11 h-11 flex items-center justify-center text-xl rounded-xl border ${d.accent}`}>
                        {cat.icon}
                      </span>
                      <span className="text-xs font-bold text-slate-400 tabular-nums">{count} tools</span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{d.blurb}</p>

                    <ul className="space-y-1.5 mb-5">
                      {samples.map(t => (
                        <li key={t.slug}>
                          <Link
                            href={href(t)}
                            className="flex items-center gap-2 text-[13px] text-slate-600 hover:text-primary transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                            <span className="truncate">{t.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/tools/${d.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary after:absolute after:inset-0"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      All {count} {cat.name.toLowerCase().replace(/ tools?$/, "")} tools
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 3 · Most-used tools ═══ */}
        <section className="py-20 sm:py-24 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Start here" title="Most-used tools" sub="The ones people come back for." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {POPULAR.map(t => (
                <Link
                  key={t.slug}
                  href={href(t)}
                  className="group flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md hover:shadow-slate-900/5 transition-all duration-200"
                >
                  <span className="w-11 h-11 shrink-0 flex items-center justify-center text-xl bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-primary/5 group-hover:border-primary/15 transition-colors">
                    {t.icon}
                  </span>
                  <span className="min-w-0">
                    <span
                      className="block text-[15px] font-semibold text-slate-900 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {t.name}
                    </span>
                    <span className="block text-[13px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                      {t.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4 · Browse every category ═══ */}
        <section id="categories" className="py-20 sm:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="The full library"
              title={`Browse all ${TOTAL_CATEGORIES} categories`}
              sub="Every tool, sorted by subject. Counts are live from the catalogue."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...categories]
                .sort((a, b) => (countByCategory[b.slug] ?? 0) - (countByCategory[a.slug] ?? 0))
                .map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/tools/${cat.slug}`}
                    className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-200"
                  >
                    <span className="text-lg shrink-0">{cat.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-[13px] font-semibold text-slate-800 group-hover:text-primary truncate transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {cat.name}
                      </span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 tabular-nums shrink-0">
                      {countByCategory[cat.slug] ?? 0}
                    </span>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Open the full tool index →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 5 · Why it's different ═══ */}
        <section className="py-20 sm:py-24 px-6 bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Why this one</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                No accounts. No uploads. No black boxes.
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                A calculator you can&apos;t verify is a guess with extra steps. Here&apos;s how these are built.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUE_PROPS.map(p => (
                <div key={p.title} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {p.icon}
                    </svg>
                  </span>
                  <h3 className="text-[15px] font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6 · Who it's for ═══ */}
        <section className="py-20 sm:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Who uses it" title="Built for people who work in numbers" sub="Pick the shelf that matches your day." />

            <div className="grid sm:grid-cols-2 gap-4">
              {AUDIENCES.map(a => (
                <Link
                  key={a.title}
                  href={`/tools/${a.cat}`}
                  className="group flex gap-5 bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary/40 hover:shadow-md hover:shadow-slate-900/5 transition-all duration-200"
                >
                  <span className="w-12 h-12 shrink-0 flex items-center justify-center text-2xl bg-slate-50 border border-slate-100 rounded-xl">
                    {a.icon}
                  </span>
                  <span>
                    <span
                      className="block text-[15px] font-semibold text-slate-900 mb-1.5 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {a.title}
                    </span>
                    <span className="block text-sm text-slate-500 leading-relaxed">{a.body}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7 · Everyday utilities + recently added ═══ */}
        <section className="py-20 sm:py-24 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Also in the box</p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Everyday utilities
              </h2>
              <p className="text-slate-500 leading-relaxed mb-7">
                The small things you still need between the technical work — text, images, colour and code.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {EVERYDAY.map(t => (
                  <Link
                    key={t.slug}
                    href={href(t)}
                    className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    <span className="text-base shrink-0">{t.icon}</span>
                    <span
                      className="text-[13px] font-medium text-slate-700 group-hover:text-primary truncate transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {t.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Fresh</p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Recently added
              </h2>
              <p className="text-slate-500 leading-relaxed mb-7">The newest tools in the library.</p>

              <ul className="space-y-2.5">
                {RECENT.map(t => (
                  <li key={t.slug}>
                    <Link href={href(t)} className="group flex items-center gap-3">
                      <span className="w-8 h-8 shrink-0 flex items-center justify-center text-sm bg-white border border-slate-200 rounded-lg">
                        {t.icon}
                      </span>
                      <span
                        className="text-[13px] font-medium text-slate-700 group-hover:text-primary truncate transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {t.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ 8 · Social proof (existing component) ═══ */}
        <TestimonialsSection />

        {/* ═══ 9 · FAQ ═══ */}
        <section className="py-20 sm:py-24 px-6 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <SectionHead eyebrow="Questions" title="Before you start" sub="" />

            <div className="space-y-3">
              {FAQS.map(f => (
                <details
                  key={f.q}
                  className="group bg-white border border-slate-200 rounded-2xl px-5 sm:px-6 open:border-slate-300 open:shadow-sm transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 py-4 sm:py-5 cursor-pointer list-none">
                    <span
                      className="text-[15px] font-semibold text-slate-900 group-open:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {f.q}
                    </span>
                    <span className="w-6 h-6 shrink-0 flex items-center justify-center text-slate-400 group-open:rotate-45 transition-transform duration-200">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-sm text-slate-600 leading-relaxed pb-5 pr-8">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 10 · Closing CTA ═══ */}
        <section className="px-6 pb-20 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:py-20 text-center">
              <div
                className="absolute inset-0 -z-0 opacity-40"
                style={{ background: "radial-gradient(40rem 20rem at 50% 0%, rgba(255,255,255,0.25), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {TOTAL_TOOLS} tools. Nothing to sign up for.
                </h2>
                <p className="text-white/80 max-w-lg mx-auto leading-relaxed mb-9">
                  Find the calculator you need, get your answer, and get back to the actual job.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/tools"
                    className="bg-white text-primary hover:bg-slate-50 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Browse all tools
                  </Link>
                  <Link
                    href="#search-section"
                    className="border border-white/35 text-white hover:bg-white/10 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Search instead
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

/* Shared section heading */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center mb-12 sm:mb-14">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">{eyebrow}</p>
      <h2
        className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {sub && <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}
