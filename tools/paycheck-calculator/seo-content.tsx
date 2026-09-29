import ToolFaq from "@/components/ToolFaq";
import { paycheckCalculatorConfig } from "./config";
import { UK_2026, US_2026 } from "./logic";

const fmt = (n: number) => (Number.isFinite(n) ? `$${n.toLocaleString("en-US")}` : "and above");

export default function PaycheckCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = paycheckCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const single = US_2026.brackets.single;
  const married = US_2026.brackets.married;

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>From Gross Pay to Take-Home Pay</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Your gross pay is what you earn before anything is taken out; take-home or net pay is what reaches your bank
            account. In between come income tax, social insurance (Social Security and Medicare in the US, National
            Insurance in the UK) and any retirement or benefit deductions you have chosen.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Take-home pay</span> = Gross − Income tax − Social insurance − Pre-tax deductions</p>
            <p><span className="font-semibold">Per paycheck</span> = Annual take-home pay ÷ pay periods (52, 26, 24, 13 or 12)</p>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>2026 US Federal Income Tax Brackets</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Rate</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Single: taxable income up to</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Married filing jointly: up to</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {single.map((b, i) => (
                <tr key={b.rate} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-900">{Math.round(b.rate * 100)}%</td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">{fmt(b.upTo)}</td>
                  <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">{fmt(married[i].upTo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Standard deduction: ${US_2026.standardDeduction.single.toLocaleString("en-US")} single, $
          {US_2026.standardDeduction.married.toLocaleString("en-US")} married filing jointly, $
          {US_2026.standardDeduction.head.toLocaleString("en-US")} head of household. Source: {US_2026.source}.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>UK Income Tax and National Insurance, 2026/27</h2>
        <ul className="space-y-2 text-gray-600 leading-relaxed list-disc pl-5">
          <li>Personal allowance: £{UK_2026.personalAllowance.toLocaleString("en-GB")}, reduced by £1 for every £2 of income over £{UK_2026.taperStart.toLocaleString("en-GB")}.</li>
          <li>Basic rate 20% on the next £{UK_2026.basicBand.toLocaleString("en-GB")}; higher rate 40% up to £{UK_2026.additionalFrom.toLocaleString("en-GB")}; additional rate 45% above.</li>
          <li>Employee National Insurance: 8% on earnings from £{UK_2026.niPrimaryThreshold.toLocaleString("en-GB")} to £{UK_2026.niUpperLimit.toLocaleString("en-GB")}, 2% above.</li>
        </ul>
        <p className="text-sm text-gray-500 mt-4">{UK_2026.source}. Student loan repayments are not included.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Paycheck Calculator</h2>
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
