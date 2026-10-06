import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const comparisonPoints = [
  {
    title: "Real-time workflow",
    text: "Results refresh immediately while you edit values, so you can compare scenarios quickly.",
  },
  {
    title: "Built-in time conversion",
    text: "You can calculate with years, months, or days without manual formula conversion.",
  },
  {
    title: "Practical output controls",
    text: "Use precision options, copy summary text, and save recent calculations.",
  },
  {
    title: "Single-page clarity",
    text: "Formula, examples, and FAQ are available with the calculator so users can verify assumptions fast.",
  },
];

export default function ToolSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Simple Interest Calculator Online for Loans, Savings, and Quick Financial Estimates
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Simple Interest Calculator</strong> helps you estimate interest amount and total payable amount
            using principal, annual rate, and time. It is useful for students, borrowers, freelancers, small business users,
            and anyone who needs fast planning without spreadsheet setup.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Many users search for terms like interest calculator, loan interest calculator, or savings interest calculator.
            This page addresses those intents by combining instant results, clear formulas, and practical usage guidance in one place.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Simple Interest Tool Is Better Than Typical Calculators
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {comparisonPoints.map((point) => (
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
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Simple Interest Calculator
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map(({ text: step }, index) => (
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
            Formula Reference and Unit Conversion
          </h2>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`SI = (P * R * T) / 100
A = P + SI

P = Principal amount
R = Annual interest rate (%)
T = Time in years
SI = Simple interest
A = Total amount`}
          </pre>
          <div className="mt-4 text-sm text-gray-600 space-y-2" style={{ fontFamily: "var(--font-body)" }}>
            <p><strong>Months conversion:</strong> T = months / 12</p>
            <p><strong>Days conversion:</strong> T = days / 365</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 1:</strong> P = 1000, R = 5%, T = 3 years</p>
              <p className="mt-1">SI = 150, Total = 1150</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 2:</strong> P = 5000, R = 8%, T = 18 months</p>
              <p className="mt-1">T = 1.5 years, SI = 600, Total = 5600</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 3:</strong> P = 2500, R = 6%, T = 180 days</p>
              <p className="mt-1">T = 0.493 years, SI is computed instantly by the tool</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 4:</strong> P = 12000, R = 10%, T = 1 year</p>
              <p className="mt-1">SI = 1200, Total = 13200</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Personal loan estimates</h3>
              <p className="text-sm leading-relaxed">Check rough borrowing cost before accepting a simple-interest loan agreement.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Savings return planning</h3>
              <p className="text-sm leading-relaxed">Estimate basic interest earned over fixed periods without compounding assumptions.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Academic learning</h3>
              <p className="text-sm leading-relaxed">Verify classroom math and practice formula-based problems quickly.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Small business projections</h3>
              <p className="text-sm leading-relaxed">Estimate short-term financing cost or simple return scenarios for planning.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-5" style={{ fontFamily: "var(--font-body)" }}>
            Note: This tool provides planning estimates. Actual financial products may include fees, taxes, or different day-count conventions.
          </p>
        </section>

        <ToolFaq items={faq} />
      </div>
    </>
  );
}
