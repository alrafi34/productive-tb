import React from "react";

export default function ColumnBucklingCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Column Buckling Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Column Buckling Calculator</strong> computes the critical buckling load (Pcr) of a structural
            column — the maximum compressive load a column can carry before it becomes unstable and suddenly
            deflects sideways. This failure mode is called <strong>Euler buckling</strong> or elastic buckling.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculation is based on <strong>Euler&apos;s Buckling Formula</strong>:
            <code className="mx-2 px-2 py-1 bg-gray-100 rounded font-mono text-sm">Pcr = π² × E × I / (K × L)²</code>
            where E is Young&apos;s modulus, I is the second moment of area, K is the effective length factor, and L is the column length.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This tool is essential for structural engineers, mechanical engineers, architects, and students who
            need to quickly verify column stability under axial compressive loads. It supports metric and US customary
            units, material presets, and multiple end conditions.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Column Buckling Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a material preset or enter a custom Young's Modulus",
                "Enter the column length and select the unit (ft, m, in, etc.)",
                "Enter the Moment of Inertia (I) for your cross-section",
                "Choose the end condition (Pinned-Pinned, Fixed-Fixed, etc.)",
                "Set a safety factor (typically 2–3 for structural columns)",
                "Optionally enter an axial load to check the safety status",
                "View the critical buckling load (Pcr) across all unit systems",
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
                "Real-time Euler buckling calculation as you type",
                "4 end conditions with automatic K-factor assignment",
                "Material presets: Steel, Aluminum, Concrete, Titanium",
                "Multi-unit support: metric and imperial",
                "Safety factor analysis with allowable load",
                "Axial load comparison with safety status indicator",
                "Step-by-step formula breakdown for students",
                "Visual end condition diagrams",
                "K-factor reference table",
                "Calculation history with localStorage",
                "Export results as TXT file",
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
          Euler&apos;s Buckling Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="font-mono text-xl text-center bg-white border border-gray-200 rounded-lg p-4 mb-4">
              Pcr = π² × E × I / (K × L)²
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { sym: "Pcr", desc: "Critical buckling load — the load at which the column becomes unstable" },
                { sym: "π²",  desc: "Mathematical constant pi squared ≈ 9.8696" },
                { sym: "E",   desc: "Young's modulus (elastic modulus) — material stiffness in Pa or psi" },
                { sym: "I",   desc: "Second moment of area (moment of inertia) — cross-section shape resistance in m⁴ or in⁴" },
                { sym: "K",   desc: "Effective length factor — depends on end conditions (0.5 to 2.0)" },
                { sym: "L",   desc: "Unsupported column length in metres or feet" },
              ].map(({ sym, desc }) => (
                <div key={sym} className="flex gap-3">
                  <code className="flex-shrink-0 px-2 py-1 bg-primary/10 text-primary rounded font-mono font-bold text-sm self-start">{sym}</code>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> The critical load is inversely proportional to (KL)². Doubling the
            column length reduces the buckling load by 4×. This is why slender, tall columns are far more
            susceptible to buckling than short, stocky ones.
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          End Conditions and K Factors
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">End Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">K Factor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example Applications</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pcr vs. Pinned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Pinned–Pinned",  "1.0", "Simple trusses, bridge members, braced frames",              "1.0× (baseline)"],
                ["Fixed–Pinned",  "0.7", "Columns with one fixed base and one pinned top",             "2.04× higher"],
                ["Fixed–Fixed",   "0.5", "Fully braced frames, strong foundations both ends",          "4× higher"],
                ["Fixed–Free",    "2.0", "Flag poles, cantilever columns, unbraced cantilevers",       "0.25× (weakest)"],
              ].map(([cond, k, ex, comp]) => (
                <tr key={cond} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{cond}</td>
                  <td className="py-3 px-4 font-mono font-bold text-primary">{k}</td>
                  <td className="py-3 px-4 text-gray-600">{ex}</td>
                  <td className="py-3 px-4 font-medium">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Length</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">I</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">End Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pcr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Steel (E=200 GPa)", "3 m",  "8.5×10⁻⁶ m⁴", "Pinned-Pinned", "1.86 MN"],
                ["Steel (E=200 GPa)", "3 m",  "8.5×10⁻⁶ m⁴", "Fixed-Fixed",   "7.44 MN"],
                ["Aluminum (E=69 GPa)", "2 m", "4×10⁻⁶ m⁴",  "Fixed-Free",    "0.34 MN"],
                ["Steel (E=29 000 ksi)", "10 ft", "100 in⁴",  "Pinned-Pinned", "2 378 kip"],
                ["Concrete (E=25 GPa)", "4 m", "200×10⁻⁶ m⁴","Fixed-Pinned",  "16.5 MN"],
              ].map(([mat, L, I, cond, pcr]) => (
                <tr key={mat + L} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono">{L}</td>
                  <td className="py-3 px-4 font-mono">{I}</td>
                  <td className="py-3 px-4">{cond}</td>
                  <td className="py-3 px-4 font-mono font-bold text-primary">{pcr}</td>
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
            { icon: "🏗️", title: "Structural Steel",    color: "blue",   desc: "Steel columns in building frames must be checked for buckling under floor and roof loads using factored design loads." },
            { icon: "🌉", title: "Bridge Engineering",  color: "green",  desc: "Compression members in trusses and bridge columns are designed with slenderness ratios and effective length factors." },
            { icon: "🏭", title: "Machine Frames",      color: "orange", desc: "Industrial press columns, hydraulic cylinder rods, and machine tool spindles are checked for buckling under operating loads." },
            { icon: "✈️", title: "Aerospace",           color: "purple", desc: "Aircraft fuselage frames and wing spars must withstand compressive loads without buckling at critical flight conditions." },
            { icon: "🏠", title: "Construction",        color: "red",    desc: "Wood and steel studs in wall systems, temporary shoring, and scaffolding columns are designed against buckling." },
            { icon: "🎓", title: "Engineering Education", color: "gray", desc: "Column buckling is a fundamental topic in mechanics of materials and structural analysis courses worldwide." },
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
              q: "What is Euler's buckling formula?",
              a: "Euler's buckling formula, Pcr = π²EI/(KL)², predicts the critical axial compressive load at which a slender, straight column will suddenly deflect sideways and fail elastically. It was derived by Leonhard Euler in 1744.",
            },
            {
              q: "What is the K factor in column buckling?",
              a: "The K factor (effective length factor) accounts for the boundary conditions at each end of the column. K = 1.0 for pinned-pinned, 0.5 for fixed-fixed, 2.0 for fixed-free (cantilever), and 0.7 for fixed-pinned. A lower K means higher buckling resistance.",
            },
            {
              q: "What safety factor should I use for column buckling?",
              a: "For structural steel columns, a safety factor of 1.67–2.0 is typical per AISC. For temporary structures or scaffolding, higher factors (2.5–3.0) are common. Always consult applicable building codes and engineering standards.",
            },
            {
              q: "When does Euler's formula NOT apply?",
              a: "Euler's formula applies to slender columns that fail by elastic buckling before the material yields. For short columns with low slenderness ratios (KL/r < ~100 for steel), material crushing or inelastic buckling governs — use Johnson's parabolic formula or column curves from AISC/AISI.",
            },
            {
              q: "How do I find the moment of inertia for my column?",
              a: "Use our Moment of Inertia Calculator to compute I for standard cross-sections like rectangles, circles, I-beams, pipes, and hollow sections. For standard steel sections, refer to AISC Steel Construction Manual tables.",
            },
            {
              q: "What is the slenderness ratio?",
              a: "The slenderness ratio (KL/r) is the effective length divided by the radius of gyration (r = √(I/A)). A high slenderness ratio (> 120 for steel) indicates a very slender column that is governed by elastic Euler buckling.",
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
