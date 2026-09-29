import ToolFaq from "@/components/ToolFaq";
import { sleepCalculatorConfig } from "./config";
import { RECOMMENDED } from "./logic";

export default function SleepCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = sleepCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Sleep Cycles Work</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Through the night you pass through repeating cycles of light sleep, deep (slow-wave) sleep and REM sleep, each lasting roughly 90 minutes. Most adults need four to six cycles. Timing your alarm for the end of a cycle, when sleep is lightest, can make waking up easier.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Bedtime</span> = Wake-up time − (cycles × 90 min) − time to fall asleep</p>
            <p><span className="font-semibold">Wake-up time</span> = Bedtime + time to fall asleep + cycles × 90 min</p>
          </div>
          <p>Example: to wake at 6:30 AM after five cycles, with 15 minutes to fall asleep, go to bed at 10:45 PM.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Much Sleep Do You Need?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Age group</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Hours per 24 hours</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECOMMENDED.map((r) => (
                <tr key={r.group} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-xs text-gray-900">{r.group}</td><td className="py-1.5 px-3 text-right text-xs text-gray-700">{r.hours}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">American Academy of Sleep Medicine consensus recommendations (2016).</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Sleep Calculator</h2>
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
