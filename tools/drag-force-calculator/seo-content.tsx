import React from "react";

export default function DragForceCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Drag Force Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Drag Force Calculator</strong> is an engineering and physics tool that computes the
            resistive force an object experiences when moving through a fluid — air, water, or any other medium.
            Drag is a fundamental concept in aerodynamics, hydrodynamics, automotive engineering, and sports science.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard drag equation is <strong>F = ½ × ρ × v² × Cd × A</strong>, where F is the drag force
            in Newtons, ρ (rho) is the fluid density in kg/m³, v is the object velocity in m/s, Cd is the
            dimensionless drag coefficient, and A is the frontal cross-sectional area in m².
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports air and water presets, multiple velocity units (m/s, km/h, mph, ft/s),
            and a library of common drag coefficient values for vehicles, athletes, and geometric shapes.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Drag Force Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a fluid type — Air, Water, or Custom",
                "Enter the object velocity and choose a unit (m/s, km/h, mph, ft/s)",
                "Confirm or adjust the fluid density (auto-filled for Air and Water)",
                "Enter or select a drag coefficient (Cd) from the preset library",
                "Enter the frontal cross-sectional area in m²",
                "View the drag force result instantly in N, kN, and lbf",
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
                "Air and water fluid presets with auto-fill density",
                "10 drag coefficient presets for common objects",
                "4 velocity unit options — m/s, km/h, mph, ft/s",
                "Multi-unit output — N, kN, lbf",
                "Live formula display with your actual values",
                "Quick scenario presets (car, cyclist, sphere, swimmer)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Copy result to clipboard",
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
          Drag Force Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="font-mono text-xl text-center bg-white border border-gray-200 rounded-lg p-4 mb-4">
              F = ½ × ρ × v² × Cd × A
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { sym: "F",  color: "blue",   label: "Drag Force",      desc: "Resistive force in Newtons (N) opposing motion" },
                { sym: "ρ",  color: "orange", label: "Fluid Density",   desc: "Mass per unit volume in kg/m³ (Air = 1.225, Water = 1000)" },
                { sym: "v²", color: "green",  label: "Velocity²",       desc: "Speed squared in m²/s² — drag grows quadratically with speed" },
                { sym: "Cd", color: "purple", label: "Drag Coefficient", desc: "Dimensionless shape factor (0.04 airfoil → 1.28 flat plate)" },
              ].map(({ sym, color, label, desc }) => (
                <div key={sym} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg text-center`}>
                  <div className={`font-mono text-lg font-bold text-${color}-800 mb-1`}>{sym}</div>
                  <div className={`font-semibold text-${color}-800 text-xs uppercase mb-1`}>{label}</div>
                  <div className={`text-${color}-700 text-xs`}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Velocity squared effect:</strong> Because drag force is proportional to v², doubling the
            speed quadruples the drag force. At highway speeds, aerodynamic drag is the dominant resistance
            force on a vehicle — far exceeding rolling resistance.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Object</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cd</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area (m²)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Drag Force</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Sphere in air",       "20 m/s",   "0.47", "0.50",  "57.6 N"],
                ["Car at 100 km/h",     "100 km/h", "0.30", "2.20",  "300.2 N"],
                ["Cyclist at 30 km/h",  "30 km/h",  "0.90", "0.45",  "56.3 N"],
                ["Skydiver (freefall)", "55 m/s",   "1.00", "0.70",  "2,893 N"],
                ["Swimmer in water",    "2 m/s",    "0.90", "0.07",  "126 N"],
                ["Flat plate in air",   "10 m/s",   "1.28", "1.00",  "78.4 N"],
              ].map(([obj, vel, cd, area, force]) => (
                <tr key={obj} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{obj}</td>
                  <td className="py-3 px-4 font-mono">{vel}</td>
                  <td className="py-3 px-4 font-mono">{cd}</td>
                  <td className="py-3 px-4 font-mono">{area}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{force}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Drag Coefficient Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Object / Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cd</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Streamlined airfoil",    "0.04",  "Highly optimized aerodynamic profile"],
                ["Modern sports car",      "0.25",  "Low-drag production vehicle"],
                ["Typical sedan",          "0.30",  "Average passenger car"],
                ["SUV / crossover",        "0.40",  "Higher frontal area and blunter shape"],
                ["Sphere",                 "0.47",  "Standard reference shape"],
                ["Bicycle (aero tuck)",    "0.63",  "Rider in aerodynamic position"],
                ["Upright cyclist",        "0.90",  "Rider sitting upright"],
                ["Skydiver (spread)",      "1.00",  "Spread-eagle freefall position"],
                ["Cube",                   "1.05",  "Blunt flat-faced body"],
                ["Flat plate (normal)",    "1.28",  "Plate perpendicular to flow"],
              ].map(([obj, cd, note]) => (
                <tr key={obj} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{obj}</td>
                  <td className="py-3 px-4 font-mono font-semibold">{cd}</td>
                  <td className="py-3 px-4 text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Drag Force
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🚗", title: "Automotive Engineering",  color: "blue",   desc: "Car manufacturers optimize body shapes to minimize Cd, reducing fuel consumption and increasing top speed. A 10% reduction in Cd can improve highway fuel economy by ~5%." },
            { icon: "✈️", title: "Aerospace & Aviation",    color: "green",  desc: "Aircraft wing and fuselage design is dominated by drag minimization. Drag directly determines fuel burn, range, and operating cost for commercial flights." },
            { icon: "🚴", title: "Cycling & Sports",        color: "orange", desc: "Aerodynamic drag accounts for over 90% of resistance at speeds above 30 km/h. Aero helmets, skin suits, and tuck positions all reduce Cd and frontal area." },
            { icon: "🌊", title: "Marine & Hydrodynamics",  color: "purple", desc: "Ship hull design, submarine profiles, and underwater vehicle shapes are optimized using drag equations with water density (1000 kg/m³)." },
            { icon: "🚀", title: "Rocket & Drone Design",   color: "red",    desc: "Drag is a critical factor in rocket trajectory calculations and drone endurance. Nose cone shapes and body fineness ratios are tuned to minimize drag." },
            { icon: "🎓", title: "Physics Education",       color: "gray",   desc: "The drag equation is a core topic in fluid mechanics and classical physics, illustrating the relationship between velocity, density, and resistive forces." },
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
              q: "What is drag force?",
              a: "Drag force is the resistive force that opposes the motion of an object moving through a fluid (gas or liquid). It acts in the direction opposite to the object's velocity and is caused by pressure differences and surface friction between the object and the fluid.",
            },
            {
              q: "Why does drag force increase with the square of velocity?",
              a: "As an object moves faster, it collides with more fluid molecules per second (linear increase) and each collision transfers more momentum (another linear increase). These two effects multiply together, resulting in a quadratic (v²) relationship. This is why aerodynamics become critical at high speeds.",
            },
            {
              q: "What is the drag coefficient (Cd)?",
              a: "The drag coefficient is a dimensionless number that quantifies how aerodynamically efficient a shape is. A lower Cd means less drag for the same frontal area and speed. Streamlined shapes like airfoils have Cd ≈ 0.04, while blunt shapes like flat plates have Cd ≈ 1.28.",
            },
            {
              q: "What is frontal area and how do I measure it?",
              a: "Frontal area (A) is the cross-sectional area of the object projected onto a plane perpendicular to the direction of motion. For a car, it is roughly the width × height of the front face. For a cyclist, it is the projected area of the rider and bike as seen from the front.",
            },
            {
              q: "What fluid density should I use for air?",
              a: "Standard air at sea level and 15°C has a density of 1.225 kg/m³. At higher altitudes, air density decreases — at 3,000 m it is about 0.909 kg/m³. Temperature also affects density: warmer air is less dense. For most engineering calculations, 1.225 kg/m³ is the standard reference value.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses the standard drag equation with exact unit conversion factors. Results are accurate to the selected decimal precision. For safety-critical or high-precision applications, always verify with a licensed engineer and consider additional factors like Reynolds number effects and turbulence.",
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
