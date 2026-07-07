export default function ProfitMarginCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Profit Margin Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Choose a Mode", "Select from Profit Margin, Markup, Find Selling Price, Find Cost Price, or Revenue & Total Cost."],
                ["Enter Your Numbers", "Fill in cost price, selling price, or revenue depending on the selected mode."],
                ["Select Currency", "Choose your preferred currency. No conversion is applied — it's display only."],
                ["Read Results Instantly", "Profit, margin %, markup %, and business interpretation update in real time as you type."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Five calculation modes — Margin, Markup, Selling Price, Cost Price, Revenue",
                "Real-time calculation as you type",
                "Profitability badge with contextual interpretation",
                "12 currency options",
                "Decimal precision control (0–4)",
                "Copy result or full summary to clipboard",
                "Export TXT and CSV reports",
                "Shareable URL with pre-filled values",
                "Calculation history saved locally",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Profit Margin Formulas &amp; Examples
        </h2>
        <div className="space-y-4 mb-6">
          {[
            { name: "Profit",         formula: "Profit = Selling Price − Cost Price",                             example: "$120 − $80 = $40" },
            { name: "Profit Margin",  formula: "Margin (%) = ((Selling − Cost) ÷ Selling) × 100",               example: "(($120 − $80) ÷ $120) × 100 = 33.33%" },
            { name: "Markup",         formula: "Markup (%) = ((Selling − Cost) ÷ Cost) × 100",                  example: "(($120 − $80) ÷ $80) × 100 = 50%" },
            { name: "Selling Price",  formula: "Selling Price = Cost ÷ (1 − Target Margin%)",                   example: "$80 ÷ (1 − 40%) = $133.33" },
            { name: "Cost Price",     formula: "Cost Price = Selling Price × (1 − Target Margin%)",              example: "$120 × (1 − 33.33%) = $80" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-36 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-sm text-gray-800">{formula}</div>
              <div className="md:w-48 text-sm text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Profit Margin Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Net Margin</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS / Software",       "20–40%",  "High margins after development costs are sunk"],
                ["Digital Products",      "60–85%",  "Near-zero COGS drives exceptional margins"],
                ["Ecommerce (General)",   "10–20%",  "Shipping and returns compress margins significantly"],
                ["Retail / Fashion",      "4–13%",   "High competition and inventory costs thin margins"],
                ["Restaurants / Food",    "3–9%",    "Very thin margins; volume and efficiency are key"],
                ["Healthcare / Pharma",   "10–20%",  "R&D and regulatory costs vary widely"],
                ["Professional Services", "20–35%",  "Low COGS; labor is the primary cost"],
                ["Manufacturing",         "5–15%",   "Scale and automation drive margin improvement"],
              ].map(([industry, margin, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{margin}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are general guidelines. Actual margins vary by business model, pricing strategy, and market conditions.</p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is profit margin?", a: "Profit margin is the percentage of revenue that remains as profit after all costs are deducted. It is one of the most important financial metrics for evaluating business health. A higher margin means more profit is retained per dollar of revenue." },
            { q: "What is the difference between margin and markup?", a: "Margin is calculated as a percentage of the selling price: ((Selling − Cost) ÷ Selling) × 100. Markup is calculated as a percentage of the cost: ((Selling − Cost) ÷ Cost) × 100. For the same product, markup is always higher than margin. A 50% markup equals a 33.33% margin." },
            { q: "What is a good profit margin?", a: "A 'good' margin depends on the industry. Digital products often achieve 60–85%. SaaS companies target 20–40%. Ecommerce typically lands at 10–20%. Restaurants often operate at 3–9%. The key is whether your margin is sufficient to cover fixed costs, sustain growth, and reward investors." },
            { q: "What is gross profit margin vs. net profit margin?", a: "Gross profit margin deducts only the direct cost of goods sold (COGS) from revenue. Net profit margin deducts all expenses — COGS, operating costs, interest, and taxes. Gross margin shows production efficiency; net margin shows overall business profitability. This calculator focuses on gross margin." },
            { q: "How do I increase my profit margin?", a: "The main strategies are: raising prices (even a 5% increase can dramatically improve margin), reducing COGS by negotiating with suppliers, eliminating low-margin products, increasing average order value through upsells, and reducing operational overhead. Improving conversion rate also spreads fixed costs over more revenue." },
            { q: "What is the difference between profit margin and markup in pricing?", a: "When pricing products, using markup based on cost is simpler but can lead to underpricing. A 100% markup on a $50 cost gives a $100 price with a 50% margin. Many retailers target a specific margin (e.g., 40%) and use the selling price formula (Cost ÷ (1 − Margin%)) to set prices correctly." },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🛍️", title: "Ecommerce Sellers",    desc: "Price products correctly on Shopify, Amazon, or WooCommerce by calculating the exact margin needed after platform fees and shipping." },
            { icon: "🏪", title: "Retail Businesses",     desc: "Set pricing strategies across product categories to ensure each SKU contributes positively to overall store profitability." },
            { icon: "💼", title: "Accountants",           desc: "Quickly compute gross and net margins for client reporting, financial audits, and profitability analysis." },
            { icon: "🚀", title: "Startup Founders",      desc: "Model unit economics at different price points to ensure the business is viable before scaling marketing spend." },
            { icon: "📊", title: "Marketing Teams",       desc: "Evaluate the true profitability of promotional campaigns by factoring discounted prices into margin calculations." },
            { icon: "🎓", title: "Students",              desc: "Practice financial modeling and pricing strategy with a real-time calculator that shows formulas and step-by-step workings." },
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
