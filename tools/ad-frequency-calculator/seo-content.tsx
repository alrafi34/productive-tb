export default function AdFrequencyCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Ad Frequency Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>ad frequency calculator</strong> is a free browser-based tool that instantly calculates the average number of times each unique person has seen an advertisement, using the industry-standard formula of impressions divided by reach. It answers a question every advertiser eventually has to face: <em>am I showing this ad to the same people too often, or not often enough?</em>
          </p>
          <p>
            Frequency is one of the most overlooked metrics in digital advertising, yet it directly drives cost efficiency. Facebook Ads, Google Ads, TikTok Ads, and LinkedIn Ads all report impressions and reach separately, but rarely surface frequency as a headline metric — leaving advertisers to calculate it manually or ignore it entirely. Left unmonitored, frequency creep is one of the leading causes of rising CPMs and falling CTR mid-campaign, because the same audience segment gets shown the same creative over and over until they stop responding.
          </p>
          <p>
            This tool is built for <strong>digital marketers, Facebook Ads advertisers, Google Ads users, TikTok Ads advertisers, LinkedIn Ads marketers, media buyers, performance marketing agencies, marketing students, and small business owners</strong> who need an instant, accurate frequency reading along with a plain-language explanation of whether that number is healthy or a warning sign. Every calculation runs locally in your browser — no signup, no data collection — with results exportable as CSV, JSON, a downloadable PNG summary card, or a print-ready report.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Ad Frequency Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator divides your total ad impressions by your total unique reach to produce a single number — the average number of times each person in your audience has seen the ad. It then classifies that number into one of five performance tiers and generates a specific, actionable recommendation.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Frequency = Total Impressions ÷ Total Reach</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Impressions", "The total number of times your advertisement was displayed, including every repeat view by the same person."],
              ["Reach", "The total number of unique people who saw the advertisement at least once, counted only one time per person regardless of repeat views."],
              ["Frequency", "Impressions divided by reach — the average number of times each unique person was exposed to the ad. A frequency of 4.0 means the average viewer saw the ad four times."],
              ["Performance Classification", "The calculator automatically places your frequency into one of five tiers — Very Low, Good, Healthy, High, or Very High — each with a distinct color indicator and a tailored recommendation."],
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
          How to Use the Ad Frequency Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Total Impressions", "Type the total number of times your ad was shown, exactly as reported in your ad platform's dashboard (Facebook Ads Manager, Google Ads, TikTok Ads Manager, or LinkedIn Campaign Manager)."],
                ["Enter Total Reach", "Type the total number of unique people who saw the ad. If reach is entered higher than impressions, the calculator displays a warning so you can double-check your source numbers."],
                ["Adjust Decimal Precision", "Choose 0–4 decimal places depending on how exact you want the frequency figure — 2 decimals is standard for most reporting."],
                ["Read Your Frequency and Status", "Results update instantly as you type with a 150ms debounce. Review the frequency number, its color-coded status badge, and the plain-language explanation of what that frequency means for your campaign."],
                ["Follow the Recommendation", "Each status tier comes with a specific optimization action — from increasing budget for very low frequency to refreshing creatives or pausing a campaign for very high frequency."],
                ["Export or Save Your Result", "Copy the full report, download it as CSV or JSON for a media plan, generate a PNG summary card for a client deck, print a PDF-ready report, or share a quick summary directly from your device."],
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
                "Instant frequency calculation from impressions and reach",
                "Real-time results with 150ms debounced updates",
                "5-tier performance classification: Very Low, Good, Healthy, High, Very High",
                "Color-coded status badge with plain-language explanation",
                "Tailored optimization recommendation for every tier",
                "Inline warning when reach exceeds impressions",
                "Configurable decimal precision from 0 to 4 places",
                "Repeat views metric — exposures beyond the first view",
                "Export report as CSV or JSON with timestamp",
                "Downloadable PNG summary card for reports and decks",
                "Print-ready PDF report",
                "Copy full report or share a quick summary in one click",
                "Calculation history — save and reload up to 20 past results",
                "Frequency benchmark reference table",
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
              title: "Facebook Ads Fatigue Check",
              scenario: "A performance marketer notices CTR dropping on a Facebook conversion campaign that's been running for three weeks. They enter 480,000 impressions and 68,500 reach into the calculator, which returns a frequency of 7.01 — Very High. The recommendation to refresh creatives confirms their suspicion: the same audience has seen the same ad seven times, and it's time to rotate in new creative before the campaign wastes further budget.",
            },
            {
              title: "Brand Awareness Campaign Planning",
              scenario: "A brand manager launching an awareness campaign wants to confirm their audience will see the ad enough times to build recall, but not so often that it feels repetitive. Early data shows 45,000 impressions against 32,000 reach — a frequency of 1.41, in the 'Very Low' range. They increase the budget slightly and extend flight dates, targeting a healthier 2.5–4 range by the midpoint of the campaign.",
            },
            {
              title: "Agency Weekly Client Reporting",
              scenario: "An agency account manager runs frequency checks across five active ad sets every Monday morning. Using Export CSV, they compile frequency, status, and recommendation for each ad set into a single spreadsheet, then generate a PNG summary card for the top-performing ad set to include directly in the client's weekly report deck — cutting reporting time from 30 minutes to under five.",
            },
            {
              title: "TikTok Ads Audience Expansion Decision",
              scenario: "A TikTok advertiser sees frequency climbing past 6 on a narrow custom audience of 15,000 reach with 98,000 impressions (frequency 6.53, Very High). Rather than pausing the campaign entirely, they use the 'expand targeting' recommendation to broaden the audience to a lookalike segment, immediately dropping frequency back into the Healthy range on the next day's data pull.",
            },
            {
              title: "Google Display Network Frequency Cap Validation",
              scenario: "A media buyer sets a frequency cap of 5 impressions per week in Google Ads but wants to confirm actual delivery matches the cap. Pulling weekly impressions (620,000) against weekly unique reach (135,000), the calculator returns 4.59 — Healthy — confirming the frequency cap is being respected and delivery pacing is on track.",
            },
            {
              title: "Marketing Student Case Study",
              scenario: "A marketing student building a case study on ad fatigue uses the calculator to model three scenarios: low frequency (1.2), healthy frequency (3.5), and very high frequency (8.0) using the same $500 budget assumption. Comparing the calculator's explanation and recommendation text for each scenario helps them write an accurate, textbook-correct analysis of how frequency affects CTR and CPM over a campaign's lifecycle.",
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
                "Check frequency at the ad set level, not just the campaign level. A campaign-wide average can hide a narrow ad set that's already fatigued while the overall number still looks healthy.",
                "Ideal frequency depends on your objective — awareness campaigns can tolerate a higher frequency (3–5) than direct-response campaigns, which often perform best in the 1.5–3 range before conversion rates start to soften.",
                "Recalculate frequency every few days during an active campaign rather than only at the end. Frequency creep is gradual, and catching it early gives you time to refresh creative before performance drops significantly.",
                "Pair frequency with CTR trend data, not just the raw number. A frequency of 5 with stable CTR may be perfectly fine for your audience and creative, while a frequency of 3 with sharply declining CTR may already indicate fatigue.",
                "Use the PNG summary card export when presenting frequency data in a client deck or internal report — it's a faster way to communicate the number, status, and recommendation than a raw spreadsheet row.",
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
                "Don't confuse impressions with reach when pulling numbers from your ad platform — most dashboards list them side by side but under similarly worded column headers, and swapping them will produce a wildly incorrect frequency.",
                "Don't panic at a single high-frequency reading without checking the reporting window. A 30-day frequency of 6 is very different from a 3-day frequency of 6 — the latter is a much faster and more urgent fatigue signal.",
                "Don't ignore Very Low frequency readings just because they aren't a 'problem' in the traditional sense. Under-exposure means your budget isn't generating enough repeat impact for message retention, which matters for brand campaigns.",
                "Don't treat every 'High' frequency reading as an automatic signal to pause the campaign. Check CTR and conversion trends first — some audiences and creatives sustain a higher frequency without measurable fatigue.",
                "Don't apply the same frequency benchmarks across every platform and objective. A TikTok awareness campaign and a LinkedIn B2B lead-gen campaign have very different healthy frequency ranges due to platform algorithm and audience size differences.",
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

      {/* ── Formula / Classification Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequency Classification Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Frequency Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["< 1.5", "Very Low", "Increase budget, extend duration, or expand placements"],
                ["1.5 – 2.5", "Good", "Campaign performing normally — continue monitoring"],
                ["2.5 – 4", "Healthy", "Ideal frequency for most awareness campaigns"],
                ["4 – 6", "High", "Monitor CTR and watch for audience fatigue"],
                ["> 6", "Very High", "Refresh creatives, expand targeting, or pause the campaign"],
              ].map(([range, status, action]) => (
                <tr key={status} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{status}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* General benchmarks for awareness and consideration campaigns. Ideal frequency varies by platform, objective, creative quality, and campaign length.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is ad frequency and why does it matter?",
              a: "Ad frequency is the average number of times a single unique person has seen your advertisement, calculated as total impressions divided by total reach. It matters because frequency directly affects two opposing risks: too low and your audience may not remember the ad; too high and they experience ad fatigue, which typically shows up as declining click-through rate, rising cost per click, and falling conversion rate.",
            },
            {
              q: "How is ad frequency calculated?",
              a: "Ad frequency is calculated by dividing total impressions (the number of times your ad was shown, including repeat views) by total reach (the number of unique people who saw it at least once). For example, 10,000 impressions divided by 2,500 reach equals a frequency of 4.0 — meaning the average person saw the ad four times.",
            },
            {
              q: "What is a good ad frequency?",
              a: "For most awareness and consideration campaigns, a frequency between 2.5 and 4 is considered healthy. Direct-response and conversion-focused campaigns often perform best in a slightly lower 1.5–3 range, since audiences that convert quickly don't need as many repeat exposures. Frequencies above 6 are generally considered very high and often correlate with declining performance across platforms.",
            },
            {
              q: "What is the difference between impressions and reach?",
              a: "Impressions count every time your ad is displayed, including multiple views by the same person. Reach counts only unique people, regardless of how many times they saw the ad. If reach is close to impressions, most people are seeing the ad only once; if impressions are much higher than reach, the same people are seeing it repeatedly — which is exactly what frequency measures.",
            },
            {
              q: "What happens if my ad frequency is too high?",
              a: "High ad frequency typically leads to ad fatigue, where audiences become annoyed or simply tune out repeated creative. Platforms respond to declining engagement signals by reducing organic delivery and increasing costs, so a high-frequency campaign often shows rising CPM and CPC alongside falling CTR and conversion rate, even with no change in budget or targeting.",
            },
            {
              q: "Why is my reach greater than my impressions?",
              a: "Reach cannot legitimately exceed impressions in a correctly reported campaign, since every unique person counted in reach must have generated at least one impression. If the calculator's warning appears, double-check that you haven't accidentally swapped the impressions and reach values, or that you're comparing numbers from the same date range and the same ad set.",
            },
            {
              q: "How often should I check ad frequency during a campaign?",
              a: "For active campaigns with meaningful daily spend, checking frequency every 3–7 days is a reasonable cadence — frequent enough to catch fatigue early, but not so often that you're reacting to short-term noise. Longer-running awareness campaigns can be checked weekly, while high-spend direct-response campaigns often benefit from more frequent monitoring.",
            },
            {
              q: "Does ideal frequency differ by platform?",
              a: "Yes. Facebook and Instagram campaigns often see fatigue setting in around a frequency of 4–6 for direct-response objectives. TikTok's fast-scrolling, high-volume format tends to tolerate slightly higher frequency before performance drops. LinkedIn's smaller, more professional audiences often show fatigue at lower frequencies given the platform's slower content consumption pace. Always benchmark against your own historical campaign data where possible.",
            },
            {
              q: "Can I use this calculator for offline or non-digital advertising?",
              a: "Yes. The frequency formula (impressions ÷ reach) is a standard media planning metric used across all advertising channels, including TV, radio, out-of-home, and print, wherever both an estimated impression count and a reach estimate are available. The calculator's inputs and formula work identically regardless of the ad channel.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your impressions, reach, and campaign data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "📊", title: "Digital Marketers",        desc: "Monitor frequency across active campaigns to catch ad fatigue before it drives up cost per click, and export reports for internal performance reviews." },
            { icon: "📱", title: "Facebook & TikTok Advertisers", desc: "Quickly cross-check ad frequency against platform-reported metrics and get an instant recommendation on whether to refresh creative or expand targeting." },
            { icon: "💼", title: "Performance Marketing Agencies", desc: "Run frequency checks across multiple client ad sets, export CSV data for reporting spreadsheets, and generate PNG summary cards for client-facing decks." },
            { icon: "🎯", title: "Media Buyers",             desc: "Validate that delivered frequency matches planned frequency caps, and use the benchmark reference table to set realistic frequency targets during media planning." },
            { icon: "🏪", title: "Small Business Owners",    desc: "Understand whether a limited ad budget is reaching enough unique customers or oversaturating the same small audience, without needing an agency's analytics stack." },
            { icon: "🎓", title: "Marketing Students",       desc: "Learn the relationship between impressions, reach, and frequency, and build practical intuition for how ad fatigue affects real campaign performance." },
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
