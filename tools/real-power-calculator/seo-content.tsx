export default function RealPowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a real power calculator?",
      a: "A real power calculator is a free online tool that computes the actual useful power (P) consumed by an AC electrical load, using voltage, current, and power factor. Unlike apparent power, real power is the portion that does actual work — heat, light, or motion — and is measured in watts (W).",
    },
    {
      q: "What is the formula for real power?",
      a: "P = V × I × PF, where P is real power in watts, V is voltage in volts, I is current in amps, and PF is power factor (a decimal between 0 and 1). For example, a load at 230V, 5A, with a power factor of 0.8 gives P = 230 × 5 × 0.8 = 920W.",
    },
    {
      q: "What is the difference between real power, apparent power, and reactive power?",
      a: "Real power (P, in watts) is the useful work performed. Apparent power (S = V × I, in volt-amperes) is the total power drawn from the supply. Reactive power (Q, in VAR) is the non-working power circulating due to inductive or capacitive loads. They relate by S² = P² + Q², and P = S when power factor is 1.0 (purely resistive).",
    },
    {
      q: "Why is real power lower than apparent power for most loads?",
      a: "Most real-world loads — motors, transformers, fluorescent lighting ballasts — aren't purely resistive, so their power factor is less than 1.0. Since P = V × I × PF, any power factor below 1.0 means real power is lower than the apparent power (V × I) the supply must still deliver, with the difference showing up as reactive power.",
    },
    {
      q: "How do I calculate power factor if I know real and apparent power?",
      a: "PF = P ÷ S, where S = V × I. For a load with P = 920W and S = V × I = 230 × 5 = 1,150VA, PF = 920 ÷ 1,150 = 0.8. This is the reverse calculation from what this tool performs, useful when you already know real power from a wattmeter reading.",
    },
    {
      q: "What is the real power of a purely resistive load?",
      a: "For a purely resistive load, power factor equals 1.0, so real power equals apparent power exactly: P = V × I. A 120V heater drawing 10A has real power of exactly 1,200W, with zero reactive power, since resistive loads like heaters and incandescent bulbs don't store or release energy out of phase.",
    },
    {
      q: "How does real power relate to my electricity bill?",
      a: "Utility bills for most residential and small commercial customers charge based on real power consumed over time (kWh), not apparent power. This is why a facility with a poor power factor can draw significantly more current from the supply than its billed energy consumption would suggest — the extra apparent power isn't directly billed as energy, but may incur a separate power factor penalty.",
    },
    {
      q: "Can real power ever exceed apparent power?",
      a: "No. Since P = S × PF and power factor can never exceed 1.0, real power can never be greater than apparent power. The two are only equal when power factor is exactly 1.0 (a purely resistive load) — for any reactive component, real power is strictly less than apparent power.",
    },
    {
      q: "How do I calculate real power for an inductive load like a motor?",
      a: "Use the motor's rated voltage, measured (or nameplate) current, and rated power factor in the P = V × I × PF formula. A three-phase motor at 400V, 10A, with a power factor of 0.85 gives single-phase-equivalent real power of P = 400 × 10 × 0.85 = 3,400W — for the full three-phase real power, multiply by √3 as well.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter voltage", "Input the supply voltage in volts (V) applied to the load."],
    ["Enter current", "Input the current drawn by the load in amps (A), from a nameplate rating or measured value."],
    ["Enter power factor", "Input the load's power factor as a decimal between 0 and 1 — use 1.0 for purely resistive loads, or the rated PF for motors and other inductive equipment."],
    ["Read the real power result", "The calculator returns real power in watts, calculated instantly using P = V × I × PF."],
    ["Review apparent and reactive power", "See the related apparent power (S = V × I) and reactive power (Q = √(S² - P²)) calculated from the same inputs."],
    ["Check the efficiency rating and export", "View an efficiency rating based on the power factor, and export the full calculation with steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Real Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>real power calculator</strong> computes the actual useful power (P) consumed by an AC
            electrical load from voltage, current, and power factor. Real power — measured in watts — is
            the portion of total supplied power that performs actual work: heat, light, or mechanical
            motion. It's always less than or equal to apparent power, the total power the supply delivers.
          </p>
          <p>
            The formula P = V × I × PF looks simple, but the power factor term is what most people get
            wrong — using P = V × I alone (which is actually apparent power) overstates real power for any
            load that isn't purely resistive, and most real loads (motors, ballasts, electronics) have a
            power factor below 1.0. This tool applies the correct formula and simultaneously derives
            apparent and reactive power, so you get the full power triangle from a single set of inputs.
          </p>
          <p>
            Built for <strong>electrical engineers sizing equipment, electricians verifying load
            calculations, and students</strong> learning AC power relationships. Includes six built-in
            presets from residential loads to industrial motors, full step-by-step derivation, and text
            export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Real Power Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Real Power (P)</span> = V × I × PF</p>
              <p><span className="font-semibold">Apparent Power (S)</span> = V × I</p>
              <p><span className="font-semibold">Reactive Power (Q)</span> = √(S² - P²)</p>
              <p className="text-gray-500 text-xs mt-2">Example: V = 230V, I = 5A, PF = 0.8</p>
              <p className="text-gray-500 text-xs">P = 230 × 5 × 0.8 = <span className="text-green-600 font-semibold">920W</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>V</strong> — supply voltage in volts</li>
            <li><strong>I</strong> — current drawn by the load in amps</li>
            <li><strong>PF</strong> — power factor, 1.0 for purely resistive loads, lower for inductive/reactive loads</li>
            <li>Real power can never exceed apparent power — they're equal only when PF = 1.0</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Real Power Calculator
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
                "Real power (P), apparent power (S), reactive power (Q)",
                "Automatic efficiency rating based on power factor",
                "Full step-by-step derivation",
                "Six built-in presets (residential, industrial, resistive, more)",
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
              title: "Residential Load Power Check",
              scenario: "A homeowner's electrician measures a mixed household circuit at 230V, 5A, with an estimated power factor of 0.8. The calculator returns real power of 920W, apparent power of 1,150VA, and reactive power of 690VAR — confirming the circuit's actual energy draw for load balancing purposes.",
            },
            {
              title: "Industrial Motor Sizing Verification",
              scenario: "An engineer verifies a three-phase motor rated at 400V, 10A per phase, with a power factor of 0.85. The calculator returns per-phase real power of 3,400W, which they multiply by √3 for the full three-phase real power of approximately 5,889W, cross-checking against the motor's nameplate kW rating.",
            },
            {
              title: "Pure Resistive Heater Confirmation",
              scenario: "A technician verifying a 120V, 10A electric heater with power factor 1.0 (purely resistive) uses the calculator to confirm real power of exactly 1,200W, with zero reactive power — matching the heater's rated wattage exactly since resistive loads have no reactive component.",
            },
            {
              title: "Fluorescent Lighting Circuit Load",
              scenario: "A facilities manager checking a fluorescent lighting circuit at 230V, 2A, with a poor power factor of 0.6 (typical of older magnetic ballasts) finds real power of only 276W against an apparent power of 460VA — highlighting why older fluorescent fixtures often trigger power factor penalties.",
            },
            {
              title: "Office Equipment Circuit Load",
              scenario: "An IT manager estimating real power for a rack of computer equipment at 120V, 3A, with power factor 0.7 (typical for switching power supplies) calculates real power of 252W — used to plan total rack power budget against a circuit breaker's rated capacity.",
            },
            {
              title: "Residential Air Conditioner Power Draw",
              scenario: "A homeowner checking an AC unit's actual power draw at 230V, 8A, with a power factor of 0.75 calculates real power of 1,380W — which they compare against their utility's peak demand charge threshold to decide whether to stagger AC use with other high-draw appliances.",
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
                "Use a load's rated or nameplate power factor when available, rather than assuming 1.0 by default — most inductive loads (motors, ballasts, transformers) have a PF well below 1.0, and assuming unity power factor significantly overstates real power.",
                "For three-phase motors, remember this calculator computes single-phase real power (P = V × I × PF) — multiply by √3 for the total three-phase real power when all three phases carry equal current.",
                "Cross-check calculated real power against a wattmeter reading when available. If they disagree significantly, either the assumed power factor is wrong or the voltage/current readings don't reflect actual operating conditions.",
                "Use this calculator's apparent power output for cable and breaker sizing decisions, not real power — protection devices need to handle the full current the load draws, which corresponds to apparent power, not just the useful portion.",
                "When comparing equipment options, remember that a lower power factor at the same wattage rating means higher current draw — two 1,000W loads with different power factors will draw noticeably different currents from the supply.",
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
                "Using P = V × I without the power factor term. This calculates apparent power, not real power, and overstates actual energy consumption for any load with a power factor below 1.0.",
                "Assuming all loads are purely resistive (PF = 1.0) by default. Motors, fluorescent lighting, and switching power supplies all have power factors well below 1.0, sometimes as low as 0.5-0.7.",
                "Forgetting the √3 factor when scaling single-phase real power calculations to three-phase systems. This omission underestimates total three-phase real power by roughly 42%.",
                "Confusing real power (watts, what you're billed for on most residential meters) with apparent power (volt-amps, what determines actual current draw and equipment sizing needs).",
                "Using a generic 'typical' power factor value instead of the specific equipment's rated or measured PF for critical calculations. Power factor varies significantly between equipment types and even between units of the same equipment type.",
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
          Typical Loads and Real Power Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Load Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">V / I</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical PF</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Real Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Pure resistive (heater)", "120V / 10A", "1.0", "1,200W"],
                ["Residential mixed load", "230V / 5A", "0.8", "920W"],
                ["Industrial motor", "400V / 10A", "0.85", "3,400W"],
                ["Air conditioner", "230V / 8A", "0.75", "1,380W"],
                ["Office computer equipment", "120V / 3A", "0.7", "252W"],
                ["Fluorescent lighting (magnetic ballast)", "230V / 2A", "0.6", "276W"],
              ].map(([load, vi, pf, p]) => (
                <tr key={load} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{load}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{vi}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{pf}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Power factor values are typical examples — always use the specific equipment's rated or measured PF for precise calculations.</p>
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
          Who Uses This Real Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Calculate actual useful power consumption for load studies and equipment sizing during system design." },
            { icon: "🔧", title: "Electricians", desc: "Verify load calculations for circuit and panel design, distinguishing real power from apparent power draw." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn the relationship between voltage, current, power factor, and the three types of AC power." },
            { icon: "🏭", title: "Facility Managers", desc: "Estimate real power consumption of equipment for energy budgeting and demand charge analysis." },
            { icon: "🏠", title: "Homeowners", desc: "Understand actual wattage draw of household circuits versus the current their breakers must handle." },
            { icon: "📊", title: "Energy Auditors", desc: "Calculate real power across mixed equipment loads to build accurate facility energy profiles." },
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
