const faqItems = [
  {
    question: "What does a GST/VAT calculator do?",
    answer:
      "A GST/VAT calculator helps you add tax to a base amount or remove tax from a tax-inclusive amount. It shows base price, tax amount, and final price instantly.",
  },
  {
    question: "What is the formula to add GST or VAT?",
    answer:
      "To add tax: Final Price = Base Price * (1 + Tax Rate/100). Tax Amount = Base Price * (Tax Rate/100).",
  },
  {
    question: "What is the formula to remove GST or VAT?",
    answer:
      "To remove tax from a tax-inclusive amount: Base Price = Final Price / (1 + Tax Rate/100). Tax Amount = Final Price - Base Price.",
  },
  {
    question: "Can I use this for both GST and VAT?",
    answer:
      "Yes. The mathematics is the same for inclusive and exclusive tax calculations. You can use this tool for GST, VAT, and similar percentage-based consumption taxes.",
  },
  {
    question: "Does this calculator support custom tax rates?",
    answer:
      "Yes. You can enter any tax rate manually and also use quick predefined rates for common GST scenarios.",
  },
  {
    question: "Why is this GST/VAT calculator better than many basic calculators?",
    answer:
      "This page combines real-time add/remove modes, predefined and custom rates, precision control, copy/export, and local history in one workflow.",
  },
  {
    question: "Can I export calculations for accounting records?",
    answer:
      "Yes. You can export the current calculation to CSV and keep a local calculation history for repeated tax checks.",
  },
  {
    question: "Are these calculations tax-compliance advice?",
    answer:
      "No. This tool is for accurate arithmetic conversion. Always verify legal tax treatment, exemptions, and jurisdiction-specific rules with official guidance.",
  },
  {
    question: "Is my calculation data private?",
    answer:
      "Yes. Calculations run in your browser and local history is stored on your device. You can clear history anytime.",
  },
  {
    question: "What should I input in Add vs Remove mode?",
    answer:
      "In Add mode, input the tax-exclusive base amount. In Remove mode, input the tax-inclusive final amount.",
  },
];

const howToSteps = [
  "Enter the price amount.",
  "Enter or select the GST/VAT rate.",
  "Choose Add Tax or Remove Tax mode.",
  "Review base amount, tax amount, and final amount instantly.",
  "Adjust decimal precision if required.",
  "Copy, save, or export the calculation as needed.",
  "Use history to reload previous scenarios quickly.",
];

const strengths = [
  {
    title: "Dual-mode workflow",
    text: "Switch between Add Tax and Remove Tax in one interface, so you can handle both tax-exclusive and tax-inclusive pricing without separate tools.",
  },
  {
    title: "Business-ready output",
    text: "Get base, tax, and final values together with precision control, making invoices, quotes, and reconciliations easier.",
  },
  {
    title: "Speed for repeated checks",
    text: "Use predefined rates, quick amounts, local history, and one-click copy/export to process repeated tax calculations faster.",
  },
  {
    title: "Clear calculation transparency",
    text: "Formula references, examples, and FAQs are included on-page, which helps users validate assumptions instead of relying on a black-box output.",
  },
];

const examples = [
  {
    title: "Example 1: Add 18% tax",
    input: "Base = 1,000, Rate = 18%",
    output: "Tax = 180, Final = 1,180",
  },
  {
    title: "Example 2: Remove 18% tax",
    input: "Final = 1,180, Rate = 18%",
    output: "Base = 1,000, Tax = 180",
  },
  {
    title: "Example 3: Add 5% tax",
    input: "Base = 20,000, Rate = 5%",
    output: "Tax = 1,000, Final = 21,000",
  },
  {
    title: "Example 4: Remove 12% tax",
    input: "Final = 5,600, Rate = 12%",
    output: "Base and tax are derived instantly by the calculator",
  },
  {
    title: "Example 5: Compare two rates",
    input: "Base = 50,000, compare 18% vs 28%",
    output: "Use quick rate buttons to evaluate impact quickly",
  },
  {
    title: "Example 6: Invoice validation",
    input: "Given final amount and rate, run Remove mode",
    output: "Verify whether base + tax matches invoice breakdown",
  },
];

const mistakesToAvoid = [
  "Using Add mode when your input already includes tax.",
  "Applying wrong tax rate category for the product/service.",
  "Rounding too early in multi-step calculations.",
  "Assuming one rate applies to all jurisdictions or items.",
  "Treating calculator output as a substitute for legal tax advice.",
];

export default function ToolSEOContent() {
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
    name: "How to use the GST VAT calculator",
    description:
      "Add or remove GST/VAT from prices using custom or predefined tax rates.",
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
            GST / VAT Calculator Online for Tax-Inclusive and Tax-Exclusive Price Conversion
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>GST/VAT Calculator</strong> helps you calculate tax amounts quickly in both directions:
            add tax to a base price or remove tax from an inclusive final price. It is useful for billing,
            quoting, bookkeeping, reconciliation, and pricing checks.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users searching for "GST calculator", "VAT calculator", "tax inclusive calculator", or
            "remove tax from price" usually need fast and reliable conversion. This page combines calculator logic,
            formulas, examples, and structured FAQ for both usability and indexing quality.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This GST/VAT Tool Is Better Than Many Basic Tax Calculators
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
            Many calculators provide only one operation. This one is built for practical tax workflows and repeat checks.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the GST / VAT Calculator
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            GST/VAT Formulas Used by the Calculator
          </h2>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`Add Tax:
Final Price = Base Price * (1 + Tax Rate/100)
Tax Amount = Base Price * (Tax Rate/100)

Remove Tax:
Base Price = Final Price / (1 + Tax Rate/100)
Tax Amount = Final Price - Base Price`}
          </pre>
          <p className="mt-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            Always follow local invoicing and rounding rules for compliance. The calculator provides mathematically correct conversion.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked GST/VAT Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {examples.map((example) => (
              <div key={example.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{example.title}</p>
                <p className="mt-1">{example.input}</p>
                <p className="mt-1 font-medium text-gray-700">{example.output}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice preparation</h3>
              <p className="text-sm leading-relaxed">Generate accurate tax-inclusive totals from pre-tax line items.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Vendor bill verification</h3>
              <p className="text-sm leading-relaxed">Reverse-calculate base values from inclusive totals to verify tax amounts.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pricing strategy</h3>
              <p className="text-sm leading-relaxed">Compare final prices under different tax rates before publishing quotes.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Accounting reconciliation</h3>
              <p className="text-sm leading-relaxed">Cross-check base, tax, and final values during monthly and quarterly review.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Mistakes to Avoid in GST/VAT Calculations
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
            Use This GST/VAT Calculator for Faster, Cleaner Tax Math
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            If you need a practical, structured, and indexing-friendly <strong>GST/VAT calculator</strong>, this page
            is built for real workflows, not just one-off arithmetic. Use it to reduce errors, speed up checks,
            and keep tax conversions consistent across invoices and pricing decisions.
          </p>
        </section>
      </div>
    </>
  );
}
