export default function MarketingROICalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Marketing ROI Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>marketing ROI calculator</strong> is a free browser-based tool that instantly measures the Return on Investment of a marketing campaign from its cost and the revenue it generated. It answers the question every marketer, founder, and business owner needs answered before scaling a budget: <em>is this campaign actually making money, and by how much?</em>
          </p>
          <p>
            Calculating ROI sounds simple, but tracking it consistently across campaigns, channels, and currencies is where most marketers fall behind. This tool handles the math automatically — computing ROI percentage, net profit, and profit ratio the moment you enter your numbers — while also classifying performance into a clear status (Loss, Low Return, Profitable, Highly Profitable, or Excellent Performance) so you don&apos;t have to interpret the raw percentage yourself.
          </p>
          <p>
            This tool is built for <strong>digital marketers, PPC advertisers, SEO specialists, social media marketers, marketing agencies, ecommerce businesses, SaaS companies, small business owners, startup founders, freelancers, and students</strong> learning marketing analytics. It supports 13 global currencies including a custom symbol option, saves campaign history with favorites, compares up to 4 campaigns side by side, and exports results as CSV, JSON, or a print-ready report — with everything processed locally in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Marketing ROI Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your total marketing cost and the revenue the campaign generated, and the calculator instantly derives net profit, ROI percentage, and profit ratio using standard marketing finance formulas.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Net Profit = Revenue − Marketing Cost</p>
              <p>ROI (%) = (Net Profit ÷ Marketing Cost) × 100</p>
              <p>Profit Ratio = Revenue ÷ Marketing Cost</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Net Profit", "The actual dollar amount gained or lost — revenue minus every dollar spent on the campaign."],
              ["ROI Percentage", "Profit expressed as a percentage of cost, letting you compare campaigns of very different sizes on equal footing."],
              ["Profit Ratio", "Revenue expressed as a multiple of cost (e.g. 3.5×) — the same relationship many advertisers call ROAS (Return on Ad Spend)."],
              ["Campaign Status", "An automatic classification — Loss, Low Return, Profitable, Highly Profitable, or Excellent Performance — based on the ROI band your result falls into."],
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
          How to Use the Marketing ROI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Campaign Details", "Optionally name your campaign, select your currency, and enter the total marketing cost and revenue generated — or click a quick example to see the calculator in action."],
                ["Read the Live ROI Result", "The ROI percentage, net profit, profit ratio, and performance badge update instantly as you type, with an animated circular gauge and status color."],
                ["Review the Cost vs. Revenue Chart", "Check the canvas bar chart comparing marketing cost, revenue, and net profit side by side for a quick visual read of the outcome."],
                ["Save and Compare Campaigns", "Save the campaign to history, star important ones as favorites, then select up to 4 saved campaigns to compare against your current calculation."],
                ["Export or Share Your Results", "Copy the result or full report, download as CSV or JSON, print a report, or copy a shareable URL with your exact inputs baked in."],
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
                "Real-time ROI, profit, and ratio with a 150ms debounced calculation",
                "13 currency options including a custom symbol",
                "Configurable decimal precision from 0 to 4 places",
                "Animated circular ROI gauge centered on break-even",
                "Canvas bar chart comparing cost, revenue, and profit",
                "5-tier performance classification (Loss to Excellent)",
                "4 quick example campaign presets",
                "Campaign history with star favorites",
                "Side-by-side comparison of up to 4 saved campaigns",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with timestamp",
                "Print-ready PDF report and downloadable chart PNG",
                "Copy result or full report to clipboard in one click",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Enter to jump to results, Esc to reset",
                "Inline validation with clear, friendly error messages",
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
              title: "Evaluating a Google Ads Campaign",
              scenario: "A PPC specialist spends $1,000 on a Google Ads campaign that generates $4,500 in tracked revenue. Entering these figures returns a 350% ROI, a $3,500 net profit, and a 4.5× profit ratio, classified as Excellent Performance — confirming the campaign deserves a bigger budget next month.",
            },
            {
              title: "Catching an Underperforming Channel Early",
              scenario: "An ecommerce marketer runs a $3,000 influencer campaign that only generates $2,400 in attributed revenue. The calculator returns a -20% ROI and a $600 loss, flagged in red as a Loss — clear, immediate evidence to pause the influencer partnership before committing further budget.",
            },
            {
              title: "Comparing Channels Side by Side",
              scenario: "An agency account manager saves four campaigns — Google Ads (350% ROI), Facebook Ads (175% ROI), Email Campaign (700% ROI), and Influencer Push (-20% ROI) — to history, then uses Compare to rank them visually, discovering email marketing delivered the highest ROI despite the smallest budget.",
            },
            {
              title: "Justifying Budget to a Stakeholder",
              scenario: "A startup founder calculates a $15,000 campaign that generated $18,750 in revenue, returning a 25% ROI and $3,750 profit, classified as Profitable. They export a print-ready report and use the specific numbers in a board meeting to justify continuing the channel at a larger scale.",
            },
            {
              title: "Tracking Campaigns Across Currencies",
              scenario: "A freelance marketer managing clients in the US, UK, and UAE switches the currency selector between USD, GBP, and AED to calculate and report ROI in each client's local currency without manual conversion, then favorites each client's most recent report for quick access.",
            },
            {
              title: "Teaching Marketing Analytics",
              scenario: "A marketing instructor has students plug in the same $1,000 cost with different revenue outcomes — $1,000 (break-even), $1,500 (profitable), and $500 (loss) — to watch the ROI percentage, color coding, and performance badge change in real time, building intuition for how the formula behaves.",
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
                "Include every direct cost in Marketing Cost — ad spend alone understates the real cost if you're also paying for creative production, agency fees, or campaign-specific tools.",
                "Name every campaign before saving it to history — an unlabeled list of ROI numbers becomes useless within a few weeks once you have a dozen saved calculations.",
                "Use Compare to rank channels by ROI percentage rather than raw profit dollars — a smaller campaign with a higher ROI is often a better candidate for additional budget than a larger one with a lower ROI.",
                "Recalculate ROI at multiple points in a campaign's life — early ROI on a brand-awareness campaign is often negative before delayed conversions catch up, so don't judge every campaign purely on day-one numbers.",
                "Star your best-performing campaigns as favorites so you can quickly reference the benchmark numbers when evaluating a new campaign in the same channel.",
                "Use the shareable URL to send a specific campaign's numbers to a client or teammate without re-typing the cost and revenue figures.",
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
                "Don't use gross revenue when comparing campaigns with very different profit margins — a 300% ROI on a low-margin product may generate less actual profit than a 100% ROI on a high-margin one.",
                "Don't ignore negative ROI campaigns immediately — some channels (brand awareness, top-of-funnel content) intentionally trade short-term ROI for longer-term customer value that this simple formula doesn't capture.",
                "Don't compare ROI figures across currencies without converting first — a 200% ROI in BDT and a 200% ROI in USD represent very different absolute dollar amounts.",
                "Don't forget that ROI alone doesn't account for time — a campaign that returns 100% ROI over one month is far stronger than one that takes a year to reach the same 100%.",
                "Don't enter marketing cost as zero to \"maximize\" the calculated ROI — the formula requires a positive cost, and the calculator will show a clear validation error rather than a meaningless divide-by-zero result.",
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

      {/* ── Performance Band Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          ROI Performance Band Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ROI Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Badge</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["≥ 200%", "Excellent Performance", "Excellent", "$1,000 cost → $3,000+ revenue"],
                ["75% – 199%", "Highly Profitable", "Good", "$1,000 cost → $1,750–$2,990 revenue"],
                ["15% – 74%", "Profitable", "Average", "$1,000 cost → $1,150–$1,740 revenue"],
                ["0% – 14%", "Low Return", "Poor", "$1,000 cost → $1,000–$1,140 revenue"],
                ["0%", "Break-Even", "Poor", "$1,000 cost → $1,000 revenue"],
                ["< 0%", "Loss", "Loss", "$1,000 cost → under $1,000 revenue"],
              ].map(([range, status, badge, example]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{status}</td>
                  <td className="py-2.5 px-4 text-gray-700">{badge}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Bands reflect a general-purpose classification for quick interpretation. What counts as a &quot;good&quot; ROI still depends heavily on your industry, margins, and customer lifetime value.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is marketing ROI?",
              a: "Marketing ROI (Return on Investment) measures how much profit a marketing campaign generated relative to what it cost. It is calculated as ((Revenue minus Marketing Cost) divided by Marketing Cost) times 100, expressed as a percentage. A positive ROI means the campaign generated more revenue than it cost; a negative ROI means it lost money.",
            },
            {
              q: "How is marketing ROI calculated?",
              a: "Marketing ROI is calculated using the formula ROI (%) = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100. For example, a campaign costing $1,000 that generates $3,500 in revenue has a profit of $2,500 and an ROI of 250%.",
            },
            {
              q: "What is a good marketing ROI?",
              a: "A commonly cited benchmark is a 5:1 revenue-to-cost ratio (400% ROI) as excellent, with 3:1 (200% ROI) considered good for many industries, though this varies significantly by channel, margin, and business model.",
            },
            {
              q: "What is the difference between ROI and profit ratio?",
              a: "ROI expresses the return as a percentage of the cost — a 250% ROI means you earned two and a half times your cost back as profit. Profit ratio (also called ROAS) expresses total revenue as a multiple of cost — a 3.5× ratio means every $1 spent returned $3.50 in revenue.",
            },
            {
              q: "What does a negative ROI mean?",
              a: "A negative ROI means the campaign generated less revenue than it cost to run, resulting in a net loss. For example, a $3,000 campaign that generates $2,400 in revenue has a $600 loss and an ROI of -20%. This doesn't necessarily mean the campaign should be abandoned immediately if it's building longer-term brand value.",
            },
            {
              q: "Can I compare multiple marketing campaigns at once?",
              a: "Yes. Save each campaign to history using Save to History, then use the Compare button on up to 4 saved campaigns to see them ranked side by side against your current calculation by ROI percentage.",
            },
            {
              q: "What counts as marketing cost in this calculator?",
              a: "Marketing cost should include all direct spend attributable to the campaign — ad spend, agency or freelancer fees, creative production costs, campaign-specific software, and any paid promotion. It typically excludes fixed overhead unrelated to the specific campaign.",
            },
            {
              q: "Should I use gross revenue or profit-adjusted revenue in this calculator?",
              a: "The Revenue Generated field is designed for total revenue attributed to the campaign. For a more precise profitability view accounting for cost of goods sold, enter gross profit instead of gross revenue as the Revenue Generated figure — the same ROI formula applies either way.",
            },
            {
              q: "Why does marketing cost need to be greater than zero?",
              a: "The ROI formula divides by marketing cost, which is mathematically undefined at zero. If a channel truly had no direct cost, such as pure organic traffic, ROI in the traditional sense doesn't apply — consider a metric like revenue per visitor instead.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your campaign names, costs, revenue figures, and saved history are never transmitted to any server, stored in any database, or accessible to anyone other than you. History and favorites are stored only in your browser's local storage.",
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
            { icon: "📊", title: "Digital Marketers", desc: "Verify campaign ROI after a flight ends and decide which channels deserve more budget next cycle." },
            { icon: "💼", title: "PPC & SEO Specialists", desc: "Track ROI across paid and organic channels using the same consistent formula and compare results side by side." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Generate exportable ROI reports for client reviews and rank multiple campaigns to prioritize optimization work." },
            { icon: "🛒", title: "Ecommerce & SaaS Businesses", desc: "Evaluate whether paid acquisition channels are profitable before scaling ad spend further." },
            { icon: "🚀", title: "Startup Founders & Freelancers", desc: "Quickly sanity-check a marketing budget's return without building a spreadsheet from scratch." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how cost, revenue, profit, and ROI relate to each other through hands-on, real-time experimentation." },
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
