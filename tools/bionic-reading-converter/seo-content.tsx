import ToolFaq from "@/components/ToolFaq";
import { bionicReadingConverterConfig } from "./config";

const SAMPLE = "Reading is a habit that grows stronger with practice";

// Bold the first `share` of every word, rounding up, as the tool does
function bionic(text: string, share: number) {
  return text.split(" ").map((w, i) => {
    const n = Math.max(1, Math.ceil(w.length * share));
    return (
      <span key={i}>
        <strong>{w.slice(0, n)}</strong>
        {w.slice(n)}{" "}
      </span>
    );
  });
}

export default function SEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = bionicReadingConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Bionic Reading Works</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>When you read, your eyes do not glide smoothly along a line: they jump from word to word in quick movements called <em>saccades</em> and pause briefly on each <em>fixation</em>. Bionic Reading bolds the start of every word to give each fixation an anchor, on the theory that the brain recognises the rest of a familiar word from its first letters.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 text-gray-900 space-y-3">
            <p className="text-xs text-gray-500">30% bold</p>
            <p>{bionic(SAMPLE, 0.3)}</p>
            <p className="text-xs text-gray-500">50% bold</p>
            <p>{bionic(SAMPLE, 0.5)}</p>
          </div>
          <p>The bold share is rounded up, so a three-letter word at 50% gets two bold letters. Numbers are left alone, and you can choose to leave short words such as <em>a</em>, <em>of</em> and <em>the</em> in regular weight.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What the Research Says</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>Bionic Reading went viral in 2022 with claims of faster reading, but controlled tests have not backed that up. Peer-reviewed studies comparing it with ordinary text, and large online reading-speed tests, found no reliable improvement in reading speed or comprehension for the average reader.</p>
          <p>That does not mean it is useless for everyone. Reading comfort is personal, and some people, including some with ADHD, say the bold anchors help them keep their place or stay engaged with long text. The best test is your own: time yourself reading a page in each style and see which you prefer.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Bionic Reading Converter</h2>
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
