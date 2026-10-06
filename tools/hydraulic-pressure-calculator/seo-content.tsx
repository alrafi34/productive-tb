import ToolFaq from "@/components/ToolFaq";
import { hydraulicPressureCalculatorConfig } from "./config";

export default function HydraulicPressureCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = hydraulicPressureCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Hydraulic Pressure Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Hydraulic Pressure Calculator</strong> is an engineering tool that computes hydraulic
            pressure, force, piston area, and cylinder diameter using <strong>Pascal&apos;s Law</strong> —
            the fundamental principle governing all hydraulic systems. The core formula is{" "}
            <strong>P = F / A</strong>, where P is pressure in Pascals, F is force in Newtons, and A is
            the piston cross-sectional area in square meters.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports all four calculation modes: finding pressure from force and area,
            finding force from pressure and area, finding area from force and pressure, and finding piston
            diameter from force and pressure. All inputs are automatically converted to SI units before
            calculation, and results are displayed across all common engineering units simultaneously.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hydraulic systems are used globally in manufacturing, construction, automotive, aerospace, and
            industrial automation. This tool is designed for mechanical engineers, hydraulic technicians,
            students, and maintenance professionals who need fast, accurate calculations without
            spreadsheets or manual formulas.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Hydraulic Pressure Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {howToSteps.map(({ text: step }, i) => (
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
                "4 calculation modes — Pressure, Force, Area, Diameter",
                "Real-time calculation as you type",
                "Full unit support — Pa, kPa, MPa, bar, PSI, N, kN, lbf, tonf",
                "Piston diameter from area using d = √(4A/π)",
                "Live formula display with your actual values",
                "Full unit conversion breakdown table",
                "Calculation history that persists between visits",
                "Export results as a TXT file",
                "Quick presets for common hydraulic scenarios",
                "Scientific notation for very large/small values",
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
          Pascal&apos;s Law Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">The Core Formulas</h3>
              <div className="space-y-2">
                <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-2">P = F / A</div>
                <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-2">F = P × A</div>
                <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-2">A = F / P</div>
                <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-2">d = √(4A / π)</div>
              </div>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Pascal&apos;s Principle</h3>
              <p className="text-sm text-gray-600 mb-3">
                Pascal&apos;s Law states that pressure applied to a confined, incompressible fluid is
                transmitted equally in all directions throughout the fluid. This means a small force
                applied over a small area can generate a large force over a larger area.
              </p>
              <p className="text-sm text-gray-600">
                This is the operating principle behind hydraulic jacks, brakes, presses, and cylinders
                used in construction, manufacturing, and automotive systems worldwide.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Doubling the piston area at the same pressure doubles the output
            force. Halving the area doubles the pressure for the same input force. This mechanical
            advantage is what makes hydraulic systems so powerful and efficient.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Pressure", "F=1000 N, A=0.01 m²",    "100 kPa / 1 bar / 14.5 PSI", "Hydraulic jack"],
                ["Pressure", "F=5000 N, A=50 cm²",      "1 MPa / 10 bar / 145 PSI",   "Industrial cylinder"],
                ["Force",    "P=3000 PSI, A=2 in²",     "≈ 41,369 N / 9,300 lbf",     "Hydraulic press"],
                ["Force",    "P=250 bar, A=200 cm²",    "500,000 N / 500 kN",          "Excavator arm"],
                ["Area",     "F=5000 N, P=250 bar",     "0.2 cm² / 20 mm²",           "Compact actuator"],
                ["Diameter", "F=10000 N, P=100 bar",    "≈ 11.3 mm diameter",          "Hydraulic cylinder sizing"],
              ].map(([mode, inputs, result, app]) => (
                <tr key={mode + inputs} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{mode}</td>
                  <td className="py-3 px-4 font-mono text-xs">{inputs}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-gray-800">{result}</td>
                  <td className="py-3 px-4 text-gray-500">{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Pressure Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">kPa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">MPa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">bar</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">PSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",         "0.001",   "0.000001", "0.00001",  "0.000145"],
                ["1,000",     "1",       "0.001",    "0.01",     "0.145"],
                ["100,000",   "100",     "0.1",      "1",        "14.504"],
                ["1,000,000", "1,000",   "1",        "10",       "145.04"],
                ["6,894.76",  "6.895",   "0.00689",  "0.06895",  "1"],
                ["20,684,271","20,684",  "20.684",   "206.84",   "3,000"],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 px-4 font-mono">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Hydraulic Pressure
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🚗", title: "Automotive Brakes",      color: "blue",   desc: "Hydraulic brake systems use Pascal's Law to amplify pedal force across all four brake calipers simultaneously, ensuring consistent stopping power." },
            { icon: "🏗️", title: "Construction Equipment", color: "orange", desc: "Excavators, bulldozers, and cranes use hydraulic cylinders operating at 200–350 bar to lift and move heavy loads with precision control." },
            { icon: "🏭", title: "Industrial Presses",     color: "purple", desc: "Metal stamping, forging, and injection molding presses use hydraulic systems to generate forces of hundreds of kilonewtons from compact cylinders." },
            { icon: "✈️", title: "Aerospace Systems",      color: "green",  desc: "Aircraft landing gear, flight control surfaces, and thrust reversers rely on hydraulic systems operating at 3,000–5,000 PSI for reliable actuation." },
            { icon: "🚢", title: "Marine Hydraulics",      color: "teal",   desc: "Ship steering systems, deck cranes, and hatch covers use hydraulic actuators to handle the extreme forces required in marine environments." },
            { icon: "🔧", title: "Maintenance & Repair",   color: "red",    desc: "Hydraulic jacks, lifts, and presses used in workshops and service centers rely on accurate pressure and force calculations for safe operation." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
