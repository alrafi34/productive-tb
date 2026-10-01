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

      {/* ── 4. Worked Examples ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
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
              title: "Invoice Discount Verification",
              scenario: "A purchasing manager receives a supplier invoice for 50 units at $24.60 each, with a stated 15% trade discount and a 2% early payment discount. Using stacked mode: $24.60 × 50 = $1,230 gross. Step 1: $1,230 × 0.85 = $1,045.50. Step 2: $1,045.50 × 0.98 = $1,024.59 net payable. The manager verifies this matches the invoice total before approving payment — a 30-second check that catches the common error of applying both discounts to the original amount.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Tables ── */}
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
    </>
  );
}
