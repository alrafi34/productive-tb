const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EMI in a loan calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EMI means Equated Monthly Installment. It is the fixed monthly amount you pay toward a loan. Each payment includes interest and principal, with higher interest share in early months and higher principal share later."
      }
    },
    {
      "@type": "Question",
      name: "How is EMI calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EMI is calculated using principal amount, monthly interest rate, and loan tenure in months: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure."
      }
    },
    {
      "@type": "Question",
      name: "Does paying extra every month reduce total interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extra monthly payment usually reduces outstanding principal faster, which lowers future interest and shortens the loan term."
      }
    },
    {
      "@type": "Question",
      name: "What is an amortization schedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An amortization schedule is a month-by-month table that shows EMI amount, principal paid, interest paid, and remaining balance until the loan is fully repaid."
      }
    },
    {
      "@type": "Question",
      name: "Can I use this EMI calculator for home, car, and personal loans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This calculator works for most fixed-rate installment loans including home loans, car loans, personal loans, education loans, and business loans."
      }
    }
  ]
};

export default function LoanEmiCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Loan EMI Calculator with Amortization Schedule, Loan Comparison, and Extra Payment Simulation
        </h2>
        <p className="leading-relaxed">
          Use this free loan EMI calculator to estimate monthly installment amount, total interest payable, and full repayment
          cost before applying for a loan. Whether you are checking a home loan EMI, personal loan EMI, car loan EMI, or
          education loan EMI, this tool gives instant calculations with clear breakdowns.
        </p>
        <p className="leading-relaxed">
          Many people search for terms like monthly payment calculator, amortization calculator, interest calculator, or loan
          repayment planner. This page combines those needs in one place by letting you compute EMI, inspect the full schedule,
          compare two loan options, and test how extra monthly payments can shorten your term and reduce interest.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          EMI Formula and What It Means
        </h2>
        <p className="leading-relaxed">
          EMI (Equated Monthly Installment) is the fixed amount paid every month to clear a loan over a selected tenure.
          For fixed-rate loans, EMI is calculated using this standard formula:
        </p>
        <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

P = Principal loan amount
r = Monthly interest rate (annual rate / 12 / 100)
n = Loan tenure in months`}
        </pre>
        <p className="leading-relaxed">
          In early months, the interest part of EMI is higher because the outstanding principal is larger. Over time, as the
          balance reduces, the principal component increases and the interest component decreases. The amortization schedule
          below the calculator shows this month by month.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Loan EMI Calculator
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">1. Enter Loan Details</h3>
            <p className="text-sm">
              Add loan amount, annual interest rate, and tenure in years or months. Results update instantly as you type or
              use sliders.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">2. Review EMI and Total Cost</h3>
            <p className="text-sm">
              Check monthly EMI, total interest payable, and total repayment amount to estimate long-term affordability.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">3. Simulate Extra Monthly Payment</h3>
            <p className="text-sm">
              Enter extra monthly payment to see potential months saved and interest savings. This helps plan prepayment
              strategy realistically.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">4. Open Full Amortization Schedule</h3>
            <p className="text-sm">
              Switch to Schedule mode to view a month-by-month table with EMI, principal, interest, and remaining balance.
              Export the schedule as CSV for records or advisor discussion.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">5. Compare Two Loan Scenarios</h3>
            <p className="text-sm">
              Use Compare mode to evaluate two interest-rate or loan-structure options side by side before finalizing your
              lender or offer.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Why This EMI Tool Is Better Than Typical Online Loan Calculators
        </h2>
        <p className="leading-relaxed">
          Many calculators only show one number: monthly EMI. That is not enough for good decisions. This tool is designed as
          a complete loan analysis workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Beyond Basic EMI Output</h3>
            <p className="text-sm">
              You get EMI, total interest, total payment, principal split, visual distribution, and complete amortization
              details in one interface.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Built-In Loan Comparison</h3>
            <p className="text-sm">
              Compare Loan A vs Loan B directly, including monthly and lifetime payment differences, without opening multiple
              calculator tabs.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Practical Extra-Payment Simulator</h3>
            <p className="text-sm">
              Most tools skip prepayment impact. Here you can test extra monthly contribution to estimate months saved and
              long-term interest reduction.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Export and Share Ready</h3>
            <p className="text-sm">
              Export amortization schedule as CSV and copy summary values quickly, useful for planning, reporting, and lender
              conversations.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Fast Browser-Based Experience</h3>
            <p className="text-sm">
              Calculations run instantly in your browser with no sign-up and no waiting. Ideal for quick iterations while
              comparing rates and tenure options.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Free and Mobile Friendly</h3>
            <p className="text-sm">
              The tool is free to use and optimized for desktop and mobile, so users can run EMI checks anytime from any
              device.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Common Loan Types You Can Calculate
        </h2>
        <p className="leading-relaxed">
          This EMI calculator supports any fixed-rate installment loan structure where principal, tenure, and interest rate are known.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="text-left p-3 border-b border-slate-200">Loan Type</th>
                <th className="text-left p-3 border-b border-slate-200">What You Can Evaluate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-3">Home Loan / Mortgage</td>
                <td className="p-3">Monthly EMI, full-term interest cost, and tenure reduction through prepayment.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Car Loan</td>
                <td className="p-3">Affordable monthly installment and cost difference across lender rates.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Personal Loan</td>
                <td className="p-3">Short-term EMI burden and total repayment before approval decision.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Education Loan</td>
                <td className="p-3">Repayment schedule planning after moratorium and long-term interest visibility.</td>
              </tr>
              <tr>
                <td className="p-3">Business Loan</td>
                <td className="p-3">Cash-flow friendly EMI planning and scenario analysis with alternate rates.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Tips to Reduce EMI Burden and Total Interest
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Choose the shortest tenure you can comfortably afford to reduce total interest outflow.</li>
          <li>Compare small rate differences carefully because even minor changes affect long-term cost significantly.</li>
          <li>Add fixed extra monthly payment whenever possible to reduce principal faster.</li>
          <li>Review the amortization table to understand when most interest is being paid.</li>
          <li>Use scenario comparison before loan finalization, not after signing.</li>
        </ul>
        <p className="text-xs text-slate-500 leading-relaxed">
          Note: Calculator outputs are estimates for planning. Actual lender EMI may vary due to fees, insurance, day-count
          conventions, and rate reset terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">What is EMI in a loan?</h3>
            <p className="text-sm">
              EMI is the fixed monthly payment used to repay a loan over a selected period. It combines both interest and
              principal repayment.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Can this tool generate a full amortization schedule?</h3>
            <p className="text-sm">
              Yes. Switch to the Schedule mode to see month-by-month principal, interest, EMI, and outstanding balance.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">How does extra payment help?</h3>
            <p className="text-sm">
              Extra monthly payment reduces principal earlier, which lowers subsequent interest calculations and can shorten
              your loan term.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Can I compare two loan offers?</h3>
            <p className="text-sm">
              Yes. Use Compare mode to evaluate EMI difference and total lifetime payment difference between two options.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Is this loan EMI calculator free?</h3>
            <p className="text-sm">
              Yes. You can calculate EMI, explore schedules, compare options, and export schedule data without signup.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Which currencies are supported?</h3>
            <p className="text-sm">
              The calculator supports multiple display options including USD, EUR, GBP, INR, and a generic numeric format.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
