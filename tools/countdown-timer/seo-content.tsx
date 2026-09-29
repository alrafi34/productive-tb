import ToolFaq from "@/components/ToolFaq";
import { countdownTimerConfig } from "./config";

export default function CountdownTimerSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = countdownTimerConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Holiday Dates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Holiday</th><th className="text-right py-2 px-3 font-semibold text-gray-700">2026</th><th className="text-right py-2 px-3 font-semibold text-gray-700">2027</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Rule</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {([
                ["New Year's Day", "Thu, Jan 1", "Fri, Jan 1", "January 1"],
                ["Valentine's Day", "Sat, Feb 14", "Sun, Feb 14", "February 14"],
                ["Easter Sunday", "Apr 5", "Mar 28", "Sunday after the first full moon of spring (church tables)"],
                ["Halloween", "Sat, Oct 31", "Sun, Oct 31", "October 31"],
                ["Thanksgiving (US)", "Nov 26", "Nov 25", "Fourth Thursday of November"],
                ["Christmas Day", "Fri, Dec 25", "Sat, Dec 25", "December 25"],
              ] as string[][]).map((r) => (
                <tr key={r[0]} className="hover:bg-gray-50">{r.map((c, i) => <td key={i} className={`py-1.5 px-3 text-xs ${i === 0 ? "text-left text-gray-900" : "text-right text-gray-700"}`}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Easter follows the Western (Gregorian) calendar; Orthodox Easter usually falls later. Canada&apos;s Thanksgiving is the second Monday of October.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Countdown Timer</h2>
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
