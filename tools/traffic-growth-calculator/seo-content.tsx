export default function TrafficGrowthCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Traffic Growth Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>traffic growth calculator</strong> is a free browser-based tool that projects how a website's monthly traffic will change over time, using either a compound or linear growth model. It answers a question every SEO professional and content team eventually asks: <em>if this growth rate holds, where will our traffic actually be in six, twelve, or thirty-six months?</em>
          </p>
          <p>
            Website traffic rarely grows in a straight line — SEO, content marketing, and audience-building efforts compound over time, the same way interest compounds on an investment. A blog growing 8% month-over-month doesn't simply add 8% of its starting traffic every month forever; each month's growth builds on the previous month's larger base. This calculator models that compounding effect precisely, while also supporting a simpler linear model for cases where growth is expected to be flat and additive rather than accelerating.
          </p>
          <p>
            This tool is built for <strong>SEO specialists, digital marketers, content creators, bloggers, startup founders, marketing agencies, SaaS companies, ecommerce businesses, and students learning digital marketing</strong> who need to forecast traffic, set realistic growth targets, and compare multiple growth scenarios side by side. Every calculation runs locally in your browser — no signup, no data collection — with a full monthly projection table, a visual growth chart, and exportable CSV, JSON, and PNG reports.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Traffic Growth Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator supports two forecasting models. Compound growth applies your growth rate to an ever-increasing traffic base each month, producing an accelerating curve. Linear growth adds a fixed amount — based on your starting traffic and rate — every month, producing a straight-line increase.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Compound: Future Traffic = Current Traffic × (1 + Growth Rate)^Months</p>
              <p>Linear: Future Traffic = Current Traffic + (Current Traffic × Growth Rate × Months)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Compound Growth", "Best for SEO and organic content strategies, where each month's traffic gain becomes part of the base that next month's growth rate applies to — mirroring how compounding backlinks, indexed pages, and domain authority actually behave."],
              ["Linear Growth", "Best for modeling growth driven by a fixed, repeatable input — such as a paid ad budget that buys the same number of new visitors every month regardless of the current traffic level."],
              ["Monthly Projection Table", "Breaks the forecast into individual months, showing starting traffic, that month's growth, and ending traffic — useful for spotting exactly when a milestone (like 100,000 monthly visitors) is projected to be hit."],
              ["Scenario Comparison", "Runs a second growth rate against the same starting traffic and duration, letting you visualize the gap between a conservative estimate and an optimistic one on the same chart."],
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
          How to Use the Traffic Growth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Growth Model", "Select Compound Growth for accelerating, SEO-style growth, or Linear Growth for a steady, fixed monthly increase. A quick preset lets you start from a Small Blog, Growing Website, Business Website, or Large Website traffic level."],
                ["Enter Current Monthly Traffic", "Type your website's current monthly visitor count. This becomes the baseline every projection is calculated from."],
                ["Set Your Expected Growth Rate", "Enter your expected month-over-month growth rate as a percentage, from 0% to 1000%. Base this on your historical growth trend where possible, rather than an aspirational target."],
                ["Choose a Forecast Duration", "Select a duration from 1 to 60 months. Shorter durations are useful for near-term planning; longer durations reveal the long-term power (or limits) of compounding growth."],
                ["Add a Comparison Scenario (Optional)", "Toggle Compare Scenario B to add a second growth rate and see both trajectories plotted on the same chart — useful for comparing a conservative case against an aggressive one."],
                ["Review Results, Chart, and Table", "Check the projected monthly traffic, additional visitors, growth percentage, and the full month-by-month breakdown. The Growth Insights panel highlights your estimated doubling time and overall trajectory."],
                ["Export or Share", "Copy the summary or the full table, download CSV, JSON, or a PNG of the chart, print a formatted report, or copy a shareable URL with your exact inputs baked in."],
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
                "Compound and linear growth models",
                "Real-time results with 150ms debounced updates",
                "Forecast durations from 1 to 60 months",
                "Scenario B comparison with side-by-side results",
                "Visual growth chart with up to two plotted scenarios",
                "Full monthly projection table — start, growth, end per month",
                "Growth Insights panel — doubling time and trajectory analysis",
                "Quick presets: Small Blog, Growing Website, Business Website, Large Website",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full monthly data",
                "Export the growth chart as a PNG image",
                "Print-ready PDF report with monthly table",
                "Copy summary or full projection table to clipboard",
                "Calculation history — save and reload up to 20 past forecasts",
                "Keyboard shortcuts — Enter to jump to results, Esc to reset",
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
              title: "SEO Content Strategy Forecast",
              scenario: "An SEO specialist has grown a blog from 10,000 to 10,800 monthly visitors over the last month — an 8% growth rate. Using Compound Growth over a 12-month forecast, the calculator projects 25,182 monthly visitors, with an estimated doubling time of about 9 months if the rate holds — numbers the specialist uses to set the next quarter's content production targets.",
            },
            {
              title: "New Blog Launch Planning",
              scenario: "A blogger starting from the Small Blog preset (1,000 monthly visitors) models an ambitious 20% monthly growth rate driven by an aggressive publishing schedule. Over 12 months, the calculator projects 8,916 monthly visitors — helping the blogger set a realistic year-one milestone before pitching sponsors on projected reach.",
            },
            {
              title: "SaaS Content Marketing ROI Case",
              scenario: "A SaaS content marketing lead starting from 50,000 monthly visitors models a 6% monthly compound growth rate over 24 months, driven by a scaled-up content team. The projection of 202,447 monthly visitors becomes the traffic assumption behind a content marketing budget proposal to leadership, tied to an expected lead-generation multiplier.",
            },
            {
              title: "Paid Traffic Linear Growth Model",
              scenario: "A performance marketer running a fixed monthly ad budget expects a steady, non-compounding traffic increase of 4% of their 20,000 baseline visitors each month. Using Linear Growth over 12 months, the calculator projects 29,600 monthly visitors — a straight-line forecast that matches the flat, budget-driven nature of paid acquisition rather than organic compounding.",
            },
            {
              title: "Agency Conservative vs Aggressive Scenario Comparison",
              scenario: "An agency pitching an SEO retainer models two scenarios for a 30,000-visitor client site: a conservative 5% monthly growth rate (53,876 projected visitors after 12 months) and an aggressive 12% rate tied to a larger content investment (116,879 projected visitors). The 62,876-visitor gap between scenarios becomes the centerpiece of the agency's upsell pitch for a larger monthly retainer.",
            },
            {
              title: "Ecommerce Seasonal Growth Planning",
              scenario: "An ecommerce store forecasting the run-up to a peak season models 10% monthly compound growth on an 80,000-visitor base over a 6-month window, projecting 141,725 monthly visitors by the target month. The store uses this figure to plan inventory and customer service staffing ahead of the traffic increase, rather than reacting to it after the fact.",
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
                "Base your growth rate on your actual trailing 3-month average rather than your single best month. A blog that jumped 20% once due to a viral post will badly overestimate its forecast if that spike is treated as the ongoing trend.",
                "Use Compound Growth for organic and SEO-driven traffic, and Linear Growth for paid or fixed-budget channels — mixing up the two models can significantly overstate or understate a forecast depending on the channel's real growth mechanics.",
                "Run the Scenario Comparison feature whenever you're presenting a forecast to stakeholders. Showing a conservative and an optimistic case side by side is more credible than a single point estimate, and it sets expectations for the likely range of outcomes.",
                "Recalculate your forecast every quarter with updated real traffic data. A growth rate assumption from six months ago may no longer reflect algorithm changes, increased competition, or a maturing content strategy.",
                "Watch the doubling time insight closely for high compound growth rates — a rate that looks modest month-to-month (like 8%) still means traffic doubles roughly every 9 months, which compounds into extraordinary numbers over a 36 or 60-month forecast.",
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
                "Don't apply a compound growth rate indefinitely without sanity-checking the long-term result. A 15% monthly compound rate turns 5,000 visitors into over 61,000 in 18 months — impressive, but rarely sustainable for more than a year or two without a fundamentally different content or distribution strategy.",
                "Don't confuse a one-time traffic spike (a viral post, a press mention) with a sustained growth rate. Forecasting off a spike month will produce wildly inflated long-term projections that don't survive contact with reality.",
                "Don't ignore seasonality when setting a flat monthly growth rate for an entire year. Many industries see predictable traffic dips or surges tied to specific months — a single average rate can mask important month-to-month variation.",
                "Don't present a single-scenario forecast as a guarantee to clients or leadership. Growth rate assumptions are inherently uncertain — always frame projections as a range or pair them with a conservative comparison scenario.",
                "Don't forget that this calculator projects monthly traffic levels, not cumulative pageviews or sessions across the whole period unless you specifically reference the 'Total Visitors During Forecast' metric, which sums each month's traffic separately from the ending monthly figure.",
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Compound Growth", "Current × (1 + Rate)^Months", "10,000 × (1.08)^12 = 25,182"],
                ["Linear Growth", "Current + (Current × Rate × Months)", "10,000 + (10,000 × 0.05 × 12) = 16,000"],
                ["Doubling Time (Compound)", "ln(2) ÷ ln(1 + Rate)", "ln(2) ÷ ln(1.08) ≈ 9.0 months"],
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
        <p className="text-xs text-gray-400 mt-4">* Growth rate is entered as a whole-number percentage (e.g. 8 for 8%) and converted to a decimal (0.08) inside the formula.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a traffic growth calculator used for?",
              a: "A traffic growth calculator projects how a website's monthly traffic will change over a future period, based on a current traffic level and an expected growth rate. It's used for setting SEO and content marketing targets, forecasting the impact of a marketing strategy, planning infrastructure and staffing ahead of expected traffic increases, and communicating realistic growth expectations to stakeholders or clients.",
            },
            {
              q: "What is the difference between compound and linear traffic growth?",
              a: "Compound growth applies your growth rate to an increasingly larger traffic base each month, producing an accelerating curve — this mirrors how organic SEO growth typically behaves, since more indexed content and backlinks compound on each other. Linear growth adds a fixed amount each month based only on your original starting traffic, producing a straight-line increase — this better models growth from a fixed, repeatable input like a constant paid ad budget.",
            },
            {
              q: "How is compound traffic growth calculated?",
              a: "Compound traffic growth is calculated as: Future Traffic = Current Traffic × (1 + Growth Rate)^Months, where the growth rate is expressed as a decimal (5% becomes 0.05). For example, 10,000 monthly visitors growing at 8% per month for 12 months projects to approximately 25,182 monthly visitors.",
            },
            {
              q: "What is a realistic monthly traffic growth rate?",
              a: "Realistic growth rates vary enormously by website age, niche, and strategy. Established websites with mature content typically see 1–3% monthly organic growth. Newer sites investing heavily in content and SEO can see 5–15% monthly growth during an active growth phase. Rates above 20% monthly are usually only sustainable for very new, very small sites, or during a short-term viral or seasonal spike — not as a long-term steady state.",
            },
            {
              q: "What does 'doubling time' mean in this calculator?",
              a: "Doubling time is the number of months it would take for your traffic to double at your current growth rate, calculated as ln(2) ÷ ln(1 + Growth Rate) for compound growth. An 8% monthly growth rate has a doubling time of about 9 months, meaning traffic that started at 10,000 would reach roughly 20,000 in 9 months if the rate holds steady.",
            },
            {
              q: "Why does my projected traffic seem unrealistically high over a long time period?",
              a: "This is the nature of compound growth — even modest-looking monthly rates produce very large numbers over long forecast periods because each month's growth compounds on an increasingly larger base. A rate that seems sustainable over 6 months may look implausible over 60 months. Use longer forecast durations to understand the theoretical trajectory, but treat multi-year compound projections as a ceiling rather than a guarantee, and expect growth rates to naturally decelerate as a website matures.",
            },
            {
              q: "What is the 'Total Visitors During Forecast' metric?",
              a: "This metric sums the projected monthly traffic figure for every month in your forecast period, giving you an estimate of total cumulative visits across the whole window — distinct from 'Projected Monthly Traffic,' which shows only the traffic level in the final month. It's useful for estimating total ad impression inventory, total potential leads, or total content consumption across a campaign period.",
            },
            {
              q: "How should I use the Scenario Comparison feature?",
              a: "Use Scenario Comparison to model a conservative growth rate alongside a more optimistic one using the same starting traffic and forecast duration. This is especially useful when presenting a forecast to a client, manager, or investor — showing a realistic range rather than a single confident number sets more accurate expectations and remains credible even if actual growth falls between the two scenarios.",
            },
            {
              q: "Can I use this calculator for something other than website traffic?",
              a: "Yes. The compound and linear growth formulas are general-purpose and work for any metric that grows at a percentage rate over time — app downloads, email subscriber counts, social media followers, or revenue. Simply enter the metric's current value in place of traffic and interpret the results accordingly.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your traffic figures, growth rate assumptions, and forecast data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🔍", title: "SEO Specialists",       desc: "Forecast the compounding impact of an ongoing content and link-building strategy, and set realistic monthly and quarterly traffic targets backed by a formula rather than a guess." },
            { icon: "✍️", title: "Bloggers & Content Creators", desc: "Model how far a growth rate could take a blog over the next year, and use the projection to set publishing cadence goals or pitch sponsors on future reach." },
            { icon: "🏢", title: "Marketing Agencies",    desc: "Present conservative and aggressive growth scenarios to clients side by side, and back up SEO retainer pitches with a formula-driven traffic forecast." },
            { icon: "🚀", title: "Startup Founders",      desc: "Project the traffic impact of a content or growth marketing investment before committing budget, and set board-reportable growth milestones." },
            { icon: "💻", title: "SaaS & Ecommerce Teams", desc: "Forecast traffic ahead of a product launch or seasonal peak to plan infrastructure, support staffing, and inventory in advance rather than reactively." },
            { icon: "🎓", title: "Marketing Students",    desc: "Learn the practical difference between compound and linear growth, and build intuition for how small monthly rate differences compound into dramatically different long-term outcomes." },
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
