export default function BatteryBackupTimeCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a battery backup time calculator?",
      a: "A battery backup time calculator is a free online tool that estimates how long an existing battery will power a given load, from battery voltage, capacity (Ah), load power, system efficiency, and depth of discharge. Unlike a battery capacity calculator (which sizes a new battery for a target runtime), this tool solves the reverse problem — how long a battery you already have will actually last.",
    },
    {
      q: "What is the formula for battery backup time?",
      a: "Backup Time (hours) = (Voltage × Capacity × Depth of Discharge% × Efficiency%) ÷ Load Power. For example, a 12V, 100Ah battery at 85% efficiency and 100% depth of discharge, powering a 150W load: Time = (12 × 100 × 1.0 × 0.85) ÷ 150 = 1,020 ÷ 150 = 6.8 hours.",
    },
    {
      q: "What is depth of discharge (DoD) and why does it matter?",
      a: "Depth of discharge is the percentage of a battery's total rated capacity that's safely usable before recharging is needed. Lead-acid batteries are commonly limited to 50% DoD to preserve cycle life, while lithium-ion and LiFePO4 batteries can often handle 80-100% DoD without significant lifespan reduction — using the wrong DoD assumption significantly changes the calculated backup time.",
    },
    {
      q: "Why does system efficiency reduce backup time below the theoretical maximum?",
      a: "Real systems lose some energy to internal battery resistance, inverter conversion losses, and wiring resistance, so not all of the battery's rated Wh reaches the load as useful power. A system at 85% efficiency delivers only 85% of the battery's theoretical energy to the actual load, directly reducing backup time proportionally.",
    },
    {
      q: "How do I calculate backup time for a home inverter system?",
      a: "Multiply battery voltage by capacity to get total Wh, apply depth of discharge and efficiency percentages, then divide by the load's power draw. A 12V, 100Ah battery (1,200Wh) at 85% efficiency and full depth of discharge running a 150W load gives roughly 6.8 hours of backup time.",
    },
    {
      q: "How does load power affect backup time?",
      a: "Backup time is inversely proportional to load power — doubling the load halves the backup time for the same battery. A 12V, 100Ah battery that runs a 150W load for 6.8 hours would only run a 300W load for about 3.4 hours, since twice the power draws down the same energy reserve twice as fast.",
    },
    {
      q: "Why is my actual backup time shorter than the calculated figure?",
      a: "Several factors commonly cause real-world backup time to fall short of calculation: battery capacity degrading with age below its original rating, colder ambient temperatures reducing usable capacity (especially for lead-acid), higher-than-estimated load power, or a lower actual system efficiency than assumed — measuring these factors and re-running the calculation with updated values usually closes the gap.",
    },
    {
      q: "How do I estimate backup time for multiple appliances at once?",
      a: "Add up the power draw of every appliance you want to run simultaneously to get total load power, then use that combined figure in the backup time calculation. Running a 60W LED light set alongside a 65W laptop charger means using 125W as the total load power, not calculating each separately.",
    },
    {
      q: "How is this different from a battery capacity calculator?",
      a: "This calculator solves for backup time given a known battery — useful for checking how long an already-purchased UPS, inverter battery, or solar battery bank will last. A battery capacity calculator solves the reverse problem, sizing a new battery to meet a target runtime.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, capacity, load power, and efficiency values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter battery voltage", "Input the nominal battery voltage — commonly 12V, 24V, or 48V."],
    ["Enter battery capacity", "Input the battery's rated capacity in amp-hours (Ah), found on the battery's label or datasheet."],
    ["Enter load power", "Input the total power in watts (W) drawn by everything you're running on this battery, adding up multiple devices if needed."],
    ["Enter system efficiency and depth of discharge", "Input your inverter/system efficiency percentage and how much of the battery's capacity you plan to safely use."],
    ["Read the backup time result", "The calculator returns backup time in hours, plus a formatted hours-and-minutes figure and the current draw."],
    ["Apply a preset or export results", "Use a built-in preset for common UPS, inverter, solar, and RV scenarios, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Battery Backup Time Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>battery backup time calculator</strong> estimates how long an existing battery will
            power a given load, from battery voltage, capacity, load power, system efficiency, and depth of
            discharge. It answers the practical question "how long will my battery last?" — useful for
            checking a UPS, inverter, or solar battery bank you already own rather than sizing a new one.
          </p>
          <p>
            The underlying math is straightforward: total energy divided by load power gives time, but two
            real-world factors change the answer meaningfully — depth of discharge (how much of the rated
            capacity is safe to actually use, which varies significantly by battery chemistry) and system
            efficiency (how much of that energy is lost to conversion and resistance before reaching the
            load). This tool builds both adjustments into the calculation so the result reflects realistic
            runtime rather than an idealized figure that overstates what you'll actually get.
          </p>
          <p>
            Built for <strong>homeowners planning outage backup, RV and camper owners checking house
            battery runtime, and solar system owners</strong> verifying their battery bank against expected
            loads. Includes six built-in battery presets and eight common load presets, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Battery Backup Time Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Total Energy (Wh)</span> = Voltage × Capacity (Ah)</p>
              <p><span className="font-semibold">Effective Energy</span> = Total Energy × DoD% × Efficiency%</p>
              <p><span className="font-semibold">Backup Time (hours)</span> = Effective Energy ÷ Load Power</p>
              <p className="text-gray-500 text-xs mt-2">Example: 12V, 100Ah, 85% efficiency, 100% DoD, 150W load</p>
              <p className="text-gray-500 text-xs">Time = (1,200 × 0.85) ÷ 150 = <span className="text-green-600 font-semibold">6.8 hours</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Depth of discharge (DoD)</strong> — safe usable percentage of rated capacity; often 50% for lead-acid, 80-100% for lithium</li>
            <li><strong>System efficiency</strong> — accounts for conversion and resistance losses reducing delivered energy</li>
            <li><strong>Backup time is inversely proportional to load</strong> — doubling load power halves runtime</li>
            <li>This calculator's inputs (voltage, capacity) are the same values a battery capacity calculator would output</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Battery Backup Time Calculator
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
                "Backup time in hours and formatted hours/minutes",
                "Total and effective (efficiency-adjusted) energy in Wh",
                "Current draw calculation",
                "Depth of discharge adjustment",
                "Full step-by-step derivation",
                "Six battery presets + eight load presets",
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
              title: "Small UPS Runtime Check",
              scenario: "A remote worker checking a small 12V, 7Ah UPS battery for a 30W router and modem load at 85% efficiency calculates a backup time of (12 × 7 × 0.85) ÷ 30 ≈ 2.38 hours — confirming their internet stays up through most typical outages.",
            },
            {
              title: "Home Inverter Backup Estimate",
              scenario: "A homeowner with a 12V, 100Ah battery at 85% efficiency running a 150W combined load (lights, fan, router) calculates a backup time of 6.8 hours — enough to cover a typical evening power outage before the battery needs recharging.",
            },
            {
              title: "Solar Battery Bank Overnight Check",
              scenario: "An off-grid solar user with a 24V, 200Ah battery bank at 90% efficiency running a 500W overnight load calculates backup time of (24 × 200 × 0.9) ÷ 500 = 8.64 hours — confirming the battery bank covers a full night's use before solar recharging resumes at daybreak.",
            },
            {
              title: "RV House Battery Trip Planning",
              scenario: "An RV owner with a 12V, 150Ah battery at 88% efficiency running a 200W average load calculates backup time of (12 × 150 × 0.88) ÷ 200 ≈ 7.92 hours — helping them decide whether to run a generator overnight or rely on the battery alone during a camping trip.",
            },
            {
              title: "Large Backup System for Heavy Loads",
              scenario: "A facility manager with a 48V, 200Ah backup system at 92% efficiency running a 1,000W critical load calculates backup time of (48 × 200 × 0.92) ÷ 1,000 = 8.83 hours — used to plan generator startup timing during extended outages.",
            },
            {
              title: "LED Lighting Backup Verification",
              scenario: "A homeowner with a 12V, 50Ah battery at 90% efficiency dedicated to 60W of LED emergency lighting calculates backup time of (12 × 50 × 0.9) ÷ 60 = 9 hours — confirming the lighting will last through an overnight outage.",
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
                "Set depth of discharge to 50% for lead-acid batteries rather than 100%, even though the calculator allows it — this reflects realistic safe usage and produces a more accurate, conservative backup time estimate.",
                "Add up every device you plan to run simultaneously into a single total load power figure rather than calculating each device separately — backup time is determined by the combined draw, not any single device.",
                "Re-run the calculation periodically with your battery's actual measured capacity, not just its original rated capacity — capacity degrades with age and cycle count, and using stale figures overstates real backup time.",
                "Use the built-in load presets as a sanity check when estimating an unfamiliar appliance's power draw — actual nameplate wattage can differ from assumptions, especially for compressor-based appliances like refrigerators.",
                "For critical backup applications, calculate backup time at your realistic worst-case load (not average load) to ensure the battery covers the scenario that actually matters during an outage.",
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
                "Assuming 100% depth of discharge is always safe. Lead-acid batteries discharged repeatedly below 50% suffer significantly shortened cycle life — the calculator lets you set any DoD, but the assumption you choose should match your battery chemistry's actual safe operating range.",
                "Ignoring system efficiency entirely and using the theoretical Wh figure directly. Real inverters and battery systems always have some loss — skipping this adjustment overstates backup time, sometimes significantly.",
                "Using nameplate or peak power instead of realistic average power for variable-draw appliances. A refrigerator's compressor cycles on and off, so its average power draw is meaningfully lower than its peak startup wattage.",
                "Forgetting that backup time scales inversely, not linearly in an intuitive direction, with load. Adding a second appliance that doubles total load power doesn't just 'use more battery' — it specifically halves the remaining backup time.",
                "Comparing backup time calculations across different battery ages without accounting for capacity fade. A three-year-old lead-acid battery may have lost 20-30% of its original rated Ah capacity, which this calculator doesn't automatically detect.",
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
          Common Appliance Load Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Appliance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Backup Time (100Ah, 12V, 85%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Router + modem", "30W", "34.0 hours"],
                ["LED lights (6 bulbs)", "60W", "17.0 hours"],
                ["Laptop", "65W", "15.7 hours"],
                ["Ceiling fan", "75W", "13.6 hours"],
                ["LED TV (40-50\")", "120W", "8.5 hours"],
                ["Small refrigerator", "150W", "6.8 hours"],
                ["Desktop PC + monitor", "200W", "5.1 hours"],
                ["1.5-ton air conditioner", "1,500W", "0.68 hours"],
              ].map(([app, power, time]) => (
                <tr key={app} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{app}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{power}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated for a fixed 12V, 100Ah battery at 85% efficiency, 100% depth of discharge — adjust for your specific battery and DoD assumption.</p>
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
          Who Uses This Battery Backup Time Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Estimate how long an existing UPS or inverter battery will power essential devices during a power outage." },
            { icon: "☀️", title: "Solar System Owners", desc: "Verify a solar battery bank covers overnight or cloudy-day loads before generation resumes." },
            { icon: "🚐", title: "RV & Camper Owners", desc: "Plan trips by checking how long house batteries will power appliances between charging opportunities." },
            { icon: "🏢", title: "Facility Managers", desc: "Verify backup system runtime for critical equipment ahead of planned or unplanned outages." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Check battery pack runtime for portable projects and equipment before deployment." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn how depth of discharge and efficiency affect real-world battery runtime calculations." },
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
