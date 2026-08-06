export default function FrequencyCalculatorSEO() {
  const faqItems = [
    { q: "What is a frequency calculator?", a: "A frequency calculator is a tool that converts between frequency and time period using the inverse relationship f = 1/T. Frequency (f) measures how many cycles occur per second in Hertz (Hz), while time period (T) measures how long one full cycle takes in seconds. Enter either value and the calculator instantly returns the other, along with the calculation steps." },
    { q: "How is frequency calculated from time period?", a: "Frequency is calculated as f = 1/T, where T is the time period in seconds. For example, a signal with a time period of 0.02 seconds has a frequency of 1 ÷ 0.02 = 50 Hz. If your time period is entered in milliseconds or microseconds, the calculator first converts it to seconds before applying the formula." },
    { q: "How is time period calculated from frequency?", a: "Time period is calculated as T = 1/f, where f is the frequency in Hertz. For example, a 1 MHz signal has a time period of 1 ÷ 1,000,000 = 0.000001 seconds, or 1 microsecond. The calculator normalizes kHz and MHz inputs to Hz internally before computing the period." },
    { q: "What decimal precision should I use?", a: "For AC power calculations (50 Hz, 60 Hz) 2 to 3 decimal places is enough since the numbers are already round. For audio work in the kHz range, 4 to 6 decimals keeps millisecond periods accurate. For RF and MHz-range signals where the period is in microseconds or smaller, use 6 to 8 decimals to avoid rounding errors compounding in downstream calculations like PWM timing or crystal oscillator design." },
    { q: "What is the difference between frequency and angular frequency?", a: "Frequency (f) is the number of cycles per second in Hertz, while angular frequency (ω) is the rate of rotation in radians per second, related by ω = 2πf. This calculator computes ordinary frequency f, not angular frequency. If you need ω for AC circuit impedance or reactance work, multiply the frequency result by 2π (approximately 6.2832) separately." },
    { q: "Why do AC power frequencies differ between regions?", a: "Most of Europe, Asia, Africa, and Australia standardized on 50 Hz (time period 0.02 s / 20 ms) for their electrical grids, while North America and parts of South America and Japan use 60 Hz (time period ≈ 0.01667 s / 16.67 ms). The difference dates back to early 20th-century generator design decisions and has stayed fixed ever since because changing grid frequency requires replacing all connected equipment." },
    { q: "Can I use this calculator for audio frequencies?", a: "Yes. Human hearing spans roughly 20 Hz to 20 kHz, and this calculator handles that entire range plus everything above and below it. A 440 Hz concert-pitch A note has a time period of about 2.27 ms, while a 1 kHz test tone — the standard reference signal in audio engineering — has a period of exactly 1 ms." },
    { q: "Can I use this calculator for RF and radio frequencies?", a: "Yes, up to the MHz range. AM broadcast frequencies (530–1700 kHz) and shortwave/HF signals (up to 30 MHz) convert cleanly — for example, a 1 MHz carrier has a 1 microsecond period. For frequencies above the MHz range (GHz-scale microwave and cellular signals), convert your value to MHz first, since MHz is the highest frequency unit this tool supports." },
    { q: "What is the difference between Hz, kHz, and MHz?", a: "Hz (Hertz) is the base unit — one cycle per second. kHz (kilohertz) equals 1,000 Hz, and MHz (megahertz) equals 1,000,000 Hz. A 100 kHz signal is the same as 100,000 Hz or 0.1 MHz. The calculator lets you pick input and output units independently, so you can enter a value in kHz and read the result in Hz or MHz without doing the multiplication yourself." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your frequency values, time periods, and calculation history are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Choose a calculation mode", "Select Time Period → Frequency if you know how long one cycle takes, or Frequency → Time Period if you already know the frequency. The input fields update automatically to match the mode you pick."],
    ["Enter your known value", "Type the time period or frequency value into the input box. The field accepts decimals and switches its placeholder and unit selector depending on the mode you chose."],
    ["Select the input unit", "Choose seconds, milliseconds, or microseconds for time period, or Hz, kHz, or MHz for frequency. The calculator normalizes whatever you enter to a common base unit internally before computing."],
    ["Set decimal precision", "Pick 2 to 8 decimal places depending on how exact you need the answer. Use higher precision for MHz-range or microsecond-range values where rounding matters more."],
    ["Choose the output unit", "Select which unit you want the result displayed in — independent of your input unit. This lets you enter a value in Hz and read the answer directly in kHz or MHz."],
    ["Read the result and steps", "The calculator shows the converted value along with a full breakdown of the formula applied. Copy the result, save it to history, swap modes to check the reverse direction, or export a text report."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Frequency Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>frequency calculator</strong> is a free online tool that converts between frequency
            and time period using the fundamental inverse relationship f = 1/T. It answers the question
            every electronics project eventually runs into: <em>if one cycle takes this long, what frequency
            is that — or if the frequency is this, how long does one cycle actually take?</em>
          </p>
          <p>
            The math itself is a single division, but keeping track of units is where mistakes happen.
            Frequency can be expressed in Hz, kHz, or MHz, and time period in seconds, milliseconds, or
            microseconds — mixing them up by even one prefix throws a result off by a factor of a thousand.
            This <strong>time period to frequency calculator</strong> normalizes every input internally, so
            a value entered in kHz and a period entered in milliseconds always produce a correct, unit-consistent
            answer.
          </p>
          <p>
            This tool is built for <strong>electrical engineers verifying AC circuit parameters, audio
            engineers working with test tones and waveform periods, RF technicians and radio hobbyists
            converting carrier frequencies, embedded and firmware engineers timing PWM and clock signals,
            and electronics students learning the f = 1/T relationship</strong>. Every calculation runs
            instantly in your browser with step-by-step working shown, adjustable precision up to 8 decimal
            places, calculation history, and a text export — free, with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Frequency and Time Period Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">f</span> = 1 ÷ T</p>
              <p><span className="font-semibold">T</span> = 1 ÷ f</p>
              <p className="text-gray-500 text-xs mt-2">f = frequency in Hz · T = time period in seconds</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Inverse relationship:</strong> frequency and time period always move in opposite directions — double the frequency and the period is cut in half</li>
            <li><strong>Frequency units:</strong> the calculator accepts and outputs Hz, kHz (× 1,000), and MHz (× 1,000,000), converting every value to a base Hz figure before computing</li>
            <li><strong>Time units:</strong> time period is accepted and returned in seconds, milliseconds (÷ 1,000), or microseconds (÷ 1,000,000)</li>
            <li><strong>Two calculation modes:</strong> Time Period → Frequency applies f = 1/T; Frequency → Time Period applies T = 1/f</li>
            <li><strong>Adjustable precision:</strong> results can be shown at 2 to 8 decimal places, with automatic scientific notation for extremely large or small values</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Frequency Calculator
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
                "Bidirectional conversion — frequency or period first",
                "Hz, kHz, and MHz frequency units",
                "Seconds, milliseconds, and microsecond time units",
                "Adjustable precision from 2 to 8 decimal places",
                "Full step-by-step calculation breakdown",
                "One-click swap between calculation modes",
                "Calculation history (last 10 entries)",
                "Export results as a text report",
                "Copy result to clipboard",
                "100% browser-based — no data sent to a server",
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
              title: "Verifying Generator Output Frequency",
              scenario: "An electrician is commissioning a backup generator and measures its output period on an oscilloscope at 20.08 ms per cycle. Entering 20.08 ms into Time Period → Frequency mode returns 49.80 Hz — just under the 50 Hz grid standard. The 0.4% deviation is within the generator's governor tolerance, so the electrician approves it for grid-tie use without adjustment.",
            },
            {
              title: "Setting an Audio Test Tone",
              scenario: "An audio engineer needs to generate the industry-standard 1 kHz reference tone for calibrating a mixing console. Using Frequency → Time Period mode with 1 kHz entered, the calculator returns exactly 1 ms. They confirm this matches the period shown on their signal generator before running the calibration sweep.",
            },
            {
              title: "Tuning an AM Radio Receiver",
              scenario: "A radio hobbyist is building a crystal radio tuned to a 1000 kHz AM station. Converting 1000 kHz (1 MHz) with Frequency → Time Period mode returns a 1 microsecond period. This confirms the local oscillator in their superheterodyne design needs to complete one full cycle every microsecond at that station's carrier frequency.",
            },
            {
              title: "Designing a Motor-Control PWM Signal",
              scenario: "An embedded engineer is setting the switching frequency for a brushless motor driver at 20 kHz — high enough to stay above the audible range. Entering 20 kHz into Frequency → Time Period mode returns a 50 microsecond period, which they use directly to configure the microcontroller's PWM timer registers.",
            },
            {
              title: "Checking a Real-Time Clock Crystal",
              scenario: "A hardware designer is verifying a 32.768 kHz watch crystal used for a real-time clock circuit. Entering 32.768 kHz returns a time period of 30.52 microseconds per cycle. Since 32.768 kHz equals 2^15 Hz, dividing this signal by 32,768 in a binary counter produces a clean 1 Hz tick — the basis of the RTC's one-second interrupt.",
            },
            {
              title: "Physics Classroom Wave Demonstration",
              scenario: "A physics teacher is preparing a lesson on periodic motion and measures a demonstration signal generator's output at a 4 ms period. Entering 4 ms into Time Period → Frequency mode returns 250 Hz, which students then compare against the piano's middle-B note (~247 Hz) to connect the abstract formula to something audible.",
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
                "When comparing signals shown in different units, mentally convert both to Hz first. A 1500 Hz tone and a 1.5 kHz tone are identical, but comparing '1500' against '1.5' without noting the units is a common source of confused readings.",
                "For crystal oscillators and RTC circuits, work in microseconds and use 6-8 decimal precision. A 32.768 kHz crystal has a period of 30.5175781 µs — rounding to 2 decimals (30.52 µs) is fine for a datasheet check, but not for cycle-accurate timer register calculations.",
                "Use the swap button after getting a result to instantly check the calculation in the opposite direction — useful for verifying you entered the right mode without retyping values.",
                "When designing a 555 timer astable circuit, calculate the target period first with this tool, then work backward into resistor and capacitor values using T = 0.693 × (R1 + 2×R2) × C separately — this calculator gives you the T you need to hit.",
                "Save each conversion to history when working through a multi-frequency project (like a PWM frequency sweep) so you can compare several period values side by side instead of re-entering them.",
                "Remember that this calculator gives ordinary frequency f in Hz, not angular frequency ω in rad/s. If you're feeding a result into an impedance or reactance formula that expects ω, multiply the frequency by 2π afterward.",
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
                "Don't enter a kHz value into a field expecting Hz. Typing '50' intending 50 kHz but leaving the unit on Hz gives a period of 20 ms instead of the intended 20 µs — a thousand-fold error that's easy to miss if you don't check the unit dropdown.",
                "Don't confuse time period with duty cycle. Period is the full length of one complete cycle; duty cycle is the percentage of that period a signal spends 'on.' This calculator only computes period from frequency — it does not account for duty cycle at all.",
                "Don't assume 50 Hz and 60 Hz are interchangeable across regions. Equipment designed for one grid frequency (transformers, motors, some power supplies) can overheat or run incorrectly on the other — always check the nameplate rating before assuming.",
                "Don't use low decimal precision for MHz-range or microsecond-range values. At 2 decimal places, a 13.56 MHz signal's period rounds to 0.07 µs, which loses enough accuracy to throw off downstream RF timing calculations — bump precision to 6-8 decimals for anything above 1 MHz.",
                "Don't forget that time period must be entered as a positive number greater than zero. A period of zero or a negative value is not physically meaningful, and the calculator will reject it with a validation error.",
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
          Frequency ↔ Time Period Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Frequency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Time Period</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["50 Hz", "20 ms", "AC power — Europe, Asia, Africa"],
                ["60 Hz", "16.667 ms", "AC power — North America"],
                ["440 Hz", "2.273 ms", "Musical note A4 (concert pitch)"],
                ["1 kHz", "1 ms", "Standard audio test tone"],
                ["20 kHz", "50 µs", "Upper limit of human hearing"],
                ["32.768 kHz", "30.518 µs", "Watch / RTC crystal oscillator"],
                ["100 kHz", "10 µs", "AM radio IF stage (typical)"],
                ["1 MHz", "1 µs", "AM broadcast carrier reference"],
              ].map(([f, t, use]) => (
                <tr key={f} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{f}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-900 text-xs">{t}</td>
                  <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Values rounded for display. Use the calculator above for full precision up to 8 decimal places.</p>
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
          Who Uses This Frequency Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify AC circuit frequency and period parameters, check generator output against grid standards, and cross-reference values for reactance and impedance calculations." },
            { icon: "🎚️", title: "Audio Engineers", desc: "Convert between test-tone frequencies and waveform periods when calibrating equipment, analyzing recordings, or verifying signal generator output against spec." },
            { icon: "📻", title: "RF Technicians & Radio Hobbyists", desc: "Convert AM and shortwave carrier frequencies into cycle periods for oscillator design, antenna tuning, and homebrew receiver projects." },
            { icon: "🔧", title: "Embedded & Firmware Engineers", desc: "Calculate PWM switching periods, timer register values, and clock crystal cycle times when configuring microcontroller peripherals." },
            { icon: "🎓", title: "Electronics Students", desc: "Work through f = 1/T exercises, check homework answers, and build intuition for how frequency and period trade off across Hz, kHz, and MHz ranges." },
            { icon: "🧑‍🔬", title: "Physics Teachers", desc: "Demonstrate the inverse relationship between frequency and period in class using real oscilloscope readings converted live during a lesson." },
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
