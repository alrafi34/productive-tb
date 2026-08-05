export default function BatteryChargingTimeCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a battery charging time calculator?",
      a: "A battery charging time calculator is a free online tool that estimates how long it takes to charge a battery from a starting percentage to a target percentage, using battery capacity (mAh or Ah), charger current, and charging efficiency. It's useful for phones, tablets, laptops, power banks, e-bikes, and car batteries.",
    },
    {
      q: "What is the formula for battery charging time?",
      a: "Ideal Time (hours) = Effective Capacity (Ah) ÷ Charging Current (A), where Effective Capacity = Total Capacity × (Charge Range ÷ 100). Actual Time = Ideal Time ÷ Efficiency. For example, charging a 4,000mAh (4Ah) phone battery from 20% to 100% (80% range) with a 2A charger at 85% efficiency: Effective Capacity = 4 × 0.8 = 3.2Ah, Ideal Time = 3.2 ÷ 2 = 1.6 hours, Actual Time = 1.6 ÷ 0.85 ≈ 1.88 hours.",
    },
    {
      q: "Why does charging take longer than the 'ideal' calculation suggests?",
      a: "Charging isn't 100% efficient — some energy is lost as heat during the charge-controller and battery chemical conversion process. Typical phone and tablet chargers run around 85-90% efficient, while car and larger lead-acid battery chargers often run 75-85% efficient, meaning actual charging time is noticeably longer than the simple capacity-divided-by-current calculation.",
    },
    {
      q: "Why doesn't charging speed stay constant from 0% to 100%?",
      a: "Most modern lithium-based chargers use a two-stage process: constant current (fast, roughly linear charging) up to about 80% capacity, then constant voltage (progressively slower, tapering charging) for the final 20% as the battery approaches full charge. This calculator assumes a constant average charging rate across the whole range, so real-world charging to 100% is often somewhat slower than this estimate for the last portion.",
    },
    {
      q: "How do I convert between mAh and Ah?",
      a: "1 Ah = 1,000 mAh. A 4,000mAh phone battery is equivalently 4Ah. This calculator accepts either unit directly and converts internally, so you can enter the capacity exactly as printed on the battery or device label.",
    },
    {
      q: "How long does it take to charge a smartphone?",
      a: "A typical 4,000mAh smartphone battery charged from 20% to 100% (80% charge range) with a 2A charger at 85% efficiency takes approximately 1.88 hours. Fast-charging phones use higher current chargers (often 3A or more with proprietary fast-charging protocols) to reduce this significantly, though efficiency can be lower during the fastest charging phase.",
    },
    {
      q: "How long does it take to charge a car battery?",
      a: "A typical 60Ah car battery charged from a partially discharged state with a 10A charger at 80% efficiency takes several hours depending on the starting charge level — charging the full range from empty to full would take roughly 7.5 hours at the ideal rate, or about 9.4 hours accounting for 80% charging efficiency.",
    },
    {
      q: "Does using a higher-current charger always charge faster?",
      a: "Generally yes, since charging time is inversely proportional to charging current, but the battery's own maximum charge rate acceptance sets a practical ceiling — most batteries can only safely accept charging current up to a certain fraction of their capacity (often expressed as a 'C-rate'), beyond which excess current generates heat rather than charging faster and can damage the battery.",
    },
    {
      q: "Why should I avoid always charging to exactly 100%?",
      a: "For lithium-based batteries, regularly charging to 100% and discharging to 0% accelerates capacity fade compared to charging within a more moderate range, such as 20-80%. This calculator lets you set any start and end percentage, making it easy to estimate charging time for a partial-range charging strategy that may extend battery lifespan.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your battery capacity, charging current, and percentage values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter battery capacity", "Input the battery's rated capacity in mAh (for phones, tablets, power banks) or Ah (for car and e-bike batteries)."],
    ["Enter charging current", "Input the charger's rated output current in amps (A), found on the charger's label or specification."],
    ["Enter charging efficiency", "Input the expected charging efficiency percentage — typically 85-90% for phone/tablet chargers, 75-85% for car and lead-acid chargers."],
    ["Set start and end charge percentage", "Input the battery's current charge level and your target charge level, such as 20% to 80% for a partial charge."],
    ["Read the charging time result", "The calculator returns charging time in hours, plus a formatted hours-and-minutes figure and effective capacity charged."],
    ["Apply a preset or export results", "Use a built-in preset for smartphones, tablets, power banks, laptops, car batteries, or e-bikes, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Battery Charging Time Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>battery charging time calculator</strong> estimates how long it takes to charge a
            battery from a starting percentage to a target percentage, using battery capacity, charger
            current, and charging efficiency. It works for phones, tablets, laptops, power banks, e-bikes,
            and car batteries — anywhere you need to know how long to wait before a device or vehicle is
            ready to use.
          </p>
          <p>
            The basic math — capacity divided by current gives time — is simple, but real charging always
            takes longer than that idealized figure because no charging process is perfectly efficient, and
            because you're rarely charging from completely empty to completely full. This tool accounts for
            both factors: it lets you specify the actual start and end charge percentage rather than
            assuming a full 0-to-100% cycle, and applies a realistic efficiency adjustment for the type of
            charger involved.
          </p>
          <p>
            Built for <strong>anyone planning around device charging time</strong> — from travelers timing
            a phone charge before a flight to car owners estimating how long a battery charger needs to run.
            Includes six built-in presets covering common devices, mAh and Ah unit support, full
            step-by-step derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Battery Charging Time Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Effective Capacity</span> = Total Capacity × (Charge Range ÷ 100)</p>
              <p><span className="font-semibold">Ideal Time (hours)</span> = Effective Capacity ÷ Charging Current</p>
              <p><span className="font-semibold">Actual Time</span> = Ideal Time ÷ Efficiency</p>
              <p className="text-gray-500 text-xs mt-2">Example: 4,000mAh (4Ah), 20%→100%, 2A charger, 85% efficiency</p>
              <p className="text-gray-500 text-xs">Effective = 3.2Ah, Actual Time = <span className="text-green-600 font-semibold">≈1.88 hours</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 Ah</strong> = 1,000 mAh — this calculator converts automatically</li>
            <li><strong>Efficiency</strong> — typically 85-90% for phone/tablet chargers, 75-85% for car/lead-acid chargers</li>
            <li><strong>Charge range</strong> — only the percentage gap you're actually charging counts, not the full battery</li>
            <li>Real charging tapers near 100% (constant-voltage phase) — this calculator assumes a constant average rate</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Battery Charging Time Calculator
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
                "mAh and Ah unit support with automatic conversion",
                "Custom start and end charge percentage",
                "Charging speed rating (Very Fast to Very Slow)",
                "Optional energy (Wh) calculation with voltage",
                "Full step-by-step derivation",
                "Six built-in presets (phone, tablet, car, more)",
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
              title: "Smartphone Charging Before a Flight",
              scenario: "A traveler with a 4,000mAh phone at 20% battery wants to know if it'll reach 100% before boarding in 2 hours, using a 2A charger at 85% efficiency. The calculator returns approximately 1.88 hours — confirming they have enough time with a small margin to spare.",
            },
            {
              title: "Tablet Overnight Charging Check",
              scenario: "A user charging an 8,000mAh tablet from 10% to 100% (90% range) with a 2.4A charger at 85% efficiency calculates a charging time of roughly 3.53 hours — well within an overnight charging window.",
            },
            {
              title: "Power Bank Full Recharge Estimate",
              scenario: "Someone recharging a 20,000mAh power bank from empty to full with a 3A charger at 80% efficiency calculates a charging time of roughly 8.33 hours — informing them to start the recharge well before they next need the power bank.",
            },
            {
              title: "Laptop Battery Charging Time",
              scenario: "A remote worker charging a 5,000mAh laptop battery from 30% to 100% (70% range) with a 3A charger at 90% efficiency calculates approximately 1.3 hours — useful for planning a charging break between meetings.",
            },
            {
              title: "Car Battery Charger Runtime",
              scenario: "A car owner charging a 60Ah battery from a partially discharged state (say 30% to 100%, a 70% range) with a 10A charger at 80% efficiency calculates approximately 5.25 hours — helping them decide whether to leave the charger running overnight or during a workday.",
            },
            {
              title: "E-Bike Battery Full Charge Planning",
              scenario: "An e-bike commuter charging a 15Ah battery from 20% to 100% (80% range) with a 5A charger at 85% efficiency calculates approximately 2.82 hours — enough time to fully charge during a typical workday before the evening commute home.",
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
                "Add extra time margin beyond the calculated estimate for the final 10-20% of charge, since most lithium-based chargers taper their current as the battery approaches full, making the last portion slower than this calculator's constant-rate assumption.",
                "Set the end percentage to 80% rather than 100% if you're optimizing for battery longevity rather than maximum runtime — many device manufacturers now recommend this range for daily charging to slow long-term capacity fade.",
                "Use the charger's actual rated output current, not the cable's maximum rating, when estimating charging time — a high-current cable connected to a lower-current charger charges at the charger's rate, not the cable's.",
                "For car batteries, use a lower charging current (like 2-4A trickle charging) if you have time, since this typically achieves higher charging efficiency and is gentler on battery health than fast high-current charging.",
                "Cross-check your calculated estimate against the device manufacturer's stated charging time when available — this helps you calibrate a more accurate efficiency percentage for that specific device and charger combination going forward.",
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
                "Assuming charging time scales the same way across the entire 0-100% range. The final stretch toward 100% is typically slower per-percent than the earlier stages, due to the constant-voltage tapering phase most lithium chargers use.",
                "Mixing up mAh and Ah when entering battery capacity. A 4,000mAh phone battery entered as \"4,000\" while the unit selector is set to Ah overstates the calculation by a factor of 1,000.",
                "Ignoring charging efficiency entirely and using the ideal (100% efficient) time as the expected result. Real charging is always somewhat less efficient, and skipping this adjustment underestimates actual charging time.",
                "Using the charger's maximum rated current when the battery or device can't actually accept that much current. Many batteries have a maximum safe charge rate lower than what a fast charger can supply, which effectively caps real-world charging speed below what this calculator predicts.",
                "Forgetting to set a realistic starting percentage. Calculating charging time assuming a 0% start when the device is actually at 40% overstates the time needed by including energy that's already stored in the battery.",
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
          Common Device Charging Time Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Device</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Capacity</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Charger</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Charging Time (0-100%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Smartphone", "4,000 mAh", "2A, 85% eff.", "≈2.35 hours"],
                ["Tablet", "8,000 mAh", "2.4A, 85% eff.", "≈3.92 hours"],
                ["Power bank", "20,000 mAh", "3A, 80% eff.", "≈8.33 hours"],
                ["Laptop battery", "5,000 mAh", "3A, 90% eff.", "≈1.85 hours"],
                ["Car battery", "60 Ah", "10A, 80% eff.", "≈7.5 hours"],
                ["E-bike battery", "15 Ah", "5A, 85% eff.", "≈3.53 hours"],
              ].map(([device, cap, charger, time]) => (
                <tr key={device} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{device}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{cap}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{charger}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Full 0-100% charge times shown for reference — real charging tapers near 100%, so actual times often run somewhat longer for the final portion.</p>
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
          Who Uses This Battery Charging Time Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📱", title: "Smartphone & Tablet Users", desc: "Plan charging time around travel, meetings, or other schedules requiring a specific battery level by a deadline." },
            { icon: "🚗", title: "Car Owners", desc: "Estimate how long a battery charger needs to run to fully recharge a partially discharged car battery." },
            { icon: "🚲", title: "E-Bike & E-Scooter Commuters", desc: "Time daily charging to ensure a full battery is ready before the next commute or ride." },
            { icon: "🔋", title: "Power Bank Users", desc: "Plan recharge timing for portable power banks between trips or extended outdoor use." },
            { icon: "💻", title: "Remote Workers", desc: "Estimate laptop battery charging time to plan work sessions around available power breaks." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Calculate charging time for custom battery packs and portable project power supplies." },
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
