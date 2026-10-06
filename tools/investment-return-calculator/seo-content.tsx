import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Real-time scenario testing",
    text: "Results update immediately as you edit values, so you can evaluate multiple what-if cases faster than with static ROI forms.",
  },
  {
    title: "Calculation history and CSV export",
    text: "You can store recent ROI calculations and export them, making this more useful for repeat analysis than one-off calculators.",
  },
  {
    title: "Precision and formatting control",
    text: "Choose decimal precision and currency symbol to match your reporting style for investment notes, portfolio reviews, or client communication.",
  },
  {
    title: "Built for practical decision making",
    text: "This page includes examples, formula reference, and common pitfalls so users can validate assumptions instead of relying on a single output number.",
  },
];

const examples = [
  {
    title: "Example 1: Stock position gain",
    input: "Initial = $2,500, Current = $3,100",
    output: "Gain = $600, ROI = 24%",
  },
  {
    title: "Example 2: Crypto drawdown",
    input: "Initial = $8,000, Current = $5,600",
    output: "Loss = $2,400, ROI = -30%",
  },
  {
    title: "Example 3: Real estate estimate",
    input: "Initial = $180,000, Current = $225,000",
    output: "Gain = $45,000, ROI = 25%",
  },
  {
    title: "Example 4: Business campaign",
    input: "Initial = $15,000, Current = $18,750",
    output: "Gain = $3,750, ROI = 25%",
  },
  {
    title: "Example 5: ETF portfolio check",
    input: "Initial = $12,000, Current = $13,140",
    output: "Gain = $1,140, ROI = 9.5%",
  },
  {
    title: "Example 6: Product launch miss",
    input: "Initial = $6,000, Current = $4,800",
    output: "Loss = $1,200, ROI = -20%",
  },
];

const mistakesToAvoid = [
  "Comparing ROI percentages without considering holding period.",
  "Ignoring transaction fees, taxes, and management costs.",
  "Using estimated current value instead of realistic market value.",
  "Evaluating high-risk and low-risk assets with ROI alone.",
  "Assuming a single-period ROI guarantees future performance.",
];

export default function ToolSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Investment Return (ROI) Calculator Online for Fast, Accurate Gain/Loss Analysis
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Investment Return Calculator</strong> helps you measure performance with two essential outputs:
            absolute gain/loss and ROI percentage. Whether you need a <strong>stock ROI calculator</strong>,
            <strong> crypto ROI calculator</strong>, or a quick return-on-investment check for a business project,
            this tool gives instant and consistent results.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users searching for "ROI calculator", "investment return calculator", "gain loss calculator", or
            "return on investment formula" usually want speed and clarity. This page combines calculator output,
            formula explanation, scenario testing, history, and export in one place for better decision support.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This ROI Calculator Is Better Than Many Basic Online Alternatives
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
            In short: many ROI tools only output a single number. This page is designed for planning workflow,
            documentation, and repeat comparison.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Investment ROI Calculator
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
            ROI Formula and Interpretation Guide
          </h2>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`Gain/Loss = Current Value - Initial Investment
ROI (%) = (Gain/Loss / Initial Investment) * 100`}
          </pre>
          <div className="mt-5 grid md:grid-cols-3 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p className="font-semibold text-gray-900 mb-1">ROI &gt; 0</p>
              <p>Investment is in profit.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p className="font-semibold text-gray-900 mb-1">ROI = 0</p>
              <p>Break-even (no gain, no loss).</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p className="font-semibold text-gray-900 mb-1">ROI &lt; 0</p>
              <p>Investment is at a loss.</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
            Note: ROI alone does not include time. Add the holding period to see the annualized return (CAGR) as well.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked ROI Examples for Real Scenarios
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
            ROI vs Other Common Financial Metrics
          </h2>
          <div className="space-y-4 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>ROI vs Simple Interest</h3>
              <p className="text-sm leading-relaxed">
                ROI measures overall return between two values. Simple interest estimates interest earned/paid from principal,
                rate, and time, usually without compounding.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>ROI vs Compound Growth</h3>
              <p className="text-sm leading-relaxed">
                ROI gives a final percentage change. Compound growth models time-based reinvestment, where returns generate
                additional returns over multiple periods.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>ROI vs Profit Margin</h3>
              <p className="text-sm leading-relaxed">
                Profit margin is profit as a share of revenue. ROI is profit/loss as a share of invested capital.
                Both matter, but they answer different business questions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common ROI Calculation Mistakes to Avoid
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
            Who Should Use This Investment Return Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Individual investors</h3>
              <p className="text-sm leading-relaxed">Track stocks, ETFs, and crypto positions quickly without spreadsheet setup.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Freelancers and founders</h3>
              <p className="text-sm leading-relaxed">Estimate returns on software, ads, equipment, or marketing investments.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Students and educators</h3>
              <p className="text-sm leading-relaxed">Use examples and formula blocks to learn return on investment concepts.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analysts and advisors</h3>
              <p className="text-sm leading-relaxed">Run quick scenario checks before deeper modeling in spreadsheets or reports.</p>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Use This Free ROI Calculator to Compare Investments With More Confidence
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            If you need a practical, indexing-friendly, and user-focused <strong>return on investment calculator</strong>,
            this page is built to do more than basic math. It combines instant ROI calculations, explainable formulas,
            repeatable scenario tracking, and export-ready workflow so you can evaluate opportunities with clearer context.
          </p>
        </section>
      </div>
    </>
  );
}
