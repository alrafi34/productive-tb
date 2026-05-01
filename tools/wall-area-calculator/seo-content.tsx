export default function WallAreaCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Wall Area Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The <strong>Wall Area Calculator</strong> is a professional tool designed for architects, contractors, painters, and homeowners to accurately calculate wall surface areas for construction, painting, tiling, or renovation projects.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Multiple Walls Support:</strong> Add unlimited walls with individual dimensions</li>
          <li><strong>Opening Deductions:</strong> Subtract doors and windows for accurate net area</li>
          <li><strong>Real-Time Calculations:</strong> Instant results as you type</li>
          <li><strong>Unit Flexibility:</strong> Support for both feet and meters</li>
          <li><strong>Export Options:</strong> Download results as CSV or text files</li>
          <li><strong>Auto-Save:</strong> Your data is automatically saved locally</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Select your preferred measurement unit (feet or meters)</li>
          <li>Add walls by clicking "Add Wall" and enter width and height</li>
          <li>Add doors and windows by clicking "Add Door/Window"</li>
          <li>View the net paintable area in the summary panel</li>
          <li>Export your calculations for documentation</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Wall Area</strong> = Width × Height
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Total Wall Area</strong> = Sum of all wall areas
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Total Openings</strong> = Sum of all door and window areas
          </p>
          <p className="text-gray-700 font-mono text-sm">
            <strong>Net Paintable Area</strong> = Total Wall Area - Total Openings
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Painting Projects:</strong> Calculate exact paint coverage needed</li>
          <li><strong>Tiling Work:</strong> Estimate tile quantities for wall installations</li>
          <li><strong>Construction Estimates:</strong> Accurate material cost calculations</li>
          <li><strong>Renovation Planning:</strong> Plan wall treatments and finishes</li>
          <li><strong>Interior Design:</strong> Space planning and material budgeting</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculation</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-700 mb-2"><strong>Scenario:</strong> Living room with 4 walls, 1 door, and 2 windows</p>
          <p className="text-gray-700 mb-1">Wall 1: 12 ft × 8 ft = 96 sq ft</p>
          <p className="text-gray-700 mb-1">Wall 2: 12 ft × 8 ft = 96 sq ft</p>
          <p className="text-gray-700 mb-1">Wall 3: 10 ft × 8 ft = 80 sq ft</p>
          <p className="text-gray-700 mb-1">Wall 4: 10 ft × 8 ft = 80 sq ft</p>
          <p className="text-gray-700 mb-1">Door: 3 ft × 7 ft = 21 sq ft</p>
          <p className="text-gray-700 mb-1">Window 1: 4 ft × 3 ft = 12 sq ft</p>
          <p className="text-gray-700 mb-1">Window 2: 4 ft × 3 ft = 12 sq ft</p>
          <p className="text-gray-700 mt-3 font-semibold">Total Wall Area: 352 sq ft</p>
          <p className="text-gray-700">Total Openings: 45 sq ft</p>
          <p className="text-gray-700 text-lg font-bold text-primary">Net Paintable Area: 307 sq ft</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tips for Accurate Measurements</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Measure wall dimensions at multiple points and use the average</li>
          <li>Include all openings (doors, windows, vents) for accurate net area</li>
          <li>Round up measurements slightly to account for waste</li>
          <li>For irregular walls, break them into rectangular sections</li>
          <li>Double-check unit consistency across all measurements</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <p className="text-gray-700 mb-4">
          Manual wall area calculations are time-consuming and error-prone, especially for projects with multiple walls and openings. This calculator eliminates calculation errors, saves time, and provides professional documentation for your projects. Whether you're a contractor preparing estimates or a homeowner planning a DIY project, this tool ensures accuracy and efficiency.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-green-900 font-semibold mb-2">💡 Pro Tip:</p>
          <p className="text-green-800 text-sm">
            When calculating paint requirements, most paints cover approximately 350-400 square feet per gallon. Divide your net paintable area by the coverage rate to determine how many gallons you need. Always add 10-15% extra for touch-ups and waste.
          </p>
        </div>

      </div>
    </div>
  );
}
