export default function BodyFatCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          About Body Fat Calculator
        </h2>
        
        <div className="space-y-6 text-gray-600">
          <p>
            Our Body Fat Calculator provides accurate estimates of your body fat percentage using scientifically proven methods. 
            Choose between the US Navy Method (using body measurements) or BMI-based calculations to get instant results with 
            color-coded health categories.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">US Navy Method</h3>
              <ul className="space-y-2 text-sm">
                <li>• Uses waist, neck, and hip measurements</li>
                <li>• More accurate than BMI alone</li>
                <li>• Accounts for body composition differences</li>
                <li>• Widely used by military and fitness professionals</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">BMI Method</h3>
              <ul className="space-y-2 text-sm">
                <li>• Uses height, weight, and age</li>
                <li>• Quick estimation method</li>
                <li>• Includes age factor for accuracy</li>
                <li>• Good for general health assessment</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Body Fat Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Underfat</div>
                <div className="text-blue-600">M: &lt;6% | F: &lt;16%</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">Fitness</div>
                <div className="text-green-600">M: 6-24% | F: 16-30%</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-700">Average</div>
                <div className="text-yellow-600">M: 25-31% | F: 31-36%</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="font-semibold text-red-700">Obese</div>
                <div className="text-red-600">M: &gt;31% | F: &gt;36%</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Select your gender and preferred calculation method</li>
              <li>Choose between Metric (cm, kg) or Imperial (inches, lbs) units</li>
              <li>Enter your measurements accurately</li>
              <li>View instant results with health category and visual indicator</li>
              <li>Save your calculation to track progress over time</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Important Note</h4>
            <p className="text-amber-700 text-sm">
              This calculator provides estimates for general health awareness. For medical advice or precise body composition 
              analysis, consult with healthcare professionals or use specialized equipment like DEXA scans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}