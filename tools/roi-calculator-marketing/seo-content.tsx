import React from "react";

export default function ROICalculatorMarketingSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an ROI Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>ROI calculator</strong> is a free online tool that applies the{" "}
            <strong>return on investment formula</strong> — (Revenue minus Investment) divided by
            Investment, multiplied by 100 — to instantly calculate how profitable a campaign,
            project, or business decision was. It answers the fundamental question behind every
            marketing budget and business investment:{" "}
            <em>did this spend generate more money than it cost?</em>
          </p>
          <p>
            ROI is the universal language of business performance. A Google Ads campaign, an SEO
            retainer, an influencer partnership, a product launch, and a real estate rental all get
            measured with the same formula. The number cuts through platform-specific metrics and
            gives every stakeholder — founder, CFO, client, or board — a single percentage that
            answers whether the investment was worth making.
          </p>
          <p>
            This <strong>marketing ROI calculator</strong> is built for{" "}
            <strong>digital marketers measuring campaign returns, PPC advertisers calculating
            ad spend ROI, startup founders evaluating growth channel efficiency, ecommerce
            businesses tracking promotion profitability, marketing agencies reporting client
            results, and financial analysts incorporating marketing into business models</strong>.
            Real-time ROI, profit, and performance badge. Multiple currencies, CSV export,
            calculation history, shareable URL. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. Formula ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          ROI Formula and Related Calculations
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The core <strong>ROI formula</strong> is simple but has several equivalent forms
            depending on what you already know. All produce the same result — use whichever
            matches the data you have.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">ROI Formula Variants</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Standard ROI</span> = ((Revenue − Investment) ÷ Investment) × 100</p>
              <p className="text-gray-500 text-xs ml-4">Example: (($1,500 − $1,000) ÷ $1,000) × 100 = <strong>50% ROI</strong></p>
              <p className="mt-3"><span className="font-semibold">ROI from Profit</span> = (Net Profit ÷ Investment) × 100</p>
              <p className="text-gray-500 text-xs ml-4">Example: ($500 profit ÷ $1,000) × 100 = <strong>50% ROI</strong></p>
              <p className="mt-3"><span className="font-semibold">Marketing ROI Formula</span> = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100</p>
              <p className="text-gray-500 text-xs ml-4">Example: (($12,500 − $5,000) ÷ $5,000) × 100 = <strong>150% ROI</strong></p>
              <p className="mt-3"><span className="font-semibold">ROI Multiplier</span> = Revenue ÷ Investment</p>
              <p className="text-gray-500 text-xs ml-4">Example: $1,500 ÷ $1,000 = <strong>1.5× return</strong> (= 50% ROI)</p>
              <p className="mt-3"><span className="font-semibold">Required Revenue (Target ROI)</span> = Investment × (1 + Target ROI ÷ 100)</p>
              <p className="text-gray-500 text-xs ml-4">Example: $10,000 × 1.30 = <strong>$13,000 revenue needed for 30% ROI</strong></p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>ROI vs ROAS</strong> — ROI uses total investment (all costs). ROAS uses ad spend only and excludes COGS, labour, and overhead. ROAS is always higher than ROI for the same campaign.</li>
            <li>• <strong>ROI vs profit margin</strong> — profit margin = profit ÷ revenue. ROI = profit ÷ cost. A 50% ROI equals a 33% profit margin on the same transaction.</li>
            <li>• <strong>Annualized ROI</strong> — for multi-year investments: Annualized ROI = ((1 + ROI/100)^(1/n) − 1) × 100, where n = years. A 50% ROI over 2 years = 22.5% annualized.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the ROI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Enter Your Investment", "Type the total amount invested — for a marketing campaign, include all costs: ad spend, agency fees, creative production, tool subscriptions, and allocated staff time. For business investments, include all capital deployed. Understating investment inflates ROI and produces misleading results."],
              ["Enter Your Revenue", "Type the total revenue or return generated directly from this investment during the measurement period. For marketing campaigns, use attributed revenue from your analytics platform. For business investments, use the total monetary return including asset value if applicable."],
              ["Select Your Currency", "Choose from 9 supported currencies including USD, EUR, GBP, INR, AED, and more. Currency formatting is applied to the output only — no conversion is performed."],
              ["Use Industry Presets (Optional)", "Click any preset button to load a real-world example — useful for benchmarking your result or demonstrating the formula to a client or stakeholder without entering numbers manually."],
              ["Read ROI, Profit, and Performance Badge", "Results update instantly: ROI percentage, net profit or loss, the revenue multiplier (e.g. 2.5×), and a performance badge (Exceptional / Excellent / Good / Average / Loss). The plain-language interpretation explains what the number means in context."],
              ["Export or Share", "Copy to clipboard, download as CSV or TXT, or use the shareable URL to send the exact calculation with all inputs pre-filled to a client or colleague."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tool Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time ROI calculation as you type",
                "Profit / Loss / Break-Even status indicator",
                "Revenue multiplier display (e.g. 2.5×)",
                "Performance badge with plain-language interpretation",
                "9 currency options (USD, EUR, GBP, INR, AED, and more)",
                "Industry preset buttons for quick benchmarking",
                "Calculation history saved locally",
                "Copy result or full breakdown to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
                "Browser-based — no signup required",
                "Works on mobile and tablet",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Google Ads Campaign ROI",
              scenario: "A PPC manager runs a search campaign with $8,400 total spend (including agency fees) and generates $22,680 in attributed revenue over 30 days. Entering $8,400 investment and $22,680 revenue returns 170% ROI and a $14,280 net profit. They share the shareable URL with the CFO to justify a budget increase for next month.",
            },
            {
              title: "SEO Retainer Justification",
              scenario: "An in-house SEO lead pays $3,500/month for an agency retainer. Organic traffic generates $21,000 in monthly attributed revenue. ROI = (($21,000 − $3,500) ÷ $3,500) × 100 = 500%. They use the CSV export in the quarterly marketing review to demonstrate the SEO channel outperforms paid at 6× the return.",
            },
            {
              title: "Email Campaign Profitability",
              scenario: "A D2C brand sends a promotional email campaign costing $800 in platform fees and design. The campaign generates $9,600 in tracked revenue. ROI = (($9,600 − $800) ÷ $800) × 100 = 1,100%. They note this 12× return and increase email send frequency to weekly, applying the same creative template to additional segments.",
            },
            {
              title: "Influencer Partnership Evaluation",
              scenario: "A brand pays $5,000 for a sponsored post with a fitness influencer. The tracked promo code generates $4,200 in sales. ROI = (($4,200 − $5,000) ÷ $5,000) × 100 = −16%. The negative ROI flags the partnership as unprofitable on immediate attributed sales. The brand decides the brand awareness value doesn't justify a repeat — and reallocates budget to a content creator with a proven conversion track record.",
            },
            {
              title: "Product Launch Investment",
              scenario: "A founder invests $25,000 in a new product launch — $12,000 in inventory, $8,000 in ads, $5,000 in design and packaging. First-month revenue is $43,750. ROI = (($43,750 − $25,000) ÷ $25,000) × 100 = 75%. They model the second month with reduced ad spend ($4,000) and project ROI rising to 140% once upfront design and packaging costs are excluded.",
            },
            {
              title: "Agency Client Monthly Report",
              scenario: "A digital agency manages a $15,000/month ad budget for a B2B SaaS client. The campaigns generated 42 qualified leads, each with a $1,200 attributed LTV. Total revenue = $50,400. ROI = (($50,400 − $15,000) ÷ $15,000) × 100 = 236%. The agency uses the calculator's shareable URL in the monthly report, linking directly to the pre-filled calculation for client transparency.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Include ALL costs in the investment figure", "Ad spend alone is not the full investment. A Google Ads campaign also consumes agency management time (at billable rate), creative production costs, landing page development, and tracking setup. A $10,000 ad spend campaign with $4,000 in overhead has a $14,000 true investment cost. Using only ad spend inflates ROI by 40% before a single calculation."],
                ["Use attributed revenue, not total revenue", "Not every dollar of revenue during a campaign period came from that campaign. Use direct attribution from your analytics platform — last-click, first-click, or linear attribution — and be consistent about which model you use. Mixing attribution models across campaigns makes ROI comparisons meaningless."],
                ["Set a minimum ROI threshold before investing", "Work backwards: what conversion rate, average order value, and CPC combination produces a profitable ROI? Calculate the break-even point before launching a campaign. If your break-even requires a 6% conversion rate but your landing page historically converts at 2%, the campaign will lose money at current performance — optimize first."],
                ["Track ROI over the full customer lifecycle, not just first purchase", "A campaign that generates a -20% ROI on first purchases can be highly profitable if customers repurchase. Customer lifetime value (LTV) is the correct revenue figure for subscription, SaaS, and high-repurchase categories. Single-session ROI alone undervalues channels with strong retention."],
                ["Use ROI to compare channels, not just evaluate them individually", "An email campaign with 800% ROI and a Google Ads campaign with 150% ROI don't exist in isolation — budget allocated to email displaces budget from paid. ROI comparison across channels is the correct basis for budget allocation decisions, not absolute profit figures."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">💡</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Mistakes</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Confusing ROI with ROAS", "ROAS (Return on Ad Spend) = Revenue ÷ Ad Spend. It excludes all costs except the ad spend itself. ROAS of 4× (400%) sounds strong but may still be a negative ROI once COGS, fulfilment, and overhead are factored in. A 4× ROAS with a 50% margin is only 100% ROI. Always calculate ROI using total cost, not just ad spend."],
                ["Measuring ROI over too short a period", "SEO, content marketing, and brand campaigns take months to produce revenue. Measuring ROI after 30 days on a 12-month content investment produces a misleading negative result. Match the measurement window to the campaign's natural payback period — short for PPC, long for organic and brand channels."],
                ["Using revenue instead of gross profit as the return", "For ecommerce, the return should be gross profit, not revenue. If you spend $5,000 on ads and generate $15,000 in revenue at a 40% margin, the actual profit is $6,000, not $10,000. True ROI = (($6,000 − $5,000) ÷ $5,000) × 100 = 20%, not (($15,000 − $5,000) ÷ $5,000) × 100 = 200%."],
                ["Comparing ROI across different time windows", "An email campaign with 3 days to ROI and an SEO project with 8 months to ROI cannot be compared with a simple ROI percentage. Time matters — use annualized ROI when comparing investments with different payback periods."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Formula Reference & Benchmarks ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          ROI Formula Reference & Marketing Benchmarks
        </h2>

        {/* Formula reference */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">Formula Reference</h3>
        <div className="space-y-3 mb-8">
          {[
            { name: "ROI",                    formula: "((Revenue − Investment) ÷ Investment) × 100",      example: "(($12,500 − $5,000) ÷ $5,000) × 100 = 150%" },
            { name: "Net Profit",             formula: "Revenue − Investment",                             example: "$12,500 − $5,000 = $7,500" },
            { name: "Revenue Multiplier",     formula: "Revenue ÷ Investment",                             example: "$12,500 ÷ $5,000 = 2.5×" },
            { name: "ROAS",                   formula: "Revenue ÷ Ad Spend (only)",                        example: "$12,500 ÷ $3,000 = 4.17× ROAS" },
            { name: "Required Revenue",       formula: "Investment × (1 + Target ROI ÷ 100)",              example: "$5,000 × 1.50 = $7,500 needed for 50% ROI" },
            { name: "Break-Even Revenue",     formula: "Investment × 1.0",                                 example: "$5,000 — must generate $5,000 to break even" },
            { name: "Annualized ROI",         formula: "((1 + ROI/100)^(1/years) − 1) × 100",             example: "50% over 2 years = ((1.50)^0.5 − 1) × 100 = 22.5%/yr" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-44 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-xs text-gray-800">{formula}</div>
              <div className="md:w-56 text-xs text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>

        {/* Marketing ROI benchmarks */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">Marketing ROI Benchmarks by Channel</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Channel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical ROI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Email Marketing",       "3,600%+",   "~$36 return per $1 spent — highest ROI channel. Assumes quality list and relevant offers."],
                ["SEO (Organic Search)",  "200–400%",  "Long-term compounding returns. High upfront cost but near-zero marginal cost at scale."],
                ["Content Marketing",     "300–600%",  "Lower short-term ROI but builds durable organic traffic assets that compound over years."],
                ["Google Ads (Search)",   "100–200%",  "Average 2:1 revenue return. High variance by industry — legal and finance CPCs can exceed $50."],
                ["Social Media Ads",      "50–200%",   "Wide range by platform and audience quality. Cold traffic ROI is typically lower than retargeting."],
                ["Affiliate Marketing",   "400–800%",  "Very high ROI when affiliates are quality-controlled. Commission-only model eliminates upfront risk."],
                ["Influencer Marketing",  "100–600%",  "Depends heavily on niche, audience quality, and attribution method used."],
                ["Paid Social (Meta)",    "50–150%",   "Lower ROI than search due to lower purchase intent. Retargeting significantly outperforms prospecting."],
                ["Direct Mail",           "50–300%",   "Declining channel but high ROI for specific demographics and high-value B2B offers."],
                ["Trade Shows / Events",  "0–200%",    "Highly variable. Difficult to attribute. Long sales cycles make single-event ROI hard to measure."],
              ].map(([channel, roi, note]) => (
                <tr key={channel} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{channel}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{roi}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Benchmarks are approximate industry averages. Actual ROI depends on execution quality, industry, audience, attribution method, and market conditions.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the ROI formula?",
              a: "The ROI formula is: ROI = ((Revenue − Investment) ÷ Investment) × 100. This gives a percentage — how much return you earned relative to what you invested. If you invested $5,000 and generated $12,500 in revenue, your ROI is (($12,500 − $5,000) ÷ $5,000) × 100 = 150%. An ROI above 0% means you made a profit; below 0% means a loss; exactly 0% is break-even.",
            },
            {
              q: "What is a good ROI for marketing?",
              a: "A common benchmark is that a marketing ROI of 5:1 (500%) is considered strong, and 10:1 (1,000%) is exceptional. However, what's good depends heavily on the channel and business model. Google Ads typically delivers 100–200% ROI. Email marketing can exceed 3,600%. SEO compounds to 200–400% over time. The best benchmark is your own historical average — improving that by 20% is more actionable than chasing an industry figure.",
            },
            {
              q: "What is the marketing ROI formula?",
              a: "The marketing ROI formula is the same as the standard ROI formula applied specifically to marketing spend: ((Revenue Attributed to Campaign − Marketing Cost) ÷ Marketing Cost) × 100. The critical variable is 'revenue attributed to campaign' — this should come from your analytics attribution model (last click, first click, or linear), not your total revenue during the campaign period.",
            },
            {
              q: "What is the difference between ROI and ROAS?",
              a: "ROAS (Return on Ad Spend) equals revenue divided by ad spend only — it excludes all other costs like COGS, fulfillment, and overhead. ROI uses total investment including all costs. A campaign with 400% ROAS sounds excellent but may be a negative ROI once a 70% COGS and $2,000 in agency fees are included. Always calculate ROI using full cost, not just ad spend, when evaluating true profitability.",
            },
            {
              q: "Can ROI be negative?",
              a: "Yes. A negative ROI means the campaign or investment cost more than it returned, producing a net loss. For example, $10,000 invested that generates $8,000 in revenue has an ROI of −20%. Negative ROI is common in early-stage campaigns before optimization, brand awareness investments with deferred returns, and market-entry strategies where short-term losses build long-term position.",
            },
            {
              q: "What is the ROI equation for real estate?",
              a: "For rental property, ROI is typically calculated as: Annual Net Income ÷ Total Investment × 100. Annual net income equals rental revenue minus all operating expenses (mortgage, taxes, insurance, maintenance, management). Total investment equals the down payment plus closing costs and any renovation costs. This is sometimes also expressed as cap rate (net operating income ÷ property value) or cash-on-cash return (annual cash flow ÷ cash invested).",
            },
            {
              q: "What is the difference between ROI and rate of return?",
              a: "ROI is a simple percentage measure of profit relative to cost for a specific investment. Rate of return (RoR) often refers to the annual or annualized return, incorporating the time dimension. A 50% ROI over 2 years equals approximately 22.5% annualized rate of return. For long-term investments, annualized rate of return is more meaningful than simple ROI because it accounts for how quickly the investment paid back.",
            },
            {
              q: "How do I calculate ROI for a Google Ads campaign?",
              a: "Pull total campaign cost (including any agency management fees) and total attributed revenue (using Google Ads conversion tracking or Google Analytics) for the same date range. Enter cost as Investment and revenue as Revenue in this calculator. For ecommerce, use gross margin dollars as revenue rather than gross sales if you want a true profitability figure. A 4× ROAS with 40% margin equals 60% ROI — a 4× ROAS with 20% margin is a −20% ROI.",
            },
            {
              q: "What is break-even ROI?",
              a: "Break-even ROI is 0% — the point where revenue exactly equals investment and neither profit nor loss is made. Break-even analysis is useful for setting minimum performance targets: what conversion rate, average order value, and CPC combination is needed to reach 0% ROI before any campaign goes live? If the break-even requires conditions you can't realistically achieve, the campaign economics are fundamentally unworkable at current pricing.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your investment figures, revenue amounts, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📢", title: "Digital Marketers", desc: "Evaluate campaign performance across Google Ads, Meta, email, and SEO to justify budget allocation, compare channels by return, and prove marketing value to stakeholders." },
            { icon: "🛍️", title: "Ecommerce Businesses", desc: "Measure return on ad spend and promotion campaigns against gross margin — not just revenue — to identify which campaigns are profitable after COGS and fulfillment are accounted for." },
            { icon: "🚀", title: "Startup Founders", desc: "Assess growth channel efficiency before scaling spend, validate early marketing experiments with real numbers, and build ROI-based business cases for investor conversations." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Generate transparent ROI reports for clients to demonstrate campaign value, justify retainers with hard numbers, and support budget renewal conversations with attribution data." },
            { icon: "📊", title: "Financial Analysts", desc: "Incorporate marketing ROI into broader business performance models, compare channel efficiency across business units, and build investment justification documents for board presentations." },
            { icon: "🎓", title: "Marketing Students", desc: "Practice the ROI formula with real-world marketing scenarios, understand the difference between ROI and ROAS, and build the analytical foundation for performance marketing roles." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
