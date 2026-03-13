import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is a Fuel Cost Calculator?
        </h2>
        <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
          <p>
            The <strong>Fuel Cost Calculator</strong> is an essential tool for drivers, road-trippers, and business professionals. It helps you quickly estimate the total fuel expenses for any trip based on the vehicle's fuel efficiency, travel distance, and current fuel prices. 
          </p>
          <p className="mt-3">
            Whether you are planning a cross-country vacation, budgeting for your daily commute, or calculating travel expenses for reimbursement, this calculator simplifies the math. Forget manual number-crunching—our tool instantly calculates total expected fuel consumption, projected cost per mile (or kilometer), and the total cost of the trip using real-time data inputs.
          </p>
          <p className="mt-3">
            With built-in support for both Imperial (miles, MPG) and Metric (km, km/L) systems, and multi-currency support, it works seamlessly no matter where you are in the world. Start taking control of your travel budget today by accurately forecasting your fuel expenses.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🛠️</span> How to Calculate Your Trip Cost
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Select Your System</h3>
              <p className="text-gray-600">Choose between the Imperial system (Miles, MPG) or the Metric system (Kilometers, km/L) using the quick-toggle buttons.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Enter Travel Distance</h3>
              <p className="text-gray-600">Input the total distance of your trip. If it's a round trip, make sure to double the one-way distance.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Input Vehicle Efficiency</h3>
              <p className="text-gray-600">Type in your car's average fuel economy (e.g., 25 MPG or 15 km/L). You can usually find this in your car's manual or dashboard.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Set the Fuel Price</h3>
              <p className="text-gray-600">Enter the current price of gas or diesel per gallon (or per liter). Select your preferred currency.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">5</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Calculate & Save</h3>
              <p className="text-gray-600">Click Calculate to instantly see your total trip cost and fuel needed. Your calculation is automatically saved to the history table for later export.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the fuel cost estimation?</h3>
            <p className="text-gray-600 leading-relaxed">The calculation is mathematically exact based on the numbers you input (Distance ÷ Efficiency × Fuel Price = Cost). However, real-world fuel economy can fluctuate due to traffic density, terrain (hills vs. flat roads), vehicle payload, driving habits, and AC usage. For the best estimate, use your car's historical average MPG.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I calculate a round trip?</h3>
            <p className="text-gray-600 leading-relaxed">If you are estimating costs for a round trip, simply enter the two-way distance. For example, if your destination is 150 miles away, enter 300 miles as the total distance to calculate the full trip's fuel cost.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why isn't my currency listed?</h3>
            <p className="text-gray-600 leading-relaxed">Our calculator supports major currencies like USD, EUR, GBP, and BDT. However, because the math works the same regardless of currency, you can select any currency symbol (or ignore the symbol) and the numerical cost will still be perfectly correct for your local currency.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I convert km/L to MPG or vice versa?</h3>
            <p className="text-gray-600 leading-relaxed">Our tool allows you to seamlessly toggle between Imperial and Metric units without doing the math manually. If you strictly need to convert the efficiency number: 1 MPG (US) is roughly equal to 0.425 km/L, and 1 km/L is roughly 2.35 MPG.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I export my route calculations for budgeting?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! Every calculation you make is automatically saved to the "Recent Calculations" table. You can expand the history view at the bottom of the calculator and click the "CSV" button to export all your estimates for use in Excel or Google Sheets, which is great for business expense tracking.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
