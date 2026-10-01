import ToolFaq from "@/components/ToolFaq";
import { subdivisionCostCalculatorConfig } from "./config";

// Illustrative line items (US dollars), not quotes; the calculator takes your own figures
const EXAMPLES: { title: string; setup: string; plots: number; items: [string, number][] }[] = [
  {
    title: "Minor split: one lot into two",
    setup: "A 2-acre lot on an existing street is split into two 1-acre lots; both connect to existing water, sewer and power.",
    plots: 2,
    items: [
      ["Boundary survey and plat", 4000],
      ["Engineering (grading, utility plans)", 3500],
      ["Legal and title", 2500],
      ["Application and permit fees", 3000],
      ["Utility connections", 10000],
    ],
  },
  {
    title: "Small subdivision: 20 lots with a new street",
    setup: "A 10-acre parcel becomes 20 lots served by a new public street, water and sewer mains, and a stormwater pond.",
    plots: 20,
    items: [
      ["Survey, engineering and plat", 80000],
      ["Legal and title", 15000],
      ["Permits, review and impact fees", 100000],
      ["Water, sewer and power mains", 400000],
      ["Street, curbs and sidewalks", 600000],
      ["Stormwater drainage", 150000],
      ["Contingency (10%)", 134500],
    ],
  },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export default function SubdivisionCostCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = subdivisionCostCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Subdivision Cost Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Subdivision Cost Calculator</strong> estimates the total cost of dividing a parcel of land into multiple smaller plots. It aggregates all major expense categories — surveying, legal fees, permits, utility installation, road development, drainage, and miscellaneous costs — into a single project budget estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Land subdivision is a complex process that involves government approvals, professional services, and significant infrastructure investment. Without a clear cost estimate, developers and property owners often underestimate the true cost of a subdivision project, leading to budget overruns and project delays.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides an instant, real-time estimate as you enter costs. It also calculates the cost per plot and land area per plot, giving you the key metrics needed to assess project feasibility before committing to a subdivision.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Subdivision Cost Calculator
        </h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Typical Subdivision Cost Ranges (US)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cost Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Surveying",           "$500 – $5,000",    "Boundary survey, topographic mapping, plat preparation"],
                ["Legal Fees",          "$1,000 – $5,000",  "Title search, deed preparation, attorney review"],
                ["Permits & Approvals", "$500 – $10,000+",  "Varies widely by municipality and project size"],
                ["Utility Installation","$5,000 – $50,000+","Water, sewer, electricity, and internet connections"],
                ["Road Development",    "$5,000 – $100,000+","Grading, paving, curbs, and signage"],
                ["Drainage",            "$2,000 – $30,000+","Stormwater management, culverts, retention ponds"],
                ["Miscellaneous",       "$1,000 – $10,000+","Contingency, environmental studies, admin costs"],
              ].map(([cat, range, notes]) => (
                <tr key={cat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{cat}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-3 px-4 text-gray-600">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Rough whole-project ranges for small US subdivisions, for orientation only. New public streets and utility mains for larger subdivisions can cost far more; get local quotes.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples: Cost per Lot
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {EXAMPLES.map(({ title, setup, plots, items }) => {
            const total = items.reduce((sum, [, v]) => sum + v, 0);
            return (
              <div key={title} className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{setup}</p>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    {items.map(([label, v]) => (
                      <tr key={label}>
                        <td className="py-1.5 pr-3 text-gray-700">{label}</td>
                        <td className="py-1.5 font-mono text-right text-gray-800">{usd(v)}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="py-2 pr-3 text-gray-900">Total</td>
                      <td className="py-2 font-mono text-right text-gray-900">{usd(total)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="py-1.5 pr-3 text-primary">Cost per lot ({plots} lots)</td>
                      <td className="py-1.5 font-mono text-right text-primary">{usd(Math.round(total / plots))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Illustrative figures only; costs vary widely with location, terrain and local requirements. The cost of the land itself is not included. Enter your own quotes in the calculator above, in any currency.
        </p>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
