export default function DiodeCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a diode calculator?",
      a: "A diode calculator is a free online tool that solves diode circuit problems using the diode's approximately constant forward voltage drop. It supports three modes: calculate the current through a diode and series resistor, calculate the resistor needed for a target current, or analyze the voltage drop across a diode and how much voltage remains for the rest of the circuit.",
    },
    {
      q: "What forward voltage should I use for different diode types?",
      a: "Silicon diodes (like the common 1N4001-1N4007 series) drop approximately 0.7V when forward-biased. Germanium diodes (like 1N34A) drop only about 0.3V. Schottky diodes (like 1N5817-1N5819) also drop around 0.3V, valued for their low forward voltage and fast switching. LEDs drop significantly more, typically 1.8-3.4V depending on color, since they're a different semiconductor structure entirely.",
    },
    {
      q: "How do I calculate current through a diode circuit?",
      a: "First find the voltage across the series resistor: Vr = Vs − Vf (supply voltage minus diode forward voltage). Then apply Ohm's Law: I = Vr ÷ R. For example, a silicon diode (Vf = 0.7V) with a 220Ω resistor on a 5V supply: Vr = 5 − 0.7 = 4.3V, I = 4.3 ÷ 220 ≈ 19.5mA.",
    },
    {
      q: "How do I calculate the resistor needed for a target diode current?",
      a: "R = (Vs − Vf) ÷ I, the same formula rearranged to solve for resistance instead of current. For a silicon diode (Vf = 0.7V) on a 12V supply targeting 50mA: R = (12 − 0.7) ÷ 0.05 = 226Ω, which rounds to a standard 220Ω or 240Ω resistor value.",
    },
    {
      q: "Why is diode forward voltage treated as approximately constant?",
      a: "Real diodes follow the Shockley diode equation, where current rises exponentially with voltage, but across the normal operating current range this curve is steep enough that voltage barely changes even as current varies substantially. This makes the constant-voltage-drop approximation (0.7V for silicon, for example) accurate enough for most practical circuit design, even though the true relationship is exponential rather than fixed.",
    },
    {
      q: "What is the difference between a rectifier diode and a signal diode?",
      a: "Rectifier diodes (like the 1N4001-1N4007 series) are silicon diodes designed to handle higher current and reverse voltage, commonly used for AC-to-DC conversion in power supplies. Signal diodes (like the 1N4148) are designed for fast switching at lower current, commonly used in logic and signal processing circuits. Both typically share the same ~0.7V silicon forward voltage drop.",
    },
    {
      q: "Why would I choose a Schottky diode over a standard silicon diode?",
      a: "Schottky diodes have a lower forward voltage drop (~0.3V versus ~0.7V for silicon), which reduces power dissipation and heat in high-current applications like power supply rectification. They also switch faster than standard silicon diodes, making them preferred in switching power supplies and reverse-polarity protection circuits where efficiency matters.",
    },
    {
      q: "How do I use this calculator for reverse-polarity protection design?",
      a: "Use Voltage Drop mode with the diode's forward voltage to see exactly how much voltage the protection diode consumes before it reaches your circuit. A silicon diode (0.7V drop) in a 5V supply line leaves only 4.3V for downstream components — for voltage-sensitive circuits, this is often significant enough to justify choosing a lower-drop Schottky diode instead.",
    },
    {
      q: "How is this different from the LED resistor calculator?",
      a: "This diode calculator covers general-purpose diodes (silicon, germanium, Schottky) as well as LEDs, and includes a dedicated voltage-drop analysis mode for evaluating a diode's impact on a circuit without necessarily involving a resistor. The LED resistor calculator is specialized specifically for sizing current-limiting resistors for one or more LEDs in series.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, and resistance values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select a calculation mode", "Choose Calculate Current (from a known resistor), Calculate Resistor (for a target current), or Voltage Drop Analysis."],
    ["Enter supply voltage", "Input the voltage source powering the diode circuit."],
    ["Enter diode forward voltage", "Input the forward voltage for your diode, or use a preset for silicon, germanium, Schottky, or LED types."],
    ["Enter the mode-specific value", "For Current mode, enter the series resistor value. For Resistor mode, enter the target current in mA."],
    ["Read the results", "View calculated current or resistance, voltage across the resistor, power dissipation, and recommended resistor wattage."],
    ["Apply a preset or export results", "Use a built-in preset for common diode types, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Diode Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>diode calculator</strong> solves diode circuit problems using the diode's
            approximately constant forward voltage drop. It handles three common needs: calculating current
            through a diode and series resistor, calculating the resistor value needed for a target
            current, and analyzing how much voltage a diode consumes versus leaves available for the rest
            of the circuit.
          </p>
          <p>
            Diodes conduct current with a relatively fixed voltage drop once forward-biased, but that drop
            varies meaningfully by diode type — silicon rectifier diodes drop about 0.7V, germanium and
            Schottky diodes drop only about 0.3V, and LEDs drop significantly more, from about 1.8V to over
            3V depending on color. This tool builds in default forward voltages for the most common diode
            families, so the right constant is applied automatically rather than needing to look it up
            separately for each calculation.
          </p>
          <p>
            Built for <strong>electronics hobbyists designing rectifier and protection circuits, students
            learning diode theory, and hardware designers</strong> selecting between silicon, germanium,
            Schottky, and LED options. Includes five built-in diode type presets, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Diode Circuit Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Voltage across resistor</span> = Vs − Vf</p>
              <p><span className="font-semibold">Current (Ohm's Law)</span> = (Vs − Vf) ÷ R</p>
              <p><span className="font-semibold">Required resistance</span> = (Vs − Vf) ÷ I</p>
              <p className="text-gray-500 text-xs mt-2">Example: Vs = 5V, silicon diode (Vf = 0.7V), R = 220Ω</p>
              <p className="text-gray-500 text-xs">I = (5 − 0.7) ÷ 220 = <span className="text-green-600 font-semibold">≈19.5mA</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Silicon</strong> — Vf ≈ 0.7V (1N4001-1N4007 rectifiers, 1N4148 signal diodes)</li>
            <li><strong>Germanium</strong> — Vf ≈ 0.3V (1N34A, used in older radio detector circuits)</li>
            <li><strong>Schottky</strong> — Vf ≈ 0.3V (1N5817-1N5819, fast switching, low loss)</li>
            <li><strong>LED</strong> — Vf ≈ 1.8-3.4V depending on color (see LED resistor calculator for detail)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Diode Calculator
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
                "Three modes: current, resistor, voltage-drop analysis",
                "Support for silicon, germanium, Schottky, and LED diodes",
                "Nearest standard E24 resistor value",
                "Power dissipation and recommended wattage",
                "Full step-by-step derivation",
                "Five built-in diode type presets",
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
              title: "Rectifier Diode Current Check",
              scenario: "A hobbyist verifies current through a 1N4001 silicon rectifier diode (Vf = 0.7V) with a 220Ω series resistor on a 5V supply. Using Current mode, the calculator returns I ≈ 19.5mA, confirming the circuit operates within the diode's rated current range.",
            },
            {
              title: "Reverse-Polarity Protection Diode Sizing",
              scenario: "An engineer designing reverse-polarity protection for a 12V circuit wants to limit protection diode current to 100mA using a silicon diode (Vf = 0.7V). Using Resistor mode, the calculator returns R = (12 − 0.7) ÷ 0.1 = 113Ω, rounding to a standard 110Ω or 120Ω resistor.",
            },
            {
              title: "Schottky Diode Voltage Drop Comparison",
              scenario: "A power supply designer compares a silicon diode (0.7V drop) against a Schottky diode (0.3V drop) in a 5V rail using Voltage Drop mode. The Schottky option leaves 4.7V for downstream components versus 4.3V for silicon — a meaningful difference for voltage-sensitive circuits, justifying the Schottky's selection.",
            },
            {
              title: "Germanium Diode Detector Circuit",
              scenario: "A radio hobbyist restoring a crystal radio circuit calculates the voltage drop for a 1N34A germanium diode (Vf = 0.3V) on a low-voltage signal path using Voltage Drop mode, confirming the detector consumes minimal signal voltage compared to a silicon alternative.",
            },
            {
              title: "Freewheeling Diode Current Verification",
              scenario: "An engineer verifying a flyback/freewheeling diode across a relay coil calculates expected current using a silicon diode (Vf = 0.7V) with the coil's known resistance on a 24V supply, using Current mode to confirm the diode's rated current handles the coil's inductive kickback safely.",
            },
            {
              title: "Blue LED Resistor Sizing via Diode Calculator",
              scenario: "A hobbyist using the general diode calculator's LED preset (Vf = 3.2V for blue/white) targets 20mA on a 9V supply, using Resistor mode to calculate R = (9 − 3.2) ÷ 0.02 = 290Ω, confirming the same result as the dedicated LED resistor calculator for this specific case.",
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
                "Use Voltage Drop mode as a quick sanity check before committing to a diode type for a voltage-sensitive circuit — even 0.4V of difference between silicon and Schottky options can matter in low-voltage designs.",
                "For protection diodes where forward voltage loss matters, consider Schottky over standard silicon — the roughly 0.4V lower drop translates directly to less wasted power and more voltage headroom downstream.",
                "Always check the diode's actual datasheet forward voltage at your operating current, since the 0.7V/0.3V figures used here are typical values — actual Vf increases somewhat at higher currents for any diode type.",
                "When sizing a resistor for a diode circuit, verify the diode's maximum forward current rating isn't exceeded by your calculated current — this is especially important for signal diodes, which typically handle much less current than power rectifiers.",
                "Use this calculator's power dissipation output to check that both the resistor and the diode itself can handle the heat generated, particularly in higher-current rectifier and protection circuit designs.",
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
                "Using the same 0.7V forward voltage assumption for every diode type. Germanium and Schottky diodes drop roughly 0.3V, not 0.7V — using the wrong constant for these types significantly skews current and resistor calculations.",
                "Forgetting that LEDs are diodes with a much higher forward voltage than rectifier diodes. Mistakenly using 0.7V for an LED calculation dramatically underestimates the resistor needed and would over-drive the LED.",
                "Assuming forward voltage stays perfectly constant across all current levels. The constant-voltage approximation is accurate for typical operating ranges but forward voltage does increase somewhat at higher currents — check the datasheet's V-I curve for precision applications.",
                "Ignoring the diode's maximum reverse voltage rating when selecting a part for a circuit. This calculator addresses forward-biased operation only — reverse voltage rating is a separate specification that must independently exceed the circuit's peak reverse voltage.",
                "Overlooking that Schottky diodes have notably higher reverse leakage current than silicon diodes at a given reverse voltage — a tradeoff for their lower forward voltage that matters in low-power or battery-sensitive designs.",
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
          Diode Type Forward Voltage Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Diode Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Forward Voltage (Vf)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Common Part Numbers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Silicon (rectifier)", "≈0.7V", "1N4001-1N4007"],
                ["Silicon (signal)", "≈0.7V", "1N4148"],
                ["Germanium", "≈0.3V", "1N34A"],
                ["Schottky", "≈0.3V", "1N5817-1N5819"],
                ["Red LED", "≈2.0V", "Standard indicator LED"],
                ["Blue/White LED", "≈3.2V", "Standard indicator LED"],
              ].map(([type, vf, parts]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{vf}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{parts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Forward voltages are typical values at moderate current — check the specific part's datasheet for precise figures.</p>
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
          Who Uses This Diode Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Design rectifier, protection, and LED circuits with the correct diode type and resistor sizing." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn how forward voltage drop varies by diode type and verify homework calculations." },
            { icon: "🔧", title: "Hardware Designers", desc: "Choose between silicon, germanium, and Schottky diodes based on voltage drop tradeoffs." },
            { icon: "📻", title: "Radio & RF Hobbyists", desc: "Work with germanium diode detector circuits in crystal radio and vintage electronics restoration." },
            { icon: "⚡", title: "Power Supply Designers", desc: "Evaluate rectifier diode voltage drop impact on power supply efficiency and output voltage." },
            { icon: "🛡️", title: "Circuit Protection Engineers", desc: "Size reverse-polarity and flyback protection diodes for their voltage drop and current handling." },
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
