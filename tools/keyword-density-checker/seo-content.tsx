import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function KeywordDensityCheckerSEO() {
  const { howToSteps, faq } = toolConfig.seo;


  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Keyword Density Checker?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>keyword density checker</strong> is a free online SEO tool that measures how
            frequently each word appears in your text and expresses it as a percentage of the total word count.
            It answers the question every SEO writer eventually asks: <em>am I using my target keywords enough — or too much?</em>
          </p>
          <p>
            The calculation is straightforward, but reading the results usefully requires filtering. Without stop-word
            removal, the results are dominated by "the," "and," "is," and other words that carry no SEO weight.
            Without minimum word length controls, short fragments clutter the table. Without target keyword tracking,
            you have to manually scan hundreds of rows to find the three terms you actually care about.
            This <strong>word density checker</strong> handles all of that in one workflow — paste your text,
            check keyword and word density instantly, spot <strong>keyword stuffing</strong> before it goes live,
            and get export-ready results in seconds.
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
          How Keyword Density and Word Density Analysis Works
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
            <li><strong>Target keywords</strong> — each word or phrase you add gets its own count and density, with a note if it is missing</li>
            <li><strong>Phrases</strong> — two- and three-word phrases used at least twice, counted within sentences</li>
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
              {howToSteps.map(({ name: title, text: desc }, i) => (
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
                "Word density checker — frequency ranked by count and %",
                "Keyword stuffing checker — overuse flags above 5% density",
                "Stop-word filtering to surface meaningful keywords",
                "Case-sensitive mode for brand and acronym precision",
                "Minimum word length control",
                "Two- and three-word phrase density",
                "Target keywords and phrases with their own count and density",
                "Visual bar chart of top keywords",
                "Sortable results table",
                "Export to CSV and JSON",
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

      {/* ── 4. Worked Examples ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "SEO Blog Post Optimization",
              scenario: "A writer is finishing a 1,200-word post about project management software. She pastes the draft, turns on stop-word filtering and adds project, management and software as target words. Project is at 3.1% and management at 2.8%, but software is at 6.4% and flagged as overused, so she swaps three uses for tool and platform and brings it down to about 3%.",
            },
            {
              title: "Landing Page Copy Review",
              scenario: "A conversion copywriter is reviewing a 500-word SaaS landing page before it goes live. He pastes the copy and checks density without stop-word filtering to see every token. The word 'you' appears at 8.2% — high but intentional for direct-response copy. The word 'pricing' appears 0 times. He adds it twice in the features section, bringing the conversion-critical term to 0.4% and ensuring it appears on the page for both users and crawlers.",
            },
            {
              title: "Editorial Quality Check",
              scenario: "A senior editor at a content agency runs every submitted article through the checker before approval. A 900-word article submitted by a new writer shows 'important' at 4.7% and 'ensure' at 3.9% — both filler words that survived multiple drafts. The editor returns the piece with the density export attached, asking the writer to replace those instances with specific, concrete language. The revised version scores cleaner across the board.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Table ── */}
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

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
