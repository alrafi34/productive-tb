export default function WireSizeCalculatorSEO() {
  const faqItems = [
    { q: "What is a wire size calculator?", a: "A wire size calculator is a tool that determines the correct electrical conductor size for a given load based on current, voltage, cable length, and conductor material. It checks two constraints: the wire must carry the required current without overheating (ampacity), and the voltage drop over the cable run must stay within acceptable limits — typically 3% for branch circuits." },
    { q: "How is wire size calculated?", a: "Wire sizing uses two parallel calculations. First, ampacity: the wire must be rated to carry the load current continuously. Second, voltage drop: VD = 2 × L × I × R / 1000 for single-phase, or VD = √3 × L × I × R / 1000 for three-phase, where L is length in meters, I is current in amperes, and R is the conductor resistance in Ω/km. The calculator selects the smallest wire size that satisfies both constraints simultaneously." },
    { q: "What wire size do I need for a 20-amp circuit?", a: "For a 20-amp, 120V single-phase branch circuit up to about 25 meters (80 feet), 2.5 mm² (12 AWG) copper wire is the standard choice. For longer runs — say 40 meters — voltage drop pushes the requirement to 4 mm² (10 AWG). Always enter your actual cable length into the calculator to get the correct size for your specific run." },
    { q: "What is the difference between AWG and mm²?", a: "AWG (American Wire Gauge) is the North American sizing system where smaller numbers mean larger wires — 10 AWG is larger than 14 AWG. mm² (square millimeters) is the metric system used in most of the world, directly expressing the conductor's cross-sectional area. 2.5 mm² ≈ 14 AWG, 4 mm² ≈ 12 AWG, 6 mm² ≈ 10 AWG, 10 mm² ≈ 8 AWG." },
    { q: "Should I use copper or aluminum wire?", a: "Copper is preferred for most residential and commercial wiring because it has 60% better conductivity than aluminum, higher ampacity per mm², and easier termination. Aluminum is lighter and cheaper per meter, making it cost-effective for large feeders and utility runs — but you need approximately 1.5× the cross-section to match copper ampacity, and aluminum connections require anti-oxidation compound and listed aluminum-rated connectors." },
    { q: "What is an acceptable voltage drop percentage?", a: "NEC and IEC guidelines recommend a maximum 3% voltage drop for branch circuits (from panel to load) and 2% for feeder circuits (from service entrance to panel), with a combined total of no more than 5%. Sensitive equipment like computers, medical devices, and precision instruments should use 1–2% as their limit. Exceeding 5% total can cause equipment malfunction, motor overheating, and reduced efficiency." },
    { q: "How do I measure cable length for the calculator?", a: "Measure the one-way distance from the power source to the load — for example, from the breaker panel to the outlet or motor. Do not double it manually; the voltage drop formula for single-phase already multiplies by 2 to account for the return conductor. Enter only the one-way run distance. For conduit runs with bends, add 10–15% extra to account for the actual routed path." },
    { q: "Why does the calculator recommend a larger wire than I expected?", a: "Long cable runs are the most common reason. A 15-amp circuit at 120V with a 60-meter run requires 6 mm² (10 AWG) — three wire sizes larger than the 2.5 mm² (14 AWG) that ampacity alone would require, because voltage drop at that distance forces the upgrade. Other factors: aluminum instead of copper, three-phase vs single-phase, and stricter voltage drop limits for sensitive loads all push toward larger conductors." },
    { q: "Does the calculator account for derating factors?", a: "This calculator uses standard ampacity values for typical conditions: 30°C ambient temperature, individual conductors in free air or a small conduit with limited bundling. If your installation has high ambient temperatures, many cables in the same conduit, or cables buried directly in the ground, apply the NEC Table 310.15 or IEC 60364 derating factors to the current before entering it into the calculator." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your current values, cable lengths, and system parameters are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter load current", "Type the full-load current in amperes. For motor circuits, use the nameplate full-load amp (FLA) rating. For general branch circuits, use the circuit breaker amperage. Always size for the maximum expected load, not the average."],
    ["Set voltage and system type", "Select your supply voltage (120V, 240V, 380V, 415V, 480V) and choose single-phase or three-phase. Three-phase systems require less conductor material for the same power — the calculator applies the correct √3 factor automatically."],
    ["Enter cable length", "Enter the one-way run distance from the source to the load in meters or feet. For conduit runs with multiple bends, add 10–15% to the straight-line distance to account for the actual routed path."],
    ["Choose conductor material", "Select copper or aluminum. Copper offers higher ampacity per mm² and is standard for most residential and commercial work. Aluminum requires a larger cross-section for the same current capacity but is cost-effective for large feeder runs."],
    ["Set maximum voltage drop", "Enter your maximum allowable voltage drop percentage — typically 3% for NEC branch circuits, 2% for feeders. Use 1–2% for sensitive equipment. The calculator finds the smallest wire that satisfies both the ampacity and voltage drop constraints simultaneously."],
    ["Read and apply the result", "The calculator returns the recommended wire size in both mm² and AWG, the actual voltage drop at that size, power loss in watts, and the next-size-up as a conservative alternative. Copy the result or export a text report for your project documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Wire Size Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>wire size calculator</strong> is a free electrical tool that determines the correct
            cable size for any circuit based on load current, supply voltage, cable run length, conductor
            material, and maximum allowable voltage drop. It answers the most common question in electrical
            installation: <em>what gauge wire do I need for this circuit?</em>
          </p>
          <p>
            Selecting the wrong size has real consequences. Undersized wire overheats under load — causing
            insulation degradation, nuisance tripping, fire risk, and failed inspections. Oversized wire
            wastes material cost and makes terminations harder. The correct size satisfies two independent
            constraints at once: ampacity (current-carrying capacity without overheating) and voltage drop
            (keeping the supply voltage within usable range at the load end).
          </p>
          <p>
            This <strong>cable size calculator</strong> is built for <strong>licensed electricians sizing
            branch circuits and feeders, electrical engineers designing building power systems, solar
            installers running DC and AC wiring, DIY homeowners planning permitted work, and students
            studying NEC or IEC cable sizing</strong>. Results are given in both mm² (metric / IEC) and
            AWG (North American), with single-phase and three-phase support. Browser-based, free, no
            signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Wire Size Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">VD (1-phase)</span> = 2 × L × I × R ÷ 1000</p>
              <p><span className="font-semibold">VD (3-phase)</span> = √3 × L × I × R ÷ 1000</p>
              <p><span className="font-semibold">VD%</span> = VD ÷ V<sub>supply</sub> × 100</p>
              <p className="text-gray-500 text-xs mt-2">L = one-way length (m) · I = current (A) · R = conductor resistance (Ω/km) · V = supply voltage</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Ampacity check:</strong> every wire size has a maximum current rating — the calculator selects only sizes rated above the load current</li>
            <li><strong>Voltage drop check:</strong> the calculator then tests each candidate size against the voltage drop formula and selects the smallest one that keeps VD% below your limit</li>
            <li><strong>Copper resistivity:</strong> ≈ 0.0172 Ω·mm²/m at 20°C — rising to ~0.0206 at 75°C operating temperature</li>
            <li><strong>Aluminum resistivity:</strong> ≈ 0.0282 Ω·mm²/m at 20°C — approximately 1.64× copper, requiring larger cross-section for identical performance</li>
            <li><strong>Three-phase advantage:</strong> the √3 (≈ 1.732) factor vs 2× for single-phase means three-phase circuits need less conductor for the same power and distance</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Wire Size Calculator
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
                "Recommended wire size in mm² and AWG",
                "Actual voltage drop at selected size",
                "Voltage drop percentage vs your limit",
                "Power loss in watts for the cable run",
                "Next-size-up conservative alternative",
                "Single-phase and three-phase support",
                "Copper and aluminum conductor options",
                "Multiple voltage presets (120V–480V)",
                "Calculation history (last 10 entries)",
                "Export results as text report",
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
              title: "Residential Kitchen Circuit",
              scenario: "A homeowner is adding a dedicated 20-amp, 120V circuit for a countertop microwave in a kitchen 18 meters from the main panel. They enter 20A, 120V, 18m, copper, single-phase, 3% max drop. The calculator returns 2.5 mm² (12 AWG) with a 2.1% voltage drop — within limit. Had the run been 30 meters, the drop at 2.5 mm² would be 3.5% — over limit — and the calculator would step up to 4 mm² (10 AWG) automatically.",
            },
            {
              title: "Three-Phase Motor Feed",
              scenario: "An electrician is wiring a 15-amp, 480V three-phase conveyor motor in a factory, with the motor located 45 meters from the motor control center. Single-phase at 45m would demand 4 mm² copper to stay under 3% drop. Three-phase at the same distance and current requires only 2.5 mm² because the √3 factor reduces the effective voltage drop. The calculator shows 2.5 mm² with a 2.6% drop — saving one wire size across the entire run.",
            },
            {
              title: "Solar PV DC Cable Run",
              scenario: "A solar installer is sizing the DC cable from a roof-mounted 20A PV string combiner to a ground-floor inverter 25 meters below. DC systems are single-wire-out, single-wire-back — a 25m one-way run. They enter 20A, 48V DC, 25m, copper, single-phase, 1% max drop (tight limit for DC efficiency). The calculator returns 10 mm² — much larger than a 240V AC run of the same distance would need, because the low voltage magnifies the percentage drop.",
            },
            {
              title: "Subpanel Feeder Sizing",
              scenario: "A contractor is running a 60-amp feeder from a main panel to a detached garage subpanel 40 meters away, 240V single-phase. They enter 60A, 240V, 40m, aluminum, single-phase, 2% max (feeder limit). The calculator returns 16 mm² aluminum — vs 10 mm² copper for the same run. The installer verifies that aluminum-rated lugs are used at both panels and applies anti-oxidant paste, then orders 16 mm² aluminum SER cable for the run.",
            },
            {
              title: "EV Charger Installation",
              scenario: "A homeowner is installing a 48-amp Level 2 EV charger (EVSE) in a detached garage 22 meters from the main panel. They enter 48A, 240V, 22m, copper, single-phase, 3% max. The calculator returns 10 mm² (8 AWG) with a 2.8% drop. The NEC requires EVSE circuits to be sized at 125% of the continuous load: 48 × 1.25 = 60A. Re-entering 60A produces 16 mm² (6 AWG) — the code-compliant wire size for a 60A breaker serving the 48A charger.",
            },
            {
              title: "Commercial Lighting Circuit",
              scenario: "An electrical engineer is designing the branch circuit for a 10A LED lighting load in a warehouse, with fixtures located 55 meters from the lighting panel. Entering 10A, 277V, 55m, copper, single-phase, 3% limit, the calculator returns 2.5 mm² (12 AWG) with a 2.7% drop — just within limit. At 60m the same size hits 3.0% exactly. At 65m it would exceed 3% and step up to 4 mm², so the engineer adjusts the panel location 5 meters closer to keep 2.5 mm² throughout.",
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
                "For motor circuits, multiply the nameplate FLA by 1.25 before entering it into the calculator. NEC 430.22 requires branch circuit conductors to be rated at 125% of the motor's full-load current for continuous-duty motors — not 100%. A 10A motor needs a 12.5A conductor rating minimum.",
                "Always use the one-way distance to the load, not the total round-trip length. The voltage drop formula already accounts for both conductors (the factor of 2 in single-phase calculations). Entering the round-trip distance doubles the result and will oversize your wire unnecessarily.",
                "If the calculator recommends a size larger than you expected, check whether switching from single-phase to three-phase power is feasible. The √3 factor in three-phase circuits reduces voltage drop for the same conductor, often allowing you to drop one or two wire sizes on long runs to motors.",
                "For cable runs buried directly in the ground or pulled through conduit with more than three current-carrying conductors, derate the ampacity. NEC Table 310.15(B)(3)(a) requires 80% capacity for four cables, 70% for five or six, 50% for seven to nine. Multiply your actual current by the inverse of the derating factor before entering it — this gives the effective ampacity the wire must supply.",
                "Size for future load growth when possible. Running an extra wire size larger (e.g., 4 mm² instead of 2.5 mm²) on a long home run costs relatively little in material versus the labor cost of pulling new wire later. This is especially true for sub-panel feeders and service entrance conductors.",
                "Verify that your selected wire size is compatible with the breaker. A 2.5 mm² (14 AWG) copper wire must be protected by a maximum 20A breaker (15A is safer). Connecting 2.5 mm² to a 30A breaker is a NEC violation — the overcurrent protection must match or be smaller than the wire's ampacity rating.",
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
                "Don't size wire for ampacity alone and ignore voltage drop. A 20A circuit at 120V over 50 meters technically has enough ampacity with 2.5 mm² (14 AWG), but the voltage drop is 5.6% — almost double the 3% limit. Lights will flicker, motor torque will drop, and equipment may fault. Always run the voltage drop calculation for any run longer than 15 meters.",
                "Don't use the 'rule of thumb' AWG shortcuts without checking your specific voltage and distance. Common shortcuts assume 120V, 30°C, and short runs. At 48V DC or 24V control circuits, the same current over the same distance produces far higher percentage voltage drops — the rule of thumb breaks down entirely.",
                "Don't forget that aluminum requires anti-oxidation compound and aluminum-rated lugs at every termination point. Aluminum conductors form an oxide layer that increases contact resistance over time. Without proper compound and connectors, the connection heats up, and the insulation eventually fails — a documented cause of residential fires.",
                "Don't assume the same wire size works for both the hot and neutral conductors in a multi-wire branch circuit. A shared neutral serving two 20A ungrounded conductors on opposite phases carries up to 20A of unbalanced current. The neutral must be sized identically to the hots — it is not a 'lighter' conductor just because it doesn't carry current under balanced load.",
                "Don't size wire for the continuous load without applying the 125% continuous load factor where required. NEC 210.19 requires branch circuit conductors to be sized at 125% of the continuous load (a load expected to operate for 3 or more hours). Failing to apply this factor means the wire runs at 100% of its thermal rating continuously — shortening insulation life significantly.",
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

      {/* ── 6. AWG / mm² Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Wire Size Reference Table — AWG / mm² by Ampacity and Distance
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Copper Conductor — Ampacity &amp; mm² / AWG Equivalents</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">mm²</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">AWG</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Max Ampacity (Cu, 75°C)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Resistance (Ω/km)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1.5",  "16",   "15A",  "12.1", "Lighting circuits, low-power outlets"],
                    ["2.5",  "14",   "20A",  "7.41", "General branch circuits, 20A outlets"],
                    ["4",    "12",   "25A",  "4.61", "Kitchen appliances, A/C units"],
                    ["6",    "10",   "35A",  "3.08", "Electric ranges, large A/C, EV chargers"],
                    ["10",   "8",    "50A",  "1.83", "Sub-panel feeders, electric dryers"],
                    ["16",   "6",    "65A",  "1.15", "60A feeders, large EV chargers"],
                    ["25",   "4",    "85A",  "0.727","100A sub-panels, large motors"],
                    ["35",   "2",    "100A", "0.524","100A service, large feeders"],
                    ["50",   "1/0",  "130A", "0.387","125A service entrance"],
                    ["70",   "2/0",  "150A", "0.268","150A service entrance"],
                    ["95",   "3/0",  "175A", "0.228","175A service entrance"],
                    ["120",  "4/0",  "200A", "0.153","200A residential service"],
                  ].map(([mm2, awg, amp, res, use]) => (
                    <tr key={mm2} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{mm2} mm²</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{awg} AWG</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{amp}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{res}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Ampacity based on NEC Table 310.16, 75°C column, copper conductors, 30°C ambient. Derate for bundling, high ambient temperature, or direct burial.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Maximum One-Way Run Length (Copper, 240V Single-Phase, 3% VD Limit)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Wire Size</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">15A Circuit</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">20A Circuit</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">30A Circuit</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">50A Circuit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["2.5 mm² (14 AWG)", "49 m", "36 m", "—",    "—"],
                    ["4 mm² (12 AWG)",   "78 m", "59 m", "39 m", "—"],
                    ["6 mm² (10 AWG)",   "118 m","88 m", "59 m", "35 m"],
                    ["10 mm² (8 AWG)",   "175 m","131 m","87 m", "53 m"],
                    ["16 mm² (6 AWG)",   "280 m","210 m","140 m","84 m"],
                    ["25 mm² (4 AWG)",   "444 m","333 m","222 m","133 m"],
                  ].map(([size, a15, a20, a30, a50]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{size}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{a15}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{a20}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{a30}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{a50}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Maximum one-way run at 3% voltage drop limit. 240V single-phase, copper conductor at 75°C. Dashes indicate size is undersized for that amperage.</p>
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
          Who Uses This Wire Size Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Size branch circuits, feeders, and service conductors quickly on the job site. Verify that voltage drop stays within NEC or IEC limits before pulling wire on long commercial runs." },
            { icon: "🏗️", title: "Electrical Engineers", desc: "Design building power distribution systems, spec panel schedules, and confirm conductor sizing for motor circuits, lighting panels, and sub-panels during engineering review." },
            { icon: "☀️", title: "Solar Installers", desc: "Size DC string cables from roof arrays to inverters, where low operating voltage makes voltage drop percentage far more critical than on standard AC branch circuits." },
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Plan permitted electrical work — adding a sub-panel to a garage, wiring an EV charger, or running a dedicated circuit for a hot tub — with confidence before buying materials." },
            { icon: "🎓", title: "Electrical Students", desc: "Work through NEC and IEC cable sizing exercises, verify textbook examples, and develop intuition for how current, distance, and voltage interact in conductor selection." },
            { icon: "🔧", title: "Maintenance Technicians", desc: "Evaluate existing wiring on equipment upgrades, check whether current conductors can handle a load increase, and document conductor sizes and voltage drops for maintenance records." },
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
