import ToolFaq from "@/components/ToolFaq";
import { hectareToAcreConverterConfig } from "./config";

export default function HectareToAcreConverterSEO() {
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
            imperial land measurements</strong>. Browser-based, free, no signup required.
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
                "Full reference table (common values both directions)",
                "Land size context descriptions",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report",
                "100% browser-based — no data sent to server",
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

      {/* ── 5. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Hectare to Acre Conversion Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Hectares → Acres</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Hectares (ha)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.1",   "0.2471",   "Small garden plot"],
                    ["0.25",  "0.6178",   "Quarter hectare"],
                    ["0.5",   "1.2355",   "Half hectare"],
                    ["1",     "2.4711",   "1 football pitch (approx)"],
                    ["2",     "4.9421",   "Smallholding"],
                    ["2.5",   "6.1776",   "Typical small farm field"],
                    ["5",     "12.355",   "Small farm"],
                    ["10",    "24.711",   "Medium farm parcel"],
                    ["20",    "49.421",   "Large field"],
                    ["50",    "123.55",   "Small estate"],
                    ["100",   "247.11",   "1 km² = 100 ha"],
                    ["250",   "617.76",   "Medium farm"],
                    ["500",   "1235.5",   "Large farm"],
                    ["1000",  "2471.1",   "Large estate / ranch"],
                    ["10000", "24711",    "National park scale"],
                  ].map(([ha, ac, ctx]) => (
                    <tr key={ha} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{ha} ha</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{ac}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acres → Hectares</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Hectares (ha)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.25",  "0.1012",  "Quarter acre lot"],
                    ["0.5",   "0.2023",  "Half acre"],
                    ["1",     "0.4047",  "Standard acre"],
                    ["2",     "0.8094",  "Large residential lot"],
                    ["5",     "2.0234",  "Small farm plot"],
                    ["10",    "4.0469",  "Medium farm field"],
                    ["25",    "10.117",  "Small farm"],
                    ["50",    "20.234",  "Medium farm"],
                    ["100",   "40.469",  "Large farm"],
                    ["247",   "99.957",  "≈ 100 hectares"],
                    ["320",   "129.5",   "Half section (US)"],
                    ["640",   "259.0",   "1 section = 1 sq mile"],
                    ["1000",  "404.69",  "Large ranch"],
                    ["5000",  "2023.4",  "Very large estate"],
                    ["10000", "4046.9",  "Large agricultural region"],
                  ].map(([ac, ha, ctx]) => (
                    <tr key={ac} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{ac} ac</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{ha}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">* All values use the exact factor: 1 ha = 2.47105 acres. Rounded to 4 decimal places for display.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
