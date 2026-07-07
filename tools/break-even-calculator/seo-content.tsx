export default function BreakEvenCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Break Even Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Start</h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Fixed Costs", "Enter all costs that stay the same regardless of sales — rent, salaries, insurance, subscriptions."],
                ["Variable Cost per Unit", "Enter the cost to produce or deliver one unit — materials, packaging, shipping."],
                ["Selling Price per Unit", "Enter the price customers pay per unit. Must be greater than variable cost."],
                ["Optional Inputs", "Add current units sold for profit/loss analysis, or a target profit to find the required sales volume."],
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
                "Break-even units and revenue",
                "Contribution margin and CM ratio",
                "Profit/loss based on current units sold",
                "Margin of safety (units, revenue, %)",
                "Units needed to hit a target profit",
                "12 currency options",
                "Export TXT and CSV reports",
                "Shareable URL and calculation history",
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
          Break-Even Formulas &amp; Examples
        </h2>
        <div className="space-y-4 mb-6">
          {[
            { name: "Contribution Margin",  formula: "CM = Selling Price − Variable Cost per Unit",                      example: "$50 − $20 = $30" },
            { name: "CM Ratio",             formula: "CM Ratio = Contribution Margin ÷ Selling Price",                   example: "$30 ÷ $50 = 60%" },
            { name: "Break-even Units",     formula: "BEU = Fixed Costs ÷ Contribution Margin",                          example: "$10,000 ÷ $30 = 334 units" },
            { name: "Break-even Revenue",   formula: "BER = Break-even Units × Selling Price",                           example: "334 × $50 = $16,700" },
            { name: "Profit",               formula: "Profit = (Units × SP) − (Units × VC) − Fixed Costs",              example: "(500 × $50) − (500 × $20) − $10,000 = $5,000" },
            { name: "Margin of Safety",     formula: "MoS% = (Current Sales − BEU) ÷ Current Sales × 100",              example: "(500 − 334) ÷ 500 × 100 = 33.2%" },
            { name: "Target Profit Units",  formula: "Units = (Fixed Costs + Target Profit) ÷ CM",                      example: "($10,000 + $5,000) ÷ $30 = 500 units" },
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

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Industry Presets — Typical Inputs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Fixed Costs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Variable Cost/Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Selling Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">BEU (approx.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Retail Store",     "$5,000",  "$12",  "$30",  "278 units"],
                ["SaaS (Monthly)",   "$8,000",  "$5",   "$49",  "182 subscriptions"],
                ["Restaurant",       "$12,000", "$8",   "$22",  "857 covers"],
                ["Freelancer",       "$2,000",  "$0",   "$100", "20 hours/projects"],
                ["Manufacturing",    "$25,000", "$40",  "$90",  "500 units"],
                ["Agency",           "$15,000", "$20",  "$150", "115 projects"],
              ].map(([type, fc, vc, sp, beu]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 font-mono">{fc}</td>
                  <td className="py-2.5 px-4 font-mono">{vc}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{sp}</td>
                  <td className="py-2.5 px-4 font-mono">{beu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is the break-even point?", a: "The break-even point is the level of sales at which total revenue equals total costs — generating neither profit nor loss. It answers the critical question: 'How many units do I need to sell to cover all my costs?' Any sales above break-even generate profit." },
            { q: "What is contribution margin?", a: "Contribution margin (CM) is the amount each unit sale contributes toward covering fixed costs and generating profit. It's calculated as Selling Price minus Variable Cost per Unit. A higher CM means fewer units are needed to break even." },
            { q: "What is margin of safety?", a: "Margin of safety measures how much sales can decline before reaching the break-even point. For example, a 30% margin of safety means sales can fall 30% before you start losing money. A larger margin of safety means a more financially resilient business." },
            { q: "What is the difference between fixed and variable costs?", a: "Fixed costs remain constant regardless of production volume — rent, insurance, salaries, and loan payments. Variable costs change in direct proportion to output — materials, shipping, commissions, and production labor. Correctly separating these is critical for accurate break-even analysis." },
            { q: "How do I reduce my break-even point?", a: "You can lower the break-even point by: (1) increasing the selling price per unit, (2) reducing variable costs per unit through supplier negotiation or process efficiency, (3) reducing fixed costs by cutting overhead, or (4) improving your product mix toward higher-margin items." },
            { q: "Can the break-even calculator be used for services?", a: "Yes. For service businesses, treat your monthly overhead (office, tools, subscriptions, base salary) as fixed costs. Set variable cost to $0 if there's no per-client material cost, or include your per-project cost. The selling price is your rate per project or hour." },
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
            { icon: "🚀", title: "Startup Founders",      desc: "Validate business model viability before launch by understanding the minimum sales volume needed to cover costs." },
            { icon: "🛍️", title: "Ecommerce Sellers",    desc: "Set product prices that account for platform fees, shipping, and COGS while ensuring every product line is profitable." },
            { icon: "📊", title: "Financial Analysts",    desc: "Perform break-even analysis for clients, business valuations, and investment feasibility assessments." },
            { icon: "🏪", title: "Retail Businesses",     desc: "Determine the minimum monthly sales needed to cover rent, staff, and inventory before generating any profit." },
            { icon: "💼", title: "Freelancers",           desc: "Calculate the minimum number of projects or billable hours needed each month to cover business and personal expenses." },
            { icon: "🎓", title: "Students",              desc: "Learn managerial accounting and business finance by practicing break-even analysis with real-world scenarios." },
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
