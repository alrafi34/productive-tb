import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";

/* Keep in sync with the address shown on the Contact page. */
const CONTACT_EMAIL = "contact@productivetoolbox.com";
const LAST_UPDATED = "August 7, 2026";
const TOTAL_TOOLS = tools.length;

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing your use of Productive Toolbox: acceptable use, intellectual property, advertising, disclaimers of warranty, and limitation of liability.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: true, follow: true },
};

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-slate-600 leading-relaxed">{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] text-slate-600 leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-slate-900">{children}</strong>;
}

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <div className="space-y-4">
        <P>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
          <Term>{siteConfig.name}</Term> at <Term>{siteConfig.url}</Term> (the &ldquo;Service&rdquo;).
        </P>
        <P>
          By accessing or using the Service, you agree to be bound by these Terms and by our{" "}
          <Link href="/privacy" className="text-primary font-medium hover:underline">
            Privacy Policy
          </Link>
          . If you do not agree with any part of these Terms, you must not use the Service.
        </P>
      </div>
    ),
  },
  {
    id: "eligibility",
    title: "Who may use the Service",
    body: (
      <div className="space-y-4">
        <P>
          The Service is available to anyone with a web browser and an internet connection. No registration or
          account is required.
        </P>
        <P>
          The Service is intended for a general audience and is not directed at children under 13. If you are
          under the age of majority in your jurisdiction, you should use the Service only with the involvement
          of a parent or guardian.
        </P>
      </div>
    ),
  },
  {
    id: "description",
    title: "What the Service provides",
    body: (
      <div className="space-y-4">
        <P>
          The Service provides approximately {TOTAL_TOOLS} free online calculators and utilities spanning
          engineering, construction, land measurement, data analysis, writing, design and general computing.
        </P>
        <P>
          Tools execute in your web browser. We provide them as a convenience and as a general-purpose aid to
          calculation, estimation and learning.
        </P>
        <P>
          We may add, modify, suspend or remove any tool or feature at any time, with or without notice, and we
          are not obliged to maintain any particular tool.
        </P>
      </div>
    ),
  },
  {
    id: "no-professional-advice",
    title: "No professional advice — important",
    body: (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
          <p className="text-[15px] font-semibold text-amber-900" style={{ fontFamily: "var(--font-heading)" }}>
            Read this section carefully if you use the engineering or financial calculators.
          </p>
          <P>
            The tools on this Service are <Term>calculation aids only</Term>. They do not constitute
            engineering, architectural, construction, electrical, structural, surveying, medical, financial,
            legal or any other form of professional advice, and they are not a substitute for the judgement of
            a qualified, licensed professional.
          </P>
        </div>
        <Bullets
          items={[
            <>
              Results are produced by general-purpose formulas and simplified models. They may not account for
              your local building codes, electrical regulations, safety factors, material specifications,
              environmental conditions or other project-specific requirements.
            </>,
            <>
              <Term>
                You must independently verify every result before relying on it for any real design,
                construction, installation, purchase, medical, financial or safety-related decision.
              </Term>
            </>,
            <>
              For any regulated, safety-critical or life-safety application, the output must be reviewed and
              approved by a licensed professional qualified in the relevant jurisdiction and discipline.
            </>,
            <>
              Health-related tools do not provide medical advice or diagnosis. Consult a qualified healthcare
              professional for medical matters.
            </>,
            <>
              Financial tools do not provide financial, investment or tax advice. Consult a qualified adviser
              before making financial decisions.
            </>,
          ]}
        />
        <P>
          You assume full responsibility for how you use any result obtained from the Service, and for any
          consequence arising from that use.
        </P>
      </div>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            You may
          </h3>
          <Bullets
            items={[
              <>Use every tool free of charge, without registration, for as long as you like</>,
              <>Use the tools for personal, educational, professional and commercial purposes</>,
              <>Link to any page on this site from your own website, article or documentation</>,
              <>Reference results in your own work, subject to the verification duty described above</>,
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            You must not
          </h3>
          <Bullets
            items={[
              <>Attempt to gain unauthorised access to the Service, its servers or related systems</>,
              <>
                Interfere with, disrupt or place an unreasonable load on the Service, including through denial
                of service attacks or aggressive automated requests
              </>,
              <>Scrape, harvest or bulk-download the Service&apos;s content in a way that burdens its operation</>,
              <>Copy, mirror, rebrand or redistribute the Service or a substantial part of it as your own</>,
              <>Use the Service to carry out or facilitate any unlawful activity</>,
              <>Introduce malware, or attempt to exploit or probe the Service for vulnerabilities</>,
              <>
                Interfere with, obscure, click fraudulently on, or artificially inflate interaction with any
                advertisement displayed on the Service
              </>,
              <>Remove, obscure or alter any proprietary notice on the Service</>,
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    body: (
      <div className="space-y-4">
        <P>
          <Term>You retain all rights to the content you enter into our tools.</Term> Because tools run inside
          your browser, we do not receive, store, access or claim any ownership over the text, numbers, images
          or files you use them with.
        </P>
        <P>
          You are solely responsible for the content you process and for ensuring you have the right to process
          it. Do not use the Service with material you are not authorised to handle.
        </P>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <div className="space-y-4">
        <P>
          The Service, including its name, design, layout, text, graphics, logos and underlying source code, is
          owned by {siteConfig.name} and is protected by copyright and other intellectual property laws.
        </P>
        <P>
          Nothing in these Terms grants you a licence to reproduce, distribute or create derivative works from
          the Service beyond the normal use of the website in a browser.
        </P>
        <P>
          Mathematical formulas, physical laws, engineering principles and standard methods implemented by the
          tools are not themselves claimed as our property.
        </P>
      </div>
    ),
  },
  {
    id: "advertising",
    title: "Advertising and third-party links",
    body: (
      <div className="space-y-4">
        <P>
          The Service is free to use and is funded by advertising. Adverts are supplied by third-party networks,
          including Google AdSense, and their content is not selected, endorsed or verified by us.
        </P>
        <P>
          The Service may also contain links to third-party websites. We do not control those sites and are not
          responsible for their content, products, services, accuracy or privacy practices. Visiting them is at
          your own risk, and any dealing you have with a third party is solely between you and them.
        </P>
        <P>
          How advertising cookies work on this site is described in our{" "}
          <Link href="/privacy" className="text-primary font-medium hover:underline">
            Privacy Policy
          </Link>
          .
        </P>
      </div>
    ),
  },
  {
    id: "availability",
    title: "Availability of the Service",
    body: (
      <div className="space-y-4">
        <P>
          We aim to keep the Service available at all times, but we do not guarantee uninterrupted or
          error-free operation. The Service may become unavailable due to maintenance, technical failure,
          third-party provider outage or circumstances beyond our control.
        </P>
        <P>
          We may modify, suspend or discontinue any part of the Service, or the Service as a whole, at any time
          without liability to you.
        </P>
      </div>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    body: (
      <div className="space-y-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <P>
            The Service and all tools are provided on an <Term>&ldquo;as is&rdquo;</Term> and{" "}
            <Term>&ldquo;as available&rdquo;</Term> basis, without warranty of any kind, whether express,
            implied or statutory.
          </P>
        </div>
        <P>
          To the fullest extent permitted by law, we disclaim all warranties, including any implied warranty of
          merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability and
          availability.
        </P>
        <P>
          We do not warrant that the Service will meet your requirements, that results obtained will be accurate
          or reliable, or that any defect will be corrected. No advice or information obtained from the Service
          creates any warranty not expressly stated in these Terms.
        </P>
      </div>
    ),
  },
  {
    id: "liability",
    title: "No liability — you use these tools at your own risk",
    body: (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
          <p className="text-[15px] font-semibold text-amber-900" style={{ fontFamily: "var(--font-heading)" }}>
            {siteConfig.name} accepts no liability for any mistake, error or inaccuracy in any result.
          </p>
          <P>
            This is a free calculation tool, not a professional service. It is your responsibility to check
            every result before you rely on it. If you act on a number from this site without verifying it,
            the consequences are yours alone.
          </P>
        </div>

        <P>
          To the fullest extent permitted by applicable law, {siteConfig.name}, its operators and contributors
          accept <Term>no liability whatsoever</Term> for any loss, damage, cost or injury of any kind arising
          out of, or in any way connected with, your use of the Service or your reliance on any result it
          produces.
        </P>

        <P>This exclusion applies without limitation to:</P>
        <Bullets
          items={[
            <>
              Any error, inaccuracy, omission, defect, outdated method or wrong assumption in any calculation,
              formula, result or output
            </>,
            <>
              Any direct, indirect, incidental, special, consequential, punitive or exemplary loss or damage
            </>,
            <>Loss of profit, revenue, contracts, data, goodwill or business opportunity</>,
            <>
              The cost of rework, remedial work, wasted materials, project delay, failed inspection or a
              rejected design
            </>,
            <>Any property damage, equipment failure, structural failure or personal injury</>,
            <>
              Any decision made by you or by a third party on the basis of a result obtained from the Service
            </>,
            <>Any unavailability, interruption, defect or error in the Service itself</>,
          ]}
        />

        <P>
          The Service is a calculation aid. It is <Term>not</Term> a checking authority, a certifying body, an
          approval process, or a substitute for a qualified professional. We do not review, approve, certify or
          take responsibility for any work you produce using it.
        </P>

        <P>
          <Term>We provide no guarantee that any result is correct</Term>, and we give no warranty, assurance or
          undertaking of any kind as to accuracy, suitability or fitness for your purpose. You accept the
          Service on that basis, and you agree that using it is entirely at your own risk.
        </P>

        <P>
          Some jurisdictions do not permit the exclusion of certain liabilities. Where the law does not allow an
          exclusion, our liability is limited to the minimum extent the law permits, and nothing in these Terms
          excludes liability for death or personal injury caused by negligence, or for fraud, where such an
          exclusion is prohibited by law.
        </P>
      </div>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnification",
    body: (
      <P>
        You agree to indemnify and hold harmless {siteConfig.name} and its operators from any claim, demand,
        loss, liability, cost or expense (including reasonable legal fees) arising out of your use of the
        Service, your breach of these Terms, your violation of any law, or your infringement of the rights of
        any third party.
      </P>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <P>
        We may restrict or terminate your access to the Service at any time, without notice, if we reasonably
        believe you have breached these Terms or that your use harms the Service or other users. The sections on
        intellectual property, disclaimers, limitation of liability and indemnification survive any termination.
      </P>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: (
      <div className="space-y-4">
        <P>
          These Terms are governed by, and construed in accordance with, the laws applicable in the jurisdiction
          in which the operator of {siteConfig.name} is established, without regard to conflict-of-law
          principles.
        </P>
        <P>
          You may also have rights under the mandatory consumer protection laws of your country of residence,
          and nothing in these Terms removes those rights.
        </P>
        <P>
          If a dispute arises, we ask that you contact us first at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          so we can try to resolve it informally.
        </P>
      </div>
    ),
  },
  {
    id: "severability",
    title: "Severability and entire agreement",
    body: (
      <div className="space-y-4">
        <P>
          If any provision of these Terms is found to be unenforceable, that provision will be limited or
          removed to the minimum extent necessary, and the remaining provisions will remain in full force.
        </P>
        <P>
          Our failure to enforce any right or provision is not a waiver of it. These Terms, together with the
          Privacy Policy, constitute the entire agreement between you and us regarding the Service.
        </P>
      </div>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <P>
        We may revise these Terms from time to time. The revised version takes effect when posted on this page,
        and we will update the &ldquo;Last updated&rdquo; date accordingly. Your continued use of the Service
        after a change constitutes acceptance of the revised Terms. We encourage you to review this page
        periodically.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <div className="space-y-4">
        <P>Questions about these Terms can be sent to:</P>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500 mb-1">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[15px] font-semibold text-primary hover:underline break-all"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-slate-500 mt-4 mb-1">Contact page</p>
          <Link
            href="/contact"
            className="text-[15px] font-semibold text-primary hover:underline"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {siteConfig.url}/contact
          </Link>
        </div>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-600 font-medium">Terms &amp; Conditions</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Legal</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Terms &amp; Conditions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              The rules for using {siteConfig.name} — what you may do, what we promise, what we don&apos;t, and
              the limits of our responsibility for the results our tools produce.
            </p>
            <p className="text-sm text-slate-500 mt-6">
              Last updated: <time dateTime="2026-08-07">{LAST_UPDATED}</time>
            </p>
          </div>
        </section>

        <section className="px-6 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[16rem_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <nav className="sticky top-24" aria-label="Table of contents">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">On this page</p>
                <ol className="space-y-1.5">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-2.5 text-[13px] text-slate-600 hover:text-primary leading-snug transition-colors"
                      >
                        <span className="text-slate-300 tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 max-w-3xl space-y-12">
              {SECTIONS.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-xs font-bold text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.title}
                    </h2>
                  </div>
                  {s.body}
                </section>
              ))}

              <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-3">
                <Link
                  href="/privacy"
                  className="text-sm font-semibold text-slate-700 border border-slate-200 hover:border-primary hover:text-primary px-5 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Privacy Policy
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
