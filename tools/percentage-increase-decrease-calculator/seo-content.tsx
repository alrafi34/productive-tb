export default function PercentageIncreaseDecreaseSEO() {
  const faqItems = [
    {
      q: "What is percentage change and how is it calculated?",
      a: "Percentage change measures how much a value has grown or shrunk relative to its original amount, expressed as a percentage. The formula is ((new value − old value) ÷ |old value|) × 100. A positive result means an increase; a negative result means a decrease. For example, a price rising from $80 to $100 is a 25% increase, while a price falling from $100 to $80 is a 20% decrease — notice the direction matters for which number goes in the denominator.",
    },
    {
      q: "Why is a 20% increase followed by a 10% decrease not a net 10% increase?",
      a: "Because each percentage is applied to a different base value. Starting at 100, a 20% increase brings you to 120. Then a 10% decrease is applied to 120 — not to 100 — removing 12 and landing at 108. The net change from 100 to 108 is only +8%, not +10%. This compounding effect is why Multi-Step mode shows the running value at each stage rather than summing the percentages.",
    },
    {
      q: "How do I find the original value from a final value and a percentage change?",
      a: "Use the reverse percentage formula: original = final ÷ (1 + percent ÷ 100). If a price after a 25% increase is $125, the original is $125 ÷ 1.25 = $100. For a decrease, use original = final ÷ (1 − percent ÷ 100). If a discounted price of $90 reflects a 10% discount, the original is $90 ÷ 0.90 = $100. The Reverse mode in this calculator handles both directions automatically.",
    },
    {
      q: "What is the difference between percentage change and percentage difference?",
      a: "Percentage change measures a directional change from a specific starting point — it assumes one value is the 'before' and one is the 'after'. Percentage difference, by contrast, compares two values without implying direction and uses their average as the denominator: ((|A − B|) ÷ ((A + B) ÷ 2)) × 100. Use percentage change when the sequence matters (price yesterday vs today) and percentage difference when comparing two neutral quantities (two test scores).",
    },
    {
      q: "What happens when the old value is zero?",
      a: "Percentage change from zero is mathematically undefined — division by zero has no meaningful result. This calculator detects a zero old value and reports the result as undefined rather than returning infinity or an incorrect number. In practice, if your starting value is zero, you likely want to express the change as an absolute difference rather than a percentage.",
    },
    {
      q: "How does the batch percentage calculator work?",
      a: "Batch mode accepts a list of numbers, one per line, and calculates the percentage change between each consecutive pair. If you paste five monthly revenue figures, the tool returns four transitions — month 1 to 2, month 2 to 3, and so on — each showing absolute change, percentage change, and direction. The full batch output can be exported as a CSV file for use in spreadsheets or reports.",
    },
    {
      q: "Can I simulate multiple price increases and decreases in sequence?",
      a: "Yes. Multi-Step mode lets you add any number of increase or decrease steps and applies each one to the running value from the previous step. This is useful for modelling a product price that receives a 15% supplier increase, then a 10% seasonal discount, then a further 5% markup — the tool shows the value after each stage and the cumulative net percentage change from the original.",
    },
    {
      q: "What is the difference between this tool and the percentage calculator?",
      a: "This tool specialises in change analysis: comparing an old value to a new value to measure growth or decline. The percentage calculator is broader, solving four formula types including 'what is X% of Y', 'X is what percent of Y', and reverse percentage problems as well as change calculations. Use this tool when your question is specifically about how much something changed between two points.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. The values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export generates the file locally on your device without any server-side processing.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the old and new values", "Type your starting value in the Old Value field and your ending value in the New Value field. The calculator instantly returns the percentage change, absolute difference, and direction — increase in green or decrease in red. The fields accept decimals and comma-formatted numbers."],
    ["Read the percent change result", "The main result shows the percentage change to two decimal places, the absolute difference between the two values, and a direction label. A positive percentage means the new value is higher; a negative percentage means it is lower. The visual arrow confirms direction at a glance."],
    ["Use Reverse mode to find the original value", "Switch to Reverse mode when you know the final value and the percentage change but need the starting value. Enter the final amount and the percentage change, select whether it was an increase or decrease, and the calculator returns the original value using the formula: original = final ÷ (1 ± percent ÷ 100)."],
    ["Simulate multi-step changes", "Switch to Multi-Step mode and enter a base value. Add increase or decrease steps one at a time — each step is applied to the value produced by the previous step. The running total and net percentage from the original are shown after every step, making compounding effects clear."],
    ["Run batch analysis on a list of values", "Switch to Batch mode and paste your numbers — one per line. The calculator processes every consecutive pair and returns the percentage change for each transition. Use this for month-over-month revenue data, weekly traffic figures, or any time-series where you need all changes at once."],
    ["Export results to CSV", "After running a batch calculation, click Export CSV to download the results as a spreadsheet-ready file. Each row contains the from-value, to-value, absolute change, percentage change, and direction label."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Percentage Increase/Decrease Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>percentage increase/decrease calculator</strong> is a free online tool that measures
            exactly how much a value has grown or shrunk between two points, expressed as a percentage
            of the original. It answers the question most people actually need answered:{" "}
            <em>by how much did this change, and was it an increase or a decrease?</em>
          </p>
          <p>
            The basic formula sounds simple — ((new − old) ÷ old) × 100 — but getting it right in
            practice trips people up constantly. The denominator must always be the original value, not
            the new one. Negative numbers need absolute values in the denominator. Compound changes across
            multiple steps cannot be summed — they must be applied sequentially. And &quot;the original&quot; cannot
            be recovered by simply reversing the arithmetic without using the correct inverse formula.
            This calculator handles all of those cases without requiring you to think about them.
          </p>
          <p>
            Built for <strong>business analysts, eCommerce sellers, finance professionals, students, and
            anyone tracking how numbers move over time</strong>, this tool goes beyond a single result.
            It includes <strong>reverse percentage lookup</strong> to recover original values,{" "}
            <strong>multi-step simulation</strong> to model compounded changes across multiple stages,{" "}
            <strong>batch mode</strong> to process an entire list of values at once, and{" "}
            <strong>CSV export</strong> for moving results directly into spreadsheets — all calculated
            locally in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Percentage Change Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every mode in this calculator derives from one core formula, with variations for direction
            and compounding. The standard percent change uses the original value as the denominator —
            not the average of the two, and not the new value.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Percent change</span> = ((new − old) ÷ |old|) × 100</p>
              <p><span className="font-semibold">Absolute change</span> = new value − old value</p>
              <p><span className="font-semibold">Reverse (increase)</span> = final ÷ (1 + percent ÷ 100)</p>
              <p><span className="font-semibold">Reverse (decrease)</span> = final ÷ (1 − percent ÷ 100)</p>
              <p><span className="font-semibold">Multi-step</span> = apply each % to the running value, not the base</p>
            </div>
          </div>
          <p>
            The absolute value in the denominator (|old|) ensures the formula works correctly when
            the original value is negative — a revenue loss changing from −$200 to −$100 is a 50%
            improvement, not −50%. Multi-step mode applies each percentage to the value produced by
            the previous step, so a 20% increase on 100 gives 120, and a subsequent 10% decrease is
            applied to 120 to give 108 — the net change is +8%, not +10%.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Percentage Change Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
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
                "Percentage change — increase or decrease — to 2 decimal places",
                "Absolute difference between old and new values",
                "Direction indicator: green for increase, red for decrease",
                "Reverse mode — recover original value from final + percent",
                "Multi-step simulation with running value after each stage",
                "Net percentage change across all steps combined",
                "Batch mode — process a full list of values at once",
                "Per-row change: from, to, absolute diff, percent, direction",
                "CSV export of full batch results",
                "Accepts comma-formatted numbers and decimals",
                "100% browser-based — no data sent to any server",
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
              title: "eCommerce Seller — Pricing a Sale",
              scenario:
                "A Shopify seller lists a product at $149. After a flash sale at $99, they want to know how deep the discount was and what the price would need to be after the sale ends to recover their original 40% margin. They enter $149 as old value and $99 as new value — the calculator returns −33.56% change. Then they switch to Reverse mode, enter $99 and −33.56%, and confirm the original was $149. All in under 20 seconds.",
            },
            {
              title: "Financial Analyst — Portfolio Performance",
              scenario:
                "An analyst tracks a fund's quarterly NAV: $104.20, $108.75, $103.40, $112.60, $109.85. They paste all five values into Batch mode and instantly see four quarter-over-quarter percentage changes — Q1 +4.37%, Q2 −4.93%, Q3 +8.90%, Q4 −2.44% — with direction indicators and absolute changes per row. They export to CSV and paste directly into their performance deck.",
            },
            {
              title: "HR Manager — Annual Salary Review",
              scenario:
                "A manager needs to verify that a proposed salary adjustment from $58,000 to $64,500 represents the 11% increase approved in the budget. They enter 58000 as old and 64500 as new — the calculator returns +11.21%. The increase is within the approved band. They copy the result into the offer letter for documentation.",
            },
            {
              title: "Marketing Team — Year-Over-Year Traffic",
              scenario:
                "A digital marketing team compares monthly organic sessions: last year's November was 42,300; this year's is 61,800. They enter the two values and get +46.10% growth year-over-year with an absolute increase of 19,500 sessions. They also check whether a compounded 15% quarterly growth target from a base of 35,000 would have reached 61,800 by Q4 — using Multi-Step mode with four 15% increase steps, the result is 61,148. Close enough to confirm the trajectory.",
            },
            {
              title: "Retailer — Multi-Stage Cost Modelling",
              scenario:
                "A wholesale buyer's cost for a product is $45 per unit. Their supplier announces a 12% raw material increase, then the shipping company adds an 8% surcharge, then a currency adjustment adds another 3%. The buyer uses Multi-Step mode with base 45, +12%, +8%, +3% — the running values show $50.40, $54.43, $56.06, and a net increase of +24.6% from the original $45. They use this figure to decide whether to renegotiate or adjust retail pricing.",
            },
            {
              title: "Student — Checking Exam Score Change",
              scenario:
                "A student scored 62 on a midterm and 79 on the final. They want to know the percentage improvement for their portfolio and whether it meets their professor's stated threshold of a 25% improvement. They enter 62 and 79 — the result is +27.42%, which clears the 25% threshold. They also reverse-check: to achieve exactly 25% improvement from 62, they would have needed a score of 77.5, confirming the actual result of 79 exceeds the target.",
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

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Always enter values in chronological order — old value first, new value second. The formula uses old value as the denominator, so swapping them changes both the sign and the magnitude of the result.",
                "Use Multi-Step mode instead of mentally adding percentages. A 10% increase and a 10% decrease do not cancel out — the net result is −1%. Multi-Step mode shows you exactly where the running value lands after each stage.",
                "For price recovery after a discount, Reverse mode is faster than re-entering changed values. Enter the discounted price and the discount percentage, select 'decrease', and the calculator returns the full original price — useful for checking vendor invoices or MSRP compliance.",
                "When running Batch mode on a monthly dataset, put values in oldest-to-newest order. Each row shows the change from the previous entry, so the output reads like a time series with a direction for each period.",
                "The absolute change column in Batch output is often more actionable than the percentage alone. A 50% increase on a $2 item is $1; a 5% increase on a $10,000 line item is $500. Export to CSV and sort by absolute change to find what actually moved the needle.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Common Mistakes to Avoid
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use the new value as the denominator. A price rising from $80 to $100 is a 25% increase (20 ÷ 80 × 100), not a 20% increase (20 ÷ 100 × 100). The base is always the original value — this is the single most common percentage change error.",
                "Don't add percentages across multiple steps. Three sequential 10% increases do not equal a 30% increase — they equal a 33.1% net increase (1.1³ = 1.331). Use Multi-Step mode to get the accurate cumulative figure.",
                "Don't confuse percentage change with percentage difference. Percentage change assumes a direction and uses one specific value as the base. Percentage difference is symmetric and uses the average of both values. They answer different questions.",
                "Don't enter a zero as the old value. Percentage change from zero is mathematically undefined — no percentage of nothing gives you something. If your starting baseline was zero, express the change as an absolute number instead.",
                "Don't assume a big percentage signals a big absolute change. A 200% increase on a base of $5 is only $10. Always check the absolute change column alongside the percentage to understand real-world impact.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Percentage Change Formula Reference
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Calculation</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Percent increase",        "((new − old) ÷ old) × 100",           "$80 → $100 = +25%"],
                ["Percent decrease",        "((old − new) ÷ old) × 100",           "$100 → $80 = −20%"],
                ["General percent change",  "((new − old) ÷ |old|) × 100",         "Works for negatives too"],
                ["Absolute change",         "new − old",                            "$100 − $80 = $20"],
                ["Reverse (after increase)","final ÷ (1 + percent ÷ 100)",         "$125 ÷ 1.25 = $100"],
                ["Reverse (after decrease)","final ÷ (1 − percent ÷ 100)",         "$90 ÷ 0.90 = $100"],
                ["Net multi-step change",   "((final − base) ÷ |base|) × 100",     "100→120→108 = +8%"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-xs text-primary uppercase tracking-wide">{name}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-800">{formula}</td>
                  <td className="py-2 px-3 font-mono text-xs text-green-600">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Compounding Effect Reference — 100% Base Value
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Change applied twice</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Naive sum</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Actual net change</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Final value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["+10% then −10%",  "0%",   "−1%",    "99"],
                ["+20% then −20%",  "0%",   "−4%",    "96"],
                ["+50% then −50%",  "0%",   "−25%",   "75"],
                ["+10% then +10%",  "+20%", "+21%",   "121"],
                ["+25% then +25%",  "+50%", "+56.25%","156.25"],
                ["−10% then −10%",  "−20%", "−19%",   "81"],
                ["−20% then +20%",  "0%",   "−4%",    "96"],
              ].map(([scenario, naive, actual, final]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{scenario}</td>
                  <td className="py-2 px-3 text-xs text-gray-500 line-through">{naive}</td>
                  <td className="py-2 px-3 font-mono text-xs font-semibold text-primary">{actual}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * All examples use a base value of 100. Naive sum = adding the percentages arithmetically. Actual net = the correct compounded result.
        </p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Percentage Change Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "📊",
              title: "Business Analysts",
              desc: "Track KPI movements period-over-period, run batch comparisons on revenue or cost data, and export results directly into reporting decks without touching a spreadsheet formula.",
            },
            {
              icon: "🛒",
              title: "eCommerce Sellers",
              desc: "Calculate discount depths, verify price increases stay within MAP policies, recover original prices from sale values using Reverse mode, and model multi-stage markup scenarios.",
            },
            {
              icon: "💹",
              title: "Finance & Investment Professionals",
              desc: "Measure portfolio gain/loss, compare performance across periods, and model compounded annual growth scenarios with Multi-Step mode to test return projections.",
            },
            {
              icon: "📢",
              title: "Marketing & Growth Teams",
              desc: "Compare month-over-month and year-over-year traffic, conversion rate, and lead volume changes. Batch mode handles an entire month's worth of daily metrics in one paste.",
            },
            {
              icon: "👔",
              title: "HR & Payroll Managers",
              desc: "Verify salary adjustment percentages, calculate bonus amounts as a percentage of base pay, and confirm that raises land within approved budget bands before issuing offer letters.",
            },
            {
              icon: "🎓",
              title: "Students & Educators",
              desc: "Verify manual calculations for assignments, understand why compound percentages behave differently from additive ones, and explore real-world examples with the interactive multi-step simulator.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
