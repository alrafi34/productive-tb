import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us - Free Online Productivity Tools | Productive Toolbox",
  description: "Learn about Productive Toolbox, your go-to platform for 100+ free online tools. No sign-up, no paywalls. Word counters, image compressors, QR generators, and more.",
  keywords: "about productive toolbox, free online tools, productivity tools, web tools, no signup tools",
  openGraph: {
    title: "About Productive Toolbox - Free Online Tools",
    description: "Discover how Productive Toolbox helps thousands of users daily with free, fast, and reliable productivity tools.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              About Productive Toolbox
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your one-stop platform for 100+ free online productivity tools. No sign-up, no paywalls, no hassle.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              At Productive Toolbox, we believe that essential productivity tools should be accessible to everyone, everywhere. Our mission is to provide a comprehensive collection of free, fast, and reliable online tools that help people work smarter, not harder.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're a student, professional, content creator, or small business owner, our tools are designed to save you time and boost your productivity without any barriers.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ fontFamily: "var(--font-heading)" }}>
              Why Choose Productive Toolbox?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "🆓", title: "100% Free Forever", desc: "All tools are completely free with no hidden costs, subscriptions, or premium tiers." },
                { icon: "🚀", title: "No Sign-Up Required", desc: "Start using any tool instantly. No registration, no email verification, no waiting." },
                { icon: "🔒", title: "Privacy First", desc: "Your data stays on your device. We don't store, track, or sell your information." },
                { icon: "⚡", title: "Lightning Fast", desc: "Optimized for speed. Get results in seconds, not minutes." },
                { icon: "📱", title: "Mobile Friendly", desc: "All tools work seamlessly on desktop, tablet, and mobile devices." },
                { icon: "🌐", title: "Always Available", desc: "Access tools 24/7 from anywhere in the world. No downtime, no limits." },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              What We Offer
            </h2>
            <div className="space-y-6">
              {[
                { title: "Writing Tools", desc: "Word counters, character counters, case converters, reading time calculators, and text formatting utilities." },
                { title: "Image Tools", desc: "Image compressors, resizers, format converters, and optimization tools for web and print." },
                { title: "Math Tools", desc: "Percentage calculators, unit converters, number utilities, and financial calculators." },
                { title: "Creator Tools", desc: "QR code generators, color pickers, palette creators, and design helpers for content creators." },
              ].map(item => (
                <div key={item.title} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "100+", label: "Free Tools" },
                { value: "50K+", label: "Monthly Users" },
                { value: "0", label: "Sign-ups Required" },
                { value: "24/7", label: "Availability" },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-5xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Our Story
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Productive Toolbox was born from a simple frustration: finding a basic online tool shouldn't require creating an account, watching ads, or paying a subscription fee.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We started with a handful of essential tools and have grown into a comprehensive platform serving thousands of users daily. Every tool is carefully designed to be fast, intuitive, and accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we continue to add new tools based on user feedback and emerging needs, always staying true to our core principles: free, fast, and privacy-focused.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary to-primary-hover py-20 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of users who trust Productive Toolbox for their daily tasks.
            </p>
            <Link
              href="/tools"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Explore All Tools →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
