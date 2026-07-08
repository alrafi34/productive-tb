export default function WordCounterSEOContent() {
  const faqItems = [
    {
      q: "What is a word counter?",
      a: "A word counter is an online tool that analyzes a block of text and reports key writing metrics — total words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Unlike the word count feature built into Microsoft Word or Google Docs, a browser-based word counter works on any text from any source: copied web content, draft emails, social media posts, or raw notes — without needing to open a document editor.",
    },
    {
      q: "How does word count affect SEO?",
      a: "Word count is not a direct Google ranking factor, but content length correlates strongly with rankings because longer content tends to cover a topic more thoroughly. Most pages that rank on page 1 for competitive keywords have 1,000–2,500 words. For blog posts and pillar pages, 1,500–2,500 words is the commonly recommended target. For product pages and landing pages, 300–800 words is typically enough. Use this tool to check your article length before publishing and compare it against the top-ranking pages for your target keyword.",
    },
    {
      q: "How is reading time calculated?",
      a: "Reading time is estimated by dividing the total word count by 200 — the average adult silent reading speed in words per minute. So a 1,000-word article takes approximately 5 minutes to read. This is a useful signal for email subject lines ('5-min read'), blog post headers, newsletter planning, and YouTube script timing. The result is always rounded up to the nearest minute.",
    },
    {
      q: "What is the difference between character count with and without spaces?",
      a: "Character count with spaces includes every character in the text, including spaces, tabs, and line breaks. Character count without spaces excludes all whitespace, counting only visible characters like letters, numbers, and punctuation. Most social media platforms (Twitter/X, LinkedIn, Instagram captions) count characters with spaces. Some programming environments and file size checks use without-spaces counts. This tool provides both so you can match whichever limit applies.",
    },
    {
      q: "What word count should a blog post be?",
      a: "It depends on the topic and competition. For informational content competing in Google search, 1,500–2,500 words is a reliable target for most niches. Short-form listicles and news posts can rank at 600–900 words. Long-form guides and pillar pages often exceed 3,000 words. The best approach: search your target keyword, check the word counts of the top 3 results using this tool, and aim to match or modestly exceed them while keeping every section genuinely useful.",
    },
    {
      q: "How many words should a Twitter (X) post be?",
      a: "Twitter/X has a 280-character limit for standard accounts and 25,000 characters for X Premium (Blue) subscribers. The average tweet is around 33 characters. For maximum engagement, tweets between 71–100 characters tend to perform best. Use the character count (with spaces) display in this tool to check tweet length before posting.",
    },
    {
      q: "What word count is ideal for an essay?",
      a: "Essay length depends entirely on the assignment instructions. High school essays are typically 500–1,000 words. University undergraduate essays range from 1,500–3,000 words. Graduate and doctoral essays can run 5,000–10,000+ words. This tool is designed to handle all of these ranges — paste your full draft and the word count updates instantly so you can trim or expand to hit the exact required length.",
    },
    {
      q: "Does this word counter work offline?",
      a: "Once the page is loaded, the word counting itself runs entirely in your browser using JavaScript — no internet connection is needed for the counting to continue working. However, you do need an internet connection to initially load the page.",
    },
    {
      q: "Is my text stored or sent to a server?",
      a: "No. All analysis runs locally in your browser. The text you type or paste is never sent to any external server, stored in a database, or used for any purpose. This makes the tool safe for checking confidential drafts, client work, legal documents, or any sensitive writing.",
    },
    {
      q: "How do I count words in a PDF?",
      a: "To count words in a PDF, open the PDF in your browser or a PDF viewer, select all text (Ctrl+A or Cmd+A), copy it (Ctrl+C or Cmd+C), then paste it into this word counter. The tool will instantly report the word count, character count, and reading time for the entire document. Note that PDFs with scanned images instead of selectable text will not have copyable content — in that case you'll need an OCR tool first.",
    },
  ];

  const howToSteps = [
    ["Paste or type your text", "Click inside the editor and paste text from your clipboard (Ctrl+V / Cmd+V) or start typing directly. The counter updates with every keystroke — no submit button needed."],
    ["Read the live metric panel", "Check the word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time — all displayed at once above or beside the editor."],
    ["Compare against your target", "If you have a minimum or maximum word count requirement (for an essay, SEO article, or social post), compare the displayed count against that target and adjust your content accordingly."],
    ["Trim or expand as needed", "Delete or add content in the editor and watch the counts update in real time. This makes it easy to hit exact word count targets without manual counting."],
    ["Copy the final content", "Once your text meets its target length and structure, copy it from the editor and paste it into your publishing destination — Google Docs, WordPress, email client, or anywhere else."],
  ];

  return (
    <>

      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Word Counter?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>word counter online</strong> is a free writing tool that lets you <strong>count words</strong> in
            real time and reports the metrics that matter most before publishing: total words, characters (with and
            without spaces), sentences, paragraphs, and estimated reading time. Unlike the word count feature buried
            in Microsoft Word or Google Docs, a browser-based tool works on <em>any text from any source</em> —
            drafted emails, pasted web content, social media copy, or raw notes — without needing to open a document
            editor.
          </p>
          <p>
            The problem that writers, students, SEO professionals, and marketers run into is simple: nearly every
            writing context has a length requirement, and those requirements vary wildly. An academic <strong>essay
            word counter</strong> check has a strict word floor and ceiling. An SEO blog post needs to compete on
            length with top-ranking pages. A LinkedIn post performs best under 1,300 characters. A tweet must stay
            under 280. Checking all of these manually — by copying text into different tools or relying on document
            editors — breaks workflow and wastes time.
          </p>
          <p>
            This tool solves that by combining five core text metrics in a single interface that updates as you type.
            It is built for <strong>writers, students, bloggers, SEO professionals, content marketers, copywriters,
            social media managers, and editors</strong> who need an accurate count immediately, without creating an
            account or installing anything.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Word Counter Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every metric in this tool is derived from the raw text string in the editor using a distinct counting
            method. Each definition matters — different platforms and style guides count differently.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Definitions</p>
            <ul className="space-y-1 text-sm font-mono text-gray-700">
              <li><strong>Word</strong> — a continuous sequence of non-whitespace characters, split by spaces, tabs, or line breaks</li>
              <li><strong>Character (with spaces)</strong> — every character including whitespace</li>
              <li><strong>Character (no spaces)</strong> — every character excluding all whitespace</li>
              <li><strong>Sentence</strong> — text segment ending with a period, exclamation mark, or question mark</li>
              <li><strong>Paragraph</strong> — a block of text separated by one or more blank lines</li>
              <li><strong>Reading time</strong> — word count ÷ 200 (avg. adult reading speed), rounded up to nearest minute</li>
            </ul>
          </div>
          <p>
            All processing runs client-side in JavaScript. When you type or paste text, the counts recalculate on
            every input event with no server round-trip. This means there is no delay, no data upload, and no usage
            limit — the tool is as fast as your browser.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Word Counter to Count Words Online
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What the Tool Tracks</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Total word count — updates on every keystroke",
                "Character count with spaces — for platform character limits",
                "Character count without spaces — for programming and file specs",
                "Sentence count — for readability and structure review",
                "Paragraph count — for long-form content structure",
                "Estimated reading time — for audience effort planning",
                "All processing is local — text never leaves your browser",
                "No sign-up, no account, no usage cap",
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
          Real-World Use Cases: Essays, SEO, and More
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Academic Essays and Assignments",
              scenario: "A university student needs to submit a 2,500-word essay with a ±10% tolerance. They paste their draft into the word counter and see they are at 2,210 words — 290 short. Rather than guessing which sections need expanding, they review the paragraph count to find which sections are thinnest and add depth there. Recheck confirms 2,490 words — within range before submitting.",
            },
            {
              title: "SEO Blog Post Optimization",
              scenario: "An SEO writer is targeting the keyword 'project management tools' and knows the top-ranking competitors average 2,100 words. They draft the article in Notion, copy the full text here, and check the count mid-draft at 1,340 words. They identify the 'Use Cases' section as underdeveloped, expand it with two additional scenarios, and hit 2,080 words before publishing.",
            },
            {
              title: "Social Media Copy Preparation",
              scenario: "A social media manager drafts a LinkedIn post for a product launch. LinkedIn recommends keeping posts under 1,300 characters for full display before the 'see more' cutoff. The manager pastes the draft here, checks character count with spaces (1,480 — too long), trims two sentences, and rechecks at 1,290 characters before scheduling.",
            },
            {
              title: "Email Newsletter Planning",
              scenario: "A content marketer sends a weekly newsletter and wants to keep reading time under 3 minutes to reduce unsubscribes. They paste the draft into the word counter, see the reading time is 5 minutes at 1,050 words, and cut the two least essential sections down to reach 580 words and a 3-minute read. Open rates improve the following month.",
            },
            {
              title: "Freelance Content Rate Calculation",
              scenario: "A freelance writer charges per word and uses this tool to verify the exact count of every delivered article before invoicing. Pasting the final draft shows 1,847 words — they invoice for 1,847 at their agreed rate with a screenshot for transparency, avoiding disputes with clients about count discrepancies from different tools.",
            },
            {
              title: "Technical Documentation Review",
              scenario: "A developer writing API documentation needs each endpoint description to stay under 150 words for the reference sidebar. They paste each description section individually into the tool to confirm it meets the length constraint before committing it to the repository. The sentence count also helps them check if any section is grammatically fragmented.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
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
                "Use reading time — not just word count — when planning newsletter or email content. A 600-word email at 3 minutes is typically the upper limit before open-to-click rates drop.",
                "For SEO content, search your target keyword, open the top 3 ranking pages, copy each into the tool, and note the word count. Then aim to match or slightly exceed the average — not to hit some generic '2,000 words is best' rule.",
                "Character count without spaces is more useful than with spaces when checking code comments, database field lengths, or SMS message bodies, which have strict byte limits.",
                "The paragraph count is a useful structural sanity check for long articles. A 2,000-word post with only 3 paragraphs signals wall-of-text issues even before reading it.",
                "Paste your writing brief, outline, or client spec into the tool to set a word count baseline, then delete it and paste your actual draft to see how much you have filled.",
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
                "Don't pad content to hit a word count target — adding filler sentences to reach 2,000 words when 1,400 words cover the topic fully will hurt readability and dwell time, both of which affect rankings.",
                "Don't assume all word counters agree. Different tools handle hyphenated words, numbers with units, and special characters differently. Use one consistent tool and stick to it for client work.",
                "Don't ignore the character count when writing for platforms with limits. Twitter counts emoji as 2 characters, and URLs are shortened to t.co links (23 characters each) regardless of actual length.",
                "Don't use word count as a proxy for quality. A 3,000-word article that says nothing useful will rank below a 900-word article that answers the question directly and completely.",
                "Don't skip the sentence count when editing. A very high sentence count relative to word count (short sentences throughout) can signal choppy, staccato writing. A very low count signals run-on sentences.",
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

      {/* ── 6. Platform Word & Character Limits Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Platform Word &amp; Character Limits Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform / Context</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Limit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Twitter / X (standard)", "280", "Characters (with spaces)", "Emoji = 2 chars; URLs = 23 chars (t.co)"],
                ["Twitter / X Premium", "25,000", "Characters", "Long-form posts for X Blue subscribers"],
                ["LinkedIn post", "3,000", "Characters", "Truncated after ~1,300 chars without 'see more'"],
                ["LinkedIn headline", "220", "Characters", "Shown in search results and connection requests"],
                ["Instagram caption", "2,200", "Characters", "Truncated after ~125 chars in feed view"],
                ["Meta (Facebook) post", "63,206", "Characters", "Effective limit; posts >500 chars see less engagement"],
                ["Google Search meta description", "155–160", "Characters", "Truncated in SERPs beyond this; affects CTR"],
                ["Google Search title tag", "50–60", "Characters", "Truncated in SERPs at ~580px display width"],
                ["Email subject line", "40–60", "Characters", "Optimal for mobile preview; 9–14 words typical"],
                ["SMS message", "160", "Characters", "Single SMS segment; longer messages cost more to send"],
                ["Academic abstract (general)", "150–300", "Words", "Varies by journal and institution guidelines"],
                ["High school essay (typical)", "500–1,000", "Words", "Varies by assignment; check instructions"],
                ["Undergraduate essay (typical)", "1,500–3,000", "Words", "Varies by course and level"],
                ["SEO blog post (competitive)", "1,500–2,500", "Words", "Match top-3 competitor length for target keyword"],
                ["Long-form pillar page", "3,000–6,000+", "Words", "Comprehensive topic coverage for link attraction"],
              ].map(([platform, limit, type, notes]) => (
                <tr key={platform} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800 text-xs">{platform}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{limit}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{type}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Platform limits are subject to change. Check official documentation for the most current values.
        </p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Word Counter?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "✍️",
              title: "Writers & Bloggers",
              desc: "Track article length against SEO targets, check section balance, and confirm content meets publishing guidelines before submitting to editors or CMS platforms.",
            },
            {
              icon: "🎓",
              title: "Students",
              desc: "Verify essays, reports, and research papers hit required word counts before submission. Quickly check whether a section is too short or the overall draft is over the limit.",
            },
            {
              icon: "📈",
              title: "SEO Professionals",
              desc: "Benchmark content length against top-ranking competitors, plan content briefs with target word ranges, and audit existing pages for thin content before optimization.",
            },
            {
              icon: "📣",
              title: "Content Marketers",
              desc: "Plan newsletters by reading time, check social media copy against platform character limits, and ensure every piece of content fits its distribution channel before scheduling.",
            },
            {
              icon: "💼",
              title: "Copywriters",
              desc: "Hit client-specified word counts for landing pages, product descriptions, and ads. Use character count to stay within Google Ads headline (30 chars) and description (90 chars) limits.",
            },
            {
              icon: "🛠️",
              title: "Developers & Technical Writers",
              desc: "Check documentation length, validate comment word counts, and verify that API description fields stay within database or UI character constraints during content audits.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
