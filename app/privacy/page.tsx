import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data is Safe | Productive Toolbox",
  description: "Read our privacy policy to understand how Productive Toolbox protects your data. We don't store, track, or sell your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Our Commitment to Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At {siteConfig.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our free online tools.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Information We Collect
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong className="text-gray-900">The short answer: Almost nothing.</strong>
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>No Account Required:</strong> We don't require registration, so we don't collect names, emails, or passwords.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Client-Side Processing:</strong> Most tools run entirely in your browser. Your data never leaves your device.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Anonymous Analytics:</strong> We use privacy-focused analytics to understand page views and tool usage (no personal data).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Technical Data:</strong> Standard server logs (IP address, browser type, timestamps) for security and performance.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  How We Use Your Information
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To provide and improve our tools</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To analyze usage patterns and optimize performance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To prevent abuse and ensure security</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>To respond to support requests (if you contact us)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Data Storage and Security
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong className="text-gray-900">Your content stays on your device.</strong> When you use tools like Word Counter, Image Compressor, or QR Generator, all processing happens in your browser using JavaScript. We don't upload, store, or have access to your files or text.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  For tools that require server-side processing (if any), data is processed in memory and immediately discarded. We never store user-generated content on our servers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Cookies and Tracking
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Essential Cookies:</strong> We use minimal cookies for site functionality (e.g., remembering preferences).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>No Advertising Cookies:</strong> We don't use cookies for ads or cross-site tracking.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Analytics:</strong> We use privacy-focused analytics that don't track individuals.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Third-Party Services
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Some tools may use third-party APIs (e.g., URL shorteners, QR code generators). When using these features, you may be subject to the third party's privacy policy. We only use reputable services and disclose when external APIs are involved.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Since we don't collect personal data, there's nothing to access, delete, or export. You're in full control:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use tools without creating an account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Clear your browser cache to remove any local data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Block cookies if you prefer (site will still work)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Children's Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our tools are safe for all ages. We don't knowingly collect information from children under 13. Since we don't require registration, children can use our tools safely without providing personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Changes to This Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our tools after changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at{" "}
                  <a href="/contact" className="text-primary hover:underline font-semibold">
                    our contact page
                  </a>
                  .
                </p>
              </div>

              <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mt-8">
                <p className="text-gray-900 font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  🔒 Privacy First
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We built {siteConfig.name} with privacy as a core principle. No sign-ups, no tracking, no data collection. Your productivity tools should work for you, not against you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
