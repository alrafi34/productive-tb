import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

/* Keep in sync with the address shown on the Contact page. */
const CONTACT_EMAIL = "contact@productivetoolbox.com";
const LAST_UPDATED = "August 7, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Our privacy policy in plain English. We have no accounts, and what you type into our tools stays on your device.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
  robots: { index: true, follow: true },
};

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-slate-600 leading-relaxed">{children}</p>;
}

function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-slate-900">{children}</strong>;
}

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "What you type into our tools",
    body: (
      <div className="space-y-4">
        <P>
          <Term>It stays on your device.</Term> Every calculator and utility on this site runs inside your own
          browser. The numbers, text, images and files you enter are never sent to us.
        </P>
        <P>
          We do not receive them, cannot see them, and have nowhere to store them. When you close or reload the
          page, they are gone.
        </P>
      </div>
    ),
  },
  {
    title: "We have no accounts",
    body: (
      <P>
        There is no sign-up, no login and no password. We never ask for your name, email address or any other
        personal detail in order to use a tool, so we hold no user database and no user profiles.
      </P>
    ),
  },
  {
    title: "What is collected automatically",
    body: (
      <div className="space-y-4">
        <P>
          Like any website, some basic technical information is recorded when you visit — things like your
          approximate location by country, your browser and device type, which pages you opened, and where you
          came from.
        </P>
        <P>
          We use this only to see which tools people find useful and to keep the site working properly. It is
          looked at in aggregate, and it does not identify you personally.
        </P>
      </div>
    ),
  },
  {
    title: "Cookies and advertising",
    body: (
      <div className="space-y-4">
        <P>
          This site is free because it shows adverts. Adverts are supplied by third-party companies, and those
          companies place cookies on your device.
        </P>
        <P>
          Third-party vendors, <Term>including Google</Term>, use cookies to serve adverts based on your
          previous visits to this website and to other websites. You can turn off personalised advertising at
          any time in{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-primary font-medium hover:underline"
          >
            Google Ads Settings
          </a>
          , or opt out of other advertising vendors at{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-primary font-medium hover:underline"
          >
            aboutads.info/choices
          </a>
          .
        </P>
        <P>
          You can also block or delete cookies in your browser settings. The tools on this site will still work
          normally if you do.
        </P>
      </div>
    ),
  },
  {
    title: "If you email us",
    body: (
      <P>
        If you contact us, we will have your email address and whatever you wrote. We use it to reply to you and
        for nothing else. We do not add you to a mailing list and we do not pass it on.
      </P>
    ),
  },
  {
    title: "We do not sell your data",
    body: (
      <P>
        We do not sell, rent or trade personal information. We have no interest in collecting more than the site
        needs to run.
      </P>
    ),
  },
  {
    title: "Your choices",
    body: (
      <div className="space-y-4">
        <P>
          Since we hold no account and no user records, there is usually nothing for us to look up, correct or
          delete. If you have emailed us and want that correspondence removed, or you have any question about
          your data, just ask and we will handle it.
        </P>
        <P>
          Depending on where you live, you may have additional rights over your personal information — including
          the right to access or delete it. Email us and we will help.
        </P>
      </div>
    ),
  },
  {
    title: "Children",
    body: (
      <P>
        This site is intended for a general audience and is not directed at children under 13. We do not
        knowingly collect personal information from children.
      </P>
    ),
  },
  {
    title: "Changes",
    body: (
      <P>
        If this policy changes, we will update it here and change the date at the top of the page.
      </P>
    ),
  },
  {
    title: "Contact",
    body: (
      <div className="space-y-4">
        <P>Any question about privacy, or anything on this page:</P>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500 mb-1">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[15px] font-semibold text-primary hover:underline break-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-600 font-medium">Privacy Policy</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Legal</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Short version: we don&apos;t have accounts, and what you type into our tools never leaves your
              browser.
            </p>
            <p className="text-sm text-slate-500 mt-6">
              Last updated: <time dateTime="2026-08-07">{LAST_UPDATED}</time>
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="px-6 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-11">
              {SECTIONS.map(s => (
                <section key={s.title}>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </div>

            {/* Cross-links */}
            <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
              <Link
                href="/terms"
                className="text-sm font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                About
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
