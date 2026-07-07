export default function KeywordDensityCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Keyword Density Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Start</h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Paste Your Content", "Paste your article, blog post, landing page, or product description into the text area."],
                ["Adjust Options", "Set minimum word length, toggle stop-word filtering, and choose your n-gram analysis mode."],
                ["Search a Keyword", "Enter a specific keyword or phrase to instantly see its count and density."],
                ["Export Results", "Download a full CSV or TXT report, or copy the summary to your clipboard."],
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
                "Single-word, 2-word, and 3-word phrase analysis",
                "Automatic stop-word filtering",
                "Specific keyword / phrase search",
                "Full content statistics (words, chars, reading time)",
                "SEO density warnings",
                "Sortable keyword table",
                "Export CSV, TXT, and JSON reports",
                "100% private — nothing leaves your browser",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Keyword Density Formula
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">
            Keyword Density (%) = (Keyword Count ÷ Total Words) × 100
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Keyword</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Count</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Words</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Density</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SEO",        "3",  "11",  "27.27%"],
                ["content",    "5",  "500", "1.00%"],
                ["marketing",  "8",  "400", "2.00%"],
                ["keywords",   "12", "600", "2.00%"],
                ["Google",     "4",  "350", "1.14%"],
              ].map(([kw, count, total, density]) => (
                <tr key={kw} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{kw}</td>
                  <td className="py-2.5 px-4 font-mono">{count}</td>
                  <td className="py-2.5 px-4 font-mono">{total}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{density}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is keyword density?", a: "Keyword density is the percentage of times a keyword appears in a piece of content relative to the total word count. It's calculated as (keyword count ÷ total words) × 100. It's used to understand how prominent a keyword is in your content and whether it might be over-optimized." },
            { q: "What is the ideal keyword density for SEO?", a: "There is no perfect keyword density. Google has repeatedly stated it does not use keyword density as a direct ranking factor. However, most SEO practitioners recommend keeping primary keywords between 0.5% and 2.5%. Going above 4–5% may be interpreted as keyword stuffing, which can harm rankings." },
            { q: "What is keyword stuffing?", a: "Keyword stuffing is the practice of overloading a page with keywords in an attempt to manipulate search rankings. It results in unnatural-sounding content and is penalized by Google. A density above 4–5% for any single keyword is generally considered excessive. Focus on writing naturally for readers first." },
            { q: "What are stop words?", a: "Stop words are common function words like 'the', 'a', 'is', 'of', 'and', 'to' that carry little SEO meaning. Most keyword density analyzers exclude them to focus on meaningful content words. This tool's stop-word filter removes 150+ common English stop words automatically when enabled." },
            { q: "What is n-gram analysis?", a: "N-gram analysis looks at sequences of n words rather than individual words. Bigrams are 2-word phrases (e.g., 'content marketing'), and trigrams are 3-word phrases (e.g., 'search engine optimization'). Analyzing these helps identify long-tail keyword opportunities and unintentional phrase repetition." },
            { q: "How is reading time calculated?", a: "Reading time is estimated at 238 words per minute, which is the average adult silent reading speed. Speaking time uses 130 words per minute. Both are approximations — actual times vary based on content complexity, formatting, and the individual reader." },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Tool?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "✍️", title: "Content Writers",    desc: "Check that target keywords appear with appropriate frequency before publishing, without tipping into keyword stuffing." },
            { icon: "🔍", title: "SEO Specialists",    desc: "Audit on-page keyword distribution across articles, product pages, and landing pages to support technical SEO audits." },
            { icon: "📱", title: "Digital Marketers",  desc: "Optimize ad copy, email campaigns, and social media content to ensure messaging stays on-topic and search-relevant." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Analyze client content at scale, generate exportable density reports, and make data-driven content recommendations." },
            { icon: "🛍️", title: "Ecommerce Stores",  desc: "Optimize product descriptions and category pages to include relevant keywords without over-optimization penalties." },
            { icon: "🎓", title: "Students",           desc: "Learn SEO fundamentals and understand how keyword frequency influences content quality and search visibility." },
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
