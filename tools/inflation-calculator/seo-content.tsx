import ToolFaq from "@/components/ToolFaq";
import { inflationCalculatorConfig } from "./config";
import { CPI_LAST_FULL_YEAR, CPI_SOURCE } from "./cpi-data";
import { annualInflation, cpiFor } from "./logic";

export default function InflationCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = inflationCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const recent = Array.from({ length: 10 }, (_, i) => CPI_LAST_FULL_YEAR - i);
  const decades = [1920, 1940, 1960, 1980, 2000, 2010, 2020];
  const latest = cpiFor(CPI_LAST_FULL_YEAR)!;

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Inflation Is Measured</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The Consumer Price Index tracks the price of a fixed basket of goods and services, from rent and groceries to
            gasoline and doctor visits. When the index rises from 100 to 110, the same basket costs 10% more, so a dollar
            buys 10% less.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Value then → now</span> = Amount × CPI(now) ÷ CPI(then)</p>
            <p><span className="font-semibold">Total inflation</span> = (CPI(now) ÷ CPI(then) − 1) × 100</p>
            <p><span className="font-semibold">Average per year</span> = ((CPI(now) ÷ CPI(then))<sup>1/years</sup> − 1) × 100</p>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>US Inflation Rate by Year</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Inflation (annual average)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recent.map((y) => (
                <tr key={y} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{y}</td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">{annualInflation(y)?.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">$100 in</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Is worth in {CPI_LAST_FULL_YEAR}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {decades.map((y) => (
                <tr key={y} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{y}</td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">
                    ${((100 * latest) / cpiFor(y)!).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">{CPI_SOURCE}. Change in the annual average index from the previous year.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Inflation Calculator</h2>
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
