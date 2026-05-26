import React from "react";

export default function LandPriceCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Land Price Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Land Price Calculator</strong> is a practical tool that helps you instantly calculate the
            total cost of a land or property by multiplying the land area by the price rate per unit. Whether
            you are buying, selling, or evaluating land, this tool eliminates manual math and provides
            accurate results in seconds.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator supports all major land measurement units — Decimal, Acre, Katha, Bigha, Square
            Feet, Square Meter, and Hectare — and automatically converts between units when the area unit
            and rate unit differ. It also supports multiple currencies including USD, EUR, GBP, BDT, and INR.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The comparison mode lets you evaluate two different land deals side by side, making it easy to
            identify the better value. All calculations happen instantly in your browser with no data sent
            to any server.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Land Price Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the land area (e.g. 5)",
                "Select the area unit (e.g. Decimal)",
                "Enter the price rate per unit (e.g. 20,000)",
                "Select the rate unit — if different from area unit, conversion is automatic",
                "Choose your currency (USD, BDT, INR, etc.)",
                "View the total price instantly",
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
                "Real-time calculation as you type",
                "Automatic unit conversion (e.g. Acre → Decimal)",
                "Multi-currency support",
                "Price breakdown table for scaled areas",
                "Compare two land prices side by side",
                "Save and export calculation history",
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
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Land Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rate Per Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5 Decimal", "$20,000 / Decimal", "$100,000"],
                ["2 Acre", "$50,000 / Acre", "$100,000"],
                ["4,000 Sq Ft", "$120 / Sq Ft", "$480,000"],
                ["10 Katha", "$5,000 / Katha", "$50,000"],
                ["1 Bigha", "$200,000 / Bigha", "$200,000"],
                ["0.5 Hectare", "$80,000 / Hectare", "$40,000"],
              ].map(([area, rate, total]) => (
                <tr key={area} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{area}</td>
                  <td className="py-3 px-4 font-mono">{rate}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Square Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Decimal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1 Decimal",     "435.6",       "1",       "0.01"],
                ["1 Katha",       "720",         "1.653",   "0.01653"],
                ["1 Bigha",       "14,400",      "33.06",   "0.3306"],
                ["1 Acre",        "43,560",      "100",     "1"],
                ["1 Sq Meter",    "10.764",      "0.0247",  "0.000247"],
                ["1 Hectare",     "107,639",     "247.1",   "2.471"],
              ].map(([unit, sqft, dec, acre]) => (
                <tr key={unit} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{unit}</td>
                  <td className="py-3 px-4 font-mono">{sqft}</td>
                  <td className="py-3 px-4 font-mono">{dec}</td>
                  <td className="py-3 px-4 font-mono">{acre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Property Buyers", color: "blue",   desc: "Quickly estimate total land cost before making a purchase decision." },
            { icon: "💼", title: "Real Estate Agents", color: "green", desc: "Calculate and present accurate property valuations to clients." },
            { icon: "📐", title: "Surveyors", color: "purple",       desc: "Convert between measurement units and compute land values accurately." },
            { icon: "🌾", title: "Farmers", color: "orange",         desc: "Estimate agricultural land value for buying, selling, or leasing." },
            { icon: "🏗️", title: "Developers", color: "red",         desc: "Plan construction budgets with accurate land cost estimates." },
            { icon: "⚖️", title: "Legal & Tax", color: "gray",       desc: "Prepare property valuations for legal documentation and tax purposes." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
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
              q: "How is total land price calculated?",
              a: "Total Price = Land Area × Price Rate Per Unit. If the area unit and rate unit differ, the area is automatically converted before multiplication.",
            },
            {
              q: "Can I use different units for area and rate?",
              a: "Yes. For example, you can enter area in Acres and rate in Decimal — the calculator automatically converts the area to Decimal before calculating the total price.",
            },
            {
              q: "What currencies are supported?",
              a: "The calculator supports USD ($), EUR (€), GBP (£), BDT (৳), and INR (₹). The currency symbol is applied to the result display.",
            },
            {
              q: "What is the comparison mode?",
              a: "Comparison mode lets you enter two separate land deals and instantly see which one is cheaper and by how much.",
            },
            {
              q: "Is my data saved anywhere?",
              a: "No. All calculations happen entirely in your browser. History is saved only in your browser's localStorage and never sent to any server.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
