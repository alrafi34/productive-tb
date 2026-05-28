import React from "react";

export default function MomentOfInertiaSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is the Moment of Inertia?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Area Moment of Inertia</strong> (also called the Second Moment of Area) is a geometric
            property of a cross-section that measures its resistance to bending. It is one of the most
            fundamental values in structural and mechanical engineering, used in beam deflection, bending
            stress, and shaft design calculations.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A larger moment of inertia means the cross-section is stiffer and resists bending more
            effectively. This is why I-beams are used in construction — their shape maximizes the moment
            of inertia while minimizing material use.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator computes <strong>Ix</strong> (about the x-axis), <strong>Iy</strong> (about
            the y-axis), the <strong>polar moment Ip</strong>, and the <strong>section modulus</strong>
            for rectangles, circles, hollow sections, I-beams, T-beams, channel sections, and pipes.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the cross-section shape from the dropdown",
                "Choose your unit (mm, cm, m, in, or ft)",
                "Enter the dimensions for the selected shape",
                "Results update instantly — Ix, Iy, Ip, Sx, Sy, Area, and Centroid",
                "Use presets for common structural sections",
                "Export the result as a TXT report or copy to clipboard",
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Supported Shapes</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Rectangle — solid rectangular cross-section",
                "Hollow Rectangle — box beam section",
                "Solid Circle — round bar or rod",
                "Hollow Circle — pipe or hollow shaft",
                "Triangle — triangular cross-section",
                "I-Beam — standard structural steel section",
                "T-Beam — reinforced concrete T-section",
                "Channel Section — C-channel structural member",
                "Pipe Section — circular hollow section",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Ix</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Iy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle",     "b=4 in, h=8 in",         "170.67 in⁴",   "21.33 in⁴"],
                ["Solid Circle",  "d=4 in",                  "12.57 in⁴",    "12.57 in⁴"],
                ["Hollow Circle", "D=5 in, d=3 in",          "42.88 in⁴",    "42.88 in⁴"],
                ["Triangle",      "b=6 in, h=8 in",          "85.33 in⁴",    "27.00 in⁴"],
                ["Rectangle",     "b=200 mm, h=400 mm",      "1,066,666,666.67 mm⁴", "266,666,666.67 mm⁴"],
                ["Solid Circle",  "d=100 mm",                "4,908,738.52 mm⁴", "4,908,738.52 mm⁴"],
              ].map(([shape, dims, ix, iy]) => (
                <tr key={shape + dims} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
                  <td className="py-3 px-4 font-mono text-xs">{dims}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ix}</td>
                  <td className="py-3 px-4 font-mono">{iy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Ix Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Iy Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle",       "bh³ / 12",                    "hb³ / 12"],
                ["Hollow Rect",     "(bh³ − b_i·h_i³) / 12",      "(hb³ − h_i·b_i³) / 12"],
                ["Solid Circle",    "πd⁴ / 64",                    "πd⁴ / 64"],
                ["Hollow Circle",   "π(D⁴ − d⁴) / 64",            "π(D⁴ − d⁴) / 64"],
                ["Triangle",        "bh³ / 36",                    "hb³ / 48"],
                ["I-Beam",          "(bf·H³ − (bf−tw)·hw³) / 12", "(2tf·bf³ + hw·tw³) / 12"],
              ].map(([shape, ix, iy]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
                  <td className="py-3 px-4 font-mono text-xs">{ix}</td>
                  <td className="py-3 px-4 font-mono text-xs">{iy}</td>
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
            { icon: "🏗️", title: "Structural Engineers",  color: "blue",   desc: "Analyze beam bending, deflection, and load capacity for structural members." },
            { icon: "⚙️", title: "Mechanical Engineers", color: "green",  desc: "Design shafts, axles, and machine components under bending and torsional loads." },
            { icon: "🎓", title: "Engineering Students", color: "purple", desc: "Verify textbook calculations and understand cross-section properties." },
            { icon: "🏛️", title: "Civil Engineers",      color: "orange", desc: "Size beams, columns, and slabs for buildings and infrastructure." },
            { icon: "📐", title: "CAD Designers",        color: "red",    desc: "Validate cross-section properties during component design." },
            { icon: "🏭", title: "Manufacturing",        color: "gray",   desc: "Select standard sections for fabricated structural components." },
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
              q: "What is the difference between Ix and Iy?",
              a: "Ix is the moment of inertia about the horizontal (x) axis, resisting vertical bending. Iy is about the vertical (y) axis, resisting horizontal bending. For symmetric shapes like circles, Ix = Iy.",
            },
            {
              q: "What is the polar moment of inertia?",
              a: "The polar moment of inertia (Ip = Ix + Iy) measures resistance to torsion (twisting). It is used in shaft design to calculate shear stress under torque.",
            },
            {
              q: "What is the section modulus?",
              a: "Section modulus S = I / c, where c is the distance from the neutral axis to the extreme fiber. It is used to calculate bending stress: σ = M / S. A higher section modulus means lower bending stress for the same moment.",
            },
            {
              q: "Why does the I-beam have a high moment of inertia?",
              a: "The I-beam concentrates material far from the neutral axis (in the flanges), which maximizes the moment of inertia for a given cross-sectional area. This makes it very efficient for resisting bending.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. All formulas are based on standard engineering mechanics. Results are computed using double-precision floating point arithmetic. For critical structural applications, always verify with a licensed engineer.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
