import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | Productive Toolbox",
  description: "Have questions or feedback? Contact Productive Toolbox team. We'd love to hear from you about our free online productivity tools.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Send us your questions, feedback, or suggestions.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Feature request, bug report, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-colors text-lg"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { icon: "📧", title: "Email", value: "hello@productivetoolbox.com" },
                { icon: "🐦", title: "Twitter", value: "@ProductiveTools" },
                { icon: "💬", title: "Response Time", value: "Within 24 hours" },
              ].map(item => (
                <div key={item.title} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
