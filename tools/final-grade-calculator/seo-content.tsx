import ToolFaq from "@/components/ToolFaq";
import { finalGradeCalculatorConfig } from "./config";

export default function FinalGradeCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = finalGradeCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The Final Exam Formula</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Your course grade is a weighted average of the grade you have so far and your final exam score. If the final counts for w of the course (as a decimal, so 25% is 0.25), everything before it counts for 1 − w.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Course grade = current × (1 − w) + final × w</p>
            <p>Final needed = (goal − current × (1 − w)) ÷ w</p>
          </div>
          <p>Example: with 88% in the class and a final worth 25%, you need (90 − 88 × 0.75) ÷ 0.25 = 96% for an A (90%), and 56% to keep a B (80%).</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Final Grade Calculator</h2>
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
