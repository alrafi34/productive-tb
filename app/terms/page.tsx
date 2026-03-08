import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use - Legal Agreement | Productive Toolbox",
  description: "Read the terms of use for Productive Toolbox. Understand your rights and responsibilities when using our free online productivity tools.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Terms of Use
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using {siteConfig.name}, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Use of Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {siteConfig.name} provides free online productivity tools for personal and commercial use. You may:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Use all tools for free without registration</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Use tools for personal or commercial projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Share links to our tools with others</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Process unlimited files and text</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Prohibited Activities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree NOT to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Attempt to hack, disrupt, or damage our services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Use automated bots or scrapers to abuse our tools</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Upload malicious files or content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Reverse engineer or copy our source code</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Use tools for illegal activities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Resell or redistribute our tools as your own</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content, design, code, and branding on {siteConfig.name} are owned by us and protected by copyright laws. You may not copy, modify, or distribute our website design or code without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                User Content and Data
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-900">You retain all rights to your content.</strong> When you use our tools:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Your files and text are processed locally in your browser (for most tools)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>We do not store, access, or claim ownership of your content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>You are responsible for the content you process</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Do not upload copyrighted material you don't own</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our tools are provided "as is" without warranties of any kind. We do not guarantee that our services will be error-free, uninterrupted, or meet your specific requirements. Use our tools at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {siteConfig.name} and its operators shall not be liable for any damages arising from your use of our tools, including but not limited to data loss, business interruption, or financial loss. You use our services at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Some tools may use third-party APIs or services (e.g., URL shorteners, QR generators). We are not responsible for the availability, accuracy, or policies of these third-party services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Service Availability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to keep our tools available 24/7, but we do not guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or technical issues without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to restrict or terminate access to our services for users who violate these terms or engage in abusive behavior.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Use are governed by and construed in accordance with applicable laws. Any disputes shall be resolved in the appropriate jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms of Use, please contact us at{" "}
                <a href="/contact" className="text-primary hover:underline font-semibold">
                  our contact page
                </a>
                .
              </p>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mt-8">
              <p className="text-gray-900 font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                ✅ Fair Use Policy
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We built {siteConfig.name} to be free and accessible to everyone. Please use our tools responsibly and help us keep them free for the community.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
