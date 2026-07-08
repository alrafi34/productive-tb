export default function ElectricMotorPowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an electric motor power calculator?",
      a: "An electric motor power calculator is a free online tool that computes motor power output, input power, efficiency, current draw, torque, and related electrical quantities from a set of known motor parameters. Enter any combination of horsepower, kilowatts, voltage, current, efficiency, and power factor, and the calculator derives the remaining values. It is used by electrical engineers, HVAC technicians, industrial maintenance teams, and students working with AC and DC motor circuits.",
    },
    {
      q: "What is the formula for electric motor power?",
      a: "For a three-phase AC motor: Output Power (kW) = √3 × Voltage (V) × Current (A) × Power Factor × Efficiency ÷ 1000. For a single-phase AC motor: Output Power (kW) = Voltage (V) × Current (A) × Power Factor × Efficiency ÷ 1000. For shaft power from torque and speed: Power (kW) = Torque (N·m) × Speed (RPM) × 2π ÷ 60,000. The most common simplified form for quick estimates is: Input Power (kW) = Output Power (kW) ÷ Efficiency.",
    },
    {
      q: "How do I convert motor horsepower to kW?",
      a: "1 horsepower (HP) = 0.7457 kilowatts (kW). To convert HP to kW, multiply by 0.7457. To convert kW to HP, divide by 0.7457. Examples: 5 HP = 3.73 kW; 10 HP = 7.46 kW; 15 HP = 11.19 kW; 20 HP = 14.91 kW; 50 HP = 37.28 kW. Note that nameplate HP is shaft output power — the electrical input power is always higher due to motor efficiency losses, typically 85–95%.",
    },
    {
      q: "How do I calculate motor current from kW?",
      a: "For a three-phase motor: Current (A) = Power (kW) × 1000 ÷ (√3 × Voltage × Power Factor × Efficiency). For a single-phase motor: Current (A) = Power (kW) × 1000 ÷ (Voltage × Power Factor × Efficiency). Example: a 7.5 kW three-phase motor at 415V, power factor 0.85, efficiency 90%: Current = 7,500 ÷ (1.732 × 415 × 0.85 × 0.90) = 7,500 ÷ 547.6 = 13.7A. This is the full-load current used for cable sizing and protection device selection.",
    },
    {
      q: "What is motor efficiency and how does it affect power consumption?",
      a: "Motor efficiency is the ratio of shaft output power to electrical input power, expressed as a percentage. A motor rated at 90% efficiency converts 90% of consumed electricity into mechanical work and loses 10% as heat. Input Power = Output Power ÷ Efficiency. A 10 kW motor at 90% efficiency consumes 10 ÷ 0.90 = 11.11 kW. At 85% efficiency, the same motor consumes 11.76 kW — 0.65 kW more for the same output. Over 8,000 hours/year, that difference costs approximately $624 at $0.12/kWh.",
    },
    {
      q: "What is power factor in an electric motor?",
      a: "Power factor (PF) is the ratio of real power (kW) to apparent power (kVA) in an AC circuit. For electric motors, power factor typically ranges from 0.75 to 0.95 at full load, and drops significantly at partial loads — sometimes below 0.5 for lightly loaded induction motors. A low power factor means the motor draws more current from the supply than its actual work output justifies, increasing conductor sizing requirements and utility charges. Most standard induction motors have a rated full-load power factor of 0.80–0.90.",
    },
    {
      q: "How do I calculate motor torque from power and speed?",
      a: "Torque (N·m) = Power (W) × 60 ÷ (2π × Speed in RPM). Or equivalently: Torque (N·m) = Power (kW) × 9,549 ÷ RPM. Example: a 5 kW motor running at 1,450 RPM produces: 5,000 × 60 ÷ (2π × 1,450) = 300,000 ÷ 9,111 = 32.9 N·m. In imperial units: Torque (lb·ft) = HP × 5,252 ÷ RPM.",
    },
    {
      q: "What is the difference between kW and kVA for motors?",
      a: "kW (kilowatts) is real power — the actual work done. kVA (kilovolt-amperes) is apparent power — the total power drawn from the supply including reactive component. They are related by power factor: kW = kVA × Power Factor. For a motor rated 10 kW at power factor 0.85, the apparent power is 10 ÷ 0.85 = 11.76 kVA. Generator and transformer sizing must use kVA, not kW, because the apparent power determines the actual current the supply system must deliver.",
    },
    {
      q: "How do I size a motor for an application?",
      a: "Determine the required shaft output power from the mechanical load: Power (kW) = Force (N) × Velocity (m/s) for linear loads, or Power (kW) = Torque (N·m) × Speed (RPM) ÷ 9,549 for rotary loads. Add a service factor of 1.15–1.25 for intermittent peaks. Then select the next standard motor rating above the calculated requirement. Common standard ratings (kW): 0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your motor specifications, voltage values, and electrical parameters are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select motor type and phase", "Choose single-phase or three-phase AC motor, or DC motor. This determines which formula set is used for current and power calculations."],
    ["Enter known motor parameters", "Input any combination of values you know from the motor nameplate or datasheet: rated power (HP or kW), supply voltage, rated current, efficiency (%), and power factor. You can enter as few as two values and the calculator derives the rest."],
    ["Read all calculated outputs", "The results panel shows output power (kW and HP), input power, current draw at full load, torque at rated speed, apparent power (kVA), and monthly energy consumption based on operating hours."],
    ["Use the torque calculator tab", "Switch to the torque tab to calculate shaft torque from power and speed (RPM), or calculate required power from a known torque and speed requirement."],
    ["Check the efficiency comparison", "Enter two motors with different efficiency ratings to see the annual energy cost difference at a given load profile — useful for justifying IE3 or IE4 premium efficiency motor selection."],
    ["Export the motor data sheet", "Download a summary of all calculated values as a text file for use in panel schedules, motor control center (MCC) documentation, or client specifications."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Electric Motor Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>electric motor power calculator</strong> is a free online tool that derives all key
            motor electrical quantities from a set of known nameplate values. Enter motor rated power in
            <strong> kW or HP</strong>, supply voltage, power factor, and efficiency — and the calculator
            returns full-load current, shaft torque, input power, apparent power in kVA, and monthly energy
            consumption. It works for single-phase and three-phase AC motors and DC motors.
          </p>
          <p>
            The core challenge with <strong>motor power calculation</strong> is that motors have four
            interrelated quantities — mechanical output, electrical input, current, and torque — and knowing
            any two lets you derive the others, but only if you apply the right formula for the motor phase
            and units. Converting HP to kW, calculating three-phase current from kW, or finding torque from
            power and speed all use different constants and are easy to get wrong by factor-of-√3 or
            unit-conversion errors. This tool handles all of it correctly for any combination of known inputs.
          </p>
          <p>
            Built for <strong>electrical engineers designing motor control circuits, HVAC and industrial
            maintenance technicians, panel builders sizing cables and overloads, students learning motor
            theory, and procurement teams comparing motor specifications</strong>. Supports kW, HP, BTU,
            volts, amps, RPM, N·m, and lb·ft. Browser-based, free, no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Motor Power Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">3-Phase Current (A)</span> = kW × 1000 ÷ (√3 × V × PF × η)</p>
              <p><span className="font-semibold">1-Phase Current (A)</span> = kW × 1000 ÷ (V × PF × η)</p>
              <p><span className="font-semibold">Input Power (kW)</span> = Output kW ÷ Efficiency</p>
              <p><span className="font-semibold">Torque (N·m)</span> = kW × 9,549 ÷ RPM</p>
              <p><span className="font-semibold">Apparent Power (kVA)</span> = kW ÷ Power Factor</p>
              <p><span className="font-semibold">HP to kW</span> = HP × 0.7457</p>
              <p className="text-gray-500 text-xs mt-2">Example: 7.5 kW motor, 415V 3-phase, PF 0.85, η 90%</p>
              <p className="text-gray-500 text-xs">Current = 7,500 ÷ (1.732 × 415 × 0.85 × 0.90) = <span className="text-green-600 font-semibold">13.7A</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>η (eta)</strong> — motor efficiency as a decimal (e.g. 90% = 0.90)</li>
            <li><strong>PF</strong> — power factor, typically 0.75–0.95 at full load for induction motors</li>
            <li><strong>√3 = 1.7321</strong> — three-phase constant; omit for single-phase calculations</li>
            <li><strong>9,549</strong> — constant = 60,000 ÷ (2π × 1,000) for torque in N·m from kW and RPM</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Electric Motor Power Calculator
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
                "Output power in kW and HP",
                "Input electrical power (kW)",
                "Full-load current (amps)",
                "Shaft torque (N·m and lb·ft)",
                "Apparent power (kVA)",
                "Power factor and efficiency cross-calculation",
                "Monthly energy consumption (kWh)",
                "HP ↔ kW ↔ BTU/h conversion",
                "Three-phase and single-phase support",
                "Torque from power and RPM",
                "Efficiency comparison mode",
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
              title: "Cable Sizing for a Pump Motor",
              scenario: "An electrician is wiring a 15 kW three-phase pump motor at 415V, power factor 0.85, efficiency 92%. They enter these values and the calculator returns full-load current: 15,000 ÷ (1.732 × 415 × 0.85 × 0.92) = 26.7A. For cable sizing, they apply the 1.25× continuous load factor: 26.7 × 1.25 = 33.4A. They select 6mm² cable rated for 36A and specify a 32A overload relay in the motor starter.",
            },
            {
              title: "Premium Efficiency Motor Justification",
              scenario: "A plant engineer is replacing a failed 22 kW IE2 motor (efficiency 91.4%) with either another IE2 or an IE3 (efficiency 93.6%). The motor runs 6,000 hours/year at $0.10/kWh. IE2 input: 22 ÷ 0.914 = 24.07 kW; annual cost: 24.07 × 6,000 × 0.10 = $14,442. IE3 input: 22 ÷ 0.936 = 23.50 kW; annual cost: $14,102. Annual saving: $340. IE3 costs $280 more upfront — payback in under 10 months. Engineer specifies IE3.",
            },
            {
              title: "Generator Sizing for a Conveyor System",
              scenario: "A site engineer needs a portable generator for a 7.5 kW three-phase conveyor motor and a 2.2 kW single-phase compressor. Motor full-load input at 90% efficiency: 7.5 ÷ 0.90 = 8.33 kW. Compressor: 2.2 ÷ 0.88 = 2.5 kW. Total running: 10.83 kW. Motor startup surge (DOL): 6–7× FLC for 0.5 seconds — the generator must handle a surge of approximately 50 kW for a fraction of a second. A 20 kVA generator with sufficient transient capability is specified.",
            },
            {
              title: "Torque Verification for a Gearbox Selection",
              scenario: "A mechanical engineer is selecting a gearbox for a 5.5 kW motor running at 1,450 RPM. Shaft torque: 5,500 × 9,549 ÷ 1,450 = 36.2 N·m. The gearbox has a gear ratio of 20:1, so output torque before losses: 36.2 × 20 = 724 N·m. Applying 95% gearbox efficiency: usable output torque = 724 × 0.95 = 687.8 N·m. The engineer selects a gearbox rated for ≥750 N·m continuous to provide a 9% safety margin.",
            },
            {
              title: "HVAC Fan Motor Current Check",
              scenario: "A maintenance technician is troubleshooting a tripping overload relay on a 3 HP (2.24 kW) single-phase 240V fan motor with a nameplate power factor of 0.88 and efficiency 85%. Calculated full-load current: 2,237 ÷ (240 × 0.88 × 0.85) = 12.5A. The existing overload relay is set to 11A — too low by 14%. The technician resets the relay to 13A (104% of FLC) per NEC allowances and the nuisance tripping stops.",
            },
            {
              title: "Energy Audit of Motor-Driven Systems",
              scenario: "A facility manager is auditing 12 conveyor motors (all 4 kW, IE2, 415V 3-phase, running 5,000 hours/year). Input power per motor at 90% efficiency: 4 ÷ 0.90 = 4.44 kW. Total annual consumption: 4.44 × 12 × 5,000 = 266,400 kWh × $0.11 = $29,304/year. Replacing all with IE3 motors (efficiency 92.6%): input power = 4.32 kW × 12 × 5,000 = 259,200 kWh × $0.11 = $28,512/year. Annual saving: $792. IE3 motor cost premium for 12 units: $1,200 — payback in 18 months.",
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
                "Always use nameplate current for protection device sizing, not calculated current. Nameplates reflect actual tested performance; calculated values use nominal efficiency and power factor that may differ from the specific unit. If nameplate FLA is 14.2A but calculated is 13.7A, size the overload relay to 14.2A.",
                "For DOL (direct-on-line) starters, size the cable and fuse for startup current, not running current. DOL startup current is typically 6–7× full-load current for induction motors. A motor with 14A FLC draws up to 98A for 2–5 seconds on startup — this sets the fuse size.",
                "Power factor drops sharply when motors run at partial load — a motor designed for 0.85 PF at full load may have 0.60–0.70 PF at 50% load. If your system typically runs motors at partial load, use the part-load PF from the datasheet rather than the nameplate value for accurate current calculations.",
                "Use the service factor when sizing for variable loads. A motor with a 1.15 service factor can deliver 15% more than its rated output for short periods. Size the motor at rated load, not at the service factor ceiling — the SF is an emergency reserve, not a design target.",
                "For energy cost calculations, run the motor at its designed load point. Motors are most efficient at 75–100% of rated load. Running a heavily oversized motor at 30–40% load reduces efficiency and power factor, increasing energy cost per unit of work done.",
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
                "Don't forget the √3 factor for three-phase calculations. A common error is using the single-phase formula (V × I × PF) for a three-phase motor — this underestimates power by a factor of 1.732. Three-phase power is always √3 × V × I × PF × η for input power and √3 × V × I × PF for apparent power.",
                "Don't use output power (shaft HP or kW) where input power (electrical kW) is needed. For cable and generator sizing, you need the electrical input — which is always higher than the shaft output. Input kW = Output kW ÷ Efficiency. A 10 kW motor at 90% efficiency needs 11.1 kW of electrical supply.",
                "Don't confuse kW and kVA. Generators, transformers, and UPS systems are rated in kVA. Cable sizing uses amps (from kVA ÷ voltage). Tariff charges use kW. Using kW where kVA is needed undersizes the supply equipment by a factor equal to 1/power factor.",
                "Don't use nominal voltage (415V) if the actual supply is 400V or 380V. Current is inversely proportional to voltage — if supply voltage is 5% low, current is 5% higher for the same load. In regions with poor power quality, use measured supply voltage for accurate current calculations.",
                "Don't apply the same efficiency value across the full load range. Motor efficiency peaks at approximately 75–100% of rated load and drops significantly at light loads. Using rated efficiency for a motor running at 30% load will underestimate energy consumption.",
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
          Motor Power Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>HP to kW &amp; Full-Load Current (415V, 3-Phase, PF 0.85, η 90%)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">HP</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">kW (output)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Input kW</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">FLC (A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1",  "0.75",  "0.83",  "1.5"],
                    ["2",  "1.49",  "1.66",  "3.0"],
                    ["3",  "2.24",  "2.49",  "4.6"],
                    ["5",  "3.73",  "4.14",  "7.6"],
                    ["7.5","5.59",  "6.21",  "11.4"],
                    ["10", "7.46",  "8.28",  "15.2"],
                    ["15", "11.19", "12.43", "22.8"],
                    ["20", "14.91", "16.57", "30.4"],
                    ["25", "18.64", "20.71", "38.0"],
                    ["30", "22.37", "24.86", "45.6"],
                    ["50", "37.28", "41.43", "76.1"],
                  ].map(([hp, kw, inp, flc]) => (
                    <tr key={hp} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{hp} HP</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{kw} kW</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{inp} kW</td>
                      <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{flc} A</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Torque at Common Motor Speeds</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Power</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">750 RPM</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">1,450 RPM</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">2,900 RPM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.75 kW", "9.5 N·m",  "4.9 N·m",  "2.5 N·m"],
                    ["1.5 kW",  "19.1 N·m", "9.9 N·m",  "4.9 N·m"],
                    ["3 kW",    "38.2 N·m", "19.7 N·m", "9.9 N·m"],
                    ["5.5 kW",  "70.1 N·m", "36.2 N·m", "18.1 N·m"],
                    ["7.5 kW",  "95.5 N·m", "49.4 N·m", "24.7 N·m"],
                    ["11 kW",   "140 N·m",  "72.4 N·m", "36.2 N·m"],
                    ["15 kW",   "191 N·m",  "98.7 N·m", "49.4 N·m"],
                    ["22 kW",   "280 N·m",  "145 N·m",  "72.5 N·m"],
                  ].map(([p, r750, r1450, r2900]) => (
                    <tr key={p} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{p}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{r750}</td>
                      <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{r1450}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{r2900}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* Torque = kW × 9,549 ÷ RPM. 1,450 RPM is typical for 4-pole 50Hz motors; 1,750 RPM for 60Hz.</p>
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
          Who Uses This Electric Motor Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Calculate full-load current for cable sizing, overload relay settings, fuse ratings, and motor control center (MCC) panel schedules." },
            { icon: "🔧", title: "Industrial Technicians", desc: "Verify nameplate data against measured performance, troubleshoot overloaded or underloaded motors, and set protective relay thresholds." },
            { icon: "🏭", title: "Plant & Facilities Engineers", desc: "Audit motor-driven systems for energy efficiency, justify premium efficiency motor upgrades with payback calculations, and build load schedules." },
            { icon: "🎓", title: "Students & Instructors", desc: "Work through motor theory problems, verify homework calculations, and explore the relationships between power, current, torque, speed, and efficiency." },
            { icon: "🏗️", title: "Panel Builders & Contractors", desc: "Size motor starters, contactors, overloads, and cables from motor kW or HP ratings without manual formula lookup." },
            { icon: "🔌", title: "Procurement & Specification Teams", desc: "Compare motor specifications across suppliers, check IE efficiency class claims, and verify that quoted power ratings match the application requirements." },
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
