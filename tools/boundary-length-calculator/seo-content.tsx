import React from "react";

export default function BoundaryLengthCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Boundary Length Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Boundary Length Calculator</strong> is a practical tool that helps you calculate the total perimeter or boundary length of any plot, land, room, or property by entering the side lengths. Whether you're planning a fence, measuring property boundaries, or calculating room perimeters, this calculator provides instant and accurate results.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator supports multiple input modes including manual side entry for irregular shapes, and preset shapes like rectangles, squares, and triangles. It works with all common measurement units including Meter, Feet, Kilometer, Centimeter, and Inch, making it versatile for any measurement system.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations happen instantly in your browser with complete privacy. The tool includes features like calculation history, export options, and real-time updates as you type.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Boundary Length Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select shape mode (Manual, Rectangle, Square, or Triangle)",
                "Choose your measurement unit (Meter, Feet, etc.)",
                "Enter side lengths or dimensions",
                "View instant boundary length calculation",
                "Optionally save to history or export results",
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
                "Multiple shape modes (Manual, Rectangle, Square, Triangle)",
                "Support for 5 measurement units",
                "Dynamic side addition/removal",
                "Calculation breakdown display",
                "Save and export calculation history",
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
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Boundary Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle", "20m × 10m", "60m"],
                ["Square", "15m side", "60m"],
                ["Triangle", "10m, 12m, 8m", "30m"],
                ["Irregular Plot", "15m, 18m, 12m, 20m, 25m", "90m"],
                ["Room", "5m, 8m, 5m, 8m", "26m"],
                ["Land Plot", "100ft, 80ft, 100ft, 80ft", "360ft"],
              ].map(([shape, dims, length]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{dims}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Shape Modes Explained
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Manual Side Entry",
              desc: "Enter any number of sides for irregular shapes. Perfect for plots with varying boundary lengths. Add or remove sides as needed.",
            },
            {
              title: "Rectangle",
              desc: "Enter length and width. Formula: P = 2 × (Length + Width). Ideal for rectangular plots, rooms, or properties.",
            },
            {
              title: "Square",
              desc: "Enter one side length. Formula: P = 4 × Side. Perfect for square plots or rooms with equal sides.",
            },
            {
              title: "Triangle",
              desc: "Enter three side lengths. Formula: P = a + b + c. Useful for triangular plots or land parcels.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Property Owners", desc: "Calculate boundary lengths for fencing, walls, or property planning." },
            { icon: "📐", title: "Surveyors", desc: "Quickly compute perimeters for land surveys and boundary measurements." },
            { icon: "👷", title: "Construction Workers", desc: "Estimate material requirements for boundary walls and fencing." },
            { icon: "🏗️", title: "Civil Engineers", desc: "Calculate perimeters for site planning and infrastructure projects." },
            { icon: "🏛️", title: "Architects", desc: "Measure room perimeters and building boundaries for design work." },
            { icon: "🌾", title: "Farmers", desc: "Calculate field boundaries for fencing and land management." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-blue-800">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Fence Planning",
              desc: "Calculate the total length of fencing needed for your property by entering all boundary sides.",
            },
            {
              title: "Wall Construction",
              desc: "Determine the perimeter for boundary walls, helping estimate materials and costs.",
            },
            {
              title: "Room Measurement",
              desc: "Calculate room perimeters for baseboard, crown molding, or wallpaper installation.",
            },
            {
              title: "Land Survey",
              desc: "Verify boundary measurements and calculate total perimeter for property documentation.",
            },
            {
              title: "Cost Estimation",
              desc: "Use boundary length to estimate costs for fencing, walls, or boundary markers.",
            },
            {
              title: "Property Planning",
              desc: "Plan property layouts and understand boundary dimensions for development projects.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
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
              q: "How is boundary length calculated?",
              a: "Boundary length (perimeter) is calculated by adding all side lengths together. For rectangles: P = 2 × (Length + Width). For squares: P = 4 × Side. For irregular shapes: P = sum of all sides.",
            },
            {
              q: "Can I calculate irregular plot boundaries?",
              a: "Yes. Use the 'Manual Side Entry' mode to enter any number of sides. The calculator will sum all entered values to give you the total boundary length.",
            },
            {
              q: "What units are supported?",
              a: "The calculator supports Meter (m), Feet (ft), Kilometer (km), Centimeter (cm), and Inch (in). All calculations maintain the selected unit throughout.",
            },
            {
              q: "How do I add more sides?",
              a: "In Manual Side Entry mode, click the '➕ Add Side' button to add additional side inputs. You can add unlimited sides for complex shapes.",
            },
            {
              q: "Can I save my calculations?",
              a: "Yes. Click 'Save to History' to store your calculation. History is saved in your browser's localStorage and can be accessed anytime.",
            },
            {
              q: "Is my data private?",
              a: "Absolutely. All calculations happen entirely in your browser. No data is sent to any server. Your measurements remain completely private.",
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
