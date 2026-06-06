import React from "react";

export default function BearingLifeCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Bearing Life Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Bearing Life Calculator</strong> is a mechanical engineering tool that estimates the
            expected operational lifespan of rolling element bearings using the ISO 281 standard L10 formula.
            Bearing life is expressed in revolutions, operating hours, or years depending on the application.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The L10 life represents the number of revolutions (or hours) that 90% of an apparently identical
            group of bearings will complete or exceed before the first evidence of fatigue develops. It is
            calculated using the ratio of the bearing&apos;s dynamic load rating (C) to the applied equivalent
            dynamic load (P), raised to a load-life exponent.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For <strong>ball bearings</strong>, the exponent is 3. For <strong>roller bearings</strong>,
            it is 10/3 ≈ 3.333. This calculator also applies ISO 281 reliability adjustment factors (a₁)
            to compute adjusted bearing life at reliability levels from 90% up to 99%.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bearing Life Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select bearing type: Ball Bearing or Roller Bearing",
                "Choose load unit: kN, N, or lbf",
                "Enter Dynamic Load Rating (C) from the bearing catalog",
                "Enter Equivalent Dynamic Bearing Load (P) from your application",
                "Enter shaft rotational speed in RPM",
                "Set hours per day of operation for life-in-years estimate",
                "Select reliability level (default: 90% / L10 standard)",
                "Adjust the service factor slider for harsh environments",
                "View life in hours, million revolutions, and years instantly",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Real-time calculations as you type",
                "Ball and roller bearing ISO formulas",
                "Unit conversion: kN, N, and lbf",
                "ISO 281 reliability factor adjustments (90–99%)",
                "Service factor slider for operating environment",
                "Visual life gauge and health indicator",
                "Bearing comparison mode (two setups side-by-side)",
                "Life in revolutions, hours, and years",
                "Calculation history with localStorage persistence",
                "Export results as TXT file",
                "Quick presets for common engineering scenarios",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          ISO Bearing Life Formulas
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Ball Bearing (p = 3)</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                L10 = (C / P)³ × 10⁶
              </div>
              <p className="text-sm text-gray-600">
                Used for all ball bearing types — deep groove, angular contact, thrust. The cubic
                exponent reflects the fatigue characteristics of point-contact geometry.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Roller Bearing (p = 10/3)</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                L10 = (C / P)^(10/3) × 10⁶
              </div>
              <p className="text-sm text-gray-600">
                Used for cylindrical, tapered, spherical, and needle roller bearings. The 10/3 exponent
                accounts for line-contact geometry which distributes load differently.
              </p>
            </div>
          </div>
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Converting Revolutions to Hours</h3>
            <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
              L10h = L10 ÷ (60 × n)
            </div>
            <p className="text-sm text-gray-600">
              Where L10h is life in hours, L10 is life in revolutions, and n is speed in RPM.
              At 1200 RPM, each hour contains 72,000 revolutions.
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Doubling the C/P ratio increases ball bearing life by 8× (2³).
            Halving the applied load (P) has the same effect as doubling the rated capacity (C).
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">C</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">P</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">RPM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">L10 Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Ball",   "25 kN", "5 kN",  "1200", "1,736 h"],
                ["Ball",   "40 kN", "8 kN",  "1800", "578 h"],
                ["Ball",   "30 kN", "6 kN",  "900",  "2,315 h"],
                ["Roller", "60 kN", "12 kN", "600",  "6,944 h"],
                ["Ball",   "20 kN", "4 kN",  "3600", "289 h"],
                ["Roller", "100 kN","20 kN", "750",  "5,556 h"],
              ].map(([type, C, P, rpm, hours]) => (
                <tr key={C + P + rpm} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{type}</td>
                  <td className="py-3 px-4 font-mono">{C}</td>
                  <td className="py-3 px-4 font-mono">{P}</td>
                  <td className="py-3 px-4 font-mono">{rpm}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Reliability Adjustment Factors (ISO 281 a₁)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Reliability</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">a₁ Factor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Life Reduction</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["90% (L10)", "1.00", "—",    "Standard design, general machinery"],
                ["95%",       "0.64", "−36%", "More critical machines, pumps"],
                ["96%",       "0.55", "−45%", "Industrial equipment"],
                ["97%",       "0.47", "−53%", "High reliability requirements"],
                ["98%",       "0.37", "−63%", "Safety-critical systems"],
                ["99%",       "0.25", "−75%", "Aerospace, medical equipment"],
              ].map(([rel, a1, red, use]) => (
                <tr key={rel} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold">{rel}</td>
                  <td className="py-3 px-4 font-mono">{a1}</td>
                  <td className="py-3 px-4 text-red-600 font-medium">{red}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏭", title: "Industrial Machinery",   color: "blue",   desc: "Conveyor systems, gearboxes, and production equipment require predictive maintenance scheduling based on bearing life calculations." },
            { icon: "🚗", title: "Automotive Engineering", color: "green",  desc: "Wheel bearings, transmission bearings, and engine components are sized using L10 life calculations to meet vehicle warranty requirements." },
            { icon: "⚡", title: "Electric Motors",        color: "yellow", desc: "Motor bearings operate at high speeds continuously. Life calculations help determine maintenance intervals and replacement schedules." },
            { icon: "✈️", title: "Aerospace",             color: "purple", desc: "Critical bearings in aircraft engines and landing gear demand 99% reliability calculations with significant safety margins." },
            { icon: "🏗️", title: "Construction Equipment", color: "orange", desc: "Heavy machinery bearings face high shock loads. Service factors are applied to extend life calculations for real-world conditions." },
            { icon: "🎓", title: "Engineering Education",  color: "gray",   desc: "L10 bearing life is a fundamental topic in machine design courses, used to teach fatigue-based component selection." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What does L10 bearing life mean?",
              a: "L10 is the basic rating life — the number of revolutions (or hours at a given speed) that 90% of a group of identical bearings operating under identical conditions will complete before the first evidence of material fatigue. The remaining 10% may fail before this life is reached.",
            },
            {
              q: "What is the difference between ball and roller bearing formulas?",
              a: "Ball bearings use an exponent of 3 (point contact), while roller bearings use 10/3 ≈ 3.333 (line contact). Roller bearings generally carry higher radial loads and have slightly longer life at equivalent C/P ratios compared to ball bearings.",
            },
            {
              q: "What is the service factor and when should I change it?",
              a: "The service factor multiplies the equivalent load P to account for shock, vibration, or misalignment in harsh operating environments. Use 1.0 for smooth, steady loads. Use 1.5–2.0 for moderate shock loads (typical industrial). Use 2.0–3.0 for heavy shock loads (mining, construction).",
            },
            {
              q: "What is dynamic load rating (C)?",
              a: "The dynamic load rating C is the constant radial load that a group of identical bearings can theoretically endure for a basic rating life of one million revolutions. It is provided in the bearing manufacturer's catalog and is a fixed property of each bearing model.",
            },
            {
              q: "How accurate is this calculator?",
              a: "This calculator uses the ISO 281 basic rating life formula with standard reliability factors. Results are accurate for ideal operating conditions. For actual applications, consult manufacturer data sheets and consider additional life modification factors (lubrication, contamination, misalignment) per ISO 281 Annex A.",
            },
            {
              q: "Why does higher reliability reduce bearing life?",
              a: "L10 life at 90% reliability means 10% of bearings fail before this point. To guarantee 95% or 99% survival, you must use a more conservative life estimate (shorter), represented by a₁ factors less than 1.0. At 99% reliability, the adjusted life is only 25% of L10.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
