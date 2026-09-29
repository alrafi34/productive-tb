import ToolFaq from "@/components/ToolFaq";
import { fancyTextGeneratorConfig } from "./config";

export default function FancyTextGeneratorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = fancyTextGeneratorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Fonts That Are Really Characters</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Social apps don&apos;t let you change the font of a bio or a post, but Unicode, the standard behind all digital text, includes several complete alphabets that look styled. Most come from the Mathematical Alphanumeric Symbols block, made for formulas; others are circled, squared, superscript or fullwidth letters.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>A (U+0041) → 𝐀 (U+1D400, Mathematical Bold Capital A)</p>
            <p>a (U+0061) → ⓐ (U+24D0, Circled Latin Small Letter A)</p>
            <p>a + U+0336 → a̶ (combining long stroke overlay)</p>
          </div>
          <p>Strikethrough, underline and slashed text add a combining mark after each letter instead of replacing it. Because these are different characters from ordinary letters, spell checkers, search and screen readers do not treat them as normal words.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Fancy Text Generator</h2>
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
