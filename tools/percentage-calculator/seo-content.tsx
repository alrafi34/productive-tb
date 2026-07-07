export default function PercentageCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a percentage calculator and what problems does it solve?",
      a: "A percentage calculator is an online tool that solves the four core percentage problems that come up constantly in everyday math: finding X% of a number, finding what percentage one number is of another, calculating the result after a percentage increase or decrease, and recovering the original value before a percentage change. Each of these uses a different formula, and this tool handles all four in one place so you do not need to switch between calculators or remember which equation applies to your situation.",
    },
    {
      q: "How do I calculate what percentage X is of Y?",
      a: "Divide X by Y and multiply by 100. For example, 45 is what percent of 180? 45 ÷ 180 × 100 = 25%. In Basic mode, select the 'X is what % of Y' formula, enter 45 and 180, and the calculator returns 25 instantly. This is the formula used for test scores (marks earned ÷ total marks × 100), market share (your sales ÷ total market × 100), and completion rates.",
    },
    {
      q: "How do I calculate X% of a number?",
      a: "Multiply the number by the percentage divided by 100. To find 18% of $250: 250 × (18 ÷ 100) = $45. In Basic mode, select 'What is X% of Y', enter 18 and 250, and the result is $45. This formula is used for calculating tips, tax amounts, discounts in dollar terms, commission on sales, and portion sizes in recipes.",
    },
    {
      q: "How do I increase or decrease a number by a percentage?",
      a: "To increase: multiply the value by (1 + percent ÷ 100). To decrease: multiply by (1 − percent ÷ 100). A $340 product with an 8% VAT added becomes 340 × 1.08 = $367.20. The same product at a 15% discount becomes 340 × 0.85 = $289. In Basic mode, select 'Increase by %' or 'Decrease by %', enter your values, and the result updates instantly.",
    },
    {
      q: "How do I find the original value before a percentage was added or removed?",
      a: "Use the reverse percentage formula. For a value that was increased by a percentage: original = final ÷ (1 + percent ÷ 100). For a decrease: original = final ÷ (1 − percent ÷ 100). If a price including 20% VAT is $144, the pre-tax price is $144 ÷ 1.20 = $120. Switch to Reverse mode, enter 144 and 20%, select 'was an increase', and the calculator returns $120.",
    },
    {
      q: "What is the difference between this calculator and the percentage increase/decrease calculator?",
      a: "This calculator is the broader tool, covering all four percentage formula types — percent of a number, what percent is X of Y, increase/decrease by a percentage, and reverse percentage. The percentage increase/decrease calculator specialises in change analysis between two values and adds batch mode for processing lists and multi-step compounding simulation. If your question is 'what is 15% of 200', use this tool. If your question is 'by how much did this value change', use the change calculator.",
    },
    {
      q: "What does Multi-Step mode do?",
      a: "Multi-Step mode lets you apply a sequence of percentage increases and decreases to a starting value and see the running total after each step. A starting price of $500 that receives a +12% supplier increase, a −5% loyalty discount, and a +8% shipping surcharge can be traced step by step: $560, $532, $574.56. The final value and the net percentage change from the original are shown at the end. This is more accurate than trying to add or subtract the percentages mentally.",
    },
    {
      q: "How does Batch mode work?",
      a: "Batch mode applies a single percentage action — any of the four formula types — to an entire list of numbers at once. Paste one number per line, select your formula and percentage, and the calculator processes every row and returns the result for each. You can export the output as a CSV file, making it easy to take batch results into a spreadsheet without manual entry.",
    },
    {
      q: "Can I use this calculator for tax, tip, and discount calculations?",
      a: "Yes — these are among the most common uses. For tip calculation, use 'What is X% of Y' with your bill total and tip percentage. For adding tax, use 'Increase by %' with your pre-tax amount and the tax rate. For finding the pre-tax price from a tax-inclusive total, use Reverse mode. For a discount, use 'Decrease by %' to find the discounted price, or Reverse mode to find the original from a sale price.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. The values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export in Batch mode generates the file locally on your device without any server-side processing.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select your formula", "Choose from the four Basic mode formulas: What is X% of Y, X is what % of Y, Increase a value by %, or Decrease a value by %. Each formula shows the relevant input fields for what you need to enter. Pick the one that matches your question."],
    ["Enter your values", "Type the number and the percentage into the input fields. The calculator accepts whole numbers, decimals, and comma-formatted numbers. Results update instantly as you type — no submit button needed."],
    ["Read the result", "The answer appears immediately beneath the inputs with the formula used shown for reference. For increase and decrease modes, you also see the absolute change — how much was added or subtracted in real terms, not just the percentage."],
    ["Use Reverse mode to find the original value", "Switch to Reverse mode when you know the final value and the percentage but need to recover what the number was before the change. Enter the final value, the percentage, and select whether it was an increase or decrease. This is the correct approach for stripping VAT from an inclusive price or finding a pre-discount original."],
    ["Apply Multi-Step changes", "Switch to Multi-Step mode for scenarios where a value passes through several percentage changes in sequence. Add each step as an increase or decrease, and the calculator tracks the running value after every stage plus the cumulative net change from the starting number."],
    ["Process a list with Batch mode", "Switch to Batch mode and paste your numbers — one per line. Select the formula and enter the percentage to apply. Every number in the list is processed simultaneously and the results appear as a table. Click Export CSV to download the full output."],
  ];

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
                "Use Reverse mode whenever a price already includes tax, a fee, or a markup. People commonly try to calculate pre-tax prices by subtracting the tax percentage directly — a $120 price with 20% VAT is not $120 minus 20% = $96; the correct pre-tax amount is $120 ÷ 1.20 = $100. Reverse mode applies the right formula automatically.",
                "For tip calculations, use 'What is X% of Y' with your bill total and desired tip percentage. If the result looks high, check that you entered the bill total — not the per-person share — as the base value. A 20% tip on a $180 table bill is $36 total, not $36 per person.",
                "When checking a test score percentage, always use 'X is what % of Y' with marks earned as X and total marks as Y. A 47/60 is 78.33%, not the other way around — entering 60 and 47 would give you 127.66%, which is the wrong question entirely.",
                "Batch mode is fastest when your numbers are already in a column in a spreadsheet. Copy the column, paste into Batch mode, set your formula and percentage, run the calculation, and export CSV. This is quicker than adding a formula column in the spreadsheet itself.",
                "Multi-Step mode is useful for checking compound growth or decay. If a value increases by 5% each month for six months, add six +5% steps to see the final value: it is not a 30% increase — it is a 34.01% net increase. The step-by-step history makes the compounding transparent.",
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
                "Don't subtract the percentage directly to reverse a percentage increase. Removing 20% from $120 gives $96, not $100. To find the pre-increase original, always use Reverse mode or the formula: final ÷ (1 + percent ÷ 100). Subtracting the percentage from the inflated total always understates the original.",
                "Don't confuse 'what is X% of Y' with 'X is what % of Y'. These are inverse questions. What is 25% of 80 = 20. But 25 is what % of 80 = 31.25%. Selecting the wrong formula gives a plausible-looking but incorrect answer.",
                "Don't add percentages across multi-step scenarios. A 10% increase followed by a 10% decrease does not return to the starting value — it leaves you at 99% of the original. Always use Multi-Step mode to track the actual running total.",
                "Don't use a rounded intermediate result in chained calculations. If step 1 gives $53.33 and you round to $53 before entering step 2, the rounding error compounds with each step. Let the calculator carry the full precision through every stage.",
                "Don't enter the percentage as a decimal. If you want 15%, enter 15 — not 0.15. The calculator divides by 100 internally. Entering 0.15 would give you 0.15% of your value, which is 100 times smaller than intended.",
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
          Who Uses This Percentage Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🎓",
              title: "Students",
              desc: "Convert raw test scores to percentages, check homework answers, calculate grade averages, and understand how percentage formulas work with live examples across every mode.",
            },
            {
              icon: "🛍️",
              title: "Shoppers & Consumers",
              desc: "Calculate sale prices and discounts, work out tip amounts, find pre-tax prices from VAT-inclusive totals, and check whether a sale price represents the advertised discount.",
            },
            {
              icon: "💼",
              title: "Business Owners",
              desc: "Calculate profit margins, markup percentages, commission amounts, and batch-process entire product lists or sales datasets. Multi-Step mode models cost structures with multiple overlapping adjustments.",
            },
            {
              icon: "📊",
              title: "Analysts & Accountants",
              desc: "Process bulk datasets with Batch mode and CSV export, strip VAT from inclusive prices using Reverse mode, and verify that chained percentage adjustments produce the expected final values.",
            },
            {
              icon: "👩‍🏫",
              title: "Teachers & Educators",
              desc: "Calculate class average scores, convert marks to percentages, and demonstrate how percentage formulas work in practice — including why reverse percentages require a different approach than simple subtraction.",
            },
            {
              icon: "🏗️",
              title: "Contractors & Estimators",
              desc: "Add contingency and profit margin percentages to base costs in sequence, calculate material quantities as percentages of total, and verify that client quotes correctly reflect multi-stage percentage adjustments.",
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
