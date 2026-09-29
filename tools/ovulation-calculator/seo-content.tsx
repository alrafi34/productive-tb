import ToolFaq from "@/components/ToolFaq";
import { ovulationCalculatorConfig } from "./config";

export default function OvulationCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = ovulationCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Ovulation Is Estimated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>A menstrual cycle has two halves: the follicular phase before ovulation, which varies in length, and the luteal phase after it, which is fairly constant at about 12 to 16 days. That is why ovulation is counted back from the next expected period rather than forward from the last one.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Ovulation day</span> = First day of last period + cycle length − luteal phase</p>
            <p><span className="font-semibold">Fertile window</span> = Ovulation − 5 days to ovulation day</p>
            <p><span className="font-semibold">Next period</span> = First day of last period + cycle length</p>
          </div>
          <p>Example: a 30-day cycle starting on March 1 with a 14-day luteal phase puts ovulation around March 17 and the fertile window from March 12 to March 17.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Ovulation Calculator</h2>
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
