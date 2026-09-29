import ToolFaq from "@/components/ToolFaq";
import { retirementCalculatorConfig } from "./config";

export default function RetirementCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = retirementCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How the Projection Works</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each year until you retire, your balance grows at the return you set, then your contribution and your
            employer&apos;s match for that year are added. Your salary rises by the growth rate, so the amounts you save
            rise with it.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Balance next year</span> = Balance × (1 + return) + Your contribution + Match</p>
            <p><span className="font-semibold">Match</span> = min(Your contribution, Cap % × Salary) × Match rate</p>
            <p><span className="font-semibold">Today&apos;s money</span> = Future balance ÷ (1 + inflation)<sup>years</sup></p>
          </div>
          <p className="text-sm">
            The projection ignores taxes, fees and the ups and downs of real markets; treat it as a planning estimate, not
            a forecast.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Retirement Calculator</h2>
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
