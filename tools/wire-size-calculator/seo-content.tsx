import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";
import { AWG_TABLE } from "./logic";

export default function WireSizeCalculatorSEO() {
  const { howToSteps: steps, faq } = toolConfig.seo;
  const howToSteps = steps.map(({ name, text }) => [name, text]);

  // Longest one-way copper run at 240 V single phase within a 3% drop (NEC sizes)
  const maxRun = (wire: (typeof AWG_TABLE)[number], amps: number) => {
    if (wire.ampacityCopper < amps) return "—";
    const meters = (0.03 * 240 * 1000) / (2 * amps * wire.resistanceCopper);
    return `${Math.round(meters)} m (${Math.round(meters * 3.28084)} ft)`;
  };

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
            installers running AC wiring, DIY homeowners planning permitted work, and students
            studying NEC or IEC cable sizing</strong>. Results are given in mm² (IEC cable sizes) or AWG (US sizes,
            rated to the NEC), with single-phase and three-phase support. Browser-based, free, no
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
                "Recommended wire size in mm² or AWG",
                "Actual voltage drop at selected size",
                "Voltage drop percentage vs your limit",
                "Power loss in watts for the cable run",
                "Next-size-up conservative alternative",
                "Single-phase and three-phase support",
                "Copper and aluminum conductor options",
                "Supply voltages from 110 V to 415 V",
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
              scenario: "A homeowner is adding a dedicated 20-amp, 120V circuit for a countertop microwave in a kitchen 18 meters (59 ft) from the main panel. They enter 20A, 120V, 18m, copper, single-phase, 3% max drop, AWG. 12 AWG is the smallest size allowed on a 20A circuit, but over this run it would drop more than 3%, so the calculator returns 10 AWG with a 2.4% drop. Had the run been 30 meters, it would step up to 8 AWG (2.6%).",
            },
            {
              title: "Three-Phase Motor Feed",
              scenario: "An electrician is wiring a 15-amp conveyor motor 45 meters from the motor control center. Fed single-phase at 230V, the run needs 4 mm² copper (2.7% drop). Fed three-phase at 400V, the same current and distance need only 2.5 mm² (2.2% drop), because the line voltage is higher and the √3 factor replaces the factor of 2.",
            },
            {
              title: "Workshop Radial Circuit",
              scenario: "A 32-amp radial circuit feeds a workshop 30 meters from the consumer unit at 230V. With copper cable and a 3% limit, the calculator returns 6 mm² with a 2.6% drop. A smaller cable could carry the current, but the length decides the size.",
            },
            {
              title: "Subpanel Feeder Sizing",
              scenario: "A contractor is running a 60-amp feeder from a main panel to a detached garage subpanel 40 meters (131 ft) away, 240V single-phase, with a 2% feeder limit. In AWG, the calculator returns 1 AWG aluminum (1.7% drop) or 3 AWG copper (1.6%). The installer checks that both panels have aluminum-rated lugs and uses anti-oxidant compound before choosing the aluminum cable.",
            },
            {
              title: "EV Charger Installation",
              scenario: "A homeowner is installing a 48-amp Level 2 EV charger in a garage 22 meters (72 ft) from the main panel. The NEC treats EV charging as a continuous load, so the circuit is sized at 125%: 48 × 1.25 = 60A. Entering 60A, 240V, 22m, copper, single-phase, 3% and AWG gives 6 AWG with a 1.8% drop, for a 60A breaker.",
            },
            {
              title: "Commercial Lighting Circuit",
              scenario: "An engineer is sizing the branch circuit for a 10A LED lighting load in a warehouse at 230V. With fixtures 45 meters from the panel, 2.5 mm² copper keeps the drop at 2.9%. At 55 meters the calculator steps up to 4 mm² (2.2%), so the engineer weighs a closer panel against the larger cable.",
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
                "Verify that your selected wire size is compatible with the breaker. Under NEC 240.4(D), copper 14 AWG may be protected at no more than 15A, 12 AWG at 20A and 10 AWG at 30A. Putting 14 AWG on a 20A breaker is a code violation even if the run is short.",
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
                "Don't size wire for ampacity alone and ignore voltage drop. A 20A circuit at 120V over 50 meters (164 ft) has enough ampacity with 12 AWG copper, but the voltage drop is about 10.8%, more than three times the 3% guideline. Lights dim, motor torque drops and equipment may fault. Always check voltage drop on longer runs.",
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>AWG Sizes Used by the Calculator (US, NEC)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">AWG</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Area (mm²)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Copper (A)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Aluminum (A)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Copper resistance (Ω/km)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {AWG_TABLE.slice(0, 12).map((w) => (
                    <tr key={w.sizeAWG} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{w.sizeAWG}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{w.sizeMetric}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{w.ampacityCopper}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{w.ampacityAluminum || "—"}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{w.resistanceCopper.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Ampacity from NEC Table 310.16, 75°C column, 30°C ambient, limited by NEC 240.4(D) for 14–10 AWG. Resistance from NEC Chapter 9, Table 8 (stranded, 75°C). Derate for bundling, high ambient temperature or burial.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Maximum One-Way Run Length (Copper, 240V Single-Phase, 3% VD Limit)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Wire Size</th>
                    {[15, 20, 30, 50].map((a) => (
                      <th key={a} className="text-left py-2 px-3 font-semibold text-gray-700">{a}A Circuit</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {AWG_TABLE.slice(0, 6).map((w) => (
                    <tr key={w.sizeAWG} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{w.sizeAWG} AWG</td>
                      {[15, 20, 30, 50].map((a) => (
                        <td key={a} className="py-1.5 px-3 font-mono text-gray-700 text-xs">{maxRun(w, a)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Longest one-way run within a 3% voltage drop at 240V single-phase, copper at 75°C, the same figures the calculator uses. Dashes mean the size is not rated for that current.</p>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <ToolFaq items={faq} />

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Wire Size Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Size branch circuits, feeders, and service conductors quickly on the job site. Verify that voltage drop stays within NEC or IEC limits before pulling wire on long commercial runs." },
            { icon: "🏗️", title: "Electrical Engineers", desc: "Design building power distribution systems, spec panel schedules, and confirm conductor sizing for motor circuits, lighting panels, and sub-panels during engineering review." },
            { icon: "☀️", title: "Solar Installers", desc: "Size the AC cable from the inverter to the main panel, where a long run to a ground-mounted array can push voltage drop past the limit." },
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
