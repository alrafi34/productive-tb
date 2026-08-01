export default function SERPCTREstimatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a SERP CTR Estimator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>SERP CTR estimator</strong> is a free browser-based tool that predicts the click-through rate a webpage will receive based on its position in Google&apos;s Search Engine Results Pages. It answers the question every SEO professional asks before pitching a ranking project: <em>if I move this page from position 8 to position 3, how much more organic traffic will I actually get?</em>
          </p>
          <p>
            Estimating organic CTR is harder than it looks. Click-through rate for the same ranking position can swing widely depending on the study behind the data, the presence of SERP features like featured snippets or People Also Ask boxes, the searcher&apos;s device, and whether the query is informational, commercial, or navigational. This tool handles that complexity automatically by letting you choose between four published CTR curves — Industry Average, Backlinko, Advanced Web Ranking, and FirstPageSage — or build your own Custom curve from real Google Search Console data, then adjusts the estimate for device type and search intent.
          </p>
          <p>
            This tool is built for <strong>SEO professionals, digital marketing agencies, bloggers, affiliate marketers, content creators, SaaS companies, eCommerce stores, website owners, and marketing students</strong> who need to forecast traffic potential, prioritize which keywords to target, or justify an SEO investment with data. It runs 100% in your browser with no signup, supports exporting results as CSV or JSON, printing a client-ready report, and sharing a calculation via URL — and none of your data ever leaves your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the SERP CTR Estimator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The estimator holds an internal CTR lookup curve for every position from 1 to 100, built by interpolating published benchmark values for positions 1–10, 15, 20, 30, 50, 75, and 100. Your monthly search volume is multiplied by the CTR for your selected position — adjusted for device type and search intent — to produce an estimated click count.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Estimated Monthly Clicks = Search Volume × CTR at Position</p>
              <p>Estimated Annual Clicks = Estimated Monthly Clicks × 12</p>
              <p>Traffic Difference = Target Monthly Clicks − Current Monthly Clicks</p>
              <p>Opportunity Score = (Position 1 Clicks − Current Clicks) ÷ Position 1 Clicks × 100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["CTR Dataset", "Choose which published benchmark curve to apply — Industry Average for general use, Backlinko or Advanced Web Ranking for large-scale study data, FirstPageSage for a top-heavy curve, or Custom to enter your own Search Console numbers."],
              ["Device Type", "Desktop, Mobile, or Combined applies a modest multiplier reflecting that mobile SERPs typically show more ads and features, slightly lowering organic CTR versus desktop."],
              ["Search Intent", "Informational, Commercial, Transactional, or Navigational applies an additional multiplier — navigational (branded) queries see notably higher top-position CTR, while competitive transactional queries see more CTR loss to ads and shopping results."],
              ["Target Position", "An optional second position lets you directly compare current vs. target traffic, showing the exact click difference and how many ranking positions you'd need to climb."],
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
          How to Use the SERP CTR Estimator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Monthly Search Volume", "Type the average monthly search volume for your target keyword, sourced from Google Search Console, Google Keyword Planner, Ahrefs, or Semrush. The default is 1,000 searches per month."],
                ["Set Your Current Position", "Choose your current Google ranking from 1 to 100 using the dropdown or the touch-friendly slider. Results update instantly with a short debounce as you adjust."],
                ["Choose a CTR Dataset and Filters", "Pick Industry Average, Backlinko, Advanced Web Ranking, FirstPageSage, or build a Custom curve, then optionally set Device Type and Search Intent to sharpen the estimate."],
                ["Enable Target Position", "Toggle on Target Position and select a ranking goal to see the exact traffic difference, percentage change, and ranking improvement needed to hit that goal."],
                ["Review the CTR Curve and Heatmap", "Study the interactive curve chart and the SERP position heatmap — click any heatmap cell to instantly jump the current or target position to that spot."],
                ["Check the Lookup Table", "Expand the CTR Lookup Table to see the exact CTR and estimated clicks for every position from 1 to 100 under your selected settings."],
                ["Export, Share, or Save", "Copy the result or full report, download as CSV or JSON, print a client-ready report, copy a shareable URL, or save the calculation to your local history."],
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
                "4 published CTR datasets plus a fully editable Custom curve",
                "Real-time results with a 150ms debounced calculation",
                "Position slider and dropdown for positions 1–100",
                "Target position comparison with traffic difference and % change",
                "Device Type and Search Intent CTR adjustments",
                "Interactive CTR curve chart with current/target markers",
                "Clickable SERP position heatmap (1–100)",
                "Full CTR lookup table for every position",
                "Opportunity Score and Visibility Score badges",
                "Auto-saves your last session and restores it on return",
                "Shareable calculation URL using query parameters",
                "Export as CSV or JSON with full position-by-position data",
                "Print-ready PDF report and downloadable PNG of the CTR chart",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Pitching an SEO Project to a Client",
              scenario: "An SEO consultant is pitching a client currently ranking at Position 8 for a keyword with 10,000 monthly searches. Using the Industry Average dataset, the calculator shows an estimated 200 clicks/month at Position 8. Enabling Target Position 3 shows a projected 1,000 clicks/month — an 800-click, 400% traffic increase the consultant uses directly in the proposal.",
            },
            {
              title: "Prioritizing Which Keywords to Target Next",
              scenario: "A content strategist runs three keywords — 2,000, 8,000, and 15,000 monthly searches, all currently ranking around Position 12 — through the estimator with the same dataset and settings, and sorts by Opportunity Score to find that the 8,000-volume keyword has a Critical 82/100 score, making it the clearest next target for a content refresh.",
            },
            {
              title: "Forecasting Traffic from a Featured Snippet Win",
              scenario: "An affiliate marketer's page ranks Position 4 for a 5,000-volume commercial keyword. Setting Search Intent to Commercial Investigation and Target Position to 1 (assuming a featured snippet win pushes them to the top), the calculator projects clicks rising from roughly 275/month to over 1,800/month, giving the marketer a concrete number to justify content investment.",
            },
            {
              title: "Comparing CTR Assumptions Across Studies",
              scenario: "An in-house SEO manager runs the same Position 5, 20,000-volume keyword through all four datasets and finds FirstPageSage estimates 1,020 clicks/month while Advanced Web Ranking estimates only 820 — a reminder to the team that CTR benchmarks vary and their own Search Console data (entered via Custom dataset) is the most reliable source for reporting.",
            },
            {
              title: "Building a Custom Curve from Search Console Data",
              scenario: "A SaaS company's SEO lead exports 90 days of Search Console data and finds their actual Position 1 CTR is 34% and Position 5 CTR is only 3.1% — well below the Industry Average curve. They enter these figures into the Custom dataset editor so every future forecast reflects their site's real historical performance instead of generic benchmarks.",
            },
            {
              title: "Mobile vs. Desktop Traffic Planning",
              scenario: "A local business owner ranking Position 6 for a 3,000-volume local search term switches Device Type between Desktop and Mobile and sees estimated monthly clicks drop from roughly 104 to 85 on mobile — informing the decision to prioritize mobile page speed improvements since most searches for that term happen on mobile devices.",
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
                "Build a Custom dataset from your own Google Search Console Performance report whenever possible — your site's actual CTR by position is always more reliable than any published industry study, especially for branded or niche queries.",
                "Use Opportunity Score to triage a large keyword list quickly — sort mentally by Critical and High scores first, since those keywords have the most traffic sitting on the table relative to their current position.",
                "Cross-check estimates against at least two datasets before presenting numbers externally — if Backlinko and Advanced Web Ranking disagree by more than 20%, present a range instead of a single number to set realistic expectations.",
                "Remember that SERP features silently lower CTR at every position. A keyword that triggers a featured snippet, image pack, or shopping carousel will underperform the raw CTR curve even at Position 1 — treat these estimates as an upper bound for such queries.",
                "Use the shareable URL feature when sending a specific forecast to a client or teammate — the link preserves your exact dataset, device, intent, and position inputs so they see the identical numbers without re-entering anything.",
                "Save recurring keyword forecasts to history so you can reload and re-compare them later without retyping search volumes and positions each time.",
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
                "Don't treat any single dataset as ground truth. Industry Average, Backlinko, Advanced Web Ranking, and FirstPageSage are all snapshots of different samples — none of them will exactly match your site's actual CTR, especially for unusual query types.",
                "Don't ignore search intent when forecasting. Navigational and branded queries can see dramatically higher top-position CTR than the generic curve suggests, while highly competitive transactional queries often see much lower CTR due to ads and shopping results.",
                "Don't assume CTR estimates account for SERP features. Featured snippets, People Also Ask boxes, image packs, and paid ads all reduce the organic clicks available even when you hold the top organic position.",
                "Don't compare Opportunity Scores across keywords with wildly different search volumes without also looking at absolute click numbers — a Critical score on a 200-volume keyword may matter less than a Medium score on a 50,000-volume keyword.",
                "Don't forget that CTR benchmarks shift over time as Google adds new SERP features. Revisit your Custom dataset periodically using fresh Search Console exports rather than relying on values entered a year or more ago.",
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

      {/* ── Benchmark Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CTR Benchmark Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry Average</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Backlinko</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Advanced Web Ranking</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">FirstPageSage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "28.0%", "31.7%", "25.6%", "39.8%"],
                ["2", "15.0%", "24.7%", "12.2%", "18.7%"],
                ["3", "10.0%", "18.7%", "7.9%", "10.2%"],
                ["5", "5.0%", "9.5%", "4.1%", "5.1%"],
                ["10", "2.0%", "3.1%", "1.6%", "2.4%"],
                ["20", "0.8%", "1.0%", "0.6%", "0.85%"],
                ["50", "0.3%", "0.35%", "0.2%", "0.28%"],
              ].map(([pos, ind, bl, awr, fps]) => (
                <tr key={pos} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">#{pos}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{ind}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{bl}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{awr}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{fps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are approximate blended reference curves inspired by commonly cited industry studies. Actual CTR varies by niche, device, search intent, and SERP features — use the Custom dataset with your own Search Console data for the most accurate forecast.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a SERP CTR estimator?",
              a: "A SERP CTR estimator is a free browser-based tool that predicts the click-through rate a webpage will receive based on its ranking position in Google's search results, using CTR data compiled from industry studies. It converts a ranking position and search volume into an estimated number of monthly and annual organic clicks, helping you forecast traffic before or after a ranking change.",
            },
            {
              q: "How is organic CTR calculated by position?",
              a: "Organic CTR by position is derived from aggregated click and impression data across large sets of search queries, then averaged for each ranking position. This tool applies that curve as: Estimated Clicks = Search Volume multiplied by the CTR percentage for the selected position, adjusted for device type and search intent.",
            },
            {
              q: "What is a good CTR for position 1 on Google?",
              a: "Across the datasets included in this tool, Position 1 CTR ranges from roughly 25% to 40% depending on the study and query type. Branded and navigational searches often see even higher CTR at position 1, while highly competitive commercial queries with many SERP features tend to see lower top-position CTR.",
            },
            {
              q: "Why do the CTR datasets show different numbers for the same position?",
              a: "Each dataset — Industry Average, Backlinko, Advanced Web Ranking, and FirstPageSage — is built from different sample sizes, industries, time periods, and SERP feature prevalence. None of them is universally correct; they represent different snapshots of aggregate search behavior. Use the dataset that most closely matches your industry and query type, or build a Custom curve from your own Google Search Console data.",
            },
            {
              q: "How do I build a Custom CTR curve from my own data?",
              a: "Select Custom from the CTR Dataset dropdown, then enter your own CTR percentage for positions 1 through 10, 20, 50, and 100 using data exported from Google Search Console for keywords you already rank for. The estimator smoothly interpolates the curve between the values you provide.",
            },
            {
              q: "What does the Opportunity Score mean?",
              a: "Opportunity Score, from 0 to 100, measures how much estimated traffic you are missing compared to ranking Position 1 for the same keyword and search volume. A low score means you are already capturing most of the available clicks; a high or critical score means there is significant traffic to gain by improving your ranking.",
            },
            {
              q: "What is the difference between Opportunity Score and Visibility Score?",
              a: "Opportunity Score represents the percentage of Position 1 traffic you are currently missing, while Visibility Score represents the percentage you are currently capturing — the two values always add up to 100. Opportunity Score highlights room to grow; Visibility Score highlights how well you're already performing.",
            },
            {
              q: "Does device type affect CTR?",
              a: "Yes. Mobile search results typically show more SERP features, ads, and a smaller visible screen area, which tends to lower organic CTR compared to desktop. This tool applies a modest multiplier for Desktop, Mobile, and Combined device types on top of the base CTR curve to reflect that difference.",
            },
            {
              q: "How accurate is a SERP CTR estimate?",
              a: "SERP CTR estimates are directional, not exact — actual CTR varies by query type, brand recognition, SERP features, seasonality, and device mix. Use these estimates for planning, prioritization, and forecasting, and validate against your own Google Search Console data whenever possible.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your search volume, ranking positions, and any custom CTR values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history and saved inputs are stored only in your browser's local storage.",
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
            { icon: "🔍", title: "SEO Professionals", desc: "Forecast the traffic impact of a ranking improvement before starting a project, and prioritize keywords using Opportunity Score." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Build data-backed client pitches showing exact projected traffic gains from moving a page up in rankings." },
            { icon: "✍️", title: "Bloggers & Creators", desc: "Estimate which underperforming posts have the most traffic upside before investing time in a content refresh." },
            { icon: "🛒", title: "eCommerce & Affiliate Marketers", desc: "Forecast organic revenue potential by combining CTR estimates with conversion rate assumptions for product and category pages." },
            { icon: "💻", title: "SaaS & Startup Teams", desc: "Build a Custom CTR curve from Search Console data and forecast the ROI of SEO investment for high-value product keywords." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how organic CTR relates to ranking position, search intent, and device, and practice comparing multiple published CTR studies." },
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
