import ToolFaq from "@/components/ToolFaq";
import { accelerationCalculatorConfig } from "./config";

export default function AccelerationCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = accelerationCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Acceleration Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Acceleration Calculator</strong> is a physics tool that computes how quickly an
            object&apos;s velocity changes over time. Acceleration is a vector quantity — it has both
            magnitude and direction. When an object slows down, the acceleration is negative, which is
            called deceleration.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The core formula is <strong>a = (v₂ − v₁) / t</strong>, where a is acceleration, v₁ is
            initial velocity, v₂ is final velocity, and t is time. This calculator also supports
            solving for final velocity, initial velocity, or time when the other values are known.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you are a student solving kinematics problems, an engineer analyzing motion systems,
            or an automotive professional studying vehicle performance, this tool delivers instant,
            accurate results with full unit support.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acceleration Calculator
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
                "4 calculation modes — acceleration, v₂, v₁, and time",
                "Real-time calculation as you type",
                "4 velocity units — m/s, km/h, mph, ft/s",
                "3 time units — seconds, minutes, hours",
                "Step-by-step calculation breakdown",
                "Deceleration detection with clear labeling",
                "Swap velocities button for quick reversal",
                "Calculation history with localStorage persistence",
                "Quick presets for common real-world scenarios",
                "Export results as a TXT file",
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
          Acceleration Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Calculate Acceleration",    formula: "a = (v₂ − v₁) / t",  desc: "Find how fast velocity changes. Negative result means deceleration." },
              { title: "Calculate Final Velocity",  formula: "v₂ = v₁ + a × t",    desc: "Find the velocity after accelerating for a given time." },
              { title: "Calculate Initial Velocity",formula: "v₁ = v₂ − a × t",    desc: "Find the starting velocity given the final state." },
              { title: "Calculate Time",            formula: "t = (v₂ − v₁) / a",  desc: "Find how long it takes to reach a target velocity." },
            ].map(({ title, formula, desc }) => (
              <div key={title} className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                  {formula}
                </div>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>SI Unit:</strong> The standard unit of acceleration is meters per second squared (m/s²).
            Gravity on Earth is approximately 9.8 m/s² downward, meaning a free-falling object gains
            9.8 m/s of speed every second.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">v₁</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">v₂</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acceleration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0 m/s",    "20 m/s",   "4 s",   "5 m/s²"],
                ["10 m/s",   "50 m/s",   "8 s",   "5 m/s²"],
                ["0 mph",    "60 mph",   "6 s",   "10 mph/s"],
                ["100 km/h", "0 km/h",   "5 s",   "−20 km/h/s"],
                ["0 m/s",    "9.8 m/s",  "1 s",   "9.8 m/s² (gravity)"],
                ["30 m/s",   "10 m/s",   "4 s",   "−5 m/s²"],
              ].map(([v1, v2, t, a]) => (
                <tr key={v1 + v2} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{v1}</td>
                  <td className="py-3 px-4 font-mono">{v2}</td>
                  <td className="py-3 px-4 font-mono">{t}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{a}</td>
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
            { icon: "🎓", title: "Physics Education",      color: "blue",   desc: "Solve kinematics problems involving velocity, time, and acceleration for high school and university physics." },
            { icon: "🚗", title: "Automotive Engineering", color: "green",  desc: "Analyze vehicle acceleration, braking distance, and performance metrics for design and safety testing." },
            { icon: "🚀", title: "Aerospace",              color: "purple", desc: "Calculate rocket thrust acceleration, re-entry deceleration, and orbital maneuver timing." },
            { icon: "🏃", title: "Sports Science",         color: "orange", desc: "Measure athlete acceleration from starting blocks or sprint performance data." },
            { icon: "⚙️", title: "Mechanical Engineering", color: "red",    desc: "Determine conveyor belt, motor, or machine component acceleration for system design." },
            { icon: "🎢", title: "Amusement & Safety",     color: "gray",   desc: "Calculate g-forces on roller coasters and safety systems to ensure passenger comfort limits." },
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
