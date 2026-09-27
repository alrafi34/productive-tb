import ToolFaq from "@/components/ToolFaq";
import { brickCalculatorConfig } from "./config";

export default function BrickCalculatorSEO() {
  const { howToSteps, faq } = brickCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Brick Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The <strong>Brick Calculator</strong> is a professional tool designed to help civil engineers, architects, contractors, and home builders accurately estimate the number of bricks required for wall construction. Eliminate manual calculation errors and reduce material waste with precise, instant calculations.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Real-Time Calculations:</strong> Instant results as you type</li>
          <li><strong>Multiple Unit Support:</strong> Feet and meters</li>
          <li><strong>Brick Size Presets:</strong> US Modular, UK/EU, Queen, King, Utility and traditional sizes</li>
          <li><strong>Wall Thickness Options:</strong> Single wythe (half brick) or double wythe (full brick)</li>
          <li><strong>Mortar Thickness Adjustment:</strong> Customizable mortar joint thickness</li>
          <li><strong>Openings Deduction:</strong> Subtract doors and windows area</li>
          <li><strong>Wastage Factor:</strong> 0-20% adjustable wastage percentage</li>
          <li><strong>Calculation History:</strong> Save and review past calculations</li>
          <li><strong>Export Options:</strong> Download results as text files</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Wall Area:</strong> Length × Height
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Brick Face with Joint:</strong> (Brick Length + Joint) × (Brick Height + Joint)
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Base Bricks:</strong> Wall Area ÷ Brick Face × Number of Wythes
          </p>
          <p className="text-gray-700 font-mono text-sm">
            <strong>Final Bricks:</strong> (Base Bricks - Openings) × (1 + Wastage %)
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculation</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-700 mb-2"><strong>Scenario:</strong> Single-wythe wall 10 ft × 8 ft in US modular brick (7⅝" × 3⅝" × 2¼") with ⅜" joints</p>
          <p className="text-gray-700 mb-1">Wall Area = 10 × 8 = 80 sq ft</p>
          <p className="text-gray-700 mb-1">Brick Face with Joint = 8" × 2⅝" = 21 sq in, so 144 ÷ 21 = 6.86 bricks per sq ft</p>
          <p className="text-gray-700 mb-1">Base Bricks = 80 × 6.86 ≈ 549 bricks</p>
          <p className="text-gray-700 mb-1">With 5% Wastage = 549 × 1.05 ≈ 577 bricks</p>
          <p className="text-gray-700 text-lg font-bold text-primary mt-3">Purchase: 577 bricks</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Standard Brick Sizes</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>US Modular:</strong> 7⅝" × 3⅝" × 2¼" (the most common US brick, 6.75 per sq ft with ⅜" joints)</li>
          <li><strong>UK / EU standard:</strong> 215 × 102.5 × 65 mm (60 per m² with 10 mm joints)</li>
          <li><strong>Queen:</strong> 9⅝" × 2¾" × 2¾"</li>
          <li><strong>King:</strong> 9⅝" × 2¾" × 2⅝"</li>
          <li><strong>Utility:</strong> 11⅝" × 3⅝" × 3⅝"</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Wall Thickness Guide</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Single wythe (half brick):</strong> One layer of brick, as in brick veneer on a framed house or a UK cavity wall leaf</li>
          <li><strong>Double wythe (full brick):</strong> Two layers bonded together, for solid load-bearing and garden walls</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Mortar Joint Thickness</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Standard:</strong> ⅜ inch in the US, 10 mm in the UK and Europe</li>
          <li><strong>Thin Joint:</strong> ¼ inch or 3 mm (precision and thin-joint masonry)</li>
          <li><strong>Thick Joint:</strong> ½ inch or more (rustic appearance, irregular bricks)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Wastage Guidelines</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>5%:</strong> Experienced masons, simple walls</li>
          <li><strong>10%:</strong> Standard projects (recommended)</li>
          <li><strong>15%:</strong> Complex designs, inexperienced workers</li>
          <li><strong>20%:</strong> Intricate patterns, high breakage risk</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tips for Accurate Estimates</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Measure wall dimensions carefully and accurately</li>
          <li>Verify actual brick dimensions with supplier specifications</li>
          <li>Account for all openings (doors, windows, vents)</li>
          <li>Add appropriate wastage based on project complexity</li>
          <li>Consider ordering extra bricks for future repairs</li>
          <li>Check mortar joint thickness with your mason</li>
          <li>Account for corners and special features</li>
          <li>Verify brick availability before finalizing quantity</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Residential Construction:</strong> House walls and partitions</li>
          <li><strong>Garden Walls:</strong> Boundary and retaining walls</li>
          <li><strong>Commercial Buildings:</strong> Office and retail structures</li>
          <li><strong>Renovation Projects:</strong> Wall extensions and repairs</li>
          <li><strong>Landscaping:</strong> Decorative brick features</li>
          <li><strong>Fireplace Construction:</strong> Indoor and outdoor fireplaces</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <p className="text-gray-700 mb-4">
          Manual brick calculations are complex and error-prone, especially when accounting for mortar joints, wall thickness, and openings. This calculator provides instant, accurate estimates based on industry-standard formulas, helping you purchase the right quantity of bricks the first time. Whether you're a professional contractor or a DIY builder, this tool saves time, reduces waste, and prevents costly shortages or excess inventory.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-green-900 font-semibold mb-2">💡 Pro Tip:</p>
          <p className="text-green-800 text-sm">
            Always purchase bricks from the same batch to ensure consistent color, texture, and dimensions. Bricks from different production runs may have slight variations. Order 5-10% extra beyond the calculated amount for future repairs and replacements, as the exact brick may be discontinued later.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
          <p className="text-yellow-900 font-semibold mb-2">⚠️ Important Note:</p>
          <p className="text-yellow-800 text-sm">
            This calculator provides estimates based on standard rectangular brick layouts. For complex patterns (herringbone, basket weave), curved walls, or structures with many architectural features, consult with a professional mason for more accurate quantities. Always verify brick dimensions and mortar specifications with your supplier before purchasing.
          </p>
        </div>

      </div>
      <ToolFaq items={faq} />
    </div>
  );
}
