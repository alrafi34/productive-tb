import React from "react";

export default function PolygonAreaCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Polygon Area Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Polygon Area Calculator</strong> is a geometry tool that calculates the area of any irregular polygon shape — including land plots, fields, property boundaries, and construction sites — using vertex coordinates. Unlike simple rectangle or triangle calculators, it handles any number of sides and any shape, making it ideal for real-world land measurement.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This tool uses the <strong>Shoelace Formula</strong> (also called the Surveyor&apos;s Formula), which is the standard mathematical method for computing polygon area from a list of vertex coordinates. The formula works for any simple polygon — convex or concave — with any number of vertices.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can either click directly on the interactive canvas to place polygon points, or enter coordinates manually in text mode. The area updates in real time as you add or drag points, and results are instantly converted to square feet, square meters, acres, hectares, and more.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Polygon Area Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Canvas Mode</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Click anywhere on the canvas to place a vertex",
                "Continue clicking to add more points (minimum 3)",
                "Drag any point to adjust the polygon shape",
                "Use Undo/Redo to correct mistakes",
                "Set the scale (1 unit = X meters/feet) for real-world area",
                "Select your preferred output unit",
                "View the live area result and all unit conversions",
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Text Mode</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Switch to Text mode using the tab above the canvas",
                "Enter one coordinate pair per line: x, y",
                "Use decimal values for precision (e.g. 10.5, 23.7)",
                "Click Apply Coordinates to plot on canvas",
                "The polygon is auto-fitted to the canvas view",
                "Adjust scale and output unit as needed",
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
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          The Shoelace Formula Explained
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Step</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Operation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example (Square 10×10)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "List vertices in order", "(0,0), (10,0), (10,10), (0,10)"],
                ["2", "Multiply xᵢ × yᵢ₊₁", "0×0 + 10×10 + 10×10 + 0×0 = 200"],
                ["3", "Multiply yᵢ × xᵢ₊₁", "0×10 + 0×10 + 10×0 + 10×0 = 0"],
                ["4", "Subtract and halve", "½ × |200 − 0| = 100"],
                ["5", "Result", "Area = 100 square units"],
              ].map(([step, op, ex]) => (
                <tr key={step} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-primary">{step}</td>
                  <td className="py-3 px-4 font-medium">{op}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Polygon Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Vertices</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area (units²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Square",          "(0,0)(10,0)(10,10)(0,10)",                    "100"],
                ["Rectangle",       "(0,0)(20,0)(20,8)(0,8)",                      "160"],
                ["Triangle",        "(0,0)(10,0)(5,8)",                            "40"],
                ["L-Shape",         "(0,0)(6,0)(6,4)(10,4)(10,10)(0,10)",          "76"],
                ["Irregular 5-gon", "(0,0)(8,3)(12,9)(5,12)(1,8)",                "92.5"],
              ].map(([shape, verts, area]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{shape}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{verts}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{area}</td>
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
            { icon: "📐", title: "Land Surveyors",    desc: "Calculate irregular plot areas from GPS or field-measured coordinates." },
            { icon: "🌾", title: "Farmers",           desc: "Measure field and crop areas for planning, irrigation, and yield estimation." },
            { icon: "👷", title: "Civil Engineers",   desc: "Compute site areas for grading, drainage, and construction planning." },
            { icon: "🏗️", title: "Architects",        desc: "Calculate floor plan areas and irregular building footprints." },
            { icon: "🏠", title: "Property Buyers",   desc: "Verify land area from survey maps before purchasing property." },
            { icon: "🎓", title: "Students",          desc: "Learn and verify polygon area calculations for geometry coursework." },
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
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the Shoelace formula?",
              a: "The Shoelace formula (Surveyor's formula) calculates the area of any simple polygon given its vertex coordinates. The formula is: Area = ½ × |Σ(xᵢyᵢ₊₁ − yᵢxᵢ₊₁)|. It works for any polygon — convex, concave, or irregular — as long as the vertices are listed in order and the polygon does not self-intersect.",
            },
            {
              q: "How do I get real-world area from canvas coordinates?",
              a: "Use the Scale setting. If 1 canvas unit represents 5 meters, set scale to 5 and unit to 'm'. The calculator multiplies the raw canvas area by scale² to get the real-world area in square meters, then converts to your selected output unit.",
            },
            {
              q: "Can I calculate area for a self-intersecting polygon?",
              a: "The Shoelace formula gives the net signed area for self-intersecting polygons, which may not match the visual area. For accurate results, ensure your polygon vertices are listed in order (clockwise or counterclockwise) without crossing edges.",
            },
            {
              q: "How do I enter GPS coordinates?",
              a: "Switch to Text mode and enter your GPS coordinates as decimal degrees (e.g. longitude, latitude pairs). The calculator will compute the area in canvas units, which you can scale to real-world area using the scale factor.",
            },
            {
              q: "What is snap-to-grid?",
              a: "When snap-to-grid is enabled, points you place on the canvas automatically snap to the nearest grid intersection. This makes it easier to create precise shapes with clean coordinates.",
            },
            {
              q: "Can I export the polygon coordinates?",
              a: "Yes. Use the Export section to download coordinates as CSV, the full result as JSON, a text report as TXT, or a PNG image of the canvas visualization.",
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
