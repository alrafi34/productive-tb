export default function CarbonFootprintCalculatorConstructionSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-12">
      
      {/* Introduction Section */}
      <section className="prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Construction Carbon Footprint Calculator – Estimate CO₂ Emissions from Building Materials</h2>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          Calculate the carbon footprint of your construction project instantly. This free online tool helps 
          architects, engineers, and construction planners estimate CO₂ emissions from common building materials 
          like cement, steel, concrete, and more. Make data-driven decisions for sustainable construction.
        </p>
      </section>

      {/* What is Section */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Construction Carbon Footprint?</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Construction carbon footprint refers to the total amount of CO₂ emissions generated from the production, 
          transportation, and use of building materials. Understanding and reducing embodied carbon is crucial for 
          sustainable construction and meeting environmental goals.
        </p>
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-900 font-medium">
            💡 <strong>Did you know?</strong> The construction industry accounts for approximately 39% of global 
            carbon emissions, with embodied carbon representing 11% of that total.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h3>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Enter Material Quantities</h4>
                <p className="text-sm text-gray-600">Input the quantity of each construction material you plan to use in your project</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Select Emission Factors</h4>
                <p className="text-sm text-gray-600">Choose from preset materials or customize emission factors for accuracy</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">View Real-Time Results</h4>
                <p className="text-sm text-gray-600">See instant CO₂ calculations with visual breakdowns and percentage contributions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Export & Save</h4>
                <p className="text-sm text-gray-600">Download results as CSV or text file for documentation and reporting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Emission Factors */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Building Materials and Their Emission Factors</h3>
        <div className="overflow-x-auto not-prose">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Material</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Emission Factor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Impact Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Cement</td>
                <td className="px-6 py-4 text-gray-700 font-mono">0.9 kg CO₂/kg</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">High</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Calcination process releases significant CO₂</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Concrete</td>
                <td className="px-6 py-4 text-gray-700 font-mono">300 kg CO₂/m³</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">Medium-High</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Varies by mix design and cement content</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Steel</td>
                <td className="px-6 py-4 text-gray-700 font-mono">1.9 kg CO₂/kg</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">Medium-High</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Primary steel; recycled steel is much lower</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Aluminum</td>
                <td className="px-6 py-4 text-gray-700 font-mono">8.2 kg CO₂/kg</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">Very High</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Extremely energy-intensive production</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Glass</td>
                <td className="px-6 py-4 text-gray-700 font-mono">1.0 kg CO₂/kg</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Medium</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">High temperature manufacturing</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Bricks</td>
                <td className="px-6 py-4 text-gray-700 font-mono">0.25 kg CO₂/unit</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Medium</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Depends on firing temperature</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Wood</td>
                <td className="px-6 py-4 text-gray-700 font-mono">0.2 kg CO₂/kg</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Low</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Carbon sink; stores CO₂ during growth</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Calculate Construction Carbon Footprint?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Environmental Compliance</h4>
              <p className="text-sm text-gray-700">Meet green building standards like LEED, BREEAM, and local regulations</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Cost Optimization</h4>
              <p className="text-sm text-gray-700">Identify high-emission materials and find cost-effective alternatives</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Sustainability Goals</h4>
              <p className="text-sm text-gray-700">Track progress toward net-zero and carbon-neutral targets</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Client Reporting</h4>
              <p className="text-sm text-gray-700">Provide transparent, data-backed carbon footprint reports</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Material Selection</h4>
              <p className="text-sm text-gray-700">Make informed decisions about eco-friendly material alternatives</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Competitive Advantage</h4>
              <p className="text-sm text-gray-700">Win bids with demonstrated sustainability commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reduction Tips */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">10 Proven Strategies to Reduce Construction Carbon Footprint</h3>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          {[
            { title: "Use Recycled Materials", desc: "Incorporate reclaimed steel, recycled concrete, and salvaged materials" },
            { title: "Optimize Structural Design", desc: "Reduce material usage through efficient engineering and design" },
            { title: "Source Locally", desc: "Minimize transportation emissions by using local suppliers" },
            { title: "Choose Low-Carbon Alternatives", desc: "Replace cement with fly ash, slag, or other SCMs" },
            { title: "Use Timber Construction", desc: "Consider mass timber as a carbon-storing alternative to concrete" },
            { title: "Implement Prefabrication", desc: "Reduce waste and improve efficiency with off-site construction" },
            { title: "Specify EPD Products", desc: "Choose materials with verified Environmental Product Declarations" },
            { title: "Design for Longevity", desc: "Build durable structures that require less frequent replacement" },
            { title: "Plan for Deconstruction", desc: "Design for future material recovery and reuse" },
            { title: "Monitor and Report", desc: "Track carbon metrics throughout the project lifecycle" }
          ].map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-gray-600">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embodied Carbon */}
      <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Embodied Carbon</h3>
        <p className="text-gray-700 mb-6">
          Embodied carbon represents all greenhouse gas emissions associated with materials and construction 
          processes throughout a building's lifecycle:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { phase: "A1-A3: Product Stage", items: ["Raw material extraction", "Transportation to factory", "Manufacturing"] },
            { phase: "A4-A5: Construction", items: ["Transportation to site", "Construction process", "Installation"] },
            { phase: "B-C: Use & End of Life", items: ["Maintenance & replacement", "Demolition", "Disposal or recycling"] }
          ].map((stage, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{stage.phase}</h4>
              <ul className="space-y-2">
                {stage.items.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Green Certifications */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Green Building Certifications</h3>
        <p className="text-gray-700 mb-4">
          Many green building certification programs now require or reward carbon footprint calculations:
        </p>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">LEED</h4>
            <p className="text-sm text-gray-600 mb-2">Leadership in Energy and Environmental Design</p>
            <p className="text-xs text-gray-500">Points awarded for embodied carbon reduction and EPD usage</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">BREEAM</h4>
            <p className="text-sm text-gray-600 mb-2">Building Research Establishment Environmental Assessment</p>
            <p className="text-xs text-gray-500">Credits for life cycle assessment and material selection</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Green Star</h4>
            <p className="text-sm text-gray-600 mb-2">Australian Green Building Rating System</p>
            <p className="text-xs text-gray-500">Points for responsible material sourcing and carbon reduction</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Living Building Challenge</h4>
            <p className="text-sm text-gray-600 mb-2">Most Rigorous Green Building Standard</p>
            <p className="text-xs text-gray-500">Requires net-positive carbon impact over building lifetime</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4 not-prose">
          {[
            {
              q: "How accurate are the emission factors?",
              a: "The emission factors provided are industry averages based on published research and databases like ICE (Inventory of Carbon & Energy) and EPDs. Actual values may vary by ±20-30% depending on manufacturing processes, regional energy sources, and transportation distances. For precise calculations, use manufacturer-specific Environmental Product Declarations (EPDs)."
            },
            {
              q: "Can I add custom materials?",
              a: "Yes! Click 'Add Material' to include custom materials with your own emission factors. You can also modify the emission factors of preset materials to match specific product EPDs or regional data."
            },
            {
              q: "What units are supported?",
              a: "The calculator supports various units including kg (kilograms), m³ (cubic meters), liters, and units (for countable items like bricks). You can customize units for each material to match your project specifications and regional standards."
            },
            {
              q: "How do I reduce my construction carbon footprint?",
              a: "Focus on the highest contributors first (usually cement, steel, and concrete). Replace high-carbon materials with alternatives like timber, recycled materials, or low-carbon concrete mixes. Optimize structural design to use less material overall, and source materials locally to reduce transportation emissions."
            },
            {
              q: "What's the difference between embodied and operational carbon?",
              a: "Embodied carbon refers to emissions from materials and construction, while operational carbon comes from building energy use during occupancy. Both are important for achieving net-zero buildings, with embodied carbon becoming increasingly significant as operational efficiency improves."
            },
            {
              q: "Can I export my calculations?",
              a: "Yes! You can export your results as CSV for spreadsheet analysis or as a text file for documentation. The export includes all materials, quantities, emission factors, and total CO₂ calculations."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                <span className="text-primary">Q:</span>
                {faq.q}
              </h4>
              <p className="text-sm text-gray-700 pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl p-8 border border-primary/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Construction & Sustainability Calculators</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Green Building Score Calculator", desc: "Evaluate overall sustainability" },
            { name: "Energy Efficiency Calculator", desc: "Assess building energy performance" },
            { name: "Sustainability Index Calculator", desc: "Comprehensive sustainability metrics" },
            { name: "Material Cost Calculator", desc: "Estimate material expenses" },
            { name: "Construction Cost Estimator", desc: "Total project cost analysis" },
            { name: "Concrete Volume Calculator", desc: "Calculate concrete requirements" }
          ].map((tool, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</h4>
              <p className="text-xs text-gray-600">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
