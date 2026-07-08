export default function KeywordDensityCheckerSEO() {
  const faqItems = [
    {
      q: "What is a keyword density checker?",
      a: "A keyword density checker is a text analysis tool that measures how frequently each word appears in a piece of content and expresses it as a percentage of the total word count. For example, if the word 'SEO' appears 8 times in a 400-word article, its keyword density is 2%. This tells you whether a term is used proportionally — enough for topical clarity, but not so often that it reads as forced repetition.",
    },
    {
      q: "How is keyword density calculated?",
      a: "Keyword density is calculated by dividing the number of times a keyword appears by the total number of words in the text, then multiplying by 100. The formula is: Density (%) = (Keyword Count ÷ Total Word Count) × 100. This tool applies that formula to every word in your text simultaneously and displays the results ranked by frequency.",
    },
    {
      q: "What is a good keyword density for SEO?",
      a: "There is no universally accepted ideal percentage, and Google has confirmed that keyword density is not a direct ranking factor. Most SEO practitioners treat 1–3% as a natural range for a primary keyword — dense enough to signal topical relevance, light enough to read naturally. This tool flags any term above 5% as potentially overused so you can review it, but whether to reduce it depends on context and readability, not a hard rule.",
    },
    {
      q: "What is the difference between keyword density and keyword frequency?",
      a: "Keyword frequency is the raw count of how many times a word appears — for example, 12 occurrences. Keyword density is that count expressed as a proportion of the total word count — for example, 12 occurrences in a 600-word article equals a 2% density. Frequency tells you the absolute count; density tells you the weight of that word relative to everything else in the text. Both metrics are shown in this tool's results table.",
    },
    {
      q: "Should I use stop-word filtering when analyzing content?",
      a: "For SEO keyword analysis, yes — enabling stop-word filtering almost always produces more useful results. Without it, common words like 'the,' 'is,' 'and,' and 'of' will dominate the results table, making it harder to see the meaningful keywords underneath. Turn filtering on to surface the content terms that actually contribute to topical relevance. Turn it off only when you specifically need to audit the full word distribution, such as checking readability or writing style.",
    },
    {
      q: "Can I track specific target keywords?",
      a: "Yes. Add one or more target keywords in the Target Keywords field and the tool highlights those terms in the results table, showing their count and density alongside the full word analysis. This is useful when you know which keywords you are trying to rank for and want to verify they appear with appropriate frequency before publishing.",
    },
    {
      q: "What does the overuse highlight mean?",
      a: "Any word with a density above 5% is flagged in the results table as potentially overused. This threshold is a review trigger, not a penalty indicator — it means the word appears frequently enough that you should read the surrounding sentences and judge whether the repetition sounds natural. If it reads fine, no change is needed. If it sounds mechanical, consider synonyms or restructuring a few sentences.",
    },
    {
      q: "Can I export keyword density results?",
      a: "Yes. Results can be exported as CSV for spreadsheet analysis and reporting, or as JSON for integration with content workflows and developer tools. The export includes each word, its count, and its density percentage — ready for client reports, content audits, or bulk comparisons across multiple pages.",
    },
    {
      q: "Does case-sensitive mode change the analysis?",
      a: "Yes, meaningfully. In default (case-insensitive) mode, 'SEO,' 'seo,' and 'Seo' are all counted as the same word. In case-sensitive mode, each variation is counted separately. This matters when your content contains proper nouns, brand names, or acronyms where capitalization carries distinct meaning — for example, distinguishing 'Apple' (the company) from 'apple' (the fruit).",
    },
    {
      q: "Is my text private when using this tool?",
      a: "Yes. All analysis runs entirely in your browser using JavaScript. Your text is never transmitted to any server, stored in any database, or accessible to anyone other than you. This means you can safely paste unpublished drafts, client content, or proprietary documents without any data leaving your device.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Paste your content", "Copy and paste your article, blog post, landing page copy, or any draft text into the editor. The analysis begins automatically as you type or paste — no submit button required."],
    ["Configure analysis options", "Choose your settings: toggle stop-word filtering to remove common filler words, enable case-sensitive mode if capitalization matters for your content, and set a minimum word length to exclude short words from the results."],
    ["Add target keywords", "Enter any specific keywords you want to track in the Target Keywords field, separated by commas. The tool highlights these terms in the results table so you can verify they appear with the right frequency."],
    ["Review the results table", "The table displays every word with its count, density percentage, and an overuse flag for terms above 5%. Sort by count or density to prioritize your review — highest-frequency terms first reveals your content's topical weight."],
    ["Scan the keyword chart", "The visual bar chart shows your top 10–15 keywords at a glance, making it easy to spot dominant terms or unexpected patterns without reading through the full table."],
    ["Adjust your content and re-analyze", "Make edits directly in your writing tool based on the findings, then re-paste to verify the changes. Repeat until keyword distribution matches your SEO strategy and the text reads naturally."],
    ["Export results", "Click Export CSV or Export JSON to download the full analysis for reporting, client handoff, or archiving in a content audit workflow."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Keyword Density Checker Tool?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>keyword density checker tool</strong> is a free online SEO analyzer that measures how
            frequently each word appears in your text and expresses it as a percentage of the total word count.
            It answers a question every SEO writer eventually asks: <em>am I using my target keywords enough — or too much?</em>
          </p>
          <p>
            The calculation is straightforward, but reading the results usefully requires filtering. Without stop-word
            removal, the results are dominated by "the," "and," "is," and other common words that carry no SEO weight.
            Without minimum word length controls, short prefixes and fragments clutter the table. Without target
            keyword tracking, you have to manually scan hundreds of rows to find the three terms you actually care about.
            This <strong>keyword density analyzer</strong> handles all of that in one workflow — paste your text, check
            your <strong>word density</strong>, and get export-ready results in seconds.
          </p>
          <p>
            Built for <strong>SEO writers, content strategists, copyeditors, agency teams, and bloggers</strong> who
            need fast, accurate keyword analysis before publishing. Paste any content and instantly see keyword density
            percentages, overuse flags, a visual keyword chart, and CSV/JSON export — all browser-based with no
            account required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Keyword Density Analysis Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The tool tokenizes your text — splitting it into individual words — then counts occurrences of each
            unique token and divides by the total word count. Every word gets a density score simultaneously.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Keyword Density (%)</span> = (Keyword Count ÷ Total Words) × 100</p>
              <p className="text-gray-500 text-xs mt-2">Example: "content" appears 9 times in a 450-word article → 9 ÷ 450 × 100 = <span className="text-green-600 font-semibold">2.0%</span></p>
            </div>
          </div>
          <p>Key concepts this tool applies on top of the base formula:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Stop-word filtering</strong> — removes common words (the, is, and, of) so results focus on meaningful terms</li>
            <li><strong>Minimum word length</strong> — excludes tokens shorter than your set threshold (default: 3 characters)</li>
            <li><strong>Case normalization</strong> — merges "SEO," "seo," and "Seo" into one count unless case-sensitive mode is on</li>
            <li><strong>Overuse threshold</strong> — flags any term above 5% density for manual review</li>
            <li><strong>Target keyword isolation</strong> — highlights specific terms you add so they stand out in results</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Keyword Density Checker
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time keyword density analysis as you type",
                "Word count, keyword count, and density % for every term",
                "Stop-word filtering to surface meaningful keywords",
                "Case-sensitive mode for brand and acronym precision",
                "Minimum word length control",
                "Target keyword tracking and highlighting",
                "Overuse flags for terms above 5% density",
                "Visual bar chart of top keywords",
                "Sortable results table",
                "Export to CSV and JSON",
                "Shareable URL",
                "100% browser-based — no data sent to any server",
                "No signup required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
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
              title: "SEO Blog Post Optimization",
              scenario: "A freelance writer is finishing a 1,200-word blog post targeting the phrase 'project management software.' She pastes the draft, adds 'project management' and 'software' as target keywords, and enables stop-word filtering. The results show 'project' at 3.1% and 'management' at 2.8% — solid. But 'software' appears at 6.4%, flagged as overused. She replaces three instances with 'tool' and 'platform,' bringing it to 3.2% and improving the natural flow of the article.",
            },
            {
              title: "Landing Page Copy Review",
              scenario: "A conversion copywriter is reviewing a 500-word SaaS landing page before it goes live. He pastes the copy and checks density without stop-word filtering to see every token. The word 'you' appears at 8.2% — high but intentional for direct-response copy. The word 'pricing' appears 0 times. He adds it twice in the features section, bringing the conversion-critical term to 0.4% and ensuring it appears on the page for both users and crawlers.",
            },
            {
              title: "Content Audit Reporting",
              scenario: "An in-house SEO manager is auditing 20 product description pages for an e-commerce client. For each page she pastes the content, exports the JSON results, and compares keyword density across pages in a spreadsheet. She identifies that 7 of the 20 pages have their primary category keyword below 0.5% — well under competitors averaging 1.8%. She flags those pages for a rewrite, with the density data as supporting evidence in the audit report.",
            },
            {
              title: "Competitive Content Analysis",
              scenario: "A content strategist is reverse-engineering a competitor's high-ranking article. He pastes the competitor's 2,400-word piece and enables stop-word filtering with a minimum word length of 4. The top 10 results reveal a cluster of semantically related terms — 'strategy,' 'planning,' 'roadmap,' 'milestone' — that his own draft doesn't include. He adds those terms to a content brief as required secondary keywords for the writer.",
            },
            {
              title: "Editorial Quality Check",
              scenario: "A senior editor at a content agency runs every submitted article through the checker before approval. A 900-word article submitted by a new writer shows 'important' at 4.7% and 'ensure' at 3.9% — both filler words that survived multiple drafts. The editor returns the piece with the density export attached, asking the writer to replace those instances with specific, concrete language. The revised version scores cleaner across the board.",
            },
            {
              title: "Multilingual Keyword Tracking",
              scenario: "A digital marketing consultant manages content for a client with both English and Spanish blog posts. For the Spanish content, she enables case-sensitive mode to correctly distinguish 'Como' (as a proper name) from 'como' (as a conjunction), and sets minimum word length to 4 to exclude Spanish prepositions. The target keyword 'marketing digital' appears across 11 uses in a 700-word post — a 1.6% density for each term, within the natural range she targets for the client's industry.",
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
                "Always check density after your final edit, not your first draft. First drafts tend to over-repeat because you're focused on ideas, not language variety. Run the checker as a final step, not a writing guide.",
                "Use the results table sorted by density descending, not count descending. A word that appears 15 times in a 300-word piece (5.0%) is a bigger problem than one that appears 15 times in a 1,500-word piece (1.0%). Density is the meaningful metric.",
                "For multi-keyword phrases like 'content marketing,' check each word individually. The checker analyzes single tokens, so 'content' and 'marketing' are counted separately. If both are at 2%, the phrase appears roughly 2% of the time — which is a good signal.",
                "When doing a competitor content analysis, remove the competitor's headings, navigation text, and footer before pasting. Those elements inflate word counts for common navigational terms and skew the density results for the actual article body.",
                "Use target keyword tracking for your primary, secondary, and LSI keywords at the same time. Adding all three sets lets you verify the entire keyword strategy in one analysis pass, rather than checking each term separately.",
                "Export JSON when you need to process results programmatically — for example, comparing density across 10 pages in a script. Export CSV when you need a spreadsheet for client reporting or content audits.",
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
                "Don't optimize for a specific density target as if it were a score to hit. There is no magic number. Targeting exactly 2% and editing purely to reach it produces mechanical writing. Use density as a diagnostic signal, not a goal.",
                "Don't skip stop-word filtering when your purpose is SEO analysis. Leaving it off makes 'the' (often 4–6%) and 'and' dominate the table, burying the meaningful terms you actually need to review.",
                "Don't assume a low-density primary keyword needs more repetitions. If your 1,200-word article uses your target keyword 8 times (0.67%), check whether related synonyms and semantic variants are present — Google understands topical clusters, not just exact match counts.",
                "Don't run the analysis on text that includes navigation menus, sidebars, or boilerplate footers. Those elements distort word counts and inflate density for generic terms like 'home,' 'about,' or 'contact.'",
                "Don't confuse keyword density with keyword prominence. A keyword appearing once in the first sentence carries more weight than three appearances buried in the final paragraph. Density measures frequency; placement is a separate optimization consideration.",
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

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Keyword Density Reference &amp; Industry Benchmarks
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Density Ranges by Use Case</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Density Range</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Interpretation</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["< 0.5%", "Under-represented", "Consider adding if term is important"],
                    ["0.5–1.0%", "Light presence", "Fine for secondary / LSI keywords"],
                    ["1.0–2.0%", "Natural range", "Typical primary keyword target"],
                    ["2.0–3.0%", "Prominent", "Acceptable; verify readability"],
                    ["3.0–5.0%", "Heavy use", "Review surrounding sentences for flow"],
                    ["> 5.0%", "Overuse flag", "Likely needs synonym variation"],
                  ].map(([range, label, action]) => (
                    <tr key={range} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{range}</td>
                      <td className="py-2 px-3 text-gray-700 text-xs font-medium">{label}</td>
                      <td className="py-2 px-3 text-gray-500 text-xs">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Formula Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Output</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Keyword Density", "(Count ÷ Total Words) × 100", "9 ÷ 450 × 100 = 2.0%"],
                    ["Word Count",      "Total tokens after split",     "450 words → 450"],
                    ["Keyword Count",   "Occurrences of exact token",  '"SEO" found 9 times'],
                    ["Overuse Flag",    "Density > 5.0%",               "5 ÷ 80 × 100 = 6.25% → flagged"],
                  ].map(([name, formula, example]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-primary text-xs uppercase tracking-wide">{name}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                      <td className="py-2 px-3 text-green-600 font-mono text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Density benchmarks are approximate guidelines. Actual optimal density varies by content type, topic, competition level, and writing style. Use as a review signal, not a fixed target.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Keyword Density Checker?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "✍️",
              title: "SEO Writers & Bloggers",
              desc: "Run every article through the checker before submitting. Catch overused terms, verify target keyword presence, and ensure the final draft balances topical clarity with natural language.",
            },
            {
              icon: "📊",
              title: "Content Strategists",
              desc: "Use density analysis to reverse-engineer competitor content, identify semantic keyword clusters missing from briefs, and set data-backed keyword targets for the writing team.",
            },
            {
              icon: "🏢",
              title: "SEO Agencies",
              desc: "Export CSV reports for client deliverables and content audits. Track keyword distribution across dozens of pages at once and present density findings alongside other on-page metrics.",
            },
            {
              icon: "🛒",
              title: "E-commerce Teams",
              desc: "Audit product descriptions and category pages for thin or keyword-stuffed copy. Ensure each product page covers its target terms at a natural frequency without repeating the same phrases mechanically.",
            },
            {
              icon: "✏️",
              title: "Editors & Proofreaders",
              desc: "Identify repetitive vocabulary patterns that survive manual editing. Use the overuse flag and keyword chart to pinpoint words that appear more often than a reader would notice consciously.",
            },
            {
              icon: "🎓",
              title: "Students & Academic Writers",
              desc: "Check essays, dissertations, and research papers for over-reliance on key terms. Improves writing variety and helps academic writers meet style guide recommendations on word repetition.",
            },
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
