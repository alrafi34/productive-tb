export default function SEOScoreCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an SEO Score Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>SEO score calculator</strong> is a diagnostic tool that measures how well a web page follows on-page SEO best practices. It evaluates factors like title tag length, meta description quality, keyword placement, content depth, heading structure, image optimisation, internal and external linking, and technical signals such as HTTPS and canonical tags — then produces a single 0–100 score with a letter grade and actionable recommendations.
          </p>
          <p>
            Unlike enterprise crawlers that take hours to audit a site, an SEO score calculator gives you <em>instant feedback</em> on a single page. You enter the page's details — or paste them in from your CMS — and the tool flags every issue in real time. It is the fastest way to verify that a page meets SEO fundamentals before publishing, or to identify exactly which factors are holding an existing page back from ranking higher.
          </p>
          <p>
            This tool is designed for <strong>SEO professionals, content writers, digital marketers, ecommerce sellers, startup founders, and marketing agencies</strong> who need a reliable on-page SEO checklist without paying for a full-stack SEO platform. Everything runs locally in your browser — no data is uploaded to any server — making it safe for auditing client pages or sensitive internal content.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the SEO Score Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator scores 13 distinct on-page signals, each carrying a specific point value based on its documented influence on organic rankings. The total of all weighted signals equals 100 points. Every signal is evaluated against Google's published guidelines and established SEO best practices.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Score Formula</p>
            <p className="font-mono text-lg text-gray-900 font-semibold">SEO Score = Σ (Signal Points Earned) / 100 × 100</p>
          </div>
          <p>Each signal is evaluated as follows:</p>
          <ul className="space-y-2 text-sm">
            {[
              ["Page Title (10 pts)", "Checks that the title is 50–60 characters, contains the target keyword, and isn't missing or duplicated."],
              ["Meta Description (10 pts)", "Validates length of 140–160 characters and presence of the target keyword for SERP click-through optimisation."],
              ["Keyword Usage (10 pts)", "Measures keyword density (target: 0.5–2.5%) and placement in key locations: title, H1, meta description, and URL."],
              ["Content Length (15 pts)", "Awards full points for 1,500+ words, partial credit for 600–1,499 words — reflecting Google's preference for comprehensive content."],
              ["H1 Heading (10 pts)", "Confirms the H1 contains the target keyword and is present on the page."],
              ["URL Structure (10 pts)", "Checks for a short, clean slug containing the target keyword without stop words or URL parameters."],
              ["Image ALT Text (10 pts)", "Scores based on the percentage of images that carry descriptive ALT attributes."],
              ["Internal Links (5 pts)", "Rewards pages with 3+ contextual internal links to related content."],
              ["External Links (5 pts)", "Checks for at least 1–2 authoritative outbound links, which signal trustworthiness to search engines."],
              ["HTTPS (5 pts)", "Confirms the page is served over a secure connection — a confirmed Google ranking signal since 2014."],
              ["Mobile-Friendly (5 pts)", "Flags whether the page is optimised for mobile viewports, required for Google's mobile-first indexing."],
              ["Canonical Tag (3 pts)", "Verifies the presence of a canonical URL to prevent duplicate content issues."],
              ["Robots Meta (2 pts)", "Checks that the page is not accidentally set to noindex, blocking it from search engine crawlers."],
            ].map(([signal, desc]) => (
              <li key={signal} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{signal}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the SEO Score Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Page Details", "Fill in the page title, meta description, target keyword, and URL slug. These four fields together account for 40 of the 100 possible points and are the highest-leverage items to get right before publishing."],
                ["Add Content Statistics", "Enter your word count, H1 heading text, total image count, how many images have ALT text, and your internal and external link counts. Pull these from your CMS or from a browser inspection of the published page."],
                ["Set Technical Flags", "Toggle HTTPS on or off to reflect your server setup. Toggle mobile-friendly if your page uses responsive design. Enable the canonical tag flag if your page template includes a canonical URL. Set the robots meta to index unless the page is intentionally excluded."],
                ["Read Your Score & Grade", "Your SEO score (0–100), letter grade (F to A+), health status, and a prioritised list of recommendations update in real time as you fill in each field. Start fixing from the top of the recommendations list — those carry the most point weight."],
                ["Export or Copy the Report", "Use the Export button to save a structured report as a text file, or copy the results to clipboard. Paste into a client report, a Notion audit doc, or a Linear issue tracker to keep a record of the before and after."],
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
                "Real-time scoring with instant feedback on every input",
                "13 weighted on-page SEO signals, each with specific point values",
                "Letter grade and health status (Excellent → Critical)",
                "Prioritised recommendations ordered by impact",
                "Title length meter with live character count",
                "Meta description length meter (140–160 char target)",
                "Keyword density calculator with 0.5–2.5% target range",
                "Image ALT coverage percentage scoring",
                "URL structure quality analysis",
                "HTTPS, mobile-friendly, canonical, and robots meta flags",
                "Export report as structured text file",
                "Copy full audit to clipboard in one click",
                "100% browser-based — no data leaves your device",
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
              title: "Pre-Publish Content Checklist",
              scenario: "A content writer finishes a 1,400-word blog post on compound interest. Before handing it to the editor, they run it through the calculator. The tool flags that the meta description is 178 characters (too long), the H1 doesn't include the target keyword, and there are only two internal links. All three issues are fixed in under five minutes — and the article publishes with a score of 87.",
            },
            {
              title: "Ecommerce Product Page Audit",
              scenario: "An ecommerce manager is investigating why their best-selling product page dropped from position 4 to position 14 after a Google core update. They enter the page details and find the page scores only 52 — thin at 340 words, no external links, and images without ALT text. The calculator identifies exactly what needs fixing, and the page recovers within three crawl cycles.",
            },
            {
              title: "Agency Client Monthly SEO Report",
              scenario: "A digital marketing agency runs SEO audits for 20 clients each month. Using the calculator as a rapid assessment tool, they audit each client's top 5 pages in under an hour and export structured reports for each. The health scores give clients a clear before/after benchmark, and the prioritised recommendations become the month's action list.",
            },
            {
              title: "Startup Landing Page Launch Prep",
              scenario: "A SaaS founder is preparing to launch a new product feature landing page. They have never done SEO before. The calculator walks them through every factor — they discover their title is 78 characters (too long), there's no canonical tag, and the page isn't marked as mobile-friendly in their CMS settings. Each fix takes minutes and the page launches with an A-grade score.",
            },
            {
              title: "Comparing Two Content Drafts",
              scenario: "An SEO specialist has two competing drafts for a pillar content page — one written in-house, one by a freelancer. They run both through the calculator. Draft A scores 74 (good keyword placement, strong length, but thin on internal links). Draft B scores 81 (better internal linking and cleaner URL structure). The specialist selects Draft B as the base and applies Draft A's keyword density.",
            },
            {
              title: "Teaching On-Page SEO Interactively",
              scenario: "An SEO instructor uses the calculator in a live class to demonstrate how each on-page factor contributes to a score. Students enter real pages they manage and watch their score change as they improve title length, add ALT text, and reduce keyword density. The immediate visual feedback makes abstract SEO concepts concrete and memorable.",
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
                "Always put your primary keyword at the very start of your title tag, not the end. Google weights the beginning of titles more heavily, and users scanning SERPs read left to right.",
                "A meta description doesn't directly affect rankings, but a well-written one at 150–160 characters with a clear benefit and call to action can improve click-through rate by 15–30% — which is a strong indirect ranking signal.",
                "Content length matters, but depth matters more. A 2,000-word page that answers the reader's full question will outrank a 1,500-word page that doesn't. Use the word count as a minimum threshold, not the goal.",
                "If your keyword density is above 2.5%, reduce it by replacing some instances with synonyms and semantic variants. Google's natural language processing understands related terms, and keyword stuffing is a downgrade signal.",
                "Internal linking is the most underrated factor on this checklist. Three or more contextual internal links to related pages distributes link equity across your site and helps Google understand your content structure. Add them in the body copy, not just a 'related posts' sidebar.",
                "Always add a canonical tag even if you have no known duplicate content problem. It pre-emptively prevents duplication from URL parameters, tracking tags, and CDN variants — and it's a 3-point quick win in the score.",
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
                "Don't chase a perfect score of 100 at the expense of readability. A title forced to exactly 60 characters with a keyword crammed in often sounds unnatural. Humans click it first — Google sees the click-through rate second.",
                "Don't use the same title tag on multiple pages. Duplicate titles fragment ranking signals and confuse search engines about which page should rank for the query.",
                "Don't skip ALT text on decorative images just because they don't seem important. Even generic ALT like 'SEO audit dashboard screenshot' helps accessibility and adds a minor relevance signal.",
                "Don't ignore the robots meta flag. A forgotten noindex tag — left over from staging — is one of the most common reasons a well-optimised page never appears in search results.",
                "Don't treat this score as a guarantee of ranking. On-page optimisation is one of three pillars (alongside backlinks and technical performance). A score of 95 on a new domain with no backlinks will still rank below a score of 70 on an established DA-50 site for competitive keywords.",
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
          On-Page SEO Factor Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Factor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Optimal Target</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Points</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Impact if Missed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Page Title",        "50–60 characters, keyword first",          "10 pts", "Lower CTR, keyword relevance signal weakened"],
                ["Meta Description",  "140–160 characters, includes keyword",      "10 pts", "Lower CTR — meta descriptions directly affect SERP preview"],
                ["Keyword Usage",     "0.5–2.5% density, in title + H1 + URL",    "10 pts", "Page may not rank for the target query"],
                ["Content Length",    "1,500+ words (600+ for partial credit)",    "15 pts", "Thin content downgrade by Helpful Content system"],
                ["H1 Heading",        "One H1 per page, contains target keyword",  "10 pts", "Missed relevance signal for the primary query"],
                ["URL Structure",     "Short slug, includes keyword, no params",   "10 pts", "Lower click-through, crawling inefficiency"],
                ["Image ALT Text",    "100% of images have descriptive ALT",       "10 pts", "Accessibility failure + missed image search traffic"],
                ["Internal Links",    "3+ contextual links to related pages",      " 5 pts", "Link equity trapped on the page, poor crawl depth"],
                ["External Links",    "1–2 links to authoritative sources",        " 5 pts", "Trust signal to Google slightly reduced"],
                ["HTTPS",             "Secure connection (TLS certificate)",       " 5 pts", "Minor ranking penalty + browser security warnings"],
                ["Mobile Friendly",   "Responsive design, mobile-first layout",    " 5 pts", "Demoted in mobile-first index (majority of searches)"],
                ["Canonical Tag",     "Self-referencing canonical in <head>",      " 3 pts", "Duplicate content risk from URL variants"],
                ["Robots Meta",       "index, follow (default)",                   " 2 pts", "Page blocked from search index if set to noindex"],
              ].map(([factor, target, pts, impact]) => (
                <tr key={factor} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{factor}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{target}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{pts}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Point values reflect the relative influence of each factor based on Google's published guidelines and documented ranking signal research. Weights are periodically reviewed as Google updates its algorithms.</p>
      </section>

      {/* ── Grade Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          SEO Score Grade Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Score Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">SEO Health</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["90 – 100", "A+", "Excellent", "Fully optimised — strong on-page foundation. Focus on backlinks and content depth to compound rankings."],
                ["80 – 89",  "A",  "Very Good", "Well-optimised with one or two minor gaps. Quick fixes will push this to A+ territory."],
                ["70 – 79",  "B",  "Good",      "Solid optimisation but with identifiable gaps. Address the top 2–3 recommendations to reach A-grade."],
                ["55 – 69",  "C",  "Average",   "Moderate optimisation with key issues affecting performance. Prioritise content length and title fixes first."],
                ["40 – 54",  "D",  "Poor",      "Significant SEO problems. Multiple high-weight factors are failing — this page is unlikely to rank competitively."],
                ["0 – 39",   "F",  "Critical",  "Fundamental SEO issues. The page is missing multiple core signals and may not be properly indexed."],
              ].map(([range, grade, health, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 font-bold text-gray-800 text-base">{grade}</td>
                  <td className="py-2.5 px-4 font-medium text-gray-700">{health}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is an SEO score and how is it measured?",
              a: "An SEO score is a numerical estimate (0–100) of how well a page follows on-page optimisation best practices. It is not a metric that Google publishes or uses internally — it is a diagnostic tool built on publicly documented ranking signals. This calculator scores 13 factors including title length, meta description quality, keyword placement, content depth, image optimisation, internal linking, and technical settings like HTTPS and canonical tags. Each factor carries a specific point weight, and the total reflects how completely the page addresses the known on-page ranking signals.",
            },
            {
              q: "What is the ideal title length for SEO?",
              a: "Google truncates title tags in search results at roughly 600 pixels, which corresponds to 50–60 characters for standard fonts. Titles shorter than 50 characters tend to miss opportunities to include target keywords and secondary terms. Titles longer than 60–65 characters are cut off with an ellipsis, which reduces click-through rate. The most effective format places the primary keyword at the start of the title, followed by a secondary qualifier and the brand name at the end.",
            },
            {
              q: "What is the ideal meta description length?",
              a: "Meta descriptions should be 140–160 characters. Shorter descriptions miss the opportunity to include both the target keyword and a clear call to action. Longer descriptions are truncated in SERPs. While Google's algorithm does not use meta descriptions as a direct ranking factor, they appear as the text snippet beneath your title in search results and directly influence whether a user clicks through. A well-written meta description can improve click-through rate by 10–30%, making it one of the highest-leverage fields to optimise.",
            },
            {
              q: "How much content do I need for good SEO?",
              a: "For competitive keywords, pages ranking on page one typically have 1,500–2,500 words — not because length is rewarded directly, but because comprehensive pages naturally cover the full range of related questions, which earns them relevance across hundreds of long-tail queries. For informational queries with low competition, 600–800 well-structured words can be sufficient. The correct target is to be more complete than the pages currently ranking above you for your keyword, not to hit an arbitrary word count.",
            },
            {
              q: "What keyword density should I aim for?",
              a: "A keyword density of 0.5–2.5% is the safe target range. Below 0.5%, the page may not send a strong enough relevance signal. Above 2.5%, the page risks being flagged for keyword stuffing — an over-optimisation signal that Google's algorithms penalise. More important than density is placement: a keyword in the title tag, H1, first 100 words of the page, URL slug, and meta description sends a much stronger relevance signal than repetition in the body text alone.",
            },
            {
              q: "Does HTTPS affect Google rankings?",
              a: "Yes. Google confirmed HTTPS as a lightweight ranking signal in 2014, and it has been weighted more heavily as part of their security initiatives since. More importantly, Chrome marks non-HTTPS pages as 'Not Secure' in the address bar, which erodes user trust and increases bounce rate — an indirect negative ranking signal. Migrating from HTTP to HTTPS is a one-time technical task with a permanent SEO benefit and no downside if implemented correctly with proper 301 redirects.",
            },
            {
              q: "What is a canonical tag and why does it matter?",
              a: "A canonical tag is an HTML element in a page's <head> that tells search engines which URL is the authoritative version of the content. Without it, Google may index multiple URL variants of the same page — the version with tracking parameters, with and without trailing slashes, with different capitalisation — as separate pages with duplicate content. Duplicate content dilutes ranking signals across variants. A self-referencing canonical on every page pre-emptively prevents this and is worth the 3 points it adds to the score.",
            },
            {
              q: "Why do image ALT attributes matter for SEO?",
              a: "ALT attributes serve two purposes: accessibility and relevance. For accessibility, screen readers announce ALT text to visually impaired users — missing ALT is a WCAG 2.1 compliance failure. For SEO, Google's crawlers cannot interpret visual content in images; they rely on ALT text to understand what an image depicts and how it relates to the page's topic. Pages with fully described images rank better in Google Image Search and send stronger topical relevance signals to the main organic index.",
            },
            {
              q: "Is this tool a replacement for Ahrefs, SEMrush, or Screaming Frog?",
              a: "No — it is a complement to them, not a replacement. This calculator provides an instant on-page checklist for a single page, which is ideal for pre-publish checks and quick audits. Enterprise SEO platforms like Ahrefs and SEMrush crawl entire sites, measure backlink profiles, track rankings over time, and analyse Core Web Vitals. Screaming Frog can crawl thousands of URLs in a batch. This tool is most useful as a first-pass filter before you invest time in deeper analysis with those platforms.",
            },
            {
              q: "Does this calculator store my data?",
              a: "No. Every calculation in this tool runs entirely in your browser using JavaScript. No page data, keywords, titles, or descriptions are transmitted to any server. This makes the calculator safe to use for auditing client pages, proprietary content, or pages under embargo before launch. When you close the tab, the data is gone — nothing is stored in cookies, localStorage, or any server-side database.",
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
            { icon: "✍️", title: "Content Writers",     desc: "Run a quick SEO check on every article before publishing — catch missing keywords, short meta descriptions, and thin content before it goes live." },
            { icon: "🔍", title: "SEO Specialists",     desc: "Audit multiple pages rapidly, benchmark scores against competitors, and generate exportable on-page reports for client presentations and monthly reviews." },
            { icon: "🛍️", title: "Ecommerce Sellers",  desc: "Optimise product pages and category descriptions to improve organic visibility — especially useful for diagnosing why a previously ranking page has dropped." },
            { icon: "🚀", title: "Startup Founders",    desc: "Audit landing pages and product pages before launch to ensure on-page SEO hygiene is in place from day one, without needing an SEO consultant." },
            { icon: "🏢", title: "Marketing Agencies",  desc: "Quickly assess client pages and produce structured SEO reports with scores and prioritised action lists — without paying for enterprise tooling on every account." },
            { icon: "🎓", title: "SEO Students",        desc: "Learn on-page SEO principles interactively by entering real pages and watching how each factor changes the score, making abstract concepts immediately concrete." },
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
