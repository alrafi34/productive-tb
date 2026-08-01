export default function AdSpendCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Ad Spend Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>ad spend calculator</strong> is a free browser-based tool that estimates how much you need to budget for a digital advertising campaign, working backward from whichever goal you already know — a target number of clicks, impressions, conversions, a revenue target, or a desired return on ad spend. It answers the planning question every advertiser faces before a campaign launches: <em>how much do I actually need to spend to hit this goal?</em>
          </p>
          <p>
            Every advertising platform — Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Amazon Ads — prices campaigns using one of a handful of standard models: cost per click, cost per thousand impressions, cost per acquisition, or a target return on ad spend. Rather than manually multiplying and dividing these figures in a spreadsheet, this calculator supports seven calculation modes covering every common budgeting approach, then automatically breaks the result into daily, weekly, and monthly spend — with optional tax, management fee, and safety buffer layered on top for a realistic, invoice-ready total.
          </p>
          <p>
            This tool is built for <strong>digital marketers, PPC specialists, Google Ads and Meta advertisers, TikTok and LinkedIn advertisers, Amazon sellers, Shopify store owners, agencies, freelancers, startup founders, small business owners, and marketing students</strong> who need to plan a budget before committing spend. It supports 16 global currencies, calculation history, scenario comparison, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Ad Spend Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Choose the calculation mode that matches the goal you already know, and the calculator applies the matching formula to estimate your base ad spend. It then layers your optional buffer, management fee, and tax percentages on top to produce a recommended total budget, and divides that total across your campaign duration to show daily, weekly, and monthly spend.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>CPC Budget = Desired Clicks × Average CPC</p>
              <p>CPM Budget = (Desired Impressions ÷ 1000) × CPM</p>
              <p>CPA Budget = Target Conversions × Average CPA</p>
              <p>ROAS Budget = Revenue Goal ÷ Expected ROAS</p>
              <p>ROI Budget = Revenue Goal ÷ (1 + Expected ROI ÷ 100)</p>
              <p>Revenue Goal Budget = (Revenue Goal ÷ AOV) × Average CPA</p>
              <p>Recommended Total = Base Budget × (1+Buffer%) × (1+Fee%) × (1+Tax%)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["CPC / CPM / CPA modes", "Use these when you know how many clicks, impressions, or conversions you need and the average price per unit — the most direct way to budget a campaign with known platform costs."],
              ["ROAS mode", "Use this when you have a specific revenue target and know your expected return on ad spend — common for ecommerce and performance marketing teams."],
              ["ROI mode", "Use this when you're planning around a target return on investment percentage rather than a raw revenue multiple."],
              ["Revenue Goal mode", "Use this when you want to reverse-engineer a budget from a revenue target using your average order value and cost per acquisition — useful for full-funnel ecommerce planning."],
              ["Custom mode", "Use this when you already know your total budget and simply need the daily, weekly, and monthly breakdown."],
              ["Buffer, Fee & Tax", "Applied sequentially on top of the base budget to produce a realistic, invoice-ready 'Recommended Total Budget' that accounts for a safety margin, agency management fees, and applicable tax."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Ad Spend Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select CPC, CPM, CPA, ROAS, ROI, Revenue Goal, or Custom Budget depending on which inputs you already know."],
                ["Select Your Currency", "Choose from 16 supported currencies including USD, EUR, GBP, INR, BDT, SAR, AED, and more."],
                ["Try a Platform Preset (Optional)", "Click Google Ads, Facebook Ads, TikTok Ads, LinkedIn Ads, or Amazon Ads to instantly load realistic average CPC benchmarks for that platform."],
                ["Enter Your Known Values", "Type the clicks, impressions, conversions, revenue goal, ROAS, or ROI relevant to your selected mode. Results update instantly with a 150ms debounce."],
                ["Set Advanced Options (Optional)", "Expand Advanced Options to set campaign duration, override the daily or monthly budget directly, or add tax, management fee, and buffer percentages."],
                ["Review Daily, Weekly, and Monthly Budget", "Check the Recommended Total Budget (including any buffer, fee, and tax) and how it breaks down across your campaign timeline."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two budgeting scenarios side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL with your exact inputs."],
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
                "7 calculation modes: CPC, CPM, CPA, ROAS, ROI, Revenue Goal, Custom",
                "16 supported currencies with proper symbol formatting",
                "Real-time results with 150ms debounced updates",
                "Platform presets for Google, Facebook, TikTok, LinkedIn, and Amazon Ads",
                "Daily, weekly, and monthly budget breakdown",
                "Optional tax, management fee, and buffer percentage layering",
                "Daily or monthly budget override for direct planning",
                "Projected revenue, profit, ROAS, and ROI for goal-based modes",
                "Formula and calculation breakdown shown for every result",
                "Compare-as-A/B scenario comparison mode",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past budgets",
                "No signup required — 100% free to use",
                "All processing runs locally — no data leaves your browser",
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
              title: "Google Ads Click Target Planning",
              scenario: "A PPC specialist wants to drive 5,000 clicks to a landing page at an average CPC of $0.80. Using CPC Budget mode, the calculator returns a base budget of $4,000. With a 10% buffer applied, the recommended total is $4,400, breaking down to roughly $146.67 per day across a 30-day campaign.",
            },
            {
              title: "Facebook Ads Impression Campaign",
              scenario: "A brand awareness campaign targets 2,000,000 impressions at an $8 CPM. Using CPM Budget mode, the calculator returns $16,000 as the base ad spend — the figure the marketer includes directly in the monthly media plan submitted for budget approval.",
            },
            {
              title: "Ecommerce Revenue Goal Reverse-Calculation",
              scenario: "A Shopify store owner wants to hit a $36,000 revenue goal, with an average order value of $120 and an average CPA of $25. Using Revenue Goal mode, the calculator determines 300 required conversions and a base budget of $7,500 — the exact ad spend needed to hit the revenue target at current funnel economics.",
            },
            {
              title: "Agency ROI-Based Budget Proposal",
              scenario: "An agency proposing a campaign promises a client a $50,000 revenue outcome at a 150% ROI target. Using ROI Budget mode, the calculator returns a required budget of $20,000 — a transparent, formula-backed number the agency includes in the client proposal alongside the ROI commitment.",
            },
            {
              title: "Agency Adding Management Fee and Tax",
              scenario: "An agency calculates a $4,000 base ad spend for a client campaign, then adds a 10% buffer, 15% management fee, and 5% local tax in Advanced Options. The Recommended Total Budget updates to $5,313 — the actual amount invoiced to the client, clearly itemized above the raw platform ad spend.",
            },
            {
              title: "Amazon Seller Comparing Two Campaign Scenarios",
              scenario: "An Amazon seller uses Compare as A/B to evaluate a CPC campaign targeting 3,000 clicks at $1.15 CPC (a $3,795 recommended total with a 10% buffer) against a CPA campaign targeting 160 conversions at $18 CPA (a $3,168 recommended total). Seeing both scenarios side by side helps the seller choose the CPA-based approach for this product launch.",
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
                "Always include a buffer percentage (10% is a reasonable default) to account for CPC and CPM fluctuations during an active campaign — auction-based pricing rarely stays perfectly flat over a full flight.",
                "Use ROAS mode when you think in terms of revenue multiples ('every dollar spent should return five') and ROI mode when you think in terms of profit percentage ('this campaign should return 150% on top of its cost') — they express the same underlying economics differently, and using whichever matches your team's reporting language avoids confusion.",
                "When quoting a client, always show both the base ad spend and the Recommended Total Budget including fees and tax — presenting only the raw platform spend figure without disclosed fees is a common source of billing disputes.",
                "Use the daily or monthly budget override fields when a platform enforces its own budget pacing rules that don't divide evenly across your campaign duration, rather than forcing the calculator's default division.",
                "Recalculate your budget whenever your average CPC, CPM, or CPA shifts meaningfully during a live campaign — a budget planned against week-one costs can become significantly under- or over-funded by week four.",
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
                "Don't use industry-average CPC or CPM benchmarks without adjusting for your specific audience, geography, and competition level — the platform presets in this tool are realistic starting points, not guarantees for your account.",
                "Don't confuse ROAS and ROI when communicating budgets to stakeholders. A 5x ROAS and a 400% ROI describe the same economics ($5 revenue per $1 spent, or $4 profit per $1 spent), but stating the wrong one can badly mislead a budget conversation.",
                "Don't forget to account for management fees and tax when your recommended budget will actually be invoiced to a client — quoting only the raw ad spend figure creates a mismatch between projected and actual costs.",
                "Don't divide a total budget evenly across every day of a campaign without considering real-world pacing — many advertisers front-load spend during a launch period and taper off, rather than spending a perfectly flat daily amount.",
                "Don't set Revenue Goal mode's average order value using your absolute average across all products if you're running a campaign for a specific product line — use the AOV specific to what the campaign is actually promoting.",
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

      {/* ── Formula Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["CPC Budget", "Clicks × CPC", "5,000 × $0.80 = $4,000"],
                ["CPM Budget", "(Impressions ÷ 1000) × CPM", "(2,000,000 ÷ 1000) × $8 = $16,000"],
                ["CPA Budget", "Conversions × CPA", "300 × $20 = $6,000"],
                ["ROAS Budget", "Revenue Goal ÷ ROAS", "$50,000 ÷ 5 = $10,000"],
                ["ROI Budget", "Revenue Goal ÷ (1 + ROI/100)", "$50,000 ÷ (1 + 1.5) = $20,000"],
                ["Revenue Goal Budget", "(Revenue ÷ AOV) × CPA", "($36,000 ÷ $120) × $25 = $7,500"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* The Recommended Total Budget applies buffer, management fee, and tax percentages on top of the base budget shown above.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is an ad spend calculator used for?",
              a: "An ad spend calculator estimates how much budget is needed to reach a specific advertising goal — a number of clicks, impressions, conversions, or a revenue target — using standard cost-per-unit pricing models. It's used for pre-campaign budget planning, client proposals, and comparing different budgeting scenarios before committing spend.",
            },
            {
              q: "How do I calculate ad spend from CPC and desired clicks?",
              a: "Multiply your desired number of clicks by your average cost per click: Budget = Clicks × CPC. For example, 5,000 desired clicks at an average CPC of $0.80 requires a budget of $4,000.",
            },
            {
              q: "How do I calculate ad spend from CPM and impressions?",
              a: "Divide your desired impressions by 1,000, then multiply by your CPM rate: Budget = (Impressions ÷ 1000) × CPM. For example, 2,000,000 impressions at an $8 CPM requires a budget of $16,000.",
            },
            {
              q: "What is the difference between ROAS and ROI budgeting?",
              a: "ROAS (Return on Ad Spend) expresses revenue as a multiple of spend — a 5x ROAS means $5 of revenue for every $1 spent, so Budget = Revenue Goal ÷ ROAS. ROI (Return on Investment) expresses profit as a percentage of spend — a 400% ROI means $4 of profit for every $1 spent, so Budget = Revenue Goal ÷ (1 + ROI/100). Both describe similar economics from different angles, and this calculator supports both directly.",
            },
            {
              q: "How do management fees and taxes affect my ad spend budget?",
              a: "This calculator applies your buffer, management fee, and tax percentages sequentially on top of the base ad spend to produce a 'Recommended Total Budget' — the realistic, all-in figure you'd actually need to fund or invoice, distinct from the raw platform ad spend that the base formula calculates.",
            },
            {
              q: "What is a reasonable buffer percentage to add to an ad budget?",
              a: "A 10–15% buffer is a common default to absorb normal CPC and CPM fluctuations during a campaign's flight. Highly competitive or auction-volatile placements (like trending keywords or seasonal retail periods) may warrant a 20% or higher buffer to avoid underfunding the campaign mid-flight.",
            },
            {
              q: "How is daily budget calculated from a total budget?",
              a: "Daily Budget = Recommended Total Budget ÷ Campaign Duration in Days. Weekly and monthly figures are then derived by multiplying the daily budget by 7 or 30 respectively. You can also override the daily or monthly figure directly if a platform enforces its own budget pacing structure.",
            },
            {
              q: "What is the Revenue Goal mode's average order value (AOV) used for?",
              a: "In Revenue Goal mode, AOV converts your revenue target into a required number of conversions (Revenue Goal ÷ AOV), which is then multiplied by your average CPA to determine the required ad spend. This mode is useful for ecommerce planning where you think in terms of total revenue rather than a single ROAS multiple.",
            },
            {
              q: "Can I use this calculator for platforms other than Google or Facebook Ads?",
              a: "Yes. The CPC, CPM, CPA, ROAS, and ROI formulas are universal pricing models used across nearly every digital advertising platform, including TikTok Ads, LinkedIn Ads, Amazon Ads, Pinterest Ads, and programmatic display networks. The platform presets simply provide realistic starting CPC benchmarks — the underlying math applies to any platform.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your budget figures, revenue goals, and campaign data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "📊", title: "Digital Marketers & PPC Specialists", desc: "Plan campaign budgets before launch using whichever metric they already have — clicks, impressions, conversions, or a revenue target." },
            { icon: "🏢", title: "Marketing Agencies",    desc: "Build transparent client proposals that separate raw ad spend from management fees and tax, and compare scenarios before presenting a recommendation." },
            { icon: "🛒", title: "Amazon Sellers & Shopify Owners", desc: "Reverse-engineer required ad spend from a revenue goal using average order value and CPA, tailored to ecommerce funnel economics." },
            { icon: "🚀", title: "Startup Founders",     desc: "Estimate marketing budgets before committing runway to paid acquisition, and model ROI-based scenarios for investor or board reporting." },
            { icon: "🏪", title: "Small Business Owners", desc: "Plan a realistic monthly ad budget across Google, Facebook, or other platforms without needing an agency's media planning tools." },
            { icon: "🎓", title: "Marketing Students",   desc: "Learn how CPC, CPM, CPA, ROAS, and ROI relate to each other in practice, and see how budget scales with different campaign goals." },
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
