export default function EngagementRateCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Engagement Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>engagement rate calculator</strong> is a free browser-based tool that measures how actively an audience interacts with social media content, using the industry-standard formulas built into platforms like Instagram, TikTok, Facebook, YouTube, LinkedIn, and X (Twitter). It answers the core question every creator, brand, and marketer asks after publishing a post: <em>how well did this actually perform, relative to the size of the audience that could have seen it?</em>
          </p>
          <p>
            Engagement rate is not a single formula — it changes depending on what you divide total engagement by. Dividing by followers tells you how much of your total audience engaged. Dividing by reach or impressions tells you how well the post converted the people who actually saw it. Dividing by video views tells you how engaging the content was to people who watched it. Each version answers a slightly different question, and mixing them up is one of the most common mistakes in social media reporting.
          </p>
          <p>
            This tool is built for <strong>social media managers, digital marketing agencies, influencers, content creators, brand managers, startup founders, freelancers, and marketing students</strong> who need an accurate, instant engagement rate without exporting analytics or doing manual spreadsheet math. It supports four percentage-based formulas, a cost-per-engagement mode for paid campaigns, and a fully custom formula for any denominator you choose. All calculations run locally in your browser with no signup, and results export as TXT, CSV, or a print-ready PDF.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Engagement Rate Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator adds up your likes, comments, shares, saves, and any other engagement actions into a single Total Engagement figure. It then divides that figure by whichever denominator matches your chosen formula, and multiplies by 100 to produce a percentage.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Total Engagement = Likes + Comments + Shares + Saves + Other Actions</p>
              <p>Engagement Rate (Followers)   = (Total Engagement / Followers) × 100</p>
              <p>Engagement Rate (Reach)       = (Total Engagement / Reach) × 100</p>
              <p>Engagement Rate (Impressions) = (Total Engagement / Impressions) × 100</p>
              <p>Engagement Rate (Views)       = (Total Engagement / Video Views) × 100</p>
              <p>Cost Per Engagement           = Ad Spend / Total Engagement</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Engagement Rate by Followers", "The default and most widely used formula — used in influencer media kits and brand campaign benchmarking because follower count is always available, even without analytics access."],
              ["Engagement Rate by Reach", "A more honest performance metric since it only counts people who actually saw the post, removing the bias of a large but inactive follower base."],
              ["Engagement Rate by Impressions", "Accounts for repeat views, which matters most for paid or boosted content where the same person may see a post multiple times."],
              ["Engagement Rate by Views", "The standard for video-first content on YouTube, TikTok, and Reels — measures how engaging a video was to the people who actually watched it."],
              ["Cost Per Engagement", "Divides total ad or campaign spend by total engagements, showing advertisers exactly how much each interaction costs."],
              ["Custom Formula", "Lets you divide total engagement by any number you choose — email subscribers, webinar attendees, website visitors, or any other audience size relevant to your campaign."],
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
          How to Use the Engagement Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Method", "Select Engagement Rate by Followers, Reach, Impressions, Views, Cost Per Engagement, or Custom Formula from the dropdown. The inline hint below the dropdown explains exactly what each formula measures and when to use it."],
                ["Load an Example (Optional)", "Click a platform icon under 'Load example' to instantly fill the form with realistic sample numbers for Instagram, TikTok, Facebook, YouTube, LinkedIn, or X — useful for testing the tool or learning how the formula behaves."],
                ["Enter Your Engagement Actions", "Type in likes, comments, shares, and saves. Use the optional 'Other Engagement Actions' field for clicks, replies, DMs, or any interaction your platform tracks that isn't listed separately."],
                ["Enter the Denominator", "Depending on your selected method, enter followers, reach, impressions, video views, a custom denominator, or your ad spend. Results update instantly as you type, with a 150ms debounce so typing stays smooth."],
                ["Adjust Decimal Precision", "Choose 0–3 decimal places depending on how exact you need the result — 2 decimals is standard for most reporting."],
                ["Read Your Results", "Review Total Engagements, your Engagement Rate (or Cost Per Engagement), and a color-coded Performance Rating from Poor to Exceptional."],
                ["Compare, Save, or Export", "Use 'Compare as A' and 'Compare as B' to benchmark two scenarios side by side, save calculations to history, or export your report as TXT, CSV, or a print-ready PDF."],
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
                "6 calculation methods: Followers, Reach, Impressions, Views, Cost Per Engagement, Custom Formula",
                "Real-time results with 150ms debounced updates as you type",
                "Platform example presets for Instagram, TikTok, Facebook, YouTube, LinkedIn, and X",
                "Configurable decimal precision from 0 to 3 places",
                "Color-coded performance rating — Poor, Average, Good, Excellent, Exceptional",
                "Favorite formula selection saved to your browser",
                "Side-by-side comparison mode for two calculations",
                "Calculation history — save and revisit up to 20 past results",
                "Export report as TXT, CSV, or print-ready PDF",
                "Copy full report to clipboard in one click",
                "Mobile-optimized numeric keypad for all number inputs",
                "Inline validation with clear, specific error messages",
                "Industry engagement rate benchmark reference table",
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
              title: "Influencer Media Kit Benchmarking",
              scenario: "An influencer with 45,000 Instagram followers wants to include an engagement rate on their media kit. Their last post received 1,350 likes, 210 comments, 95 shares, and 180 saves. Using Engagement Rate by Followers, the calculator returns 4.08% total engagement — placing them in the 'Good' performance tier, which they cite in outreach emails to brands as proof of an active, responsive audience.",
            },
            {
              title: "Brand Comparing Influencer Proposals",
              scenario: "A brand is evaluating two influencers before a sponsorship deal. Influencer A has 120,000 followers and typically gets 2,800 total engagements (2.33% rate). Influencer B has 38,000 followers but gets 3,100 total engagements (8.16% rate). Despite the smaller following, the brand chooses Influencer B — the Excellent performance rating signals a far more engaged, responsive audience per dollar spent.",
            },
            {
              title: "Paid Campaign Cost Efficiency Review",
              scenario: "A performance marketer spent $420 boosting a Facebook post that generated 640 total engagements. Switching to Cost Per Engagement mode, the calculator returns $0.66 per engagement. Comparing this against three other boosted posts in the same campaign, this ad set had the lowest cost per engagement, so the marketer reallocates the remaining budget toward the same creative and targeting combination.",
            },
            {
              title: "YouTube Video Performance Analysis",
              scenario: "A YouTube creator publishes a video that reaches 21,000 views with 540 likes, 60 comments, and 25 shares. Using Engagement Rate by Views, the calculator returns 2.98% — an Average rating for the platform. The creator compares this against their channel's top-performing videos (which average 5.2%) and identifies that this video's thumbnail and hook likely underperformed relative to their usual content.",
            },
            {
              title: "Email-to-Social Funnel Tracking with Custom Formula",
              scenario: "A marketing manager runs a social post promoting a webinar and wants to measure engagement relative to their 4,500-person email list rather than social followers. Using Custom Formula mode with a 4,500 denominator and 310 total engagements, the calculator returns 6.89% — a figure the manager reports directly to leadership as 'engaged list reach,' a metric not available from any single platform's native analytics.",
            },
            {
              title: "Quarterly Multi-Platform Reporting",
              scenario: "A social media manager reports quarterly engagement rates across five platforms for a retail client. Using the platform-specific presets and the benchmark table, they identify that the client's LinkedIn engagement rate of 5.4% sits near the top of the typical 2–6% industry range, while their X (Twitter) rate of 0.6% sits at the low end of the 0.5–2% benchmark — prioritizing LinkedIn content investment for the next quarter.",
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
                "Always state which formula you used when sharing an engagement rate. A 3% rate by followers and a 3% rate by reach mean very different things, and mixing them in reports without labeling causes confusion when compared against benchmarks.",
                "Use Engagement Rate by Reach instead of Followers when comparing accounts of different sizes — larger accounts naturally see lower follower-based rates simply due to audience scale, even with strong content.",
                "Save your most-used formula as a favorite using the star icon next to the dropdown — the calculator will remember it and load it automatically the next time you open the tool.",
                "When evaluating paid campaigns, always calculate both Engagement Rate and Cost Per Engagement. A high engagement rate with a high cost per engagement may still be a poor return relative to a lower-rate, lower-cost alternative.",
                "Use the Compare A/B feature to test 'what if' scenarios before publishing — for example, comparing your typical engagement numbers against a stretch goal to see how many additional comments or shares would move you into the next performance tier.",
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
                "Don't compare engagement rates across platforms without adjusting expectations — a 2% rate is weak on TikTok but strong on Facebook, because each platform has a completely different typical engagement range.",
                "Don't count views as engagement. Views measure exposure, not interaction — mixing them into your Total Engagement figure inflates the rate and misrepresents genuine audience response.",
                "Don't use follower count as a denominator for accounts with a large percentage of inactive or purchased followers. The resulting rate will be artificially low and won't reflect the real quality of your active audience — use Reach instead.",
                "Don't ignore Cost Per Engagement when comparing paid posts purely on engagement rate. A post with a lower engagement rate but dramatically lower spend can still be the more efficient use of budget.",
                "Don't treat a single post's engagement rate as representative of overall account health. Use several posts over a reporting period and average the results — one viral or one unusually quiet post can badly skew a single-post snapshot.",
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Calculation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["ER by Followers", "Total Engagement ÷ Followers × 100", "343 ÷ 12,500 × 100 = 2.74%"],
                ["ER by Reach", "Total Engagement ÷ Reach × 100", "343 ÷ 8,300 × 100 = 4.13%"],
                ["ER by Impressions", "Total Engagement ÷ Impressions × 100", "343 ÷ 14,500 × 100 = 2.37%"],
                ["ER by Views", "Total Engagement ÷ Video Views × 100", "343 ÷ 22,000 × 100 = 1.56%"],
                ["Cost Per Engagement", "Ad Spend ÷ Total Engagement", "$150 ÷ 343 = $0.44"],
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
        <p className="text-xs text-gray-400 mt-4">* Examples use Likes: 250, Comments: 35, Shares: 18, Saves: 40 → Total Engagement: 343 (rounding may vary slightly by input).</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is engagement rate and why does it matter?",
              a: "Engagement rate is the percentage of an audience that actively interacts with content through likes, comments, shares, or saves, relative to a chosen denominator such as followers, reach, or impressions. It matters because raw counts like '500 likes' mean little without context — engagement rate normalizes performance so you can compare posts, accounts, and campaigns of very different sizes on a level playing field.",
            },
            {
              q: "How is engagement rate calculated?",
              a: "Engagement rate is calculated by adding up all engagement actions (likes, comments, shares, saves, and any other tracked interactions) into a Total Engagement figure, then dividing that figure by a denominator — most commonly followers, reach, impressions, or video views — and multiplying by 100 to express it as a percentage.",
            },
            {
              q: "What is a good engagement rate for social media?",
              a: "It depends heavily on the platform and follower count. As a general guide, Instagram engagement rates of 0.5–3% are typical, TikTok often ranges from 4–18% due to its algorithmic video format, Facebook typically sees 0.15–1%, YouTube averages 1–5%, LinkedIn ranges from 2–6%, and X (Twitter) usually falls between 0.5–2%. Smaller, niche accounts frequently see higher rates than large accounts because their audiences are more tightly connected.",
            },
            {
              q: "What is the difference between engagement rate by followers and by reach?",
              a: "Engagement rate by followers divides total engagement by your total audience size, regardless of how many of them actually saw the post. Engagement rate by reach divides total engagement only by the unique accounts that saw the post. Reach-based engagement rate is almost always higher and considered a more accurate measure of content quality, since it excludes followers who never had a chance to interact.",
            },
            {
              q: "How do I calculate cost per engagement?",
              a: "Divide your total ad or campaign spend by the total number of engagements the content received: Cost Per Engagement = Ad Spend ÷ Total Engagement. For example, $150 spent on a post that generated 345 total engagements results in a cost of about $0.43 per engagement. Lower cost per engagement generally indicates more efficient ad spend.",
            },
            {
              q: "Can I use this calculator for platforms other than Instagram or TikTok?",
              a: "Yes. The formulas used in this calculator — engagement by followers, reach, impressions, and views — are industry-standard and apply to any platform that reports those metrics, including Facebook, YouTube, LinkedIn, X (Twitter), Pinterest, Threads, and Snapchat. The platform preset buttons simply load example numbers to help you get started; they don't change how the formula works.",
            },
            {
              q: "What counts as an 'engagement' action?",
              a: "Standard engagement actions are likes, comments, shares, and saves. Some platforms and marketers also count clicks, replies, direct messages, or reactions as engagement — the calculator includes an optional 'Other Engagement Actions' field for exactly this purpose. Views and impressions are not counted as engagement — they measure exposure, not interaction.",
            },
            {
              q: "Why do my engagement rates look different from what my platform's analytics show?",
              a: "Native platform analytics sometimes include additional interaction types (such as profile visits or link clicks) or calculate reach and impressions using slightly different windows of time than what you manually enter. Small differences are normal — the formula itself (engagement ÷ denominator × 100) is the same industry standard used across marketing tools and reporting dashboards.",
            },
            {
              q: "What is the Custom Formula mode for?",
              a: "Custom Formula mode lets you divide your total engagement by any number you choose instead of a platform-specific metric — useful for measuring engagement against an email list size, website visitor count, event attendee list, or any other audience figure relevant to a specific campaign that doesn't map neatly to followers, reach, or impressions.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your engagement numbers, follower counts, and campaign data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "📱", title: "Social Media Managers", desc: "Track engagement rate across multiple platforms and clients, benchmark performance against industry ranges, and produce reports without exporting raw analytics data." },
            { icon: "🏢", title: "Marketing Agencies",     desc: "Compare influencer proposals on an even footing using rate rather than raw follower counts, and calculate cost per engagement to justify paid media spend to clients." },
            { icon: "✍️", title: "Content Creators",       desc: "Understand which posts truly resonate with an audience versus which ones simply got more views, and use the favorite formula and history features to track performance over time." },
            { icon: "🎤", title: "Influencers",             desc: "Calculate and present an accurate engagement rate for brand media kits, and compare reach-based versus follower-based rates to demonstrate real audience quality." },
            { icon: "🚀", title: "Startup Founders",        desc: "Measure how an early-stage audience responds to organic content, and use the Custom Formula mode to track engagement relative to email lists or waitlists." },
            { icon: "🎓", title: "Marketing Students",      desc: "Learn the difference between engagement-by-followers, by-reach, and by-impressions formulas, and build practical intuition for reading real campaign performance data." },
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
