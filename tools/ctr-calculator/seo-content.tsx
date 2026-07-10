import React from "react";

export default function CTRCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a CTR Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>CTR calculator</strong> is a free online tool that computes click-through rate
            instantly from clicks and impressions. It answers the core performance question in every
            digital marketing campaign: <em>what percentage of people who saw this ad, link, or
            search result actually clicked on it?</em>
          </p>
          <p>
            CTR is the universal engagement signal across every paid and organic channel —
            Google Ads, Facebook ads, email campaigns, organic search, display, LinkedIn, Amazon PPC,
            and YouTube. A high CTR means your headline, ad copy, or meta description is relevant and
            compelling. A low CTR means something is misaligned — between the ad and the audience,
            the title and the query, or the offer and the intent.
          </p>
          <p>
            This <strong>click through rate calculator</strong> is built for <strong>PPC advertisers
            tracking Google Ads and Facebook CPC performance, SEO specialists optimizing organic CTR
            from Google Search Console, email marketers measuring campaign click rates, social media
            managers reporting on ad results, and marketing analysts benchmarking performance
            across channels</strong>. Real-time calculation, performance badge, calculation history,
            CSV export, shareable URL. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          CTR Formula and Related Metrics
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            CTR is one of three core PPC metrics — alongside CPC (cost per click) and CPM (cost per
            thousand impressions). Understanding all three together lets you diagnose whether a
            campaign has a targeting problem, a creative problem, or a bidding problem.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">CTR</span>  = (Clicks ÷ Impressions) × 100</p>
              <p className="text-gray-500 text-xs ml-4">Example: 150 clicks ÷ 5,000 impressions × 100 = 3.00% CTR</p>
              <p className="mt-2"><span className="font-semibold">CPC</span>  = Total Ad Spend ÷ Total Clicks</p>
              <p className="text-gray-500 text-xs ml-4">Example: $450 spend ÷ 150 clicks = $3.00 cost per click</p>
              <p className="mt-2"><span className="font-semibold">CPM</span>  = (Total Ad Spend ÷ Impressions) × 1,000</p>
              <p className="text-gray-500 text-xs ml-4">Example: $450 spend ÷ 5,000 impressions × 1,000 = $90 CPM</p>
              <p className="mt-2"><span className="font-semibold">Impressions from CTR + Clicks</span> = Clicks ÷ (CTR ÷ 100)</p>
              <p className="text-gray-500 text-xs ml-4">Example: 150 clicks ÷ 0.03 = 5,000 impressions</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>CTR and CPC are inversely related in Google Ads</strong> — a higher CTR improves Quality Score, which lowers your cost per click for the same ad position.</li>
            <li>• <strong>CTR ≠ engagement rate</strong> — engagement rate (likes, shares, comments) measures interactions after the click. CTR only measures whether the click happened.</li>
            <li>• <strong>Unique CTR vs total CTR</strong> — some platforms report total clicks (counting repeat clicks from the same user); others report unique clicks. Always check which metric your platform is exporting before calculating.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CTR Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Enter Your Clicks", "Type the total number of clicks your ad, link, or search result received during the measurement period. Use the exact figure from your ad platform — Google Ads, Facebook Ads Manager, Google Search Console, or your email marketing dashboard."],
              ["Enter Your Impressions", "Type the total number of times your content was shown to users. In Google Ads this is labeled 'Impressions'. In GSC it's 'Impressions'. In email platforms it may be labeled 'Delivered' or 'Opens' — check which your platform uses to define the denominator."],
              ["Read the CTR and Performance Badge", "CTR updates instantly as you type. A performance badge (Excellent / Good / Average / Low) contextualizes the result against channel benchmarks automatically. The badge thresholds vary by how you're using the tool — refer to the benchmark table below for channel-specific context."],
              ["Compare Periods or Campaigns", "To compare two campaigns or time periods, calculate the first CTR, copy the result, then clear the inputs and enter the second set. Use the calculation history panel to see previous results side by side without re-entering values."],
              ["Export or Share", "Click Copy to send the result and full breakdown to clipboard. Click Download to save as TXT or CSV for inclusion in reports. The shareable URL encodes your current inputs — paste it into a Slack message or email to share the exact calculation with a colleague."],
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
                "Real-time CTR calculation as you type",
                "Performance badge (Excellent / Good / Average / Low)",
                "Calculation history saved locally",
                "Decimal precision selector (0–4 places)",
                "Quick example presets for common platforms",
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
              title: "Google Ads Campaign Audit",
              scenario: "A PPC manager exports a 30-day Google Ads report showing 2,350 clicks from 72,800 impressions. Entering those values returns 3.23% CTR — above the 2–5% search ads average, confirming the ad copy is performing well. They note the CTR and use it as a baseline when testing a new ad variant next month.",
            },
            {
              title: "Organic CTR Optimization (SEO)",
              scenario: "An SEO specialist pulls GSC data showing a product page at position 4 with 18,000 impressions and 360 clicks — a 2.0% CTR. Position 4 should theoretically achieve 4–6%. They enter 360 ÷ 18,000 to confirm the gap, then rewrite the title tag and meta description to be more action-oriented. After two weeks, CTR improves to 4.1% — doubling organic traffic with no change in ranking.",
            },
            {
              title: "Email Campaign Click Rate Reporting",
              scenario: "An email marketer sends a campaign to 45,000 subscribers and records 1,980 clicks on the main CTA. Entering 1,980 ÷ 45,000 returns 4.40% CTR — solidly above the industry 2–5% average. They include this figure in the campaign report and benchmark it against the previous email's 3.1% to demonstrate improvement.",
            },
            {
              title: "Facebook Ad Creative A/B Test",
              scenario: "A social media manager runs two Facebook ad variants simultaneously. Ad A: 380 clicks, 28,000 impressions → 1.36% CTR. Ad B: 510 clicks, 28,000 impressions → 1.82% CTR. Both are within the 0.5–1.5% Facebook average but Ad B outperforms Ad A by 34%. They pause Ad A, allocate full budget to Ad B, and use the CTR difference to justify the creative change in the client report.",
            },
            {
              title: "Amazon PPC Listing Performance",
              scenario: "An Amazon seller reviews their sponsored product ads: 95 clicks from 4,200 impressions = 2.26% CTR. Amazon search ads typically achieve 0.4–1.0%, so 2.26% indicates strong product-keyword alignment. They increase the bid on this campaign and use the strong CTR as a Quality Score signal to secure better placement.",
            },
            {
              title: "Display Ad vs Search Ad Comparison",
              scenario: "A marketing analyst is comparing spend efficiency across Google Search and Display campaigns. Search: 850 clicks ÷ 21,000 impressions = 4.05% CTR. Display: 210 clicks ÷ 420,000 impressions = 0.05% CTR. Both are normal for their channel. The analyst presents both numbers with their respective benchmarks — avoiding the mistake of comparing display CTR directly to search CTR.",
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
                ["Never compare CTR across channels without context", "A 0.05% CTR on Google Display is excellent. A 0.05% CTR on Google Search is a signal your ad copy is failing completely. Each channel has its own baseline — use the benchmark table below to contextualize every result before making decisions."],
                ["CTR is a leading indicator — pair it with conversion rate", "High CTR with low conversion rate means your ad is attracting the wrong clicks. Low CTR with high conversion rate means you're reaching a precise audience but missing the broader pool. The two metrics together reveal whether you have a messaging problem, an audience problem, or both."],
                ["Use CTR trends week-over-week, not just snapshots", "A 3.2% CTR looks fine in isolation. A CTR that was 4.8% six weeks ago and has dropped to 3.2% is a creative fatigue signal requiring fresh ad variants. Always pull at least 4 weeks of data before interpreting any single CTR figure."],
                ["For organic CTR, position matters more than content in the short term", "An SEO page at position 8 with 1.2% CTR is outperforming the typical 0.7% expected at that position — but it will never match a page at position 2 with 8% CTR. Prioritize rank improvements on high-impression, low-position pages before optimizing CTR on pages already in the top 3."],
                ["In email, CTR denominator matters — use delivered, not opened", "Some email platforms calculate CTR as clicks ÷ opens (click-to-open rate, CTOR). Others use clicks ÷ delivered. These produce very different percentages from the same campaign. Always check what denominator your platform uses before benchmarking or reporting."],
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
                ["Treating CTR as the primary success metric", "CTR measures clicks, not outcomes. An ad with 8% CTR that converts at 0.5% is worse than an ad with 2% CTR that converts at 4%. Optimizing purely for CTR without tracking post-click behavior often leads to clickbait ad copy that attracts unqualified traffic and wastes budget."],
                ["Comparing CTR across mismatched time periods", "A campaign's CTR in November (holiday peak traffic) vs. February (post-holiday trough) is not an apples-to-apples comparison. Seasonality, competition levels, and audience behavior all affect CTR independently of ad quality. Always compare equivalent periods — same month last year, or the same campaign configuration over the same date range."],
                ["Ignoring impression volume when interpreting CTR", "A 10% CTR from 50 impressions is statistically meaningless — it could be 5 clicks from 5 very specific people. CTR only becomes actionable with sufficient impression volume. For Google Ads, wait for at least 1,000 impressions before treating a CTR figure as reliable."],
                ["Using email open rate as the CTR denominator", "If your email platform defaults to CTOR (click-to-open rate), a '6% CTR' actually means 6% of openers clicked — not 6% of all recipients. Against a 25% open rate, true delivered-based CTR is 1.5%. Misreading this inflates perceived performance and distorts campaign comparisons."],
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

      {/* ── 6. Benchmark Reference Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CTR Benchmarks by Channel
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Channel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical CTR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Strong CTR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Google Search Ads",       "2–5%",      "5%+",    "Varies heavily by keyword intent and industry. Legal/finance can be lower despite high CPC."],
                ["Google Display Ads",      "0.05–0.3%", "0.5%+",  "Banner blindness keeps display CTR low universally. Retargeting ads perform 3–5× better than prospecting."],
                ["Facebook / Instagram Ads","0.5–1.5%",  "2%+",    "Video ads typically outperform static image. Stories format benchmarks differ from feed."],
                ["LinkedIn Ads",            "0.3–0.8%",  "1%+",    "Sponsored Content outperforms Message Ads for CTR. B2B audience is selective — quality over volume."],
                ["Amazon Sponsored Ads",    "0.4–1.0%",  "1.5%+",  "High-intent purchase context. CTR strongly correlates with main image and price competitiveness."],
                ["Email Campaigns",         "2–5%",      "5%+",    "Clicks ÷ delivered. Top-of-list CTAs outperform bottom. Plain-text emails often outperform HTML."],
                ["Organic Search (SEO)",    "2–10%",     "10%+",   "Position 1 averages 25–30% CTR. Position 4–5 averages 3–6%. Rich snippets can 2× CTR at any position."],
                ["YouTube Ads (TrueView)",  "0.3–0.7%",  "1%+",    "Click = viewer clicking CTA overlay or companion banner. Skip rate is the more watched metric."],
                ["Twitter / X Ads",         "0.5–1.0%",  "1.5%+",  "Promoted tweets benchmark. Varies widely by audience and creative format."],
                ["Push Notifications",      "1–3%",      "4%+",    "Web push on desktop. Mobile push typically 2–5×. Highly time-sensitive — decays within hours."],
              ].map(([channel, typical, strong, notes]) => (
                <tr key={channel} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">{channel}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{typical}</td>
                  <td className="py-3 px-4 font-mono">{strong}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Benchmarks are approximate industry averages. Actual CTR varies by industry, creative quality, audience targeting, and competitive landscape. Always compare against your own historical baseline first.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is CTR (click-through rate)?",
              a: "CTR (click-through rate) is the percentage of people who clicked on an ad, link, or search result out of the total number who saw it. It is the foundational engagement metric in digital marketing — measuring how effectively your headline, ad copy, or meta description converts impressions into traffic. CTR = (Clicks ÷ Impressions) × 100.",
            },
            {
              q: "How is CTR calculated?",
              a: "CTR is calculated by dividing the number of clicks by the number of impressions, then multiplying by 100 to get a percentage. For example, 150 clicks from 5,000 impressions gives (150 ÷ 5,000) × 100 = 3.00% CTR. The formula is the same across all platforms — only the benchmarks differ by channel.",
            },
            {
              q: "What is a good CTR for Google Ads?",
              a: "For Google Search Ads, a CTR of 2–5% is considered typical across most industries, with 5%+ being strong. Branded keyword campaigns often achieve 10–20% CTR since users are specifically searching for the brand. Non-branded, competitive keywords frequently run 1–3%. Google Display Ads have a much lower baseline — 0.05–0.3% is normal due to banner blindness and lower audience intent.",
            },
            {
              q: "What is a good CTR for Facebook ads?",
              a: "For Facebook and Instagram feed ads, a CTR of 0.5–1.5% is the typical range, with 2%+ being strong. The exact benchmark varies by ad format — video ads and carousel ads tend to outperform single-image ads. Retargeting campaigns aimed at warm audiences generally achieve 2–4× higher CTR than cold-audience prospecting campaigns targeting new users.",
            },
            {
              q: "What is a good organic CTR for SEO?",
              a: "Organic CTR depends heavily on search position. Position 1 averages 25–30% CTR. Position 2–3 averages 10–15%. Position 4–5 drops to 3–6%. Position 10 (bottom of page 1) averages around 1–2%. Rich snippets, star ratings, and FAQ markup can significantly lift CTR above these averages at the same ranking position — making them high-leverage SEO optimizations.",
            },
            {
              q: "What is the difference between CTR and conversion rate?",
              a: "CTR measures the percentage of impressions that resulted in a click. Conversion rate measures the percentage of clicks that resulted in a desired action — a purchase, form submission, or sign-up. CTR tells you whether your ad or listing is attracting attention. Conversion rate tells you whether your landing page and offer are convincing visitors to act. Both metrics are needed together to evaluate a campaign's full efficiency.",
            },
            {
              q: "Does CTR affect Google Ads Quality Score?",
              a: "Yes. Expected CTR is one of the three components of Google Ads Quality Score, alongside ad relevance and landing page experience. A higher expected CTR improves your Quality Score, which raises your Ad Rank and can lower your actual cost per click for the same bid. Improving CTR through better ad copy is one of the most direct ways to reduce CPC without changing your maximum bid.",
            },
            {
              q: "Does CTR affect SEO rankings?",
              a: "Google has not officially confirmed CTR as a direct ranking factor, but higher organic CTR sends stronger user engagement signals that correlate with better rankings over time. More importantly, optimizing title tags and meta descriptions to improve CTR directly increases organic traffic from your current rankings — you get more visitors without needing to move up in position. This makes CTR optimization one of the highest-ROI SEO tasks for pages already on page 1.",
            },
            {
              q: "Can CTR be over 100%?",
              a: "In most analytics platforms, CTR cannot exceed 100% because clicks are capped at the impression count for standard tracking. However, some platforms count total clicks (including repeat clicks from the same user) while impressions count unique displays — which can theoretically produce CTR above 100%. If you see this, it usually indicates a tracking configuration issue, mismatched date ranges between click and impression data, or bot traffic inflating click counts.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your clicks, impressions, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🔍", title: "SEO Specialists", desc: "Pull CTR data from Google Search Console, identify pages where position is strong but CTR is below expected, and prioritize title tag and meta description rewrites by revenue potential." },
            { icon: "📢", title: "PPC Advertisers", desc: "Monitor Google Ads and Microsoft Ads CTR to track Quality Score signals, catch creative fatigue early, and benchmark ad copy variants against each other and industry averages." },
            { icon: "📱", title: "Social Media Managers", desc: "Measure Facebook, Instagram, LinkedIn, and TikTok ad CTR to identify winning creatives, kill underperformers before they drain budget, and report campaign results to clients." },
            { icon: "📧", title: "Email Marketers", desc: "Track email click-through rates across campaigns to A/B test subject lines, CTA button placement, and email content blocks — with consistent CTR calculations regardless of platform." },
            { icon: "📊", title: "Marketing Analysts", desc: "Benchmark CTR performance across channels, build period-over-period comparisons, and present campaign results in reports with shareable calculation links and CSV exports." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how CTR fits into the paid and organic digital marketing funnel, practice calculations with real-world data, and understand the relationship between CTR, CPC, and Quality Score." },
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
