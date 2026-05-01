export default function InsulationThicknessCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Insulation Thickness Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Insulation Thickness Calculator</strong> is a professional engineering tool designed to determine the required insulation thickness for pipes, walls, and surfaces based on thermal performance requirements. It uses simplified heat transfer principles to calculate insulation needs for achieving target surface temperatures, heat loss limits, or U-values.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🧱</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Three calculation modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Material thermal conductivity presets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Application-specific presets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time thickness calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Unit conversion (mm/inches)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Pipe insulation design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building envelope design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>HVAC system planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy efficiency optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Industrial process design</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Calculation Modes</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">1. Surface Temperature Mode</h4>
            <p className="text-sm text-blue-800 mb-2">
              Calculate insulation thickness needed to achieve a target surface temperature. Ideal for safety requirements and condensation prevention.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs">
              thickness ≈ k × (T_hot - T_surface) / (T_surface - T_ambient)
            </code>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">2. Heat Loss Mode</h4>
            <p className="text-sm text-green-800 mb-2">
              Calculate insulation thickness to limit heat loss to a maximum value. Perfect for energy efficiency and cost control.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs">
              q = (2πk(T_hot - T_ambient)) / ln(r2 / r1)
            </code>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">3. U-Value Mode</h4>
            <p className="text-sm text-purple-800 mb-2">
              Calculate insulation thickness to achieve a target U-value for walls and flat surfaces. Essential for building regulations compliance.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-purple-300 text-xs">
              thickness = k / U
            </code>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Material Thermal Conductivity</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Excellent Insulators</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Aerogel: 0.015 W/m·K</li>
              <li>• PIR Foam: 0.022 W/m·K</li>
              <li>• PU Foam: 0.023 W/m·K</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Good Insulators</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• XPS Foam: 0.030 W/m·K</li>
              <li>• EPS Foam: 0.035 W/m·K</li>
              <li>• Rock Wool: 0.038 W/m·K</li>
              <li>• Glass Wool: 0.040 W/m·K</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Natural Materials</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Sheep Wool: 0.038 W/m·K</li>
              <li>• Cellulose: 0.040 W/m·K</li>
              <li>• Cork: 0.045 W/m·K</li>
              <li>• Wood Fiber: 0.050 W/m·K</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Hot Water Pipe</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Given:</strong> Pipe temp 60°C, Ambient 20°C, Target surface 35°C, k = 0.040 W/m·K</p>
              <p><strong>Calculation:</strong> thickness = 0.040 × (60-35) / (35-20) = 0.067 m</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> 67 mm insulation required</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Building Wall</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Given:</strong> Target U-value 0.25 W/m²·K, k = 0.035 W/m·K</p>
              <p><strong>Calculation:</strong> thickness = 0.035 / 0.25 = 0.140 m</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> 140 mm insulation required</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Modes:</strong> Choose the calculation method that fits your requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Material Library:</strong> Built-in thermal conductivity values for common insulation materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Application Presets:</strong> Quick-start templates for common scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time calculation as you enter values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Free & Accessible:</strong> No registration required, works entirely in your browser</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Pro Tip
          </h4>
          <p className="text-sm text-yellow-800">
            These calculations provide estimates based on simplified models. Actual insulation requirements may vary due to factors like thermal bridging, air infiltration, moisture, and installation quality. For critical applications, always consult with qualified thermal engineers and follow relevant building codes and standards. Consider using safety factors and account for real-world conditions when specifying insulation thickness.
          </p>
        </div>

      </div>
    </div>
  );
}