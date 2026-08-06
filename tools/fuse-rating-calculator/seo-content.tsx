export default function FuseRatingCalculatorSEO() {
  const faqItems = [
    { q: "What is a fuse rating calculator?", a: "A fuse rating calculator determines the correct fuse amperage for a circuit or appliance based on its power consumption, supply voltage, or measured current, plus a safety margin. It finds the smallest standard fuse size that safely carries the load's current without blowing during normal operation, while still opening the circuit if a genuine fault occurs." },
    { q: "How is fuse rating calculated?", a: "If you know the appliance's power and voltage, current is found with I = P / V. If you already know the current draw, that value is used directly. The calculator then multiplies this current by a safety factor — typically 1.25 — to get the adjusted current, and selects the nearest standard fuse rating at or above that adjusted value from the IEC list (0.5A, 1A, 1.5A, 2A, 3A, 5A, 6A, 10A, 13A, 15A, 16A, 20A, 25A, 32A, 40A, 50A, 63A, 80A, 100A, 125A, 160A, 200A)." },
    { q: "What safety factor should I use for fuse sizing?", a: "Use 1.25 (the standard, IEC-recommended default) for most resistive loads like heaters, lighting, and kitchen appliances — it adds a 25% margin that prevents nuisance blowing from minor voltage fluctuations. Use 1.5 or 1.6 for loads with inrush current, such as motors, compressors, and transformers, since their startup current briefly spikes well above the running current." },
    { q: "What is the difference between fast blow and slow blow fuses?", a: "A fast blow (F) fuse opens almost instantly once current exceeds its rating, making it suitable for resistive loads like lighting and heating elements where current is steady. A slow blow (T, time-delay) fuse tolerates brief current surges — 5 to 8 times its rating for a fraction of a second — before opening, which is required for motors, compressors, and transformers that draw high inrush current at startup." },
    { q: "Why did the calculator warn about a low safety margin?", a: "A low safety margin (under 10%) means the recommended fuse rating is very close to your adjusted current — for example, an 8.9A adjusted current selecting a 10A fuse leaves only 11% headroom. This increases the risk of nuisance blowing from normal load fluctuations. The calculator suggests moving to the next higher standard rating for more reliable operation." },
    { q: "Why did the calculator warn about a very high safety margin?", a: "A safety margin above 100% means the selected fuse is more than double your adjusted current — for example, a 2A load recommending a 5A fuse. This usually happens with very small loads, since standard fuse ratings jump in large steps at the low end. While not unsafe, verify your inputs since an oversized fuse provides less precise protection against overcurrent faults." },
    { q: "Should I round the fuse rating up or down?", a: "Always round up to the next available standard fuse rating after applying the safety factor — never round down. A fuse rated below the adjusted current will blow during normal operation, while rounding up to the nearest standard size preserves the safety margin the calculation was designed to provide." },
    { q: "Can I use this calculator for both AC and DC circuits?", a: "The current and safety-margin math is identical for AC and DC — I = P / V and the 1.25× factor apply either way. However, the physical fuse you install must be rated for the circuit type: DC fuses are built to extinguish the sustained arc that forms when DC current is interrupted, and a fuse rated only for AC use should never be substituted into a DC circuit such as a solar or battery system." },
    { q: "How does this differ from a circuit breaker calculator?", a: "Fuse sizing and circuit breaker sizing use the same underlying current and safety-factor logic, but fuses are single-use (they must be physically replaced after blowing) while breakers can be reset. Fuses also come in a finer range of small ratings (0.5A–3A) useful for electronics and appliances, whereas breakers are more common for whole-circuit protection in a panel. Use our Circuit Breaker Calculator if you're sizing a panel-mounted breaker instead of a plug or inline fuse." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, current, and fuse selections are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Choose an input mode", "Select Power + Voltage if you know the appliance's wattage and supply voltage, or Direct Current if you already have a measured or nameplate current value. The calculator computes current as I = P ÷ V automatically when you use the power and voltage mode."],
    ["Enter your circuit values", "In Power + Voltage mode, type the wattage in watts and the supply voltage. In Direct Current mode, type the current in amperes directly. Use the built-in appliance presets — microwave, kettle, air conditioner, and more — to auto-fill common values."],
    ["Select a safety factor", "Choose 1.25 for standard resistive loads (the recommended default), 1.5 for occasional surge loads, or 1.6 for motors and other high-inrush equipment. This factor is applied to your calculated current before a fuse size is selected."],
    ["Choose fast blow or slow blow", "Select Fast Blow for lighting, heating elements, and general electronics with steady current draw. Select Slow Blow for motors, compressors, and transformers that need to tolerate a brief startup current surge without nuisance blowing."],
    ["Read the recommended fuse rating", "The calculator returns the nearest standard fuse rating at or above your adjusted current, the safety margin percentage, and the next higher standard size as a backup option. A warning appears if the margin is unusually low or high."],
    ["Save or export the result", "Copy the recommended rating to your clipboard, save the calculation to your local history for later reference, or export a full text report showing every calculation step for documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Fuse Rating Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>fuse rating calculator</strong> is a free tool that determines the correct fuse amperage for
            an appliance or circuit from its power and voltage, or directly from a known current value. It answers
            the question every electrician, technician, and hobbyist eventually faces: <em>what fuse do I need for
            this circuit?</em>
          </p>
          <p>
            Fuse selection is a balance, not a guess. Too small, and the fuse blows during ordinary operation —
            nuisance tripping that wastes time and fuses. Too large, and it fails to protect the wiring and
            appliance from a genuine overcurrent fault, risking overheating, insulation damage, and fire. The
            correct rating accounts for the actual operating current, a safety margin to absorb normal fluctuations,
            and rounding to the nearest available standard fuse size.
          </p>
          <p>
            This <strong>fuse size calculator</strong> is built for <strong>licensed electricians selecting
            replacement fuses, panel builders speccing protection devices, electronics hobbyists sizing inline
            fuses for projects, industrial maintenance technicians servicing motor circuits, and homeowners
            replacing a blown fuse correctly</strong>. It supports both fast blow and slow blow fuse types, four
            standard safety factor presets, and instant results. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Fuse Rating Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">I</span> = P ÷ V <span className="text-gray-400">(power/voltage mode only)</span></p>
              <p><span className="font-semibold">Adjusted Current</span> = I × Safety Factor</p>
              <p><span className="font-semibold">Recommended Fuse</span> = nearest standard rating ≥ Adjusted Current</p>
              <p className="text-gray-500 text-xs mt-2">I = current (A) · P = power (W) · V = voltage (V)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Two input modes:</strong> enter power and voltage for the calculator to derive current, or enter a measured/nameplate current directly</li>
            <li><strong>Safety factor:</strong> 1.0 (no margin), 1.25 (standard — recommended for most loads), 1.5 (high safety), or 1.6 (very high, for motors and inrush loads)</li>
            <li><strong>Standard fuse ladder:</strong> the calculator only recommends from real, purchasable IEC ratings — 0.5A up through 200A — never an arbitrary in-between value</li>
            <li><strong>Safety margin:</strong> the percentage headroom between the recommended fuse and your adjusted current; the calculator flags margins under 10% (too tight) or over 100% (unusually loose)</li>
            <li><strong>Fuse type:</strong> fast blow for steady resistive loads, slow blow for loads with startup current surges</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fuse Rating Calculator
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
                "Recommended fuse rating from the standard IEC ladder",
                "Calculated and safety-factor-adjusted current",
                "Safety margin percentage with over/under warnings",
                "Next-size-up alternative rating",
                "Power/voltage and direct current input modes",
                "Fast blow and slow blow type selection",
                "8 built-in common appliance presets",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "Copy result to clipboard",
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
              title: "Microwave Oven Repair",
              scenario: "An appliance repair technician is replacing the internal fuse on a 1000W microwave rated at 220V. Using Power + Voltage mode with 1000W and 220V, the calculator computes 4.55A, applies the standard 1.25 factor for 5.68A adjusted, and recommends a 6A fast blow fuse — a 5.6% safety margin, matching the original factory fuse.",
            },
            {
              title: "Electric Kettle Circuit",
              scenario: "A homeowner's 1500W, 220V kettle keeps blowing its plug fuse. Entering 1500W and 220V gives 6.82A, adjusted to 8.52A at the standard 1.25 factor, which recommends a 10A fast blow fuse — replacing the incorrectly installed 6A fuse that was undersized for the load.",
            },
            {
              title: "LED Strip Electronics Project",
              scenario: "A hobbyist is adding an inline fuse to a 10W LED strip driver running at 220V. Current works out to just 0.045A; at the 1.25 safety factor that's 0.057A adjusted, so the calculator recommends the smallest standard rating — a 0.5A fast blow fuse — appropriately protecting the low-current electronics without oversizing.",
            },
            {
              title: "Conveyor Motor Protection",
              scenario: "An industrial maintenance engineer is fusing a small conveyor motor with a nameplate full-load current of 10A. Using Direct Current mode with 10A and the 1.6 safety factor for motor inrush, the adjusted current is 16A, and the calculator recommends a 16A slow blow fuse to survive the startup surge without nuisance blowing.",
            },
            {
              title: "US 15A Outlet Circuit",
              scenario: "An electrician is verifying fuse protection for a US branch circuit with a 15A nameplate rating. Entering 15A directly with the standard 1.25 factor gives 18.75A adjusted, and the calculator recommends a 20A fast blow fuse — consistent with standard US branch circuit practice for a 15A-rated load.",
            },
            {
              title: "UK Appliance Plug Fuse",
              scenario: "A UK electrician is selecting a BS1362 plug fuse for a 13A-rated appliance. Entering 13A directly with a 1.0 safety factor (no added margin, matching UK plug-fuse convention) returns exactly 13A — the standard fuse rating fitted in UK appliance plugs for loads at this current.",
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
                "Use the 1.6 safety factor for anything with a motor, compressor, or transformer. Inrush current on startup can briefly spike to 5–8 times the running current, and a fuse sized only for steady-state current will blow the instant the equipment is switched on.",
                "If you already know the appliance's nameplate current, use Direct Current mode instead of calculating power and voltage manually. Nameplate FLA (full-load amps) is more accurate than a wattage-based estimate, since real-world efficiency and power factor affect actual current draw.",
                "Always match the fuse's voltage rating to the circuit, not just its amperage. A fuse rated for 32V DC installed in a 230V AC circuit may fail to safely interrupt the arc during a fault, even if the amperage rating looks correct.",
                "When a fuse blows repeatedly at the recommended rating, don't just size up — investigate for a short circuit, ground fault, or failing component first. Repeated blowing at a correctly calculated rating is a symptom of a fault, not proof the fuse is undersized.",
                "For DC systems like solar arrays and battery banks, use fuses specifically rated for DC interruption. AC fuses are not designed to extinguish the sustained arc that forms when DC current is broken, and substituting one is a genuine fire risk.",
                "Keep a couple of the next-size-up fuse on hand as a backup, but never install it as a permanent fix. The calculator's next-higher-fuse figure is there for reference and temporary bridging only — always fit the specifically recommended rating for daily use.",
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
                "Don't round the calculated rating down to the nearest standard size. Rounding down defeats the safety margin entirely — always round up, even if the calculated value is only slightly above a lower standard rating.",
                "Don't use a fast blow fuse on a motor or compressor circuit. The startup inrush current will trip it almost every time the equipment starts, even though the fuse rating is technically adequate for steady-state operation.",
                "Don't ignore a low safety margin warning. A margin under 10% means normal voltage fluctuations or slightly higher-than-expected load can push the circuit over the fuse rating, causing frequent nuisance blowing that's easy to mistake for a fault.",
                "Don't substitute a higher-amperage fuse just because the correct size isn't in stock. An oversized fuse won't open in time during a real overcurrent event, allowing wiring to overheat well past the point the original design intended to protect against.",
                "Don't assume the fuse alone protects the wiring. The fuse rating must also be checked against the ampacity of the wire feeding the circuit — a fuse sized correctly for the appliance can still be too large for undersized wire. Cross-check with a wire size or circuit breaker calculator for the full circuit.",
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
          Standard Fuse Rating Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Rating (A)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Application</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Common Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0.5A – 1A", "LED indicators, low-power electronics, control circuits", "Fast blow"],
                ["1.5A – 3A", "Small electronics, chargers, LED drivers", "Fast blow"],
                ["5A – 6A", "Lighting circuits, small kitchen appliances, microwaves", "Fast blow"],
                ["10A – 13A", "General power outlets, kettles, UK/EU appliance plugs", "Fast blow"],
                ["15A – 16A", "US branch circuits, heavy appliances, power tools", "Fast blow"],
                ["20A – 25A", "Air conditioners, dedicated appliance circuits", "Fast blow"],
                ["32A – 40A", "Water heaters, small motors, sub-circuit feeders", "Slow blow (motors)"],
                ["50A – 63A", "Electric ranges, large motors, workshop feeders", "Slow blow (motors)"],
                ["80A – 100A", "Sub-panel feeders, large compressors, welding equipment", "Slow blow"],
                ["125A – 200A", "Service entrance protection, industrial feeders", "Slow blow"],
              ].map(([rating, use, type]) => (
                <tr key={rating} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{rating}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{use}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Applications are typical, not exhaustive. Always verify the fuse rating against the specific appliance nameplate or circuit design current using the calculator above.</p>
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
          Who Uses This Fuse Rating Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Verify or select replacement fuse ratings on service calls, cross-checking appliance nameplate values against the standard fuse ladder before installation." },
            { icon: "🏗️", title: "Panel Builders", desc: "Spec fuse protection devices for control panels and distribution boards, applying the correct safety factor for resistive versus motor-driven circuits." },
            { icon: "🔧", title: "Industrial Maintenance Technicians", desc: "Size slow blow fuses for motors, compressors, and conveyor equipment where startup inrush current must be tolerated without nuisance blowing." },
            { icon: "💡", title: "Electronics Hobbyists", desc: "Add correctly sized inline fuses to DIY projects, from LED strips to battery-powered builds, protecting low-current circuits without overprotecting them." },
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Replace a blown appliance or plug fuse with the correct rating instead of guessing, avoiding both nuisance blowing and under-protected wiring." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Work through fuse sizing exercises, verify textbook safety factor examples, and build intuition for how current, power, and voltage relate in circuit protection." },
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
