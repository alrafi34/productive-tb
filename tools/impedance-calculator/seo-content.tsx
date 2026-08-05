export default function ImpedanceCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an impedance calculator?",
      a: "An impedance calculator is a free online tool that computes the total opposition to current flow (Z) in an AC circuit containing resistance, inductance, and capacitance. Enter resistance (R), inductive reactance (XL), and capacitive reactance (XC), and the calculator returns impedance, phase angle, and the circuit's overall behavior (inductive, capacitive, resistive, or resonant).",
    },
    {
      q: "What is the formula for impedance?",
      a: "Z = √(R² + (XL - XC)²), where Z is impedance in ohms, R is resistance, XL is inductive reactance, and XC is capacitive reactance. For example, with R = 10Ω, XL = 15Ω, and XC = 5Ω: net reactance X = 15 - 5 = 10Ω, so Z = √(10² + 10²) = √200 ≈ 14.14Ω.",
    },
    {
      q: "What is the difference between impedance and resistance?",
      a: "Resistance (R) is a fixed opposition to current that doesn't depend on frequency and dissipates energy as heat. Impedance (Z) is the combined opposition from resistance and reactance in an AC circuit — it includes both the energy-dissipating resistive part and the frequency-dependent, energy-storing reactive part, and it also introduces a phase shift between voltage and current that pure resistance does not.",
    },
    {
      q: "How do I calculate the phase angle from impedance?",
      a: "θ = arctan(X ÷ R), where X is the net reactance (XL - XC) and R is resistance. For R = 10Ω and net reactance X = 10Ω, θ = arctan(10/10) = 45°. A positive phase angle means voltage leads current (inductive circuit); a negative phase angle means current leads voltage (capacitive circuit).",
    },
    {
      q: "What does it mean when a circuit is 'resonant'?",
      a: "A circuit is resonant when inductive reactance exactly equals capacitive reactance (XL = XC), making the net reactance zero. At resonance, impedance equals resistance alone (Z = R), the phase angle is 0°, and the circuit behaves as if it were purely resistive — this is the operating point used to tune radio receivers and filter circuits to a specific frequency.",
    },
    {
      q: "How do I know if a circuit is inductive or capacitive from its impedance?",
      a: "Compare XL and XC: if XL > XC, the net reactance is positive and the circuit is inductive (voltage leads current). If XC > XL, the net reactance is negative and the circuit is capacitive (current leads voltage). If XL equals XC exactly, the circuit is resonant and behaves as purely resistive.",
    },
    {
      q: "How is impedance different from just adding resistance and reactance together?",
      a: "Resistance and reactance can't simply be added arithmetically because they're 90 degrees out of phase with each other in an AC circuit — resistance dissipates energy in phase with voltage, while reactance stores and releases energy 90 degrees out of phase. This is why impedance uses the Pythagorean-style formula Z = √(R² + X²), treating R and X as perpendicular components of a single complex quantity.",
    },
    {
      q: "How do I calculate current from impedance and voltage?",
      a: "I = V ÷ Z, following the AC equivalent of Ohm's Law. For a circuit with 120V applied across an impedance of 14.14Ω, current = 120 ÷ 14.14 ≈ 8.49A. Unlike a purely resistive circuit, this current will be out of phase with the voltage by the circuit's phase angle.",
    },
    {
      q: "Why does impedance matter for speaker and audio system design?",
      a: "Speakers present a complex, frequency-dependent impedance rather than a fixed resistance, since their voice coil is inductive and crossover networks add capacitive elements. Amplifiers are rated for a nominal impedance range (commonly 4Ω, 6Ω, or 8Ω), and matching amplifier output impedance to speaker impedance affects power transfer, damping, and the risk of overheating the amplifier at very low impedance loads.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistance, reactance, and impedance values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter resistance (R)", "Input the circuit's resistance value, choosing Ω, kΩ, or MΩ as the unit."],
    ["Enter inductive reactance (XL)", "Input the inductive reactance, calculated separately as XL = 2πfL if not already known, in the same unit scale."],
    ["Enter capacitive reactance (XC)", "Input the capacitive reactance, calculated separately as XC = 1/(2πfC) if not already known."],
    ["Read the impedance and phase angle", "The calculator instantly returns total impedance (Z), net reactance, and the phase angle between voltage and current."],
    ["Check the circuit classification", "See whether the circuit is inductive, capacitive, resistive, or resonant based on the relationship between XL and XC."],
    ["Apply a preset or export results", "Use a built-in preset for common RL, RC, RLC, or resonant circuit configurations, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Impedance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>impedance calculator</strong> computes the total opposition to current flow (Z) in an
            AC circuit containing resistance, inductance, and capacitance. Enter resistance (R), inductive
            reactance (XL), and capacitive reactance (XC), and the calculator returns impedance, the phase
            angle between voltage and current, and whether the circuit behaves as inductive, capacitive,
            resistive, or resonant.
          </p>
          <p>
            Impedance can't be found by simply adding R, XL, and XC together, because resistance and
            reactance are 90 degrees out of phase with each other — resistance dissipates energy in step
            with voltage, while reactance stores and releases energy a quarter-cycle out of step. This tool
            applies the correct vector (Pythagorean-style) combination automatically and shows every step,
            including the net reactance calculation and the resulting phase angle.
          </p>
          <p>
            Built for <strong>electrical engineers analyzing AC circuits, electronics students learning
            complex impedance, audio engineers matching speaker and amplifier impedance, and RF
            hobbyists</strong> working with resonant circuits. Includes six built-in circuit presets, full
            step-by-step derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Impedance Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Net reactance (X)</span> = XL - XC</p>
              <p><span className="font-semibold">Impedance (Z)</span> = √(R² + X²)</p>
              <p><span className="font-semibold">Phase angle (θ)</span> = arctan(X ÷ R)</p>
              <p className="text-gray-500 text-xs mt-2">Example: R = 10Ω, XL = 15Ω, XC = 5Ω</p>
              <p className="text-gray-500 text-xs">X = 10Ω, Z = <span className="text-green-600 font-semibold">14.14Ω</span>, θ = 45°</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>R</strong> — resistance, the in-phase (energy-dissipating) opposition to current</li>
            <li><strong>XL - XC</strong> — net reactance, the out-of-phase (energy-storing) opposition</li>
            <li><strong>Positive X</strong> — circuit is inductive (voltage leads current)</li>
            <li><strong>Negative X</strong> — circuit is capacitive (current leads voltage); zero X means resonance</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Impedance Calculator
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
                "Total impedance (Z) and net reactance",
                "Phase angle between voltage and current",
                "Automatic circuit type classification",
                "Full step-by-step derivation",
                "Six built-in circuit presets",
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
              title: "RLC Circuit Analysis for a Filter Design",
              scenario: "An engineer analyzing a series RLC filter with R = 5Ω, XL = 12Ω, and XC = 4Ω needs the total impedance. The calculator computes net reactance X = 12 - 4 = 8Ω, giving Z = √(25 + 64) = √89 ≈ 9.43Ω at a phase angle of 58°, confirming the circuit is strongly inductive at this frequency.",
            },
            {
              title: "Resonance Point Verification",
              scenario: "A student tuning an LC circuit measures XL = 15Ω and XC = 15Ω at a specific test frequency, with R = 10Ω. The calculator confirms net reactance is 0Ω, impedance equals resistance exactly (Z = 10Ω), and the phase angle is 0° — verifying they've found the circuit's resonant frequency.",
            },
            {
              title: "Speaker Impedance Matching Check",
              scenario: "An audio technician measures a speaker's voice coil resistance at 6Ω with an inductive reactance of 3Ω at the test frequency and no significant capacitive component. The calculator returns Z = √(36 + 9) ≈ 6.7Ω, close enough to the amplifier's rated 8Ω minimum load to confirm safe operation without excessive current draw.",
            },
            {
              title: "High-Impedance Instrumentation Circuit",
              scenario: "An engineer verifying a sensor interface circuit with R = 1kΩ, XL = 500Ω, and XC = 200Ω calculates net reactance of 300Ω, giving Z = √(1,000,000 + 90,000) ≈ 1,044Ω — confirming the circuit's high impedance won't excessively load the sensor's output.",
            },
            {
              title: "Current Draw Estimate from Applied Voltage",
              scenario: "A technician needs to estimate current through a circuit with Z = 14.14Ω when 120V AC is applied. Using I = V ÷ Z, they calculate approximately 8.49A — then use the impedance calculator's phase angle output (45°) to note that this current will be significantly out of phase with the applied voltage.",
            },
            {
              title: "Capacitive Circuit Diagnosis",
              scenario: "A technician troubleshooting a circuit with R = 8Ω and measuring XC = 6Ω (with negligible XL) confirms the circuit is capacitive. The calculator returns Z = √(64 + 36) = 10Ω at a phase angle of -36.87°, consistent with current leading voltage in a capacitive circuit, matching their oscilloscope observation.",
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
                "Calculate XL and XC at the specific frequency you care about before entering them here — both are frequency-dependent, so impedance at 60Hz will be very different from impedance at 1kHz for the exact same components.",
                "Use the phase angle sign as a quick diagnostic: positive means inductive (voltage leads), negative means capacitive (current leads), and near-zero means the circuit is close to resonance at that frequency.",
                "For speaker and amplifier matching, remember that rated impedance (like 8Ω) is a nominal figure — actual impedance varies with frequency due to the voice coil's inductance, so a speaker's true impedance curve dips and rises across its frequency range.",
                "When troubleshooting, compare the calculated impedance and phase angle against oscilloscope measurements of voltage and current phase difference — a mismatch points to an unaccounted-for component or incorrect reactance values.",
                "Use the built-in presets to build intuition for how R, XL, and XC interact before switching to your own real circuit's values — the resonant circuit preset is especially useful for seeing what zero net reactance looks like.",
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
                "Adding R, XL, and XC arithmetically instead of using the vector (Pythagorean) combination. Impedance is Z = √(R² + (XL-XC)²), not R + XL - XC — the phase relationship between resistance and reactance means they can't simply be summed.",
                "Forgetting that XL and XC change with frequency. A circuit calculated as resonant at 1kHz will not be resonant at 10kHz using the same component values, since both XL and XC scale differently with frequency.",
                "Confusing net reactance sign convention. XL - XC positive means inductive; if you accidentally reverse the subtraction (XC - XL), the phase angle sign flips, making an inductive circuit look capacitive in your result.",
                "Ignoring that impedance is frequency-specific data. Reporting a single impedance value without noting the frequency it was calculated at makes the number meaningless for anyone trying to reproduce or verify the calculation later.",
                "Using DC resistance measurements as if they equal impedance in an AC circuit. A component's DC resistance and its AC impedance at a given frequency can differ significantly once reactance is included.",
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
          Circuit Type Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R / XL / XC</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Net Reactance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Circuit Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Phase Angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10 / 15 / 0", "+15Ω", "Inductive", "+56.3°"],
                ["8 / 0 / 6", "-6Ω", "Capacitive", "-36.9°"],
                ["10 / 15 / 15", "0Ω", "Resonant", "0°"],
                ["50 / 0 / 0", "0Ω", "Resistive", "0°"],
                ["5 / 12 / 4", "+8Ω", "Inductive", "+58.0°"],
              ].map(([rxx, net, type, angle]) => (
                <tr key={rxx} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{rxx}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{net}</td>
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{angle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* All values in ohms. Circuit type is determined by the sign of net reactance (XL − XC).</p>
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
          Who Uses This Impedance Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Analyze AC circuits combining resistance, inductance, and capacitance during design and troubleshooting." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn how impedance combines resistive and reactive components and verify complex circuit homework problems." },
            { icon: "🎛️", title: "Audio Engineers", desc: "Match speaker and amplifier impedance and understand frequency-dependent voice coil behavior." },
            { icon: "📻", title: "RF Hobbyists", desc: "Verify resonant frequency conditions and analyze antenna and tuning circuit impedance." },
            { icon: "🔧", title: "Technicians", desc: "Diagnose circuit behavior by comparing calculated phase angle and impedance against measured values." },
            { icon: "🏭", title: "Industrial Controls Engineers", desc: "Assess sensor and instrumentation circuit loading by verifying impedance against source output impedance." },
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
