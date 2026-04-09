const faqItems = [
  {
    question: "What is a list prefix and suffix tool?",
    answer:
      "A list prefix and suffix tool adds custom text before and after each line in a multi-line list automatically.",
  },
  {
    question: "Why is this tool better than basic line editors?",
    answer:
      "It combines templates, numbering controls, cleanup options, random emoji mode, undo support, and export actions in one fast workflow.",
  },
  {
    question: "Can I add both a prefix and a suffix at the same time?",
    answer:
      "Yes. You can apply both together to generate formats like bullet labels, wrapped values, or delimiter-ready lines.",
  },
  {
    question: "How does numbering work in this tool?",
    answer:
      "You can enable numbering, define a starting number, and choose separators such as dot, parenthesis, dash, or colon.",
  },
  {
    question: "What do remove empty lines and trim spaces do?",
    answer:
      "Remove empty lines drops blank rows, while trim spaces cleans leading and trailing whitespace before formatting.",
  },
  {
    question: "Can I format lists using templates like markdown and checklist?",
    answer:
      "Yes. Quick templates include markdown bullet, numbered list, checklist, quote, code comment, and CSV formatting.",
  },
  {
    question: "What is random emoji mode?",
    answer:
      "Random emoji mode decorates each line with random emoji prefix and suffix pairs for creative list output.",
  },
  {
    question: "Can I undo formatted output and return to original text?",
    answer:
      "Yes. The tool stores your original input so you can revert quickly with Undo.",
  },
  {
    question: "Can I copy or download the formatted list?",
    answer:
      "Yes. You can copy output directly or download it as a TXT file.",
  },
  {
    question: "Is my list data private?",
    answer:
      "Yes. Processing happens in your browser, so your list content is not sent to external servers for formatting.",
  },
];

const howToSteps = [
  "Paste or type list items with one item per line.",
  "Choose a quick template or enter custom prefix and suffix text.",
  "Enable optional numbering and adjust start value or separator.",
  "Apply cleanup rules such as remove empty lines and trim spaces.",
  "Copy or download the final formatted list for your workflow.",
];

const strengths = [
  {
    title: "Template-first list formatting",
    text: "Use built-in presets to convert plain lines into markdown, checklist, quote, code comment, or CSV patterns instantly.",
  },
  {
    title: "Detailed numbering control",
    text: "Set custom start numbers and separator styles to match documentation, reports, or structured exports.",
  },
  {
    title: "Input cleanup before formatting",
    text: "Remove empty rows and trim spaces so output stays clean and consistent for publishing or processing.",
  },
  {
    title: "Productive output workflow",
    text: "Use real-time conversion, undo safety, copy, and file download without leaving the page.",
  },
];

const optionGuide = [
  {
    option: "Quick Templates",
    use: "Apply markdown bullet, numbered list, checklist, quote, code comment, or CSV presets in one click.",
  },
  {
    option: "Prefix",
    use: "Add custom text to the beginning of each line, such as bullet symbols or comment markers.",
  },
  {
    option: "Suffix",
    use: "Append characters like commas, semicolons, or tags to each line automatically.",
  },
  {
    option: "Enable Numbering",
    use: "Attach sequential numbering before each formatted line.",
  },
  {
    option: "Number Start and Separator",
    use: "Control numbering format using custom start values and separator styles.",
  },
  {
    option: "Remove Empty Lines",
    use: "Exclude blank lines to prevent visual gaps in output.",
  },
  {
    option: "Trim Spaces",
    use: "Normalize extra whitespace around list items before transformation.",
  },
  {
    option: "Random Emojis",
    use: "Generate playful list output with random emoji wrappers per line.",
  },
];

const useCases = [
  {
    title: "Markdown and documentation prep",
    detail: "Convert raw lists into clean bullets, numbered steps, and checklist blocks for READMEs and docs.",
  },
  {
    title: "Code and config editing",
    detail: "Prefix lines with comments or suffix with delimiters for script, JSON-like, or config workflows.",
  },
  {
    title: "CSV-style text preparation",
    detail: "Append separators quickly when building structured line-based data.",
  },
  {
    title: "Content operations",
    detail: "Standardize list formatting for blogs, newsletters, and social publishing pipelines.",
  },
  {
    title: "Task and planning lists",
    detail: "Generate checklists and ordered steps for project management and team workflows.",
  },
  {
    title: "Bulk text cleanup",
    detail: "Trim and normalize inconsistent list input before reuse in downstream tools.",
  },
];

const mistakesToAvoid = [
  "Applying numbering and a numbering-style prefix simultaneously when only one format is needed.",
  "Leaving blank lines in place when compact output is required.",
  "Skipping trim spaces and carrying hidden spacing issues into exports.",
  "Forgetting Undo exists before re-pasting original input.",
  "Using random emoji mode for machine-readable output that expects plain text.",
];

export default function SEOContent() {
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
    name: "How to use list prefix suffix tool",
    description:
      "Paste list items, set prefix and suffix rules, apply optional numbering and cleanup, then copy or download formatted output.",
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
            List Prefix/Suffix Tool for Faster Bulk Formatting, Cleaner Output, and Better Reuse
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>List Prefix/Suffix Tool</strong> helps you add custom text before or after every line in a list instantly.
            It is useful for developers, writers, analysts, and teams that need consistent line-based formatting.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of editing lines one by one, you can apply templates, numbering, cleanup rules, and export-ready formatting in seconds.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Prefix/Suffix Editors
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
            Simple tools usually add text only. This tool adds templates, cleanup, numbering, and undo-safe workflow controls.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the List Prefix/Suffix Tool
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
            Format Lists Faster with Template Presets, Numbering Precision, and Reliable Cleanup
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With structured formatting controls, live output, and quick export support, this tool helps you process list data more efficiently than basic add-prefix utilities.
          </p>
        </section>
      </div>
    </>
  );
}
