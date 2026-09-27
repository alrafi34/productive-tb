import ToolFaq from "@/components/ToolFaq";
import { sustainabilityIndexCalculatorConfig } from "./config";

export default function SustainabilityIndexCalculatorSEO() {
  const { howToSteps, faq } = sustainabilityIndexCalculatorConfig.seo;
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Sustainability Index Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Sustainability Index Calculator</strong> is a comprehensive tool designed to evaluate the environmental performance of buildings based on multiple key sustainability factors. This free online calculator helps architects, engineers, sustainability consultants, and property developers assess how environmentally responsible a building design or existing structure is.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By analyzing energy efficiency, water usage, material sustainability, waste management, and indoor environmental quality, this tool provides a composite sustainability score that enables quick assessment and comparison of building performance against green building standards.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Sustainability Index Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The calculator uses a weighted scoring model to evaluate five critical sustainability metrics:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Energy Efficiency (30%):</strong> Evaluates insulation quality, HVAC performance, lighting efficiency, and overall energy consumption patterns.
          </li>
          <li>
            <strong>Water Efficiency (20%):</strong> Assesses water conservation measures including low-flow fixtures, rainwater harvesting, and water recycling systems.
          </li>
          <li>
            <strong>Material Sustainability (20%):</strong> Considers use of recycled materials, local sourcing, low embodied energy, and sustainable material choices.
          </li>
          <li>
            <strong>Waste Management (15%):</strong> Evaluates recycling programs, composting systems, construction waste reduction, and design for deconstruction.
          </li>
          <li>
            <strong>Indoor Environmental Quality (15%):</strong> Measures air quality, natural lighting, ventilation, thermal comfort, and use of low-VOC materials.
          </li>
        </ul>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Sustainability Index Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Sustainability Index = (Energy × 0.30) + (Water × 0.20) + (Materials × 0.20) + (Waste × 0.15) + (Indoor × 0.15)
        </div>
        <p className="text-gray-700 text-sm">
          Each metric is scored from 0 to 100, and the weighted contributions are summed to produce an overall sustainability score.
        </p>
      </section>

      {/* Rating System */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sustainability Rating System
        </h2>
        <div className="grid md:grid-cols-3 gap-4 not-prose">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-600 font-bold text-lg mb-2">0-39 Points</div>
            <div className="text-gray-900 font-semibold mb-1">Low Sustainability</div>
            <p className="text-sm text-gray-600">
              Significant improvements needed across multiple sustainability metrics.
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-600 font-bold text-lg mb-2">40-69 Points</div>
            <div className="text-gray-900 font-semibold mb-1">Moderate Sustainability</div>
            <p className="text-sm text-gray-600">
              Good baseline performance with room for targeted improvements.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-green-600 font-bold text-lg mb-2">70-100 Points</div>
            <div className="text-gray-900 font-semibold mb-1">High Sustainability</div>
            <p className="text-sm text-gray-600">
              Excellent environmental performance suitable for green building certification.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">🏗️ Design Phase Assessment</h3>
            <p className="text-sm text-gray-700">
              Evaluate sustainability performance during early design stages to make informed decisions about building systems and materials.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">🏢 Existing Building Audit</h3>
            <p className="text-sm text-gray-700">
              Assess current sustainability performance of existing buildings to identify improvement opportunities and prioritize upgrades.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">📊 Green Certification Prep</h3>
            <p className="text-sm text-gray-700">
              Prepare for LEED, BREEAM, or other green building certifications by understanding your baseline sustainability performance.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">📈 Portfolio Comparison</h3>
            <p className="text-sm text-gray-700">
              Compare sustainability performance across multiple buildings in a real estate portfolio to identify best practices and underperformers.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Assessment:</strong> Get immediate sustainability scores without complex calculations</li>
          <li>✓ <strong>Comprehensive Evaluation:</strong> Covers all major sustainability dimensions in one tool</li>
          <li>✓ <strong>Actionable Insights:</strong> Receive specific recommendations for improvement</li>
          <li>✓ <strong>Preset Scenarios:</strong> Compare against standard building types and green building benchmarks</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed reports for stakeholders and documentation</li>
          <li>✓ <strong>History Tracking:</strong> Save and compare multiple assessments over time</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation or subscription required</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Tips for Improving Your Sustainability Score
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Energy Efficiency:</strong> Upgrade to LED lighting, improve insulation, install high-efficiency HVAC systems, and consider renewable energy sources like solar panels.</p>
          <p><strong>Water Conservation:</strong> Install low-flow fixtures, implement rainwater harvesting, use drought-resistant landscaping, and consider greywater recycling systems.</p>
          <p><strong>Sustainable Materials:</strong> Choose materials with recycled content, prioritize local sourcing to reduce transportation emissions, and select materials with low embodied energy.</p>
          <p><strong>Waste Reduction:</strong> Implement comprehensive recycling programs, design for deconstruction and material reuse, and minimize construction waste through careful planning.</p>
          <p><strong>Indoor Quality:</strong> Maximize natural daylighting, ensure proper ventilation, use low-VOC paints and finishes, and maintain comfortable thermal conditions.</p>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Related Topics */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Sustainability Topics
        </h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose text-sm">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Green Building Certifications</h4>
            <p className="text-gray-600">LEED, BREEAM, Green Star, Living Building Challenge</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Energy Performance</h4>
            <p className="text-gray-600">Net-zero energy, passive house, energy modeling</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Sustainable Materials</h4>
            <p className="text-gray-600">Embodied carbon, life cycle assessment, circular economy</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Indoor Environmental Quality</h4>
            <p className="text-gray-600">IAQ standards, thermal comfort, biophilic design</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>How to Use the Sustainability Index Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
