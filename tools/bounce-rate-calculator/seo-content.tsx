import React from "react";

export default function BounceRateCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Bounce Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>bounce rate calculator</strong> is a free online tool that applies the{" "}
            <strong>bounce rate formula</strong> — single-page sessions divided by total sessions,
            multiplied by 100 — to instantly compute the percentage of visitors who left your site
            without viewing a second page. It answers the core web analytics question:{" "}
            <em>how many visitors are engaging with my site versus leaving immediately?</em>
          </p>
          <p>
            Bounce rate is one of the most widely tracked engagement metrics in Google Analytics,
            GA4, and every major web analytics platform. It is a leading indicator of content
            relevance, page load performance, and traffic quality. A landing page bounce rate of
            80% means 8 out of every 10 visitors left before exploring anything else — which is
            either a serious problem or perfectly normal, depending entirely on what that page
            is supposed to do.
          </p>
          <p>
            This tool is built for <strong>SEO professionals auditing page performance in Google
            Analytics, ecommerce owners diagnosing product page drop-offs, content marketers
            measuring article engagement, PPC advertisers checking landing page quality, digital
            agencies reporting client website KPIs, and web analysts benchmarking site health</strong>.
            Real-time calculation, benchmark context, export, and shareable URL. Browser-based,
            free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. Formula ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Bounce Rate Formula Explained
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The bounce rate formula is the same whether you are calculating it manually from
            exported data or reading it directly from Google Analytics or GA4.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Bounce Rate Formula</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Bounce Rate</span> = (Single-Page Sessions ÷ Total Sessions) × 100</p>
              <p className="text-gray-500 text-xs ml-4">Example: 1,500 bounces ÷ 5,000 sessions × 100 = 30.00%</p>
              <p className="mt-3"><span className="font-semibold">Bounces from Rate</span> = Total Sessions × (Bounce Rate ÷ 100)</p>
              <p className="text-gray-500 text-xs ml-4">Example: 5,000 × 0.30 = 1,500 single-page sessions</p>
              <p className="mt-3"><span className="font-semibold">Engagement Rate (GA4)</span> = 1 − Bounce Rate</p>
              <p className="text-gray-500 text-xs ml-4">Example: 1 − 0.30 = 0.70 → 70% engagement rate</p>
            </div>
          </div>

          <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Bounce Rate Formula in Google Analytics vs GA4</h3>
          <p>
            In Universal Analytics (UA), a bounce was any session with exactly one pageview and
            no other hits (events, transactions, etc.). In{" "}
            <strong>Google Analytics 4 (GA4)</strong>, the definition changed: a bounce is a
            session that was <em>not</em> an engaged session. GA4 defines an engaged session as
            one that lasts longer than 10 seconds, has a conversion event, or has 2 or more
            pageviews. This means GA4 bounce rate = 1 − engagement rate, and GA4 bounce rates
            are typically higher than UA bounce rates for the same site because the bar for
            "engagement" is stricter.
          </p>
          <ul className="space-y-1 text-gray-600 mt-2">
            <li>• <strong>UA bounce</strong> — one pageview, no additional hits in the session</li>
            <li>• <strong>GA4 bounce</strong> — session shorter than 10 sec with no conversion event and only 1 pageview</li>
            <li>• <strong>GA4 engagement rate</strong> — directly shown in GA4 reports; bounce rate = 100% − engagement rate</li>
            <li>• The formula this calculator uses matches both — single-page exits ÷ total sessions × 100</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bounce Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Enter Single-Page Sessions (Bounces)", "Type the number of sessions where the visitor viewed only one page and left without any further interaction. In Google Analytics, export the Bounce metric for the page or date range you want to analyze. In GA4, this is sessions minus engaged sessions."],
              ["Enter Total Sessions", "Type the total number of sessions for the same page and time period. Match the date range exactly to your bounce count — mismatched periods produce meaningless results. Pull both numbers from the same Analytics report row."],
              ["Read the Bounce Rate and Performance Badge", "Bounce rate calculates instantly. A badge (Excellent / Good / Average / High) contextualizes the result. The badge uses general web benchmarks — refer to the benchmark table below for website-type-specific targets, since a 75% rate is fine for a blog but concerning for a product page."],
              ["Compare Pages or Periods", "Use the history panel to compare bounce rates for different pages, traffic sources, or time periods side by side without re-entering values. This is useful for A/B test analysis or month-over-month reporting."],
              ["Export or Share", "Copy the result to clipboard or download as TXT/CSV for reports. The shareable URL encodes your inputs — send it to a colleague to share the exact calculation."],
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
                "Real-time bounce rate calculation as you type",
                "Performance badge (Excellent / Good / Average / High)",
                "Contextual plain-language interpretation",
                "Industry preset buttons for quick examples",
                "Calculation history saved locally",
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
              title: "SEO Audit — Identifying Underperforming Pages",
              scenario: "An SEO specialist exports landing page data from Google Analytics: Page A has 3,200 bounces from 4,000 sessions = 80% bounce rate. Page B has 900 bounces from 4,000 sessions = 22.5%. Both pages target the same keyword but different content formats. The 57-point gap reveals Page A has a content-to-intent mismatch — users arriving from organic search aren't finding what they expected. The SEO rewrites Page A's intro and above-the-fold content to better match search intent.",
            },
            {
              title: "PPC Landing Page Quality Diagnosis",
              scenario: "A PPC manager notices a Google Ads campaign has a Quality Score of 4/10 with high CPC. They pull landing page data: 2,800 bounces from 3,500 click sessions = 80% bounce rate. Google's Expected Landing Page Experience is Poor. The ad promises a free trial but the landing page leads with a pricing table. Fixing the landing page to match the ad copy drops bounce rate to 45% within two weeks, Quality Score rises to 7, and average CPC drops 28%.",
            },
            {
              title: "Ecommerce Product Page Optimization",
              scenario: "An ecommerce owner reviews product page performance: top product page has 1,800 bounces from 3,000 sessions = 60% bounce rate, which is high for a product page (20–45% is typical). They break down by traffic source: organic search bounces at 38%, while paid social bounces at 74%. The paid social audience is poorly targeted and arriving with the wrong intent. They pause the social ad set and reallocate budget to better-performing channels.",
            },
            {
              title: "Blog Content Engagement Audit",
              scenario: "A content marketer reviews 12 blog posts in Google Analytics. Average bounce rate across posts is 78%, which is normal for a blog. However, one post — a 2,400-word tutorial — bounces at 42%, significantly below average. They investigate: the tutorial has 8 internal links, an email opt-in form, and a video embed. They apply the same internal linking strategy and opt-in placement to 5 similar posts, reducing their average bounce rate from 81% to 64% within 6 weeks.",
            },
            {
              title: "Agency Monthly Client Report",
              scenario: "A digital agency tracks bounce rate as a key KPI for a B2B SaaS client. Month 1: 3,600 bounces ÷ 6,000 sessions = 60%. After homepage redesign: Month 2: 2,400 bounces ÷ 6,200 sessions = 38.7%. The agency uses the calculator to quickly produce both figures, copies the full breakdown to clipboard, and pastes directly into the client report. The 21-point improvement becomes the headline metric in the monthly review.",
            },
            {
              title: "GA4 Migration — Benchmark Reset",
              scenario: "A web analyst migrates from Universal Analytics to GA4 and notices bounce rate jumped from 42% in UA to 68% in GA4 for the same period. They use the bounce rate formula to manually verify: GA4 shows 3,400 non-engaged sessions out of 5,000 total = 68%. They document that GA4's stricter engagement definition (10-second threshold) accounts for the apparent increase — the site behavior hasn't changed. They establish new GA4 baselines and set targets based on GA4 metrics going forward.",
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
                ["Segment bounce rate by traffic source before acting", "A 70% overall bounce rate hiding a 30% organic bounce rate and an 85% paid social bounce rate tells you the problem is audience targeting on paid channels, not your content. Always filter by source/medium before making optimization decisions based on bounce rate."],
                ["High bounce rate on a landing page is not always bad", "A landing page with one CTA — book a call, download a guide, sign up — is designed for a single action. If users arrive, complete the action, and leave, that is a bounce in Analytics but a conversion in your funnel. Always pair bounce rate with conversion rate before judging a page."],
                ["Use scroll depth and session recording alongside bounce rate", "Bounce rate tells you users left after one page but not how much of that page they consumed. A user who reads 90% of a 3,000-word article and leaves is a very different signal from one who bounces in 2 seconds. Hotjar or Microsoft Clarity scroll maps reveal the difference."],
                ["In GA4, track engagement rate as the primary metric", "GA4's native metric is engagement rate, not bounce rate. Engagement rate = 1 − bounce rate. GA4 surfaces engagement rate prominently in its reports. When calculating bounce rate from GA4 data, use: (total sessions − engaged sessions) ÷ total sessions × 100."],
                ["Compare equivalent traffic segments, not raw totals", "Branded search sessions almost always have lower bounce rates than cold display traffic. Comparing a page's bounce rate before and after a traffic source change is not an apples-to-apples comparison — the audience changed, not just the page."],
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
                ["Treating high bounce rate as universally bad", "Blog posts, news articles, and reference pages are designed to serve one piece of information. Bounce rates of 70–90% are completely normal for these page types. Panicking over a high bounce rate without considering page intent leads to unnecessary and counterproductive redesigns."],
                ["Comparing UA bounce rate to GA4 bounce rate directly", "GA4 changed the bounce rate definition. A site with 40% UA bounce rate will typically show 60–70% GA4 bounce rate for the same traffic. Never compare pre- and post-GA4 migration bounce rates as if they measure the same thing — establish a new GA4 baseline from scratch."],
                ["Using site-wide bounce rate to judge individual pages", "A site with a 65% average bounce rate may have individual pages ranging from 20% to 95%. The average obscures everything actionable. Always analyze bounce rate at the page level, filtered by traffic source, to identify which specific pages need improvement."],
                ["Ignoring page load speed as the first fix", "Before rewriting content or redesigning a high-bounce page, check load speed with Google PageSpeed Insights. A page that takes 5+ seconds to load will bounce 90%+ of mobile visitors regardless of content quality. Speed is the highest-leverage bounce rate fix and takes the least content effort."],
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

      {/* ── 6. Benchmark Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Bounce Rate Benchmarks by Website Type & Traffic Source
        </h2>

        <h3 className="text-base font-semibold text-gray-700 mb-3">By Website Type</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Website Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Concern Threshold</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Ecommerce / Retail",     "20–45%",  ">55%",  "Product pages with clear navigation retain visitors. Category pages should be lower than product pages."],
                ["B2B / Lead Generation",  "25–55%",  ">65%",  "Longer consideration cycles mean visitors may leave and return. Nurture-focused pages can tolerate higher rates."],
                ["SaaS / Software",        "30–60%",  ">70%",  "Pricing and feature pages should be low. Blog and changelog pages can run higher."],
                ["Blogs / Content Sites",  "65–90%",  ">92%",  "Single-article reads are normal user behavior. Focus on internal linking to reduce rather than eliminate bounces."],
                ["News / Media Sites",     "40–65%",  ">75%",  "Subscription prompts and related article widgets reduce bounce rate. Homepage should be lower than article pages."],
                ["Landing Pages (CRO)",    "60–90%",  "N/A",   "Bounce rate is not the right metric for single-CTA pages. Measure conversion rate instead."],
                ["Web Apps / Dashboards",  "10–30%",  ">40%",  "Logged-in users navigate multiple pages per session by design. High bounce indicates login friction or error pages."],
                ["Portfolio / Personal",   "30–55%",  ">70%",  "Visitors typically arrive at a specific project and may leave after viewing it — some bounce is expected."],
              ].map(([type, range, concern, notes]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-3 px-4 font-mono text-red-500">{concern}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-3">By Traffic Source (Universal Averages)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Traffic Source</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Bounce Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Direct",          "~35%",  "High-intent brand-aware visitors — they know what they're looking for"],
                ["Email",           "~40%",  "Engaged subscribers clicking from newsletters — warm, targeted audience"],
                ["Organic Search",  "~45%",  "Intent-driven but varied — depends on keyword match quality"],
                ["Paid Search",     "~45%",  "Intent-driven like organic but landing page match quality varies more"],
                ["Referral",        "~50%",  "Varies widely by referring site quality and context of the link"],
                ["Social",          "~55%",  "Interruption-based discovery — users weren't actively searching"],
                ["Display Ads",     "~60%",  "Lowest intent — audience was not searching, low initial relevance"],
              ].map(([source, rate, why]) => (
                <tr key={source} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{source}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold">{rate}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Benchmarks are approximate industry averages. Actual bounce rates vary significantly by site type, content quality, audience, device mix, and analytics platform (UA vs GA4).</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the bounce rate formula?",
              a: "The bounce rate formula is: Bounce Rate = (Single-Page Sessions ÷ Total Sessions) × 100. A single-page session (bounce) is a session in which the user viewed only one page and took no other actions before leaving. For example, if 1,500 out of 5,000 sessions were single-page visits, the bounce rate is (1,500 ÷ 5,000) × 100 = 30%.",
            },
            {
              q: "What is the bounce rate formula in Google Analytics?",
              a: "In Universal Analytics (UA), the bounce rate formula is the same as the standard formula: single-page sessions divided by total sessions, multiplied by 100. In Google Analytics 4 (GA4), bounce rate equals 100 minus the engagement rate. GA4 defines an engaged session as one lasting more than 10 seconds, having a conversion event, or having 2 or more pageviews. So GA4 bounce rate = (non-engaged sessions ÷ total sessions) × 100. This typically produces higher bounce rates than UA for the same site.",
            },
            {
              q: "What is a good bounce rate?",
              a: "A good bounce rate depends heavily on the website type and traffic source. As a general guide: 10–30% is excellent, 31–50% is good, 51–70% is average and acceptable for many site types, and above 70% warrants investigation — unless the site is a blog, news site, or single-CTA landing page, where higher bounce rates are expected and normal.",
            },
            {
              q: "What is bounce rate and why does it matter?",
              a: "Bounce rate measures the percentage of visitors who view only one page before leaving your site. It matters because it is a signal of content-audience fit, page load performance, and traffic quality. A high bounce rate on a key conversion page usually indicates a mismatch between what visitors expected to find and what the page delivers. On informational content pages, bounce rate is less meaningful as a standalone metric.",
            },
            {
              q: "What is the difference between bounce rate and exit rate?",
              a: "Bounce rate is the percentage of sessions that consisted of exactly one page. Exit rate is the percentage of sessions that ended on a specific page, regardless of how many pages were viewed before it. A page can have a high exit rate because it is the natural last step in a user journey — like a confirmation or thank-you page — without that indicating any problem. Bounce rate only applies to sessions where the first page was also the last.",
            },
            {
              q: "How is bounce rate different in GA4 vs Universal Analytics?",
              a: "Universal Analytics defined a bounce as any session with exactly one pageview and no additional tracked interactions. GA4 redefined bounce as the inverse of engagement — a session that did NOT meet the criteria for an engaged session (10+ seconds, conversion event, or 2+ pageviews). As a result, GA4 typically reports higher bounce rates than UA for the same site, because the engagement threshold is stricter. Never directly compare UA bounce rate percentages to GA4 bounce rates.",
            },
            {
              q: "Does bounce rate affect SEO?",
              a: "Bounce rate is not a confirmed direct Google ranking factor. However, it correlates with user experience signals that do influence rankings — dwell time, pogo-sticking (returning to Google immediately after clicking a result), and overall content satisfaction. A persistently high bounce rate on a page targeting competitive keywords can indirectly signal to Google that the page is not satisfying searcher intent, which may suppress rankings over time.",
            },
            {
              q: "How do I reduce bounce rate?",
              a: "The most impactful improvements are: (1) improve page load speed — a 1-second improvement can reduce mobile bounce rate by 8–10%; (2) match landing page content to the ad or search query that brought the visitor — expectation mismatch is the leading cause of immediate bounces; (3) add clear internal links and related content to encourage exploration; (4) improve above-the-fold content to establish relevance within the first 3 seconds; (5) fix mobile UX issues — mobile users bounce significantly more on poorly optimized pages.",
            },
            {
              q: "How do I calculate bounce rate from Google Analytics data?",
              a: "In Universal Analytics: go to Behavior > Site Content > All Pages, find the Bounce Rate column for your page. To manually calculate: (Bounces metric ÷ Sessions metric) × 100. In GA4: go to Reports > Engagement > Pages and Screens. You will see Engagement Rate — bounce rate is 100 minus that percentage. Or export the data and enter the numbers into this calculator to get a formatted result with performance context.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your session counts, bounce figures, and any other values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🔍", title: "SEO Professionals", desc: "Pull bounce rate data from Google Analytics and Search Console to identify underperforming pages, diagnose content-intent mismatches, and prioritize technical and content improvements." },
            { icon: "🛍️", title: "Ecommerce Owners", desc: "Track product and category page bounce rates by traffic source to diagnose where shoppers drop off before reaching cart, and identify which paid channels are sending low-quality traffic." },
            { icon: "📢", title: "PPC Advertisers", desc: "Use landing page bounce rate as a proxy for Google Ads landing page quality score, diagnose ad-to-page message mismatch, and justify landing page redesign investments to clients." },
            { icon: "📝", title: "Content Marketers", desc: "Measure article engagement, identify which content formats retain readers longest, and use bounce rate trends to guide internal linking and content upgrade strategies." },
            { icon: "🏢", title: "Digital Agencies", desc: "Calculate and benchmark bounce rate for client websites during SEO audits, monthly reporting, and before/after site redesign comparisons to quantify performance improvements." },
            { icon: "🎓", title: "Web Analytics Students", desc: "Practice applying the bounce rate formula to real data exports, understand the difference between UA and GA4 definitions, and learn how bounce rate fits into the broader web analytics framework." },
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
