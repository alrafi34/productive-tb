import React from "react";

export default function CuttingSpeedCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Cutting Speed Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Cutting Speed Calculator</strong> is a machining engineering tool that computes the
            surface speed at which a cutting tool moves relative to the workpiece. Cutting speed — also called
            surface speed or peripheral speed — directly determines tool life, surface finish quality, heat
            generation, and overall machining productivity.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard metric formula is <strong>Vc = (π × D × n) / 1000</strong>, where Vc is cutting
            speed in m/min, D is tool diameter in mm, and n is spindle speed in RPM. For imperial units,
            the formula becomes <strong>Vc = (π × D × n) / 12</strong> with D in inches and Vc in ft/min.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports four calculation modes — cutting speed, spindle RPM, feed rate, and
            machining time — with a built-in material database covering mild steel, stainless steel,
            aluminum, brass, cast iron, titanium, copper, and plastic.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Cutting Speed Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the calculation mode — Cutting Speed, RPM, Feed Rate, or Machining Time",
                "Choose your unit system — Metric (mm, m/min) or Imperial (in, ft/min)",
                "Select the workpiece material from the dropdown",
                "Enter tool diameter and spindle RPM (or cutting speed for RPM mode)",
                "For feed rate: enter number of flutes and feed per tooth",
                "For machining time: enter machining length",
                "View instant results with material speed status indicator",
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
                "Four calculation modes in one tool",
                "Real-time calculation as you type",
                "Metric and imperial unit support",
                "Material database with recommended speed ranges",
                "Speed status indicator (Optimal / Safe / Too Fast / Too Slow)",
                "Live formula display with actual values",
                "Calculation history with localStorage persistence",
                "Export results as TXT file",
                "Quick presets for common machining scenarios",
                "Material reference table with all speed ranges",
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
          Cutting Speed Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Formula 1 — Cutting Speed</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Vc = (π × D × n) / 1000
              </div>
              <p className="text-sm text-gray-600">
                Vc = cutting speed (m/min), D = tool diameter (mm), n = spindle speed (RPM).
                Dividing by 1000 converts mm/min to m/min.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Formula 2 — Spindle RPM</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                n = (1000 × Vc) / (π × D)
              </div>
              <p className="text-sm text-gray-600">
                Rearranged from the cutting speed formula. Use this when you know the recommended
                cutting speed for a material and need to set the machine RPM.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Formula 3 — Feed Rate</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Vf = n × z × fz
              </div>
              <p className="text-sm text-gray-600">
                Vf = feed rate (mm/min), z = number of flutes, fz = feed per tooth (mm/tooth).
                Feed per tooth is also called chip load.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Formula 4 — Machining Time</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                T = L / Vf
              </div>
              <p className="text-sm text-gray-600">
                T = machining time (min), L = machining length (mm), Vf = feed rate (mm/min).
                This gives the time to complete one pass over the workpiece.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Imperial conversion:</strong> For ft/min, use Vc = (π × D × n) / 12 where D is in inches.
            1 m/min = 3.28084 ft/min. The RPM formula becomes n = (12 × Vc) / (π × D).
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Diameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">RPM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cutting Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mild Steel",       "20 mm",  "500",   "31.42 m/min"],
                ["Aluminum",         "10 mm",  "6000",  "188.5 m/min"],
                ["Stainless Steel",  "12 mm",  "600",   "22.62 m/min"],
                ["Brass",            "25 mm",  "1000",  "78.54 m/min"],
                ["Cast Iron",        "50 mm",  "200",   "31.42 m/min"],
                ["Titanium",         "16 mm",  "400",   "20.11 m/min"],
              ].map(([mat, diam, rpm, vc]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono">{diam}</td>
                  <td className="py-3 px-4 font-mono">{rpm}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{vc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Cutting Speed Matters
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔧", title: "Tool Life",        color: "blue",   desc: "Running at the correct cutting speed maximizes tool life. Too fast causes rapid wear; too slow can cause built-up edge and chatter." },
            { icon: "✨", title: "Surface Finish",   color: "green",  desc: "Optimal cutting speed produces the best surface finish. Incorrect speeds lead to rough surfaces, chatter marks, or poor dimensional accuracy." },
            { icon: "🌡️", title: "Heat Control",    color: "orange", desc: "Excessive cutting speed generates heat that softens the tool and workpiece. Proper speed keeps temperatures in the safe range." },
            { icon: "⚡", title: "Productivity",     color: "purple", desc: "Higher cutting speeds reduce cycle time and increase output. Balancing speed with tool life is key to cost-effective machining." },
            { icon: "💰", title: "Cost Efficiency",  color: "yellow", desc: "Correct speeds reduce tool replacement costs, scrap rates, and machine downtime — directly impacting production economics." },
            { icon: "🎓", title: "CNC Programming",  color: "gray",   desc: "CNC machinists use cutting speed calculations to set S (spindle speed) and F (feed rate) values in G-code programs." },
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
              q: "What is cutting speed in machining?",
              a: "Cutting speed (Vc) is the speed at which the cutting edge of a tool moves relative to the workpiece surface. It is measured in m/min (metric) or ft/min (imperial) and is one of the most critical parameters in machining operations.",
            },
            {
              q: "What is the difference between cutting speed and spindle RPM?",
              a: "Cutting speed is the surface speed of the tool in m/min or ft/min. Spindle RPM is the rotational speed of the machine spindle. They are related by the tool diameter: RPM = (1000 × Vc) / (π × D). A larger diameter tool requires lower RPM to achieve the same cutting speed.",
            },
            {
              q: "What is feed per tooth (chip load)?",
              a: "Feed per tooth (fz) is the distance the workpiece advances per cutting edge per revolution. It determines chip thickness and directly affects surface finish, cutting forces, and tool life. Typical values range from 0.01 to 0.3 mm/tooth depending on material and tool.",
            },
            {
              q: "How do I choose the right cutting speed for a material?",
              a: "Refer to the material's recommended cutting speed range (available in the Reference table). Start at the lower end of the range for roughing operations and increase toward the upper end for finishing. Always consult the tool manufacturer's recommendations for carbide vs. HSS tools.",
            },
            {
              q: "Why is aluminum machined at much higher speeds than steel?",
              a: "Aluminum is softer and has better thermal conductivity than steel, allowing heat to dissipate quickly. This permits cutting speeds of 150–300 m/min for aluminum versus 25–35 m/min for mild steel with HSS tools. Carbide tools can run even faster.",
            },
            {
              q: "Is this calculator accurate for CNC machining?",
              a: "Yes. The formulas used are standard ISO machining formulas used globally. For production CNC work, always verify with your tool manufacturer's cutting data sheets, as carbide tools typically run 3–5× faster than HSS speeds shown in the reference table.",
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
