import React from "react";

export default function ThermalExpansionCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Thermal Expansion Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Thermal Expansion Calculator</strong> is an engineering tool that computes how much a
            material changes in size when its temperature changes. All solid materials expand when heated and
            contract when cooled — a property governed by the material&apos;s <strong>coefficient of thermal
            expansion (α)</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports three types of expansion: <strong>linear</strong> (change in length),
            <strong> area</strong> (change in surface area), and <strong>volumetric</strong> (change in
            volume). It covers 18 common engineering materials including steel, aluminum, copper, concrete,
            glass, and plastics, and supports metric and imperial units with Celsius, Fahrenheit, and Kelvin
            temperature inputs.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations run instantly in your browser with no data sent to any server. Results include
            the expansion amount, final dimension, percentage change, and a step-by-step formula breakdown.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Thermal Expansion Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the expansion type: Linear, Area, or Volume",
                "Choose a material from the searchable dropdown (auto-fills α)",
                "Or enter a custom coefficient of thermal expansion",
                "Enter the initial dimension (length, area, or volume)",
                "Select the dimension unit (m, cm, mm, ft, in)",
                "Enter initial and final temperatures",
                "Select the temperature unit (°C, °F, or K)",
                "View instant results with formula breakdown",
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
                "Real-time calculation as you type",
                "18 pre-loaded engineering materials",
                "Searchable material dropdown with α values",
                "Custom coefficient input (supports 1.2e-5 notation)",
                "Metric and imperial unit support",
                "°C, °F, and Kelvin temperature inputs",
                "Compare two materials side by side",
                "Calculation history saved in browser",
                "Export results as TXT report",
                "Engineering notes for each material",
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
          Thermal Expansion Formulas
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "Linear Expansion",
              formula: "ΔL = α × L₀ × ΔT",
              desc: "Calculates the change in length of a material. Used for pipes, beams, rails, and structural members.",
              example: "Steel beam, L₀ = 10 m, α = 12×10⁻⁶/°C, ΔT = 50°C → ΔL = 0.006 m",
            },
            {
              title: "Area Expansion",
              formula: "ΔA = 2α × A₀ × ΔT",
              desc: "Calculates the change in surface area. The factor of 2 accounts for expansion in two dimensions.",
              example: "Aluminum plate, A₀ = 4 m², α = 23×10⁻⁶/°C, ΔT = 100°C → ΔA = 0.0184 m²",
            },
            {
              title: "Volumetric Expansion",
              formula: "ΔV = 3α × V₀ × ΔT",
              desc: "Calculates the change in volume. The factor of 3 accounts for expansion in all three dimensions.",
              example: "Copper tank, V₀ = 2 m³, α = 17×10⁻⁶/°C, ΔT = 75°C → ΔV = 0.00765 m³",
            },
          ].map(({ title, formula, desc, example }) => (
            <div key={title} className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base mb-3">
                {formula}
              </div>
              <p className="text-gray-700 text-sm mb-2">{desc}</p>
              <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">{example}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Thermal Expansion Coefficients Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">α (×10⁻⁶/°C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Common Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Steel",               "12",    "Bridges, buildings, rails, structural frames"],
                ["Stainless Steel",     "17",    "Food processing, medical equipment, marine"],
                ["Aluminum",            "23",    "Aerospace, automotive, window frames"],
                ["Copper",              "17",    "Plumbing, electrical wiring, heat exchangers"],
                ["Brass",               "19",    "Valves, fittings, musical instruments"],
                ["Iron (Cast)",         "11",    "Engine blocks, pipes, machine bases"],
                ["Titanium",            "8.6",   "Aerospace, medical implants, high-performance parts"],
                ["Concrete",            "12",    "Buildings, bridges, pavements"],
                ["Glass (Borosilicate)","3.3",   "Lab equipment, cookware, telescope mirrors"],
                ["Plastic (PVC)",       "52",    "Pipes, fittings, window profiles"],
                ["Invar",               "1.2",   "Precision instruments, clocks, laser components"],
              ].map(([mat, alpha, apps]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{mat}</td>
                  <td className="py-3 px-4 font-mono">{alpha}</td>
                  <td className="py-3 px-4 text-gray-600">{apps}</td>
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
            { icon: "🏗️", title: "Civil Engineers",        color: "blue",   desc: "Design expansion joints in bridges, roads, and large structures to prevent buckling." },
            { icon: "⚙️", title: "Mechanical Engineers",   color: "green",  desc: "Calculate clearances and fits for machine components operating across temperature ranges." },
            { icon: "🔧", title: "HVAC Technicians",       color: "orange", desc: "Size expansion loops and flexible connectors in piping systems for heating and cooling." },
            { icon: "🏭", title: "Manufacturing",          color: "purple", desc: "Account for thermal growth in precision machining, tooling, and assembly processes." },
            { icon: "🎓", title: "Students & Educators",   color: "red",    desc: "Verify textbook problems and explore how different materials respond to temperature." },
            { icon: "🏠", title: "Construction Pros",      color: "gray",   desc: "Plan for thermal movement in cladding, roofing, and structural steel connections." },
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
              q: "What is the coefficient of thermal expansion?",
              a: "The coefficient of thermal expansion (α) measures how much a material's dimensions change per unit length (or area/volume) per degree of temperature change. It is expressed in units of per °C (or per K). A higher α means the material expands more for the same temperature change.",
            },
            {
              q: "What is the difference between linear, area, and volumetric expansion?",
              a: "Linear expansion (ΔL = α·L₀·ΔT) applies to one-dimensional changes like the length of a rod or pipe. Area expansion (ΔA = 2α·A₀·ΔT) applies to two-dimensional surfaces like plates. Volumetric expansion (ΔV = 3α·V₀·ΔT) applies to three-dimensional objects like tanks or blocks.",
            },
            {
              q: "Why does the area formula use 2α and volume use 3α?",
              a: "Because expansion occurs in all dimensions simultaneously. A plate expands in both length and width, so the area coefficient is approximately 2α. A solid expands in length, width, and height, so the volumetric coefficient is approximately 3α. These are first-order approximations valid for small expansions.",
            },
            {
              q: "Can I enter the coefficient in scientific notation?",
              a: "Yes. The calculator accepts standard decimal notation (0.000012) and scientific notation (1.2e-5). Both formats are equivalent and will produce the same result.",
            },
            {
              q: "Why is thermal expansion important in engineering?",
              a: "Unaccounted thermal expansion can cause structural failure, pipe bursts, rail buckling, and precision errors in machinery. Engineers design expansion joints, flexible couplings, and clearances to safely accommodate dimensional changes across operating temperature ranges.",
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
