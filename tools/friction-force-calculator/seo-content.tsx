import ToolFaq from "@/components/ToolFaq";
import { frictionForceCalculatorConfig } from "./config";

export default function FrictionForceCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = frictionForceCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Friction Force Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Friction Force Calculator</strong> is an engineering and physics tool that computes
            the resistive force opposing motion between two surfaces in contact. Friction is one of the
            most fundamental forces in mechanics, governing everything from vehicle braking to industrial
            machinery design.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula is <strong>F = μ × N</strong>, where F is the frictional force in Newtons,
            μ (mu) is the dimensionless coefficient of friction, and N is the normal force perpendicular to
            the contact surface. This calculator supports both <strong>static friction</strong> (maximum
            force before motion begins) and <strong>kinetic friction</strong> (force during sliding motion).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are displayed in Newtons (N), Kilonewtons (kN), and Pound-force (lbf) simultaneously,
            with surface material presets that auto-fill the coefficient for common engineering scenarios.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Friction Force Calculator
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
                "Real-time calculation as you type",
                "Static and kinetic friction modes",
                "10 surface material presets with auto-fill",
                "Multi-unit support — N, kN, lbf",
                "Live formula display with your actual values",
                "Step-by-step calculation breakdown",
                "Calculation history that persists between visits",
                "Export results as a TXT file",
                "Copy result to clipboard",
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
          Friction Force Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Static Friction</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Fs ≤ μs × N
              </div>
              <p className="text-sm text-gray-600">
                Static friction acts when surfaces are at rest relative to each other. It can range from
                zero up to a maximum value of μs × N. The object will not move until the applied force
                exceeds this maximum.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Kinetic Friction</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Fk = μk × N
              </div>
              <p className="text-sm text-gray-600">
                Kinetic friction acts when surfaces are sliding against each other. It is generally constant
                and slightly lower than the maximum static friction for the same surface pair.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Friction Force)</div>
              <div className="text-blue-700 text-xs">Resistive force in Newtons (N) opposing relative motion between surfaces</div>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
              <div className="font-semibold text-orange-800 text-xs uppercase mb-1">μ (Coefficient)</div>
              <div className="text-orange-700 text-xs">Dimensionless ratio describing surface roughness. Ranges from ~0.01 (Teflon) to ~1.0+ (rubber)</div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="font-semibold text-green-800 text-xs uppercase mb-1">N (Normal Force)</div>
              <div className="text-green-700 text-xs">Force perpendicular to the contact surface, in Newtons (N)</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Friction force does not depend on the contact area — only on the
            normal force and the coefficient of friction. A larger surface area does not increase friction
            for the same weight.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Surface</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">μ</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Normal Force</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Friction Force</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rubber on Dry Concrete", "0.80", "100 N",   "80 N"],
                ["Steel on Steel",         "0.57", "500 N",   "285 N"],
                ["Wood on Wood",           "0.40", "200 N",   "80 N"],
                ["Steel on Ice",           "0.05", "1,000 N", "50 N"],
                ["Teflon on Steel",        "0.04", "800 N",   "32 N"],
                ["Rubber on Wet Concrete", "0.40", "300 N",   "120 N"],
              ].map(([surface, mu, normal, friction]) => (
                <tr key={surface} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{surface}</td>
                  <td className="py-3 px-4 font-mono">{mu}</td>
                  <td className="py-3 px-4 font-mono">{normal}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{friction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Coefficient of Friction Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Surface Pair</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Static μ</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Kinetic μ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rubber on Dry Concrete",  "0.80", "0.70"],
                ["Steel on Steel (dry)",    "0.74", "0.57"],
                ["Glass on Glass",          "0.94", "0.40"],
                ["Wood on Wood",            "0.50", "0.40"],
                ["Aluminum on Steel",       "0.61", "0.47"],
                ["Copper on Steel",         "0.53", "0.36"],
                ["Leather on Metal",        "0.60", "0.50"],
                ["Rubber on Wet Concrete",  "0.50", "0.40"],
                ["Steel on Ice",            "0.10", "0.05"],
                ["Teflon on Steel",         "0.04", "0.04"],
              ].map(([surface, stat, kin]) => (
                <tr key={surface} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{surface}</td>
                  <td className="py-3 px-4 font-mono">{stat}</td>
                  <td className="py-3 px-4 font-mono">{kin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Friction
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🚗", title: "Automotive Braking",     color: "blue",   desc: "Brake pad friction converts kinetic energy to heat. Higher μ between pad and rotor means shorter stopping distances." },
            { icon: "🏗️", title: "Structural Engineering", color: "green",  desc: "Friction between foundation and soil resists sliding forces. Bolt friction joints rely on clamping force and surface μ." },
            { icon: "⚙️", title: "Machine Design",         color: "orange", desc: "Bearing selection, belt drives, and clutch systems all depend on accurate friction force calculations." },
            { icon: "🎿", title: "Sports & Recreation",    color: "purple", desc: "Ski wax selection, climbing shoe rubber, and athletic shoe grip are all optimized using friction principles." },
            { icon: "🏭", title: "Manufacturing",          color: "red",    desc: "Conveyor belt tension, metal forming forces, and cutting tool wear are all governed by friction mechanics." },
            { icon: "🎓", title: "Physics Education",      color: "gray",   desc: "Friction is a core topic in classical mechanics, demonstrating Newton's laws in everyday scenarios." },
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
