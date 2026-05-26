import React from "react";

export default function FenceMaterialCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Fence Material Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Fence Material Calculator</strong> is a practical planning tool that estimates the exact materials needed for a fencing project — including fence panels, posts, concrete bags, and rails — based on your fence length, height, post spacing, and fence type. It eliminates guesswork and helps you purchase the right amount of materials before starting your project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator supports five common fence types: Wood, Vinyl, Chain Link, Metal, and Privacy fences. Each type has smart defaults for panel width, rails per panel, and concrete per post. You can also switch between straight fence mode and full perimeter mode for complete property fencing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A built-in waste percentage slider (0–20%) adds a material buffer to account for cutting errors and installation waste. All calculations happen instantly in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fence Material Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your fence type (Wood, Vinyl, Chain Link, etc.)",
                "Choose your unit (Feet or Meters)",
                "Enter fence length or property dimensions for perimeter mode",
                "Set fence height and panel/post spacing",
                "Optionally enable gate and enter gate width",
                "Adjust waste percentage with the slider",
                "View instant material estimates",
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
                "5 fence types with smart defaults",
                "Straight fence and full perimeter modes",
                "Gate support with extra post calculation",
                "Waste percentage adjustment (0–20%)",
                "Quick presets for common fence sizes",
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
          Calculation Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example (100 ft, 8 ft spacing)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Fence Panels",  "⌈Length ÷ Panel Width⌉",          "⌈100 ÷ 8⌉ = 13 panels"],
                ["Fence Posts",   "Panels + 1",                       "13 + 1 = 14 posts"],
                ["Concrete Bags", "Posts × Bags per Post",            "14 × 2 = 28 bags"],
                ["Rails",         "Panels × Rails per Panel",         "13 × 2 = 26 rails"],
                ["With Waste",    "Material × (1 + Waste%)",          "13 × 1.10 = 15 panels"],
                ["Perimeter",     "2 × (Width + Length)",             "2 × (50 + 70) = 240 ft"],
              ].map(([mat, formula, example]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{mat}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{formula}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Fence Type Defaults
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fence Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Panel Width</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rails / Panel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Concrete / Post</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Wood Fence",       "8 ft",  "2", "2 bags"],
                ["Vinyl Fence",      "8 ft",  "3", "2 bags"],
                ["Chain Link Fence", "10 ft", "1", "1 bag"],
                ["Metal Fence",      "6 ft",  "2", "2 bags"],
                ["Privacy Fence",    "8 ft",  "3", "2 bags"],
              ].map(([type, pw, rails, concrete]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{type}</td>
                  <td className="py-3 px-4 font-mono">{pw}</td>
                  <td className="py-3 px-4 font-mono">{rails}</td>
                  <td className="py-3 px-4 font-mono">{concrete}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Panels</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Posts</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Concrete Bags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["100 ft Wood Fence (8 ft spacing)",       "13",  "14", "28"],
                ["200 ft Chain Link (10 ft spacing)",      "20",  "21", "21"],
                ["150 ft Privacy Fence (8 ft spacing)",    "19",  "20", "40"],
                ["50×70 ft Perimeter Wood Fence",          "30",  "31", "62"],
                ["120 ft Vinyl Fence (8 ft spacing)",      "15",  "16", "32"],
              ].map(([project, panels, posts, concrete]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{panels}</td>
                  <td className="py-3 px-4 font-mono">{posts}</td>
                  <td className="py-3 px-4 font-mono">{concrete}</td>
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
            { icon: "🏠", title: "Homeowners",    desc: "Plan backyard or front yard fencing projects with accurate material estimates." },
            { icon: "👷", title: "Contractors",   desc: "Generate quick material estimates for client quotes and job planning." },
            { icon: "🌿", title: "Landscapers",   desc: "Calculate fencing materials for garden borders and property boundaries." },
            { icon: "🌾", title: "Farmers",       desc: "Estimate perimeter fencing for fields, pastures, and livestock enclosures." },
            { icon: "🏗️", title: "Developers",    desc: "Plan fencing for residential and commercial development projects." },
            { icon: "🔨", title: "DIY Builders",  desc: "Get accurate material lists before heading to the hardware store." },
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
              q: "How are fence panels calculated?",
              a: "Panels = ⌈Fence Length ÷ Panel Width⌉. The ceiling function rounds up to ensure full coverage. For example, 100 ft ÷ 8 ft = 12.5, rounded up to 13 panels.",
            },
            {
              q: "Why do I need one more post than panels?",
              a: "Each panel requires a post on each end. For a straight fence with N panels, you need N+1 posts — one at the start, one between each panel, and one at the end.",
            },
            {
              q: "What does the waste percentage do?",
              a: "The waste percentage adds extra material to account for cutting errors, damaged pieces, and installation mistakes. A 10% waste factor on 13 panels gives you 15 panels to purchase.",
            },
            {
              q: "How does perimeter mode work?",
              a: "In perimeter mode, enter your property width and length. The calculator computes the total perimeter as 2 × (Width + Length) and uses that as the fence length.",
            },
            {
              q: "How are concrete bags estimated?",
              a: "Concrete bags are estimated per post based on fence type. Wood, vinyl, metal, and privacy fences use 2 bags per post. Chain link uses 1 bag per post.",
            },
            {
              q: "Does the gate affect the calculation?",
              a: "Yes. When a gate is included, the gate width is subtracted from the fenced length (reducing panels needed), and 2 extra gate posts are added to the post count.",
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
