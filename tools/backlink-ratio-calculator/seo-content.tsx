export default function BacklinkRatioCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Backlink Ratio Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>backlink ratio calculator</strong> is a free SEO analysis tool that measures the proportional distribution of different backlink types pointing to a website. Instead of looking at raw backlink counts — which tell you very little on their own — ratio analysis reveals whether your link profile looks <em>natural</em> or <em>over-optimised</em> to search engines like Google.
          </p>
          <p>
            When Google evaluates a website's authority and trustworthiness, it does not simply count the number of backlinks. It examines the <em>mix</em>: How many links pass PageRank versus how many are nofollow? Do links point to many different pages, or almost exclusively to the homepage? Are anchor texts diverse, or do too many use the exact target keyword? Unhealthy ratios — even from otherwise high-quality links — are a primary trigger for Google's Penguin algorithm and manual link spam penalties.
          </p>
          <p>
            This tool is built for <strong>SEO professionals, digital marketers, website owners, link-building specialists, and SEO students</strong> who need to audit a backlink profile quickly and accurately. Enter your backlink data from Ahrefs, SEMrush, Moz, Majestic, or Google Search Console, and the calculator instantly computes every key ratio with a health score and personalised recommendations — all processed locally in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Backlink Ratio Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every ratio in this calculator uses the same core formula: divide the count of a specific backlink type by the relevant total, then multiply by 100 to express the result as a percentage.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Core Formula</p>
            <p className="font-mono text-lg text-gray-900 font-semibold">Ratio (%) = (Category Count ÷ Total Count) × 100</p>
          </div>
          <p>
            The calculator applies this formula across eleven distinct metrics, each with its own denominator and health threshold:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Follow Ratio", "Follow links ÷ Total backlinks", "60–80% healthy"],
              ["Nofollow Ratio", "Nofollow links ÷ Total backlinks", "20–40% healthy"],
              ["Homepage Ratio", "Homepage links ÷ Total backlinks", "Under 40% healthy"],
              ["Deep Page Ratio", "Inner page links ÷ Total backlinks", "60%+ healthy"],
              ["Anchor Text Ratios", "Each anchor type ÷ Total anchor count", "Brand 30–60%, Exact-match under 20%"],
              ["Domain Diversity", "Referring domains ÷ Total backlinks", "50%+ healthy"],
            ].map(([metric, formula, target]) => (
              <li key={metric} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{metric}:</strong> {formula} — <em>{target}</em></span>
              </li>
            ))}
          </ul>
          <p>
            The overall <strong>health score (0–100)</strong> is calculated by scoring each relevant metric (healthy = 10 pts, warning = 5 pts, danger = 0 pts) and expressing the total as a percentage of the maximum possible score. Metrics with no data entered are excluded from the score.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Backlink Ratio Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Pull Your Backlink Data", "Open Ahrefs Site Explorer, SEMrush Backlink Analytics, Moz Link Explorer, or Google Search Console for the domain you want to audit. Note the total backlink count, the follow/nofollow split, and the anchor text breakdown from the anchors report."],
                ["Enter Total Backlinks", "Type the total backlink count into the first field. This is the denominator for all follow, nofollow, homepage, inner-page, and domain diversity ratios."],
                ["Add Follow & Nofollow Counts", "Enter how many of your links are follow (dofollow) and how many are nofollow. The calculator immediately flags if the ratio falls outside the 60–80% follow / 20–40% nofollow healthy range."],
                ["Enter Homepage vs Inner Page Split", "Type how many links point to your homepage and how many point to inner pages like blog posts, product pages, or tools. A healthy site has the majority of links pointing to inner content."],
                ["Add Anchor Text Distribution", "Enter counts for brand anchors (your site or company name), exact-match anchors (the target keyword), partial-match anchors, and generic anchors ('click here', URLs). These are measured against the anchor total, not the backlink total."],
                ["Add Referring Domains & Review", "Enter your referring domain count to calculate domain diversity. Review the health score, ratio cards, and recommendations that update instantly. Use the Export CSV or Export TXT buttons to save the report."],
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
                "Real-time ratio calculations with 150ms debounce",
                "Follow vs nofollow ratio with healthy range badge",
                "Homepage vs deep-page link distribution analysis",
                "Anchor text diversity and over-optimisation detection",
                "Domain diversity score (referring domains ÷ backlinks)",
                "Overall backlink health score 0–100",
                "Colour-coded status: healthy, warning, danger",
                "Personalised SEO recommendations per metric",
                "Batch text input — paste directly from audit tools",
                "Export report as CSV or TXT with timestamp",
                "Copy full report to clipboard in one click",
                "Save up to 20 analyses to local browser history",
                "Load sample data to explore the calculator instantly",
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
              title: "Monthly SEO Health Check",
              scenario: "An SEO manager pulls their client's backlink data from Ahrefs at the start of each month. They paste the key numbers into the batch input field and instantly see whether the follow ratio has crept above 85% following a recent link-building campaign. The recommendation panel flags the issue before it becomes a penalty risk.",
            },
            {
              title: "Post-Penalty Recovery Audit",
              scenario: "A website owner receives a manual action notification in Google Search Console for unnatural links. They use the calculator to quantify the damage — discovering that 62% of anchors are exact-match keywords. The report is exported as a CSV and shared with a link-removal specialist to prioritise the disavow list.",
            },
            {
              title: "Competitor Benchmarking",
              scenario: "A link-building specialist exports backlink data for three competing domains from SEMrush and runs each through the calculator. By comparing health scores side by side, they identify that competitors with higher rankings have a domain diversity score above 55% — a clear target for their own outreach strategy.",
            },
            {
              title: "Guest Post Campaign Review",
              scenario: "A content marketer has published 40 guest posts over six months, all with brand-name anchor text. They check their anchor text ratio and find brand anchors have risen to 72% — above the 60% upper guideline. The recommendation advises diversifying future anchors with partial-match phrases to maintain a natural distribution.",
            },
            {
              title: "New Site Link Profile Planning",
              scenario: "A startup founder is beginning their first link-building effort and uses the sample data to understand what a healthy 1,200-backlink profile looks like before they start. They set internal targets: keep exact-match anchors below 15%, build links to at least 5 inner pages for every homepage link, and aim for 600+ unique referring domains.",
            },
            {
              title: "Client Reporting",
              scenario: "A digital marketing agency uses the calculator to generate monthly backlink health reports for 12 clients. The structured text export is copy-pasted into their reporting template, giving clients clear health scores and trend comparisons across months without needing an expensive enterprise SEO platform.",
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
                "Use referring domains, not just raw backlinks, as your primary authority metric — 500 links from 500 unique domains is far more powerful than 500 links from 5 domains.",
                "When auditing anchor text, always use the anchor count as the denominator, not the total backlink count. One page can have multiple anchor texts pointing to it.",
                "Run the calculator before and after any link-building campaign to measure the ratio shift — not just the count increase.",
                "If your follow ratio is above 90%, your next 50 links should all be nofollow (directory submissions, social profiles, forum comments) to rebalance organically.",
                "Deep-page links are more valuable per link than homepage links for topical authority. A blog post with 10 deep links to your tools pages outperforms 10 more homepage links.",
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
                "Don't panic if your follow ratio is temporarily high after a new campaign — Google looks at trends over months, not single-point snapshots.",
                "Don't use the Disavow Tool on every nofollow link or low-DA link. Disavowing safe links can reduce your link count without fixing the real problem.",
                "Don't ignore the domain diversity score. Many SEO audits focus only on follow/nofollow and anchor text, missing that 80% of links coming from 3 domains is a serious red flag.",
                "Don't assume a health score of 100 means your profile is perfect — it means the ratios you've entered are all within healthy ranges. Absolute link quality still matters.",
                "Don't enter only the metrics you know look good. An honest audit requires entering all available data, including metrics that show problems.",
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

      {/* ── Formula reference table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Backlink Ratio Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Healthy Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk if Outside</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Follow Ratio",         "Follow ÷ Total Backlinks",        "60–80%",  "Penguin flag if >90%"],
                ["Nofollow Ratio",       "Nofollow ÷ Total Backlinks",      "20–40%",  "Looks artificial if <10%"],
                ["Homepage Ratio",       "Homepage Links ÷ Total Backlinks","< 40%",   "Manipulation signal if >60%"],
                ["Deep Page Ratio",      "Inner Links ÷ Total Backlinks",   "60%+",    "Low topical authority"],
                ["Brand Anchor",         "Brand ÷ Anchor Total",            "30–60%",  "Under-branded if <20%"],
                ["Exact-Match Anchor",   "Exact ÷ Anchor Total",            "< 20%",   "Penguin risk if >35%"],
                ["Partial-Match Anchor", "Partial ÷ Anchor Total",          "15–30%",  "Low diversity if absent"],
                ["Generic Anchor",       "Generic ÷ Anchor Total",          "10–30%",  "Unnatural if <5%"],
                ["Domain Diversity",     "Ref. Domains ÷ Total Backlinks",  "50%+",    "Authority dilution if <30%"],
              ].map(([metric, formula, range, risk]) => (
                <tr key={metric} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{metric}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-gray-600">{formula}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{range}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Ranges are SEO community guidelines based on algorithmic patterns. Context, niche, and domain age always affect what is considered healthy for a specific site.</p>
      </section>

      {/* ── Anchor Text Guidelines ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Anchor Text Distribution Guidelines
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Anchor Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Healthy Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Brand",         "30–60%", "\"Productive Toolbox\"",        "Very Low — most natural signal"],
                ["Exact-Match",   "< 20%",  "\"free backlink calculator\"",   "High above threshold — Penguin risk"],
                ["Partial-Match", "15–30%", "\"backlink analysis tool\"",     "Low — safe SEO value"],
                ["Generic",       "10–30%", "\"click here\", \"visit\", URL", "Very Low — adds natural diversity"],
                ["Image",         "varies", "Alt text acts as anchor",        "Neutral — depends on alt text quality"],
              ].map(([type, range, example, risk]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{example}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Ranges are guidelines. Highly authoritative sites in competitive niches may safely hold different distributions.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a backlink ratio?",
              a: "A backlink ratio measures the proportion of a specific backlink type against the total. Common ratios include follow vs nofollow links, homepage vs inner-page links, and each anchor text type as a percentage of all anchors. These ratios tell you whether your link profile looks natural or over-optimised to search engines — a profile with unusual ratios can trigger algorithmic penalties even when the individual links are from legitimate sites.",
            },
            {
              q: "What is a healthy follow to nofollow ratio?",
              a: "A healthy backlink profile typically has 60–80% follow links and 20–40% nofollow links. Follow links pass PageRank and improve rankings, while nofollow links from social platforms, news sites, directories, and forums signal that a site is being discovered and mentioned organically. A profile with 95%+ follow links looks artificially built rather than naturally earned.",
            },
            {
              q: "Why does anchor text ratio matter for SEO?",
              a: "Google's Penguin algorithm penalises websites with over-optimised anchor text profiles. If too many backlinks use exact-match keywords — for example, 50% of all anchors saying 'best backlink calculator' — Google treats this as a manipulation signal. A safe profile keeps exact-match anchors below 20% and balances them with brand name anchors (30–60%) and generic anchors like 'click here' or raw URLs (10–30%).",
            },
            {
              q: "How many backlinks should point to the homepage?",
              a: "Ideally under 40% of your backlinks should target the homepage. Real websites earn links to many different pages — blog posts, product pages, guides, and tools — because editorial links point to wherever the most relevant content lives. A profile with 70–80% homepage links suggests the links were placed deliberately rather than earned naturally, which is a red flag for search engines.",
            },
            {
              q: "What is domain diversity in backlink analysis?",
              a: "Domain diversity is the ratio of unique referring domains to total backlinks. If you have 1,200 backlinks from 720 unique domains, your diversity score is 60%. A high score means links come from many different websites, which carries far more authority than the same number of links concentrated across a few domains. Search engines weight referring domain count more heavily than raw backlink count.",
            },
            {
              q: "Can I use this calculator for competitor analysis?",
              a: "Yes. Export backlink data from Ahrefs, SEMrush, Moz, or Majestic for any competitor domain, then enter the statistics here. Comparing your ratios against a competitor who outranks you reveals exactly which areas of your link profile need improvement — whether that is more nofollow diversity, better domain spread, or a less exact-match-heavy anchor profile.",
            },
            {
              q: "What tools can I use to get my backlink data?",
              a: "The most reliable paid sources are Ahrefs Site Explorer, SEMrush Backlink Analytics, Moz Link Explorer, and Majestic SEO. For free data, Google Search Console shows your referring domain count, top linking sites, and some anchor text data. The limited free tiers on Ahrefs and SEMrush can give you enough data for a basic ratio check without a subscription.",
            },
            {
              q: "How often should I audit my backlink ratios?",
              a: "Audit monthly if you are actively building links, or quarterly for maintenance. Always run an audit immediately after a ranking drop, a Google core update, or a manual action notification in Google Search Console — an unusual ratio shift often coincides with the cause of the problem. Catching an exact-match anchor spike early means you can dilute it before it triggers a penalty.",
            },
            {
              q: "What should I do if my exact-match anchor ratio is too high?",
              a: "You cannot retroactively change existing anchor text on external sites. The only solution is dilution — building new links with brand and generic anchors until the exact-match percentage falls below 20%. Focus all future outreach, guest posts, and directory submissions on brand-name anchors. For existing spammy or toxic links that are driving the ratio up, the Google Disavow Tool should be a last resort after attempting removal requests.",
            },
            {
              q: "Does this calculator store my data?",
              a: "No. All calculations run entirely in your browser using JavaScript. No backlink data is sent to any server. When you use the 'Save to History' feature, the data is stored in your browser's localStorage only — it is accessible only on your device and is cleared when you clear your browser data. This makes the tool safe for auditing client sites without data privacy concerns.",
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
            { icon: "🔍", title: "SEO Professionals",   desc: "Audit client backlink profiles monthly, detect over-optimisation risks before they trigger penalties, and build data-driven link-building strategies with clear ratio targets." },
            { icon: "📈", title: "Digital Marketers",   desc: "Evaluate link-building campaign results, compare domain profiles against competitors, and produce backlink health reports that clients can understand without needing SEO expertise." },
            { icon: "🌐", title: "Website Owners",      desc: "Monitor site health after algorithm updates, understand what a natural backlink profile looks like, and spot problems early before they result in a ranking drop." },
            { icon: "✍️", title: "Content Marketers",  desc: "Measure the anchor text distribution earned through content campaigns and guest posts to ensure anchor diversity stays within safe thresholds as the link portfolio grows." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Deliver structured monthly backlink health reports across multiple clients, benchmark progress against industry norms, and demonstrate measurable link-building impact over time." },
            { icon: "🎓", title: "SEO Students",        desc: "Learn off-page SEO fundamentals hands-on, understand how Penguin algorithm signals work, and practice backlink profile analysis using real data or the built-in sample dataset." },
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
