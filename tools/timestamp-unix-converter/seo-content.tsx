const faqItems = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp is the number of seconds since 00:00:00 UTC on January 1, 1970. Some systems store the same value in milliseconds for higher precision.",
  },
  {
    question: "How does this converter detect seconds vs milliseconds?",
    answer:
      "Numeric inputs with up to 11 digits are treated as seconds, and longer numeric inputs are treated as milliseconds. This avoids manual mode switching for common developer workflows.",
  },
  {
    question: "Can I convert dates to Unix timestamps too?",
    answer:
      "Yes. The date-to-Unix mode accepts standard date strings and returns both Unix seconds and Unix milliseconds instantly.",
  },
  {
    question: "Why is this better than many basic timestamp converters?",
    answer:
      "Many tools only do one-way conversion. This page includes four workflows in one place: Unix to date, date to Unix, timestamp difference, and batch conversion with multiple output formats.",
  },
  {
    question: "Does this tool support timezone checks?",
    answer:
      "Yes. It shows timezone views for UTC, GMT, New York, London, Tokyo, and Sydney so you can validate cross-region logs and schedules quickly.",
  },
  {
    question: "Is my data uploaded to a server?",
    answer:
      "No. Conversions run in your browser, so your timestamp inputs and date values are not sent to a backend for processing.",
  },
];

const howToSteps = [
  "Choose a mode: Unix to Date, Date to Unix, Compare Difference, or Batch Convert.",
  "Paste your timestamp or date input.",
  "Review converted values including UTC/local formats and developer-friendly outputs.",
  "Copy Unix seconds, milliseconds, ISO 8601, RFC 2822, or timezone values as needed.",
  "Use batch mode for multiple rows or compare mode to calculate exact time differences.",
];

export default function UnixTimestampConverterSEO() {
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
    name: "How to use the Unix Timestamp Converter",
    description:
      "Convert Unix timestamps to readable date formats, parse dates to Unix seconds and milliseconds, and compare timestamp differences.",
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

      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Unix Timestamp Converter for Fast, Accurate Epoch Conversions
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free Unix Timestamp Converter helps you convert timestamp to date and date to Unix time in seconds or milliseconds.
          It is designed for developers, testers, analysts, and support teams who need reliable epoch conversion during debugging,
          API validation, data migration, and log analysis.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Instead of opening multiple websites, you can run the full workflow in one place: detect epoch units automatically,
          view UTC and local outputs, compare two timestamps, batch convert many lines, and copy developer-ready formats like ISO 8601 and RFC 2822.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Tool Is Better Than Basic Timestamp Converters
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Four workflows in one page
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Convert Unix to date, convert date to Unix, compare timestamp differences, and process batch input without switching tools.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Auto detection for sec/ms
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The parser identifies common Unix seconds and Unix milliseconds formats automatically so conversions are faster and less error-prone.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Developer-ready outputs
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Get UTC string, local string, ISO 8601, RFC 2822, and standard date formats instantly, with quick copy actions.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Privacy-first conversion
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              All processing runs in your browser. You can validate sensitive production timestamps without sending inputs to a remote API.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Unix Time Converter
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
            <span><strong>Select conversion mode.</strong> Choose Unix to Date, Date to Unix, Compare Difference, or Batch Convert.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
            <span><strong>Enter your input.</strong> Paste a Unix value, date string, or multiple lines of timestamps based on the selected mode.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
            <span><strong>Review converted results.</strong> Inspect local time, UTC time, relative time, and standardized formats for coding and reporting.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
            <span><strong>Copy and use instantly.</strong> Copy the exact output you need for logs, scripts, SQL queries, tests, or API payloads.</span>
          </li>
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases for Epoch Conversion
        </h2>
        <div className="space-y-5 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Debugging API responses
            </h3>
            <p className="leading-relaxed">
              Decode backend timestamps quickly to confirm whether an event time from an API payload matches expected business logic.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Log and incident investigation
            </h3>
            <p className="leading-relaxed">
              Convert multiple log lines in batch mode and compare events to calculate exact gaps between failures, retries, and recoveries.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Cross-timezone collaboration
            </h3>
            <p className="leading-relaxed">
              Validate time values across UTC and major city timezones when coordinating releases, support handoffs, and global operations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Seconds vs Milliseconds Quick Reference
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            <strong>Unix seconds:</strong> 10-digit style values in most databases and APIs (example: 1700000000).
          </p>
          <p>
            <strong>Unix milliseconds:</strong> 13-digit style values in JavaScript and many frontend systems (example: 1700000000000).
          </p>
          <p>
            <strong>Convert ms to s:</strong> divide by 1000.
          </p>
          <p>
            <strong>Convert s to ms:</strong> multiply by 1000.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
