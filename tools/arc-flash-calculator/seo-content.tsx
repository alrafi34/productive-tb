export default function ArcFlashCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Arc Flash Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Arc Flash Calculator is a professional electrical safety tool designed to assess arc flash hazards and determine appropriate personal protective equipment (PPE) requirements. This calculator helps electrical engineers, safety officers, and technicians quickly estimate incident energy levels and safety distances for electrical work.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Arc flash incidents are among the most serious electrical hazards, capable of causing severe burns, blindness, and death. This tool provides instant calculations based on simplified IEEE 1584 methodology to help ensure worker safety around energized electrical equipment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Instant Calculations:</strong> Real-time arc flash hazard assessment with debounced input handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Risk Level Classification:</strong> Automatic categorization into low, medium, high, and extreme risk levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>PPE Recommendations:</strong> Automatic PPE category determination based on incident energy</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Safety Distance Calculation:</strong> Determines safe working distance where incident energy equals 1.2 cal/cm²</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Equipment Type Factors:</strong> Adjustable factors for different equipment types (panels, switchgear, MCC, transformers)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Advanced Mode:</strong> Optional exposure time and equipment type selection for detailed analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical electrical scenarios</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as TXT or CSV files for documentation</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Arc Flash Calculation Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Incident Energy Formula (Simplified)</h3>
              <code className="text-sm text-gray-700">IE = (k × V × I × t) / D²</code>
              <p className="text-sm text-gray-600 mt-2">
                Where IE is incident energy (cal/cm²), k is equipment factor, V is voltage (V), I is fault current (kA), t is exposure time (s), and D is working distance (inches).
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Safety Distance Formula</h3>
              <code className="text-sm text-gray-700">D_safe = √((k × V × I × t) / 1.2)</code>
              <p className="text-sm text-gray-600 mt-2">
                Calculates the distance where incident energy equals 1.2 cal/cm², the threshold for Category 1 PPE requirements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Equipment Factors</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <div>Panel: k = 0.008</div>
                <div>MCC: k = 0.010</div>
                <div>Switchgear: k = 0.012</div>
                <div>Transformer: k = 0.015</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PPE Categories</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incident Energy</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PPE Requirements</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Category 0/1</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt; 1.2 cal/cm²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Non-melting shirt, pants, safety glasses</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Category 2</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.2 - 4 cal/cm²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Arc-rated shirt, pants, face shield, gloves</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">Category 3</td>
                  <td className="px-4 py-3 text-sm text-gray-700">4 - 8 cal/cm²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Arc-rated suit, hood, gloves, boots</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Category 4</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&gt; 8 cal/cm²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Maximum protection arc suit, hood, gloves</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Level Classification</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Low Risk (&lt; 1.2 cal/cm²)</h3>
              <p className="text-sm text-green-800">
                Minimal arc flash hazard. Standard electrical safety practices apply. Category 0/1 PPE sufficient.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Medium Risk (1.2 - 4 cal/cm²)</h3>
              <p className="text-sm text-yellow-800">
                Moderate arc flash hazard. Use proper PPE and follow safety procedures. Category 2 PPE required.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-2">High Risk (4 - 8 cal/cm²)</h3>
              <p className="text-sm text-orange-800">
                Significant arc flash hazard. Use appropriate PPE and maintain controlled access zone. Category 3 PPE required.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Extreme Risk (&gt; 8 cal/cm²)</h3>
              <p className="text-sm text-red-800">
                Very high arc flash hazard. Use highest level PPE and restrict access. Category 4 PPE required.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Electrical Maintenance</h3>
              <p className="text-sm text-blue-800">
                Assess arc flash hazards before performing maintenance on energized electrical equipment.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Safety Training</h3>
              <p className="text-sm text-green-800">
                Educate workers about arc flash hazards and appropriate PPE requirements for different scenarios.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Equipment Labeling</h3>
              <p className="text-sm text-purple-800">
                Generate incident energy values for arc flash warning labels on electrical equipment.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Safety Compliance</h3>
              <p className="text-sm text-orange-800">
                Ensure compliance with NFPA 70E, OSHA, and other electrical safety standards.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Risk Assessment</h3>
              <p className="text-sm text-red-800">
                Evaluate electrical hazards during design phase and operational planning.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">PPE Selection</h3>
              <p className="text-sm text-yellow-800">
                Determine appropriate personal protective equipment for electrical work tasks.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter System Voltage:</strong> Input the system voltage in volts (V).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Fault Current:</strong> Input the available fault current in kiloamperes (kA).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Set Working Distance:</strong> Enter the working distance from the arc source in inches.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Enable Advanced Mode:</strong> Optionally adjust exposure time and equipment type for more precise calculations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Review Results:</strong> The calculator instantly shows incident energy, risk level, and PPE category.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Check Safety Distance:</strong> Note the calculated safe working distance for the scenario.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of typical scenarios.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Export Results:</strong> Download calculations as TXT or CSV files for documentation.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-yellow-900">
              <strong>De-energize When Possible:</strong> The safest approach is to de-energize equipment before work. Use lockout/tagout procedures.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Qualified Personnel Only:</strong> Only qualified electrical workers should perform energized work with appropriate training.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Proper PPE:</strong> Always use PPE rated for the calculated incident energy level or higher.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Arc Flash Boundaries:</strong> Establish and maintain appropriate arc flash protection boundaries.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Regular Updates:</strong> Recalculate arc flash hazards when system conditions change.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Professional Analysis:</strong> For critical applications, consider professional arc flash studies using detailed IEEE 1584 analysis.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is an arc flash?</h3>
              <p className="text-gray-700">
                An arc flash is a dangerous electrical explosion that occurs when electrical current travels through air between conductors or from conductor to ground. It can reach temperatures of 35,000°F and cause severe burns, blindness, and death.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
              <p className="text-gray-700">
                This calculator uses simplified formulas based on IEEE 1584 methodology. For critical applications or detailed studies, professional arc flash analysis software should be used with complete system modeling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is incident energy?</h3>
              <p className="text-gray-700">
                Incident energy is the amount of thermal energy impressed on a surface at a certain distance from an electrical arc. It's measured in calories per square centimeter (cal/cm²) and determines PPE requirements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is working distance important?</h3>
              <p className="text-gray-700">
                Incident energy decreases with the square of distance. Doubling the working distance reduces incident energy by 75%. Maintaining proper working distance is crucial for safety.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What factors affect arc flash hazard?</h3>
              <p className="text-gray-700">
                Key factors include system voltage, available fault current, protective device clearing time, working distance, and equipment configuration. Higher voltage and current increase hazard levels.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">When should I perform arc flash calculations?</h3>
              <p className="text-gray-700">
                Perform calculations before any energized electrical work, when installing new equipment, after system modifications, and periodically to ensure labels remain accurate.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}