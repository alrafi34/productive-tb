const faqItems = [
  {
    question: "What is a text to slug converter?",
    answer:
      "A text to slug converter transforms titles or phrases into clean URL-safe slugs used in blog links, product pages, and documentation URLs.",
  },
  {
    question: "Why are slugs important for SEO?",
    answer:
      "Readable slugs help search engines and users understand page context, improve URL clarity, and support better content organization.",
  },
  {
    question: "Can I convert multiple titles at once?",
    answer:
      "Yes. Bulk mode lets you convert multiple lines in one run and export results as TXT or CSV.",
  },
  {
    question: "What does remove stop words do?",
    answer:
      "It removes common filler words like 'the' or 'of' to produce shorter, cleaner, keyword-focused slugs.",
  },
  {
    question: "Can I keep or remove numbers in slugs?",
    answer:
      "Yes. You can preserve numeric values or remove them depending on your URL style policy.",
  },
  {
    question: "Does this tool handle accented characters?",
    answer:
      "Yes. Accent normalization converts characters like é or ü into URL-friendly equivalents for broader compatibility.",
  },
  {
    question: "Which separator should I choose?",
    answer:
      "Hyphen is the common SEO default, while underscore and dot are available if your platform requires them.",
  },
  {
    question: "Can I set a maximum slug length?",
    answer:
      "Yes. Use max length to enforce URL standards and keep slugs concise.",
  },
  {
    question: "Why is this better than basic slug generators?",
    answer:
      "It combines single and bulk workflows, real-time conversion, stop-word filtering, accent handling, history, and multi-format export in one interface.",
  },
  {
    question: "Is my data private when converting text to slugs?",
    answer:
      "Yes. Conversion runs in your browser, so your content is not sent to external servers.",
  },
];

const howToSteps = [
  "Choose Single Conversion or Bulk Conversion mode.",
  "Paste your title(s) or text input.",
  "Set options like stop-word removal, separator, max length, and accent handling.",
  "Generate slugs or enable real-time conversion.",
  "Copy slug, copy full URL preview, or export results as TXT/CSV.",
];

const strengths = [
  {
    title: "Single and bulk conversion workflow",
    text: "Generate one slug instantly or process many titles at scale from one interface.",
  },
  {
    title: "SEO-focused normalization controls",
    text: "Clean punctuation, normalize accents, manage stop words, and enforce separator consistency.",
  },
  {
    title: "Publishing-friendly output tools",
    text: "Use base URL preview, copy full links, and export bulk results for direct CMS upload.",
  },
  {
    title: "Faster editing and iteration",
    text: "Real-time conversion and recent slug history reduce repetitive manual URL formatting.",
  },
];

const optionGuide = [
  {
    option: "Remove Stop Words",
    use: "Drops common filler terms to create concise, keyword-focused URL slugs.",
  },
  {
    option: "Separator",
    use: "Choose hyphen, underscore, or dot based on your URL policy and platform style.",
  },
  {
    option: "Max Length",
    use: "Limits slug length to match SEO conventions or CMS constraints.",
  },
  {
    option: "Preserve Numbers",
    use: "Keep or remove numeric values depending on whether numbers add URL meaning.",
  },
  {
    option: "Remove Accents",
    use: "Normalizes accented characters for cleaner ASCII-friendly slugs.",
  },
  {
    option: "Real-time Conversion",
    use: "Automatically updates output while typing for quicker slug tuning.",
  },
];

const useCases = [
  {
    title: "Blog publishing",
    detail: "Convert article headlines into clean slugs before pushing posts live.",
  },
  {
    title: "E-commerce catalogs",
    detail: "Generate product URLs from naming patterns at scale with bulk conversion.",
  },
  {
    title: "CMS migration",
    detail: "Standardize legacy page titles into consistent permalink structures.",
  },
  {
    title: "SEO content workflows",
    detail: "Prepare readable URL paths aligned with targeted topic keywords.",
  },
  {
    title: "Documentation portals",
    detail: "Create stable, predictable slugs for guides, API pages, and knowledge bases.",
  },
  {
    title: "Editorial QA",
    detail: "Audit and normalize URL naming conventions across multiple drafts.",
  },
];

const mistakesToAvoid = [
  "Using inconsistent separators across different sections of your website.",
  "Leaving stop words in long titles that create overly verbose URLs.",
  "Setting max length too short and cutting essential keyword context.",
  "Removing numbers when version or model numbers are important for search intent.",
  "Publishing slugs without checking full URL preview against your base path.",
];

export default function TextToSlugConverterSEOContent() {
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
    name: "How to convert text to SEO-friendly slugs",
    description:
      "Choose conversion mode, configure slug options, generate output, and copy or export URL-ready slugs.",
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
            Text to Slug Converter for Cleaner URLs, Better SEO Structure, and Faster Publishing
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Text to Slug Converter</strong> helps you transform raw titles into URL-safe slugs for blogs, product pages, and documentation.
            It is designed for marketers, editors, developers, and content teams that need consistent permalink formatting.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually cleaning each URL path, you can apply rule-based conversion and generate publish-ready slugs in seconds.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Slug Generators
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
            Basic tools usually stop at simple replacement. This one supports real SEO workflows from generation to export.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Text to Slug Converter
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
            Common Slug-Formatting Mistakes to Avoid
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
            Build Better URLs with Consistent Slug Rules, Bulk Conversion, and Export-Ready Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With configurable normalization, URL preview, and multi-format export, this tool helps teams standardize permalink creation
            and improve technical SEO consistency across publishing pipelines.
          </p>
        </section>
      </div>
    </>
  );
}
