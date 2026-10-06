import { houseWiringLoadCalculatorConfig } from "./config";

export default function HouseWiringLoadCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const faqItems = houseWiringLoadCalculatorConfig.seo.faq;
  const howToSteps: [string, string][] = houseWiringLoadCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

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
            every result. Free, no signup required.
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
            <li><strong>Current:</strong> adjusted load divided by supply voltage (120V, 230V or 240V, or 220V where still used), giving the amperage the service must supply</li>
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
                "Support for 120V, 230V and 240V systems (and legacy 220V)",
                "Adjustable diversity factor slider (0.5–1.0)",
                "Standard breaker size recommendation with 1.25x margin",
                "Apparent power (VA) output for panel sizing",
                "Full step-by-step calculation shown for every result",
                "Calculation history (last 20 entries)",
                "Export results as CSV or text report",
                "Private: your inputs are not collected or stored",
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
              scenario: "A tenant in a UK studio flat enters 8 LED bulbs (10W), 3 ceiling fans (75W), 1 refrigerator (300W), 1 TV (60W), and 1 washing machine (500W) at 230V with a 0.8 diversity factor. Total connected load is 1,165W, adjusted load is 932W, current is 4.1A, and the calculator recommends a 6A breaker — confirming the existing consumer unit has ample headroom.",
            },
            {
              title: "3-Bedroom House Service Sizing",
              scenario: "An electrician estimating service size for a 3-bedroom home applies the 'Medium House' preset: 15 LED bulbs, 3 ceiling fans, 2 mini-split ACs, a refrigerator, microwave, 2 TVs, washing machine, and an electric water heater at 240V, 0.8 diversity. Total load is 8,935W, adjusted to 7,148W, giving 29.8A and a 1.25x-adjusted requirement of 37.2A — the calculator recommends a 40A breaker.",
            },
            {
              title: "Large House with Multiple AC Units",
              scenario: "A contractor bidding on a 4-bedroom house with four AC units uses the 'Large House' preset — 25 bulbs, 5 fans, three mini-splits and a 2-ton central AC, kitchen appliances, 2 water heaters and a well pump — at 230V. The total connected load is 19,215W; after 0.8 diversity the current is 66.8A, and with the 1.25x safety factor the calculator points to a 100A main supply.",
            },
            {
              title: "EV Charger Addition to Existing Panel",
              scenario: "A homeowner planning to add a 48A Level 2 EV charger first calculates their existing house load using the Medium House preset (29.8A at 240V), then manually adds a 48A charger entry sized at 240V×48A=11,520W. The combined adjusted load rises to about 68A, or 85A with the safety factor, showing the homeowner they likely need a service upgrade or a load management device before installing the charger.",
            },
            {
              title: "Conservative Worst-Case Estimate",
              scenario: "An inspector wants to verify a panel can handle every appliance running simultaneously and sets the diversity factor to 1.0 instead of the typical 0.8, using the same Medium House appliance list. Adjusted load jumps from 7,148W to the full 8,935W connected load at 240V, current rises to 37.2A, and the required breaker recommendation increases from 40A to 50A — illustrating how much the diversity factor affects sizing.",
            },
            {
              title: "US Voltage Comparison",
              scenario: "A DIYer compares the same appliance list at 120V and 230V to understand why current depends on voltage. At 7,148W adjusted load, 120V gives 59.6A (needing an 80A breaker) while 230V gives 31.1A (needing only a 40A breaker) — the same power, about double the current at half the voltage. US homes avoid this by feeding large loads at 240V.",
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
                "Cross-check your calculator result against your electrical panel's main breaker rating before assuming you have spare capacity. A 100A panel with an existing 7,148W adjusted load at 240V (29.8A) still has meaningful headroom, but always verify the panel's labeled rating, not just an assumption.",
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
                "Don't select the wrong voltage for your region. Entering 120V for a 230V European household (or vice versa) doubles or halves the calculated current and produces a breaker recommendation that's wrong by roughly a factor of two — always confirm your panel's labeled system voltage first.",
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
                    ["Mini-Split AC (18,000 BTU)", "Cooling", "1,800W"],
                    ["Induction Cooktop", "Kitchen", "2,000W"],
                    ["Washing Machine", "Laundry", "500W"],
                    ["Clothes Dryer", "Laundry", "3,000W"],
                    ["Water Heater (electric)", "Heating", "3,000W"],
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
