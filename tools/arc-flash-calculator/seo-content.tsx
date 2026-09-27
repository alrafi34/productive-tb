import ToolFaq from "@/components/ToolFaq";
import { arcFlashCalculatorConfig } from "./config";

export default function ArcFlashCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = arcFlashCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  // IEEE 1584-2002 Table 4 values used by the calculator
  const equipment: [string, string, string, string][] = [
    ["Panelboard / MCC", "0.208–1 kV", "25 mm", "1.641"],
    ["Switchgear", "0.208–1 kV", "32 mm", "1.473"],
    ["Open air / cable", "0.208–1 kV", "40 mm", "2.000"],
    ["Switchgear", "1–5 kV", "102 mm", "0.973"],
    ["Switchgear", "5–15 kV", "153 mm", "0.973"],
    ["Open air / cable", "1–15 kV", "102–153 mm", "2.000"],
  ];

  const ppe: [string, string, string][] = [
    ["Below 1.2 cal/cm²", "Outside the arc flash boundary", "Arc-rated clothing not required by the energy level; other PPE still applies"],
    ["1.2–4 cal/cm²", "Category 1 (4 cal/cm²)", "Arc-rated shirt and pants or coverall, face shield, hard hat, safety glasses, hearing protection, leather gloves"],
    ["4–8 cal/cm²", "Category 2 (8 cal/cm²)", "As category 1 with an arc-rated balaclava or hood, and leather footwear"],
    ["8–25 cal/cm²", "Category 3 (25 cal/cm²)", "Arc flash suit with hood, arc-rated gloves"],
    ["25–40 cal/cm²", "Category 4 (40 cal/cm²)", "40 cal/cm² arc flash suit with hood, arc-rated gloves"],
    ["Above 40 cal/cm²", "No PPE category", "De-energize the equipment before work"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What This Arc Flash Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An arc flash is the burst of heat and light released when current flows through air between conductors. The
            hazard to a worker is measured as <strong>incident energy</strong>, the heat reaching the skin at the working
            distance, in cal/cm². At 1.2 cal/cm² bare skin receives a second-degree burn.
          </p>
          <p>
            This calculator applies the empirical equations of <strong>IEEE 1584-2002</strong> to estimate the arcing
            current, the incident energy, the arc flash boundary and the minimum arc rating of the PPE, for systems from
            208 V to 15 kV. It is a screening tool: equipment labels and work permits must come from an arc flash study
            by a qualified engineer.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The IEEE 1584-2002 Equations</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Arcing current, below 1 kV</span>: lg Ia = K + 0.662 lg Ibf + 0.0966 V + 0.000526 G + 0.5588 V lg Ibf − 0.00304 G lg Ibf</p>
            <p><span className="font-semibold">Arcing current, 1 kV and above</span>: lg Ia = 0.00402 + 0.983 lg Ibf</p>
            <p><span className="font-semibold">Normalized energy</span>: lg En = K1 + K2 + 1.081 lg Ia + 0.0011 G</p>
            <p><span className="font-semibold">Incident energy</span>: E = 4.184 × Cf × En × (t ÷ 0.2) × (610 ÷ D)^x</p>
          </div>
          <p className="text-sm">
            Ibf is the bolted fault current (kA), V the voltage (kV), G the electrode gap (mm), t the arc duration (s) and D
            the working distance (mm). K is −0.153 in open air and −0.097 in a box; K1 is −0.792 in open air and −0.555 in
            a box; K2 is −0.113 for solidly grounded systems and 0 otherwise; Cf is 1.5 up to 1 kV and 1.0 above. E comes
            out in J/cm²; divide by 4.184 for cal/cm².
          </p>
          <p className="text-sm">
            Example: 480 V, 20 kA, a panelboard, 0.1 s and 18 in (457 mm) give Ia ≈ 11.9 kA and E ≈ 4.0 cal/cm², with an
            arc flash boundary of about 37 in.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Equipment Gaps and Distance Exponents</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Equipment</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Gap G</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Exponent x</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment.map(([eq, v, g, x]) => (
                <tr key={eq + v} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{eq}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{v}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{g}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          A smaller exponent means enclosed equipment focuses the energy toward the opening, so it falls off more slowly
          with distance than an arc in open air.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Incident Energy and PPE</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Incident energy</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Minimum arc rating</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical PPE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ppe.map(([e, rating, kit]) => (
                <tr key={e} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-xs text-gray-900">{e}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{rating}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{kit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          PPE categories and ratings from NFPA 70E (2024 edition). Choose clothing with an arc rating at or above the
          calculated incident energy.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Arc Flash Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Limits of This Estimate</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "IEEE 1584-2002 covers 208 V to 15 kV and bolted fault currents of 0.7 to 106 kA; outside that range the equations do not apply.",
            "Below 1 kV the standard also asks for a second calculation at 85% of the arcing current, which can trip the protection more slowly and give a higher energy. That needs the device's time-current curve.",
            "IEEE 1584-2018 replaced these equations with models for five electrode configurations and enclosure sizes; results can differ in either direction.",
            "The arc duration must be the actual clearing time of the upstream device at the arcing current, not a guess.",
            "Never use this estimate for equipment labels or energized work permits; commission a full study.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0 mt-0.5">⚠️</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
