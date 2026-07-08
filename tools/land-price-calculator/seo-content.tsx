export default function LandPriceCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a land price calculator?",
      a: "A land price calculator is a free online tool that computes the total cost of a land parcel by multiplying the area size by the price rate per unit. For example, a 5 Decimal plot at BDT 500,000 per Decimal equals BDT 2,500,000. It supports all major South Asian and international land units — Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, and Hectare — and handles unit conversion automatically when the area and rate units differ.",
    },
    {
      q: "How is total land price calculated?",
      a: "Total land price equals Area × Rate Per Unit. When the area unit and rate unit are the same, the calculation is direct. When they differ — for example, area in Acres but rate in Decimal — the tool first converts the area to match the rate unit, then multiplies. The formula is: Total Price = (Area converted to rate unit) × Rate. For a 2-Acre plot at BDT 800,000 per Decimal, the tool converts 2 Acres to 200 Decimal, then calculates 200 × 800,000 = BDT 160,000,000.",
    },
    {
      q: "What is land price per square foot and how do I calculate it?",
      a: "Land price per square foot is the rate divided by 1 square foot of area. To calculate total price from a per-square-foot rate, multiply the total area in square feet by the rate. For example, 3,000 square feet at $120 per square foot equals $360,000. This calculator accepts square feet as both an area and rate unit, so you can enter the area and rate directly without manual unit conversion.",
    },
    {
      q: "How do I calculate land value per acre?",
      a: "Enter the total area in Acres and the price per Acre as the rate. The calculator multiplies them directly — for example, 3.5 Acres at $45,000 per Acre equals $157,500. Alternatively, if you only know the price per square foot, set the rate unit to Square Feet and the area unit to Acres — the tool converts automatically so you get the correct total without any manual arithmetic.",
    },
    {
      q: "What currencies does this calculator support?",
      a: "The calculator supports USD ($), EUR (€), GBP (£), BDT (৳ — Bangladeshi Taka), and INR (₹ — Indian Rupee). The selected currency symbol appears in the result display and any exported output. Currency conversion between units is not performed — the tool applies the currency symbol to the entered rate and calculates the total in that currency.",
    },
    {
      q: "Can I compare two land deals with this calculator?",
      a: "Yes. The comparison mode lets you enter two separate land deals — each with its own area, unit, and rate — and see both totals side by side with a clear indication of which is cheaper and by how much. This is useful when evaluating multiple listings, negotiating between two sellers, or comparing a larger lower-priced plot against a smaller higher-priced one to determine actual value per unit.",
    },
    {
      q: "What is the land rate calculator and how is it different from a land price calculator?",
      a: "A land rate calculator works in reverse: you enter the total price and the area, and it calculates the rate per unit. A land price calculator takes the area and rate and calculates the total. This tool does both — enter any two known values to find the third. If you know a plot sold for BDT 3,500,000 and it was 7 Decimal, the rate was BDT 500,000 per Decimal.",
    },
    {
      q: "How do I calculate land price per square meter?",
      a: "Select Square Meter as both the area unit and the rate unit. Enter the area in square meters and the price per square meter. For example, 250 square meters at $1,200 per square meter equals $300,000. If your area is in a different unit (say Decimal) but your rate is per square meter, select Decimal as the area unit and Square Meter as the rate unit — the conversion is applied automatically.",
    },
    {
      q: "What is agricultural land value and how is it estimated?",
      a: "Agricultural land value depends on soil quality, water access, crop yield potential, proximity to markets, and local comparable sales. This calculator does not determine market value — it computes the total cost once you know the price per unit from market research or a professional appraisal. For agricultural land in South Asia, Decimal and Bigha are the most common rate units. Enter the agreed rate per Decimal or per Bigha and the plot size to get the total transaction amount.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your land values, rates, and inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is saved only in your browser's localStorage and remains on your device.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the land area", "Type the numeric area of the plot into the area field. Enter the value in whatever unit you know — the calculator supports Decimal, Acre, Katha, Bigha, Square Feet, Square Meter, and Hectare. You can enter whole numbers or decimals, such as 5, 2.5, or 0.75."],
    ["Select the area unit", "Choose the unit that matches your entered area — for example, Decimal if your deed says '8 Decimal' or Acre if you are working from an international listing. The area unit and rate unit can be different; the tool converts between them automatically."],
    ["Enter the price rate per unit", "Type the price per unit of land area — for example, 500,000 if the rate is BDT 500,000 per Decimal, or 120 if the rate is $120 per square foot. This is the rate per single unit of the rate unit you will select next."],
    ["Select the rate unit and currency", "Choose the unit that your price rate refers to. If the rate is per Decimal, select Decimal. If per Square Foot, select Square Feet. Then choose your currency — USD, EUR, GBP, BDT, or INR. The currency symbol is applied to all results."],
    ["Read the total price", "The total land price appears instantly. If the area and rate units differ, the converted area is shown alongside the total so you can verify the calculation. The breakdown table shows the price at different area sizes for reference."],
    ["Use comparison mode for multiple deals", "Switch to comparison mode to enter two separate land deals side by side. Both totals are calculated simultaneously and the cheaper option is highlighted with the price difference shown — useful for evaluating competing listings or negotiating between sellers."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Land Price Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>land price calculator</strong> is a free online tool that computes the total cost of a
            land parcel by multiplying the area by the price rate per unit. It answers the core question in
            every property transaction: <em>if this plot is 8 Decimal at BDT 600,000 per Decimal, what is
            the total price?</em>
          </p>
          <p>
            The challenge that buyers, sellers, and agents run into is unit mismatch. Land area may be quoted
            in Decimal while the market rate is discussed per Katha. A listing might show area in Acres while
            the comparable sales data is priced per Square Foot. Converting manually before multiplying adds
            steps and introduces errors — especially when dealing with units like Bigha that have different
            sizes in different regions. This tool handles all unit conversions automatically: enter the area
            in any unit and the rate in any unit, and it calculates the correct total.
          </p>
          <p>
            Built for <strong>property buyers and sellers in Bangladesh and India, real estate agents, land
            surveyors, developers planning construction budgets, farmers evaluating agricultural land leases,
            and legal document preparers handling property valuations</strong>. Supports Decimal, Acre, Katha,
            Bigha, Square Feet, Square Meter, and Hectare — with multi-currency output in USD, EUR, GBP, BDT,
            and INR. Fully browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Land Price Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The core calculation is straightforward. When area and rate units match, it is direct multiplication.
            When they differ, the tool converts first, then multiplies.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Total Price</span> = Area × Rate Per Unit</p>
              <p><span className="font-semibold">With unit conversion:</span> Total = (Area in Rate Unit) × Rate</p>
              <p className="text-gray-500 text-xs mt-2">Example (same units): 8 Decimal × BDT 500,000 = <span className="text-green-600 font-semibold">BDT 4,000,000</span></p>
              <p className="text-gray-500 text-xs">Example (mixed units): 2 Acres × BDT 800,000/Decimal → 200 Decimal × BDT 800,000 = <span className="text-green-600 font-semibold">BDT 160,000,000</span></p>
            </div>
          </div>
          <p>Key outputs the tool provides:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Total price</strong> — in your selected currency</li>
            <li><strong>Converted area</strong> — shown when area and rate units differ, so you can verify the conversion</li>
            <li><strong>Price breakdown table</strong> — total cost at 25%, 50%, 75%, and 100% of the entered area</li>
            <li><strong>Rate per square foot / square meter</strong> — derived rate for quick comparison</li>
            <li><strong>Comparison result</strong> — which of two deals is cheaper and by how much</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Land Price Calculator
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
                "Total land price in your chosen currency",
                "Automatic unit conversion when area and rate units differ",
                "Supports Decimal, Acre, Katha, Bigha, Sq Feet, Sq Meter, Hectare",
                "Multi-currency: USD, EUR, GBP, BDT, INR",
                "Price breakdown at 25%, 50%, 75%, 100% area",
                "Derived rate per square foot and square meter",
                "Comparison mode for two deals side by side",
                "Real-time results as you type",
                "Save and export calculation history",
                "Browser-based — no data sent to any server",
                "No signup required",
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
              title: "Residential Plot Purchase in Bangladesh",
              scenario: "A buyer in Dhaka is negotiating for an 8 Decimal plot in Mirpur. The seller quotes BDT 650,000 per Decimal. The buyer enters 8 Decimal at BDT 650,000 and sees the total: BDT 5,200,000. They then use comparison mode to check a second plot — 6 Decimal at BDT 750,000 per Decimal (BDT 4,500,000 total). The second plot is BDT 700,000 cheaper but 2 Decimal smaller — the calculator shows the per-square-foot rate for both, helping the buyer judge actual value.",
            },
            {
              title: "Agricultural Land Lease Valuation",
              scenario: "A farmer in West Bengal is leasing 3 Bigha of paddy land. The local market rate is INR 45,000 per Katha per year. The farmer needs to know the annual lease cost. They enter 3 Bigha as the area and INR 45,000 per Katha as the rate. The tool converts 3 Bigha (Bangladesh standard: 33.06 Katha) and calculates INR 1,487,700 per year. The farmer uses this to verify the landlord's quoted figure of INR 1.5 lakh — and spots that the landlord is using a different Katha standard.",
            },
            {
              title: "Developer Land Acquisition Budget",
              scenario: "A property developer is evaluating a 1.5-acre site in a suburban area quoted at $28 per square foot. They enter 1.5 Acres as the area and $28 per Square Foot as the rate. The tool converts 1.5 Acres to 65,340 sq ft and calculates $1,829,520 total. The breakdown table shows that at $28/sq ft, each 0.25-acre increment adds $457,380 to the budget — useful for phased acquisition planning.",
            },
            {
              title: "NRI Property Comparison Across Markets",
              scenario: "An NRI is comparing land prices between their hometown in Bangladesh and a plot in the UK. The Bangladesh plot is 12 Decimal at BDT 400,000 per Decimal (BDT 4,800,000). The UK plot is 0.05 Acres at £850 per square foot. By running both calculations and checking the derived per-square-meter rate for each, they can compare the two investments on a common basis despite the different units and currencies.",
            },
            {
              title: "Real Estate Agent Client Presentation",
              scenario: "An agent in Chittagong has a client interested in three different plots: 5 Decimal at BDT 550,000/Decimal, 4 Decimal at BDT 700,000/Decimal, and 7 Decimal at BDT 420,000/Decimal. They run all three through the calculator and present: BDT 2,750,000, BDT 2,800,000, and BDT 2,940,000 respectively. The breakdown shows the cheapest total (Plot 1) but the highest value per Decimal in Plot 1 as well — information the client needs to make a decision.",
            },
            {
              title: "Property Tax and Legal Document Preparation",
              scenario: "A legal clerk preparing a land deed needs to state the official valuation for a 2.5 Katha plot in Dhaka. Government rates are published per Decimal. The clerk enters 2.5 Katha as area and the government rate per Decimal as the rate unit. The tool converts 2.5 Katha (4.13 Decimal) and returns the official valuation in BDT. The result is used directly in the mutation application and stamp duty calculation.",
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
                "Use the derived per-square-foot or per-square-meter rate to compare plots of different sizes fairly. A 10 Decimal plot at BDT 500,000 per Decimal and a 15 Decimal plot at BDT 470,000 per Decimal may seem similar, but the per-square-foot rate reveals which is genuinely cheaper per unit of area.",
                "When comparing two deals in comparison mode, always verify both use the same regional Katha or Bigha standard. A rate quoted in 'per Katha' by a seller in Bihar is 1.89× more expensive in real area terms than the same quoted number from a seller in Bangladesh.",
                "For large transactions, use the price breakdown table to understand cost increments. If you are negotiating to reduce the area from 10 Decimal to 8 Decimal, the breakdown shows exactly how much that saves at the given rate — useful for counter-offer calculations.",
                "When you only know the total price and want the rate, divide the total by the area. Enter the area and adjust the rate field until the total matches — or use a reverse calculation by entering total price ÷ area manually as a quick check.",
                "For government stamp duty calculations, always use the government's published rate per unit — not the agreed sale price — since most jurisdictions use official rate schedules rather than market price for tax assessment purposes.",
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
                "Don't mix up area unit and rate unit without checking the conversion. Entering 5 Decimal as area and a per-Acre rate as the rate without selecting the correct rate unit will produce a result 100× too low — since 1 Acre = 100 Decimal.",
                "Don't assume Katha prices from different regions are comparable. A BDT 500,000-per-Katha rate in Bihar (where 1 Katha = 1,361 sq ft) buys significantly more land per unit cost than the same quoted rate in Bangladesh (where 1 Katha = 720 sq ft). Always confirm which regional Katha definition applies.",
                "Don't confuse market value with appraised or government value. This calculator computes Total = Area × Rate, but the rate you enter determines the result. Use market rates for negotiation, government rates for stamp duty, and appraised rates for bank loan applications — they are often different.",
                "Don't skip the comparison mode when evaluating multiple listings. A plot that looks cheaper per Decimal may have a higher total cost if it is larger. The comparison mode shows both totals and the per-unit rate side by side so the true value difference is immediately clear.",
                "Don't enter the total price where the rate per unit is expected. The rate field expects the price for one unit of area (e.g., BDT 500,000 per Decimal), not the total price of the plot. Entering the total price in the rate field will give a result that is too high by a factor of the plot size.",
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
          Land Price Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Price at BDT 500,000 / Decimal</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Area</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Total Price (BDT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1 Decimal",  "1",    "500,000"],
                    ["3 Decimal",  "3",    "1,500,000"],
                    ["5 Decimal",  "5",    "2,500,000"],
                    ["8 Decimal",  "8",    "4,000,000"],
                    ["10 Decimal", "10",   "5,000,000"],
                    ["20 Decimal", "20",   "10,000,000"],
                    ["1 Katha",    "1.653","826,500"],
                    ["1 Bigha",    "33.06","16,530,000"],
                    ["1 Acre",     "100",  "50,000,000"],
                  ].map(([area, dec, total]) => (
                    <tr key={area} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-700 text-xs">{area}</td>
                      <td className="py-2 px-3 font-mono text-gray-500 text-xs">{dec}</td>
                      <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Unit Conversion Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Unit</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Feet</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1 Decimal",   "435.6",     "1",      "0.01"],
                    ["1 Katha (BD)","720",        "1.653",  "0.01653"],
                    ["1 Bigha (BD)","14,400",     "33.06",  "0.3306"],
                    ["1 Acre",      "43,560",     "100",    "1"],
                    ["1 Sq Meter",  "10.764",     "0.0247", "0.000247"],
                    ["1 Hectare",   "107,639",    "247.1",  "2.471"],
                  ].map(([unit, sqft, dec, acre]) => (
                    <tr key={unit} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-700 text-xs">{unit}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{sqft}</td>
                      <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{dec}</td>
                      <td className="py-2 px-3 font-mono text-gray-500 text-xs">{acre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Katha and Bigha shown are Bangladesh standard. Bihar and Nepal values differ — use the decimal-land-calculator for regional conversions.</p>
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
          Who Uses This Land Price Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏡",
              title: "Property Buyers & Sellers",
              desc: "Calculate the exact total cost of a plot before negotiating, verify a seller's quoted total against the stated area and rate, and compare multiple listings on a consistent per-unit basis.",
            },
            {
              icon: "🏢",
              title: "Real Estate Agents",
              desc: "Present accurate valuations to clients instantly. Run multiple listing comparisons in seconds and provide per-square-foot breakdowns that help clients understand price differences between properties.",
            },
            {
              icon: "⚖️",
              title: "Legal & Tax Professionals",
              desc: "Calculate property valuations for deeds, mutation applications, stamp duty assessments, and inheritance documentation using official government rate schedules per unit area.",
            },
            {
              icon: "🌾",
              title: "Farmers & Agricultural Buyers",
              desc: "Estimate total lease or purchase costs for agricultural land quoted in Bigha, Katha, or Decimal. Compare rates across regions where the same unit name refers to different actual areas.",
            },
            {
              icon: "🏗️",
              title: "Developers & Builders",
              desc: "Calculate land acquisition costs for project budgets, compare site options by total price and per-square-foot rate, and prepare financial models for investor presentations.",
            },
            {
              icon: "✈️",
              title: "NRIs Managing Overseas Property",
              desc: "Convert and calculate property costs in BDT or INR while working from abroad. Compare local market rates against international benchmarks using the derived per-square-meter output.",
            },
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
