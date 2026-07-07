export default function BreakEvenCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Break-Even Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>break-even calculator</strong> is a financial planning tool that determines the exact point at which a business's total revenue equals its total costs — producing neither profit nor loss. It answers the most fundamental question in business finance: <em>how many units do I need to sell before I start making money?</em>
          </p>
          <p>
            Break-even analysis is built on three core inputs: fixed costs (expenses that don't change with output, like rent and salaries), variable costs per unit (expenses that scale with each sale, like materials and shipping), and the selling price per unit. From these three numbers, the calculator derives the contribution margin, break-even units, break-even revenue, margin of safety, and the sales volume required to hit any target profit — all in real time.
          </p>
          <p>
            This tool is designed for <strong>startup founders, ecommerce sellers, freelancers, small business owners, financial analysts, and students</strong> who need to validate pricing decisions, model cost scenarios, and plan for profitability without a spreadsheet or financial consultant. Supports 12 currencies, exports to CSV and TXT, and saves a shareable URL for every calculation — all processed locally in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Break-Even Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every break-even calculation starts with the <strong>contribution margin</strong> — the amount each unit sale contributes toward covering fixed costs after variable costs are paid. Once fixed costs are fully covered, every additional unit sold at the contribution margin rate becomes pure profit.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Contribution Margin (CM)</span> = Selling Price − Variable Cost per Unit</p>
              <p><span className="font-semibold">CM Ratio</span> = CM ÷ Selling Price × 100</p>
              <p><span className="font-semibold">Break-even Units</span> = Fixed Costs ÷ CM</p>
              <p><span className="font-semibold">Break-even Revenue</span> = Break-even Units × Selling Price</p>
            </div>
          </div>
          <p>This calculator extends the core formula across seven distinct outputs, each building on the previous:</p>
          <ul className="space-y-2 text-sm">
            {[
              ["Contribution Margin", "Revenue per unit minus variable cost per unit. The higher the CM, the fewer units needed to break even."],
              ["CM Ratio", "Contribution margin as a percentage of selling price. Reveals what fraction of every sale goes toward fixed costs and profit."],
              ["Break-Even Units", "The minimum number of units that must be sold to cover all costs. Calculated as Fixed Costs ÷ CM."],
              ["Break-Even Revenue", "The minimum total revenue required to break even. Equals break-even units × selling price."],
              ["Profit / Loss", "Requires current units sold. Shows whether you are above or below break-even and by how much."],
              ["Margin of Safety", "How far current sales can fall before reaching break-even. A 30% margin means sales can drop 30% before losses begin."],
              ["Target Profit Units", "The sales volume required to achieve a specific profit target. Calculated as (Fixed Costs + Target Profit) ÷ CM."],
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
          How to Use the Break-Even Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Fixed Costs", "Enter all costs that remain constant regardless of how many units you sell — rent, salaries, insurance, software subscriptions, loan repayments, and equipment depreciation. If you pay these whether you sell 0 or 10,000 units, they are fixed costs."],
                ["Enter Variable Cost per Unit", "Enter the cost incurred for each unit produced or delivered — raw materials, packaging, per-item shipping, payment processing fees, and sales commissions. These scale directly with output volume."],
                ["Enter Selling Price per Unit", "Enter the price one customer pays for one unit. The selling price must be higher than the variable cost per unit — otherwise every sale increases losses. The gap between them is your contribution margin."],
                ["Add Current Units Sold (Optional)", "Enter how many units you currently sell per period to unlock the profit/loss calculation and margin of safety. This shows whether you are operating above, at, or below break-even right now."],
                ["Set a Target Profit (Optional)", "Enter a profit goal to calculate the exact sales volume needed to achieve it. The formula adds your target profit to fixed costs before dividing by the contribution margin, giving you a concrete sales target."],
                ["Review Results and Export", "The calculator instantly shows break-even units, break-even revenue, contribution margin, CM ratio, margin of safety, and target profit units. Export the full report as CSV or TXT, or copy the shareable URL to revisit the same calculation."],
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
                "Real-time break-even calculation as you type",
                "Break-even units and break-even revenue",
                "Contribution margin and CM ratio",
                "Current profit or loss from units sold",
                "Margin of safety in units, revenue, and percentage",
                "Target profit sales volume calculation",
                "Step-by-step calculation breakdown shown",
                "12 currency options (USD, EUR, GBP, INR, AED, and more)",
                "Shareable URL — every calculation gets a permanent link",
                "Calculation history saved to browser (up to 20 entries)",
                "Export full report as CSV or TXT",
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
              title: "Validating a Business Idea Before Launch",
              scenario: "A first-time founder wants to open a café. Monthly fixed costs are $8,000 (rent, staff, utilities). Each coffee costs $2.50 to make and sells for $6.00, giving a CM of $3.50. The calculator shows the café needs to sell 2,286 coffees per month to break even — about 76 coffees per day. The founder compares this to foot traffic estimates and decides the location is viable before signing the lease.",
            },
            {
              title: "Setting a Profitable Product Price",
              scenario: "An ecommerce seller sources a product for $18 per unit and has $3,000 in monthly fixed costs. They test three price points — $35, $45, and $55 — in the calculator. At $35 the break-even is 176 units/month. At $45 it drops to 111 units. At $55 it drops to 79 units. Knowing their realistic sales volume is around 100–120 units/month, they price at $45 to stay safely above break-even.",
            },
            {
              title: "Freelancer Monthly Revenue Target",
              scenario: "A freelance designer has $2,800 in monthly personal and business expenses (fixed costs). Their variable cost per project is $0. They charge $700 per project. The break-even is 4 projects per month. They enter a target profit of $1,400 and the calculator shows 6 projects/month is needed. This becomes their monthly sales target, driving their outreach cadence.",
            },
            {
              title: "SaaS Startup Subscription Planning",
              scenario: "A SaaS team charges $49/month per user. Hosting, support, and infrastructure cost $5 per user (variable). Monthly fixed overhead is $12,000. The CM is $44 per subscription. The calculator shows 273 paying users needed to break even. The founder uses the target profit field to find that 500 users generates $9,800 monthly profit — setting a concrete milestone for their funding pitch.",
            },
            {
              title: "Evaluating a Price Increase",
              scenario: "A retailer is considering raising prices from $40 to $48. Fixed costs are $9,000/month and variable cost is $15/unit. At $40 the CM is $25 and break-even is 360 units. At $48 the CM rises to $33 and break-even drops to 273 units. The calculator shows the higher price requires 87 fewer sales to break even, quantifying the benefit of the price increase against potential lost volume.",
            },
            {
              title: "Investor Pitch Financial Modelling",
              scenario: "A founder is preparing financial projections for a seed round. They use the break-even calculator to model three scenarios: conservative (break-even at month 8), base case (month 6), and optimistic (month 4) — adjusting fixed costs, price, and variable costs for each. The shareable URL means each scenario can be shared with the investor directly, with full input transparency.",
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
                "Use the margin of safety as your primary risk indicator, not just the break-even number. A business breaking even at 200 units with current sales of 210 units has only a 5% margin of safety — one slow month means losses. A 25%+ margin of safety is a much safer operating position.",
                "Run the calculator for each product line separately before combining them. A high-margin product can hide a loss-making product when costs are pooled. Knowing the break-even per SKU lets you cut underperformers and focus resources on profitable lines.",
                "Model your pricing with a 15–20% buffer above break-even as your floor price. Pricing exactly at break-even leaves no room for returns, refunds, bad debt, or unexpected cost increases. The buffer becomes your minimum acceptable margin.",
                "When fixed costs are high, focus on raising price rather than cutting variable costs. A $5 reduction in variable cost saves $5 per unit, but a $5 price increase saves $5 per unit AND raises the contribution margin — compounding the benefit across every future sale.",
                "Use the target profit field to reverse-engineer your sales targets. Rather than asking 'how much profit will X units generate?', ask 'how many units do I need to hit my profit target?' — this gives you an actionable number to manage toward.",
                "Re-run the break-even analysis every time you change suppliers, renegotiate rent, hire staff, or change pricing. Fixed and variable costs shift constantly — an outdated break-even number is as dangerous as no number at all.",
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
                "Don't mix time periods. If your fixed costs are monthly, your selling price and variable cost must also reflect monthly per-unit figures. Mixing annual fixed costs with monthly unit economics produces a break-even point that's off by a factor of 12.",
                "Don't forget owner salary as a fixed cost. Many small business owners exclude their own pay from fixed costs, which artificially lowers the break-even point. Your salary is a real cost — if the business doesn't cover it, you are subsidising the business from personal savings.",
                "Don't treat semi-variable costs as purely fixed. Utilities, overtime wages, and delivery costs have both fixed and variable components. For accuracy, split these into their fixed floor (e.g., the base utility bill) and their variable portion (e.g., extra usage per unit produced).",
                "Don't use break-even analysis as a substitute for cash flow planning. Break-even tells you when revenue covers costs on paper — it doesn't account for the timing of payments, inventory carrying costs, or the cash needed before the first sale. A business can be break-even positive on paper and still run out of cash.",
                "Don't ignore the contribution margin ratio when comparing products. A product with a $30 CM on a $50 price (60% ratio) generates profit faster than a $40 CM on a $100 price (40% ratio) at equal unit volumes. Higher CM ratios mean faster break-even as revenue scales.",
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

      {/* ── Reference Tables ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Break-Even Formula Reference
        </h2>
        <div className="space-y-4 mb-6">
          {[
            { name: "Contribution Margin",  formula: "Selling Price − Variable Cost per Unit",                       example: "$50 − $20 = $30" },
            { name: "CM Ratio",             formula: "CM ÷ Selling Price × 100",                                     example: "$30 ÷ $50 = 60%" },
            { name: "Break-Even Units",     formula: "Fixed Costs ÷ Contribution Margin",                            example: "$10,000 ÷ $30 = 334 units" },
            { name: "Break-Even Revenue",   formula: "Break-Even Units × Selling Price",                             example: "334 × $50 = $16,700" },
            { name: "Profit / Loss",        formula: "(Units × SP) − (Units × VC) − Fixed Costs",                   example: "(500 × $50) − (500 × $20) − $10,000 = $5,000" },
            { name: "Margin of Safety %",   formula: "(Current Units − Break-Even Units) ÷ Current Units × 100",     example: "(500 − 334) ÷ 500 × 100 = 33.2%" },
            { name: "Target Profit Units",  formula: "(Fixed Costs + Target Profit) ÷ CM",                           example: "($10,000 + $5,000) ÷ $30 = 500 units" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-44 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-sm text-gray-800">{formula}</div>
              <div className="md:w-52 text-sm text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Industry Benchmarks ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Industry Break-Even Benchmarks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Fixed Costs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Variable Cost/Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Selling Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">BEU (approx.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Retail Store",       "$5,000/mo",  "$12",   "$30",   "278 units/mo"],
                ["SaaS Product",       "$8,000/mo",  "$5",    "$49",   "182 subscriptions/mo"],
                ["Restaurant",         "$12,000/mo", "$8",    "$22",   "857 covers/mo"],
                ["Freelancer",         "$2,000/mo",  "$0",    "$100",  "20 projects/mo"],
                ["Manufacturing",      "$25,000/mo", "$40",   "$90",   "500 units/mo"],
                ["Marketing Agency",   "$15,000/mo", "$20",   "$150",  "115 projects/mo"],
                ["Ecommerce Store",    "$3,500/mo",  "$15",   "$45",   "117 orders/mo"],
                ["Online Course",      "$1,200/mo",  "$0",    "$97",   "13 enrolments/mo"],
              ].map(([type, fc, vc, sp, beu]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{fc}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{vc}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{sp}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{beu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Figures are illustrative benchmarks based on typical operating structures. Actual costs vary by location, scale, and business model.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the break-even point and why does it matter?",
              a: "The break-even point is the level of sales at which total revenue exactly equals total costs — producing neither profit nor loss. It matters because it sets the minimum performance threshold for a business to be viable. Without knowing your break-even point, you cannot set meaningful sales targets, validate pricing, assess risk, or determine how much working capital you need before the business becomes self-sustaining. It is the first number every business owner should know.",
            },
            {
              q: "What is contribution margin and how is it different from profit?",
              a: "Contribution margin is the revenue left over after variable costs are subtracted from the selling price. It is the amount each unit sale 'contributes' toward covering fixed costs. Profit is what remains after fixed costs are also paid. Before break-even, every unit's contribution margin is paying down fixed costs. After break-even, every unit's contribution margin flows directly to profit. A business with a high contribution margin reaches profitability faster than one with a low margin, even if the price is lower.",
            },
            {
              q: "What is the difference between fixed costs and variable costs?",
              a: "Fixed costs remain constant regardless of production or sales volume — rent, insurance, full-time salaries, software subscriptions, and loan repayments. They are incurred whether you sell 1 unit or 10,000 units. Variable costs change in direct proportion to output — raw materials, per-item packaging, payment processing fees, sales commissions, and per-unit shipping. The distinction matters because reducing fixed costs lowers the break-even point permanently, while reducing variable costs raises the contribution margin on every unit sold.",
            },
            {
              q: "What is the margin of safety?",
              a: "Margin of safety measures how much current sales exceed the break-even point, expressed in units, revenue, or as a percentage. A 30% margin of safety means sales can fall by 30% before the business starts losing money. It is a direct measure of financial resilience. New businesses with thin margins of safety are highly vulnerable to demand fluctuations, seasonal dips, or cost increases. A healthy operating margin of safety for most small businesses is 20–35%.",
            },
            {
              q: "How do I reduce my break-even point?",
              a: "There are four levers: (1) Increase the selling price per unit — the most powerful lever, as it raises the contribution margin directly. (2) Reduce variable costs per unit through supplier negotiation, bulk purchasing, or process efficiency. (3) Reduce fixed costs by cutting overhead, renegotiating leases, or automating tasks that require headcount. (4) Improve your product mix toward higher-margin items so the weighted average contribution margin rises. Most businesses can achieve the fastest break-even improvement by combining a modest price increase with a targeted fixed-cost review.",
            },
            {
              q: "Can I use break-even analysis for a service business or freelancer?",
              a: "Yes. For pure service businesses with no per-client material cost, set variable cost to zero. Your selling price is your rate per project, session, or hour. Fixed costs are your monthly overhead — tools, subscriptions, office, phone, and any base salary you draw. The break-even is the number of projects or hours you need to bill each month to cover costs. Service businesses with low variable costs but high fixed costs (agencies, consultancies) often have high contribution margins and steep break-even points — but once crossed, profitability scales quickly.",
            },
            {
              q: "What is the contribution margin ratio and how do I use it?",
              a: "The contribution margin ratio (CM ratio) is the contribution margin expressed as a percentage of the selling price. A 60% CM ratio means 60 cents of every dollar of revenue goes toward fixed costs and profit, while 40 cents covers variable costs. It is most useful for comparing the profitability of different products — a product with a 70% CM ratio reaches break-even faster per dollar of revenue than one with a 40% ratio. For businesses selling multiple products, the weighted average CM ratio determines the overall break-even revenue.",
            },
            {
              q: "How does break-even analysis help with pricing decisions?",
              a: "Break-even analysis makes the consequences of pricing visible. By recalculating break-even units at different price points, you can directly compare how a $5 price increase changes the required sales volume. In most cases, the reduction in units required to break even at a higher price far outweighs the risk of losing a small number of price-sensitive customers. Break-even analysis also identifies the absolute floor price below which the business cannot be viable regardless of sales volume — the price at which contribution margin reaches zero.",
            },
            {
              q: "What is the target profit calculation?",
              a: "Target profit analysis extends break-even analysis to answer: 'How many units must I sell to achieve a specific profit goal?' The formula adds the target profit to fixed costs before dividing by the contribution margin: (Fixed Costs + Target Profit) ÷ CM. For example, if fixed costs are $10,000, target profit is $5,000, and CM is $30, you need to sell 500 units. This transforms break-even analysis from a minimum threshold into an active planning tool for setting sales targets.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your financial inputs — fixed costs, variable costs, selling prices, and profit targets — are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature stores data only in your browser's localStorage, which is local to your device. This makes the tool safe to use for confidential business financial planning without data privacy concerns.",
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
            { icon: "🚀", title: "Startup Founders",    desc: "Validate business model viability before committing capital — understanding the minimum sales volume needed to cover costs before signing a lease or hiring staff." },
            { icon: "🛍️", title: "Ecommerce Sellers",  desc: "Set product prices that account for platform fees, COGS, and shipping, while ensuring every SKU contributes positively to profitability at realistic sales volumes." },
            { icon: "📊", title: "Financial Analysts",  desc: "Perform break-even analysis for clients, business valuations, and investment feasibility assessments — with shareable URLs for transparent scenario modelling." },
            { icon: "💼", title: "Freelancers",         desc: "Calculate the minimum monthly projects or billable hours needed to cover business and personal expenses, then set income targets with the target profit feature." },
            { icon: "🏪", title: "Small Businesses",    desc: "Monitor the margin of safety in real time after cost changes, price adjustments, or seasonal shifts — catching an eroding break-even position before it becomes a cash flow problem." },
            { icon: "🎓", title: "Business Students",   desc: "Learn managerial accounting and business finance by modelling real-world scenarios across different industries, pricing strategies, and cost structures." },
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
