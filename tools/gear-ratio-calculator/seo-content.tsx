import ToolFaq from "@/components/ToolFaq";
import { gearRatioCalculatorConfig } from "./config";

export default function GearRatioCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = gearRatioCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Gear Ratio Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Gear Ratio Calculator</strong> determines the mechanical relationship between two meshing gears
            by dividing the number of teeth on the driven gear by the number of teeth on the driver gear. The result
            tells you how many times the driven gear rotates for every single rotation of the driver gear.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Gear ratios are fundamental in mechanical engineering, automotive design, bicycle drivetrains, robotics,
            and industrial machinery. A ratio greater than 1 means the driven gear rotates slower but with more torque
            (torque multiplication). A ratio less than 1 means the driven gear rotates faster with less torque (speed
            multiplication).
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator also computes output RPM, output torque, and supports unit conversion between RPM and
            rad/s, making it useful for both quick estimates and precise engineering calculations.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Gear Ratio Calculator
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
                "Animated gear visualization diagram",
                "Simplified ratio (e.g., 40:20 → 2:1)",
                "Output RPM and rad/s conversion",
                "Torque multiplication with unit support",
                "Compare two gear setups side by side",
                "Presets for bicycle, automotive, robotics",
                "Calculation history",
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
          Gear Ratio Formula
        </h2>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Expression</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Gear Ratio", "GR = Driven Teeth ÷ Driver Teeth", "Core ratio formula"],
                  ["Output RPM", "N_out = N_in ÷ GR", "Speed at output shaft"],
                  ["Output Torque", "T_out = T_in × GR", "Torque at output shaft"],
                  ["Output rad/s", "ω_out = ω_in ÷ GR", "Angular velocity output"],
                ].map(([name, expr, desc]) => (
                  <tr key={name} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{name}</td>
                    <td className="py-3 px-4 font-mono text-primary">{expr}</td>
                    <td className="py-3 px-4 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Driver Teeth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Driven Teeth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Gear Ratio</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["20", "40", "2:1", "Torque doubles, speed halves"],
                ["15", "45", "3:1", "Torque triples, speed is 1/3"],
                ["50", "25", "0.5:1", "Speed doubles, torque halves"],
                ["30", "30", "1:1", "Direct drive, no change"],
                ["22", "34", "1.55:1", "Bicycle low gear — climbing"],
                ["50", "11", "0.22:1", "Bicycle high gear — speed"],
              ].map(([driver, driven, ratio, effect]) => (
                <tr key={driver + driven} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{driver}</td>
                  <td className="py-3 px-4 font-mono">{driven}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ratio}</td>
                  <td className="py-3 px-4 text-gray-600">{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🚗", title: "Automotive Engineers", color: "blue", desc: "Design transmission systems and optimize gear ratios for performance and fuel efficiency." },
            { icon: "🚲", title: "Bicycle Enthusiasts", color: "green", desc: "Select the right gear combination for climbing, sprinting, or touring." },
            { icon: "🤖", title: "Robotics Developers", color: "purple", desc: "Calculate motor-to-wheel ratios for precise speed and torque control." },
            { icon: "🏭", title: "Industrial Engineers", color: "orange", desc: "Design gearboxes and power transmission systems for machinery." },
            { icon: "🎓", title: "Students & Teachers", color: "red", desc: "Learn and teach mechanical advantage, torque, and rotational motion concepts." },
            { icon: "🔧", title: "DIY Mechanics", color: "gray", desc: "Troubleshoot and modify gear systems in vehicles, tools, and machines." },
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
