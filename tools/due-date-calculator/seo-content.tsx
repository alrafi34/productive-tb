import ToolFaq from "@/components/ToolFaq";
import { dueDateCalculatorConfig } from "./config";

export default function DueDateCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = dueDateCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Your Due Date Is Estimated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Doctors and midwives date a pregnancy from the first day of the last menstrual period (LMP), because that date is usually known while conception is not. A typical pregnancy lasts 40 weeks from the LMP, which is about 38 weeks from conception.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Due date (LMP)</span> = LMP + 280 days + (cycle length − 28)</p>
            <p><span className="font-semibold">Due date (conception)</span> = Conception + 266 days</p>
            <p><span className="font-semibold">Due date (IVF)</span> = Transfer date + 266 − embryo age in days</p>
            <p><span className="font-semibold">Weeks pregnant</span> = (Today − LMP) ÷ 7</p>
          </div>
          <p>Example: a last period starting on January 1, 2026 with a 28-day cycle gives a due date of October 8, 2026.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Pregnancy Trimesters and Milestones</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Stage</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Weeks</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {([["First trimester", "0 – 13 weeks 6 days"], ["Second trimester", "14 – 27 weeks 6 days"], ["Third trimester", "28 weeks until birth"], ["Preterm", "Before 37 weeks"], ["Early term", "37 weeks 0 days – 38 weeks 6 days"], ["Full term", "39 weeks 0 days – 40 weeks 6 days"], ["Late term", "41 weeks 0 days – 41 weeks 6 days"], ["Post-term", "42 weeks and later"]] as string[][]).map((r) => (
                <tr key={r[0]} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-left text-gray-900 text-xs">{r[0]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[1]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Term definitions from the American College of Obstetricians and Gynecologists (ACOG).</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Due Date Calculator</h2>
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
