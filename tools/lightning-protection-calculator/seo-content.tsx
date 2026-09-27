import ToolFaq from "@/components/ToolFaq";
import { lightningProtectionCalculatorConfig } from "./config";

export default function LightningProtectionCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = lightningProtectionCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const levels: [string, string, string, string][] = [
    ["I", "E > 0.95", "20 m", "5 m × 5 m"],
    ["II", "0.90 < E ≤ 0.95", "30 m", "10 m × 10 m"],
    ["III", "0.80 < E ≤ 0.90", "45 m", "15 m × 15 m"],
    ["IV", "0 < E ≤ 0.80", "60 m", "20 m × 20 m"],
  ];

  const coefficients: [string, string, string][] = [
    ["Residential building", "0.5", "1"],
    ["Commercial or public building", "0.5", "3"],
    ["Industrial / flammable contents", "0.5", "5"],
    ["Critical service (hospital, data center)", "0.5", "10"],
    ["Isolated structure in open ground", "1", "1"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What This Lightning Risk Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Whether a building needs a lightning protection system depends on how often it is likely to be struck and how
            much risk its use can tolerate. This calculator applies the simplified risk assessment of
            <strong> IEC 62305-2</strong> and <strong>NFPA 780 Annex L</strong>: it estimates the building&apos;s
            collection area, the expected number of direct strikes per year and the tolerable number, and, where
            protection is recommended, the protection level from I (highest) to IV.
          </p>
          <p>
            It is a screening estimate. Building codes, insurers and the full IEC 62305-2 assessment of risk to life,
            services and property can require protection even where this estimate says it is optional.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The Method</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Collection area</span>: Ad = L × W + 6H(L + W) + 9πH²</p>
            <p><span className="font-semibold">Expected strikes per year</span>: Nd = Ng × Ad × Cd × 10⁻⁶</p>
            <p><span className="font-semibold">Tolerable strikes per year</span>: Nc = 1.5 × 10⁻³ ÷ C</p>
            <p><span className="font-semibold">Required efficiency</span>: E = 1 − Nc ÷ Nd (protection recommended when Nd &gt; Nc)</p>
          </div>
          <p className="text-sm">
            Ng is the ground flash density (flashes per km² per year), H the height and L × W the footprint in meters,
            Cd the location factor (0.5 when surrounded by similar buildings, 1 when isolated) and C the product of the
            NFPA 780 coefficients for construction, contents, occupancy and consequence of a strike.
          </p>
          <p className="text-sm">
            Example: a 150 m² house 8 m high has Ad ≈ 3,100 m². With Ng = 2 and Cd = 0.5, Nd ≈ 0.0031 strikes a year
            (about once in 320 years), against Nc = 0.0015, so E ≈ 52% and protection level IV is recommended.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Coefficients Used for Each Structure</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Structure</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Location factor Cd</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Coefficient C</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coefficients.map(([s, cd, c]) => (
                <tr key={s} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{s}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{cd}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Protection Levels</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Level</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Required efficiency</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Rolling sphere radius</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Mesh size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {levels.map(([l, e, r, m]) => (
                <tr key={l} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{l}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{e}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{r}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Rolling sphere radii and mesh sizes from IEC 62305-3. NFPA 780 uses a 46 m (150 ft) rolling sphere for
          ordinary structures.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Lightning Risk Calculator</h2>
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
