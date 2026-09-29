import ToolFaq from "@/components/ToolFaq";
import { anagramFinderConfig } from "./config";

// Word families that are all anagrams of each other (checked against the finder's dictionary)
const FAMILIES: string[][] = [
  ["listen", "silent", "enlist", "tinsel", "inlets"],
  ["evil", "live", "vile", "veil"],
  ["stressed", "desserts"],
  ["heart", "earth", "hater"],
  ["night", "thing"],
  ["dusty", "study"],
  ["angel", "glean", "angle"],
  ["cheater", "teacher"],
];

const PHRASES: [string, string][] = [
  ["dormitory", "dirty room"],
  ["astronomer", "moon starer"],
  ["the eyes", "they see"],
  ["conversation", "voices rant on"],
  ["a gentleman", "elegant man"],
  ["eleven plus two", "twelve plus one"],
];

export default function AnagramFinderSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = anagramFinderConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How the Anagram Finder Works</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Two words are <strong>anagrams</strong> when they contain exactly the same letters the same number of times. A quick test is to sort the letters of each: <code>listen</code> and <code>silent</code> both become <code>eilnst</code>.</p>
          <p>To find words, the tool counts the letters you type and checks every word in a 63,000-word English dictionary against those counts. A word qualifies if it needs no more of any letter than you have; each <code>?</code> covers one missing letter. Words that use every letter are true anagrams and are listed first; the rest are grouped by length, with everyday words ahead of rare ones.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Famous Anagram Families</h2>
        <ul className="space-y-2 text-gray-700">
          {FAMILIES.map((f) => (
            <li key={f[0]} className="font-mono text-sm">{f.join(" · ")}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Phrase Anagrams</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-gray-100">
              {PHRASES.map(([a, b]) => (
                <tr key={a} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono text-sm text-gray-900">{a}</td>
                  <td className="py-1.5 px-3 text-gray-400">→</td>
                  <td className="py-1.5 px-3 font-mono text-sm text-gray-700">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Test any of these in the checker above: it ignores spaces, punctuation and capital letters.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Anagram Finder</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-400 mt-6">Word list: SCOWL, copyright 2000–2016 Kevin Atkinson, used under its permissive licence (<a href="/data/anagram-words-LICENSE.txt" className="underline">full notice</a>).</p>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
