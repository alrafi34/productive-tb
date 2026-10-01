import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function PercentageCalculatorSEO() {
  const { howToSteps, faq } = toolConfig.seo;


  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Percentage Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>percentage calculator</strong> is a free online tool that solves every common
            percentage problem in one place. There are four core formulas that come up constantly —
            finding X% of a number, finding what percentage one number is of another, calculating a
            value after a percentage increase or decrease, and recovering an original value before a
            percentage was applied — and this tool handles all of them without requiring you to
            remember which equation applies to which situation.
          </p>
          <p>
            Percentage math shows up in almost every context: calculating a 20% tip on a dinner bill,
            working out the pre-VAT price from a tax-inclusive total, converting a test score of 47/60
            to a percentage, or figuring out how much a $380 product costs after a 15% discount. Each
            of these uses a different formula, and the most common errors — dividing by the wrong
            number, applying a percentage to the final value instead of the original — happen when
            people work them out without a structured tool.
          </p>
          <p>
            This <strong>percentage calculator</strong> is built for <strong>students, professionals,
            shoppers, business owners, teachers, and anyone who works with numbers</strong> regularly.
            Beyond the four basic formulas, it includes <strong>Reverse mode</strong> for recovering
            original values, <strong>Multi-Step mode</strong> for chaining sequential percentage
            changes, and <strong>Batch mode</strong> for processing entire lists with CSV export —
            all running locally in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Percentage Calculations Work
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every percentage formula is a variation of the same relationship between three quantities:
            the part, the whole, and the percentage. Knowing any two lets you calculate the third.
            The four modes in this calculator each solve for a different unknown.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">X% of Y</span> = (X ÷ 100) × Y</p>
              <p><span className="font-semibold">X is what % of Y</span> = (X ÷ Y) × 100</p>
              <p><span className="font-semibold">Increase Y by X%</span> = Y × (1 + X ÷ 100)</p>
              <p><span className="font-semibold">Decrease Y by X%</span> = Y × (1 − X ÷ 100)</p>
              <p><span className="font-semibold">Reverse (increase)</span> = final ÷ (1 + X ÷ 100)</p>
              <p><span className="font-semibold">Reverse (decrease)</span> = final ÷ (1 − X ÷ 100)</p>
            </div>
          </div>
          <p>
            Multi-Step mode chains these formulas together: each step applies its percentage to the
            output of the previous step, not to the original starting value. This correctly models
            how costs, prices, and rates behave when multiple percentage adjustments are applied
            over time, avoiding the common error of summing percentages as if they were additive.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Percentage Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(({ name: title, text: desc }, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What This Calculator Provides
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Four formula modes: % of number, what % is X of Y, increase by %, decrease by %",
                "Absolute change shown alongside the percentage result",
                "Formula displayed with each result for reference",
                "Reverse mode — find original value before a % was applied",
                "Multi-Step mode — chain increases and decreases sequentially",
                "Running value and net change shown after every step",
                "Batch mode — apply any formula to a full list at once",
                "CSV export of batch results",
                "Accepts decimals and comma-formatted numbers",
                "Results update instantly as you type",
                "100% browser-based — no server, no signup required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Tax and VAT Calculations",
              scenario:
                "A freelancer in the UK receives an invoice for £960 inclusive of 20% VAT. They need to know the pre-tax amount to record in their accounting software. They switch to Reverse mode, enter £960 and 20%, select 'was an increase', and the calculator returns £800. They also use Increase mode to double-check: £800 × 1.20 = £960. Both results confirm the correct pre-tax figure in under 10 seconds.",
            },
            {
              title: "Student Grade Calculations",
              scenario:
                "A student scores 53 out of 70 on a test. They want to know their percentage score, whether it meets the 75% pass mark, and what score out of 70 would represent exactly 75%. They use 'X is what % of Y' with 53 and 70 to get 75.71% — passing. Then 'What is X% of Y' with 75 and 70 to confirm the minimum passing score is 52.5, meaning 53 clears the threshold.",
            },
            {
              title: "Retail Pricing and Discount Verification",
              scenario:
                "A clothing retailer is marking down a $220 jacket by 30% for a weekend sale. They use Decrease mode with 220 and 30 — the sale price is $154, an absolute reduction of $66. They also check that the after-sale recovery price with a 30% mark-up on $154 does not restore the original: 154 × 1.30 = $200.20, not $220. To get back to $220 from $154, Reverse mode with $220 as target would require a 42.86% mark-up — not 30%.",
            },
            {
              title: "Commission and Bonus Calculations",
              scenario:
                "A sales manager needs to calculate quarterly bonuses for five team members. Each earns a bonus of 8.5% of their quarterly revenue. They paste five revenue figures into Batch mode, enter 8.5 as the percentage, select 'What is X% of Y', and the calculator returns all five bonus amounts simultaneously. They export to CSV and forward it to payroll without touching a spreadsheet formula.",
            },
            {
              title: "Construction Cost Estimation",
              scenario:
                "A contractor's material quote is $47,500. They need to add a 12% contingency reserve, then a 7.5% profit margin on top of the contingency-adjusted total, then confirm the final quote. They use Multi-Step mode: base $47,500, step 1 +12% = $53,200, step 2 +7.5% = $57,190. The net increase from the original quote is +20.4%. They use this figure to confirm the final invoice total before sending.",
            },
            {
              title: "Nutrition and Recipe Scaling",
              scenario:
                "A recipe that serves 4 calls for 320g of flour. A cook needs to scale it up for 7 people. First they use 'X is what % of Y' to find that 7 is 175% of 4. Then they use 'What is X% of Y' with 175 and 320g to get 560g. They also check the olive oil: 45ml × 1.75 = 78.75ml. Both calculations use the same Basic mode with different inputs — no mental arithmetic required.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Percentage Formula Reference
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Equation</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["What is X% of Y",          "(X ÷ 100) × Y",             "15% of 200 = 30"],
                ["X is what % of Y",         "(X ÷ Y) × 100",             "45 of 180 = 25%"],
                ["Increase Y by X%",         "Y × (1 + X ÷ 100)",         "200 + 15% = 230"],
                ["Decrease Y by X%",         "Y × (1 − X ÷ 100)",         "200 − 15% = 170"],
                ["Reverse after increase",   "final ÷ (1 + X ÷ 100)",     "$230 ÷ 1.15 = $200"],
                ["Reverse after decrease",   "final ÷ (1 − X ÷ 100)",     "$170 ÷ 0.85 = $200"],
                ["Absolute change",          "result − original",          "230 − 200 = 30"],
              ].map(([formula, equation, example]) => (
                <tr key={formula} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-xs text-primary uppercase tracking-wide">{formula}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-800">{equation}</td>
                  <td className="py-2 px-3 font-mono text-xs text-green-600">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Common Percentage Values — Quick Reference
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Percentage</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">As a decimal</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">As a fraction</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Of $500</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5%",   "0.05",  "1/20",  "$25"],
                ["10%",  "0.10",  "1/10",  "$50"],
                ["12.5%","0.125", "1/8",   "$62.50"],
                ["15%",  "0.15",  "3/20",  "$75"],
                ["20%",  "0.20",  "1/5",   "$100"],
                ["25%",  "0.25",  "1/4",   "$125"],
                ["33.3%","0.333", "1/3",   "$166.50"],
                ["50%",  "0.50",  "1/2",   "$250"],
                ["75%",  "0.75",  "3/4",   "$375"],
                ["100%", "1.00",  "1/1",   "$500"],
              ].map(([pct, dec, frac, of500]) => (
                <tr key={pct} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary">{pct}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{dec}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-600">{frac}</td>
                  <td className="py-2 px-3 font-mono text-xs text-green-600">{of500}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Multi-Step Compounding Reference — $100 Base
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Scenario</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Naive sum</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Actual result</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Final value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["+5% × 6 months",          "+30%",  "+34.01%", "$134.01"],
                ["+10% × 3 steps",          "+30%",  "+33.1%",  "$133.10"],
                ["+20% then −20%",          "0%",    "−4%",     "$96"],
                ["+10% then −10%",          "0%",    "−1%",     "$99"],
                ["−10% × 3 steps",          "−30%",  "−27.1%",  "$72.90"],
                ["+25% then +25% then −25%","25%",   "+17.19%", "$117.19"],
              ].map(([scenario, naive, actual, final]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-800">{scenario}</td>
                  <td className="py-2 px-3 text-xs text-gray-500 line-through">{naive}</td>
                  <td className="py-2 px-3 font-mono text-xs font-semibold text-primary">{actual}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * Naive sum = arithmetic addition of percentages. Actual result = correct compounded calculation. Always use Multi-Step mode for chained changes.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
