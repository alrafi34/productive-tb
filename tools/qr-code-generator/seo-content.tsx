const faqItems = [
  {
    question: "What is a QR code generator?",
    answer:
      "A QR code generator creates scannable QR images from content such as URLs, text, WiFi credentials, phone numbers, and contact details.",
  },
  {
    question: "Why is this QR code generator better than basic alternatives?",
    answer:
      "It combines smart input detection, live preview, size control, error correction options, color customization, and instant PNG export in one workflow.",
  },
  {
    question: "What data types can I encode?",
    answer:
      "You can encode website URLs, plain text, email addresses, phone numbers, WiFi credentials, and similar short structured strings.",
  },
  {
    question: "What are QR error correction levels?",
    answer:
      "Error correction levels determine scan recovery if part of the code is damaged. Higher levels improve resilience but make the code denser.",
  },
  {
    question: "Which error correction level should I choose?",
    answer:
      "Medium is a practical default for most digital and print use. Higher levels are useful when codes may be partially obscured or printed in rough environments.",
  },
  {
    question: "Can I customize QR colors safely?",
    answer:
      "Yes. Use strong foreground-to-background contrast for reliable scanning and avoid overly decorative low-contrast combinations.",
  },
  {
    question: "Do static QR codes expire?",
    answer:
      "No. Static QR codes do not expire, but they depend on the underlying content remaining available, such as a URL staying online.",
  },
  {
    question: "Is this useful for marketing and print materials?",
    answer:
      "Yes. It works for flyers, menus, product packaging, event materials, posters, and social campaigns.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes. The QR Code Generator is free without registration.",
  },
  {
    question: "Does this tool upload my data?",
    answer:
      "No. QR generation runs client-side in your browser, helping keep your input private.",
  },
];

const howToSteps = [
  "Enter your URL, text, WiFi, email, or phone content.",
  "Adjust code size, error correction level, and colors.",
  "Review the live preview and scan-test before sharing.",
  "Download the QR code as PNG or copy it to clipboard.",
  "Use the file in web pages, print materials, or product assets.",
];

const strengths = [
  {
    title: "Fast end-to-end workflow",
    text: "Generate, customize, test, and export QR codes in one interface without extra steps.",
  },
  {
    title: "Smart content support",
    text: "Handle multiple input types with practical defaults for creator and business use cases.",
  },
  {
    title: "Print and digital ready",
    text: "Fine size control and error correction options help you produce reliable codes for different mediums.",
  },
  {
    title: "Privacy-first processing",
    text: "Client-side generation keeps encoded content local while maintaining speed and convenience.",
  },
];

const correctionGuide = [
  {
    level: "Low (L)",
    capacity: "~7% recovery",
    usage: "Use when code area is clean and max data capacity is preferred.",
  },
  {
    level: "Medium (M)",
    capacity: "~15% recovery",
    usage: "Balanced choice for most websites, menus, and social uses.",
  },
  {
    level: "Quartile (Q)",
    capacity: "~25% recovery",
    usage: "Better for printed surfaces with moderate risk of wear.",
  },
  {
    level: "High (H)",
    capacity: "~30% recovery",
    usage: "Useful for harsher conditions where scan reliability is critical.",
  },
];

const useCases = [
  {
    title: "Restaurant and cafe menus",
    detail: "Link printed table cards to digital menus for fast and touch-friendly access.",
  },
  {
    title: "Event registrations and tickets",
    detail: "Share check-in links, schedules, and contact pages through printed invites.",
  },
  {
    title: "Product packaging",
    detail: "Add scannable links for instructions, specs, warranty pages, or reviews.",
  },
  {
    title: "Business cards and profiles",
    detail: "Encode vCard links, portfolio pages, or social profiles for instant connection.",
  },
  {
    title: "WiFi access sharing",
    detail: "Create quick-connect WiFi QR codes for offices, events, and guest networks.",
  },
  {
    title: "Campaign tracking pages",
    detail: "Route offline traffic to dedicated landing pages for promotions and launches.",
  },
];

const mistakesToAvoid = [
  "Using low-contrast colors that reduce scan reliability.",
  "Encoding very long content and creating overly dense QR codes.",
  "Printing codes too small for expected scanning distance.",
  "Skipping real-device scan testing before distribution.",
  "Placing codes over busy backgrounds without clear quiet space.",
];

export default function QRCodeGeneratorSEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the QR Code Generator",
    description:
      "Create QR codes for URLs, text, WiFi, email, or phone content, customize settings, and export PNG output for print or digital use.",
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            QR Code Generator for Faster Sharing, Better Scanning, and Cleaner Workflow
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>QR Code Generator</strong> helps you create scannable codes for web and offline use in seconds.
            It is built for creators, businesses, and marketers who need reliable QR output without complex setup.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            You can generate QR codes for URLs, text, contact details, and WiFi data, then customize size and correction
            settings for real-world deployment.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Alternatives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((point) => (
              <div key={point.title} className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-5" style={{ fontFamily: "var(--font-body)" }}>
            Many generators only output a basic code. This tool focuses on practical scan reliability and production usage.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the QR Code Generator
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map((step, index) => (
              <li key={step} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Error Correction Level Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {correctionGuide.map((item) => (
              <div key={item.level} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.level}</p>
                <p className="mt-1 font-medium text-gray-700">{item.capacity}</p>
                <p className="mt-1">{item.usage}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Practical Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {useCases.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Mistakes to Avoid with QR Codes
          </h2>
          <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {mistakesToAvoid.map((mistake) => (
              <li key={mistake} className="flex items-start gap-3">
                <span className="mt-1 text-red-500">-</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Publish Reliable QR Codes with Better Scan Performance and Less Rework
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live preview, correction controls, and export-ready outputs, this tool helps teams create dependable
            QR assets for digital campaigns, physical products, and day-to-day operations.
          </p>
        </section>
      </div>
    </>
  );
}
