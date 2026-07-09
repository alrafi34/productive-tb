export default function PricePerSquareFeetCalculatorSEO() {
  const faqItems = [
    {
      q: "What is price per square foot?",
      a: "Price per square foot is the cost of one square foot of land area, calculated by dividing the total land price by the total area in square feet. It is the standard comparison metric in US and UK real estate because it normalizes price across plots of different sizes — a 500 sq ft plot at $200/sq ft and a 1,000 sq ft plot at $200/sq ft are at the same rate even though the total prices differ. This calculator outputs both price per square foot and price per square meter simultaneously.",
    },
    {
      q: "How do I calculate price per square foot?",
      a: "Price per sq ft = Total Price ÷ Area in square feet. If your area is not in square feet, convert it first: 1 Decimal = 435.6 sq ft; 1 Acre = 43,560 sq ft; 1 Katha (Bangladesh) = 720 sq ft; 1 Square Meter = 10.764 sq ft. Enter the total price and area into this calculator and it applies the conversion automatically, so you can input Decimal, Acre, Katha, Bigha, or any supported unit directly.",
    },
    {
      q: "How do I calculate price per square meter?",
      a: "Price per sq m = Total Price ÷ Area in square meters. Or derive it from the per-sq-ft result: Price per sq ft × 10.764 = Price per sq meter. This calculator outputs both simultaneously. If land is priced at BDT 1,000/sq ft, the equivalent is BDT 10,764/sq m. This matters because UK and European property valuations typically quote per square meter while US and many South Asian markets quote per square foot.",
    },
    {
      q: "What is land price per square foot in Bangladesh?",
      a: "In Bangladesh, land is typically priced per Decimal or per Katha, but conversion to per-sq-ft is required for bank valuations and legal documents. 1 Decimal = 435.6 sq ft; 1 Katha = 720 sq ft. Example: a plot of 5 Decimal priced at BDT 3,000,000 = BDT 3,000,000 ÷ (5 × 435.6) = BDT 1,377 per sq ft. Enter 5 Decimal and BDT 3,000,000 and this calculator returns the rate instantly.",
    },
    {
      q: "What is land price per square meter in the UK?",
      a: "UK land values vary enormously: £50–£300/sq m in rural areas; £500–£2,000/sq m in suburban areas; £5,000–£50,000/sq m in central London for prime residential. UK listings often quote in acres — enter Acre as the area unit and the calculator converts and outputs per sq m alongside per sq ft.",
    },
    {
      q: "How many square feet in 1 Decimal?",
      a: "1 Decimal = 435.6 square feet. This is the fixed international standard for the Decimal land unit (also called Shotok in Bengali). Multiply any Decimal area by 435.6 to get square feet, or select Decimal as the unit in this calculator for automatic conversion.",
    },
    {
      q: "How many square feet in 1 Katha?",
      a: "In Bangladesh and West Bengal, 1 Katha = 720 square feet. In Bihar, 1 Katha = 1,361.25 square feet. This calculator uses the Bangladesh/West Bengal standard (720 sq ft). If working with Bihar land records, note the different regional definition before using.",
    },
    {
      q: "How many square feet in 1 Acre?",
      a: "1 Acre = 43,560 square feet. This is a fixed international standard. 1 Acre = 100 Decimal = 43,560 sq ft. Entering Acre as the unit in this calculator converts automatically before computing the per-sq-ft rate.",
    },
    {
      q: "Can I compare two plots priced in different units?",
      a: "Yes. Calculate the price per square foot for each plot — that rate is unit-independent. A plot measured in Decimal at ৳900/sq ft and a plot measured in Katha at ৳900/sq ft are at the same rate. Running both through this calculator gives comparable per-sq-ft numbers regardless of input unit.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run in your browser. Your price, area, and currency inputs are never sent to any server or stored outside your device. Calculation history is saved only in your browser's localStorage.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter total land price", "Type the full purchase or listing price of the land in the price field. Select your currency — USD, BDT, INR, EUR, or GBP. The result updates instantly."],
    ["Enter land area", "Type the land size as a number. You can enter whole numbers or decimals — for example, 2500 (square feet), 3 (Decimal), or 0.5 (Acre)."],
    ["Select the area unit", "Choose the unit matching your land measurement: Square Feet, Square Meter, Decimal, Acre, Katha, Bigha, or Hectare. The calculator converts to square feet automatically before dividing."],
    ["Read price per sq ft and per sq meter", "Both price-per-square-foot and price-per-square-meter are shown simultaneously. This covers US, UK, and international market conventions without a separate calculation."],
    ["Review the breakdown table", "The breakdown table shows the total price at 0.25×, 0.5×, 1×, 2×, 5×, and 10× your entered area at the same rate. Useful for comparing adjacent plot sizes or estimating scaled costs."],
    ["Save or export", "Save the result to your local calculation history or download a TXT summary for documentation, client handoff, or property comparison records."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Price per Square Foot Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>price per square foot calculator</strong> is a free online tool that computes the
            land rate per unit area from a total land price and an area size. Enter the total price and
            the area in any supported unit — the calculator converts to square feet and square meters
            automatically and returns both rates at once.
          </p>
          <p>
            The challenge is unit variety. Land in Bangladesh is measured in Decimal or Katha; in the
            UK in acres; in Europe in square meters; in the US in square feet or acres. Comparing the
            value of plots measured in different units requires converting all areas to a common
            denominator before computing rates. This tool handles every combination: enter Decimal,
            Acre, Katha, Bigha, Square Meter, or Hectare, and get <strong>price per sq ft</strong>
            and <strong>price per sq m</strong> output simultaneously — covering US, UK, and
            international market conventions in one step.
          </p>
          <p>
            Built for <strong>property buyers comparing plots across different unit systems, real
            estate agents calculating and presenting land valuations, legal document preparers
            computing bank appraisal rates, land surveyors, and NRIs evaluating overseas land
            investments</strong>. Free, browser-based, no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Price per Square Foot Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Price / sq ft</span> = Total Price ÷ Area in sq ft</p>
              <p><span className="font-semibold">Price / sq m</span> = Total Price ÷ Area in sq m &nbsp;(or Price/sq ft × 10.764)</p>
              <p className="text-gray-500 text-xs mt-2">Example: BDT 2,500,000 for 3 Decimal (3 × 435.6 = 1,306.8 sq ft)</p>
              <p className="text-gray-500 text-xs">Price/sq ft = 2,500,000 ÷ 1,306.8 = <span className="text-green-600 font-semibold">BDT 1,913</span></p>
              <p className="text-gray-500 text-xs">Price/sq m = 1,913 × 10.764 = <span className="text-green-600 font-semibold">BDT 20,591</span></p>
            </div>
          </div>
          <p>Unit conversion factors applied automatically:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Unit</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Feet</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Meters</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["1 Sq Foot",         "1",          "0.0929",      "Base unit (US/UK)"],
                  ["1 Sq Meter",        "10.764",     "1",           "Base unit (international)"],
                  ["1 Decimal (Shotok)","435.6",      "40.47",       "Bangladesh / India"],
                  ["1 Katha (BD)",      "720",        "66.89",       "Bangladesh / West Bengal"],
                  ["1 Bigha (BD)",      "14,400",     "1,337.8",     "Bangladesh / West Bengal"],
                  ["1 Acre",            "43,560",     "4,046.9",     "Universal standard"],
                  ["1 Hectare",         "107,639",    "10,000",      "International standard"],
                ].map(([unit, sqft, sqm, note]) => (
                  <tr key={unit} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{unit}</td>
                    <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{sqft}</td>
                    <td className="py-2 px-3 font-mono text-gray-700 text-xs">{sqm}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Price per Square Foot Calculator
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
                "Price per sq ft and per sq m simultaneously",
                "Supports Sq Feet, Sq Meter, Decimal, Acre, Katha, Bigha, Hectare",
                "Multi-currency: USD, BDT, INR, EUR, GBP",
                "Automatic unit conversion before calculation",
                "Price breakdown at 0.25×, 0.5×, 1×, 2×, 5×, 10× area",
                "Real-time results as you type",
                "Calculation history saved to browser",
                "Export TXT summary",
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
              title: "Comparing Two Listings in Different Units",
              scenario: "A buyer in Dhaka is comparing two plots: Plot A is 6 Decimal at BDT 3,800,000, and Plot B is 4 Katha at BDT 3,200,000. They calculate Plot A: 3,800,000 ÷ (6 × 435.6) = BDT 1,454/sq ft. Plot B: 3,200,000 ÷ (4 × 720) = BDT 1,111/sq ft. Despite the lower total price, Plot A has a higher per-sq-ft rate — the buyer immediately sees that Plot B is better value per unit area.",
            },
            {
              title: "UK Rural Land per Square Meter",
              scenario: "A UK buyer is evaluating a 4.5-acre plot listed at £320,000. They need the per-sq-m rate to compare with a European plot quoted in euros per sq m. 4.5 Acres: 4.5 × 43,560 = 195,840 sq ft = 18,188 sq m. Price per sq m = £320,000 ÷ 18,188 = £17.59/sq m. The European plot is priced at €22/sq m — at current GBP/EUR rates (1.15), the UK plot is approximately equivalent at €20.2/sq m, making both comparable.",
            },
            {
              title: "Bank Appraisal Rate Calculation",
              scenario: "A loan officer is preparing a property valuation for a mortgage application. The title deed states the plot is 2.5 Katha in Mirpur, Dhaka. The registered purchase price is BDT 1,800,000. Bank policy requires the appraisal to state price per sq ft. 2.5 × 720 = 1,800 sq ft. BDT 1,800,000 ÷ 1,800 = BDT 1,000/sq ft. The bank officer uses this rate to cross-reference against local comparable sales data from the branch's rate schedule.",
            },
            {
              title: "Real Estate Agent Market Report",
              scenario: "An estate agency is preparing a quarterly market report for residential land in Chittagong. They have 12 completed transactions, each recorded in different area units (Decimal, Katha, sq ft mix). They process each transaction through the calculator and record the per-sq-ft rate. The report shows the average land rate moved from BDT 1,200/sq ft to BDT 1,380/sq ft — a 15% increase in one quarter, presented consistently despite the mixed input units.",
            },
            {
              title: "NRI Land Investment Comparison",
              scenario: "An NRI living in the US is comparing two inherited plots: one in Bangladesh (8 Decimal, valued at BDT 5,500,000 by local agent) and one in India (240 sq m, valued at INR 4,200,000 by local agent). BDT rate: 5,500,000 ÷ (8 × 435.6) = BDT 1,578/sq ft = BDT 16,990/sq m. INR rate: 4,200,000 ÷ 240 = INR 17,500/sq m. With current BDT/INR exchange rates, the NRI compares both in a common currency to decide which to sell.",
            },
            {
              title: "Subdivision Price Feasibility",
              scenario: "A developer is buying a 0.75-acre plot at $850,000 to subdivide into four equal lots of ~0.1875 acres each (8,168 sq ft each). Current price: $850,000 ÷ (0.75 × 43,560) = $25.97/sq ft. Target sale price per lot to profit: they need $240,000 per lot to clear development costs and margin = $240,000 ÷ 8,168 = $29.38/sq ft. Comparable lots in the area sell at $32/sq ft — the deal is feasible with a $2.62/sq ft margin.",
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
                "Always compare land on a per-sq-ft or per-sq-m basis, not on total price. A larger plot that costs more in total may be cheaper per unit area — the per-sq-ft rate is the only fair comparison metric across plots of different sizes.",
                "For bank loan applications and legal documentation in South Asia, always output the per-sq-ft rate alongside the total price. Most financial institutions require per-sq-ft pricing for valuation reports, and doing this manually introduces conversion errors.",
                "Use the breakdown table to quickly assess what adjacent plot sizes would cost at the same rate. If market rates change, you only need to re-enter the new price to get updated breakdowns for all size multiples.",
                "When comparing UK land (quoted in acres) against European land (quoted in sq m), calculate the per-sq-m rate for both using this tool, then apply the exchange rate. This gives a fair cross-border comparison.",
                "For agricultural land, run the price per sq ft calculation alongside a land price per Decimal or per Katha calculation — buyers and sellers in South Asia understand Decimal and Katha pricing intuitively, while banks require sq ft rates.",
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
                "Don't enter the area in the wrong unit. Entering 5 (meaning 5 Decimal) but selecting Square Feet as the unit will produce a dramatically wrong result — 5 sq ft instead of 5 × 435.6 = 2,178 sq ft. Always verify the unit selector matches your input.",
                "Don't confuse price per square foot with price per Decimal. These are different rates. A rate of BDT 1,000/sq ft equals BDT 435,600/Decimal (1,000 × 435.6). Quoting one when the other is expected in a document will cause significant errors.",
                "Don't use regional Katha or Bigha values without confirming the applicable standard. Bangladesh Katha (720 sq ft) and Bihar Katha (1,361.25 sq ft) differ by nearly 2×. Using the wrong regional definition doubles or halves the calculated rate.",
                "Don't calculate price per sq ft from an area that includes unusable land. If a 5 Decimal plot has 1 Decimal of road reservation, the usable area is 4 Decimal. Computing the rate on the full 5 Decimal understates the true land cost per usable area.",
                "Don't present per-sq-ft rates to clients in markets where per-Decimal or per-Katha is the standard. Presenting ৳1,378/sq ft to a Bangladeshi buyer who thinks in ৳600,000/Decimal will cause confusion — convert back to local convention for the client-facing number.",
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
          Who Uses This Price per Square Foot Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏡", title: "Property Buyers", desc: "Compare plots of different sizes and unit systems on a fair per-sq-ft or per-sq-m basis. Identify which listing offers better value per unit area before negotiating." },
            { icon: "🏢", title: "Real Estate Agents", desc: "Calculate and present land valuations in the standard metric buyers expect. Produce consistent market reports across transactions recorded in mixed units." },
            { icon: "⚖️", title: "Legal & Bank Professionals", desc: "Compute per-sq-ft rates for mortgage applications, title deeds, stamp duty calculations, and official land valuation reports." },
            { icon: "🌾", title: "Land Developers", desc: "Run feasibility checks on land acquisitions by comparing the purchase rate per sq ft against comparable sales and target resale pricing." },
            { icon: "✈️", title: "NRIs & Overseas Investors", desc: "Evaluate inherited or prospective land holdings in multiple countries using a single normalized metric — price per sq m — regardless of the local unit system." },
            { icon: "📐", title: "Surveyors & Valuers", desc: "Quickly produce per-sq-ft and per-sq-m valuations from survey measurements in any unit for inclusion in appraisal reports and legal documentation." },
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
