export default function CapacitorCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a capacitor calculator?",
      a: "A capacitor calculator is a free online tool that solves the relationships between charge (Q), capacitance (C), voltage (V), and stored energy (E) in a capacitor. Choose which quantity you want to find, enter the other known values, and the calculator returns the result along with a full step-by-step derivation and unit conversions.",
    },
    {
      q: "What is the formula for capacitor charge?",
      a: "Q = C × V, where Q is charge in coulombs, C is capacitance in farads, and V is voltage in volts. For example, a 100µF capacitor charged to 12V stores Q = 0.0001 × 12 = 0.0012 coulombs (1.2mC). This is the fundamental relationship that defines what capacitance means: how much charge a capacitor stores per volt applied.",
    },
    {
      q: "What is the formula for energy stored in a capacitor?",
      a: "E = ½ × C × V², where E is energy in joules. For example, a 100µF capacitor charged to 12V stores E = 0.5 × 0.0001 × 144 = 0.0072 joules (7.2mJ). Because voltage is squared in this formula, doubling the charging voltage quadruples the stored energy, not just doubles it.",
    },
    {
      q: "How do I calculate capacitance from charge and voltage?",
      a: "C = Q ÷ V. If a capacitor stores 50µC of charge at 5V, its capacitance is C = 0.00005 ÷ 5 = 0.00001 farads, or 10µF. This is useful for reverse-engineering an unlabeled or unknown capacitor's value from a measured charge and voltage.",
    },
    {
      q: "How do I calculate the voltage across a capacitor?",
      a: "V = Q ÷ C. If a 200µF capacitor holds 0.002 coulombs of charge, the voltage across it is V = 0.002 ÷ 0.0002 = 10V. This is the formula to use when you know how much charge has been delivered to a capacitor and need to find the resulting voltage.",
    },
    {
      q: "Why does doubling voltage quadruple stored energy?",
      a: "Because the energy formula E = ½CV² includes voltage squared, not voltage alone. Doubling V multiplies V² by four, so energy also increases by a factor of four for the same capacitance. This is why high-voltage capacitor banks store disproportionately more energy per farad than low-voltage ones, and why capacitor voltage ratings matter for safety.",
    },
    {
      q: "What is the difference between charge and stored energy in a capacitor?",
      a: "Charge (Q) measures the quantity of electric charge stored, in coulombs — it scales linearly with voltage (Q = CV). Stored energy (E) measures the work required to charge the capacitor to that voltage, in joules — it scales with voltage squared (E = ½CV²). A capacitor at twice the voltage holds twice the charge but four times the energy.",
    },
    {
      q: "How do capacitor unit prefixes relate to each other?",
      a: "1 farad (F) = 1,000 millifarads (mF) = 1,000,000 microfarads (µF) = 1,000,000,000 nanofarads (nF) = 1,000,000,000,000 picofarads (pF). Most practical capacitors range from a few picofarads (ceramic capacitors in RF circuits) to thousands of microfarads (electrolytic capacitors in power supplies) — a full farad is unusually large and mostly seen in supercapacitors.",
    },
    {
      q: "Why is my calculated charge or energy shown in scientific notation?",
      a: "Capacitor values often span many orders of magnitude — from picofarads to farads — so very small or very large results are displayed in scientific notation (e.g. 1.2e-3) for readability rather than a long string of leading or trailing zeros. The calculator also shows the same value converted across standard unit prefixes for easier reading.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your capacitance, voltage, charge, and energy values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select what you want to calculate", "Choose Charge, Capacitance, Voltage, or Energy. The calculator hides the field you're solving for and asks only for the values needed to find it."],
    ["Enter the known values", "Type in capacitance, voltage, or charge as required by your selected mode, choosing the appropriate unit prefix for each (F/mF/µF/nF/pF, V/mV/kV, C/mC/µC/nC)."],
    ["Read the result and formula", "The calculator shows the computed value along with the exact formula used — Q = CV, C = Q/V, V = Q/C, or E = ½CV²."],
    ["Review the step-by-step derivation", "Every calculation includes a full breakdown showing each substitution, so you can verify the math or use it as a worked example."],
    ["Check unit conversions", "The result is automatically shown across relevant unit prefixes, so you can read it in whichever scale matches your component's datasheet."],
    ["Save or export the calculation", "Save the result to history for later reference, or export the full calculation with formula and steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Capacitor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>capacitor calculator</strong> solves the relationships between charge (Q), capacitance
            (C), voltage (V), and stored energy (E) in a capacitor. Choose which quantity you need — charge,
            capacitance, voltage, or energy — enter the values you know, and the calculator returns the
            result with a full step-by-step derivation and automatic unit conversion.
          </p>
          <p>
            The three underlying formulas (Q = CV, and E = ½CV²) are simple algebra, but capacitor values
            span an enormous range of scales — from picofarads in an RF filter to thousands of microfarads
            in a power supply reservoir capacitor — so converting between prefixes correctly, and remembering
            that energy scales with voltage squared rather than voltage alone, is where manual calculation
            most often goes wrong. This tool handles the unit conversion and the derivation automatically.
          </p>
          <p>
            Built for <strong>electronics students learning capacitor theory, hobbyists sizing energy
            storage or filter capacitors, and engineers verifying charge and energy figures</strong> during
            circuit design. Supports all four calculation modes, full unit prefix ranges for each quantity,
            step-by-step working, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Capacitor Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Charge (Q)</span> = C × V</p>
              <p><span className="font-semibold">Capacitance (C)</span> = Q ÷ V</p>
              <p><span className="font-semibold">Voltage (V)</span> = Q ÷ C</p>
              <p><span className="font-semibold">Energy (E)</span> = ½ × C × V²</p>
              <p className="text-gray-500 text-xs mt-2">Example: 100µF at 12V</p>
              <p className="text-gray-500 text-xs">Q = <span className="text-green-600 font-semibold">1.2mC</span>, E = <span className="text-green-600 font-semibold">7.2mJ</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Charge (Q)</strong> — the quantity of electric charge stored, in coulombs</li>
            <li><strong>Capacitance (C)</strong> — how much charge is stored per volt applied, in farads</li>
            <li><strong>Voltage (V)</strong> — the potential difference across the capacitor's plates</li>
            <li><strong>Energy (E)</strong> — the work stored, scaling with voltage squared rather than voltage alone</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Capacitor Calculator
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
                "Four calculation modes: charge, capacitance, voltage, energy",
                "Full unit prefix support: F/mF/µF/nF/pF, V/mV/kV, C/mC/µC/nC, J/mJ/µJ",
                "Complete step-by-step derivation for every result",
                "Automatic unit conversion display",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
                "100% browser-based — no data sent to server",
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
              title: "Power Supply Reservoir Capacitor Check",
              scenario: "An electronics hobbyist wants to know how much energy a 100µF, 12V reservoir capacitor in a power supply can deliver during a brief mains dropout. Using Energy mode with C = 100µF and V = 12V, the calculator returns E = 7.2mJ (0.5 × 0.0001 × 144), confirming it's enough to bridge only a very short interruption.",
            },
            {
              title: "Unknown Capacitor Value Identification",
              scenario: "A technician measures 50µC of charge on an unlabeled capacitor at 5V using a bench setup. Using Capacitance mode with Q = 50µC and V = 5V, the calculator returns C = 10µF, letting them identify the component without a legible marking.",
            },
            {
              title: "Camera Flash Capacitor Energy Sizing",
              scenario: "A hardware designer building a camera flash circuit needs 5J of stored energy from a 400V capacitor bank. Using Energy mode in reverse (checking against a candidate 68µF cap), the calculator confirms E = 0.5 × 0.000068 × 160,000 = 5.44J — comfortably meeting the 5J requirement with headroom.",
            },
            {
              title: "Voltage Verification After Partial Discharge",
              scenario: "A student measures that a 200µF capacitor has discharged down to 0.002 coulombs of remaining charge. Using Voltage mode with Q = 0.002C and C = 200µF, the calculator returns V = 10V, confirming the capacitor's remaining voltage before continuing the lab exercise.",
            },
            {
              title: "Timing Circuit Charge Verification",
              scenario: "An engineer designing an RC timing circuit with a 10µF capacitor charged to 9V wants the exact charge value for a datasheet comparison. Using Charge mode with C = 10µF and V = 9V, the calculator returns Q = 90µC, matching the manufacturer's reference calculation in their design notes.",
            },
            {
              title: "High-Voltage Safety Energy Check",
              scenario: "A technician servicing equipment with a 470µF, 400V capacitor wants to confirm the stored energy before handling it, since it may not have fully discharged. Using Energy mode with C = 470µF and V = 400V, the calculator returns E = 37.6J — enough to be dangerous — prompting them to verify full discharge with a bleeder resistor before touching the terminals.",
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
                "Remember that energy scales with voltage squared, not linearly. When comparing two capacitor bank designs, a small increase in rated voltage can matter far more for stored energy than a proportionally larger increase in capacitance.",
                "Always treat a large electrolytic capacitor as potentially charged until verified otherwise, especially at voltages above 50V. Use this calculator's Energy mode to estimate stored energy from the rated capacitance and voltage before handling unfamiliar equipment.",
                "Use the step-by-step output as a worked example when studying — it shows every substitution, which is more useful for building intuition than just reading the final number off a datasheet.",
                "When reverse-engineering an unknown capacitor, measure charge and voltage with a bench multimeter or charge amplifier, then use Capacitance mode rather than guessing from a component's physical size, which is an unreliable indicator of exact value.",
                "For power supply design, calculate energy first before choosing between more capacitance or higher rated voltage — since energy scales with V² but only linearly with C, raising voltage headroom is often the more efficient way to add stored energy if the circuit allows it.",
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
                "Assuming doubling the voltage doubles the stored energy. Energy follows E = ½CV², so doubling voltage quadruples energy — a mistake here can lead to a significant underestimate of stored energy and a safety hazard when handling charged capacitors.",
                "Mixing up capacitance unit prefixes, especially µF and mF. A 100mF capacitor is 1,000 times larger than a 100µF capacitor — always confirm the unit dropdown matches your component's marking before reading off a result.",
                "Confusing charge (Q, in coulombs) with stored energy (E, in joules). They're related but not interchangeable — charge tells you how much electric charge is stored, energy tells you how much work that charge can do, and they scale differently with voltage.",
                "Using a capacitor's voltage rating as if it were the actual operating voltage when calculating stored energy. Always use the real charging voltage in your circuit, not the maximum rated voltage printed on the component, unless you specifically want a worst-case estimate.",
                "Forgetting that this calculator's formulas describe an ideal capacitor. Real capacitors have equivalent series resistance (ESR) and leakage that cause some energy loss during charging and self-discharge over time, which these formulas don't account for.",
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
          Formula &amp; Unit Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Output</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Charge (Q)", "C × V", "100µF × 12V = 1.2mC"],
                ["Capacitance (C)", "Q ÷ V", "50µC ÷ 5V = 10µF"],
                ["Voltage (V)", "Q ÷ C", "0.002C ÷ 200µF = 10V"],
                ["Energy (E)", "½ × C × V²", "0.5 × 100µF × 144 = 7.2mJ"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs uppercase tracking-wide">{name}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* 1F = 1,000mF = 1,000,000µF = 1,000,000,000nF = 1,000,000,000,000pF.</p>
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
          Who Uses This Capacitor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through capacitor charge, voltage, and energy problems and verify homework calculations step by step." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Size reservoir and filter capacitors for power supplies and identify unknown capacitor values from measured data." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify stored energy and charge figures during power electronics and energy storage circuit design." },
            { icon: "🔧", title: "Technicians", desc: "Estimate stored energy in unfamiliar high-voltage capacitors before servicing equipment safely." },
            { icon: "📷", title: "Hardware Designers", desc: "Size capacitor banks for pulsed-power applications like camera flashes and energy discharge circuits." },
            { icon: "🏭", title: "Quality Control Teams", desc: "Cross-check measured charge and voltage data against a component's rated capacitance during incoming inspection." },
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
