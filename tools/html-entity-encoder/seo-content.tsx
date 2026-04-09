const faqItems = [
  {
    question: "What is an HTML entity encoder and decoder?",
    answer:
      "It converts special HTML characters into safe entity codes and can also decode entity codes back to readable text.",
  },
  {
    question: "Why is this tool better than basic HTML entity converters?",
    answer:
      "It supports encode, decode, and auto-detect modes, three entity formats, live conversion, history, export, and keyboard shortcuts in one workflow.",
  },
  {
    question: "What characters are encoded by default?",
    answer:
      "Core special characters include ampersand, less-than, greater-than, double quote, and single quote.",
  },
  {
    question: "What is the difference between named, decimal, and hex entities?",
    answer:
      "Named entities use labels like amp and lt, decimal entities use numeric codes, and hex entities use hexadecimal numeric codes.",
  },
  {
    question: "What does auto mode do in this tool?",
    answer:
      "Auto mode detects whether input already contains entities and decides whether to decode or encode accordingly.",
  },
  {
    question: "Can I decode mixed entity formats in one input?",
    answer:
      "Yes. The decoder handles named, decimal, and hex entity patterns in the same text.",
  },
  {
    question: "Does this tool support large text?",
    answer:
      "Yes. It uses debounced transformation for larger inputs to keep interaction responsive.",
  },
  {
    question: "Can I copy, export, and re-use results quickly?",
    answer:
      "Yes. You can copy output instantly and export transformed text as a TXT file.",
  },
  {
    question: "Does this tool keep conversion history?",
    answer:
      "Yes. It stores a recent local history list so you can reload previous transformations.",
  },
  {
    question: "Is my text private while using this tool?",
    answer:
      "Yes. Processing is client-side in your browser and does not require server-side conversion.",
  },
];

const howToSteps = [
  "Paste raw HTML text or entity-encoded text into the input panel.",
  "Choose mode: Encode, Decode, or Auto detect.",
  "Select entity type: Named, Decimal, or Hex for encoding output.",
  "Review transformed output, entity counts, and detected mode details.",
  "Copy output, export as TXT, or swap panels for follow-up conversion.",
];

const strengths = [
  {
    title: "Three conversion modes in one interface",
    text: "Run manual encode/decode or use smart auto detection without switching tools.",
  },
  {
    title: "Multiple entity formats",
    text: "Generate named, decimal, or hex entity output depending on your integration needs.",
  },
  {
    title: "Fast operational workflow",
    text: "Use swap, copy, export, and keyboard shortcuts for repetitive encoding tasks.",
  },
  {
    title: "Local history and privacy-first behavior",
    text: "Keep recent transformations locally and process text entirely in browser context.",
  },
];

const optionGuide = [
  {
    option: "Encode Mode",
    use: "Convert special HTML characters into entity-safe output.",
  },
  {
    option: "Decode Mode",
    use: "Turn entity codes back into readable symbols and text.",
  },
  {
    option: "Auto Mode",
    use: "Auto-detect whether input should be encoded or decoded.",
  },
  {
    option: "Named Entities",
    use: "Produce readable entity tokens commonly used in templates and markup output.",
  },
  {
    option: "Decimal Entities",
    use: "Generate numeric decimal entity codes for compatibility workflows.",
  },
  {
    option: "Hex Entities",
    use: "Generate hexadecimal entity forms for low-level or parser-specific use cases.",
  },
  {
    option: "History Panel",
    use: "Review and reload prior transformations quickly.",
  },
  {
    option: "Swap and Export",
    use: "Reverse direction instantly or export output as TXT for downstream tasks.",
  },
];

const useCases = [
  {
    title: "Escaping HTML in CMS and forms",
    detail: "Convert user-provided markup-sensitive text into safer display representations.",
  },
  {
    title: "Template and frontend debugging",
    detail: "Inspect encoded output and decode payloads while diagnosing rendering issues.",
  },
  {
    title: "API and JSON payload preparation",
    detail: "Encode markup-sensitive fragments before embedding in structured text responses.",
  },
  {
    title: "Documentation and tutorials",
    detail: "Show literal HTML examples in guides without the browser interpreting tags.",
  },
  {
    title: "Migration and cleanup tasks",
    detail: "Decode legacy entity content or normalize mixed entity styles.",
  },
  {
    title: "Security hygiene workflows",
    detail: "Use encoding as one layer of output escaping in broader sanitization strategies.",
  },
];

const mistakesToAvoid = [
  "Relying on encoding alone as complete XSS protection without context-aware sanitization.",
  "Encoding content multiple times and creating unreadable double-escaped output.",
  "Using the wrong entity format for your target parser or rendering environment.",
  "Skipping decode checks when troubleshooting broken text from external sources.",
  "Forgetting auto mode may switch direction based on detected entity patterns.",
];

export default function HTMLEntityEncoderSEOContent() {
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
    name: "How to use the HTML entity encoder and decoder",
    description:
      "Paste text, choose mode and entity type, transform content, then copy, export, or swap results.",
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

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            HTML Entity Encoder / Decoder for Reliable Escaping, Fast Decoding, and Safer Content Workflows
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>HTML Entity Encoder / Decoder</strong> helps you convert special HTML characters into safe entities and decode entities back into readable text.
            It is useful for frontend developers, technical writers, CMS operators, and anyone working with markup-sensitive strings.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of juggling separate utilities, you can encode, decode, auto-detect, track history, and export output in one streamlined tool.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic HTML Entity Tools
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
            Basic converters often only encode one format. This tool supports multi-format conversion plus operational utilities.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the HTML Entity Encoder / Decoder
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
            Option Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {optionGuide.map((item) => (
              <div key={item.option} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.option}</p>
                <p className="mt-1">{item.use}</p>
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
            Common Mistakes to Avoid
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
            Encode and Decode HTML Entities Faster with Multi-Mode Control and Local History
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With auto detection, format flexibility, and export-ready output, this tool supports safer and more efficient text handling than minimal one-direction entity encoders.
          </p>
        </section>
      </div>
    </>
  );
}
