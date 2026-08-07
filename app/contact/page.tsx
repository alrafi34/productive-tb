import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";

/* Keep in sync with the address used in ContactForm and the legal pages. */
const CONTACT_EMAIL = "contact@productivetoolbox.com";
const TOTAL_TOOLS = tools.length;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Productive Toolbox. Report a wrong result, request a new tool, suggest a correction, or send an advertising or privacy enquiry.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  robots: { index: true, follow: true },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      availableLanguage: ["English"],
    },
  },
};

const REASONS = [
  {
    icon: "🐞",
    title: "A tool gave a wrong result",
    body: "The most useful message you can send us. Include the tool name, the exact values you entered, the result you got and the result you expected.",
  },
  {
    icon: "🧮",
    title: "Request a new tool",
    body: `We have ${TOTAL_TOOLS} tools and add more regularly. Tell us the calculation you need and the field you work in.`,
  },
  {
    icon: "📐",
    title: "Correct a formula or method",
    body: "If a calculator uses the wrong standard, an outdated coefficient or an over-simplified model, we want to know. A reference makes it quicker to fix.",
  },
  {
    icon: "📣",
    title: "Advertising & business",
    body: "Enquiries about advertising, partnerships or use of the site's content in your own product.",
  },
  {
    icon: "🔒",
    title: "Privacy & data requests",
    body: "Exercise a data right, ask a question about our Privacy Policy, or raise a concern about how the site handles information.",
  },
  {
    icon: "⚖️",
    title: "Legal & copyright",
    body: "Copyright concerns, takedown requests, or questions about our Terms & Conditions.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

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
              <span className="text-slate-600 font-medium">Contact</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Get in touch</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact us
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              A real person reads every message. If you have found a calculation error, tell us — corrections
              from people who use these tools professionally are the fastest way the library gets better.
            </p>
          </div>
        </section>

        {/* Form + details */}
        <section className="px-6 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <h2
                className="text-2xl font-bold text-slate-900 tracking-tight mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Send a message
              </h2>
              <p className="text-slate-500 leading-relaxed mb-7">
                Fill this in and it will open in your email app, ready to send.
              </p>

              <ContactForm />
            </div>

            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Email us</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="block text-lg font-bold text-slate-900 hover:text-primary transition-colors break-all mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This is the fastest route for anything urgent, and the right address for privacy, legal and
                  advertising matters.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">What to expect</p>
                <dl className="space-y-4">
                  {[
                    ["Response time", "We aim to reply within 2–3 business days."],
                    ["Languages", "English."],
                    ["Cost", "Support is free, like the tools."],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt
                        className="text-sm font-semibold text-slate-900 mb-0.5"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {k}
                      </dt>
                      <dd className="text-sm text-slate-600 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Before you write</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Common questions about pricing, accounts, accuracy and privacy are already answered on the
                  home page and in our policies.
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    ["Frequently asked questions", "/#faq"],
                    ["Privacy Policy", "/privacy"],
                    ["Terms & Conditions", "/terms"],
                    ["About this site", "/about"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                    >
                      {label} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reasons to contact */}
        <section className="px-6 py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Topics</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What people write to us about
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                Picking the right topic in the form helps us route your message and reply faster.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REASONS.map(r => (
                <div key={r.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <span className="inline-flex w-11 h-11 items-center justify-center text-xl bg-slate-50 border border-slate-100 rounded-xl mb-4">
                    {r.icon}
                  </span>
                  <h3
                    className="text-[15px] font-semibold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Looking for a tool instead?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              All {TOTAL_TOOLS} tools are free and open without an account.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Browse all tools
              </Link>
              <Link
                href="/about"
                className="border border-slate-200 text-slate-700 hover:border-primary hover:text-primary text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                About this site
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
