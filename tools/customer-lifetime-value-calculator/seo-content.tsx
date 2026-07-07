export default function CLVCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Customer Lifetime Value (CLV) Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Customer Lifetime Value (CLV) calculator</strong> tells you how much revenue — or profit — a single customer is worth over their entire relationship with your business. It is the metric that answers the question underlying every marketing budget decision: <em>how much can I afford to spend to acquire one customer?</em> Without CLV, acquisition budgets are guesswork. With it, every spend decision has a defensible ceiling.
          </p>
          <p>
            CLV connects acquisition cost to long-term value in a way that no single-period metric can. A customer who buys once for $50 has a different CLV than a customer who buys four times a year for three years at the same price. A SaaS customer paying $80/month with 3% churn has a completely different CLV profile than one paying $150/month with 8% churn. This calculator supports four distinct formulas — Basic, Margin-Adjusted, Subscription, and SaaS/Predictive — so the calculation matches your actual business model.
          </p>
          <p>
            Built for <strong>SaaS founders, ecommerce operators, subscription businesses, marketing teams, financial analysts, and business students</strong> who need accurate CLV figures for budgeting, investor decks, channel analysis, and retention investment decisions. Supports 12 currencies, calculates Net CLV and CAC payback period, exports to CSV/TXT, and runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How CLV Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Different business models require different CLV formulas. A retail brand with seasonal purchase patterns calculates CLV differently than a SaaS company with measurable monthly churn. This calculator provides four methods — choose the one that fits your revenue model:
          </p>
          <div className="space-y-4 mt-2">
            {[
              {
                name: "Basic CLV",
                formula: "Average Order Value × Purchase Frequency (per year) × Customer Lifespan (years)",
                example: "$80 × 10 × 4 = $3,200",
                when: "Best for ecommerce and retail with consistent repeat purchase patterns. Uses revenue, not profit.",
              },
              {
                name: "Margin-Adjusted CLV",
                formula: "AOV × Frequency × Lifespan × Gross Margin %",
                example: "$80 × 10 × 4 × 75% = $2,400",
                when: "Use when you want to express CLV as profit contribution, not gross revenue. Essential for businesses with significant COGS.",
              },
              {
                name: "Subscription CLV",
                formula: "Monthly Revenue × Lifetime (months) × Gross Margin %",
                example: "$50 × 36 × 80% = $1,440",
                when: "Ideal for subscription boxes, membership services, or SaaS with fixed pricing and known average lifetime.",
              },
              {
                name: "SaaS / Predictive CLV",
                formula: "(ARPU × Gross Margin %) ÷ Monthly Churn Rate",
                example: "($80 × 80%) ÷ 4% = $1,600",
                when: "Most accurate for SaaS and subscription businesses with a measurable monthly churn rate. Churn is the dominant variable — small changes in churn produce large CLV changes.",
              },
            ].map(({ name, formula, example, when }) => (
              <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{name}</h3>
                <p className="font-mono text-sm text-gray-800 bg-white border border-gray-200 rounded px-3 py-2 mb-2">{formula}</p>
                <p className="text-sm text-primary font-semibold font-mono mb-1">Example: {example}</p>
                <p className="text-xs text-gray-500">{when}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            The calculator also derives <strong>Net CLV</strong> (CLV minus Customer Acquisition Cost) and <strong>CAC Payback Period</strong> (months to recover CAC from monthly customer value) when a CAC figure is provided.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CLV Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Method", "Select Basic, Margin-Adjusted, Subscription, or SaaS. Pick the one that matches how your customers generate revenue — by repeat purchase, monthly subscription, or predictive churn-based modelling."],
                ["Enter Your Business Inputs", "For Basic/Margin: enter Average Order Value, Purchase Frequency per year, and Customer Lifespan in years. For Subscription: monthly revenue per customer and lifetime in months. For SaaS: ARPU and Monthly Churn Rate."],
                ["Add Gross Margin (Recommended)", "Enter your gross margin percentage to calculate profit-adjusted CLV rather than revenue CLV. This is the figure that matters for profitability decisions — especially for businesses with significant COGS or service delivery costs."],
                ["Add CAC (Optional)", "Enter your Customer Acquisition Cost to unlock Net CLV and CAC Payback Period outputs — showing exactly how much each customer is worth after acquisition cost, and how many months to recover that cost."],
                ["Read and Export Results", "CLV, Net CLV, annual value, monthly value, and payback period update in real time. Export as CSV or TXT, copy the summary to clipboard, or share the result via the permanent URL."],
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
                "Four CLV formulas — Basic, Margin-Adjusted, Subscription, SaaS",
                "Real-time calculation as you type",
                "Performance badge: Excellent / Good / Average / Low / Very Low",
                "Net CLV after deducting Customer Acquisition Cost",
                "CAC Payback Period in months",
                "Annual and monthly value breakdowns",
                "12 currency options (USD, EUR, GBP, INR, and more)",
                "Step-by-step formula breakdown shown",
                "Export full report as CSV or TXT",
                "Shareable URL — every calculation gets a permanent link",
                "Calculation history saved locally (up to 20 entries)",
                "100% browser-based — no data leaves your device",
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
              title: "Setting a Maximum Viable CPA for Paid Ads",
              scenario: "An ecommerce brand calculates CLV using the Margin-Adjusted formula: $90 AOV × 8 purchases/year × 3 years × 60% margin = $1,296 CLV. They set their maximum CPA at one-third of CLV — $432 — for new customer acquisition. Any ad campaign exceeding this threshold is paused or restructured. This single CLV figure defines the entire paid acquisition strategy.",
            },
            {
              title: "SaaS Churn Sensitivity Analysis",
              scenario: "A SaaS founder models the impact of reducing churn using the SaaS formula with $95 ARPU and 80% gross margin. At 5% monthly churn: CLV = ($95 × 80%) ÷ 5% = $1,520. At 3% churn: $2,533 — a 67% increase in CLV from a 2-point churn improvement. This analysis directly justifies a $40,000 investment in customer success tooling, which needs to prevent fewer than 27 churns per year to pay for itself.",
            },
            {
              title: "Investor Pitch Unit Economics",
              scenario: "A subscription startup uses the Subscription CLV formula to model customer value for a Series A pitch. At $35/month, 24-month average lifetime, and 75% gross margin: CLV = $35 × 24 × 75% = $630. Against a $120 CAC, Net CLV = $510 and CAC Payback Period = $120 ÷ ($35 × 75% / 12) = 5.4 months. The shareable URL for this calculation is embedded directly in the investor deck appendix.",
            },
            {
              title: "Comparing CLV Across Acquisition Channels",
              scenario: "A DTC brand finds that customers acquired via referral have an AOV of $110, purchase 9 times/year, and stay for 3.5 years — giving a CLV of $3,465. Customers acquired via paid social have an AOV of $75, purchase 5 times/year, and stay for 1.8 years — CLV of $675. Despite higher CPA on the referral channel ($180 vs. $45), the CLV:CPA ratio is dramatically better (19× vs. 15×), justifying a larger investment in referral program infrastructure.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Always use Margin-Adjusted CLV, not Basic CLV, for profitability decisions. Basic CLV is revenue — it tells you how much a customer spends. Margin-adjusted CLV is profit — it tells you how much you actually keep. These two figures can differ by 50–80%, and using the wrong one leads to drastically overstated acquisition budgets.",
                "For SaaS, reducing churn is more powerful than increasing ARPU. In the SaaS formula, CLV = (ARPU × Margin) ÷ Churn. Reducing churn from 5% to 3% increases CLV by 67%. Increasing ARPU by the same relative amount increases CLV by the same percentage — but churn reductions are usually more achievable and sustainable at scale.",
                "Segment CLV by acquisition channel, not just in aggregate. Customers acquired through referral, organic search, and paid social typically have dramatically different CLVs due to differences in intent, product fit, and engagement. Channel-level CLV determines which acquisition sources are truly profitable — blended CLV hides the differences.",
                "Set your target CPA at 25–33% of CLV, not 100%. Spending 100% of CLV on acquisition leaves nothing for operating costs, refunds, or profit. A CPA of 1/3 CLV with a 3× LTV:CAC ratio is the standard benchmark for healthy, scalable growth.",
                "Recalculate CLV annually or when key inputs change. Purchase frequency, gross margin, and churn rate all shift over time. An LTV figure from 18 months ago during a high-growth phase may significantly overstate current customer value if retention has degraded.",
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
                "Don't use theoretical customer lifespan inputs. Inputting '10 years' because it sounds plausible produces a CLV figure that is unrealistic and will lead to overspending on acquisition. Use actual cohort retention data to derive average customer lifespan — most businesses find it is significantly shorter than their initial estimate.",
                "Don't confuse CLV with projected revenue. CLV is an average, not a guarantee. Averaging across all customers means half your customers will be worth less than your CLV figure and half will be worth more. Always apply CLV as a portfolio-level benchmark, not a forecast for individual customers.",
                "Don't calculate a single CLV for the entire business without segmenting by product line or tier. Enterprise customers, SMB customers, and self-serve customers in the same business can have CLVs that differ by 10–50×. A single blended CLV produces acquisition budget guidance that overpays for low-value segments and underpays for high-value ones.",
                "Don't ignore the CAC Payback Period when assessing channel viability. A 36-month CLV with a 24-month CAC payback period means you are cash-flow negative on every new customer for two years. In fast-growing businesses with capital constraints, payback period can matter more than raw CLV ratio.",
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

      {/* ── Benchmarks ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CLV Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical CLV Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Recommended Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Key Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS (B2B)",            "$3,000–$25,000+", "SaaS / Predictive",  "Low churn + high ARPU"],
                ["SaaS (B2C)",            "$200–$1,500",     "SaaS / Predictive",  "High volume, lower ARPU"],
                ["Ecommerce (General)",   "$150–$500",       "Margin-Adjusted",    "Repeat purchase frequency"],
                ["Subscription Box",      "$200–$800",       "Subscription",       "Monthly retention rate"],
                ["Fashion / Apparel",     "$100–$400",       "Margin-Adjusted",    "Seasonal repeat purchases"],
                ["Financial Services",    "$1,000–$5,000",   "Margin-Adjusted",    "Long relationships, high ACV"],
                ["Healthcare",            "$1,500–$8,000",   "Basic / Margin",     "Long-term patient relationships"],
                ["Restaurants / QSR",     "$500–$2,000",     "Basic",              "Visit frequency over years"],
                ["Consumer Mobile Apps",  "$10–$80",         "SaaS / Predictive",  "High volume, very low ARPU"],
              ].map(([industry, range, formula, driver]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{formula}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are approximate. Actual CLV varies significantly by pricing model, gross margin, retention strategy, and market segment.</p>
      </section>

      {/* ── FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Customer Lifetime Value (CLV)?",
              a: "Customer Lifetime Value (CLV) is the total revenue or profit a business expects to earn from a single customer over the entire duration of their relationship. It is the foundational metric for acquisition budgeting — setting the upper limit on how much you can spend to acquire a customer while remaining profitable. CLV is also used to prioritise retention investment, segment customers by value, and justify pricing decisions.",
            },
            {
              q: "What is the difference between CLV and LTV?",
              a: "CLV (Customer Lifetime Value) and LTV (Lifetime Value) are used interchangeably in most business contexts. Both describe the total predicted value of a customer relationship. Some organisations distinguish them by using LTV for projected future customers and CLV for calculated current customer cohorts, but the underlying formulas are identical. This calculator uses CLV throughout.",
            },
            {
              q: "What is a good CLV:CAC ratio?",
              a: "A CLV:CAC ratio of 3:1 or higher is the standard benchmark for healthy paid acquisition — meaning each customer generates at least three times what it cost to acquire them. Ratios above 5:1 are excellent and suggest the business is potentially underinvesting in growth. Ratios below 1:1 mean the business loses money on every customer acquired. SaaS companies typically target 3:1 to 5:1 as a sustainable operating range.",
            },
            {
              q: "How does churn rate affect CLV in the SaaS formula?",
              a: "Churn rate is the most powerful variable in the SaaS CLV formula because CLV is divided by churn rate. This means a small absolute reduction in churn produces a large proportional CLV increase. Reducing monthly churn from 5% to 4% — a 1-percentage-point change — increases CLV by 25%, not 20%. Reducing churn from 5% to 3% increases CLV by 67%. This mathematical relationship is why customer success investment has some of the highest ROI of any business function in SaaS.",
            },
            {
              q: "What is Net CLV and why does it matter?",
              a: "Net CLV is CLV minus the Customer Acquisition Cost (CAC) — the profit value of a customer relationship after deducting the cost of acquiring them. A CLV of $1,200 and a CAC of $300 produces a Net CLV of $900. Net CLV is more useful than raw CLV for evaluating the true profitability of an acquisition channel, because a high CLV combined with a high CAC can still produce a poor business outcome.",
            },
            {
              q: "What is CAC Payback Period?",
              a: "CAC Payback Period is the number of months required to recover the Customer Acquisition Cost from the monthly value each customer generates. It is calculated as CAC ÷ Monthly Customer Value (after margin). A 12-month payback means you are cash-flow negative on each new customer for one year before they become profitable. Businesses with long payback periods (18+ months) typically require significant working capital or external funding to sustain growth.",
            },
            {
              q: "How can I increase CLV?",
              a: "There are four main levers: (1) Increase Average Order Value through upsells, cross-sells, and bundles. (2) Increase Purchase Frequency through email re-engagement, loyalty programs, and personalised recommendations. (3) Extend Customer Lifespan through better onboarding, proactive support, and retention programs. (4) Improve Gross Margin through pricing optimisation and COGS reduction. For SaaS specifically, reducing churn is almost always the highest-leverage CLV improvement available.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your AOV, churn rate, ARPU, CAC, and all other inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history uses your browser's localStorage — data stays local to your device. This makes the tool safe for confidential unit economics modelling and investor pitch preparation.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 7 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🚀", title: "SaaS Founders",      desc: "Model customer economics at different ARPU and churn rate combinations to understand unit economics before scaling paid acquisition." },
            { icon: "🛍️", title: "Ecommerce Operators", desc: "Calculate CLV per product category or acquisition channel to set data-driven CPA targets and justify loyalty program investment." },
            { icon: "📊", title: "Growth Analysts",    desc: "Build segmented CLV models by cohort, channel, and customer tier to identify the highest-value customer profiles." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Demonstrate client ROI by calculating CLV:CPA ratios that justify acquisition budgets and retention program spend." },
            { icon: "💼", title: "Startup Founders",   desc: "Produce investor-ready unit economics slides with CLV, Net CLV, and CAC Payback Period — all verifiable via shareable URL." },
            { icon: "🎓", title: "MBA Students",       desc: "Practice marketing analytics and financial modelling using all four CLV methods with real-world business examples." },
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
