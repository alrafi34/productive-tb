import React from "react";

const faqItems = [
  {
    question: "How does this fuel cost calculator work?",
    answer:
      "The calculator uses a straightforward formula: fuel needed = distance divided by fuel efficiency, and trip cost = fuel needed multiplied by fuel price. For example, if your trip is 300 miles, your vehicle gets 30 MPG, and fuel is $3.50 per gallon, the estimate is 10 gallons and $35.00 total.",
  },
  {
    question: "Can I use this for both gas and diesel vehicles?",
    answer:
      "Yes. The tool works for gasoline, diesel, hybrid, and other fuel-based vehicles because the math depends only on distance, efficiency, and price per unit of fuel. Enter your real-world numbers and the estimate updates instantly.",
  },
  {
    question: "Does the calculator support miles and kilometers?",
    answer:
      "Yes. You can switch between Imperial mode (miles and MPG) and Metric mode (kilometers and km/L). This makes it useful for users in the US, UK, Europe, and any region that prefers metric units.",
  },
  {
    question: "How do I estimate round-trip fuel cost?",
    answer:
      "Enter your total travel distance for both directions. If one-way distance is 180 miles, use 360 miles in the calculator to estimate the full round-trip fuel requirement and cost.",
  },
  {
    question: "Why can actual fuel spending be different from the estimate?",
    answer:
      "Actual spending can change due to traffic, weather, elevation, tire pressure, AC use, driving speed, and cargo load. For better planning, use your average real-world efficiency instead of ideal lab values.",
  },
  {
    question: "Can I save and export previous calculations?",
    answer:
      "Yes. Recent calculations are stored in your browser and can be exported as CSV. This is useful for travel reimbursement, project planning, and monthly transport budget reports.",
  },
  {
    question: "Is this fuel cost calculator free to use?",
    answer:
      "Yes. The tool is free to use with no sign-up requirement, so you can calculate fuel expenses as often as you need for commuting, business travel, or road trips.",
  },
];

export default function ToolSEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mt-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fuel Cost Calculator for Accurate Trip Budget Planning
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            This <strong>fuel cost calculator</strong> helps you estimate total trip fuel expenses before you travel.
            Whether you are planning a daily commute, a weekend drive, a long road trip, or client travel,
            you can quickly calculate how much fuel you will need and how much the journey is likely to cost.
          </p>
          <p>
            Instead of doing manual math, you enter three values: distance, fuel efficiency, and fuel price.
            The tool then returns your total fuel needed, estimated trip cost, and cost per mile or kilometer.
            It works as a practical <strong>gas cost calculator</strong> and <strong>trip fuel estimator</strong>
            for personal and business use.
          </p>
          <p>
            The calculator supports both major unit systems: Imperial (miles and MPG) and Metric (kilometers and km/L).
            This makes it useful in different countries and for users comparing vehicles with different efficiency standards.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fuel Cost Formula Explained</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Every result is based on a transparent formula so you can trust and verify your estimate.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900">Fuel Needed = Distance / Fuel Efficiency</p>
            <p className="font-semibold text-gray-900 mt-2">Trip Cost = Fuel Needed x Fuel Price</p>
            <p className="font-semibold text-gray-900 mt-2">Cost Per Distance = Trip Cost / Distance</p>
          </div>
          <p>
            This approach makes the tool useful as an <strong>MPG calculator</strong>, <strong>km/L calculator</strong>,
            and <strong>road trip fuel budget calculator</strong> in one place.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Calculator</h2>
        <div className="space-y-5 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">1. Choose Unit System</h3>
            <p>Pick Imperial for miles and MPG or Metric for kilometers and km/L.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">2. Enter Trip Distance</h3>
            <p>Use total route distance. For round trips, include both directions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">3. Add Vehicle Fuel Efficiency</h3>
            <p>Enter your average real-world MPG or km/L for a more realistic estimate.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">4. Set Current Fuel Price</h3>
            <p>Input your local fuel price per gallon or per liter and select currency.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">5. Calculate and Review Results</h3>
            <p>
              You will instantly see fuel required, total trip cost, and cost per mile or kilometer.
              You can also keep a recent calculation history and export records as CSV.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why This Fuel Cost Calculator Is Better Than Typical Alternatives
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Many basic tools only show one final number. This tool gives a fuller planning view so you can make better
            travel and budgeting decisions.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dual unit support for both MPG and km/L without manual conversion.</li>
            <li>Complete output including fuel needed, total trip cost, and cost per distance.</li>
            <li>Built-in recent history so repeat calculations are faster during trip planning.</li>
            <li>CSV export for reimbursement reports, expense logs, and spreadsheet analysis.</li>
            <li>Fast, clean interface that works well on both desktop and mobile devices.</li>
            <li>No account required, no paywall, and no unnecessary steps to get results.</li>
          </ul>
          <p>
            If you need a practical <strong>fuel consumption calculator</strong> that is simple for quick checks but strong
            enough for repeated budgeting workflows, this page is designed for that exact use case.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Example 1: Highway Trip in Miles</h3>
            <p>
              Distance: 240 miles, Efficiency: 30 MPG, Fuel Price: $3.80 per gallon.
              Fuel needed = 8.00 gallons. Estimated trip cost = $30.40.
              Cost per mile is about $0.13.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Example 2: Intercity Trip in Kilometers</h3>
            <p>
              Distance: 320 km, Efficiency: 16 km/L, Fuel Price: 1.60 per liter.
              Fuel needed = 20.00 liters. Estimated trip cost = 32.00.
              Cost per km is 0.10.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Example 3: Monthly Commute Planning</h3>
            <p>
              If your daily round trip is 40 miles and you commute 22 days per month,
              monthly distance is 880 miles. With 28 MPG and $3.60 per gallon,
              estimated monthly fuel cost is about $113.14.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for More Accurate Fuel Cost Estimates</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
          <li>Use your long-term average MPG or km/L instead of brochure numbers.</li>
          <li>Adjust for city traffic if your route has frequent stop-and-go conditions.</li>
          <li>Increase expected cost slightly for mountain routes or heavy cargo loads.</li>
          <li>Update fuel price before departure for better trip budgeting.</li>
          <li>For multi-stop routes, run separate calculations and compare totals in CSV.</li>
        </ul>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
