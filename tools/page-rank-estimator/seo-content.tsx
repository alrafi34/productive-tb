export default function PageRankEstimatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Page Rank Estimator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Page Rank Estimator</strong> is a free browser-based tool that scores how likely a webpage is to rank well in Google search results, based on a weighted model built from widely accepted on-page, technical, content, and user-experience SEO best practices. It answers the question every content creator and SEO professional asks before hitting publish: <em>does this page have what it needs to compete?</em>
          </p>
          <p>
            This tool does <strong>not</strong> predict Google&apos;s actual ranking position and does <strong>not</strong> use or reproduce Google&apos;s real ranking algorithm — no third-party tool can, since Google&apos;s system considers hundreds of proprietary signals. Instead, it evaluates over 30 individual factors across seven categories — On-Page SEO, Content Quality, Images, Internal SEO, Technical SEO, User Experience, and Authority — and combines them into a single weighted score that highlights strengths, exposes weaknesses, and generates a prioritized improvement checklist.
          </p>
          <p>
            This tool is built for <strong>SEO professionals, digital marketing agencies, bloggers, content creators, students, business owners, and website owners worldwide</strong> who want a fast, educational way to sanity-check a page before or after publishing. It runs 100% in your browser with no signup, lets you save and compare multiple reports, and exports results as CSV, JSON, or a print-ready report — and none of your data ever leaves your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Page Rank Estimator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every input you enter is scored from 0 to 100 as an individual factor, then averaged within its category using pre-set sub-weights, then combined across all seven categories using their overall weight to produce the final score out of 100.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Category Score = Σ (Factor Score × Factor Sub-Weight)</p>
              <p>Overall Score = Σ (Category Score ÷ 100 × Category Weight)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["On-Page SEO (15%)", "Title length, meta description length, keyword placement in title/description/H1, URL length, and URL readability."],
              ["Content Quality (20%)", "Word count, originality, readability, heading structure, and keyword usage — the single highest-weighted category alongside Technical SEO."],
              ["Technical SEO (25%)", "HTTPS, mobile-friendliness, page speed, Core Web Vitals, canonical tags, robots meta, XML sitemap presence, and structured data — the highest-weighted category since these are foundational, often binary requirements."],
              ["Internal SEO, Images, User Experience, and Authority", "Internal/external/broken links, breadcrumbs, ALT text coverage, bounce rate, time on page, CTR estimate, backlinks, referring domains, brand authority, and domain age."],
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
          How to Use the Page Rank Estimator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Load an Example or Start Fresh", "Click Load Example to instantly populate an Excellent, Poor, or Balanced sample page, or begin entering your own page's data section by section."],
                ["Fill In the Collapsible Sections", "Expand Basic SEO, Content Quality, Images, Internal SEO, Technical SEO, User Experience, and Authority, and enter the values describing your page."],
                ["Review Your Score Dashboard", "Watch the animated circular gauge update in real time, showing your overall score, letter grade, and ranking potential label as you type."],
                ["Expand the Category Breakdown", "Click any of the 7 category cards to reveal the individual factor scores that make up that category's result, each with a tooltip explaining why it matters."],
                ["Review Strengths, Weaknesses, and Recommendations", "Check the quick Strengths/Weaknesses summary, then work through the Top Recommendations panel, sorted by highest-impact improvements first."],
                ["Save, Compare, or Export", "Save reports to history, compare two reports side by side, or export as CSV, JSON, a printed report, or a copied summary."],
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
                "30+ weighted SEO factors across 7 categories",
                "Real-time score calculation with a 150ms debounce",
                "Animated circular score gauge with color-coded ranges",
                "Expandable category cards showing every factor score",
                "Auto-generated Strengths and Weaknesses lists",
                "Top 10 recommendations sorted by ranking impact",
                "3 one-click example pages (Excellent, Poor, Balanced)",
                "Report history — save and reload past reports",
                "Side-by-side comparison of two saved reports",
                "Export as CSV or JSON with every factor score",
                "Print-ready PDF report and full-text copy",
                "Tooltips on every input explaining why it matters",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to reset",
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
              title: "Pre-Publish Content Checklist",
              scenario: "A blogger finishes a 2,100-word article with a 58-character title, a 152-character meta description, HTTPS enabled, and 14 ALT-tagged images. Running it through the estimator returns a 92/100 Excellent score, with the only recommendations being to add FAQ schema and deepen topical coverage — giving the writer confidence to publish.",
            },
            {
              title: "Diagnosing an Underperforming Page",
              scenario: "An SEO manager investigates why an old landing page isn't ranking. Entering its data — a 95-character title, missing meta description, 350 words of content, no HTTPS, and only 2 internal links — returns a 34/100 Poor score with six clear recommendations, immediately explaining the underperformance.",
            },
            {
              title: "Prioritizing a Content Refresh Backlog",
              scenario: "A content strategist runs five underperforming articles through the estimator and sorts by overall score, finding two Average-scoring pages (55-69) with Critical technical weaknesses versus three Poor-scoring pages needing a full rewrite — informing which pages get a quick technical fix versus a content overhaul first.",
            },
            {
              title: "Client SEO Audit Reporting",
              scenario: "An agency SEO analyst enters a client's homepage data, exports the report as a printed PDF showing the 78/100 Good score, category breakdown, and top three recommendations (improve loading speed, add more backlinks, improve structured data), and attaches it directly to the monthly client report.",
            },
            {
              title: "Before-and-After Improvement Tracking",
              scenario: "A website owner saves a report scoring 61/100 before a technical SEO cleanup, then after enabling HTTPS, fixing the robots meta tag, and adding structured data, saves a second report scoring 79/100 and uses the Compare feature to show category-by-category proof of improvement to a stakeholder.",
            },
            {
              title: "Teaching SEO Fundamentals",
              scenario: "A marketing instructor has students load the Poor Page example, identify all six recommendations, manually adjust each corresponding input toward the ideal range, and watch the score climb in real time — turning an abstract SEO checklist into an interactive, hands-on exercise.",
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
                "Fix Technical SEO issues first. HTTPS, mobile-friendliness, and a correct robots meta tag are binary, foundational requirements — a page can have perfect content and still be invisible to Google if one of these is wrong.",
                "Work through the Top Recommendations list in order — it's already sorted by ranking impact, so the first few items typically move your overall score the most for the least effort.",
                "Use the three Load Example presets to calibrate your intuition for what Excellent, Poor, and Balanced pages look like before scoring your own content.",
                "Save a baseline report before making changes, then save a second report afterward and use Compare to get concrete, category-by-category proof of improvement.",
                "Don't chase a perfect 100 — real pages rarely need every single factor maxed out. Focus on clearing Critical weaknesses (scores below 50) and let smaller factors sit at Good rather than Excellent.",
                "Re-run the estimator periodically as backlinks, Core Web Vitals, and content freshness change over time — SEO signals are not static.",
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
                "Don't treat the score as a literal ranking prediction. This tool measures adherence to SEO best practices, not your actual competitive position against every other page targeting the same keyword.",
                "Don't over-optimize Keyword Usage. Setting it to High to \"maximize\" the score actually lowers it — keyword stuffing is penalized in the model just as it's discouraged in real SEO practice.",
                "Don't ignore Authority signals just because they're hardest to change quickly. A technically perfect page with very few backlinks will still show a capped overall score, reflecting the real-world importance of off-page signals.",
                "Don't forget to update Images with ALT Text alongside Number of Images — ALT coverage is measured as a ratio, so adding images without adding ALT text will lower that factor's score.",
                "Don't skip the collapsed sections. Technical SEO and Authority carry the highest and third-highest category weights respectively, so leaving them at default values can hide real issues in your actual page.",
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

      {/* ── Category Weight Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Category Weight Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Key Factors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Technical SEO", "25%", "HTTPS, mobile-friendly, page speed, Core Web Vitals, canonical, robots, sitemap, structured data"],
                ["Content Quality", "20%", "Word count, originality, readability, heading structure, keyword usage"],
                ["On-Page SEO", "15%", "Title length, meta description, keyword in title/description/H1, URL"],
                ["Authority", "16%", "Backlinks, referring domains, brand authority, domain age"],
                ["User Experience", "10%", "Bounce rate, time on page, CTR estimate, navigation quality"],
                ["Internal SEO", "8%", "Internal/external links, broken links, breadcrumbs, table of contents"],
                ["Images", "6%", "ALT text coverage, image optimization"],
              ].map(([name, weight, factors]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{weight}</td>
                  <td className="py-2.5 px-4 text-gray-600">{factors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Weights reflect a general-purpose SEO best-practices model. Actual ranking factor importance varies by industry, query type, and Google algorithm updates — use this as a directional checklist, not a guarantee.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Page Rank Estimator?",
              a: "A Page Rank Estimator is a free browser-based tool that scores a webpage's SEO ranking potential using a weighted model built on widely accepted SEO best practices — covering on-page factors, content quality, technical SEO, user experience, and authority signals. It is not connected to Google and does not use or reproduce Google's actual ranking algorithm.",
            },
            {
              q: "Does this tool predict my actual Google ranking?",
              a: "No. This tool estimates ranking potential based on SEO best-practice signals, not your actual position in Google search results. Google's real ranking algorithm considers hundreds of signals, many of which cannot be replicated by a client-side tool. Use this score as a checklist and prioritization guide, not a ranking prediction.",
            },
            {
              q: "How is the overall SEO score calculated?",
              a: "The score is a weighted average across 7 categories — On-Page SEO (15%), Content Quality (20%), Images (6%), Internal SEO (8%), Technical SEO (25%), User Experience (10%), and Authority (16%) — each made up of individual factors scored 0-100 and combined using the category weight.",
            },
            {
              q: "What is a good Page Rank Estimator score?",
              a: "Scores of 85 and above indicate Excellent ranking potential, 70-84 is Good, 55-69 is Average, 40-54 is Poor, and below 40 is Very Poor. These map to letter grades from A+ down to F.",
            },
            {
              q: "Why does Technical SEO have the highest category weight?",
              a: "Technical SEO (25%) includes foundational, largely binary requirements like HTTPS, mobile-friendliness, and a correct robots meta tag — issues here can block a page from ranking entirely regardless of how good the content is, which is why the model weights them heavily alongside Content Quality (20%).",
            },
            {
              q: "How are the Top Recommendations sorted?",
              a: "Recommendations are generated for every factor scoring below 75 out of 100, then sorted so factors with the largest combination of low score and high category impact appear first — fixing the top recommendation moves your overall score the most.",
            },
            {
              q: "Can I compare two different SEO reports?",
              a: "Yes. Save a report to history, then click Compare next to any saved entry to see a side-by-side breakdown of the overall score and every category score against your current inputs — useful for tracking improvement after making changes to a page.",
            },
            {
              q: "What do the Strengths and Weaknesses lists mean?",
              a: "Strengths lists any factor scoring 85 or above, representing signals your page already handles well. Weaknesses lists any factor scoring below 50, representing the areas most likely holding your ranking potential back.",
            },
            {
              q: "Can I use this tool for a page that hasn't been published yet?",
              a: "Yes. Because every input is manually entered rather than pulled from a live URL, you can use this tool during the content-planning or pre-publish stage to check title length, content depth, and technical requirements before a page goes live.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your page's SEO data, scores, and any saved reports are never transmitted to any server, stored in any database, or accessible to anyone other than you. Report history is stored only in your browser's local storage.",
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
            { icon: "🔍", title: "SEO Professionals", desc: "Run quick pre-publish or diagnostic audits and generate a prioritized recommendation list without a full crawl tool." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Produce client-ready SEO audit reports with exportable scores, category breakdowns, and before/after comparisons." },
            { icon: "✍️", title: "Bloggers & Creators", desc: "Sanity-check a draft article's SEO fundamentals — title length, content depth, and structure — before hitting publish." },
            { icon: "🏪", title: "Business & Website Owners", desc: "Understand in plain language why a page might be underperforming and get a concrete list of fixes to prioritize." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how individual SEO factors combine into an overall score by experimenting with inputs and watching the result change live." },
            { icon: "💻", title: "Developers & Technical SEOs", desc: "Validate the technical fundamentals — HTTPS, Core Web Vitals, structured data, canonical tags — before a page ships to production." },
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
