import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

// Computed with this tool's own conversion functions
const COLORS: [string, string, string, string, string][] = [
  ["Red", "#FF0000", "rgb(255, 0, 0)", "hsl(0, 100%, 50%)", "0, 100, 100, 0"],
  ["Orange", "#FFA500", "rgb(255, 165, 0)", "hsl(39, 100%, 50%)", "0, 35, 100, 0"],
  ["Teal", "#008080", "rgb(0, 128, 128)", "hsl(180, 100%, 25%)", "100, 0, 0, 50"],
  ["Navy", "#000080", "rgb(0, 0, 128)", "hsl(240, 100%, 25%)", "100, 100, 0, 50"],
  ["Gray", "#808080", "rgb(128, 128, 128)", "hsl(0, 0%, 50%)", "0, 0, 0, 50"],
  ["White", "#FFFFFF", "rgb(255, 255, 255)", "hsl(0, 0%, 100%)", "0, 0, 0, 0"],
];

const FORMATS: [string, string, string][] = [
  ["HEX", "#FF5733", "Web and CSS; compact and easy to copy"],
  ["HEX + alpha", "#FF573380", "CSS with transparency (last two digits)"],
  ["RGB / RGBA", "rgb(255 87 51 / 50%)", "Screens; CSS, JavaScript, image editors"],
  ["HSL / HSLA", "hsl(11 100% 60%)", "CSS themes: change lightness to make shades"],
  ["HSV / HSB", "11°, 80%, 100%", "Color pickers in Photoshop, Figma, Sketch"],
  ["CMYK", "0%, 66%, 80%, 0%", "Print: cyan, magenta, yellow and black ink"],
];

export default function ColorFormatConverterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Color Formats and Where They Are Used</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Screens make color by mixing red, green and blue light, so HEX, RGB, HSL and HSV are all different ways of writing the same RGB color. CMYK is different: it describes how much cyan, magenta, yellow and black ink to put on paper, so converting to it is an approximation.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>HEX → RGB:&nbsp; #FF5733 → FF, 57, 33 → 255, 87, 51</p>
            <p>RGB → CMYK: K = 1 − max(R′, G′, B′); C = (1 − R′ − K) ÷ (1 − K)</p>
          </div>
          <p>R′, G′ and B′ are the RGB values divided by 255; M and Y follow the same pattern as C.</p>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className={th}>Format</th><th className={th}>Example</th><th className={th}>Used for</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FORMATS.map(([f, ex, use]) => (
                <tr key={f} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs font-semibold text-gray-900">{f}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{ex}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Colors in Every Format</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className={th}>Color</th><th className={th}>HEX</th><th className={th}>RGB</th><th className={th}>HSL</th><th className={th}>CMYK %</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COLORS.map(([name, hex, rgb, hsl, cmyk]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">
                    <span className="inline-block w-3 h-3 rounded-sm border border-gray-300 mr-2 align-middle" style={{ backgroundColor: hex }} />
                    {name}
                  </td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{hex}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{rgb}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{hsl}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{cmyk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Color Converter</h2>
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
