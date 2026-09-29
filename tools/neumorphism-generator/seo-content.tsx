import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const EXAMPLES: { label: string; css: string; style: React.CSSProperties }[] = [
  { label: "Raised", css: "box-shadow: -8px -8px 16px #ffffff,\n            8px 8px 16px #b3b3b3;", style: { background: "#e0e0e0", boxShadow: "-8px -8px 16px #ffffff, 8px 8px 16px #b3b3b3" } },
  { label: "Pressed", css: "box-shadow: inset -8px -8px 16px #ffffff,\n            inset 8px 8px 16px #b3b3b3;", style: { background: "#e0e0e0", boxShadow: "inset -8px -8px 16px #ffffff, inset 8px 8px 16px #b3b3b3" } },
];

export default function NeumorphismSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Neumorphism Works</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong>Neumorphism</strong> (new + skeuomorphism) makes flat interfaces look soft and physical. The trick is that the element has <em>exactly the same color as its background</em>; only two shadows separate it from the surface. Imagine a light in the top-left corner: the top-left edge catches a highlight and the bottom-right edge casts a shadow.</p>
          <div className="grid sm:grid-cols-2 gap-6 rounded-lg p-6" style={{ background: "#e0e0e0" }}>
            {EXAMPLES.map(({ label, css, style }) => (
              <div key={label} className="space-y-3">
                <div className="h-24 rounded-2xl flex items-center justify-center text-sm font-medium text-gray-600" style={style}>{label}</div>
                <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">{css}</pre>
              </div>
            ))}
          </div>
          <p>The light shadow is the background brightened by the intensity percentage and the dark shadow is the background darkened by the same amount. Both are offset by the distance in opposite directions and blurred by about twice the distance for a smooth edge.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Design Tips and Accessibility</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed list-disc pl-5">
          <li><strong>Use a mid-light, low-saturation background.</strong> Off-whites and light grays (#e0e0e0 to #f0f0f0) show both shadows; pure white loses the highlight and saturated colors look muddy.</li>
          <li><strong>Keep it for surfaces, not for everything.</strong> Neumorphic cards and panels work well; a whole interface of soft buttons becomes hard to scan.</li>
          <li><strong>Give actions a second signal.</strong> Soft shadows alone rarely reach the 3:1 contrast WCAG asks for on control boundaries, so add a colored icon, a label with strong contrast or a visible focus ring.</li>
          <li><strong>Make pressed states obvious.</strong> Switching to inset shadows is subtle; pair it with a color or icon change for toggles and selected items.</li>
        </ul>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Neumorphism Generator</h2>
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
