export default function SocialMediaReachCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Social Media Reach Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>social media reach calculator</strong> is a free browser-based tool that estimates the potential reach, impressions, engagement, shares, saves, and audience growth of social media content across nine major platforms — Instagram, Facebook, TikTok, LinkedIn, YouTube, X (Twitter), Pinterest, Threads, and Snapchat. Rather than relying on platform analytics dashboards, this calculator lets you forecast performance before publishing so you can set realistic KPIs, evaluate campaign scenarios, and plan content strategy with data-driven confidence.
          </p>
          <p>
            Reach, impressions, and engagement are the three core metrics in social media marketing, but each platform calculates and weighs them differently. Instagram's algorithm distributes content to roughly 20–40% of followers organically; TikTok's For You Page can push content far beyond the follower base; LinkedIn rewards professional content with a 25–35% organic reach rate that outperforms most other networks. This calculator applies platform-specific baseline assumptions — adjustable for content type, audience quality, and paid amplification — to produce a meaningful, contextualised estimate rather than a generic formula.
          </p>
          <p>
            This tool is built for <strong>social media managers, digital marketers, content creators, influencers, agencies, startup founders, and small business owners</strong> who need a quick, reliable reach estimate without exporting data from ad platforms. All calculations run locally in your browser — no data is stored or transmitted. Results export as TXT or CSV for use in client reports and content calendars.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Reach Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies a platform-specific reach rate to your follower count, then adjusts the result based on content type, audience quality, and paid amplification. Engagement, shares, saves, and estimated audience growth are derived from the reach figure using configurable percentage rates.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Organic Reach  = Followers × ReachRate × ContentMult × QualityMult</p>
              <p>Final Reach    = Paid ? OrganicReach × PaidMultiplier : OrganicReach</p>
              <p>Impressions    = FinalReach × ImpressionsMultiplier</p>
              <p>Engagement     = OrganicReach × (EngagementRate / 100)</p>
              <p>Shares         = Engagement × (ShareRate / 100)</p>
              <p>Saves          = Engagement × (SaveRate / 100)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Platform Reach Rate", "Each platform has a documented average organic reach rate — the percentage of followers who see a given post. TikTok is highest (~60%) due to algorithmic distribution; Facebook is lowest (~8%) due to pay-to-play dynamics."],
              ["Content Type Multiplier", "Video and Reels content earns significantly higher reach than static images on most platforms. Live content earns the highest multiplier (1.6×) while Stories earn the lowest (0.75×) due to ephemeral placement."],
              ["Audience Quality Multiplier", "A genuine, engaged audience of real followers generates proportionally more reach than an inflated follower count with bots or inactive accounts. Quality ranges from 0.6× (poor) to 1.2× (excellent)."],
              ["Paid Amplification", "Enabling paid promotion multiplies organic reach by a configurable 1–10× factor, reflecting paid distribution to audiences beyond your organic follower base."],
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
          How to Use the Social Media Reach Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Select a Platform", "Click the platform that matches your content channel. The engagement rate, reach rate, and impression multiplier automatically update to reflect that platform's documented averages. You can override the engagement rate manually using the slider."],
                ["Enter Your Follower Count", "Type your total follower or subscriber count. The calculator accepts values from 1 to 1 billion. Results update in real time as you type with a 150ms debounce."],
                ["Adjust Engagement and Share Rates", "Use the sliders to set your expected engagement rate, average shares, and average saves as percentages. The platform average is shown as a reference on the engagement slider — adjust upward if your content typically outperforms the average, or downward for new accounts."],
                ["Configure Content and Audience Settings", "Select your content type (Reels and video earn higher multipliers), audience quality (poor to excellent), and posting frequency. Posting frequency affects the estimated monthly audience growth calculation."],
                ["Toggle Paid Promotion", "If you plan to boost the post, enable Paid Promotion and set the reach multiplier. A 2× multiplier means paid distribution will double your organic reach estimate. The organic vs paid comparison bar chart appears automatically."],
                ["Read Results and Export", "Review reach, impressions, engagement, shares, saves, growth, and performance score. Export as TXT, CSV, or a print-ready PDF for client reports, copy the full report to clipboard, or share a summary directly. Save up to 20 calculations to browser history."],
                ["Compare Two Campaigns", "Run a calculation, click 'Compare as A', then adjust your inputs and click 'Compare as B' to see both campaigns' reach, engagement, impressions, and performance score side by side."],
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
                "9 platforms: Instagram, Facebook, TikTok, LinkedIn, YouTube, X, Pinterest, Threads, Snapchat",
                "Platform-specific reach rates, engagement defaults, and growth estimates",
                "Real-time results with 150ms debounced updates",
                "Content type multipliers (Image, Carousel, Video, Reel, Short, Story, Live)",
                "Audience quality adjustment (Poor → Excellent)",
                "Posting frequency — affects monthly growth estimate",
                "Paid promotion toggle with 1–10× reach multiplier",
                "Organic vs paid comparison bar display",
                "6 result metrics: Reach, Impressions, Engagement, Shares, Saves, Growth",
                "Performance score 0–100 with colour-coded level",
                "Platform benchmark reference table — click to switch platform",
                "Export report as TXT, CSV, or print-ready PDF with timestamp",
                "Copy full report to clipboard or share a summary in one click",
                "Side-by-side comparison mode for two campaigns",
                "Save up to 20 calculations to local browser history",
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
              title: "Pre-Campaign KPI Setting",
              scenario: "A social media manager is planning a product launch campaign for a client with 85,000 Instagram followers. Before setting campaign KPIs, they run the calculator with a Reel content type, 5.5% engagement rate, and Good audience quality. The result — 46,580 estimated reach and 2,562 engagements — becomes the baseline KPI in the campaign brief, giving the client a realistic expectation before the first post goes live.",
            },
            {
              title: "Influencer Campaign Evaluation",
              scenario: "An agency is comparing three influencer proposals. They run each influencer's follower count and engagement rate through the calculator across their respective primary platforms. Influencer A (180K TikTok, 9% ER) estimates 97,200 reach. Influencer B (95K Instagram, 6.2% ER) estimates 31,730 reach. Despite the smaller follower base, Influencer B is rejected on a cost-per-reach basis — Influencer A delivers 3× the estimated reach for a comparable fee.",
            },
            {
              title: "Paid vs Organic Budget Decision",
              scenario: "A startup founder is deciding whether to boost a LinkedIn post promoting a product launch. They enter 12,000 followers, 6% engagement rate, Good quality, and toggle on paid promotion at 3×. The organic reach estimate of 3,600 doubles to 10,800 with the boost. At a CPM of $18, the paid reach requires approximately $200 — a figure they compare against their customer acquisition cost to decide if the boost is justified.",
            },
            {
              title: "Platform Comparison for New Account Launch",
              scenario: "A B2B software company is deciding which platform to prioritise for a new content marketing program. They use the platform benchmark table to compare reach rates: TikTok (60%) vs LinkedIn (30%) vs Facebook (8%). For their 500-follower starting audience, TikTok's algorithmic distribution offers 300 estimated organic reach vs Facebook's 40. They decide to build on LinkedIn — where their audience already exists — and TikTok — where algorithmic reach can offset the small follower count.",
            },
            {
              title: "Monthly Content Calendar Performance Forecast",
              scenario: "A content creator plans a monthly calendar of 8 Instagram posts: 4 Reels, 2 carousels, and 2 static images. They run each content type through the calculator and document estimated reach for each. The 4 Reels account for 68% of total estimated monthly impressions despite being only half the post count. This data shapes their production priorities — more Reels, fewer static images — based on estimated performance impact.",
            },
            {
              title: "Reporting Engagement Benchmarks to Clients",
              scenario: "A marketing agency delivers a monthly report showing that a client's Pinterest account (45,000 followers) is underperforming against the calculator's benchmark. The client's actual reach is 5,200 per post; the calculator estimates 11,250 for an account of that size with Good audience quality. The gap reveals an audience quality problem — a high proportion of inactive followers — which the agency uses to justify a follower audit and account cleanup.",
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
                "Use 'Good' audience quality as your starting point and adjust based on your account's historical engagement-to-follower ratio. If your engagement rate consistently exceeds the platform average, set audience quality to Excellent — your real audience is more active than the benchmark.",
                "Reels and short-form video earn the highest content multipliers because platforms actively promote them to non-followers. If your goal is reach growth rather than engagement with existing followers, prioritise video formats and use the calculator to quantify the reach difference.",
                "The estimated audience growth figure uses your posting frequency setting — increase it to Daily to see how consistent posting compounds the monthly follower growth estimate. Frequency matters most for accounts under 10,000 followers where the algorithm weighs posting cadence more heavily.",
                "When planning paid amplification, use the organic estimate as your baseline and the paid estimate as the ceiling. Real paid performance depends on audience targeting quality, creative resonance, and bid competition — the calculator's multiplier is a conservative planning estimate.",
                "Compare your actual platform analytics against the calculator's estimates each month. If your real reach is consistently below the estimate, set audience quality to Poor or Average and investigate follower quality. If consistently above, your content is outperforming average and you should set quality to Excellent for future planning.",
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
                "Don't use total followers as your expected reach without applying an audience quality adjustment. Accounts that purchased followers or grew through giveaways often have 30–50% inactive followers — entering the inflated follower count at Excellent quality will significantly overstate your realistic reach.",
                "Don't confuse reach with impressions when reporting to clients or stakeholders. Reach is unique users; impressions count all views including repeat views by the same person. Presenting impressions as reach inflates the perceived audience size and can erode trust when clients check against platform data.",
                "Don't set your engagement rate to the platform maximum when planning. Campaigns rarely sustain peak engagement across all posts. A realistic planning rate is 80–90% of your historical average, not your best-performing post's rate.",
                "Don't treat estimated audience growth as a guarantee. The monthly growth figure reflects a statistical tendency — not a prediction. Viral content, algorithmic changes, seasonal trends, and competitor activity all affect real follower growth independently of the baseline assumptions.",
                "Don't plan paid amplification based solely on reach multiplier. A 3× paid multiplier means paid distribution reaches 3× more people, but those additional people are cold-audience users with significantly lower engagement rates than your organic followers.",
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
          Platform Reach &amp; Engagement Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Reach Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Engagement</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Strongest Content</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth Potential</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Instagram",   "32%",  "5.0%", "Reels, Carousel", "Moderate (1.5%/mo)"],
                ["Facebook",    "8%",   "3.0%", "Video, Live",     "Low (0.8%/mo)"],
                ["TikTok",      "60%",  "9.0%", "Short, Video",    "High (5%/mo)"],
                ["LinkedIn",    "30%",  "6.0%", "Carousel, Video", "Moderate (1%/mo)"],
                ["YouTube",     "20%",  "4.0%", "Video, Live",     "Moderate (2%/mo)"],
                ["X (Twitter)", "15%",  "2.5%", "Video, Image",    "Moderate (1.2%/mo)"],
                ["Pinterest",   "25%",  "2.0%", "Image, Carousel", "Moderate-High (2.5%/mo)"],
                ["Threads",     "22%",  "4.5%", "Image, Video",    "High (3%/mo)"],
                ["Snapchat",    "40%",  "5.5%", "Story, Short",    "Moderate (1.8%/mo)"],
              ].map(([platform, reach, er, content, growth]) => (
                <tr key={platform} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{platform}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{reach}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{er}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{content}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Platform averages based on industry research. Actual performance varies by niche, account history, content quality, and current algorithm behaviour.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is social media reach and how is it measured?",
              a: "Social media reach is the number of unique users who saw a piece of content at least once during a given period. It is a measure of audience size — different from impressions, which count total views including repeats by the same user. Platforms calculate reach differently: Instagram measures unique accounts reached, TikTok includes both followers and non-followers who see content on the For You Page, and LinkedIn counts unique members who saw the post in their feed or via direct share.",
            },
            {
              q: "Why is organic reach much lower than my follower count?",
              a: "Social platforms use algorithmic feeds that show content to a fraction of followers based on relevance signals, engagement history, recency, and competitive inventory in each user's feed. Facebook shows organic content to approximately 8% of followers due to its pay-to-play advertising model. Instagram typically reaches 20–40% for well-optimised Reels and 10–15% for static image posts. TikTok is an outlier — its For You Page algorithm can push content to users with no follower relationship, making reach potentially exceed your follower count.",
            },
            {
              q: "What is a good engagement rate for social media?",
              a: "Engagement rate benchmarks vary significantly by platform and follower count. For Instagram, 3–6% is considered good for accounts with 10K–100K followers; accounts above 1M typically see 1–3%. TikTok averages 9–15% due to video-native interactions. LinkedIn averages 2–6% for company pages and higher for personal profiles. Facebook typically achieves 1–5% on organic posts. As a general rule, smaller accounts (under 10K followers) tend to have higher engagement rates because their audiences are more tightly connected.",
            },
            {
              q: "What is the difference between reach and impressions?",
              a: "Reach counts unique people — each user counted once regardless of how many times they saw the content. Impressions count total views, including every time the same user sees the content. If 5,000 unique users each see a post twice, reach is 5,000 and impressions are 10,000. The ratio of impressions to reach (the frequency) tells you how often the average user is seeing your content. Most platforms target a frequency of 1.2–1.5× for organic content.",
            },
            {
              q: "How accurate are the calculator's estimates?",
              a: "The calculator provides planning estimates based on documented platform averages — they are not a substitute for actual platform analytics. Real reach depends on content quality, posting time, hashtag strategy, account history, current algorithm behaviour, competitor activity in your audience's feeds, and hundreds of other micro-signals that no external calculator can replicate. Use these estimates for goal-setting, budget planning, and comparative scenario analysis — always validate against your actual platform data after publishing.",
            },
            {
              q: "What does audience quality mean in this calculator?",
              a: "Audience quality reflects the proportion of your followers who are genuine, active users likely to engage with and share your content. 'Excellent' quality means most of your followers are real, engaged people who followed you because of genuine interest in your content. 'Poor' quality means a significant portion are inactive, bot, or irrelevant accounts — common on profiles that purchased followers or ran viral giveaways. The quality setting applies a multiplier (0.6× to 1.2×) to the reach estimate to reflect how much of your follower base will realistically be served your content.",
            },
            {
              q: "Does paid promotion significantly increase reach?",
              a: "Yes, substantially. Paid social media promotion bypasses algorithmic distribution limitations by placing your content in front of audiences who do not follow you. A 2× paid multiplier means the content reaches twice as many people as the organic estimate — the additional users are targeted based on demographic and interest data rather than existing follower relationships. The trade-off is that cold-audience users from paid distribution typically engage at 30–60% of the rate of organic followers, so engagement rate on paid-boosted posts is usually lower than pure organic performance.",
            },
            {
              q: "How do I improve my organic reach?",
              a: "The most effective organic reach improvements in order are: (1) Shift content formats toward video and Reels — platforms algorithmically favour video-native formats with higher distribution. (2) Post consistently at times when your audience is most active — most platforms show a 15–25% reach boost for posts at peak times. (3) Optimise for saves and shares rather than likes — these signals carry more weight in algorithmic distribution decisions than passive like counts. (4) Use relevant hashtags and location tags — these extend discovery to users not currently following you. (5) Encourage early engagement — posts that receive high interaction within the first 30–60 minutes are distributed more broadly by most algorithms.",
            },
            {
              q: "What is the content type multiplier?",
              a: "The content type multiplier adjusts the base reach estimate based on how platforms algorithmically favour different formats. Live video earns the highest multiplier (1.6×) because platforms prioritise real-time content for immediate distribution. Reels and Shorts earn 1.45–1.5× because short-form video is the dominant algorithmic growth format across Instagram, TikTok, and YouTube. Stories earn the lowest multiplier (0.75×) because they appear in a separate, sequential format with less algorithmic amplification than main feed posts.",
            },
            {
              q: "Does this tool store my data?",
              a: "No. All calculations run entirely in your browser using JavaScript. No follower counts, engagement rates, or campaign data you enter are transmitted to any server. The history feature stores results only in your browser's localStorage, accessible only on your device and cleared when you clear your browser data. This makes the tool completely safe for planning confidential client campaigns.",
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
            { icon: "📱", title: "Social Media Managers",  desc: "Set pre-campaign KPIs, forecast post performance, compare organic vs paid scenarios, and produce reach estimates for client briefs without needing to export ad platform data." },
            { icon: "✍️", title: "Content Creators",      desc: "Estimate the reach value of sponsored posts before setting rates, compare performance expectations across platforms, and plan content calendars around high-multiplier formats like Reels." },
            { icon: "🏢", title: "Marketing Agencies",    desc: "Build platform comparison analyses for clients deciding where to invest, produce reach benchmarks for influencer evaluations, and export structured estimates for media plans and presentations." },
            { icon: "🚀", title: "Startup Founders",      desc: "Understand which platform delivers the best organic reach for a limited content budget, model the cost-benefit of paid amplification, and set realistic growth expectations for early-stage social media programs." },
            { icon: "🌐", title: "Small Businesses",      desc: "Plan social media campaigns with realistic performance expectations, evaluate whether paid promotion is worth the budget for a given post, and understand how follower count and content quality affect reach." },
            { icon: "🎓", title: "Marketing Students",    desc: "Learn how platform algorithms affect reach differently, explore the relationship between engagement rate and reach, and build intuition for realistic social media KPIs before entering the industry." },
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
