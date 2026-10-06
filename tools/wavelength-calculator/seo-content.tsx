import { wavelengthCalculatorConfig } from "./config";
export default function WavelengthCalculatorSEO() {
  const faqItems = wavelengthCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = wavelengthCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Wavelength Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>wavelength calculator</strong> is a free online tool that converts a wave's frequency
            into its physical wavelength using the formula λ = v/f. It answers a question that comes up
            constantly in RF and antenna work: <em>if a signal oscillates at this frequency, how long, in
            meters or centimeters, is one full cycle of that wave?</em>
          </p>
          <p>
            The tricky part isn't the division — it's that wave speed (v) is not a universal constant.
            Electromagnetic waves travel at the speed of light in vacuum, fractionally slower through air,
            and considerably slower through water or along a copper conductor. Get the medium wrong and the
            wavelength result is wrong too, even with the correct frequency. This{" "}
            <strong>frequency to wavelength calculator</strong> handles the unit conversion (Hz through GHz)
            and lets you pick the correct propagation speed for vacuum, air, water, copper, or any custom
            medium.
          </p>
          <p>
            This tool is built for <strong>RF engineers and antenna designers sizing dipole and monopole
            elements, network engineers evaluating WiFi and cellular signal behavior, radio hobbyists and
            amateur radio operators building homebrew antennas, physics students studying the electromagnetic
            spectrum, and audio engineers working with sound wave propagation</strong>. Results are shown
            simultaneously in kilometers, meters, centimeters, and millimeters, with calculation history and
            a text export — free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Wavelength Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">λ</span> = v ÷ f</p>
              <p className="text-gray-500 text-xs mt-2">λ = wavelength (meters) · v = wave propagation speed (m/s) · f = frequency (Hz)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Frequency normalization:</strong> input in Hz, kHz, MHz, or GHz is converted internally to a base Hz value before the formula is applied</li>
            <li><strong>Vacuum speed:</strong> 299,792,458 m/s — the speed of light, c, and the fastest any electromagnetic wave can travel</li>
            <li><strong>Air speed:</strong> ≈ 299,702,547 m/s — about 99.97% of c, close enough to vacuum that most RF work uses it interchangeably with free-space calculations</li>
            <li><strong>Water speed:</strong> ≈ 225,000,000 m/s — about 75% of c, relevant for underwater communication and sonar-adjacent RF work</li>
            <li><strong>Copper speed:</strong> ≈ 200,000,000 m/s — about 67% of c, an approximation for electrical signal propagation along copper conductors</li>
            <li><strong>Custom speed:</strong> enter any propagation speed directly — needed for sound waves, fiber optics, or any medium not in the preset list</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Wavelength Calculator
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
                "Real-time calculation as you type",
                "Hz, kHz, MHz, and GHz frequency units",
                "Five propagation media — vacuum, air, water, copper, custom",
                "Simultaneous results in km, m, cm, and mm",
                "Full formula and step-by-step breakdown",
                "Six built-in presets (WiFi, FM, AM, microwave, 5G)",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "Copy result to clipboard",
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

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Sizing a 2.4 GHz WiFi Antenna",
              scenario: "A hobbyist is building a homebrew WiFi antenna for a 2.4 GHz router. Entering 2.4 GHz with the medium set to Air, the calculator returns a wavelength of 12.49 cm. Dividing by four gives a target quarter-wave monopole length of about 3.12 cm, which they trim slightly shorter to account for the antenna wire's velocity factor.",
            },
            {
              title: "Comparing 5G Millimeter-Wave to 4G LTE",
              scenario: "A network engineer is explaining coverage differences between 4G LTE (700 MHz) and 5G mmWave (28 GHz) to a client. At 700 MHz in air, the calculator returns a 428 mm (0.428 m) wavelength; at 28 GHz, it returns just 10.7 mm. The engineer uses this 40x difference to explain why mmWave 5G has much shorter range and worse building penetration.",
            },
            {
              title: "FM Broadcast Tower Antenna Design",
              scenario: "A broadcast engineer is designing a half-wave dipole antenna for a 100 MHz FM station. The calculator returns a wavelength of 2.997 meters in air. A half-wave dipole target length is 1.4985 meters, which the engineer uses as the starting point before fine-tuning for the specific antenna material and mounting height.",
            },
            {
              title: "Microwave Oven Cavity Sizing",
              scenario: "An appliance engineer is verifying the resonant cavity dimensions for a 2.45 GHz microwave oven magnetron. Entering 2.45 GHz with Air selected, the calculator returns a 12.24 cm wavelength — close to the internal cavity dimensions the design must accommodate to sustain standing waves that heat food evenly.",
            },
            {
              title: "Underwater Acoustic Signal Planning",
              scenario: "A marine engineer is estimating the wavelength of a 50 kHz sonar pulse traveling through seawater. Selecting Custom Speed and entering 1,500 m/s (typical seawater sound speed) with 50 kHz frequency, the calculator returns a 3 cm wavelength — information used to estimate the sonar's target resolution limit.",
            },
            {
              title: "AM Radio Ground-Plane Antenna",
              scenario: "A radio hobbyist wants to build a ground-plane antenna for a 1 MHz AM station. Entering 1 MHz with Air selected, the calculator returns a wavelength of 299.7 meters — explaining why practical AM antennas use loaded coils and shortened radiators rather than a true quarter-wave (about 75 meters) vertical.",
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
                "For antenna design, treat the calculator's result as a free-space starting point, not a final measurement. Real antennas have a velocity factor (typically 0.90-0.98 for wire, lower for PCB traces) that shortens the physical length below the theoretical wavelength fraction.",
                "Use Air rather than Vacuum for any terrestrial RF work. The difference is only 0.03%, but selecting Air is the technically correct choice since virtually no signal you're designing for actually travels through a vacuum.",
                "When working with sound, remember speed varies significantly with temperature and medium — 343 m/s in air at 20°C changes to about 331 m/s at 0°C. Use the custom speed field with the value appropriate to your actual operating temperature.",
                "Compare wavelengths across frequency bands to build intuition fast: doubling the frequency always halves the wavelength, since v stays constant for a given medium. This shortcut avoids needing the calculator for quick mental estimates.",
                "For fiber-optic or waveguide calculations, don't use the free-space speed of light. Enter a custom speed equal to c divided by the material's refractive index — for typical optical fiber (n ≈ 1.5), that's about 200,000,000 m/s.",
                "Save each frequency you check to history when comparing a spectrum of signals (like 2.4 GHz vs 5 GHz vs 6 GHz WiFi bands) so you can review all the wavelengths side by side instead of recalculating.",
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
                "Don't leave the medium set to Vacuum for antenna design in air. The 0.03% speed difference is negligible for most purposes, but using the wrong medium out of habit can compound with other small errors in a tight design.",
                "Don't forget to select GHz instead of MHz for modern wireless frequencies. Entering '2.4' with the unit left on MHz calculates the wavelength for 2.4 MHz — a 125-meter wavelength — instead of the intended 2.4 GHz WiFi band, a difference of a thousand-fold.",
                "Don't assume wavelength in a new medium scales the same way frequency does. Frequency never changes when a wave crosses into a different medium — only wave speed and wavelength change, and they change proportionally to each other, not to frequency.",
                "Don't use the free-space wavelength directly as your final antenna length. Skipping the velocity factor correction is one of the most common reasons a homebrew antenna is detuned from its target frequency after being built.",
                "Don't confuse wavelength with the range or reach of a signal. A longer wavelength (lower frequency) typically travels farther and penetrates obstacles better, but wavelength itself is a physical measurement of one cycle's length, not a measure of signal strength or distance covered.",
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
          Frequency ↔ Wavelength Reference Table (In Air)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Frequency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Wavelength</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1 MHz", "299.7 m", "AM broadcast radio"],
                ["100 MHz", "2.997 m", "FM broadcast radio"],
                ["700 MHz", "0.428 m (42.8 cm)", "4G LTE low band"],
                ["900 MHz", "0.333 m (33.3 cm)", "GSM cellular / ISM band"],
                ["2.4 GHz", "12.49 cm", "WiFi 2.4 GHz / Bluetooth"],
                ["2.45 GHz", "12.24 cm", "Microwave oven (ISM band)"],
                ["5 GHz", "5.99 cm", "WiFi 5 GHz band"],
                ["28 GHz", "10.7 mm", "5G millimeter-wave"],
              ].map(([f, w, use]) => (
                <tr key={f} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{f}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-900 text-xs">{w}</td>
                  <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Wavelength calculated using air propagation speed (299,702,547 m/s). Values rounded for display.</p>
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
          Who Uses This Wavelength Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📡", title: "RF & Antenna Engineers", desc: "Size dipole, monopole, and Yagi antenna elements as a starting point before applying velocity-factor corrections for the final build." },
            { icon: "🌐", title: "Network Engineers", desc: "Compare WiFi, cellular, and satellite frequency bands to explain range, penetration, and interference behavior in real-world deployments." },
            { icon: "📻", title: "Radio Hobbyists", desc: "Calculate wavelengths for homebrew AM, FM, and amateur radio antennas, ground planes, and transmission line matching sections." },
            { icon: "🎓", title: "Physics & Electronics Students", desc: "Work through λ = v/f exercises across the electromagnetic spectrum, from radio waves to visible light, and check homework answers instantly." },
            { icon: "🔬", title: "Research & Lab Technicians", desc: "Verify wavelength assumptions for spectroscopy, fiber-optic, and microwave cavity experiments using custom propagation speeds." },
            { icon: "🎚️", title: "Audio & Acoustics Engineers", desc: "Estimate sound wavelengths in air, water, or solid materials for room acoustics, sonar, and ultrasonic sensor design work." },
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
