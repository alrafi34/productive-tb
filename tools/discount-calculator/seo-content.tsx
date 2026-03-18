const faqItems = [
  {
    question: "How do stacked discounts work in real stores?",
    answer:
      "Stacked discounts are applied one after another. If an item is $100, then 30% off, then 10% off, the final price is $63. This is not the same as a single 40% discount.",
  },
  {
    question: "Can I combine percentage discounts and fixed dollar discounts?",
    answer:
      "Yes. You can add both percent and fixed amount discount steps in sequence, which helps match real-world checkout logic with coupons and promo codes.",
  },
  {
    question: "Does this discount calculator include tax?",
    answer:
      "Yes. You can add an optional tax rate, and the calculator applies tax after discounts so your final total is closer to what you pay at checkout.",
  },
  {
    question: "What is reverse discount mode?",
    answer:
      "Reverse mode finds the original price when you know the sale price and one discount percentage. Example: $70 after 30% off means the original price was $100.",
  },
  {
    question: "Can I calculate many prices at once?",
    answer:
      "Yes. Batch mode accepts one price per line and applies the same discount setup to each item. You can then export the results to CSV.",
  },
  {
    question: "Is my pricing data private?",
    answer:
      "Yes. Calculations run in your browser. No price inputs, coupon values, or tax settings are sent to a server.",
  },
];

const howToSteps = [
  "Enter the original item price.",
  "Add one or more discount steps (percent or fixed amount).",
  "Optionally enter tax rate to get an estimated checkout total.",
  "Switch to reverse mode to recover original price from sale price.",
  "Use batch mode for many items and export to CSV.",
];

export default function DiscountCalculatorSEO() {
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
    name: "How to use the discount calculator",
    description:
      "Calculate sale price with stacked discounts, optional tax, reverse price lookup, and batch item processing.",
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
          Discount Calculator That Matches Real Checkout Math
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free discount calculator helps you estimate the real amount you pay after coupons, stacked promotions, and tax.
          Use it as a sale price calculator, a percent-off calculator, or a reverse discount calculator when you only know
          the final price. Results update instantly while you type.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Unlike basic one-field calculators, this tool supports mixed discount types (percentage and fixed amount), optional
          tax after discount, detailed step-by-step breakdowns, and batch mode with CSV export for shopping lists or pricing work.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Tool Is Different From Other Discount Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Real stacked coupon logic
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Apply up to five discounts one-by-one. This mirrors how online stores apply a campaign discount first, then promo codes.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Mixed discount types
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Combine percentage discounts and fixed amount reductions in the same calculation.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Tax after discount support
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Add local tax on the discounted subtotal so totals are closer to your final checkout receipt.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Reverse + batch in one page
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Find original price from sale price, or process many items at once and export results as CSV.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Calculator
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
            <span><strong>Enter original price.</strong> Start with the pre-discount amount for one item.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
            <span><strong>Add discount steps.</strong> Choose percent off or fixed amount off, and stack them in order.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
            <span><strong>Add tax if needed.</strong> The tool applies tax after discount to estimate your payable total.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
            <span><strong>Review breakdown.</strong> Check each line to understand exactly where every dollar changed.</span>
          </li>
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Quick Examples
        </h2>
        <div className="space-y-5 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Example 1: Single discount
            </h3>
            <p className="leading-relaxed">
              Original price $200, discount 25%. Final price is $150 and you save $50.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Example 2: Stacked discounts
            </h3>
            <p className="leading-relaxed">
              Original price $120, then 20% off, then $10 off. Price changes from $120 to $96 to $86.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Example 3: Discount plus tax
            </h3>
            <p className="leading-relaxed">
              Original price $80, discount 15%, tax 8%. Discounted subtotal is $68, tax is $5.44, final total is $73.44.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Discount Formula Reference
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            <strong>Percent discount:</strong> discounted price = original price x (1 - discount/100)
          </p>
          <p>
            <strong>Stacked discounts:</strong> apply each step to the current subtotal, not the original amount.
          </p>
          <p>
            <strong>Tax after discount:</strong> final total = discounted subtotal x (1 + tax/100)
          </p>
          <p>
            <strong>Reverse discount:</strong> original price = sale price / (1 - discount/100)
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
