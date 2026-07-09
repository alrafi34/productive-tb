export default function ToolSEOContent() {
  const faqItems = [
    {
      q: "What is a fuel cost calculator?",
      a: "A fuel cost calculator is a free online tool that estimates how much fuel you will need for a trip and what it will cost at current fuel prices. You enter three values — trip distance, vehicle fuel efficiency (MPG or km/L), and fuel price per gallon or liter — and the calculator returns total fuel needed, estimated trip cost, and cost per mile or kilometer.",
    },
    {
      q: "How is trip fuel cost calculated?",
      a: "Fuel cost is calculated in two steps. First: Fuel Needed = Distance ÷ Fuel Efficiency. Then: Trip Cost = Fuel Needed × Price per Unit. Example: 300 miles at 30 MPG needs 10 gallons. At $3.80/gallon, the trip costs $38.00. Cost per mile = $38.00 ÷ 300 = $0.127/mile.",
    },
    {
      q: "How do I calculate fuel cost in km/L?",
      a: "The formula is identical: Fuel Needed (liters) = Distance (km) ÷ Efficiency (km/L). Trip Cost = Fuel Needed × Price per liter. Example: 400 km at 15 km/L = 26.67 liters. At €1.80/liter, the trip costs €48.00. Cost per km = €48.00 ÷ 400 = €0.12/km.",
    },
    {
      q: "How do I estimate monthly fuel cost for commuting?",
      a: "Multiply your daily round-trip distance by the number of commuting days per month, then run the calculation. Example: 35-mile daily round trip × 22 days = 770 miles/month. At 28 MPG and $3.60/gallon: 770 ÷ 28 = 27.5 gallons × $3.60 = $99.00/month.",
    },
    {
      q: "What is a good MPG to use for fuel cost planning?",
      a: "For personal cars, 25–35 MPG is typical for modern sedans. SUVs and trucks average 18–25 MPG. Hybrids achieve 45–60 MPG. For fuel cost calculations, use your vehicle's real-world average from your actual fuel log rather than the EPA-rated value — actual consumption is typically 10–20% lower than manufacturer test ratings, particularly in city driving.",
    },
    {
      q: "Can I calculate fuel cost in liters per 100km (L/100km)?",
      a: "Convert L/100km to km/L first: km/L = 100 ÷ L/100km. A vehicle rated at 8 L/100km achieves 100 ÷ 8 = 12.5 km/L. Enter 12.5 in the km/L field. European fuel efficiency is typically quoted as L/100km; this conversion step lets you use European spec sheets directly.",
    },
    {
      q: "How do I calculate fuel cost for a multi-stop road trip?",
      a: "Add all driving legs together into a total distance, then run a single calculation. If fuel prices differ significantly between regions, run a separate calculation for each leg and sum the results. Use the CSV export to accumulate multiple results in a spreadsheet.",
    },
    {
      q: "Does driving speed affect fuel consumption?",
      a: "Yes, significantly. Most vehicles are most efficient at 45–65 mph (70–105 km/h). Above 70 mph, aerodynamic drag increases fuel consumption sharply — driving at 80 mph instead of 65 mph typically uses 15–25% more fuel. For highway trips at speed, reduce your entered MPG by 10–15% from your mixed average for a more accurate estimate.",
    },
    {
      q: "Can I use this for diesel vehicles?",
      a: "Yes. The formula is identical for diesel, gasoline, and any liquid fuel. Enter your diesel vehicle's MPG or km/L and the current diesel price per gallon or liter. The calculation logic is the same regardless of fuel type.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your distance, efficiency, and price inputs are never sent to any server or stored outside your device. Calculation history is saved only in your browser's localStorage.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Choose unit system", "Select Imperial (miles and MPG) or Metric (kilometers and km/L). This sets the units for all inputs and outputs — distance, efficiency, and cost per distance."],
    ["Enter trip distance", "Type your total route distance in miles or kilometers. For round trips, enter the full distance both ways. For a 150-mile one-way trip, enter 300 for the round trip."],
    ["Enter fuel efficiency", "Type your vehicle's average real-world fuel efficiency in MPG or km/L. Use your actual average from your fuel log rather than the manufacturer's rated value — real-world consumption is typically 10–20% lower."],
    ["Enter fuel price", "Type the current fuel price per gallon (US/Imperial) or per liter (Metric). Select your currency — USD, EUR, GBP, CAD, or INR. Check fuel prices on the day of a long trip for the most accurate estimate."],
    ["Read your results", "The calculator returns total fuel needed, estimated trip cost, and cost per mile or km — all updated instantly. No submit button required."],
    ["Export or save", "Click Export CSV to download a history of your calculations for travel reimbursement records, expense tracking, or monthly commute budget analysis."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Fuel Cost Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>fuel cost calculator</strong> is a free online tool that estimates how much a
            trip will cost in fuel before you travel. Enter three values — distance, fuel efficiency
            (MPG or km/L), and current fuel price — and it instantly returns total fuel needed,
            total trip cost, and cost per mile or kilometer.
          </p>
          <p>
            The formula is simple, but doing it correctly in your head is harder than it looks.
            At 28 MPG and $3.65/gallon, a 240-mile trip takes 8.57 gallons and costs $31.29 —
            not $32 (which you'd get from rounding to 8 gallons), not $33 (from rounding MPG to 30).
            These small errors add up when planning multi-day road trips, comparing vehicles, or
            submitting monthly mileage reimbursement reports where every dollar matters.
          </p>
          <p>
            Built for <strong>commuters estimating monthly fuel spend, road trippers budgeting
            multi-day routes, delivery drivers calculating per-job fuel costs, business travelers
            preparing mileage reimbursement claims, and anyone comparing the running cost of two
            vehicles before buying</strong>. Supports miles/MPG and km/km·L, multiple currencies,
            CSV export. Browser-based, free, no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Fuel Cost Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Fuel Needed</span> = Distance ÷ Fuel Efficiency (MPG or km/L)</p>
              <p><span className="font-semibold">Trip Cost</span> = Fuel Needed × Fuel Price per unit</p>
              <p><span className="font-semibold">Cost per Mile/km</span> = Trip Cost ÷ Distance</p>
              <p className="text-gray-500 text-xs mt-2">Example (Imperial): 240 mi ÷ 28 MPG = 8.57 gal × $3.65 = <span className="text-green-600 font-semibold">$31.29</span></p>
              <p className="text-gray-500 text-xs">Example (Metric): 380 km ÷ 14 km/L = 27.14 L × €1.75 = <span className="text-green-600 font-semibold">€47.50</span></p>
            </div>
          </div>
          <p>Things that affect actual fuel consumption vs the calculated estimate:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Speed</strong> — consumption rises sharply above 65–70 mph due to aerodynamic drag</li>
            <li><strong>Terrain</strong> — uphill grades increase consumption 10–30%; downhill recovers some</li>
            <li><strong>Traffic</strong> — stop-and-go city driving uses 20–40% more fuel than highway</li>
            <li><strong>Climate</strong> — cold starts and AC use increase fuel consumption</li>
            <li><strong>Load</strong> — additional cargo weight increases fuel use proportionally</li>
          </ul>
          <p className="text-sm text-gray-500">Use your vehicle's real-world average MPG or km/L from your fuel log — not the manufacturer's test figure — for the most accurate trip budget.</p>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fuel Cost Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Total fuel needed for any trip",
                "Total trip cost in your currency",
                "Cost per mile or km",
                "Imperial (miles/MPG) and Metric (km/km·L) modes",
                "Multi-currency: USD, EUR, GBP, CAD, INR",
                "Real-time results as you type",
                "Calculation history saved to browser",
                "Export history to CSV",
                "Copy result to clipboard",
                "100% browser-based — no data sent to server",
                "No registration required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Monthly Commute Budget Planning",
              scenario: "A commuter drives 22 miles each way to work, 5 days a week, 22 working days per month = 968 miles/month. Their car averages 32 MPG and local gas is $3.45/gallon. 968 ÷ 32 = 30.25 gallons × $3.45 = $104.36/month. They use the calculator each month when prices change to update their fuel budget before building the full household budget.",
            },
            {
              title: "Road Trip Cost Comparison: Two Routes",
              scenario: "A traveler is comparing two road trip routes from LA to Seattle: Route A is 1,135 miles (mostly highway); Route B is 1,050 miles but with mountain terrain. Their car gets 34 MPG on flat highway but around 26 MPG in hills. At $3.80/gallon: Route A = 1,135 ÷ 34 × $3.80 = $126.91. Route B = 1,050 ÷ 26 × $3.80 = $153.46. The shorter route costs $26 more due to the efficiency hit — they choose Route A.",
            },
            {
              title: "Business Mileage Reimbursement",
              scenario: "A sales representative drives 340 miles for a client visit. Their company reimburses actual fuel costs. Their car gets 29 MPG; current diesel price is $4.10/gallon. 340 ÷ 29 = 11.72 gal × $4.10 = $48.07. They enter this in the calculator, export the CSV, attach it to their expense report, and submit. The CSV includes distance, efficiency, price, and calculated cost — complete documentation for the finance team.",
            },
            {
              title: "Comparing Two Vehicles Before Buying",
              scenario: "A buyer is deciding between a 25 MPG SUV and a 42 MPG hybrid. They commute 15,000 miles per year at an average $3.70/gallon. SUV annual fuel cost: 15,000 ÷ 25 × $3.70 = $2,220. Hybrid: 15,000 ÷ 42 × $3.70 = $1,321. The hybrid saves $899/year in fuel. The hybrid costs $4,500 more to buy — payback in exactly 5 years. At 8 years of ownership, the hybrid saves $2,192 in net fuel costs after recouping the price premium.",
            },
            {
              title: "Delivery Driver Per-Job Fuel Cost",
              scenario: "A freelance delivery driver is evaluating whether a 45-km delivery job at €18 pay is worthwhile. Their van gets 11 km/L; diesel is €1.65/liter. 45 ÷ 11 = 4.09 L × €1.65 = €6.75 fuel one-way; round trip = €13.50. Net pay after fuel: €18 − €13.50 = €4.50 for 90 km of driving. They use the calculator to quickly screen jobs before accepting and set a minimum job pay rate relative to expected distance.",
            },
            {
              title: "European Road Trip Multi-Segment Budget",
              scenario: "A couple is planning a 10-day road trip through France, Switzerland, and Italy. They calculate each segment separately because fuel prices differ per country: France 420 km at €1.72/L; Switzerland 180 km at CHF 2.10/L; Italy 510 km at €1.85/L. Their car gets 18 km/L. France: €40.13; Switzerland: CHF 21.00; Italy: €52.42. Total fuel budget across all three: approximately €120–€130 depending on exchange rates — gives them a clear pre-trip number for the travel budget.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Track your real-world MPG from your own fuel log by dividing miles driven by gallons filled at each fill-up. Average your last 5–10 fill-ups. This is far more accurate than the manufacturer's test rating and reflects your actual driving conditions.",
                "For long road trips, reduce your entered MPG by 10–15% if your route has significant mountain driving or you plan to cruise at 75+ mph. Aerodynamic drag at highway speeds disproportionately increases consumption.",
                "Use the cost-per-mile or cost-per-km output when comparing vehicles or deciding between driving and other transport options. At $0.15/mile, a 200-mile trip costs $30 — directly comparable to a train ticket or ride-share fare.",
                "For multi-country road trips in Europe, calculate each country separately with its own fuel price and distance. Fuel prices vary 20–40% between countries and using one average price misestimates the total.",
                "Update the fuel price field before each long trip — prices can change 10–15% in a month. For a 500-mile trip, a $0.30/gallon price difference is about $5 on the total cost — small, but worth knowing for tight travel budgets.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use the manufacturer's EPA or WLTP fuel efficiency rating. These test cycle numbers are measured under ideal conditions and consistently overstate real-world efficiency. Most drivers achieve 10–20% lower MPG in real use. Using the rated figure will underestimate your actual fuel cost.",
                "Don't forget to double the distance for round trips. One of the most common errors is entering one-way distance and wondering why the actual fuel spend was twice the estimate. For a return journey, enter total distance traveled.",
                "Don't mix unit systems. If you enter distance in miles but accidentally enter fuel efficiency in km/L instead of MPG, the result will be wrong by a factor of approximately 2.35. Always verify both fields are in the same system before reading the result.",
                "Don't use city MPG for a predominantly highway route or vice versa. If your car's city rating is 22 MPG and highway is 31 MPG, a mixed commute is approximately 26 MPG. Using the wrong figure can under- or over-estimate cost by 30%.",
                "Don't ignore the fuel price direction when planning a long trip. If fuel prices are trending up, estimate based on the price you expect on the return leg, not today's price. A 10-cent/gallon rise on a 15-gallon return segment adds $1.50 — small but good planning practice for budgeting.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Fuel Cost Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Cost per 100 Miles at $3.50/gal</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">MPG</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Gallons / 100 mi</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cost / 100 mi</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Vehicle Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["15", "6.67", "$23.33", "Large truck / SUV"],
                    ["20", "5.00", "$17.50", "Mid SUV"],
                    ["25", "4.00", "$14.00", "Average sedan"],
                    ["30", "3.33", "$11.67", "Efficient sedan"],
                    ["35", "2.86", "$10.00", "Small car"],
                    ["40", "2.50", "$8.75",  "Economy car"],
                    ["50", "2.00", "$7.00",  "Hybrid"],
                    ["60", "1.67", "$5.83",  "Strong hybrid"],
                  ].map(([mpg, gal, cost, type]) => (
                    <tr key={mpg} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{mpg}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{gal}</td>
                      <td className="py-1.5 px-3 font-mono text-green-600 font-semibold text-xs">{cost}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Cost per 100 km at €1.70/L</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">km/L</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">L/100km</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cost / 100 km</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Vehicle Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["8",  "12.5 L", "€21.25", "Large diesel SUV"],
                    ["10", "10.0 L", "€17.00", "Mid diesel"],
                    ["12", "8.3 L",  "€14.17", "Typical petrol"],
                    ["14", "7.1 L",  "€12.14", "Efficient petrol"],
                    ["16", "6.25 L", "€10.63", "Small petrol"],
                    ["20", "5.0 L",  "€8.50",  "Economy car"],
                    ["25", "4.0 L",  "€6.80",  "Hybrid"],
                  ].map(([kml, l100, cost, type]) => (
                    <tr key={kml} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{kml}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{l100}</td>
                      <td className="py-1.5 px-3 font-mono text-green-600 font-semibold text-xs">{cost}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Fuel Cost Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🚗", title: "Daily Commuters", desc: "Calculate monthly fuel spend accurately for household budgeting. Update as fuel prices change to track the real cost of commuting against alternatives like transit." },
            { icon: "🛣️", title: "Road Trippers", desc: "Budget fuel costs for multi-day trips and compare route options by total fuel cost. Plan stop locations based on expected fuel spend per leg." },
            { icon: "🚚", title: "Delivery Drivers", desc: "Evaluate job profitability by calculating fuel cost against job pay before accepting. Track per-job fuel costs for accurate earnings accounting." },
            { icon: "💼", title: "Business Travelers", desc: "Generate documented fuel cost calculations for expense reimbursement reports. Export CSV records for submission to finance departments." },
            { icon: "🛒", title: "Car Buyers", desc: "Compare the real annual fuel cost of two vehicles before buying. Quantify the long-term fuel savings of a more efficient car against its price premium." },
            { icon: "🌍", title: "International Travelers", desc: "Plan fuel budgets for multi-country road trips in Europe and Asia where both distances (km) and efficiency ratings (km/L or L/100km) use metric units." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
