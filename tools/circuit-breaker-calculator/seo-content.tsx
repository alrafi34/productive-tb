export default function CircuitBreakerCalculatorSEO() {
  const faqItems = [
    { q: "What is a circuit breaker calculator?", a: "A circuit breaker calculator determines the correct amperage rating for a circuit breaker protecting an electrical load. It converts your load in watts or kilowatts into current using the supply voltage, phase type, and power factor, applies the NEC 125% continuous load factor when required, and recommends the smallest standard breaker size that safely carries that current." },
    { q: "How is circuit breaker size calculated?", a: "For single-phase loads, current is I = P ÷ (V × PF). For three-phase loads, current is I = P ÷ (√3 × V × PF), where P is power in watts, V is voltage, and PF is power factor. If the load is continuous — expected to run 3 or more hours — the current is multiplied by 1.25 before the calculator selects the nearest standard breaker size at or above that adjusted value." },
    { q: "Why is there a 125% factor for continuous loads?", a: "The National Electrical Code requires branch circuit breakers to be sized at 125% of a continuous load's current so the breaker doesn't operate at its full thermal rating for hours at a time. Continuous loads — lighting, HVAC, water heaters, EV chargers — generate sustained heat in the breaker; the 25% margin keeps the breaker within its long-term rating and prevents nuisance tripping and premature wear." },
    { q: "What power factor should I use?", a: "Use 1.0 for purely resistive loads such as incandescent lighting, heating elements, and electric ranges. Use 0.8 to 0.9 for inductive loads like motors, compressors, and fluorescent or HID lighting ballasts. If the equipment nameplate lists a power factor, use that value instead of an estimate for the most accurate current calculation." },
    { q: "When should I use three-phase instead of single-phase?", a: "Use three-phase for industrial equipment, large motors above roughly 5 HP, commercial HVAC systems, and any equipment specifically built for a three-phase supply. Three-phase circuits draw less current than single-phase for the same power delivered, because of the √3 factor in the denominator, which is why factories and commercial buildings prefer it for heavy loads." },
    { q: "What is the difference between a circuit breaker and a fuse?", a: "Both protect a circuit from overcurrent, but a circuit breaker can be reset and reused after it trips, while a fuse must be physically replaced once it blows. Breakers are standard in modern panels because they're faster to restore after a nuisance trip; fuses remain common in older installations, some industrial equipment, and smaller in-line applications." },
    { q: "Does this calculator account for voltage drop?", a: "No — this calculator sizes the breaker to the load current alone. Voltage drop is a separate concern that depends on cable length and wire gauge, and it can require a larger wire size even when the breaker size itself is correct. Use a dedicated voltage drop calculator alongside this one for circuits with long cable runs." },
    { q: "Can I use a larger breaker than the calculator recommends?", a: "No. An oversized breaker will not trip when the wire feeding it overheats, defeating the purpose of the protection. The breaker must be sized to protect the conductor, not just to accommodate the load — always match the breaker to both the calculated current and the ampacity of the wire actually installed." },
    { q: "Why does the calculator warn about high current loads?", a: "The calculator flags loads producing more than 80A of current because circuits at this level typically require larger conductors, may need three-phase distribution, and often fall under stricter code requirements for service entrance or feeder sizing. It's a prompt to double-check wire gauge and consider whether three-phase power is more appropriate for the load." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your load, voltage, phase type, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the total load", "Type the load in watts or kilowatts using the unit selector. Use the equipment's actual rated power, not an average — sizing for peak load is what keeps the breaker from nuisance tripping under normal conditions."],
    ["Select supply voltage", "Choose from 120V, 230V, 240V, 400V, or 415V depending on your electrical system. US systems typically use 120V or 240V; EU and much of Asia use 230V single-phase or 400V three-phase."],
    ["Choose single-phase or three-phase", "Select the phase type matching your electrical supply. Three-phase circuits use the √3 factor in the current formula and draw less current than single-phase for the same power, which is why heavy industrial and commercial loads use it."],
    ["Set load type", "Mark the load as Continuous if it runs 3 or more hours at a time — lighting, HVAC, EV chargers — or Non-Continuous for intermittent loads like power tools. Continuous loads get the NEC 125% safety factor applied automatically."],
    ["Enter power factor", "Use 1.0 for resistive loads like heaters and incandescent lighting, or 0.8–0.9 for motors and other inductive equipment. A lower power factor increases the calculated current for the same real power."],
    ["Read the recommended breaker size", "The calculator returns the calculated current, the adjusted current after the continuous load factor, the recommended standard breaker size, and a wire gauge suggestion. Export the result or save it to history for your project records."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Circuit Breaker Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>circuit breaker calculator</strong> is a free electrical tool that determines the correct
            breaker amperage for a load based on its power, supply voltage, phase type, and power factor. It answers
            the question every electrician and panel designer faces before flipping a single breaker into a panel:
            <em> what size breaker does this circuit actually need?</em>
          </p>
          <p>
            Breaker sizing isn't just picking the closest number. An undersized breaker trips under normal operation,
            while an oversized breaker fails to protect the wire it's meant to guard — letting a fault overheat the
            conductor well past its safe limit before the breaker ever reacts. Continuous loads add another layer:
            NEC guidelines require a 125% safety margin for anything running 3 hours or longer, so the breaker
            doesn't operate at its full thermal rating for extended periods.
          </p>
          <p>
            This <strong>breaker size calculator</strong> is built for <strong>licensed electricians sizing panel
            circuits, electrical engineers designing power distribution systems, panel builders speccing MCBs and
            MCCBs, and homeowners or DIYers planning permitted electrical work</strong>. It supports single-phase
            and three-phase systems with instant results and a wire gauge recommendation. Browser-based, free, no
            signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Circuit Breaker Sizing Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">I (single-phase)</span> = P ÷ (V × PF)</p>
              <p><span className="font-semibold">I (three-phase)</span> = P ÷ (√3 × V × PF)</p>
              <p><span className="font-semibold">Adjusted Current</span> = I × 1.25 <span className="text-gray-400">(continuous loads only)</span></p>
              <p className="text-gray-500 text-xs mt-2">P = power (W) · V = voltage (V) · PF = power factor (0–1)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Phase-aware current:</strong> single-phase and three-phase loads use different denominators, so the same power draws different current depending on system type</li>
            <li><strong>Continuous load factor:</strong> loads expected to run 3+ hours get a 125% safety margin per NEC guidelines, non-continuous loads do not</li>
            <li><strong>Power factor correction:</strong> resistive loads (PF ≈ 1.0) draw less current than inductive loads (PF ≈ 0.8–0.9) for the same real power</li>
            <li><strong>Standard breaker ladder:</strong> the calculator only recommends real, purchasable sizes — 6A up through 400A — never an arbitrary in-between value</li>
            <li><strong>Safety margin &amp; wire gauge:</strong> the calculator reports the headroom between the breaker and adjusted current, plus a matching wire gauge suggestion for the circuit</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Circuit Breaker Calculator
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
                "Recommended breaker size from the standard ladder",
                "Calculated and continuous-load-adjusted current",
                "Safety margin percentage",
                "Wire gauge recommendation based on adjusted current",
                "Single-phase and three-phase support",
                "Five voltage presets (120V–415V)",
                "6 built-in common load presets",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
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
              title: "Residential Lighting Circuit",
              scenario: "An electrician is sizing a breaker for a 1200W residential lighting circuit at 230V, single-phase, power factor 1.0, marked continuous. Current works out to 5.22A; with the 125% factor applied, adjusted current is 6.52A. The calculator recommends a 10A breaker — a 34.7% safety margin, comfortable headroom for a lighting circuit.",
            },
            {
              title: "1.5 Ton Air Conditioner",
              scenario: "A homeowner is confirming breaker sizing for a 2000W, 230V single-phase AC unit with a 0.9 power factor, continuous load. Current is 9.66A, adjusted to 12.08A with the continuous factor. The calculator recommends a 16A breaker, matching common practice for residential 1.5-ton split AC installations.",
            },
            {
              title: "3kW Electric Water Heater",
              scenario: "A contractor is wiring a dedicated circuit for a 3kW, 230V single-phase water heater, power factor 1.0, continuous load. Current is 13.04A, adjusted to 16.3A. The calculator recommends a 20A breaker, and the wire gauge panel suggests 12 AWG (2.5 mm²) copper for the run.",
            },
            {
              title: "5.5kW Three-Phase Motor",
              scenario: "An industrial electrician is protecting a 5.5kW conveyor motor running at 400V three-phase with a 0.85 power factor, continuous duty. Using the three-phase formula, current is 9.33A, adjusted to 11.66A. The calculator recommends a 16A breaker — far less current than an equivalent single-phase motor would draw at the same power.",
            },
            {
              title: "Kitchen Appliance Circuit",
              scenario: "An electrician is sizing a mixed kitchen circuit at 4000W, 230V single-phase, 0.95 power factor, marked non-continuous since it's a mix of intermittent appliances. Current is 18.32A with no continuous factor applied. The calculator recommends a 20A breaker with a 9.2% safety margin — tight enough that the calculator flags it for review.",
            },
            {
              title: "Office Equipment Circuit",
              scenario: "A facilities engineer is protecting a 2500W office circuit of computers and printers at 230V single-phase, 0.9 power factor, continuous load since equipment runs all day. Current is 12.08A, adjusted to 15.1A with the continuous factor. The calculator recommends a 16A breaker for the dedicated office circuit.",
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
                "Mark a load as continuous whenever it's expected to run 3 hours or longer at a stretch — lighting, HVAC, water heaters, and EV chargers all qualify. Skipping the 125% factor on these loads produces a breaker that runs at its full thermal limit for hours, accelerating wear and increasing nuisance trip risk.",
                "Always cross-check the recommended breaker against the wire gauge actually installed, not just the load. A 20A breaker protecting 14 AWG wire (rated for 15A) is a code violation regardless of what the load calculation says — breaker and conductor must be coordinated together.",
                "For motors and other inductive loads, use a power factor of 0.8 to 0.9 rather than defaulting to 1.0. Using 1.0 for a motor circuit understates the true current draw, which can lead to an undersized breaker that trips under normal running conditions.",
                "When a load calculates to more than 80A on a single-phase system, seriously evaluate whether three-phase power is available or practical. The same power delivered at three-phase draws meaningfully less current, often allowing a smaller breaker and lighter conductors.",
                "Size for future growth on shared circuits like sub-panels and workshop feeders. Choosing one breaker size larger than the immediate calculated need, within safe limits, saves a re-pull later if you add equipment — but never do this by ignoring the calculated minimum.",
                "Use the wire gauge recommendation as a starting point, not a final answer. It's based on ampacity alone — for cable runs longer than about 15 meters, also run a voltage drop calculation, since a run that's fine for ampacity can still need a larger wire to keep voltage drop in range.",
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
                "Don't install a larger breaker than recommended just because it's what's on hand. An oversized breaker won't trip in time to protect the wire during an overcurrent fault, allowing insulation to overheat well past its safe operating temperature.",
                "Don't forget the continuous load factor on loads that clearly run for hours, like HVAC compressors or lighting banks. Skipping it because the non-continuous number 'looks close enough' produces a breaker sized 20% too small for sustained operation.",
                "Don't use single-phase formulas for three-phase equipment or vice versa. Applying the wrong formula changes the calculated current substantially — three-phase current is roughly 42% lower than the equivalent single-phase current for the same power.",
                "Don't ignore the low-safety-margin case. A breaker recommendation with less than 10% headroom above the adjusted current is prone to nuisance tripping from normal load variation; consider stepping up one standard size for circuits that see load fluctuation.",
                "Don't skip a separate voltage drop check on long cable runs. This calculator sizes the breaker to the load current only — a circuit with a correctly sized breaker can still need a larger wire gauge than ampacity alone suggests once cable length is factored in.",
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
          Standard Breaker Size Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Breaker Size</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Load</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Suggested Wire Gauge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10A", "LED lighting circuits, low-power outlets", "14 AWG (1.5 mm²)"],
                ["16A – 20A", "General power outlets, window AC units", "12 AWG (2.5 mm²)"],
                ["25A", "Kitchen appliances, mid-size AC units", "10 AWG (4 mm²)"],
                ["32A – 40A", "Electric ranges, water heaters, EV chargers (L1/L2)", "8 AWG (6 mm²)"],
                ["50A", "Large water heaters, sub-panel feeders", "6 AWG (10 mm²)"],
                ["63A – 80A", "Small industrial motors, workshop feeders", "4 AWG (16 mm²)"],
                ["100A", "Sub-panel main, residential service upgrades", "2 AWG (25 mm²)"],
                ["125A – 200A", "Main service entrance, commercial feeders", "Consult NEC Table 310.16"],
                ["250A – 400A", "Large commercial/industrial service, motor control centers", "Consult a licensed electrician"],
              ].map(([size, use, wire]) => (
                <tr key={size} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{size}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{use}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{wire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Wire gauge suggestions assume standard 75°C copper ampacity in typical residential conditions. Always verify against local code and derate for bundling, ambient temperature, or long cable runs.</p>
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
          Who Uses This Circuit Breaker Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Size panel breakers quickly on the job site, confirming NEC continuous load compliance before closing up a panel schedule." },
            { icon: "🏗️", title: "Electrical Engineers", desc: "Design building power distribution, spec breaker schedules for panels, and verify sizing for motor circuits and lighting feeders during design review." },
            { icon: "🏭", title: "Panel Builders", desc: "Select MCB and MCCB ratings for control panels and distribution boards, coordinating breaker size with conductor ampacity for each circuit." },
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Plan permitted electrical work — adding a sub-panel, wiring an EV charger, or replacing a tripped breaker — with the correct amperage before buying parts." },
            { icon: "🔧", title: "Facilities & Maintenance Technicians", desc: "Evaluate existing circuits when adding equipment, checking whether current breakers can handle a load increase before authorizing new installations." },
            { icon: "🎓", title: "Electrical Students", desc: "Work through NEC breaker sizing exercises, verify continuous load factor examples, and build intuition for single-phase versus three-phase current calculations." },
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
