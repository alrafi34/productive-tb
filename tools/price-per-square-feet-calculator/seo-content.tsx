import ToolFaq from "@/components/ToolFaq";
import { pricePerSquareFeetCalculatorConfig } from "./config";

export default function PricePerSquareFeetCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = pricePerSquareFeetCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const examples: [string, string, string, string][] = [
    ["3-bed house", "$450,000", "2,000 sq ft", "$225 / sq ft ($2,422 / m²)"],
    ["City apartment", "€320,000", "85 m²", "€3,765 / m² (€350 / sq ft)"],
    ["London flat", "£550,000", "70 m²", "£7,857 / m² (£730 / sq ft)"],
    ["Building lot", "$120,000", "0.25 acre (10,890 sq ft)", "$11.02 / sq ft"],
    ["Farmland", "$60,000", "2 hectares", "$3.00 / m² ($12,141 / acre)"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Why Price per Square Foot Matters</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Two homes or plots at different prices and sizes are hard to compare until you divide each price by its
            area. The result, the <strong>price per square foot</strong> in the US or the <strong>price per square
            meter</strong> in the UK and Europe, is how agents, appraisers and buyers judge whether a listing is
            priced in line with the neighborhood.
          </p>
          <p>
            Enter the total price and the area in square feet, square meters, acres or hectares. The calculator shows
            the price per square foot and per square meter together, in dollars, euros, pounds, Canadian or Australian
            dollars.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The Formula</h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-1.5">
          <p><span className="font-semibold">Price per sq ft</span> = total price ÷ area in square feet</p>
          <p><span className="font-semibold">Price per m²</span> = total price ÷ area in square meters = price per sq ft × 10.764</p>
          <p><span className="font-semibold">Total price</span> = price per sq ft × area</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Price per Square Foot Calculator</h2>
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
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Worked Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Property</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Price</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Area</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Price per unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {examples.map(([what, price, area, rate]) => (
                <tr key={what} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{what}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{price}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{area}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-900">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Comparing Properties Fairly</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "Use the same measurement basis for every property: finished living area in the US, gross internal area in the UK.",
            "Compare homes of similar size; small homes almost always cost more per square foot than large ones.",
            "For land, compare lots with similar zoning, access and utilities; raw acreage and serviced building lots price very differently.",
            "Price per square foot ignores condition, views, parking and outdoor space, so treat it as a first filter, not a valuation.",
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
