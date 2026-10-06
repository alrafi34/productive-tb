import Link from "next/link";
import ToolFaq from "@/components/ToolFaq";
import ValueLink from "@/components/ValueLink";
import { hectareToAcreConverterConfig } from "./config";

const ACRES_PER_HA = 2.4710538147;
const SQFT_PER_HA = 107639.1042;

const fmt = (n: number, digits: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });

/* Hectare values people look up: tenths of a hectare, then whole hectares,
   then farm and estate sizes. */
const HA_ROWS = [
  ...Array.from({ length: 10 }, (_, i) => ((i + 1) / 10).toFixed(1)),
  ...Array.from({ length: 19 }, (_, i) => String(i + 2)),
  "25", "30", "40", "50", "60", "75", "100", "150", "200", "250", "300", "400", "500", "750", "1000", "2500",
];

export default function HectareToAcreConverterSEO({ onPick }: { onPick?: (value: string) => void }) {
  const { howToSteps, faq } = hectareToAcreConverterConfig.seo;


  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Hectare to Acre Converter?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>hectare to acre converter</strong> is a free online tool that instantly converts
            any land area value between hectares (ha) and acres — in both directions. Enter hectares
            and get acres; use the Swap button and enter acres to get hectares. One tool covers the
            full <strong>ha to acres</strong> and <strong>acres to hectares</strong> conversion without
            needing separate calculators.
          </p>
          <p>
            The conversion is anchored to a single fixed relationship: <strong>1 hectare =
            2.47105 acres</strong>, derived from the international definitions of both units
            (1 ha = 10,000 m², 1 acre = 4,046.856 m²). Despite being a simple multiplication,
            the non-round factor means approximations quickly accumulate error — 10 hectares rounded
            to "about 25 acres" is off by over 1 acre from the correct 24.7105. This tool applies
            the precise factor to any input, at up to 8 decimal places.
          </p>
          <p>
            Built for <strong>farmers comparing international land data, real estate agents working
            with cross-border property listings, land surveyors preparing documentation, agricultural
            researchers processing datasets, and anyone who regularly encounters both metric and
            imperial land measurements</strong>. Free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Hectare to Acre Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Acres</span> = Hectares × 2.47105</p>
              <p><span className="font-semibold">Hectares</span> = Acres × 0.404686</p>
              <p className="text-gray-500 text-xs mt-2">Derived from: 1 ha = 10,000 m² and 1 acre = 4,046.856 m²</p>
              <p className="text-gray-500 text-xs">Factor: 10,000 ÷ 4,046.856 = <span className="text-green-600 font-semibold">2.47105</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 hectare</strong> = 2.47105 acres = 10,000 m² = 107,639 sq ft</li>
            <li><strong>1 acre</strong> = 0.404686 ha = 4,046.86 m² = 43,560 sq ft</li>
            <li><strong>100 hectares</strong> = 247.105 acres = 1 km²</li>
            <li><strong>640 acres</strong> = 259 hectares = 1 square mile (1 US section)</li>
            <li>Quick mental estimate: multiply hectares by <strong>2.5</strong> (1.2% high — fine for rough checks)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Hectare to Acre Converter
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
                "Instant ha to acres conversion",
                "Reverse conversion: acres to hectares",
                "2, 4, 6, and 8 decimal precision",
                "Presets: 1, 5, 10, 50, 100 ha",
                "Clickable chart from 0.1 to 2,500 ha",
                "Shareable links to any value, e.g. ?ha=2.5",
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
              title: "International Farm Comparison",
              scenario: "An agricultural researcher is comparing yields from European farms (reported in tonnes per hectare) with US farms (bushels per acre), so every farm area has to be in the same unit first. A 450-hectare farm in Germany is 450 × 2.47105 = 1,111.97 acres; a 1,200-acre farm in Iowa is 1,200 × 0.404686 = 485.62 hectares.",
            },
            {
              title: "Cross-Border Real Estate Listing",
              scenario: "A UK estate agency is listing a 8.5-hectare rural property for an American buyer who is accustomed to acres. 8.5 × 2.47105 = 21.00 acres. The agent adds both values to the listing: '8.5 hectares (21.0 acres)' — immediately legible to both metric and imperial markets. The reverse is equally common: a buyer asking about a 55-acre US ranch needs to know it is 22.26 hectares for comparison with European land they already own.",
            },
            {
              title: "Food Production and Yield Reporting",
              scenario: "An agronomist is reporting wheat yield data for a 2,500-hectare operation to an international commodity trader who uses acres. 2,500 × 2.47105 = 6,177.63 acres. The 3.8 tonne/hectare yield becomes: 3.8 × 0.404686 = 1.538 tonne/acre (or approximately 57 bushels/acre at standard wheat density). Both the area and yield conversions depend on the precise 2.47105 factor — not the approximate 2.5 shortcut.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Conversion Chart ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Hectares to Acres Chart
        </h2>
        <p className="text-gray-600 mb-6">
          Click any hectare value to load it into the converter. 1 ha = 10,000 m² = 2.47105 acres; a FIFA-size
          soccer pitch (105 × 68 m) is about 0.71 ha.
        </p>
        <div className="grid md:grid-cols-3 gap-x-6">
          {[HA_ROWS.slice(0, 15), HA_ROWS.slice(15, 30), HA_ROWS.slice(30)].map((rows, col) => (
            <table key={col} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Hectares</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Acres</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Sq ft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((ha) => (
                  <tr key={ha} className="hover:bg-gray-50">
                    <td className="py-1 px-2 text-xs">
                      <ValueLink param="ha" value={ha} onPick={onPick}>{fmt(Number(ha), 1)}</ValueLink>
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-900">{fmt(Number(ha) * ACRES_PER_HA, 3)}</td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-500">{fmt(Number(ha) * SQFT_PER_HA, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Exact factors: 1 ha = 10,000 m² = 2.4710538 acres = 107,639.1 sq ft. Going the other way? Use the{" "}
          <Link href="/tools/land/acre-to-hectare-converter" className="text-primary hover:underline">acres to hectares converter</Link>.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
