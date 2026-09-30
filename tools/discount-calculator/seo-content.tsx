import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function DiscountCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Discount Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>discount calculator</strong> is a free online tool that computes the exact sale price
            after any combination of percentage discounts, fixed-amount reductions, and tax. It answers the
            most common shopping and retail question instantly: <em>how much do I actually pay?</em>
          </p>
          <p>
            Basic percent-off math is straightforward for a single discount, but real checkout scenarios are
            more complex. A store coupon stacks on top of a sale price. A promo code applies after a loyalty
            discount. Tax calculates on the discounted subtotal, not the original price. This
            <strong> percent off calculator</strong> handles all of that — supporting up to five stacked
            discount steps, mixed discount types (percentage and fixed amount), optional tax, a
            <strong> reverse discount calculator</strong> mode to recover original prices from sale prices,
            and batch mode for pricing multiple items at once.
          </p>
          <p>
            Built for <strong>shoppers comparing sale prices, retail managers pricing promotions, e-commerce
            sellers calculating margins, accountants verifying invoice discounts, and students working through
            pricing problems</strong>. All calculations run in your browser — no account, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Discount Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Sale Price</span> = Original Price × (1 − Discount% ÷ 100)</p>
              <p><span className="font-semibold">Amount Saved</span> = Original Price − Sale Price</p>
              <p><span className="font-semibold">Final Total</span> = Sale Price × (1 + Tax% ÷ 100)</p>
              <p><span className="font-semibold">Original Price</span> = Sale Price ÷ (1 − Discount% ÷ 100)</p>
              <p className="text-gray-500 text-xs mt-2">Stacked discounts: apply each step to the running subtotal, not the original price</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Single discount:</strong> 25% off $80 → $80 × 0.75 = $60 (save $20)</li>
            <li><strong>Stacked discounts:</strong> 20% off then 10% off $100 → $80 then $72 (save $28, not $30)</li>
            <li><strong>Fixed + percent:</strong> $10 off then 15% off $60 → $50 then $42.50</li>
            <li><strong>With tax:</strong> $63 after discounts, 8% tax → $63 × 1.08 = $68.04 final</li>
            <li><strong>Reverse:</strong> Sale price $63, discount 30% → $63 ÷ 0.70 = $90 original</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Discount Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(({ name: title, text: desc }, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Instant sale price calculation as you type",
                "Up to 5 stacked discount steps",
                "Percentage and fixed-amount discounts",
                "Tax applied after discount for real checkout total",
                "Step-by-step breakdown of each price change",
                "Amount saved and savings percentage",
                "Reverse mode — find original price from sale price",
                "Batch mode — apply discount to many prices at once",
                "CSV export of batch results",
                "100% browser-based — no data sent to server",
                "No signup required",
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
              title: "Black Friday Stacked Coupon",
              scenario: "A shopper sees a $280 jacket marked 30% off for Black Friday. At checkout, they also have a loyalty code for an additional $20 off. Step 1: $280 × 0.70 = $196. Step 2: $196 − $20 = $176. With 9% sales tax: $176 × 1.09 = $191.84 final. They enter these three steps in the calculator before purchasing to confirm the total matches what appears at checkout — and to decide whether to use the code on this item or a more expensive one.",
            },
            {
              title: "E-commerce Seller Margin Check",
              scenario: "A Shopify seller sources a product for $18.50 including shipping. They want to run a 20% sale but need to verify the margin stays positive. Current list price: $44.99. After 20% discount: $44.99 × 0.80 = $35.99. Profit at sale price: $35.99 − $18.50 = $17.49. Margin: $17.49 ÷ $35.99 = 48.6%. The seller confirms the sale is viable and sets the discount live.",
            },
            {
              title: "Retail Pricing Analysis",
              scenario: "A buyer at a department store sees a $89 dress tagged 'Was $130.' They use reverse mode: $89 ÷ (1 − discount) — trying different percentages until they find 31.5% matches. They then compare: a competitor sells the same dress for $79 without any 'was' tag. The original-price recovery confirms the competitor's $79 is a better absolute price, not just a better headline discount.",
            },
            {
              title: "Invoice Discount Verification",
              scenario: "A purchasing manager receives a supplier invoice for 50 units at $24.60 each, with a stated 15% trade discount and a 2% early payment discount. Using stacked mode: $24.60 × 50 = $1,230 gross. Step 1: $1,230 × 0.85 = $1,045.50. Step 2: $1,045.50 × 0.98 = $1,024.59 net payable. The manager verifies this matches the invoice total before approving payment — a 30-second check that catches the common error of applying both discounts to the original amount.",
            },
            {
              title: "Wholesale Pricing for Resellers",
              scenario: "A wholesale buyer is offered a 40% trade discount on a product with an RRP of $65. They need to confirm the wholesale cost and their selling margin at 30% off RRP. Wholesale price: $65 × 0.60 = $39. Sale price at 30% off RRP: $65 × 0.70 = $45.50. Gross margin: ($45.50 − $39) ÷ $45.50 = 14.3%. The buyer determines 14.3% is below their 20% target and negotiates for 45% trade discount before committing to the order.",
            },
            {
              title: "Classroom Pricing Problem",
              scenario: "A high school teacher assigns: 'A bike originally costs $350. The store offers 25% off, then a further $30 coupon. How much does a student pay with 7% tax?' Students use this calculator to check their work: $350 × 0.75 = $262.50; $262.50 − $30 = $232.50; $232.50 × 1.07 = $248.78. The step-by-step breakdown in the tool shows each calculation line, making it easy to identify where a manual calculation went wrong.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "When comparing two competing discounts — for example, '30% off' vs '$40 off' on a $120 item — calculate both and compare sale prices directly. 30% off = $84; $40 off = $80. The fixed-amount coupon wins at this price, but at $200 the 30% off ($140) would beat $40 off ($160). The crossover point is where percent savings equal the fixed amount.",
                "Order matters with stacked discounts. A percentage discount always reduces the base for the next step. Apply fixed-amount discounts first if you want to preserve the larger percentage base, or last if the percentage is larger than the fixed saving at the current subtotal.",
                "Use reverse mode before assuming a 'sale' is genuine. If a $60 item is marked '25% off,' reverse mode confirms the claimed original was $80. If you can find the same product elsewhere at $65 without a sale, the discount is marketing rather than a saving.",
                "When applying a trade discount to a wholesale invoice, add the early-payment discount as a second stacked step — not by adding the two percentages together. 15% + 2% stacked = 16.7% effective discount. Adding them as a single 17% is incorrect and produces a different result.",
                "For e-commerce pricing, use batch mode to evaluate your entire product catalog at a proposed sale percentage. Paste all prices, set the discount, and scan the results to identify any items where the sale price would fall below your cost floor before running the promotion.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't add stacked percentage discounts together before calculating. 20% off plus 10% off is not 30% off — it is 28% off. Adding them first and applying 30% to the original overstates the discount by 2 percentage points. Always apply each discount sequentially to the running subtotal.",
                "Don't apply tax before discounts. Sales tax in most jurisdictions is calculated on the amount actually paid — the post-discount price — not the original price. Applying tax first and then discounting produces a lower result than what you will actually pay at checkout.",
                "Don't confuse 'amount saved' with 'savings rate.' Saving $30 on a $60 item is a 50% saving. Saving $30 on a $300 item is only 10%. When comparing deals, express savings as a percentage of the original price to make meaningful comparisons across different price points.",
                "Don't use a single discount for two sequential coupons from different sources. A store sale and a manufacturer coupon are almost always applied as separate steps — the coupon applies to the already-discounted price. Treating them as additive overestimates your saving.",
                "Don't forget that some discounts are excluded from other promotions. 'Cannot be combined with other offers' means only one discount applies. If the first discount is 25% and the second is $10 off, enter each separately and check which gives a lower final price, rather than assuming you can stack them.",
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
          Discount Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Sale Price by Discount % — $100 Original</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Discount</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sale Price</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">You Save</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["5%",  "$95.00",  "$5.00"],
                    ["10%", "$90.00",  "$10.00"],
                    ["15%", "$85.00",  "$15.00"],
                    ["20%", "$80.00",  "$20.00"],
                    ["25%", "$75.00",  "$25.00"],
                    ["30%", "$70.00",  "$30.00"],
                    ["33%", "$67.00",  "$33.00"],
                    ["40%", "$60.00",  "$40.00"],
                    ["50%", "$50.00",  "$50.00"],
                    ["60%", "$40.00",  "$60.00"],
                    ["70%", "$30.00",  "$70.00"],
                    ["75%", "$25.00",  "$75.00"],
                  ].map(([disc, sale, save]) => (
                    <tr key={disc} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{disc}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{sale}</td>
                      <td className="py-1.5 px-3 font-mono text-green-600 text-xs">{save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Stacked Discount — True Combined Rate</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Step 1</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Step 2</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">True Total Discount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["10%", "10%", "19.0%"],
                    ["20%", "10%", "28.0%"],
                    ["20%", "20%", "36.0%"],
                    ["25%", "10%", "32.5%"],
                    ["25%", "15%", "36.25%"],
                    ["30%", "10%", "37.0%"],
                    ["30%", "20%", "44.0%"],
                    ["40%", "10%", "46.0%"],
                    ["40%", "20%", "52.0%"],
                    ["50%", "10%", "55.0%"],
                    ["50%", "20%", "60.0%"],
                    ["50%", "50%", "75.0%"],
                  ].map(([s1, s2, combined]) => (
                    <tr key={`${s1}-${s2}`} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{s1}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{s2}</td>
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{combined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* True discount = 1 − (1 − D1) × (1 − D2). Always less than D1 + D2.</p>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Discount Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🛍️", title: "Shoppers", desc: "Verify sale prices before checkout, compare stacked coupon deals, and check whether a promoted discount is genuine by recovering the original price." },
            { icon: "🏪", title: "Retail Managers", desc: "Plan promotional pricing, calculate margin at sale price, and verify that stacked coupons do not push prices below cost before activating a campaign." },
            { icon: "🛒", title: "E-commerce Sellers", desc: "Calculate sale prices across entire product catalogs using batch mode, confirm margin at discount, and set up tiered pricing for different customer segments." },
            { icon: "📊", title: "Accountants & Finance Teams", desc: "Verify trade discount chains on supplier invoices, confirm early-payment discount calculations, and check that sequential discounts are applied correctly." },
            { icon: "🎓", title: "Students & Teachers", desc: "Work through retail math problems, check answers on percentage-off exercises, and explore how stacked discounts and tax interact in real-world pricing scenarios." },
            { icon: "💼", title: "Procurement & Buyers", desc: "Evaluate supplier discount structures, compare net price across different discount arrangements, and confirm wholesale pricing before committing to purchase orders." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
