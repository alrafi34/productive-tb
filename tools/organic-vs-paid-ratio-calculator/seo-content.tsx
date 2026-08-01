export default function OrganicVsPaidRatioCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Organic vs Paid Ratio Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>organic vs paid ratio calculator</strong> is a free browser-based tool that instantly compares how much of a website's traffic comes from unpaid search results versus paid advertising. It answers a question every marketing team eventually has to face: <em>how dependent are we on ad spend to keep traffic flowing, and what happens if that spend stops?</em>
          </p>
          <p>
            The organic-to-paid ratio is one of the clearest signals of long-term marketing health. A website generating most of its traffic organically has built durable, compounding search visibility that keeps working without ongoing spend. A website relying heavily on paid traffic is effectively renting its audience — the moment the ad budget is paused, that traffic disappears. Neither extreme is automatically wrong, but knowing exactly where a site sits on that spectrum is essential for budget planning, SEO investment decisions, and honest reporting to stakeholders.
          </p>
          <p>
            This tool is built for <strong>SEO professionals, digital marketers, PPC specialists, marketing agencies, business owners, startup founders, bloggers, affiliate marketers, marketing students, and enterprise marketing teams</strong> who need an instant traffic-source breakdown without connecting Google Analytics or exporting a dashboard. It supports four chart types, three display modes, and generates a plain-language marketing insight for every calculation, with results exportable as CSV, a PNG chart, or a print-ready report.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Organic vs Paid Ratio Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator adds your organic and paid traffic figures together to get total traffic, then calculates what percentage each source represents and expresses the relationship as a simplified ratio.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Total Traffic = Organic + Paid</p>
              <p>Organic % = (Organic ÷ Total) × 100</p>
              <p>Paid % = (Paid ÷ Total) × 100</p>
              <p>Organic : Paid Ratio = Organic ÷ Paid</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Organic Traffic", "Visitors who arrived through unpaid search engine results, direct navigation attributable to brand recognition, or organic social and referral sources — traffic you didn't pay for directly."],
              ["Paid Traffic", "Visitors who arrived through paid advertising — search ads, social ads, display ads, or any other channel where you paid per click or impression to acquire the visit."],
              ["Ratio Display", "The ratio is always simplified to show the smaller side as 1 — for example, 2.5 : 1 means organic traffic is 2.5 times larger than paid, while 1 : 4 means paid traffic is 4 times larger than organic."],
              ["Marketing Insight", "The calculator automatically classifies the result into one of several tiers — from heavily paid-dependent to organic-dominant — and generates a plain-language recommendation for each."],
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
          How to Use the Organic vs Paid Ratio Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Organic Traffic", "Type your total organic traffic for the period you're analyzing, pulled from Google Analytics, Search Console, or any other analytics platform."],
                ["Enter Paid Traffic", "Type your total paid traffic for the same period, covering all paid channels combined or a single campaign, depending on what you're analyzing."],
                ["Try a Quick Preset", "Click SEO-Led Blog, Balanced Business, Paid-Heavy Startup, or Ecommerce Store to instantly load realistic sample numbers and see how the calculator classifies each scenario."],
                ["Choose a Chart Type", "Select Pie, Doughnut, Horizontal Bar, or Vertical Bar to visualize the split in whichever format suits your report or presentation."],
                ["Select a Display Mode", "Choose Percentage, Absolute Numbers, or Both to control how the Organic and Paid traffic cards present their values."],
                ["Review Results and Insight", "Check the total traffic, percentages, ratio, difference, and the automatically generated marketing insight explaining what the split means for your acquisition strategy."],
                ["Export or Share", "Copy the summary, export a CSV for a spreadsheet, download the chart as a PNG for a slide deck, print a formatted report, or copy a shareable URL with your exact inputs."],
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
                "Real-time results with 150ms debounced updates",
                "4 chart types: Pie, Doughnut, Horizontal Bar, Vertical Bar",
                "3 display modes: Percentage, Absolute Numbers, Both",
                "Automatic ratio simplification (e.g. 2.5:1, 1:4)",
                "Animated traffic breakdown bars",
                "Automatic marketing insight for every calculation",
                "Handles 100% organic, 100% paid, and zero-traffic edge cases",
                "4 quick preset scenarios for instant testing",
                "Shareable calculation URL using query parameters",
                "Export report as CSV with full breakdown",
                "Export the traffic chart as a PNG image",
                "Print-ready formatted report",
                "Copy full summary to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
                "Reset with confirmation to prevent accidental data loss",
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
              title: "SEO Health Check for a Content Site",
              scenario: "An SEO specialist reviewing a client's blog enters 45,000 organic and 5,000 paid monthly visitors. The calculator returns a 90% organic share and a 9:1 ratio, classified as Organic-Dominant with the insight 'Excellent organic performance with low dependency on paid traffic' — evidence the specialist includes in a quarterly report to justify continued content investment over paid spend.",
            },
            {
              title: "Startup Diagnosing Paid Dependency",
              scenario: "A startup founder notices marketing costs climbing every month. Entering 8,500 organic and 34,000 paid traffic, the calculator returns a 20% organic share and a 1:4 ratio, flagged as Paid-Dominant with the insight 'Website relies heavily on paid advertising' — a clear signal that prompts the founder to allocate budget toward an SEO hire before scaling ad spend further.",
            },
            {
              title: "Agency Client Portfolio Review",
              scenario: "A marketing agency runs this calculator across five client accounts each month to spot which clients are becoming over-reliant on paid channels. One ecommerce client (50,000 organic, 20,000 paid) shows a healthy 2.5:1 ratio, while another SaaS client (15,000 organic, 45,000 paid) shows a concerning 1:3 ratio — prompting a strategy call specifically about that account's organic search gap.",
            },
            {
              title: "Balanced Acquisition Strategy Validation",
              scenario: "A business owner running both an active content program and a paid search campaign enters 60,000 organic and 60,000 paid traffic. The calculator returns a perfect 1:1 ratio, classified as Balanced, confirming that neither channel is being neglected — validating the current 50/50 budget and content-effort split rather than shifting resources.",
            },
            {
              title: "Ecommerce Ad Spend Justification",
              scenario: "An ecommerce marketing manager preparing a budget review enters 200,000 organic and 50,000 paid monthly sessions, returning an 80% organic share. This strong organic base gives the manager confidence to propose increasing paid spend for a seasonal campaign — the site's traffic won't collapse if that spend is paused later, since organic remains the dominant channel.",
            },
            {
              title: "Affiliate Site Traffic Composition Audit",
              scenario: "An affiliate marketer auditing a niche site's traffic sources before a potential sale enters the site's trailing 30-day organic and paid numbers. A strongly organic-dominant result becomes a selling point in the site's listing, since buyers value traffic that doesn't require ongoing ad spend to sustain — directly affecting the site's valuation multiple.",
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
                "Track this ratio monthly rather than as a one-time check. A gradual shift toward paid dependency is much easier to correct early than after a year of budget has gone into ads instead of SEO.",
                "Use the same date range for both organic and paid traffic when comparing — mixing a 30-day organic figure with a 7-day paid figure will produce a misleading ratio.",
                "There's no universally 'correct' ratio — an early-stage startup validating product-market fit through paid ads may reasonably run paid-dominant, while a 5-year-old content site should typically be organic-dominant. Interpret the result against your business stage, not a fixed benchmark.",
                "When presenting this to stakeholders, pair the ratio with the Difference metric — a 1:4 ratio on a small site (5,000 total visitors) is a very different conversation than the same ratio on an enterprise site (5 million total visitors).",
                "If your result is Paid-Dominant and you want to shift the balance, use the SEO Score Calculator and Domain Authority Estimator alongside this tool to identify concrete gaps in your organic search foundation.",
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
                "Don't lump direct traffic in with organic traffic without thinking it through — some direct traffic is brand recognition built by SEO and content, but some is simply bookmarked or typed-in traffic unrelated to organic search efforts.",
                "Don't treat a Balanced (50/50) result as automatically ideal. Balance is a reasonable target for many businesses, but a content-driven publisher intentionally aiming for 90% organic shouldn't be alarmed by moving away from 50/50.",
                "Don't compare ratios across businesses with fundamentally different models. A marketplace that necessarily runs paid-heavy to bootstrap liquidity isn't in the same category as a blog that should be organic-first by nature.",
                "Don't ignore the absolute traffic numbers in favor of the percentage alone. A 1:1 ratio at 200 total monthly visitors represents a completely different scale of business than a 1:1 ratio at 2,000,000 visitors.",
                "Don't forget that paused paid campaigns instantly zero out the paid side of this ratio. If you're analyzing a period that included a temporary ad pause, the resulting organic-dominant reading may not reflect your steady-state acquisition mix.",
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
          Traffic Ratio Classification Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Organic Share</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Classification</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["≤ 20%", "Paid-Dominant", "Website relies heavily on paid advertising"],
                ["20% – 45%", "Paid-Leaning", "Marketing depends heavily on paid campaigns"],
                ["45% – 55%", "Balanced", "Balanced acquisition strategy"],
                ["55% – 70%", "Organic-Leaning", "Traffic is primarily organic"],
                ["≥ 70%", "Organic-Dominant", "Excellent organic performance, low paid dependency"],
              ].map(([range, label, meaning]) => (
                <tr key={label} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{label}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Classification thresholds are general guidance. Ideal organic share varies by business model, industry, and growth stage.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the organic vs paid traffic ratio?",
              a: "The organic vs paid traffic ratio compares how much of a website's total traffic comes from unpaid search results (organic) versus paid advertising campaigns (paid), expressed as a simplified ratio like 2.5:1 or 1:4. It's a quick way to gauge how dependent a site is on ongoing ad spend to sustain its traffic levels.",
            },
            {
              q: "How is the organic to paid ratio calculated?",
              a: "The ratio is calculated by dividing organic traffic by paid traffic (or vice versa if paid is larger), then simplified so the smaller side is expressed as 1. For example, 50,000 organic and 20,000 paid traffic produces a ratio of 2.5:1, meaning organic traffic is two and a half times larger than paid traffic.",
            },
            {
              q: "What is a good organic to paid traffic ratio?",
              a: "There's no single universally correct ratio — it depends on business model and growth stage. As a general guide, an organic share above 70% is considered excellent and indicates strong, sustainable SEO performance. A share between 45% and 55% reflects a balanced acquisition strategy. A share below 20% indicates heavy paid dependency, which carries more ongoing cost and less resilience if ad budgets are cut.",
            },
            {
              q: "Why does a high paid traffic dependency matter?",
              a: "Paid traffic stops the moment ad spend stops, while organic traffic continues generating visits without ongoing cost once it's established. A business heavily dependent on paid traffic faces higher customer acquisition costs over time and is more vulnerable to budget cuts, rising ad costs, or platform policy changes than one with a strong organic foundation.",
            },
            {
              q: "What counts as organic traffic versus paid traffic?",
              a: "Organic traffic includes visitors from unpaid search engine results and, in most analytics setups, unpaid social and referral traffic. Paid traffic includes any visitor acquired through paid search ads, paid social ads, display advertising, or other cost-per-click or cost-per-impression channels. Direct traffic and email traffic are typically tracked as separate categories outside this organic-vs-paid comparison.",
            },
            {
              q: "What happens if I only have organic or only paid traffic?",
              a: "If paid traffic is zero, the calculator shows 100% organic with an 'All Organic' classification. If organic traffic is zero, it shows 100% paid with an 'All Paid' classification. If both values are zero, the calculator displays 'No traffic data available' since there's nothing to compare.",
            },
            {
              q: "How often should I check my organic vs paid ratio?",
              a: "Checking monthly is a reasonable cadence for most websites, aligned with typical analytics reporting cycles. Fast-growing sites or those actively shifting budget between channels may benefit from a weekly check to catch drift toward paid dependency (or away from it) early.",
            },
            {
              q: "Can I use this calculator for a single campaign instead of a whole website?",
              a: "Yes. The formula works identically whether you're comparing a whole website's traffic sources over a month or a single campaign's organic versus paid contribution over a shorter window — simply enter the organic and paid traffic figures relevant to the scope you're analyzing.",
            },
            {
              q: "What does the Difference metric show?",
              a: "The Difference metric shows the absolute gap in visitor count between organic and paid traffic — for example, 50,000 organic and 20,000 paid produces a difference of 30,000. This is useful alongside the percentage and ratio figures to understand the real scale of the gap, not just its proportional size.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your organic and paid traffic figures are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🔍", title: "SEO Professionals", desc: "Track organic share over time to demonstrate the compounding impact of SEO work, and identify when paid dependency is creeping upward." },
            { icon: "📢", title: "PPC Specialists",    desc: "Understand how much of total traffic paid campaigns are actually responsible for, and set realistic expectations for what happens if budget is reduced." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Audit client accounts for over-reliance on paid channels, and use the ratio as evidence to pitch SEO services alongside existing PPC retainers." },
            { icon: "🚀", title: "Startup Founders",   desc: "Diagnose rising customer acquisition costs by checking whether growth has quietly become paid-dependent, and plan organic investment accordingly." },
            { icon: "🛒", title: "Ecommerce Businesses", desc: "Balance seasonal paid campaigns against a stable organic base, and quantify how resilient revenue is to a paid budget pause." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn to interpret traffic source composition as a health signal, and build intuition for how organic and paid channels behave differently over time." },
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
