export default function ProfitMarginCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Profit Margin Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>profit margin calculator</strong> is a financial tool that instantly computes how much of each sale you actually keep as profit — expressed as a percentage of the selling price. It answers the core question every product-based business, ecommerce seller, freelancer, and marketer must answer before scaling: <em>for every dollar of revenue, how many cents flow to the bottom line?</em>
          </p>
          <p>
            Profit margin is built on two numbers — cost price and selling price — but the implications reach into every business decision: whether a product is worth stocking, whether a campaign is worth running, whether a price increase will help or hurt, and whether the business can survive a dip in volume. The calculator extends beyond the basic margin formula across five distinct calculation modes: Profit Margin, Markup, Find Selling Price, Find Cost Price, and Revenue &amp; Total Cost.
          </p>
          <p>
            This tool is designed for <strong>ecommerce sellers, retail buyers, startup founders, marketing teams, financial analysts, accountants, and MBA students</strong> who need to evaluate unit economics, model pricing scenarios, and interpret profitability — without a spreadsheet. It supports 12 currencies, exports to CSV and TXT, saves a shareable URL for every calculation, and runs entirely in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Profit Margin Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The foundation of every profit margin calculation is the relationship between cost and revenue. <strong>Profit</strong> is the raw dollar difference between what you charge and what you spend to deliver the product or service. <strong>Profit margin</strong> expresses that profit as a fraction of the selling price — not the cost. This distinction matters enormously: a 50% markup and a 50% margin are not the same number.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Profit</span> = Selling Price − Cost Price</p>
              <p><span className="font-semibold">Profit Margin (%)</span> = (Profit ÷ Selling Price) × 100</p>
              <p><span className="font-semibold">Markup (%)</span> = (Profit ÷ Cost Price) × 100</p>
              <p><span className="font-semibold">Selling Price</span> = Cost ÷ (1 − Target Margin %)</p>
              <p><span className="font-semibold">Cost Price</span> = Selling Price × (1 − Target Margin %)</p>
            </div>
          </div>
          <p>
            The calculator supports five modes, each inverting the formula to solve for a different unknown:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Profit Margin Mode", "Enter cost price and selling price. Returns profit, margin %, markup %, and a performance-level interpretation."],
              ["Markup Mode", "Same inputs as margin mode — both metrics are returned simultaneously. Useful when your pricing team thinks in markup but your finance team reports in margin."],
              ["Find Selling Price", "Enter your cost and a target margin percentage. The calculator solves for the selling price that achieves exactly that margin."],
              ["Find Cost Price", "Enter the selling price and target margin. Returns the maximum cost you can incur while hitting your margin goal — useful for supplier negotiations."],
              ["Revenue & Total Cost", "Enter total revenue and total operating cost for a period. Returns the net profit margin for the entire business or product line."],
            ].map(([term, desc]) => (
              <li key={term} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{term}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Profit Margin Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select the mode that matches what you already know and what you need to find out. Use Profit Margin when you have both numbers and want to check the margin. Use Find Selling Price when you know your cost and have a target margin. Use Revenue & Total Cost for whole-business profitability."],
                ["Enter Your Numbers", "Fill in the fields that appear for the selected mode — cost price, selling price, target margin %, or revenue and total cost. The calculator validates your inputs in real time and flags errors before calculating."],
                ["Select a Currency", "Choose your currency from 12 options including USD, EUR, GBP, INR, AED, and more. Currency is applied to display only — no exchange rate conversion is applied, so you can use any unit of value."],
                ["Read the Results", "Profit, margin %, markup %, selling price, cost price, and a profitability badge update instantly as you type. The badge classifies the margin as Excellent, Good, Average, Low, or Loss with a plain-language interpretation."],
                ["Review the Formula Breakdown", "Below the results, the step-by-step calculation shows exactly how each number was derived — useful for double-checking inputs or explaining results to stakeholders."],
                ["Export or Share", "Copy the result summary to clipboard, export as CSV or TXT, or use the shareable URL to send the exact calculation to a colleague or client with all inputs pre-filled."],
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
                "Real-time calculation as you type — no submit button needed",
                "Profitability badge: Excellent / Good / Average / Low / Loss",
                "Plain-language interpretation of every result",
                "Step-by-step calculation breakdown",
                "12 currency options (USD, EUR, GBP, INR, AED, and more)",
                "Decimal precision control (0–4 decimal places)",
                "Copy result or full summary to clipboard",
                "Export full report as CSV or TXT",
                "Shareable URL — every calculation gets a permanent link",
                "Calculation history saved locally (up to 20 entries)",
                "100% browser-based — no data leaves your device",
                "No signup, no account, no rate limits",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span><span>{f}</span>
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
              title: "Pricing a New Ecommerce Product",
              scenario: "An Amazon seller sources a product for $22 including packaging and FBA fees. They want a 35% profit margin to account for advertising spend and seasonal promotions. Using Find Selling Price mode with a $22 cost and 35% target margin, the calculator instantly returns a required selling price of $33.85. The seller lists at $34.99, achieving a margin of 37.1% — above their target and competitive with similar listings.",
            },
            {
              title: "Evaluating a Marketing Campaign's True ROI",
              scenario: "A D2C brand runs a paid social campaign that generates $48,000 in revenue at a total cost of goods and ad spend of $31,000. Entering these into Revenue & Total Cost mode returns a 35.4% net margin on the campaign. The marketing team compares this to their 28% baseline margin on organic sales and confirms the campaign is incrementally profitable — justifying the ad budget renewal.",
            },
            {
              title: "Retail Buyer Setting Category Margins",
              scenario: "A retail buyer manages a home goods category and needs every SKU to hit at least a 45% gross margin. For each new product pitched by suppliers, they enter the wholesale cost and use Find Selling Price mode to calculate the minimum retail price that achieves 45%. Products whose required retail price exceeds the market average for the category are rejected or renegotiated before purchase orders are placed.",
            },
            {
              title: "Freelancer Setting Consulting Day Rates",
              scenario: "A marketing consultant has $3,200 in monthly operating costs. They want a 60% profit margin on their billable work. They enter their target day rate as the selling price and use Find Cost Price mode to calculate the maximum cost basis — then cross-check this against their actual overhead per billed day. If their overhead is below the allowed cost, their rate is viable. If not, they need to raise the day rate or cut costs.",
            },
            {
              title: "Startup Founder Modelling Unit Economics",
              scenario: "A founder is building a physical product startup and is pitching investors. They model three COGS scenarios — optimistic, base, and conservative — using the profit margin calculator at their planned $79 retail price. At $28 COGS (optimistic): 64.6% margin. At $36 COGS (base): 54.4% margin. At $45 COGS (conservative): 43% margin. The shareable URL for each scenario is pasted directly into the investor deck for transparency.",
            },
            {
              title: "Negotiating Supplier Costs Using Find Cost Price",
              scenario: "A wholesale buyer sells a product at $85 and needs to maintain a 40% margin to cover overheads. Using Find Cost Price mode with a $85 selling price and 40% target margin returns a maximum cost of $51. Their current supplier quotes $56 per unit — $5 over the threshold. Armed with this number, the buyer enters negotiations with a specific ask: reduce unit cost to $50 or below, or they will switch suppliers.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Always use margin — not markup — when communicating with investors, boards, and financial stakeholders. Markup can be misleading at high percentages: a 200% markup sounds enormous but only translates to a 66.7% margin. Margin is a universally understood metric; markup is an internal pricing lever.",
                "Price from margin targets backward, not from cost plus. Cost-plus pricing ('I'll add 30% to my cost') is intuitive but systematically underprices high-value products. Instead, anchor on the margin your business model requires, then use Find Selling Price to derive the price that achieves it.",
                "Include all variable costs in the cost price — not just COGS. For ecommerce, cost should include payment processing fees (typically 2–3%), packaging, per-unit shipping, and platform commissions. For service businesses, include contractor costs and tool subscriptions billed per client. Undercosting leads to margins that look good on paper but don't survive cash flow analysis.",
                "Run margin calculations at every price tier when running promotions. A 20% discount on a product with a 30% margin reduces profit by 67% per unit — not 20%. Promotional pricing that crosses below your variable cost per unit makes every sale worse than making no sale at all.",
                "Use the Revenue & Total Cost mode monthly as a financial health check. Divide your total monthly revenue by total monthly costs and track the margin trend over time. A declining trend 3 months in a row is an early warning signal before it becomes a cash flow crisis.",
                "Compare your margin against industry benchmarks before concluding it is 'good'. A 15% margin is excellent for a grocery store and catastrophic for a SaaS product. Context is everything — use the benchmark table below to calibrate your expectations against your sector.",
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
                "Don't confuse margin and markup when setting prices. A common error: a buyer wants a 50% margin and adds 50% to their cost. A $60 cost + 50% markup = $90 price, which is only a 33.3% margin — well below the 50% target. Use Find Selling Price mode to avoid this mistake entirely.",
                "Don't calculate gross margin and call it profit margin without disclosing the difference. Gross margin excludes operating expenses, interest, and taxes — it only accounts for direct cost of goods. Net margin includes everything. A business with a 60% gross margin can still be loss-making if operating costs are high. Clearly state which margin you are reporting.",
                "Don't set a single margin target across all product lines without segmenting by category. A flagship high-margin product should not cross-subsidise loss-leading products indefinitely. Understand the margin per SKU, per channel, and per customer segment to avoid situations where top-line revenue growth masks profitability erosion.",
                "Don't ignore the effect of returns and chargebacks on ecommerce margins. A 10% return rate on a product with a 25% margin can eliminate almost all profit once reverse logistics and restocking costs are factored in. Always model margin at the net shipped unit level, not the gross order level.",
                "Don't treat margin as a static number. Input costs change with supplier price increases, shipping rate changes, and currency fluctuations. A margin that was 40% six months ago may now be 32% due to cost inflation. Recalculate whenever key cost inputs change.",
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

      {/* ── Formula Reference ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Profit Margin Formula Reference
        </h2>
        <div className="space-y-4 mb-6">
          {[
            { name: "Profit",          formula: "Selling Price − Cost Price",                                   example: "$120 − $80 = $40" },
            { name: "Profit Margin",   formula: "((Selling Price − Cost) ÷ Selling Price) × 100",              example: "(($120 − $80) ÷ $120) × 100 = 33.33%" },
            { name: "Markup",          formula: "((Selling Price − Cost) ÷ Cost Price) × 100",                 example: "(($120 − $80) ÷ $80) × 100 = 50%" },
            { name: "Selling Price",   formula: "Cost Price ÷ (1 − Target Margin %)",                          example: "$80 ÷ (1 − 0.40) = $133.33" },
            { name: "Cost Price",      formula: "Selling Price × (1 − Target Margin %)",                       example: "$120 × (1 − 0.3333) = $80" },
            { name: "Net Margin",      formula: "((Revenue − Total Costs) ÷ Revenue) × 100",                   example: "(($50,000 − $32,000) ÷ $50,000) × 100 = 36%" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-36 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-sm text-gray-800">{formula}</div>
              <div className="md:w-52 text-sm text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <strong>Margin vs. Markup — Key Difference:</strong> Margin uses selling price as the base (profit ÷ revenue). Markup uses cost as the base (profit ÷ cost). A 50% markup always equals a 33.33% margin. A 50% margin always requires a 100% markup. Never use the two interchangeably.
        </div>
      </section>

      {/* ── Industry Benchmarks ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Profit Margin Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Gross Margin</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Net Margin</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS / Software",         "70–85%",  "20–40%",  "High gross margins after development costs; net margin depends on CAC and growth spend"],
                ["Digital Products",         "80–95%",  "60–85%",  "Near-zero COGS drives exceptional gross margins for online courses, ebooks, templates"],
                ["Ecommerce (General)",      "40–60%",  "10–20%",  "Gross margin healthy; net margin compressed by ads, returns, and logistics"],
                ["Retail / Fashion",         "45–65%",  "4–13%",   "Strong gross margins but high operating costs thin the net"],
                ["Restaurants / Food",       "60–75%",  "3–9%",    "Gross margin misleads — labour and rent are the real margin killers"],
                ["Healthcare / Pharma",      "50–70%",  "10–20%",  "Varies widely by R&D intensity and whether branded or generic"],
                ["Professional Services",    "70–80%",  "20–35%",  "Low COGS; labour is primary cost — margin scales with utilisation"],
                ["Manufacturing",            "25–40%",  "5–15%",   "Scale and automation drive margin improvement over time"],
                ["Marketing Agencies",       "50–60%",  "15–25%",  "Gross margin strong; net squeezed by staff costs and software"],
                ["Wholesale / Distribution", "20–35%",  "3–8%",    "Thin net margins compensated by volume"],
              ].map(([industry, gross, net, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{gross}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{net}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are general guidelines based on industry averages. Actual margins vary by business model, pricing strategy, scale, and market conditions.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is profit margin and why does it matter?",
              a: "Profit margin is the percentage of revenue that remains as profit after costs are deducted. It is the single most important metric for measuring whether a business model is financially viable. A high revenue business with thin margins can be less sustainable than a smaller business with strong margins — because margins determine how much of each sale can be reinvested into growth, absorbed as loss during slow periods, or returned to owners. Without knowing your margin, pricing decisions are guesswork.",
            },
            {
              q: "What is the difference between profit margin and markup?",
              a: "Profit margin is expressed as a percentage of the selling price: ((Selling − Cost) ÷ Selling) × 100. Markup is expressed as a percentage of the cost: ((Selling − Cost) ÷ Cost) × 100. For the same transaction, markup is always a larger number than margin. A product that costs $60 and sells for $100 has a 40% margin but a 66.67% markup. Retailers typically price using markup and report using margin — knowing both is essential to avoid systematic mispricing.",
            },
            {
              q: "What is a good profit margin for ecommerce?",
              a: "A healthy gross margin for ecommerce is typically 40–60% after product cost, packaging, and fulfillment. After advertising, platform fees, returns, and overhead, most ecommerce businesses operate at a 10–20% net margin. Margins below 15% gross on physical products make it very difficult to run profitable paid advertising. Digital products and subscriptions command significantly higher margins because COGS is near zero.",
            },
            {
              q: "What is the difference between gross profit margin and net profit margin?",
              a: "Gross profit margin deducts only the direct cost of goods sold (COGS) from revenue — the materials, manufacturing, and direct delivery costs. Net profit margin deducts all expenses: COGS plus operating expenses, salaries, rent, marketing, interest, and taxes. Gross margin measures production efficiency. Net margin measures overall business profitability. This calculator primarily computes gross margin; use the Revenue & Total Cost mode with full all-in costs to approximate net margin.",
            },
            {
              q: "How do I calculate the selling price from a target margin?",
              a: "Use the formula: Selling Price = Cost Price ÷ (1 − Target Margin %). For example, if your cost is $50 and you want a 40% margin: $50 ÷ (1 − 0.40) = $50 ÷ 0.60 = $83.33. The common mistake is to simply multiply cost by (1 + margin%) — that calculates a markup, not a margin. The Find Selling Price mode in this calculator does the math automatically.",
            },
            {
              q: "How do I increase my profit margin?",
              a: "There are four main levers: (1) Raise your selling price — even a 5% price increase on a 25% margin product improves profit by 20%. (2) Reduce cost of goods through supplier negotiations, bulk ordering, or product reformulation. (3) Eliminate low-margin or negative-margin products from your range. (4) Increase average order value through upsells and bundles — spreading fixed costs over more revenue without increasing COGS proportionally. Price increases are generally the fastest and most impactful lever.",
            },
            {
              q: "What is the margin on a 50% markup?",
              a: "A 50% markup equals a 33.33% margin. If a product costs $60 and you mark it up 50%, the selling price is $90. Profit is $30. Margin = $30 ÷ $90 = 33.33%. This is one of the most common sources of confusion in retail pricing. The relationship between markup and margin is not linear — as markup increases, margin increases but at a diminishing rate. A 100% markup = 50% margin. A 200% markup = 66.67% margin.",
            },
            {
              q: "Can this calculator be used for service businesses?",
              a: "Yes. For pure service businesses, set cost to zero or to your direct labour and tool costs per engagement. Your selling price is your fee. For agencies and consultancies that use Margin mode, cost should include the fully loaded cost of the team members working on the account — salary, benefits, and overhead allocated per hour or project. For Revenue & Total Cost mode, enter your total monthly billings as revenue and total monthly operating costs as total cost.",
            },
            {
              q: "What is the margin on marketing campaigns and promotional pricing?",
              a: "Promotional pricing dramatically compresses margin. A product with a 30% regular margin sold at a 20% discount has a net margin of only 12.5% — less than half the regular margin. This is because the discount comes entirely from your profit, not from a reduction in cost. Before running any promotion, calculate the margin at the promotional price and compare the incremental volume needed to maintain the same total profit as selling fewer units at full price. Often, the break-even volume increase required to justify a discount is unrealistically high.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your cost prices, selling prices, revenue figures, and margin targets are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature uses your browser's localStorage — data is local to your device and never leaves it. This makes the tool safe for confidential pricing analysis and financial planning.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🛍️", title: "Ecommerce Sellers",    desc: "Price products correctly on Shopify, Amazon, and WooCommerce by calculating the exact margin after platform fees, shipping, and payment processing — before listing." },
            { icon: "🏪", title: "Retail Buyers",         desc: "Set pricing strategies across product categories to ensure every SKU contributes positively to store profitability, with per-product margin visibility." },
            { icon: "💼", title: "Accountants & CFOs",    desc: "Quickly compute gross and net margins for client reporting, management accounts, board packs, and investment memoranda." },
            { icon: "🚀", title: "Startup Founders",      desc: "Model unit economics at multiple price points and COGS scenarios to validate the business is viable before scaling — and to communicate clearly to investors." },
            { icon: "📣", title: "Marketing Teams",       desc: "Evaluate the true profitability of promotional campaigns by calculating the margin at discounted prices before approving spend — and comparing post-campaign net margin to baseline." },
            { icon: "🎓", title: "Students & Educators",  desc: "Practice financial modelling, pricing strategy, and unit economics with a real-time calculator that shows step-by-step formula workings — ideal for MBA and business courses." },
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
