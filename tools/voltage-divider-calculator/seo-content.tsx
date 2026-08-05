export default function VoltageDividerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a voltage divider calculator?",
      a: "A voltage divider calculator is a free online tool that computes the output voltage (Vout) of a two-resistor divider circuit from an input voltage (Vin), R1, and R2. It also returns the current through the divider and the power dissipated in each resistor, so you can check that both the voltage level and the resistor wattage ratings are correct for your circuit.",
    },
    {
      q: "What is the voltage divider formula?",
      a: "Vout = Vin × R2 ÷ (R1 + R2), where R1 is the resistor between Vin and the output node, and R2 is the resistor between the output node and ground. For example, with Vin = 12V, R1 = 4.7kΩ, and R2 = 3.3kΩ: Vout = 12 × 3,300 ÷ (4,700 + 3,300) = 12 × 0.4125 = 4.95V.",
    },
    {
      q: "Which resistor is R1 and which is R2 in a voltage divider?",
      a: "R1 is the top resistor, connected between the input voltage source and the output tap point. R2 is the bottom resistor, connected between the output tap point and ground. Vout is measured across R2 — increasing R2 relative to R1 raises Vout, and increasing R1 relative to R2 lowers it.",
    },
    {
      q: "How do I choose resistor values for a specific output voltage?",
      a: "Pick a ratio R2 ÷ (R1 + R2) equal to your target Vout ÷ Vin, then choose a total resistance (R1 + R2) high enough to limit current draw but low enough that the divider remains stiff against the load you're connecting. For a 3.3V logic input from a 5V source, a ratio around 0.66 works — R1 = 1.7kΩ and R2 = 3.3kΩ is one common combination, though standard E12/E24 values are used in practice rather than the exact calculated figures.",
    },
    {
      q: "How much current flows through a voltage divider?",
      a: "Current (A) = Vin ÷ (R1 + R2). For a 12V input with a 4.7kΩ + 3.3kΩ = 8kΩ total resistance, current = 12 ÷ 8,000 = 1.5mA. This current flows continuously through both resistors whenever the divider is powered, even with no load connected — which is why voltage dividers are inefficient for delivering real power.",
    },
    {
      q: "Why does a voltage divider's output voltage sag under load?",
      a: "A basic two-resistor voltage divider assumes nothing is drawing current from the output tap. Connecting a load in parallel with R2 effectively lowers R2's value, which reduces Vout below the calculated no-load figure. The lower the load's resistance relative to R2, the more the output sags — for high-impedance loads like an ADC input, the sag is usually negligible.",
    },
    {
      q: "Can I use a voltage divider to step down power, like a battery charger?",
      a: "No. A resistive voltage divider wastes power as heat in both resistors and cannot supply meaningful current without significant voltage sag — it is only suitable for signal-level applications like feeding a sensor reading or ADC input into a microcontroller. For power conversion, use a voltage regulator, buck converter, or transformer instead.",
    },
    {
      q: "How do I calculate power dissipation in divider resistors?",
      a: "Power (W) = Current² × Resistance for each resistor. With 1.5mA flowing through a 4.7kΩ R1: Power = 0.0015² × 4,700 = 0.0106W (10.6mW). Standard 1/4-watt (0.25W) resistors have enormous headroom for typical logic-level dividers, but the check matters more for low-resistance or high-voltage dividers.",
    },
    {
      q: "What voltage divider ratio do I need for an Arduino or ESP32 ADC?",
      a: "Arduino boards typically read 0-5V or 0-3.3V on their analog pins, while ESP32 ADC pins read up to about 3.3V. To measure a 12V source with an Arduino's 5V ADC, you need a ratio of 5/12 = 0.417 — for example R1 = 4.7kΩ and R2 = 3.3kΩ gives Vout = 4.95V at Vin = 12V, safely within range with a small margin.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage and resistor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter input voltage (Vin)", "Type the supply voltage feeding the divider circuit, in volts."],
    ["Enter R1 (top resistor)", "Input the resistance between the input voltage and the output tap point, choosing Ω, kΩ, or MΩ as the unit."],
    ["Enter R2 (bottom resistor)", "Input the resistance between the output tap point and ground. Vout is measured across this resistor."],
    ["Read the output voltage and ratio", "The result panel shows Vout, the R2 ÷ (R1 + R2) ratio as a percentage, and a full step-by-step breakdown of the calculation."],
    ["Check current and power dissipation", "Review the current flowing through the divider and the power dissipated in each resistor to confirm your resistor wattage ratings are sufficient."],
    ["Apply a preset or export the result", "Use a built-in preset for common conversions like 12V-to-5V or 9V-to-3.3V, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Voltage Divider Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>voltage divider calculator</strong> computes the output voltage of a two-resistor
            divider circuit from an input voltage and two resistance values. Enter Vin, R1, and R2, and the
            calculator returns Vout, the divider ratio, the current flowing through the circuit, and the
            power dissipated in each resistor — everything needed to verify the circuit works and won't
            overheat a resistor.
          </p>
          <p>
            The formula itself, Vout = Vin × R2 ÷ (R1 + R2), is simple, but real designs need more than just
            the output number: you also need to confirm the current draw is acceptable, check that resistor
            power ratings aren't exceeded, and account for how a connected load will pull the output down
            from the no-load calculation. This tool computes all of it at once and shows the full step-by-step
            derivation.
          </p>
          <p>
            Built for <strong>electronics students, hobbyists working with Arduino and ESP32 projects,
            hardware developers designing sensor interfaces, and electrical engineers</strong> prototyping
            signal-level voltage conversion. Includes six built-in presets for common logic-level conversions,
            step-by-step calculation display, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Voltage Divider Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Output Voltage</span> = Vin × R2 ÷ (R1 + R2)</p>
              <p><span className="font-semibold">Current (A)</span> = Vin ÷ (R1 + R2)</p>
              <p><span className="font-semibold">Power in R</span> = Current² × R</p>
              <p className="text-gray-500 text-xs mt-2">Example: Vin = 12V, R1 = 4.7kΩ, R2 = 3.3kΩ</p>
              <p className="text-gray-500 text-xs">Vout = 12 × 3,300 ÷ 8,000 = <span className="text-green-600 font-semibold">4.95V</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>R1</strong> — the top resistor, between Vin and the output tap point</li>
            <li><strong>R2</strong> — the bottom resistor, between the output tap point and ground; Vout is measured across R2</li>
            <li><strong>Divider ratio</strong> — R2 ÷ (R1 + R2), the fraction of Vin that appears at the output</li>
            <li>The calculation assumes no load draws current from the output — a connected load will pull Vout below this no-load value (see FAQ)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Voltage Divider Calculator
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
                "Full step-by-step calculation breakdown",
                "Current through the divider (mA)",
                "Power dissipation in R1 and R2 (mW)",
                "Resistance unit support: Ω, kΩ, MΩ",
                "Six built-in presets (Arduino, ESP32, logic-level)",
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
              title: "Arduino Reading a 12V Battery",
              scenario: "A hobbyist wants an Arduino (5V max ADC input) to monitor a 12V lead-acid battery. Using Vin = 12V, R1 = 4.7kΩ, R2 = 3.3kΩ, the calculator returns Vout = 4.95V — safely under the 5V limit with a small safety margin, and a divider current of just 1.5mA so it doesn't meaningfully drain the battery.",
            },
            {
              title: "ESP32 Sensor Voltage Scaling",
              scenario: "A developer needs to scale a 9V sensor output down to the ESP32's 3.3V ADC range. Using Vin = 9V, R1 = 10kΩ, R2 = 5.6kΩ, the calculator returns Vout = 3.23V — just under the 3.3V limit, with power dissipation in each resistor under 5mW, well within a standard resistor's rating.",
            },
            {
              title: "Industrial 24V to Logic-Level Conversion",
              scenario: "An engineer is interfacing a 24V industrial sensor signal with a 5V logic input. Using Vin = 24V, R1 = 19kΩ, R2 = 5kΩ, the calculator returns Vout = 5.0V exactly, confirming the divider ratio is correctly matched before building the interface board.",
            },
            {
              title: "Resistor Power Rating Check",
              scenario: "A student builds a divider with Vin = 12V, R1 = 100Ω, R2 = 100Ω for a low-impedance test circuit. The calculator returns a current of 60mA and power dissipation of 360mW in each resistor — well above a standard 1/4-watt (250mW) resistor's rating, prompting them to switch to 1-watt resistors or increase both resistances proportionally.",
            },
            {
              title: "Potentiometer-Style Voltage Trim Check",
              scenario: "A hardware designer compares two resistor pairs for a 3.3V reference: R1 = 10kΩ/R2 = 10kΩ (50% ratio) versus R1 = 6.8kΩ/R2 = 10kΩ (59.5% ratio). The calculator shows Vout = 1.65V for the first pair and Vout = 1.96V for the second, helping them pick the combination that lands closest to a 2.0V target for their comparator circuit.",
            },
            {
              title: "Load Sag Estimation for a Sensor Interface",
              scenario: "An engineer designs a divider with R1 = 1kΩ, R2 = 1kΩ at Vin = 5V, expecting Vout = 2.5V. Knowing the downstream ADC input impedance is only 2kΩ (comparable to R2), they recognize the no-load calculation of 2.5V will sag once loaded, and redesign with a lower total resistance (R1 = R2 = 100Ω) so the load's impedance is large enough by comparison to keep the sag under 1%.",
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
                "Keep total resistance (R1 + R2) low relative to your load's input impedance — a good rule of thumb is at least 10× lower — so the load doesn't meaningfully pull the output voltage down from the calculated no-load value.",
                "For battery-powered circuits, keep total resistance high (tens to hundreds of kΩ) to minimize the divider's own current draw, since that current flows continuously whenever the circuit is powered, even with no load connected.",
                "Always check the power dissipation result against your resistor's wattage rating, especially for low total resistance values. A 1/4-watt resistor is fine for most logic-level dividers but can be exceeded in low-impedance test or power circuits.",
                "Use standard E12 or E24 resistor values (like 4.7kΩ, 3.3kΩ, 10kΩ) rather than the mathematically exact ratio — off-the-shelf resistors have a tolerance of 1-5% anyway, so hitting an odd exact value isn't worth sourcing a custom part.",
                "Add a small capacitor (0.1μF is common) across R2 if you're feeding the output into an ADC, to filter noise — this doesn't change the calculated Vout but improves reading stability in practice.",
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
                "Swapping R1 and R2. Vout is measured across R2, the bottom resistor — putting the wrong resistor in the wrong position inverts the ratio and gives a completely different output voltage than intended.",
                "Ignoring load sag when the downstream device draws meaningful current. The standard formula assumes no load; connecting anything with a comparable or lower impedance than R2 in parallel will pull Vout below the calculated figure.",
                "Using a voltage divider to supply real power, like charging a battery or driving a motor. Dividers waste power as heat and cannot maintain voltage under significant current draw — use a regulator or converter for anything beyond a signal-level connection.",
                "Forgetting to check resistor power ratings on low-resistance dividers. A divider built with 100Ω resistors at 12V dissipates hundreds of milliwatts — well above a standard 1/4-watt resistor's limit — and will overheat or fail.",
                "Mixing resistance units without converting first. Entering R1 as \"4.7\" in ohms when you meant 4.7kΩ produces a ratio off by a factor of 1,000 — always confirm the unit selector matches the value you intended.",
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
          Common Voltage Divider Presets
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Conversion</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R1</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R2</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Vout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5V → 2.5V (50%)", "1 kΩ", "1 kΩ", "2.50 V"],
                ["12V → 5V (Arduino)", "4.7 kΩ", "3.3 kΩ", "4.95 V"],
                ["9V → 3.3V (ESP32)", "10 kΩ", "5.6 kΩ", "3.23 V"],
                ["12V → 4V (33%)", "2 kΩ", "1 kΩ", "4.00 V"],
                ["24V → 5V (logic)", "19 kΩ", "5 kΩ", "5.00 V"],
                ["3.3V → 1.65V (50%)", "10 kΩ", "10 kΩ", "1.65 V"],
              ].map(([name, r1, r2, vout]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{r1}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{r2}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{vout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Values are no-load calculations. Actual output will sag slightly under load — see the FAQ for details.</p>
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
          Who Uses This Voltage Divider Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Scale battery or sensor voltages down to safe levels for Arduino, ESP32, and Raspberry Pi analog inputs." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify divider ratios and resistor power ratings during signal-conditioning circuit design and prototyping." },
            { icon: "🖥️", title: "Hardware Developers", desc: "Design sensor interface boards that translate industrial or automotive voltage levels into microcontroller-safe logic levels." },
            { icon: "🎓", title: "Electronics Students", desc: "Work through voltage divider problems and verify homework and lab calculations against the standard formula." },
            { icon: "🔧", title: "Technicians", desc: "Quickly check whether an in-circuit voltage divider is producing the expected output before troubleshooting further." },
            { icon: "🎛️", title: "Circuit Designers", desc: "Compare multiple resistor pair options side by side to find the combination closest to a target reference voltage." },
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
