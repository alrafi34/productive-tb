import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";
import { UPSIDE_DOWN_MAP } from "./logic";

const LOWER = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const OTHER = "0123456789!?.,'\"&()_".split("");

export default function SEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const grid = (chars: string[]) => (
    <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
      {chars.map((ch) => (
        <div key={ch} className="rounded-lg border border-gray-100 bg-gray-50 py-2 text-center">
          <div className="text-xs text-gray-500">{ch}</div>
          <div className="text-lg text-gray-900">{UPSIDE_DOWN_MAP[ch] ?? ch}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Upside-Down Text Is Made</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Turning text upside down takes two steps. First, each letter is replaced by a Unicode character that looks like the letter rotated 180°. Then the order of the characters is reversed, because the last letter of a word ends up on the left when you turn it over.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Original:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello World!</p>
            <p>Letters turned: Hǝꞁꞁo Moɹꞁp¡</p>
            <p>Reversed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¡pꞁɹoM oꞁꞁǝH</p>
          </div>
          <p>Some letters are their own upside-down version (o, s, x, z, H, I, N, O, S, X, Z and the digits 0 and 8), and some pairs simply swap: b and q, d and p, n and u, M and W, 6 and 9. The rest borrow symbols from the International Phonetic Alphabet (ɐ, ǝ, ɹ, ʇ), maths (∀, ⊥, ∩) and other scripts.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Upside-Down Alphabet</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Lowercase</h3>
            {grid(LOWER)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Uppercase</h3>
            {grid(UPPER)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Numbers and punctuation</h3>
            {grid(OTHER)}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Characters such as ᄅ, ㄣ and ㄥ need fonts for East Asian scripts; almost every phone and computer has them, but a few older devices may show a box instead.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Upside-Down Text Generator</h2>
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
