export default function KeywordDensityCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Keyword Density Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>keyword density calculator</strong> is an on-page SEO analysis tool that measures how frequently a specific word or phrase appears in a piece of content relative to the total word count. It expresses this as a percentage, helping writers and SEO professionals understand whether a keyword is used enough to signal topical relevance — or too often, risking a keyword stuffing penalty.
          </p>
          <p>
            Beyond single-keyword density, a professional keyword analyzer also examines <em>word frequency distribution</em> across the entire document — surfacing the most prominent terms, bigrams (2-word phrases), and trigrams (3-word phrases). This gives a complete picture of what Google's crawlers will interpret as the page's primary topics, helping you align content with target search queries before publishing.
          </p>
          <p>
            This tool is designed for <strong>content writers, SEO specialists, digital marketers, ecommerce sellers, marketing agencies, and anyone who creates content for search</strong>. It processes everything locally in your browser — your text is never sent to any server — making it safe for client content, proprietary drafts, or embargoed articles. Results update in real time as you type, with CSV and TXT export for reporting workflows.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Keyword Density Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The formula is straightforward: divide the number of times a keyword appears by the total word count, then multiply by 100 to express it as a percentage.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Core Formula</p>
            <p className="font-mono text-lg text-gray-900 font-semibold">
              Keyword Density (%) = (Keyword Count ÷ Total Words) × 100
            </p>
          </div>
          <p>
            This calculator applies the formula across every unique word and phrase in your content simultaneously, producing a ranked frequency table. Several adjustments are made before counting:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Stop Word Filtering", "When enabled, 150+ common English function words (the, a, is, of, and, to, in…) are removed before counting. This focuses the analysis on meaningful content words and prevents stop words from dominating the frequency table."],
              ["Minimum Word Length", "Words shorter than the configured minimum (default: 3 characters) are excluded. This prevents abbreviations and filler from inflating counts."],
              ["Case Normalisation", "All text is lowercased before counting so 'SEO', 'seo', and 'Seo' are counted as the same keyword."],
              ["N-gram Analysis", "Beyond single words, the tool counts every 2-word bigram and 3-word trigram in the text. This reveals which multi-word phrases are prominent — crucial for long-tail keyword targeting."],
              ["Specific Keyword Search", "Enter any keyword or phrase to instantly see its exact count and density without scrolling the full frequency table."],
            ].map(([term, desc]) => (
              <li key={term} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{term}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Keyword Density Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Paste Your Content", "Copy your article, blog post, product description, or landing page copy and paste it into the text area. The word count, character count, sentence count, and reading time update instantly."],
                ["Configure Analysis Options", "Set the minimum word length to filter out very short words. Toggle stop-word filtering on to exclude common filler words like 'the', 'and', and 'is' from the frequency table. Choose your n-gram mode — single words, bigrams, or trigrams."],
                ["Search a Specific Keyword", "Type your target keyword or keyphrase into the search field to see its exact count, density percentage, and whether it falls within the recommended 0.5–2.5% range. A warning badge appears if the density exceeds 4%."],
                ["Review the Frequency Table", "The sortable table shows every keyword, its occurrence count, and its density. Sort by density to spot over-represented terms. Sort by count to find your most-used words. Use this to confirm your primary and secondary keywords are appropriately distributed."],
                ["Export Your Report", "Click Export CSV to download the full keyword table for spreadsheet analysis. Use Export TXT for a plain-text summary. Use Copy to Clipboard to paste results directly into a client report or content audit document."],
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
                "Real-time keyword density as you type",
                "Single-word, bigram (2-word), and trigram (3-word) analysis",
                "Automatic stop-word filtering (150+ words)",
                "Configurable minimum word length",
                "Specific keyword or phrase search with instant result",
                "Density warning badge above 4% threshold",
                "Full content statistics: words, characters, sentences, paragraphs",
                "Reading time and speaking time estimates",
                "Sortable keyword frequency table",
                "Export full report as CSV, TXT, or JSON",
                "Copy summary to clipboard in one click",
                "100% browser-based — nothing leaves your device",
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
              title: "Pre-Publish SEO Content Check",
              scenario: "A content writer finishes a 1,600-word article targeting the keyword 'keyword density calculator'. They paste the draft and search for the target keyword. The tool shows a density of 1.2% — within the healthy 0.5–2.5% range — and reveals that the secondary keyword 'word frequency' appears 8 times at 0.5%. The article publishes with confidence that on-page keyword signals are properly distributed.",
            },
            {
              title: "Diagnosing a Ranking Drop",
              scenario: "An SEO specialist notices a product page has dropped from position 3 to position 19 after a Google core update. They paste the page content and find the primary keyword appears at 5.8% density — well above the 4% over-optimisation threshold. The tool flags keyword stuffing as the likely cause. The writer rewrites the body copy, replacing every third instance with a synonym, and density drops to 1.9%.",
            },
            {
              title: "Competitor Content Analysis",
              scenario: "An SEO manager copies the text from the top-ranking competitor page for their target keyword and pastes it into the tool. The frequency table reveals that the competitor uses several semantic variants — 'keyword frequency', 'keyword analysis', 'content optimisation' — that the team's own draft completely lacks. These terms are added to their content brief, broadening the page's topical coverage.",
            },
            {
              title: "Long-Tail Keyword Discovery",
              scenario: "A blogger pastes a 2,400-word pillar post and switches to trigram analysis. The tool surfaces phrases like 'on page seo tool' and 'free keyword checker' that appear multiple times organically in the content. These unintentional long-tail keyphrases are noted as secondary targets for the meta description and internal linking anchor text.",
            },
            {
              title: "Agency Content Audit",
              scenario: "A digital marketing agency is auditing 30 pages for a new client. They paste each page's content, export the CSV report for each, and load all results into a spreadsheet. The batch analysis reveals that 12 pages have at least one keyword exceeding 4% density. The audit report prioritises these pages for immediate rewriting, with density targets included in the brief.",
            },
            {
              title: "Ecommerce Product Page Optimisation",
              scenario: "An ecommerce manager pastes five product descriptions for the same product category. The frequency analysis shows the word 'buy' appears at 6.2% density on one page — a clear over-optimisation signal for a commercial query. The description is rewritten to lead with benefits and specifications, reducing 'buy' to 0.8% while adding relevant attribute keywords that had been missing entirely.",
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
                "Target a density of 0.5–2.5% for your primary keyword. A well-written 1,500-word article naturally hits this range with 8–37 uses of the main keyword. If you need to force it beyond that, the content is over-optimised.",
                "Use the bigram analysis to check your secondary keyphrases. Top-ranking content rarely relies on a single keyword — it covers a cluster of 2–4 related phrases that collectively signal deep topical coverage to Google.",
                "Enable stop-word filtering before exporting keyword reports for clients. It removes noise and keeps the frequency table focused on meaningful terms that actually affect rankings.",
                "Run the analysis on the top 3 competitor pages for your target keyword before writing. Note which terms appear in their top 20 words that are absent from your own draft — these are likely related terms Google expects to see.",
                "Check the trigram results for any 3-word phrase appearing more than 3 times in a 1,000-word piece. Natural writing rarely repeats 3-word phrases — if the tool surfaces one, it may be an inadvertent repetition that sounds forced to both readers and algorithms.",
                "Use speaking time (not just reading time) when writing scripts, podcast show notes, or video descriptions — 130 words per minute is the standard speech rate, and it is a faster way to verify a video's planned length before recording.",
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
                "Don't target a specific keyword density as a hard goal. Google does not use keyword density as a direct ranking factor. The percentage matters only as a signal of over-optimisation — write naturally first, then check the density as a sanity check.",
                "Don't analyse only your body text. Your title tag, H1, meta description, and alt text all contribute to keyword signals. Run the full page HTML through the tool (or at minimum paste in your body copy plus all headings) for an accurate picture.",
                "Don't ignore the secondary keyword frequency. An article with a healthy 1.5% primary keyword density but zero appearances of related terms will underperform against a competitor whose content covers the full topic cluster.",
                "Don't use keyword stuffing in alt text, meta keywords tags, or hidden divs. Google's crawlers detect and penalise these techniques, and the on-page damage far exceeds any perceived benefit.",
                "Don't compare densities across content of very different lengths. A 0.5% density in a 200-word paragraph means 1 mention. A 0.5% density in a 2,000-word article means 10 mentions — a meaningfully different signal to a crawler.",
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
          Keyword Density Reference Guide
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Density Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0%",         "Missing",      "Keyword absent from content",                                 "Add the keyword naturally in the introduction, headings, and body"],
                ["0.1–0.4%",   "Too Low",      "Keyword mentioned but signal is weak",                       "Increase usage — aim for at least 5–8 mentions per 1,000 words"],
                ["0.5–1.0%",   "Healthy",      "Keyword appears naturally and consistently",                  "Ideal for secondary keywords and long-tail phrases"],
                ["1.0–2.5%",   "Optimal",      "Primary keyword well-represented without over-optimisation", "Ideal range for primary target keyword — maintain"],
                ["2.5–4.0%",   "Caution",      "Slightly elevated — review for naturalness",                 "Check if repetitions sound forced; consider replacing some with synonyms"],
                ["4.0%+",      "Danger",       "Over-optimisation risk — keyword stuffing signal",            "Rewrite: replace excess instances with semantic variants and related terms"],
              ].map(([range, status, meaning, action]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{status}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{meaning}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Google has not published a specific keyword density guideline. These ranges reflect observed patterns from SEO practitioners and documented penalties for keyword stuffing. Always prioritise natural, reader-first writing.</p>
      </section>

      {/* ── N-gram Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          N-gram Analysis Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">N-gram Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best Used For</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Healthy Density</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Unigram (1-word)",  "\"SEO\", \"calculator\", \"density\"",            "Primary keyword presence, stop-word filtering",         "0.5–2.5%"],
                ["Bigram (2-word)",   "\"keyword density\", \"content writing\"",         "Secondary keywords, topic cluster coverage",             "0.2–1.5%"],
                ["Trigram (3-word)",  "\"keyword density calculator\", \"on page SEO\"",  "Long-tail keyphrases, voice search query alignment",     "0.1–0.8%"],
              ].map(([type, example, use, density]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs italic">{example}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{use}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{density}</td>
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
              q: "What is keyword density and why does it matter?",
              a: "Keyword density is the percentage of times a target keyword appears in a piece of content relative to the total word count. It is calculated as (keyword count ÷ total words) × 100. It matters because it is one of the signals Google uses to understand the primary topic of a page. Too low and the page may not rank for the intended query; too high and the page risks being penalised for keyword stuffing — an over-optimisation signal that Google's algorithms explicitly downgrade.",
            },
            {
              q: "What is the ideal keyword density for SEO in 2026?",
              a: "There is no perfect keyword density. Google has repeatedly stated it does not use keyword density as a direct ranking factor with a specific threshold. That said, most SEO practitioners consider 0.5–2.5% a safe range for primary keywords. Below 0.5% the page may send too weak a relevance signal; above 4–5% the page risks being interpreted as keyword stuffing. The most important principle is to write naturally for the reader — density is a diagnostic check, not a target to engineer.",
            },
            {
              q: "What is keyword stuffing and how does Google detect it?",
              a: "Keyword stuffing is the deliberate overuse of a keyword in content, meta tags, alt attributes, or hidden text to manipulate search rankings. Google's algorithms detect it through statistical analysis of term frequency relative to natural language patterns, combined with semantic understanding of the content's meaning. A page where the primary keyword appears at 8% density alongside unrelated padding content is a clear signal. Penalties range from a mild ranking demotion to complete removal from the index for egregious cases.",
            },
            {
              q: "What are stop words and should I filter them?",
              a: "Stop words are common function words like 'the', 'a', 'is', 'of', 'and', 'to', 'in', and 'that' which carry minimal SEO meaning on their own. Most keyword density analysers — including this one — exclude them by default to focus the frequency table on meaningful content words. You should enable stop-word filtering for most SEO use cases. The only time to disable it is when analysing specific phrases that intentionally include stop words, such as 'the end of SEO' as a target phrase.",
            },
            {
              q: "What is n-gram analysis and when should I use it?",
              a: "N-gram analysis counts sequences of words rather than individual words. Bigrams are 2-word phrases (e.g., 'keyword density'), trigrams are 3-word phrases (e.g., 'keyword density calculator'). Use bigram analysis to identify which 2-word keyphrases are prominent in your content — these often correspond to secondary keyword targets and topic cluster terms. Use trigram analysis to surface long-tail phrases, check for inadvertent exact-match repetition, and align content with conversational search queries and voice search patterns.",
            },
            {
              q: "How is reading time calculated?",
              a: "Reading time is estimated using 238 words per minute, which is the average adult silent reading speed established by research. Speaking time uses 130 words per minute, which reflects the pace of a clear, professional spoken delivery. Both are approximations — technical content with diagrams, code blocks, or complex terminology takes longer to process than narrative text. The estimates are most accurate as planning guides for content length, not precise time predictions.",
            },
            {
              q: "Should I analyse the entire page or just the body text?",
              a: "For the most accurate on-page analysis, paste the full page text including all headings (H1, H2, H3), the introduction, body paragraphs, and conclusion. Do not include the navigation menu, footer links, or sidebar content — these are rendered on every page and are not part of the unique content signal. Your title tag and meta description are not usually visible in the page body, so check their keyword usage separately in an SEO metadata tool.",
            },
            {
              q: "Can I use this to analyse competitor content?",
              a: "Yes. Copy the visible text from any competitor page, paste it into the tool, and run the frequency analysis. The results reveal which keywords and phrases the competitor is optimising around, which semantic terms they use extensively, and whether their content follows a healthy density pattern. This is one of the fastest ways to build a comprehensive content brief — by identifying which keyword clusters the top-ranking page covers that your draft does not.",
            },
            {
              q: "How does keyword density relate to TF-IDF?",
              a: "Keyword density is a simple ratio of one term to the total word count. TF-IDF (Term Frequency–Inverse Document Frequency) is a more sophisticated measure that weights a term's frequency in a document against how common that term is across all documents in a corpus. TF-IDF punishes terms that are ubiquitous everywhere (like 'the') and rewards terms that are frequent in your document but rare across the web — making it a better measure of a term's topical significance. This tool uses keyword density because it is the practical metric for most content workflows, but the underlying principle of identifying terms that distinguish your content is the same.",
            },
            {
              q: "Is my content private when I use this tool?",
              a: "Yes. All text processing runs entirely in your browser using JavaScript. Your content is never transmitted to any server, stored in any database, or shared with any third party. This makes the tool safe to use for client content under NDA, embargoed articles before publication, proprietary product descriptions, or any sensitive draft. When you close or refresh the tab, the text is cleared entirely.",
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Tool?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "✍️", title: "Content Writers",     desc: "Check that target keywords appear with the right frequency before publishing — catching over-optimisation and under-use before an editor or Google flags the page." },
            { icon: "🔍", title: "SEO Specialists",     desc: "Audit on-page keyword distribution across entire content libraries, identify stuffed pages causing algorithmic penalties, and build keyword-balanced content briefs." },
            { icon: "📱", title: "Digital Marketers",   desc: "Optimise ad copy, landing pages, and email campaigns to ensure messaging stays on-topic and aligned with the search queries that drive conversions." },
            { icon: "🏢", title: "Marketing Agencies",  desc: "Analyse client content at scale, generate exportable density reports with CSV export, and back up content recommendations with quantitative keyword data." },
            { icon: "🛍️", title: "Ecommerce Sellers",  desc: "Optimise product descriptions and category pages to include target keywords at appropriate frequencies without triggering over-optimisation penalties on commercial queries." },
            { icon: "🎓", title: "SEO Students",        desc: "Learn keyword optimisation fundamentals interactively by pasting real content and watching how density, word frequency, and n-gram patterns change with each edit." },
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
