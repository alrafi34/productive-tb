import ToolFaq from "@/components/ToolFaq";
import { leetspeakConverterConfig } from "./config";

// Letter → [light, standard, hardcore (this tool), other common forms]
const ALPHABET: [string, string, string, string, string][] = [
  ["A", "4", "4", "4", "@  /-\\  /\\"],
  ["B", "", "8", "8", "|3  13"],
  ["C", "", "", "(", "<  ©  ["],
  ["D", "", "", "|)", "|]  cl"],
  ["E", "3", "3", "3", "€  &"],
  ["F", "", "", "|=", "ph  |#"],
  ["G", "", "6", "6", "9  &"],
  ["H", "", "", "#", "|-|  ]-["],
  ["I", "1", "1", "1", "!  |"],
  ["J", "", "", "_|", "_/"],
  ["K", "", "", "|<", "|{"],
  ["L", "", "1", "1", "|_  £"],
  ["M", "", "", "/\\/\\", "|\\/|  ^^"],
  ["N", "", "", "|\\|", "/\\/  ^/"],
  ["O", "0", "0", "0", "()  []"],
  ["P", "", "", "|>", "|*  |o"],
  ["Q", "", "", "0_", "(,)"],
  ["R", "", "", "|2", "12  |?"],
  ["S", "5", "5", "5", "$  z"],
  ["T", "7", "7", "7", "+  †"],
  ["U", "", "", "|_|", "(_)"],
  ["V", "", "", "\\/", ""],
  ["W", "", "", "\\/\\/", "vv  \\^/"],
  ["X", "", "", "><", "}{"],
  ["Y", "", "", "`/", "j"],
  ["Z", "", "2", "2", "7_"],
];

const SLANG: [string, string][] = [
  ["n00b / noob", "A beginner, often used teasingly"],
  ["pwned", "Beaten or taken over; from a typo of 'owned'"],
  ["w00t", "An exclamation of joy"],
  ["h4x0r", "Hacker"],
  ["teh", "'The', from a common typo"],
  ["l33t / 1337", "Elite, highly skilled"],
];

export default function LeetspeakConverterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = leetspeakConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";
  const td = "py-1.5 px-3 font-mono text-xs text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Leetspeak Works</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong>Leetspeak</strong> replaces letters with numbers and symbols that look like them. It grew out of 1980s bulletin board systems, where users swapped letters to show they were part of the &ldquo;elite&rdquo; and to slip past simple word filters, and it spread through hacker, gaming and early internet culture.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Light:&nbsp;&nbsp;&nbsp;&nbsp;Hello World&nbsp;→ H3ll0 W0rld</p>
            <p>Standard: Hello World&nbsp;→ H3110 W0r1d</p>
            <p>Hardcore: Hello World&nbsp;→ #3110 \/\/0|21|)</p>
          </div>
          <p>The lighter the style, the easier it is to read. Light leet only swaps the vowels and a few consonants that already look like digits; hardcore builds every letter from symbols, which looks striking but can be hard to read without practice.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Leetspeak Alphabet Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className={th}>Letter</th>
                <th className={th}>Light</th>
                <th className={th}>Standard</th>
                <th className={th}>Hardcore</th>
                <th className={th}>Other forms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ALPHABET.map(([letter, light, std, hard, other]) => (
                <tr key={letter} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-semibold text-gray-900">{letter}</td>
                  <td className={td}>{light || "–"}</td>
                  <td className={td}>{std || "–"}</td>
                  <td className={td}>{hard}</td>
                  <td className={td}>{other || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">&ldquo;–&rdquo; means the letter is left as it is in that style. Random mode also uses @ for A, € for E, ! for I, () for O, $ for S and + for T.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Leet Words</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-gray-100">
              {SLANG.map(([word, meaning]) => (
                <tr key={word} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono text-sm text-gray-900 whitespace-nowrap">{word}</td>
                  <td className="py-1.5 px-3 text-sm text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Leetspeak Translator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
