import Link from "next/link";
import ToolFaq from "@/components/ToolFaq";
import ValueLink from "@/components/ValueLink";
import { acreToSquareFeetConverterConfig } from "./config";

const SQFT_PER_ACRE = 43560;
const M2_PER_ACRE = 4046.8564224;

const fmt = (n: number, digits: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });

/* 0.10 to 1.00 acre in 0.01 steps: the lot sizes people search for one by one. */
const LOT_ROWS = Array.from({ length: 91 }, (_, i) => ((i + 10) / 100).toFixed(2));

const WHOLE_ROWS: [string, string][] = [
  ["1", "About 90% of a football field between the goal lines"],
  ["2", ""],
  ["3", ""],
  ["4", ""],
  ["5", ""],
  ["10", "A square about 660 ft on each side"],
  ["20", ""],
  ["40", "Quarter-quarter section — 1/16 square mile"],
  ["80", "Half of a quarter section"],
  ["100", ""],
  ["160", "Quarter section — 1/4 square mile"],
  ["320", "Half section"],
  ["640", "One section — 1 square mile"],
];

export default function AcreToSquareFeetConverterSEO({ onPick }: { onPick?: (value: string) => void }) {
  const { howToSteps, faq } = acreToSquareFeetConverterConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Acres to Square Feet Converter
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>acres to square feet converter</strong> is a free online tool that instantly
            converts any land area in acres to its equivalent in square feet. Enter acres, get square
            feet — or pick a lot size from the chart below. The conversion uses the single exact factor:
            <strong> 1 acre = 43,560 square feet</strong>, applied to any decimal or whole-number input
            with up to 6 decimal places of precision.
          </p>
          <p>
            The conversion sounds simple, but the non-round factor makes it error-prone to do mentally.
            A quarter-acre lot is 10,890 sq ft — not 10,000 or 11,000. A half-acre is 21,780 sq ft,
            not 22,000. On a real estate transaction or permit application where property area must be
            exact, a rough mental estimate introduces errors that get embedded in legal documents. This
            tool applies the precise factor every time.
          </p>
          <p>
            Built for <strong>real estate agents converting property listing sizes, buyers evaluating
            land parcels, architects and contractors calculating buildable area from deed descriptions,
            agricultural planners working with field sizes, and anyone who encounters acreage in listings
            and needs to visualize it in square feet</strong>. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Acres to Square Feet Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Square Feet</span> = Acres × 43,560</p>
              <p><span className="font-semibold">Acres</span> = Square Feet ÷ 43,560</p>
              <p className="text-gray-500 text-xs mt-2">Origin: 1 acre = 10 square chains = 10 × (66 ft)² = 43,560 sq ft — exact, no rounding</p>
              <p className="text-gray-500 text-xs">Also: 1 acre = 4,840 sq yd = 4,046.856 m² = 0.404686 hectares</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 acre</strong> = 43,560 sq ft = 4,840 sq yd = 208.71 ft × 208.71 ft (if square)</li>
            <li><strong>0.25 acres</strong> = 10,890 sq ft — the standard US quarter-acre residential lot</li>
            <li><strong>0.5 acres</strong> = 21,780 sq ft — half-acre suburban or semi-rural lot</li>
            <li><strong>1 sq mile</strong> = 640 acres = 27,878,400 sq ft</li>
            <li>Quick mental estimate: multiply acres by <strong>44,000</strong> (1% high) — fine for rough checks, not for legal docs</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acre to Square Feet Converter
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
                "Instant acres to square feet conversion",
                "0, 2, 4, and 6 decimal precision options",
                "Presets: 0.25, 0.5, 1, 5, 10 acres",
                "Comma-formatted output for large numbers",
                "Clickable chart from 0.10 to 1.00 acre and up to 640 acres",
                "Shareable links to any value, e.g. ?acres=0.25",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report as text",
                "Press Esc to clear the input",
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
              title: "Evaluating a Residential Lot Listing",
              scenario: "A buyer sees a suburban listing described as '0.34 acres' and wants to know if the yard is large enough for a pool and detached garage. They enter 0.34 into the converter: 0.34 × 43,560 = 14,810 sq ft. The house footprint is 2,200 sq ft. Remaining lot area: 14,810 − 2,200 = 12,610 sq ft — enough for a 500 sq ft pool area and a 600 sq ft garage with room to spare. The buyer proceeds with the offer.",
            },
            {
              title: "Permit Application for a New Build",
              scenario: "An architect is preparing a site plan for a 1.2-acre residential development parcel. The zoning ordinance allows a maximum building coverage of 25% of the lot area, expressed in square feet on the permit form. 1.2 × 43,560 = 52,272 sq ft total. 25% coverage limit: 52,272 × 0.25 = 13,068 sq ft maximum footprint. The architect sizes the house and attached garage to 12,400 sq ft combined — under the limit — and submits the permit.",
            },
            {
              title: "Agricultural Seed and Fertilizer Planning",
              scenario: "A market gardener is planting a 3.5-acre field of sweet corn. The seed supplier lists coverage rates in square feet per bag (1 bag per 1,000 sq ft at recommended spacing). 3.5 × 43,560 = 152,460 sq ft. At 1,000 sq ft per bag: 152,460 ÷ 1,000 = 152.46 bags — ordered as 153 bags. Fertilizer application rate is 0.5 lb per 100 sq ft: 152,460 × 0.005 = 762.3 lbs required.",
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
          Acres to Square Feet Chart
        </h2>
        <p className="text-gray-600 mb-6">
          Click any acre value to load it into the converter. The square side is the length of each side
          if the lot were a perfect square — a quick way to picture the size.
        </p>
        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          0.10 to 1.00 acre (residential lot sizes)
        </h3>
        <div className="grid md:grid-cols-3 gap-x-6">
          {[LOT_ROWS.slice(0, 30), LOT_ROWS.slice(30, 60), LOT_ROWS.slice(60)].map((rows, col) => (
            <table key={col} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Acres</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Sq ft</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Square side</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((acres) => (
                  <tr key={acres} className="hover:bg-gray-50">
                    <td className="py-1 px-2 text-xs">
                      <ValueLink param="acres" value={acres} onPick={onPick}>{acres}</ValueLink>
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-900">{fmt(Number(acres) * SQFT_PER_ACRE, 1)}</td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-500">{fmt(Math.sqrt(Number(acres) * SQFT_PER_ACRE), 1)} ft</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Whole acres, farms and survey sections
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Square feet</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Square meters</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {WHOLE_ROWS.map(([acres, note]) => (
                <tr key={acres} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs">
                    <ValueLink param="acres" value={acres} onPick={onPick}>{acres}</ValueLink>
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-900">{fmt(Number(acres) * SQFT_PER_ACRE, 0)}</td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-900">{fmt(Number(acres) * M2_PER_ACRE, 0)}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Exact factors: 1 acre = 43,560 sq ft = 4,046.856 m². Sections follow the US Public Land Survey
          System. Going the other way? Use the{" "}
          <Link href="/tools/land/square-feet-to-acre-converter" className="text-primary hover:underline">square feet to acres converter</Link>.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />
    </>
  );
}
