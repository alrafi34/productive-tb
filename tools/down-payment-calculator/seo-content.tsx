import React from "react";

export default function DownPaymentCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Down Payment Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Down Payment Calculator</strong> helps you determine how much money you need upfront when purchasing a property, land, vehicle, or any high-value asset. The down payment is the portion of the purchase price you pay out of pocket — the remainder is financed through a loan or mortgage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports two modes: percentage-based (e.g., 20% of the purchase price) and fixed amount (e.g., $60,000 flat). It instantly shows the down payment amount, remaining loan amount, and — when you enter an interest rate — an estimated monthly payment for the financed portion.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The scenario comparison table lets you see how different down payment percentages (5%, 10%, 15%, 20%, 25%, 30%) affect your loan amount and monthly payment side by side, helping you choose the right balance between upfront cost and ongoing payments.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Down Payment Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the total purchase price of the property or asset",
                "Select Percentage or Fixed Amount mode",
                "Enter the down payment percentage (e.g. 20%) or fixed amount",
                "Use the slider or quick preset buttons for fast adjustments",
                "Optionally enter an interest rate and loan term for monthly estimates",
                "View the payment bar showing down payment vs loan split",
                "Click Show on Scenario Comparison to compare multiple options",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Percentage and fixed amount modes",
                "Interactive slider for percentage input",
                "Quick preset buttons: 5%, 10%, 15%, 20%, 25%, 30%",
                "Visual payment bar showing down vs loan split",
                "Optional monthly payment estimate with interest rate",
                "Scenario comparison table for all common percentages",
                "Multi-currency: USD, EUR, GBP, INR, BDT, SGD",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Down Payment Examples
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Purchase Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down %</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Remaining Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$300,000", "20%", "$60,000",  "$240,000"],
                ["$300,000", "10%", "$30,000",  "$270,000"],
                ["$500,000", "20%", "$100,000", "$400,000"],
                ["$80,000",  "15%", "$12,000",  "$68,000"],
                ["$1,000,000","25%","$250,000", "$750,000"],
              ].map(([price, pct, down, loan]) => (
                <tr key={price + pct} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{price}</td>
                  <td className="py-3 px-4 font-mono">{pct}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{down}</td>
                  <td className="py-3 px-4 font-mono">{loan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How Down Payment Affects Monthly Payments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Loan Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly EMI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5%  ($15,000)",  "$285,000", "$1,805", "$364,800"],
                ["10% ($30,000)",  "$270,000", "$1,709", "$345,240"],
                ["20% ($60,000)",  "$240,000", "$1,519", "$306,840"],
                ["30% ($90,000)",  "$210,000", "$1,329", "$268,440"],
              ].map(([down, loan, emi, interest]) => (
                <tr key={down} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{down}</td>
                  <td className="py-3 px-4 font-mono">{loan}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{emi}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on $300,000 purchase price, 6.5% interest rate, 30-year term.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Home Buyers",        desc: "Calculate how much cash you need upfront before applying for a mortgage." },
            { icon: "🌾", title: "Land Investors",     desc: "Determine the upfront payment needed to secure a land purchase with financing." },
            { icon: "🚗", title: "Vehicle Buyers",     desc: "Calculate down payment for car loans and see how it affects monthly payments." },
            { icon: "💼", title: "Real Estate Agents", desc: "Show clients how different down payment amounts affect their loan and monthly cost." },
            { icon: "📊", title: "Financial Planners", desc: "Model down payment scenarios to help clients plan their savings goals." },
            { icon: "🏦", title: "Mortgage Applicants",desc: "Understand minimum down payment requirements and their impact on loan terms." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-blue-800">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How much down payment do I need for a house?",
              a: "The minimum down payment depends on the loan type. Conventional loans typically require 3–20%. FHA loans require 3.5% with a credit score of 580+. VA and USDA loans may require 0% down for eligible buyers. A 20% down payment avoids Private Mortgage Insurance (PMI), which adds to your monthly cost.",
            },
            {
              q: "What is PMI and how does the down payment affect it?",
              a: "Private Mortgage Insurance (PMI) is required by most lenders when your down payment is less than 20% of the home price. PMI typically costs 0.5–1.5% of the loan amount per year. Making a 20% or larger down payment eliminates this extra cost.",
            },
            {
              q: "Is a larger down payment always better?",
              a: "A larger down payment reduces your loan amount, monthly payment, and total interest paid. However, it also ties up more cash upfront. Consider your emergency fund, investment opportunities, and liquidity needs before committing to a large down payment.",
            },
            {
              q: "Can I use this calculator for vehicle purchases?",
              a: "Yes. Enter the vehicle price as the purchase price and your planned down payment. The calculator works for any asset purchase — property, land, vehicles, or equipment. The monthly payment estimate uses the standard amortization formula.",
            },
            {
              q: "What is the difference between percentage and fixed amount mode?",
              a: "Percentage mode calculates the down payment as a fraction of the purchase price (e.g., 20% of $300,000 = $60,000). Fixed amount mode lets you enter a specific dollar amount directly (e.g., $60,000 flat). The calculator shows the equivalent percentage in both cases.",
            },
            {
              q: "How accurate is the monthly payment estimate?",
              a: "The monthly payment estimate uses the standard mortgage amortization formula and is accurate for fixed-rate loans. It does not include property taxes, insurance, HOA fees, or PMI. For a complete PITI estimate, use the Mortgage Loan Calculator.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
