import ToolFaq from "@/components/ToolFaq";
import { landPriceCalculatorConfig } from "./config";

export default function LandPriceCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = landPriceCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const perAcre: [string, string, string, string][] = [
    ["$5,000", "$0.11", "$12,355", "$1.24"],
    ["$25,000", "$0.57", "$61,776", "$6.18"],
    ["$100,000", "$2.30", "$247,105", "$24.71"],
    ["$250,000", "$5.74", "$617,763", "$61.78"],
    ["$500,000", "$11.48", "$1,235,527", "$123.55"],
  ];

  const units: [string, string, string][] = [
    ["1 acre", "43,560 sq ft", "4,046.9 m²"],
    ["1 hectare", "107,639 sq ft", "10,000 m² (2.471 acres)"],
    ["1 square meter", "10.764 sq ft", "1 m²"],
    ["1 Decimal", "435.6 sq ft", "40.47 m² (1/100 acre)"],
    ["1 Katha", "720 sq ft", "66.9 m²"],
    ["1 Bigha", "14,400 sq ft", "1,337.8 m²"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What This Land Price Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Land is priced per acre for rural parcels and farmland, per square foot for building lots, and per square
            meter or hectare in most of Europe. Listings rarely use the same unit, so comparing them by hand means
            converting first. This <strong>land price calculator</strong> multiplies the area by the price per unit
            and converts between units for you, so a 0.25 acre lot quoted at $11 per square foot and a 1 acre parcel
            at $120,000 per acre can be compared directly.
          </p>
          <p>
            Enter the area in acres, square feet, square meters or hectares, the price per unit in dollars, euros,
            pounds, Canadian or Australian dollars, and read the total. Comparison mode prices two plots side by
            side.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Land Price Is Calculated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-1.5">
            <p><span className="font-semibold">Total price</span> = area (in the rate&apos;s unit) × price per unit</p>
            <p><span className="font-semibold">Price per sq ft</span> = price per acre ÷ 43,560</p>
            <p><span className="font-semibold">Price per m²</span> = price per hectare ÷ 10,000</p>
          </div>
          <ul className="space-y-2 ml-4 list-disc">
            <li>2.5 acres at $48,000 per acre = <strong>$120,000</strong>.</li>
            <li>A 0.25 acre lot (10,890 sq ft) at $11 per sq ft = <strong>$119,790</strong>.</li>
            <li>600 m² at €250 per m² = <strong>€150,000</strong>.</li>
          </ul>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Land Price Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Price per Acre, Square Foot and Hectare</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Per acre</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Per sq ft</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Per hectare</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Per m²</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {perAcre.map(([a, b, c, d]) => (
                <tr key={a} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-xs text-gray-900">{a}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{b}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{c}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Land Units Used by the Calculator</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Unit</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Square feet</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Square meters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {units.map(([u, ft, m]) => (
                <tr key={u} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{u}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{ft}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Decimal, Katha and Bigha are traditional units from Bangladesh and eastern India, included for plots measured in
          them; Katha and Bigha vary by region, so check the local value.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Tips Before You Buy Land</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "Compare listings in the same unit: a lot that looks cheap per acre can be expensive per buildable square foot.",
            "Check zoning, setbacks and minimum lot sizes, which decide what you can build and how much of the lot is usable.",
            "Budget for connections: water, sewer or septic, power and a driveway can cost tens of thousands on raw land.",
            "Look at recent comparable sales, not asking prices, and get a survey to confirm the boundaries and area.",
            "Add closing costs, title insurance or conveyancing, and any transfer taxes to the purchase price.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
