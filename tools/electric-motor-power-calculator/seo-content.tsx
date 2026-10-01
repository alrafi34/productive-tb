import ToolFaq from "@/components/ToolFaq";
import { electricMotorPowerCalculatorConfig } from "./config";

export default function ElectricMotorPowerCalculatorSEO() {
  const { howToSteps, faq } = electricMotorPowerCalculatorConfig.seo;


  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Electric Motor Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This <strong>electric motor power calculator</strong> works out a motor&apos;s power in
            <strong> watts, kilowatts and horsepower</strong> three ways: from shaft <strong>torque and
            speed</strong>, from the <strong>voltage, current, power factor and efficiency</strong> of a
            single-phase, three-phase or DC supply, or by converting a horsepower rating. Each result shows the
            working step by step.
          </p>
          <p>
            The formulas below cover the related figures engineers check next — full-load current, input power,
            torque and kVA — with tables for common motor sizes at 400 V (Europe) and 480 V (North America).
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
              <p className="text-gray-500 text-xs mt-2">Example: 7.5 kW motor, 400 V 3-phase, PF 0.85, η 90%</p>
              <p className="text-gray-500 text-xs">Current = 7,500 ÷ (1.732 × 400 × 0.85 × 0.90) = <span className="text-green-600 font-semibold">14.2 A</span></p>
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
              {howToSteps.map(({ name: title, text: desc }, i) => (
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
                "Power from shaft torque and speed (RPM)",
                "Power from voltage, current, power factor and efficiency",
                "Single-phase AC, three-phase AC and DC supplies",
                "Horsepower to watts and kilowatts",
                "Results in W, kW and HP with step-by-step working",
                "Presets for common motors",
                "Copy, export as text or CSV, and history",
                "Runs in your browser — nothing is uploaded",
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

      {/* ── 4. Worked Examples ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Sizing a Conveyor Motor from Torque",
              scenario: "A conveyor drive needs 36 N·m at 1,450 RPM. In Mechanical mode: P = 2π × 1,450 × 36 ÷ 60 = 5,466 W, or 5.47 kW (7.33 HP). With a 1.15 service factor the requirement is 6.3 kW, so the engineer picks the next standard IEC size, 7.5 kW.",
            },
            {
              title: "Shaft Power of a US Three-Phase Pump",
              scenario: "A pump motor on a 480 V three-phase supply draws 14 A at power factor 0.86 and 92% efficiency. In Electrical mode: P = 1.732 × 480 × 14 × 0.86 × 0.92 = 9,209 W, or 9.21 kW (12.3 HP) at the shaft, which confirms it is running close to its 15 HP rating.",
            },
            {
              title: "Is a Premium-Efficiency Motor Worth It?",
              scenario: "A 22 kW motor runs 6,000 hours a year at $0.10/kWh. An IE2 motor (91.4% efficient) draws 22 ÷ 0.914 = 24.07 kW and costs $14,442 a year; an IE3 motor (93.6%) draws 23.50 kW and costs $14,103. The $340 annual saving repays a $280 price difference in about 10 months.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Motor Power Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>HP to kW and Full-Load Current (3-phase, PF 0.85, η 90%)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">HP</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">kW (output)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Input kW</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">400 V (A)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">480 V (A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 50].map((hp) => {
                    const kw = hp * 0.7457;
                    const amps = (v: number) => ((kw * 1000) / (Math.sqrt(3) * v * 0.85 * 0.9)).toFixed(1);
                    return (
                      <tr key={hp} className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{hp} HP</td>
                        <td className="py-2 px-3 font-mono text-gray-700 text-xs">{kw.toFixed(2)} kW</td>
                        <td className="py-2 px-3 font-mono text-gray-600 text-xs">{(kw / 0.9).toFixed(2)} kW</td>
                        <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{amps(400)}</td>
                        <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{amps(480)}</td>
                      </tr>
                    );
                  })}
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

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
