import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const H2 = "text-2xl font-semibold text-gray-900";
const HEADING = { fontFamily: "var(--font-heading)" };
const SECTION = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

/* Word counts that usually stand behind an assignment or format. Typical
   ranges, not rules: the brief always wins. */
const LENGTHS: [string, string, string][] = [
  ["Tweet-length summary", "35–55 words", "About 280 characters"],
  ["Meta description", "20–25 words", "About 155–160 characters"],
  ["College application essay (Common App)", "250–650 words", "Common App personal statement limit"],
  ["High school essay", "500–1,000 words", ""],
  ["Undergraduate essay", "1,500–3,000 words", ""],
  ["Blog post", "800–2,000 words", "Long guides often run past 2,500"],
  ["5-minute speech", "600–750 words", "At 125–150 words per minute"],
  ["Academic abstract", "150–300 words", "Set by the journal or school"],
];

const WORDS_TO_PAGES = [250, 500, 750, 1000, 1500, 2000, 2500, 3000, 5000];

export default function WordCounterSEOContent() {
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className={`mt-12 ${SECTION.replace("mt-8 ", "")}`}>
        <h2 className={`${H2} mb-4`} style={HEADING}>What This Word Counter Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Paste or type any text and the counter shows <strong>words, characters with and without spaces,
            sentences and paragraphs</strong> as you type. Below the counts it works out what those numbers
            mean in practice: <strong>reading and speaking time, how many pages the text fills</strong>, how
            close you are to a <strong>word goal</strong>, whether it fits common <strong>character
            limits</strong> such as a meta description or an X post, and which words you repeat most.
          </p>
          <p>
            We do not collect or store what you enter. The text is never uploaded; your draft and goal are kept in this
            browser&apos;s storage so they are still there if you close the tab, and the Reset button clears them.
          </p>
        </div>
      </section>

      {/* ── 2. How It Counts ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-4`} style={HEADING}>How Each Number Is Counted</h2>
        <ul className="space-y-2 text-gray-600 leading-relaxed list-disc ml-5">
          <li><strong>Words</strong> — runs of non-space characters separated by spaces, tabs or line breaks. &quot;Well-known&quot; is one word; &quot;e.g.&quot; is one word.</li>
          <li><strong>Characters</strong> — every character, including spaces and line breaks. An emoji or accented letter counts as one.</li>
          <li><strong>Sentences</strong> — groups ending in a period, question mark or exclamation mark, so abbreviations like &quot;Dr.&quot; add one.</li>
          <li><strong>Paragraphs</strong> — blocks separated by a blank line.</li>
          <li><strong>Reading time</strong> — words ÷ 200 per minute, a typical adult silent-reading pace.</li>
          <li><strong>Speaking time</strong> — words ÷ 130 per minute, a comfortable presentation pace.</li>
          <li><strong>Pages</strong> — about 500 words single-spaced or 250 double-spaced, assuming 12 pt type and 1-inch margins.</li>
          <li><strong>Most used words</strong> — case-insensitive counts, optionally skipping common words like &quot;the&quot; and &quot;and&quot;.</li>
        </ul>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>How to Use the Word Counter</h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name: title, text: desc }, i) => (
            <li key={i} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                {i + 1}
              </span>
              <span><strong>{title}:</strong> {desc}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 4. Reference ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>Typical Lengths and Words to Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Format</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical length</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {LENGTHS.map(([format, length, note]) => (
                  <tr key={format}>
                    <td className="py-2 px-3 text-gray-800">{format}</td>
                    <td className="py-2 px-3 font-mono text-primary font-semibold whitespace-nowrap">{length}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">Typical ranges only — an assignment brief or style guide always takes priority.</p>
          </div>
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Words</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Single</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Double</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {WORDS_TO_PAGES.map((w) => (
                  <tr key={w}>
                    <td className="py-1.5 px-3 font-mono text-gray-800">{w.toLocaleString("en-US")}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">{w / 500}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">{w / 250}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">Pages at 12 pt, 1-inch margins.</p>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <ToolFaq items={faq} />
    </>
  );
}
