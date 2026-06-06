import React from "react";

export default function FeedRateCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Feed Rate Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Feed Rate Calculator</strong> is a machining utility that computes the optimal
            feed rate for CNC milling, drilling, and turning operations. It uses spindle speed (RPM),
            the number of cutting flutes, and the feed per tooth (chip load) to determine how fast
            the cutting tool should advance through the workpiece material.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The formula is straightforward: <strong>Feed Rate = RPM × Number of Flutes × Feed per Tooth</strong>.
            For metric units, the result is in mm/min; for imperial units, it is in in/min (inches per minute).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Running a CNC machine at the correct feed rate prevents tool breakage, reduces vibration,
            improves surface finish quality, and maximizes material removal efficiency — all critical
            factors in professional and production machining environments.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Feed Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your unit system — Metric (mm/min) or Imperial (in/min)",
                "Choose the workpiece material from the dropdown",
                "The chip load auto-fills with the recommended value for that material",
                "Enter the spindle speed in RPM",
                "Enter the number of flutes on your cutting tool",
                "Adjust the feed per tooth if needed",
                "View the calculated feed rate instantly",
                "Check the chip load status indicator and safety message",
                "Copy the result or export a printable report",
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
                "Real-time feed rate calculation as you type",
                "Metric and imperial unit support",
                "Material presets with auto-filled chip loads",
                "Chip load status indicator (Optimal / Low / High)",
                "Safety messages and machining tips",
                "Chip load reference table for all materials",
                "Calculation history with localStorage",
                "Copy result to clipboard",
                "Export printable TXT report",
                "Decimal precision control",
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
          Feed Rate Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Metric Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Vf = RPM × z × fz
              </div>
              <p className="text-sm text-gray-600">
                Vf = feed rate (mm/min), RPM = spindle speed, z = number of flutes,
                fz = feed per tooth (mm/tooth). Result is in millimeters per minute.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Imperial Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Vf = RPM × z × fz
              </div>
              <p className="text-sm text-gray-600">
                The formula is identical for imperial units. Vf = feed rate (in/min), RPM = spindle speed,
                z = number of flutes, fz = feed per tooth (in/tooth). Result is in inches per minute.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Unit conversion:</strong> 1 mm/min = 0.03937 in/min. To convert: in/min = mm/min ÷ 25.4.
            The formula structure is the same for both unit systems — only the chip load units differ.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">RPM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Flutes</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Chip Load</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Feed Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Aluminum",        "3000", "4", "0.08 mm/tooth",  "960 mm/min"],
                ["Mild Steel",      "1800", "2", "0.04 mm/tooth",  "144 mm/min"],
                ["Stainless Steel", "1200", "4", "0.025 mm/tooth", "120 mm/min"],
                ["Brass",           "2500", "4", "0.07 mm/tooth",  "700 mm/min"],
                ["Titanium",        "800",  "2", "0.02 mm/tooth",  "32 mm/min"],
                ["Aluminum (Imp)",  "5000", "6", "0.004 in/tooth", "120 in/min"],
              ].map(([mat, rpm, fl, cl, fr]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono">{rpm}</td>
                  <td className="py-3 px-4 font-mono">{fl}</td>
                  <td className="py-3 px-4 font-mono">{cl}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{fr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Correct Feed Rate Matters
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔧", title: "Tool Life",         color: "blue",   desc: "Running at the correct feed rate maximizes cutting tool life. Too fast causes rapid wear and breakage; too slow leads to rubbing and heat buildup." },
            { icon: "✨", title: "Surface Finish",    color: "green",  desc: "Optimal feed rate produces the best surface finish. Incorrect feeds result in rough surfaces, chatter marks, or poor dimensional accuracy." },
            { icon: "⚡", title: "Productivity",      color: "purple", desc: "Correct feed rates reduce cycle time and increase output. Balancing feed with tool life is key to cost-effective CNC operations." },
            { icon: "🌡️", title: "Heat Control",     color: "orange", desc: "Excessive feed generates heat that softens the tool and workpiece. Correct feed keeps temperatures in the safe machining range." },
            { icon: "🛡️", title: "Safety",           color: "red",    desc: "Overfeeding a CNC machine can cause tool breakage and workpiece ejection. Correct feed rate keeps operations within safe mechanical limits." },
            { icon: "🎓", title: "CNC Programming",  color: "gray",   desc: "CNC programmers use this formula to set the F (feed rate) value in G-code. Correct feed rate is fundamental to any milling or drilling program." },
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
              q: "What is feed rate in CNC machining?",
              a: "Feed rate is the speed at which the cutting tool advances through the workpiece material. It is measured in mm/min (metric) or in/min (imperial). Feed rate directly affects surface finish, tool life, material removal rate, and machine stability. It is one of the most critical parameters in any CNC machining operation.",
            },
            {
              q: "What is chip load (feed per tooth)?",
              a: "Chip load — also called feed per tooth — is the distance the tool advances per cutting edge per revolution. It is measured in mm/tooth or in/tooth. Each material has a recommended chip load range for optimal tool life and surface finish. Too low a chip load causes rubbing; too high causes tool breakage.",
            },
            {
              q: "How does the number of flutes affect feed rate?",
              a: "More flutes allow a higher feed rate for the same chip load per tooth. A 4-flute end mill can feed twice as fast as a 2-flute end mill at the same RPM and chip load. However, more flutes also mean less chip clearance, which can cause chip packing in softer materials like aluminum. 2-flute end mills are preferred for aluminum; 4-flute for steel.",
            },
            {
              q: "What chip load should I use for aluminum?",
              a: "For aluminum with standard end mills, the recommended chip load is typically 0.05–0.20 mm/tooth (0.002–0.008 in/tooth). Start at the lower end and increase if the tool and finish allow. Aluminum is a soft material that tolerates high chip loads and cutting speeds.",
            },
            {
              q: "What is the difference between feed rate and cutting speed?",
              a: "Cutting speed (surface speed) is how fast the tool surface moves relative to the workpiece — measured in m/min or SFM. Feed rate is how fast the tool advances through the material — measured in mm/min or in/min. Cutting speed determines RPM; feed rate is calculated from RPM, flutes, and chip load. Both parameters must be set correctly for optimal machining.",
            },
            {
              q: "Can I use this calculator for drilling operations?",
              a: "Yes. For drilling, the formula is the same: Feed Rate = RPM × 1 (drill has one cutting edge per side, but typically use 2 for the formula) × Feed per Revolution. Many machinists use feed per revolution for drilling rather than feed per tooth. For a standard twist drill, use 1–2 as the flute count and adjust the chip load accordingly based on the material and drill diameter.",
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
