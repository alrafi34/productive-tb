export default function ImpressionsCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Impressions Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>impressions calculator</strong> is a free digital marketing tool that estimates the total number of times a piece of content, advertisement, or social media post was displayed to users. Unlike clicks or conversions — which measure action — an impression is counted every time content appears on a screen, regardless of whether the viewer interacts with it. Impressions are the foundational metric for measuring reach, brand awareness, and media spend efficiency across paid advertising, organic social, email, and content marketing.
          </p>
          <p>
            Because impressions can be calculated from several different starting points depending on your available data, this tool supports four industry-standard estimation methods: Reach × Frequency (for audience-based planning), CPM + Budget (for paid media forecasting), Clicks ÷ CTR (for back-calculating from engagement data), and Engagement Rate Estimation (for organic social media posts). Each mode uses a transparent formula and shows the full calculation steps so you understand exactly how the number was derived.
          </p>
          <p>
            This tool is built for <strong>digital marketers, social media managers, PPC specialists, media buyers, content creators, agencies, and business owners</strong> who need fast, reliable impression estimates without logging into an ad platform. All calculations run locally in your browser — no data is sent to any server. Results export as TXT or CSV for inclusion in reports and presentations.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Impressions Are Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies one of four formulas depending on which data you have available. Each formula is a different way of arriving at the same answer — how many times was this content displayed?
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Four Calculation Modes</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Mode 1:</span> Impressions = Reach × Frequency</p>
              <p><span className="font-semibold">Mode 2:</span> Impressions = (Budget ÷ CPM) × 1,000</p>
              <p><span className="font-semibold">Mode 3:</span> Impressions = Clicks ÷ (CTR / 100)</p>
              <p><span className="font-semibold">Mode 4:</span> Impressions = (Followers × Reach%) × Avg Frequency</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Reach × Frequency", "Use when you know how many unique users saw your content and how many times each saw it on average. Common in TV, radio, OOH, and planned digital campaigns."],
              ["CPM + Budget", "Use when planning paid media. Divide your total budget by the CPM rate, then multiply by 1,000 to find how many impressions your spend can buy at that price."],
              ["Clicks ÷ CTR", "Use when you have click data but no impression data. Divide total clicks by the CTR percentage (as a decimal) to reverse-engineer the impression count."],
              ["Engagement Rate", "Use for organic social media. Multiply followers by estimated reach percentage to get reached users, then multiply by average frequency to get total impressions."],
            ].map(([mode, desc]) => (
              <li key={mode} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{mode}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Impressions Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Select a Calculation Mode", "Click the mode tab that matches your available data. Use Reach × Frequency if you have audience planning data. Use CPM + Budget for paid media planning. Use Clicks ÷ CTR if you have analytics data. Use Engagement Rate for organic social estimation."],
                ["Enter Your Values", "Fill in the input fields for the selected mode. All fields update the result in real time with a 150ms debounce — you do not need to click a calculate button. Decimal values are accepted in all fields."],
                ["Review the Results", "The estimated impression count appears immediately in the result card, shown in both full format (e.g. 87,500) and abbreviated format (e.g. 87.5K). The insights panel below shows supporting metrics for context."],
                ["Open Formula & Steps", "Click Formula & Steps to see the exact calculation breakdown — the formula used, the input values substituted in, and the result at each stage. Useful for verifying or presenting the calculation."],
                ["Export or Copy", "Click Copy Report to copy the full calculation to clipboard. Use Export TXT for a plain-text report or Export CSV for a spreadsheet-friendly version with all steps and insights. Save to History stores up to 20 calculations in your browser."],
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
                "Four calculation modes: Reach × Freq, CPM, CTR, Engagement",
                "Real-time results with 150ms debounced updates",
                "Full and abbreviated number formatting (K, M, B)",
                "Calculation steps panel showing each formula stage",
                "Insights panel with supporting metrics and context notes",
                "Industry benchmark reference table (CPM, CTR, Frequency)",
                "Mode comparison — click any mode row to switch instantly",
                "Export report as TXT or CSV with timestamp",
                "Copy full report to clipboard in one click",
                "Save up to 20 calculations to local browser history",
                "Input validation with inline error messages",
                "All processing runs locally — no data leaves your browser",
                "No signup, no account, no rate limits",
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
              title: "Paid Media Campaign Planning",
              scenario: "A media buyer is planning a Google Display campaign with a $2,500 budget. The average CPM for their target audience is $4.80. They enter these values into CPM + Budget mode and instantly see the campaign will deliver approximately 520,833 impressions. They adjust the budget up to $3,000 and see the impression count update in real time to 625,000 — enough to hit their brand awareness target for the month.",
            },
            {
              title: "Social Media Post Performance Estimate",
              scenario: "A content creator with 85,000 Instagram followers wants to estimate impressions before pitching a sponsored post to a brand. They use Engagement Rate mode with a 4.2% engagement rate, 18% estimated reach, and 1.6× average frequency. The result — approximately 24,480 impressions — becomes the basis for their rate card, priced at a CPM of $12 for the sponsorship.",
            },
            {
              title: "Back-Calculating Impressions from Analytics",
              scenario: "An SEO manager is preparing a quarterly report and needs impression data for a landing page campaign. Their analytics dashboard shows 1,840 clicks but does not show impressions directly. They use the CTR mode with a 3.2% CTR and instantly calculate that the page generated approximately 57,500 impressions over the quarter — a number they can include in the executive report.",
            },
            {
              title: "Audience Reach Planning for a Launch",
              scenario: "A marketing director is planning a product launch campaign targeting 40,000 unique users with an average frequency of 4.5 across all channels. Using Reach × Frequency mode, they calculate 180,000 total impressions across the campaign flight. This figure feeds into their media mix model and helps allocate budget across display, social, and connected TV placements.",
            },
            {
              title: "Influencer Campaign ROI Analysis",
              scenario: "An agency is evaluating three influencer proposals for a client. They run each influencer's follower count, engagement rate, and estimated reach through the Engagement Rate mode. Influencer A (220K followers, 2.1% ER, 15% reach) generates ~69,300 impressions. Influencer B (95K followers, 6.8% ER, 28% reach) generates ~53,200 impressions. Despite the smaller audience, Influencer B's higher engagement justifies the rate based on CPM efficiency.",
            },
            {
              title: "Email Marketing Impression Estimation",
              scenario: "An email marketing manager sent a campaign to 35,000 subscribers and recorded 1,120 clicks on the main CTA with a 3.2% CTR. Using Clicks ÷ CTR mode, they calculate that the email generated approximately 35,000 impressions — essentially matching the send list, which makes sense for email where impressions roughly equal delivered emails. The calculation confirms their open rate and click data are internally consistent.",
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
                "Use the CPM mode for budget planning before a campaign starts, and the Clicks ÷ CTR mode for analysis after it ends. The two modes answer different questions: one forecasts, one validates.",
                "For organic social, platform-reported reach is usually 10–30% of followers on Instagram and Facebook. Use 20% as a starting estimate if you have no historical data for your account, and adjust based on your actual analytics.",
                "Frequency caps exist for a reason — most ad platforms recommend 3–5 frequency for awareness campaigns and 1–2 for retargeting. If your Reach × Frequency calculation shows frequency above 7, your campaign may be causing ad fatigue rather than building awareness.",
                "When comparing channels, always calculate cost-per-thousand-impressions (CPM) alongside the raw impression count. 1 million impressions at $30 CPM is far more expensive than 1 million impressions at $2 CPM — raw numbers without cost context are misleading.",
                "For influencer campaigns, use the Engagement Rate mode rather than simply taking the platform-reported impression figure, which often includes low-quality views. An estimate built from reach percentage and frequency gives you a more conservative, defensible number for client reporting.",
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
                "Don't confuse impressions with reach. Reach is the number of unique users who saw the content. Impressions count total views, including repeat views by the same user. A reach of 10,000 with a frequency of 3.5 generates 35,000 impressions — not 10,000.",
                "Don't use total followers as your reach estimate for organic social posts. On most platforms, only 10–30% of followers see any given post. Using the full follower count dramatically overstates your actual impression count.",
                "Don't treat estimated impressions as exact figures. The Engagement Rate and CTR modes are estimates based on averages — actual platform-reported impressions will differ. Use these numbers for planning and benchmarking, not as a substitute for real analytics data.",
                "Don't forget viewability standards. In digital advertising, an impression is only counted as viewable if 50% of the ad was visible for at least one second (display) or two seconds (video). Platform-reported impressions and viewable impressions are different numbers.",
                "Don't compare impressions across channels without adjusting for quality. A TV impression, a search ad impression, and an organic social impression have very different engagement probabilities. Raw impression counts need channel context to be meaningful in a media mix.",
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

      {/* ── Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Impressions Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best Used When</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Reach × Frequency",  "Reach × Freq",              "You have audience size and exposure data",         "Media plan, ad platform audience report"],
                ["CPM + Budget",       "(Budget ÷ CPM) × 1,000",    "Planning paid media spend before a campaign",     "Rate cards, ad platform CPM estimates"],
                ["Clicks ÷ CTR",       "Clicks ÷ (CTR / 100)",      "You have click and CTR data but no impressions",  "Google Ads, GSC, Facebook Ads Manager"],
                ["Engagement Rate",    "(Followers × Reach%) × Freq","Estimating organic social post impressions",      "Instagram Insights, TikTok Analytics, Twitter"],
              ].map(([mode, formula, when, source]) => (
                <tr key={mode} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{mode}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-primary font-semibold">{formula}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{when}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* All formulas produce estimates. Use platform-reported impression data when available for exact figures.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is an impression in digital marketing?",
              a: "An impression is counted each time a piece of digital content — an ad, a social media post, a search result, or an email — is displayed on a user's screen. Impressions measure total exposure including repeat views by the same user, making them different from reach, which only counts unique viewers. Most ad platforms count an impression the moment an ad loads on screen, though viewability standards (requiring 50% of the ad to be visible for at least one second) apply in some contexts.",
            },
            {
              q: "What is the difference between impressions and reach?",
              a: "Reach measures how many unique individuals saw your content — each person counted once regardless of how many times they saw it. Impressions count every time the content was displayed, including multiple views by the same person. If 10,000 people each saw your ad 3.5 times on average, your reach is 10,000 but your impressions are 35,000. Both metrics matter: reach tells you how widely your message spread, while impressions tell you total exposure volume.",
            },
            {
              q: "What is CPM and how does it relate to impressions?",
              a: "CPM stands for Cost Per Mille — the cost to serve 1,000 impressions. It is the standard pricing model for display advertising, video ads, and some social media placements. The relationship is direct: if your CPM is $8 and your budget is $500, you can buy (500 ÷ 8) × 1,000 = 62,500 impressions. CPM varies widely by channel — from $0.50 for broad network display to $50+ for LinkedIn targeting premium B2B audiences.",
            },
            {
              q: "How do I estimate impressions from CTR and clicks?",
              a: "If you know how many clicks an ad or page received and what the click-through rate was, you can reverse-engineer the impression count using: Impressions = Clicks ÷ (CTR / 100). For example, 350 clicks at a 2.5% CTR implies 14,000 impressions. This is particularly useful when your analytics tool reports clicks and CTR but not raw impressions — common in Google Search Console's organic data.",
            },
            {
              q: "What is a good number of impressions for a social media post?",
              a: "There is no universal benchmark — 'good' impressions are relative to your follower count, content type, and platform algorithm. A rough guide: organic Instagram posts typically reach 10–30% of followers, meaning a 50,000-follower account might generate 5,000–15,000 impressions per post. Viral content can reach multiples of your follower count through shares and algorithm distribution. For paid social, any CPM below your campaign target rate means your impressions are being purchased efficiently.",
            },
            {
              q: "What frequency is optimal for an ad campaign?",
              a: "Frequency recommendations vary by campaign objective. For brand awareness, an average frequency of 3–5 impressions per person over a campaign flight is commonly cited as effective — below 3, many users have insufficient exposure to register the brand; above 7, ad fatigue and negative sentiment tend to increase. For retargeting campaigns, 1–2 frequency is typically recommended to remind rather than irritate. Connected TV and streaming platforms often cap frequency at 3–4 per household per day.",
            },
            {
              q: "How are organic social media impressions calculated?",
              a: "Organic social impressions depend on how many of your followers the algorithm shows the post to (reach) and how many times each viewer sees it (frequency). Platforms rarely reveal their full distribution logic, but estimated reach of 10–30% of followers is typical for Instagram and Facebook organic posts. If a 60,000-follower account reaches 20% of followers (12,000 people) and each viewer sees the post 1.5 times on average, total impressions equal 18,000.",
            },
            {
              q: "Why does my calculator result differ from platform-reported impressions?",
              a: "This calculator uses estimation formulas based on the inputs you provide — it cannot access your ad account or analytics data directly. Platform-reported impressions account for real-time auction dynamics, actual audience composition, viewability filtering, and ad delivery algorithms that this tool cannot replicate. Use this calculator for planning, forecasting, and benchmarking — always defer to platform-reported data for post-campaign analysis.",
            },
            {
              q: "What is the viewability rate and why does it matter?",
              a: "Viewability rate is the percentage of served impressions that met the minimum viewability standard — typically 50% of the ad visible for at least one second for display, or two seconds for video (MRC standard). An ad can be served (counted as an impression) without being truly seen — below-the-fold placements, fast scrollers, and ad-stacking issues reduce viewability. Industry average viewability for display is roughly 50–70%. When buying media on a viewable impression (vCPM) basis, you only pay for impressions that met the standard.",
            },
            {
              q: "Does this tool store my data?",
              a: "No. All calculations run entirely in your browser using JavaScript. No campaign data, budgets, or metrics you enter are transmitted to any server. The calculation history feature stores results in your browser's localStorage only — accessible only on your device and cleared when you clear your browser data. This makes the tool safe for working with confidential client campaign data.",
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
            { icon: "📢", title: "PPC Specialists",       desc: "Forecast campaign reach from budget and CPM data, back-calculate impressions from click reports, and build pre-campaign media plans with impression targets anchored to spend." },
            { icon: "📱", title: "Social Media Managers", desc: "Estimate organic post impressions from follower count and engagement data, set realistic expectations for client campaigns, and calculate the impression value of influencer partnerships." },
            { icon: "🏢", title: "Marketing Agencies",   desc: "Build impression-based media plans for clients across multiple channels, export structured reports for presentations, and compare channels on a CPM-adjusted impression basis." },
            { icon: "🌐", title: "Website Owners",        desc: "Estimate the impression value of display ad placements on their site, understand how traffic and page views translate into potential ad impressions, and price sponsorships based on CPM." },
            { icon: "✍️", title: "Content Creators",     desc: "Calculate the impression value of sponsored posts before setting rates, estimate how many followers need to see a post to hit brand KPIs, and demonstrate reach to potential sponsors." },
            { icon: "🎓", title: "Marketing Students",   desc: "Learn how impressions relate to reach, frequency, CPM, and CTR through hands-on calculation, understand industry benchmark ranges across channels, and practice media planning fundamentals." },
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
