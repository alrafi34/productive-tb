export default function VoltageDropCalculatorSEO() {
  const faqItems = [
    { q: "What is a voltage drop calculator?", a: "A voltage drop calculator determines how much supply voltage is lost across a cable run due to conductor resistance, based on current, cable length, wire size, material, and operating temperature. It reports the voltage lost, the percentage of supply voltage that represents, the final voltage delivered to the load, and the power dissipated as heat in the conductor." },
    { q: "How is voltage drop calculated?", a: "For single-phase and DC circuits, VD = 2 × I × R × L. For three-phase circuits, VD = √3 × I × R × L, where I is current in amperes, R is conductor resistance in ohms per meter, and L is the one-way cable length in meters. This calculator derives R from the wire's cross-sectional area and material, then adjusts it for the operating temperature you enter before running the formula." },
    { q: "What is an acceptable voltage drop percentage?", a: "This calculator treats under 3% as good, 3–5% as acceptable but worth optimizing, and over 5% as too high. These align with common NEC and IEC guidance: 3% for branch circuits, 2% for feeders, and a combined maximum of 5% from service entrance to the farthest outlet. Sensitive electronics and precision equipment often need a stricter 1–2% limit." },
    { q: "Why does temperature affect voltage drop?", a: "Conductor resistance rises with temperature — this calculator applies copper's temperature coefficient of approximately 0.393% per °C above the 20°C reference point. A cable operating hot, whether from ambient heat or its own current load, has measurably higher resistance and therefore a larger voltage drop than the same cable at 20°C, which is why the temperature input matters for accurate results." },
    { q: "Why is voltage drop worse on low-voltage DC systems?", a: "Voltage drop in volts depends only on current, resistance, and length — not on system voltage. But the percentage drop is the volts lost divided by the supply voltage, so the same 1.2V drop that's negligible on a 230V AC circuit is over 10% on a 12V DC solar or battery system. Low-voltage DC runs need proportionally much larger wire to keep the percentage drop acceptable." },
    { q: "Should I enter one-way or round-trip cable length?", a: "Enter the one-way distance from the source to the load — for example, from a breaker panel to an outlet, or from a battery to a DC load. The formula already accounts for the return conductor: the factor of 2 in the single-phase/DC formula and the √3 factor in the three-phase formula both build in the round-trip path, so doubling the length yourself will overstate the drop." },
    { q: "Why does three-phase have lower voltage drop than single-phase?", a: "The three-phase formula uses a √3 (≈1.732) multiplier instead of the 2× multiplier used for single-phase and DC. For the same current, length, and wire size, three-phase voltage drop in volts is about 13.4% lower than single-phase, which is one reason industrial and commercial installations favor three-phase distribution for long runs to heavy loads." },
    { q: "How much does switching from aluminum to copper reduce voltage drop?", a: "This calculator applies aluminum resistance as approximately 1.63 times copper resistance for the same wire size, so switching an identical-size run from aluminum to copper cuts the resistance — and therefore the voltage drop in volts — by roughly 39%. Aluminum remains popular for large feeders because of its lower cost and weight, but it needs a larger cross-section to match copper's voltage drop performance." },
    { q: "What should I do if my voltage drop is too high?", a: "The calculator's suggestion field recommends the next larger standard wire size when your result exceeds 3%. If a larger wire isn't practical, other options include shortening the cable run, switching from single-phase to three-phase where equipment allows, increasing the supply voltage, or running multiple conductors in parallel to reduce total resistance." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, cable length, and wire selections are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Select your system type", "Choose Single Phase, Three Phase, or DC to match your electrical supply. This determines whether the calculator applies the 2× multiplier (single-phase/DC) or the √3 multiplier (three-phase) in the voltage drop formula."],
    ["Enter supply voltage and current", "Type your system voltage and the load current in amperes. For low-voltage DC systems like 12V or 24V solar setups, small voltage drops represent a much larger percentage of the total supply than the same drop on a 230V circuit."],
    ["Enter the cable length", "Enter the one-way distance from the power source to the load in meters. The formula already accounts for the return conductor — do not double the distance manually."],
    ["Choose wire size and material", "Select the conductor cross-section in mm² and choose copper or aluminum. Aluminum has roughly 1.63 times the resistance of copper for the same size, so it produces a larger voltage drop unless upsized."],
    ["Set the operating temperature", "Enter the expected conductor temperature. The calculator adjusts resistance using copper's temperature coefficient — a cable running hot has measurably more resistance than one at the 20°C reference point."],
    ["Read the result and status", "The calculator returns the voltage drop in volts and as a percentage, the final voltage at the load, power loss in watts, and a status of Good, Acceptable, or Too High with a wire-size suggestion when the drop exceeds recommended limits."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Voltage Drop Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>voltage drop calculator</strong> is a free electrical tool that determines how much supply
            voltage is lost across a cable run based on current, cable length, wire size, conductor material, and
            operating temperature. It answers a question every electrician and system designer eventually needs
            resolved: <em>how much voltage will actually reach the load at the far end of this cable?</em>
          </p>
          <p>
            Every real conductor has resistance, and current flowing through that resistance turns some of the
            supplied energy into heat instead of delivering it to the load. On short runs at standard voltages this
            loss is negligible. On long runs, high-current circuits, or low-voltage DC systems, it can be severe
            enough to dim lights, stall motors, starve chargers of current, or waste meaningful power as heat in the
            wire itself — which is why calculating it precisely, rather than guessing, matters.
          </p>
          <p>
            This <strong>voltage loss calculator</strong> is built for <strong>licensed electricians verifying
            branch circuit and feeder runs, electrical engineers designing power distribution, solar and battery
            system installers sizing low-voltage DC cabling, and homeowners or DIYers planning long outdoor or
            workshop runs</strong>. It supports single-phase, three-phase, and DC systems in both copper and
            aluminum. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Voltage Drop Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">VD (single-phase / DC)</span> = 2 × I × R × L</p>
              <p><span className="font-semibold">VD (three-phase)</span> = √3 × I × R × L</p>
              <p><span className="font-semibold">VD%</span> = (VD ÷ V<sub>supply</sub>) × 100</p>
              <p className="text-gray-500 text-xs mt-2">I = current (A) · R = resistance per meter (Ω/m) · L = one-way length (m) · V = supply voltage</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Resistance lookup:</strong> the calculator starts from a copper resistance table (Ω/km at 20°C) for each standard wire size from 1.5 mm² to 120 mm²</li>
            <li><strong>Material adjustment:</strong> aluminum resistance is calculated as copper resistance × 1.63, reflecting aluminum's lower conductivity</li>
            <li><strong>Temperature adjustment:</strong> resistance is scaled from the 20°C reference using copper's temperature coefficient of 0.00393 per °C, so hotter cables show higher drop</li>
            <li><strong>Final voltage &amp; power loss:</strong> final voltage = supply voltage − voltage drop, and power loss = current × voltage drop, showing the wasted energy in watts</li>
            <li><strong>Status thresholds:</strong> under 3% is flagged Good, 3–5% Acceptable with an optimization note, over 5% Too High with a suggested larger wire size</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Voltage Drop Calculator
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
                "Voltage drop in volts and as a percentage",
                "Final voltage delivered at the load",
                "Power loss in watts along the cable run",
                "Total conductor resistance in milliohms",
                "Good / Acceptable / Too High status with color coding",
                "Wire-size upgrade suggestion when drop is excessive",
                "Single-phase, three-phase, and DC support",
                "Copper and aluminum conductor options",
                "Temperature-adjusted resistance calculation",
                "6 built-in common configuration presets",
                "Calculation history (last 20 entries)",
                "Export results as text report",
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
              title: "Home Lighting Circuit Check",
              scenario: "An electrician is verifying a 230V single-phase lighting circuit carrying 10A over a 20m run of 2.5mm² copper wire. The calculator returns a 2.96V drop, 1.29% of supply — well within the 3% limit, status Good, with 227.04V reaching the fixtures.",
            },
            {
              title: "Long Power Outlet Run",
              scenario: "A homeowner is adding a 230V, 16A outlet 25m from the panel using 2.5mm² copper. The calculator shows a 5.93V drop at 2.58% — still Good, but close enough to the 3% threshold that the tool's status panel flags it for awareness on any longer extension of the same run.",
            },
            {
              title: "Three-Phase Motor Feed",
              scenario: "An electrician is checking a 400V three-phase motor circuit at 25A over 50m of 6mm² copper. Using the √3 formula, voltage drop comes to 6.67V, just 1.67% of supply — comfortably Good, illustrating how three-phase keeps percentage drop low even on long industrial runs.",
            },
            {
              title: "12V Solar Battery Bank",
              scenario: "A solar installer is running 20A DC from a battery bank to a 12V inverter over just 10m of 6mm² copper. Even at this short distance, the low 12V supply produces a 1.23V drop that works out to 10.27% — status Too High — demonstrating why low-voltage DC runs need dramatically larger wire than the equivalent AC circuit.",
            },
            {
              title: "24V Solar Panel Extension",
              scenario: "A different installer runs a 24V DC array at 30A over 15m using 16mm² copper. The larger wire and higher supply voltage bring the drop to 1.04V — 4.31% of supply, landing in the Acceptable range rather than Too High, which is what the calculator's suggestion field is guiding toward on the smaller-gauge 12V example above.",
            },
            {
              title: "Aluminum Feeder Comparison",
              scenario: "A contractor compares a 230V, 20A, 30m run in both materials at 4mm². Copper returns a 5.53V drop at 2.41% (Good); switching the same size to aluminum increases resistance by 63%, pushing the same run to 9.02V at 3.92% (Acceptable) — showing why aluminum feeders are typically sized one or two steps larger than copper for equivalent performance.",
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
                "Always check voltage drop separately from breaker or fuse sizing on any run longer than about 15 meters. A circuit can have perfectly adequate ampacity for the load current while still losing too much voltage over distance — the two checks protect against different failure modes.",
                "For low-voltage DC systems — 12V or 24V solar, battery, or automotive circuits — use a stricter 1–2% target instead of the standard 3–5%. Because percentage drop is volts lost divided by supply voltage, the same absolute drop that's trivial at 230V can be 10% or more at 12V.",
                "Enter the actual operating temperature, not just the ambient temperature, for cables carrying heavy sustained current. Conductor temperature under load can run well above ambient, and the resistance increase compounds the voltage drop beyond what a 20°C-only calculation would show.",
                "When a run comes back Acceptable rather than Good, treat that as a signal to check the next-larger wire size before committing to installation — the material cost difference on most residential runs is small relative to the labor cost of correcting it later.",
                "Remember the length you enter is one-way. Entering the round-trip distance by mistake will double-count the return conductor that the formula's 2× or √3 multiplier already includes, roughly doubling your calculated voltage drop and leading to an unnecessarily oversized wire choice.",
                "For three-phase motor feeds, compare the same load run as single-phase before finalizing wire size. The √3 multiplier versus the 2× multiplier for single-phase means three-phase distribution meaningfully reduces both voltage drop and required conductor size over long distances.",
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
                "Don't size wire for ampacity alone and skip the voltage drop check. A conductor can be rated to carry the load current safely from a heating standpoint while still delivering unacceptably low voltage to the load at the end of a long run.",
                "Don't assume aluminum and copper of the same mm² size perform equally. Aluminum's resistance is approximately 1.63 times copper's, so an aluminum run sized like a copper run will show a meaningfully larger voltage drop unless upsized to compensate.",
                "Don't forget that voltage drop percentage — not just the raw volts lost — is what determines whether a run is acceptable. A 2V drop sounds identical on a 230V circuit and a 12V circuit, but one is under 1% and the other is over 16%.",
                "Don't use the 20°C resistance values without adjusting for operating temperature on heavily loaded or high-ambient-temperature runs. A cable that runs hot has real, measurable additional resistance that a room-temperature-only calculation misses.",
                "Don't ignore an Acceptable (3–5%) result just because it isn't flagged as Too High. It's a valid range, but it represents real wasted power as heat in the conductor — for circuits running long hours, the energy cost of that loss can outweigh the wire upgrade cost over the equipment's lifetime.",
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
          Voltage Drop Reference — Limits &amp; Resistance Values
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acceptable Voltage Drop by Application</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Application</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Maximum Drop</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Calculator Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Branch circuits (lighting, outlets)", "3%", "Good"],
                    ["Feeder circuits (panel to sub-panel)", "2%", "Good"],
                    ["Combined feeder + branch total", "5%", "Acceptable (upper limit)"],
                    ["Sensitive electronics / precision equipment", "1–2%", "Good"],
                    ["Low-voltage DC (12V/24V solar, battery)", "1–3%", "Good to Acceptable"],
                    ["General power circuits (non-critical)", "5%", "Acceptable"],
                  ].map(([app, max, status]) => (
                    <tr key={app} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 text-gray-700 text-xs">{app}</td>
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{max}</td>
                      <td className="py-1.5 px-3 text-gray-600 text-xs">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Copper vs Aluminum Resistance (Ω/km at 20°C)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Wire Size</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Copper (Ω/km)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Aluminum (Ω/km)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1.5 mm²", "12.1", "19.7"],
                    ["2.5 mm²", "7.41", "12.1"],
                    ["4 mm²", "4.61", "7.51"],
                    ["6 mm²", "3.08", "5.02"],
                    ["10 mm²", "1.83", "2.98"],
                    ["16 mm²", "1.15", "1.87"],
                    ["25 mm²", "0.727", "1.19"],
                    ["35 mm²", "0.524", "0.854"],
                  ].map(([size, cu, al]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{size}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{cu}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{al}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Resistance values at 20°C reference temperature. This calculator adjusts resistance upward automatically for higher operating temperatures using copper's 0.393%/°C coefficient.</p>
          </div>
        </div>
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
          Who Uses This Voltage Drop Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Verify that branch circuits and feeders stay within NEC or IEC voltage drop limits before pulling wire on long commercial or residential runs." },
            { icon: "🏗️", title: "Electrical Engineers", desc: "Model power distribution losses during building design, confirm conductor sizing for motor and lighting circuits, and document compliance during design review." },
            { icon: "☀️", title: "Solar & Battery Installers", desc: "Size low-voltage DC cabling between panels, batteries, and inverters, where a small absolute drop represents a much larger percentage of the low system voltage." },
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Check whether a long extension circuit — a detached garage, workshop, or outdoor lighting run — needs a larger wire before starting permitted electrical work." },
            { icon: "🔧", title: "Maintenance Technicians", desc: "Diagnose dimming lights, underperforming motors, or slow EV charging by checking whether excessive voltage drop on an existing run is the root cause." },
            { icon: "🎓", title: "Electrical Students", desc: "Work through single-phase, three-phase, and DC voltage drop exercises, verify textbook examples, and build intuition for how length and wire size interact." },
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
