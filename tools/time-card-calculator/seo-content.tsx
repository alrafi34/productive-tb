import ToolFaq from "@/components/ToolFaq";
import { timeCardCalculatorConfig } from "./config";

export default function TimeCardCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = timeCardCalculatorConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const minutes: [string, string][] = [
    ["5 min", "0.08"], ["6 min", "0.10"], ["10 min", "0.17"], ["12 min", "0.20"], ["15 min", "0.25"],
    ["20 min", "0.33"], ["30 min", "0.50"], ["40 min", "0.67"], ["45 min", "0.75"], ["50 min", "0.83"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Add Up Hours Worked in a Week</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Fill in a time card before it goes to payroll, check that your paycheck counted every hour, or work out
            what a week of shifts will pay. Enter the clock-in and clock-out time for each day and the unpaid break,
            and the calculator adds up the week in <strong>decimal hours</strong>, the format payroll uses, and in
            hours and minutes.
          </p>
          <p>
            Overtime is split out automatically: by default every hour over 40 in the week, as under the US Fair
            Labor Standards Act. You can add a daily limit, change the weekly one or the overtime rate to match your
            state, country or contract. Hours over a daily limit are never counted again toward the weekly one.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Worked Example</h2>
        <p className="text-gray-600 leading-relaxed">
          Monday to Friday, 8:00 AM to 5:30 PM with a 30-minute unpaid lunch: each day is 9 hours 30 minutes minus 30
          minutes = 9.00 hours, so the week is 45.00 hours. With overtime after 40 hours, that is 40 regular hours and
          5 overtime hours. At $20 an hour: 40 × $20 = $800 regular, 5 × $20 × 1.5 = $150 overtime, $950 gross pay.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Minutes to Decimal Hours</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Minutes</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {minutes.map(([m, d]) => (
                <tr key={m} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">{m}</td>
                  <td className="py-2 px-3 font-mono text-gray-900">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Time Card Calculator</h2>
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
