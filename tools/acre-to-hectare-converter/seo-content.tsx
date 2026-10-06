import Link from "next/link";
import ToolFaq from "@/components/ToolFaq";
import ValueLink from "@/components/ValueLink";
import { acreToHectareConverterConfig } from "./config";

const HA_PER_ACRE = 0.40468564224;

const fmt = (n: number, digits: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });

/* Whole-acre values people search for, from field to ranch sizes. */
const ACRE_ROWS = [
  ...Array.from({ length: 20 }, (_, i) => i + 1),
  25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 160, 200, 250, 300, 320,
  400, 500, 640, 800, 1000, 1500, 2000, 2500, 5000, 10000,
].map(String);

const HECTARE_ROWS = [0.5, 1, 2, 3, 4, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

export default function AcreToHectareConverterSEO({ onPick }: { onPick?: (value: string) => void }) {
  const { howToSteps, faq } = acreToHectareConverterConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Acre to Hectare Converter?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>acre to hectare converter</strong> is a free online tool that instantly converts
            any land area in acres to hectares (ha). The chart on this page also lists common
            <strong> hectares to acres</strong> values; for any other hectare figure, multiply by 2.47105
            or use the companion hectare to acre converter.
          </p>
          <p>
            The conversion is anchored to one fixed factor: <strong>1 acre = 0.404686 hectares</strong>,
            derived from the international definitions of both units (1 acre = 4,046.856 m², 1 ha =
            10,000 m²). The rough shortcut — divide acres by 2.5 — is only 1.2% off, but that error
            accumulates on large areas: on a 500-acre farm it understates the hectare count by about
            2.3 hectares. This tool applies the precise factor at up to 8 decimal places.
          </p>
          <p>
            Built for <strong>farmers comparing international land data, real estate agents working with
            cross-border property listings, land surveyors preparing documentation, agricultural
            researchers processing datasets, and anyone who regularly moves between imperial and metric
            land measurements</strong>. Free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Acre to Hectare Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Hectares</span> = Acres × 0.404686</p>
              <p><span className="font-semibold">Acres</span> = Hectares × 2.47105</p>
              <p className="text-gray-500 text-xs mt-2">Derived from: 1 acre = 4,046.856 m² and 1 ha = 10,000 m²</p>
              <p className="text-gray-500 text-xs">Factor: 4,046.856 ÷ 10,000 = <span className="text-green-600 font-semibold">0.404686</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 acre</strong> = 0.404686 ha = 4,046.86 m² = 43,560 sq ft</li>
            <li><strong>1 hectare</strong> = 2.47105 acres = 10,000 m² = 107,639 sq ft</li>
            <li><strong>640 acres</strong> = 259 hectares = 1 square mile (1 US section)</li>
            <li><strong>100 hectares</strong> = 247.105 acres = 1 km²</li>
            <li>Quick mental estimate: divide acres by <strong>2.5</strong> for approximate hectares (1.2% low)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acre to Hectare Converter
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
                "Instant acres to hectares conversion",
                "Hectares-to-acres reference table on the page",
                "2, 4, 6, and 8 decimal precision",
                "Presets: 1, 5, 10, 50, 100 acres",
                "Clickable chart from 1 to 10,000 acres",
                "Shareable links to any value, e.g. ?acres=160",
                "Land size context descriptions",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report",
                "Private: your inputs are not collected or stored",
                "No registration required",
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
              title: "Selling US Land to European Buyers",
              scenario: "A US ranch broker is marketing a 320-acre Montana property to European investors who think in hectares. 320 × 0.404686 = 129.5 hectares. The listing description reads: '320 acres (129.5 ha)'. European buyers immediately understand the scale — 129.5 hectares is larger than most European farms, making the size immediately legible without mental conversion. The broker uses this converter for every listing marketed internationally.",
            },
            {
              title: "UK Property Purchase Comparison",
              scenario: "A buyer in England is comparing three rural properties: 45 acres, 62 acres, and 38 acres. They want to understand the sizes in hectares for comparison with European farms they already own in France (recorded in hectares). 45 ac = 18.21 ha; 62 ac = 25.09 ha; 38 ac = 15.38 ha. Their French farm is 22 hectares — the 62-acre property is the closest in size and is the one they shortlist.",
            },
            {
              title: "Agricultural Yield Normalization",
              scenario: "A commodity analyst is comparing soybean yields from US farms (reported in bushels per acre) with Brazilian farms (reported in tonnes per hectare). Before yield comparison is possible, all areas must be in the same unit. A US farm report covering 2,400 acres: 2,400 × 0.404686 = 971.25 hectares. The yield comparison now uses hectares as the standard denominator across both datasets.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Conversion Charts ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Acres to Hectares Chart
        </h2>
        <p className="text-gray-600 mb-6">
          Click any acre value to load it into the converter. 100 hectares = 1 km².
        </p>
        <div className="grid md:grid-cols-3 gap-x-6">
          {[ACRE_ROWS.slice(0, 15), ACRE_ROWS.slice(15, 30), ACRE_ROWS.slice(30)].map((rows, col) => (
            <table key={col} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Acres</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Hectares</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">km²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((acres) => (
                  <tr key={acres} className="hover:bg-gray-50">
                    <td className="py-1 px-2 text-xs">
                      <ValueLink param="acres" value={acres} onPick={onPick}>{fmt(Number(acres), 0)}</ValueLink>
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-900">{fmt(Number(acres) * HA_PER_ACRE, 3)}</td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-500">{fmt((Number(acres) * HA_PER_ACRE) / 100, 4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Hectares to acres
            </h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Hectares</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Acres</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {HECTARE_ROWS.map((ha) => (
                  <tr key={ha} className="hover:bg-gray-50">
                    <td className="py-1 px-3 font-mono text-xs text-gray-700">{fmt(ha, 1)}</td>
                    <td className="py-1 px-3 text-right font-mono text-xs text-gray-900">{fmt(ha / HA_PER_ACRE, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Benchmarks
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-4">
              <li><strong>160 acres</strong> (64.75 ha) — a quarter section in the US Public Land Survey System.</li>
              <li><strong>640 acres</strong> (259 ha) — one section, exactly 1 square mile.</li>
              <li><strong>463 acres</strong> (187.4 ha) — average US farm (USDA Census of Agriculture, 2022).</li>
              <li><strong>17.4 ha</strong> (43 acres) — average EU farm (Eurostat farm structure survey, 2020).</li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Exact factor: 1 acre = 0.40468564224 ha. For hectares to acres with your own value, use the{" "}
              <Link href="/tools/land/hectare-to-acre-converter" className="text-primary hover:underline">hectare to acre converter</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />
    </>
  );
}
