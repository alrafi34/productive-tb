import ToolFaq from "@/components/ToolFaq";
import { dateCalculatorConfig } from "./config";

export default function DateCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = dateCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Adding Days, Months and Years to a Date</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Days and weeks are fixed lengths, so adding them simply counts forward on the calendar. Months and years are not: a month can have 28 to 31 days and a year 365 or 366, so they are added to the calendar date itself.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Result = (start + years and months) + (weeks × 7 + days)</p>
            <p>Jan 31 + 1 month = Feb 28 (Feb 29 in a leap year)</p>
          </div>
          <p>Deadlines written as &ldquo;within 30 days&rdquo;, such as return windows, notice periods or payment terms, usually count calendar days starting the day after the event. Contracts and courts may have their own counting rules, so check the wording when a deadline matters.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Date Calculator</h2>
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
