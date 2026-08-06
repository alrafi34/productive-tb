export default function HouseWiringLoadCalculatorSEO() {
  const faqItems = [
    { q: "What is a house wiring load calculator?", a: "A house wiring load calculator is a tool that sums the wattage of every appliance in a home, applies a diversity factor to account for appliances not all running at once, and converts the result into the current draw and recommended circuit breaker size. It answers the question every homeowner and electrician needs before sizing a panel: how much current will this house actually pull, and what breaker rating handles it safely?" },
    { q: "How is total electrical load calculated?", a: "The calculator multiplies each appliance's quantity by its wattage to get an individual load, then sums every appliance's load into a total connected load in watts. This total is then multiplied by your chosen diversity factor to produce the adjusted load, which is the realistic figure used for sizing rather than the theoretical worst case of every appliance running simultaneously." },
    { q: "What is a diversity factor and why does it matter?", a: "A diversity factor is a multiplier between 0.5 and 1.0 that accounts for the fact that not every appliance in a house runs at the same time — a refrigerator, an oven, and an air conditioner rarely all draw full power simultaneously. Applying a realistic diversity factor (commonly 0.7 to 0.8 for residential use) avoids oversizing the electrical panel and wiring for a peak load that almost never actually occurs." },
    { q: "How does the calculator determine the recommended breaker size?", a: "The calculator divides the adjusted load by your supply voltage to get current in amperes, multiplies that current by a 1.25 safety factor (the standard continuous-load margin), and then selects the nearest standard breaker size at or above that required capacity from the list 6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, and 200 amps." },
    { q: "Why does the calculator apply a 1.25 safety factor to the current?", a: "Electrical codes require continuous loads — those expected to run for three hours or more — to be sized at 125% of their calculated current, not 100%. This safety margin prevents breakers and conductors from operating at their absolute thermal limit continuously, which would shorten insulation life and increase nuisance tripping risk." },
    { q: "What voltage should I select for my calculation?", a: "Select the voltage that matches your electrical system: 110V is standard in North America for general outlets, 220V is common across most of Asia and continental Europe, 230V is the UK and much of Europe's nominal standard, and 240V is used in Australia and parts of the Pacific. Using the wrong voltage will produce an incorrect current and breaker recommendation, since current is inversely proportional to voltage for a given wattage." },
    { q: "What does apparent power mean in the results?", a: "Apparent power, measured in volt-amperes (VA), is the adjusted load divided by an assumed residential power factor of 0.9. It represents the total power the electrical system must supply including the reactive component drawn by motors and inductive appliances like fans and compressors, and is a more complete figure than the real power in watts alone for panel and transformer sizing." },
    { q: "How accurate is the appliance wattage library?", a: "The built-in appliance library provides typical wattage values for common household devices, from a 10W LED bulb to a 3000W clothes dryer, based on standard residential ratings. Actual appliance wattage varies by manufacturer and model, so for a precise final calculation, check the nameplate rating on each specific appliance rather than relying solely on the library defaults." },
    { q: "Can this calculator replace a professional electrical load calculation for permits?", a: "No. This calculator provides a fast planning estimate using simplified diversity and safety factors, useful for budgeting and early design decisions. Formal load calculations submitted for permits typically follow a jurisdiction's specific code method (such as NEC Article 220 in the US), which applies different demand factors to specific load categories and must be performed or verified by a licensed electrician." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your appliance list, wattage values, voltage, and diversity factor are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Add your appliances", "Click 'Add Appliance' for each device in the home, or start from the Appliance Library for common presets like LED bulbs, ceiling fans, refrigerators, and air conditioners with typical wattage already filled in."],
    ["Enter quantity and wattage", "For each appliance row, enter how many units you have and the wattage per unit — check the appliance nameplate for the most accurate figure. The calculator multiplies quantity by wattage automatically for each row."],
    ["Select your supply voltage", "Choose 110V, 220V, 230V, or 240V to match your electrical system. This directly affects the current calculation, since current equals power divided by voltage."],
    ["Set the diversity factor", "Adjust the slider between 0.5 and 1.0 to reflect how much of your connected load actually runs at once. 0.7–0.8 is standard for typical residential usage; use 1.0 only for a conservative worst-case estimate."],
    ["Read the total load and breaker recommendation", "The calculator instantly shows total connected load, adjusted load after diversity, current in amperes, apparent power in VA, and the recommended standard breaker size with a 1.25x safety margin applied."],
    ["Save, export, or start from a house-size preset", "Apply one of three built-in configurations — Small Apartment, Medium House, or Large House — as a starting point, then save the calculation to history or export a CSV or text report for documentation."],
  ];

  return (
    <>
      {/* 1. Introduction */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a House Wiring Load Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>house wiring load calculator</strong> is a free tool that adds up the wattage of every
            appliance and light in a home, applies a diversity factor for realistic simultaneous usage, and
            converts the result into current draw and a recommended circuit breaker size. It answers the
            practical question every homeowner, electrician, and panel installer faces: <em>how much electrical
            capacity does this house actually need?</em>
          </p>
          <p>
            Getting this number wrong in either direction causes real problems. Undersizing the main breaker or
            panel leads to nuisance tripping, overheated wiring, and a system that can't support future
            appliances. Oversizing wastes money on unnecessarily large panels, breakers, and service entrance
            conductors. A proper load calculation — connected load, diversity-adjusted load, current, and a
            code-appropriate safety margin — finds the right size the first time.
          </p>
          <p>
            This tool is built for <strong>homeowners planning a panel upgrade or new circuit, licensed
            electricians estimating service size for residential jobs, contractors bidding electrical work, and
            electrical engineering students learning load calculation and diversity factor concepts</strong>. It
            includes a 34-item appliance wattage library across lighting, cooling, kitchen, laundry, and
            electronics categories, three ready-made house-size presets, and full calculation steps shown for
            every result. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How House Wiring Load Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Total Load</span> = Σ (Quantity × Wattage) for all appliances</p>
              <p><span className="font-semibold">Adjusted Load</span> = Total Load × Diversity Factor</p>
              <p><span className="font-semibold">Current (A)</span> = Adjusted Load ÷ Voltage</p>
              <p><span className="font-semibold">Recommended Breaker</span> = nearest standard size ≥ Current × 1.25</p>
              <p className="text-gray-500 text-xs mt-2">Apparent Power (VA) = Adjusted Load ÷ Power Factor (assumed 0.9 for residential loads)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Total connected load:</strong> the sum of every appliance's quantity times wattage — the theoretical maximum if everything ran at once</li>
            <li><strong>Diversity factor:</strong> a 0.5–1.0 multiplier reflecting realistic simultaneous usage, typically 0.7–0.8 for residential homes</li>
            <li><strong>Current:</strong> adjusted load divided by supply voltage (110V, 220V, 230V, or 240V), giving the amperage the service must supply</li>
            <li><strong>1.25× safety factor:</strong> the standard continuous-load margin applied before selecting a breaker, matching code practice for loads expected to run 3+ hours</li>
            <li><strong>Standard breaker sizing:</strong> the calculator rounds up to the nearest of 15 standard breaker ratings from 6A to 200A rather than an arbitrary number</li>
          </ul>
        </div>
      </section>

      {/* 3. Step-by-Step */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the House Wiring Load Calculator
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time calculation as you edit appliances",
                "34-item appliance wattage library across 9 categories",
                "Three house-size presets: Small Apartment, Medium, Large",
                "Support for 110V, 220V, 230V, and 240V systems",
                "Adjustable diversity factor slider (0.5–1.0)",
                "Standard breaker size recommendation with 1.25x margin",
                "Apparent power (VA) output for panel sizing",
                "Full step-by-step calculation shown for every result",
                "Calculation history (last 20 entries) saved locally",
                "Export results as CSV or text report",
                "100% browser-based — no data sent to a server",
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

      {/* 4. Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Small Apartment Panel Check",
              scenario: "A homeowner in a studio apartment enters 8 LED bulbs (10W), 3 ceiling fans (75W), 1 refrigerator (300W), 1 TV (60W), and 1 washing machine (500W) at 220V with a 0.8 diversity factor. Total connected load is 1,265W, adjusted load is 1,012W, current is 4.6A, and the calculator recommends a 6A breaker — confirming the existing panel has ample headroom.",
            },
            {
              title: "3-Bedroom House Service Sizing",
              scenario: "An electrician estimating service size for a 3-bedroom home applies the 'Medium House' preset: 15 LED bulbs, 5 ceiling fans, 2 1.5-ton ACs, a refrigerator, microwave, 2 TVs, washing machine, and water heater at 220V, 0.8 diversity. Total load is 8,085W, adjusted to 6,468W, giving 29.4A and a 1.25x-adjusted requirement of 36.75A — the calculator recommends a 40A breaker.",
            },
            {
              title: "Large House with Multiple AC Units",
              scenario: "A contractor bidding on a 4-bedroom house with 3 AC units uses the 'Large House' preset — 25 bulbs, 8 fans, three 1.5-ton and one 2-ton AC, kitchen appliances, and 2 water heaters — at 230V UK voltage. The total connected load exceeds 15,000W; after 0.8 diversity and the 1.25x safety factor, the calculator points to a 63A or 80A main breaker depending on the exact appliance count entered.",
            },
            {
              title: "EV Charger Addition to Existing Panel",
              scenario: "A homeowner planning to add a 48A Level 2 EV charger first calculates their existing house load using the Medium House preset (29.4A at 220V), then manually adds a 48A charger entry sized at 240V×48A=11,520W. The combined adjusted load pushes current well past 40A, showing the homeowner they likely need a panel upgrade or load management device before installing the charger.",
            },
            {
              title: "Conservative Worst-Case Estimate",
              scenario: "An inspector wants to verify a panel can handle every appliance running simultaneously and sets the diversity factor to 1.0 instead of the typical 0.8, using the same Medium House appliance list. Adjusted load jumps from 6,468W to the full 8,085W connected load, current rises to 36.75A, and the required breaker recommendation increases from 40A to 50A — illustrating how much the diversity factor affects sizing.",
            },
            {
              title: "US Voltage Comparison",
              scenario: "A US-based DIYer compares their appliance list at 110V versus 220V to understand why American homes often need higher-amperage panels than European homes for the same wattage. At 6,468W adjusted load, 110V produces 58.8A (needing an 80A breaker) versus 220V producing 29.4A (needing only a 40A breaker) — the same power, double the current, at half the voltage.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tips & Mistakes */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Check the actual nameplate wattage on your appliances rather than relying solely on the library defaults. A specific refrigerator model can range from 150W to 400W depending on size and efficiency rating — the library value of 300W is a reasonable starting estimate, not a substitute for the real number.",
                "Use a diversity factor of 0.7–0.8 for typical residential planning, but consider 0.9–1.0 for homes with heavy simultaneous usage patterns, such as a house running central AC, an electric range, and an EV charger at the same time during summer evenings.",
                "Give dedicated circuits to high-wattage single appliances like water heaters, electric ranges, and AC compressors — these should generally be calculated and breakered separately from the general diversified household load rather than folded entirely into one aggregate number.",
                "Add 20–25% headroom to your final calculated load if you're planning a panel for a home you expect to add appliances to later — an EV charger, a hot tub, or a home addition. Upgrading a panel later is far more expensive than sizing it correctly the first time.",
                "Remember that motor-driven appliances like air conditioners and refrigerator compressors draw a brief inrush current at startup that's several times their running wattage. This calculator uses steady-state wattage, so breaker trip curves (not just average current) matter for circuits with multiple motor loads starting together.",
                "Cross-check your calculator result against your electrical panel's main breaker rating before assuming you have spare capacity. A 100A panel with an existing 6,468W adjusted load at 220V (29.4A) still has meaningful headroom, but always verify the panel's labeled rating, not just an assumption.",
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
                "Don't leave the diversity factor at 1.0 for routine residential sizing. This models every appliance running full-tilt simultaneously, which almost never happens in practice and results in an oversized, more expensive panel and service entrance than the home actually needs.",
                "Don't select the wrong voltage for your region. Entering 110V for a 220V European household (or vice versa) doubles or halves the calculated current and produces a breaker recommendation that's wrong by roughly a factor of two — always confirm your panel's labeled system voltage first.",
                "Don't forget to include large, occasional-use appliances like clothes dryers (up to 3000W), electric ovens (2000W), and window AC units when estimating total load. Omitting even one high-wattage appliance can understate your total connected load significantly.",
                "Don't treat this calculator's output as a substitute for a code-compliant load calculation on a permitted job. This tool uses a simplified diversity-factor method for planning; formal permit submissions typically require a jurisdiction-specific method like NEC Article 220 with category-specific demand factors, performed by a licensed electrician.",
                "Don't apply the same 1.25x safety factor logic to interpret this as the maximum safe continuous draw on the recommended breaker. The 1.25x factor sizes the breaker to the calculated load; it does not mean you can safely run 125% of your original calculated current through that circuit indefinitely.",
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

      {/* 6. Reference Table */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Appliance Wattage &amp; Diversity Factor Reference
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Typical Appliance Wattages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Appliance</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Wattage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["LED Bulb", "Lighting", "10W"],
                    ["Ceiling Fan", "Fans", "75W"],
                    ["Refrigerator", "Kitchen", "300W"],
                    ["Microwave Oven", "Kitchen", "1,000W"],
                    ["Air Conditioner (1.5 Ton)", "Cooling", "1,800W"],
                    ["Induction Cooktop", "Kitchen", "2,000W"],
                    ["Washing Machine", "Laundry", "500W"],
                    ["Clothes Dryer", "Laundry", "3,000W"],
                    ["Water Heater (Geyser)", "Heating", "2,000W"],
                    ["Desktop Computer", "Electronics", "300W"],
                  ].map(([name, cat, watt]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{name}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{cat}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{watt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Full 34-item library available in the calculator's Appliance Library panel. Always verify against the actual appliance nameplate for precision.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Diversity Factor by Usage Scenario</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Factor</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Usage Scenario</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1.0", "All appliances on simultaneously", "Very conservative, rarely needed"],
                    ["0.8 – 0.9", "High usage periods", "Recommended for safety margin"],
                    ["0.7", "Normal residential usage", "Standard for most homes"],
                    ["0.5 – 0.6", "Low simultaneous usage", "Only for specific low-load cases"],
                  ].map(([factor, scenario, rec]) => (
                    <tr key={factor} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{factor}</td>
                      <td className="py-1.5 px-3 text-gray-700 text-xs">{scenario}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Diversity factor guidance is a general planning reference. Formal code calculations use category-specific demand factors rather than a single blended figure.</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
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

      {/* 8. Who Uses This */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This House Wiring Load Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Check whether an existing panel has capacity for a new appliance, EV charger, or room addition before calling an electrician." },
            { icon: "⚡", title: "Licensed Electricians", desc: "Produce a fast planning-stage load estimate for residential service upgrades and new construction before a formal code calculation." },
            { icon: "📋", title: "Electrical Contractors", desc: "Estimate panel and service size for bids on residential projects, using house-size presets as a quick starting benchmark." },
            { icon: "🏗️", title: "Home Builders & Developers", desc: "Plan typical service sizing across multiple similar housing units using consistent appliance assumptions and presets." },
            { icon: "🎓", title: "Electrical Students", desc: "Practice load calculation, diversity factor application, and breaker sizing exercises with real-time, step-by-step feedback." },
            { icon: "🔌", title: "Panel Upgrade Planners", desc: "Compare current load against panel capacity before adding major loads like induction cooktops, EV chargers, or heat pumps." },
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
