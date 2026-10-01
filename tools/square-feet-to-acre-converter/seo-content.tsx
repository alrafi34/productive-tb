import Link from "next/link";
import ToolFaq from "@/components/ToolFaq";
import ValueLink from "@/components/ValueLink";
import { squareFeetToAcreConverterConfig } from "./config";

const SQFT_PER_ACRE = 43560;

const fmt = (n: number, digits: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });

/* Lot and building sizes people search for: 500 to 10,000 sq ft in steps of
   500, then 1,000, then 5,000, then a few large parcels. */
const SQFT_ROWS = [
  ...Array.from({ length: 20 }, (_, i) => (i + 1) * 500),
  ...Array.from({ length: 10 }, (_, i) => 11000 + i * 1000),
  ...Array.from({ length: 16 }, (_, i) => 25000 + i * 5000),
  150000, 200000, 250000, 500000, 1000000,
].map(String);

/* Official playing-area dimensions; areas in sq ft. */
const FAMILIAR: [string, number, string][] = [
  ["Tennis court (doubles)", 2808, "78 × 36 ft"],
  ["Basketball court (NBA)", 4700, "94 × 50 ft"],
  ["Ice hockey rink (NHL)", 17000, "200 × 85 ft, before rounding the corners"],
  ["American football field with end zones", 57600, "360 × 160 ft"],
  ["Soccer pitch (FIFA recommended)", 76854, "105 × 68 m"],
];

export default function SquareFeetToAcreConverterSEO({ onPick }: { onPick?: (value: string) => void }) {
  const { howToSteps, faq } = squareFeetToAcreConverterConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Square Feet to Acres Converter
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>square feet to acres converter</strong> is a free online tool that instantly converts
            any land or property area in square feet to its equivalent in acres — and handles the reverse
            direction too. Enter square feet, get acres. The conversion uses one exact factor:
            <strong> 1 acre = 43,560 square feet</strong>, applied to any input at up to 6 decimal places.
          </p>
          <p>
            Property deeds, survey plats, and real estate listings frequently switch between square feet and
            acres without explanation. A 10,890 sq ft lot is a quarter acre. A 43,560 sq ft parcel is
            exactly 1 acre. A permit application that asks for lot area in acres when the deed says
            "87,120 square feet" requires a precise conversion — not a mental estimate. The non-round
            divisor (43,560) makes mental math error-prone; this tool applies the exact factor every time.
          </p>
          <p>
            Built for <strong>home buyers reading listing data, real estate agents preparing comparisons,
            architects calculating site coverage, contractors sizing permits, agricultural planners
            working with field areas, and anyone who encounters square footage and needs the acreage</strong>.
            Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Square Feet to Acres Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Acres</span> = Square Feet ÷ 43,560</p>
              <p><span className="font-semibold">Square Feet</span> = Acres × 43,560</p>
              <p className="text-gray-500 text-xs mt-2">Origin: 1 acre = 10 square chains = 10 × (66 ft)² = 43,560 sq ft — exact, no rounding</p>
              <p className="text-gray-500 text-xs">Also: 1 acre = 4,840 sq yd = 4,046.856 m² = 0.404686 hectares</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>10,890 sq ft</strong> = 0.25 acres — the standard US quarter-acre residential lot</li>
            <li><strong>21,780 sq ft</strong> = 0.5 acres — half-acre suburban lot</li>
            <li><strong>43,560 sq ft</strong> = 1 acre — the definition; also roughly a football field without end zones</li>
            <li><strong>87,120 sq ft</strong> = 2 acres — typical small farm parcel or large suburban estate</li>
            <li>Quick mental estimate: divide sq ft by <strong>44,000</strong> (underestimates by ~1%) — fine for rough checks, not legal docs</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Square Feet to Acres Converter
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
                "Instant sq ft to acres conversion",
                "Reverse conversion: acres to square feet",
                "0, 2, 4, and 6 decimal precision options",
                "Presets: 10,890 / 21,780 / 43,560 / 87,120 sq ft",
                "Comma-formatted output for large numbers",
                "Clickable chart from 500 to 1,000,000 sq ft",
                "Shareable links to any value, e.g. ?sqft=10890",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report as text",
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
              title: "Reading a Property Survey",
              scenario: "A buyer receives a survey plat that describes a residential lot as 13,068 square feet. They want to know the acreage to compare with other listings quoted in acres. 13,068 ÷ 43,560 = 0.3000 acres exactly — a 30% of an acre lot. Comparing with a nearby listing at 0.28 acres (12,197 sq ft), they confirm the surveyed lot is larger by 871 sq ft before making their offer.",
            },
            {
              title: "Commercial Leasing Comparison",
              scenario: "A retail tenant is comparing two commercial spaces: 8,400 sq ft in one building and a second site listed as 0.19 acres. To compare directly, they convert 0.19 acres × 43,560 = 8,276 sq ft. The first space is 124 sq ft larger. At $28/sq ft annual rent, that difference is $3,472 per year — a factor worth knowing before negotiations.",
            },
            {
              title: "Agricultural Field Planning",
              scenario: "A market gardener maps a 65,000 sq ft growing area from a GPS survey app that outputs square feet. Their seed supplier quotes seeding rates per acre. 65,000 ÷ 43,560 = 1.4927 acres. At 15 lbs of seed per acre, they need 1.4927 × 15 = 22.39 lbs — ordered as 23 lbs. Without the conversion, ordering by rough estimate would have under- or over-ordered by a full bag.",
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
          Square Feet to Acres Chart
        </h2>
        <p className="text-gray-600 mb-6">
          Click any square-foot value to load it into the converter. Acres are rounded to four decimal places.
        </p>
        <div className="grid md:grid-cols-3 gap-x-6">
          {[SQFT_ROWS.slice(0, 17), SQFT_ROWS.slice(17, 34), SQFT_ROWS.slice(34)].map((rows, col) => (
            <table key={col} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Sq ft</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">Acres</th>
                  <th className="text-right py-2 px-2 font-semibold text-gray-700">% of acre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((sqft) => (
                  <tr key={sqft} className="hover:bg-gray-50">
                    <td className="py-1 px-2 text-xs">
                      <ValueLink param="sqft" value={sqft} onPick={onPick}>{fmt(Number(sqft), 0)}</ValueLink>
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-900">{fmt(Number(sqft) / SQFT_PER_ACRE, 4)}</td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-gray-500">{fmt((Number(sqft) / SQFT_PER_ACRE) * 100, 1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          How big is that? Familiar areas in acres
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Area</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Square feet</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Acres</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FAMILIAR.map(([name, sqft, size]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-800">{name}</td>
                  <td className="py-1.5 px-3 text-right text-xs">
                    <ValueLink param="sqft" value={String(sqft)} onPick={onPick}>{fmt(sqft, 0)}</ValueLink>
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-900">{fmt(sqft / SQFT_PER_ACRE, 3)}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-500">{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Exact factor: 1 acre = 43,560 sq ft. Going the other way? Use the{" "}
          <Link href="/tools/land/acre-to-square-feet-converter" className="text-primary hover:underline">acres to square feet converter</Link>.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />
    </>
  );
}
