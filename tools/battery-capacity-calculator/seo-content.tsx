export default function BatteryCapacityCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a battery capacity calculator?",
      a: "A battery capacity calculator is a free online tool that computes the required battery size, in amp-hours (Ah) and watt-hours (Wh), to power a given load for a target runtime. Enter load power, battery voltage, desired runtime, and system efficiency, and the calculator returns both the ideal and efficiency-adjusted capacity needed.",
    },
    {
      q: "What is the formula for battery capacity?",
      a: "Energy (Wh) = Power (W) × Runtime (hours). Capacity (Ah) = Energy (Wh) ÷ Voltage (V). For example, a 100W load running for 5 hours needs 100 × 5 = 500Wh, and at 12V that's 500 ÷ 12 ≈ 41.67Ah of ideal capacity before adjusting for system efficiency.",
    },
    {
      q: "Why do I need to adjust battery capacity for efficiency?",
      a: "Real battery systems lose some energy to internal resistance, inverter conversion losses, and discharge inefficiency, so the ideal Ah figure understates what you actually need to buy. Adjusted Capacity = Ideal Capacity ÷ Efficiency — at 80% efficiency (typical for lead-acid), a 41.67Ah ideal requirement becomes 52.08Ah of actual battery capacity needed.",
    },
    {
      q: "What efficiency should I use for different battery types?",
      a: "Lead-acid batteries typically run around 80% round-trip efficiency due to higher internal resistance and voltage sag under load. Lithium-ion batteries run around 90%. LiFePO4 (lithium iron phosphate) batteries run around 95%, among the most efficient common chemistries, which is one reason they're increasingly preferred for solar and backup applications despite a higher upfront cost.",
    },
    {
      q: "How do I calculate the current a battery will discharge?",
      a: "Current (A) = Power (W) ÷ Voltage (V). A 300W load on a 24V battery draws 300 ÷ 24 = 12.5A. This figure is important for checking that your battery's maximum discharge current rating and the connecting cable's ampacity can handle the load safely.",
    },
    {
      q: "Why does battery voltage matter for sizing?",
      a: "For the same power and runtime, a higher-voltage battery system needs proportionally fewer amp-hours, since Ah = Wh ÷ V. A 500Wh requirement needs about 41.7Ah at 12V but only about 20.8Ah at 24V — this is one reason larger solar and backup systems often use 24V or 48V battery banks rather than 12V, since it reduces both the Ah requirement and the current (and therefore cable size) needed.",
    },
    {
      q: "How much battery capacity do I need for an 8-hour LED lighting backup?",
      a: "For a 60W LED lighting load at 12V running 8 hours: Energy = 60 × 8 = 480Wh, ideal capacity = 480 ÷ 12 = 40Ah. Adjusted for 80% lead-acid efficiency: 40 ÷ 0.8 = 50Ah — so a 50Ah (or larger, for margin) 12V lead-acid battery would cover this load.",
    },
    {
      q: "Should I size a battery to its rated capacity or add margin?",
      a: "Add margin beyond the calculated adjusted capacity — most battery chemistries shouldn't be regularly discharged to 100% of rated capacity, since deep discharging shortens cycle life significantly for lead-acid batteries especially. A common practice is sizing for 20-30% additional headroom beyond the calculated requirement, particularly for lead-acid systems.",
    },
    {
      q: "How is this different from a battery backup time calculator?",
      a: "This calculator solves for required capacity given a target runtime — useful when specifying a new battery. A battery backup time calculator solves the reverse problem, estimating how long an existing battery of known capacity will last under a given load — useful when checking an already-purchased battery's runtime.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, runtime, and battery type values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter load power", "Input the total power in watts (W) that the connected equipment draws."],
    ["Enter battery voltage", "Input the nominal battery voltage — commonly 12V, 24V, or 48V for backup and solar systems."],
    ["Enter desired runtime", "Input how many hours you need the load to run on battery power."],
    ["Select battery type", "Choose lead-acid, lithium-ion, or LiFePO4 — each has a different default efficiency assumption built in."],
    ["Read the required capacity", "View both ideal capacity (Ah) and efficiency-adjusted capacity, along with total energy (Wh) and discharge current (A)."],
    ["Apply a preset or export results", "Use a built-in preset for common scenarios like LED backup, router backup, or solar systems, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Battery Capacity Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>battery capacity calculator</strong> computes the required battery size, in
            amp-hours (Ah) and watt-hours (Wh), to power a given load for a target runtime. Enter load
            power, battery voltage, desired runtime, and battery type, and the calculator returns both the
            ideal capacity and an efficiency-adjusted figure that accounts for real-world conversion and
            discharge losses.
          </p>
          <p>
            The basic math — Energy = Power × Time, then Capacity = Energy ÷ Voltage — is simple
            multiplication and division, but sizing a real battery also requires accounting for the fact
            that no battery system is 100% efficient. Lead-acid, lithium-ion, and LiFePO4 chemistries have
            meaningfully different round-trip efficiencies, and skipping this adjustment leads to
            under-buying capacity that looks correct on paper but underdelivers in practice. This tool
            builds in default efficiency figures for each chemistry so the adjustment isn't missed.
          </p>
          <p>
            Built for <strong>solar system designers, RV and camper owners, and anyone specifying backup
            power</strong> for outages or off-grid use. Includes six built-in presets from LED lighting
            backup to full solar systems, full step-by-step derivation, and text export — free and entirely
            browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Battery Capacity Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Energy (Wh)</span> = Power (W) × Runtime (hours)</p>
              <p><span className="font-semibold">Ideal Capacity (Ah)</span> = Energy (Wh) ÷ Voltage (V)</p>
              <p><span className="font-semibold">Adjusted Capacity</span> = Ideal Capacity ÷ Efficiency</p>
              <p><span className="font-semibold">Current (A)</span> = Power ÷ Voltage</p>
              <p className="text-gray-500 text-xs mt-2">Example: 100W load, 12V, 5 hours, 80% efficiency</p>
              <p className="text-gray-500 text-xs">Ideal: 41.67Ah, Adjusted: <span className="text-green-600 font-semibold">52.08Ah</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Lead-acid</strong> — default efficiency 80%, lower cost, shorter cycle life</li>
            <li><strong>Lithium-ion</strong> — default efficiency 90%, higher energy density</li>
            <li><strong>LiFePO4</strong> — default efficiency 95%, longest cycle life among common chemistries</li>
            <li>Higher battery voltage reduces the Ah requirement for the same power and runtime</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Battery Capacity Calculator
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
                "Real-time calculation as you type",
                "Ideal and efficiency-adjusted capacity (Ah)",
                "Total energy required (Wh)",
                "Discharge current (A) calculation",
                "Battery type-specific default efficiency (lead-acid, Li-ion, LiFePO4)",
                "Full step-by-step derivation",
                "Six built-in presets (LED, solar, RV, more)",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
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
              title: "LED Lighting Backup Sizing",
              scenario: "A homeowner sizing battery backup for 60W of LED lighting at 12V, needed for 8 hours during outages, uses lead-acid battery type. The calculator returns 40Ah ideal capacity, adjusted to 50Ah at 80% efficiency — guiding them to purchase a 50Ah or larger 12V lead-acid battery.",
            },
            {
              title: "Router and Modem Backup",
              scenario: "A remote worker needing internet backup during outages sizes a lithium-ion battery for a 30W router and modem load at 12V for 4 hours. The calculator returns 10Ah ideal, adjusted to 11.11Ah at 90% lithium-ion efficiency — a small, easily portable battery pack covers this need.",
            },
            {
              title: "Solar System Battery Bank Sizing",
              scenario: "An off-grid solar installer sizing a battery bank for a 500W load at 24V running 10 hours overnight uses LiFePO4 chemistry. The calculator returns 208.33Ah ideal capacity, adjusted to 219.3Ah at 95% efficiency — informing the battery bank specification for the system design.",
            },
            {
              title: "RV/Camper House Battery Sizing",
              scenario: "An RV owner sizing house batteries for a 200W average load at 12V over a 12-hour camping night uses lithium-ion chemistry. The calculator returns 200Ah ideal, adjusted to 222.2Ah at 90% efficiency — used to select an appropriately sized lithium battery bank for their camper.",
            },
            {
              title: "Emergency Home Backup Power",
              scenario: "A homeowner planning emergency backup for a 300W critical load (refrigerator, some lighting) at 24V for 6 hours uses LiFePO4 chemistry. The calculator returns 75Ah ideal, adjusted to 78.9Ah — helping size an emergency battery system with margin added for real-world safety.",
            },
            {
              title: "Small Inverter Load Battery Selection",
              scenario: "A hobbyist running a 100W inverter load at 12V for 5 hours uses lead-acid battery type. The calculator returns 41.67Ah ideal, adjusted to 52.08Ah at 80% efficiency, plus a discharge current of 8.33A — confirming a common 55Ah or 60Ah deep-cycle battery would comfortably cover this use case.",
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
                "Add 20-30% margin beyond the calculated adjusted capacity, especially for lead-acid batteries — regularly discharging to 100% of rated capacity shortens cycle life significantly compared to keeping some reserve.",
                "Use higher voltage battery banks (24V or 48V rather than 12V) for larger loads — this reduces both the Ah requirement and the current draw, which in turn reduces the cable gauge needed to safely handle the connection.",
                "Choose LiFePO4 for applications with frequent deep discharge cycles despite the higher upfront cost — its longer cycle life and higher efficiency often result in a lower total cost of ownership over the system's lifetime.",
                "Always check the discharge current against your battery's maximum continuous discharge rating, not just its Ah capacity — some batteries have capacity to spare but can't safely deliver high current for the load you're planning.",
                "Use this calculator's ideal Wh figure to compare battery options across different voltages and chemistries on an even footing, since Wh represents total stored energy independent of voltage.",
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
                "Sizing to the ideal (unadjusted) capacity figure and ignoring efficiency losses. This under-sizes the actual battery needed, especially for lower-efficiency lead-acid systems where the gap between ideal and adjusted capacity can be 20% or more.",
                "Using a generic 'average' power figure for loads that have variable or peak draw, like refrigerators with compressor startup surges. Size for the realistic peak or average-over-time figure, not just nameplate wattage.",
                "Assuming all battery chemistries share the same efficiency. Lead-acid, lithium-ion, and LiFePO4 have meaningfully different round-trip efficiencies — always select the correct battery type for an accurate adjusted capacity.",
                "Forgetting that battery capacity ratings often assume a specific discharge rate (like a 20-hour or 100-hour rate for lead-acid). Actual usable capacity can be lower at faster discharge rates than the manufacturer's rated Ah figure suggests.",
                "Ignoring temperature effects on battery capacity. Cold temperatures significantly reduce usable capacity for most battery chemistries, particularly lead-acid — size with margin if the battery will operate in cold conditions.",
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
          Battery Type Efficiency Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Battery Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Default Efficiency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Lead-acid", "80%", "Cost-sensitive backup, automotive, low-cycle applications"],
                ["Lithium-ion", "90%", "Portable electronics, RVs, moderate-cycle backup"],
                ["LiFePO4", "95%", "Solar systems, frequent-cycle applications, longest lifespan"],
              ].map(([type, eff, use]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{eff}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Default efficiency figures are typical estimates — actual efficiency varies by manufacturer, discharge rate, and battery age.</p>
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
          Who Uses This Battery Capacity Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "☀️", title: "Solar System Designers", desc: "Size battery banks for off-grid and backup solar installations based on load, runtime, and chemistry." },
            { icon: "🚐", title: "RV & Camper Owners", desc: "Determine house battery capacity needed to power appliances and electronics through a camping trip." },
            { icon: "🏠", title: "Homeowners", desc: "Plan emergency backup power systems for outages, sizing batteries for critical household loads." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Size battery packs for portable projects and equipment requiring a specific runtime." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn battery sizing calculations and the role of efficiency in real-world energy storage systems." },
            { icon: "🏢", title: "Facility Managers", desc: "Specify backup battery systems for critical equipment during utility power interruptions." },
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
