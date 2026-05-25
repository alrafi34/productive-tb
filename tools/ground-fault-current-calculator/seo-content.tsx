export default function GroundFaultCurrentCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ground Fault Current Calculator</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Calculate ground fault current instantly using voltage and impedance with our professional electrical 
            engineering calculator. Essential for fault analysis, safety design, protection device selection, 
            and electrical system planning in residential, commercial, and industrial applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Instant fault current calculation using Ohm's Law (I = V / Z)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Basic and advanced calculation modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Component-based impedance analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Fault level classification (Low, Medium, High, Critical)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>System type identification (LV, MV, HV)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Safety warnings and protection recommendations</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Applications</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Electrical safety analysis and design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Protection device selection (MCBs, fuses, relays)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Industrial power distribution planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Electrical installation design verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Compliance with electrical safety standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Educational purposes and training</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ground Fault Current Formula</h3>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Basic Formula (Ohm's Law)</h4>
              <p className="text-gray-700 text-sm mb-2">
                <strong>I_fault = V / Z_total</strong>
              </p>
              <p className="text-gray-600 text-sm">
                Where I_fault is the fault current (A), V is the system voltage (V), and Z_total is the total fault loop impedance (Ω).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Advanced Mode Calculation</h4>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Z_total = Z_source + Z_cable + Z_transformer</strong>
              </p>
              <p className="text-gray-600 text-sm">
                In advanced mode, the total impedance is calculated by summing individual impedance components including source, cable, and transformer impedances.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fault Current Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Low (&lt;100A)</h4>
              <p className="text-green-700 text-sm">Minimal fault current. Verify protection device sensitivity and coordination.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Medium (100-1000A)</h4>
              <p className="text-yellow-700 text-sm">Moderate fault current. Standard protection devices should be adequate.</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">High (1-10kA)</h4>
              <p className="text-orange-700 text-sm">High fault current. Ensure adequate protection devices and safety procedures.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Critical (&gt;10kA)</h4>
              <p className="text-red-700 text-sm">Extremely high fault current. Industrial-grade protection and safety measures required.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">System Voltage Classifications</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-20 text-center">
                <div className="text-lg font-bold text-blue-900">≤50V</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900 text-sm">Extra Low Voltage (ELV)</div>
                <div className="text-xs text-blue-700">Safety extra low voltage systems, control circuits</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-20 text-center">
                <div className="text-lg font-bold text-green-900">≤1kV</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900 text-sm">Low Voltage (LV)</div>
                <div className="text-xs text-green-700">Residential, commercial, and light industrial systems</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-20 text-center">
                <div className="text-lg font-bold text-yellow-900">≤35kV</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-yellow-900 text-sm">Medium Voltage (MV)</div>
                <div className="text-xs text-yellow-700">Distribution networks, industrial plants</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-20 text-center">
                <div className="text-lg font-bold text-red-900">&gt;35kV</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-red-900 text-sm">High Voltage (HV)</div>
                <div className="text-xs text-red-700">Transmission systems, major industrial facilities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Protection Device Selection</h4>
              <p className="text-gray-700 text-sm">
                Calculate fault currents to properly size circuit breakers, fuses, and protective relays. 
                Ensure devices can safely interrupt fault currents and provide adequate protection coordination.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800">Electrical Safety Analysis</h4>
              <p className="text-gray-700 text-sm">
                Assess potential fault current levels for safety planning, arc flash analysis, and 
                personal protective equipment (PPE) requirements in electrical installations.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800">System Design Verification</h4>
              <p className="text-gray-700 text-sm">
                Verify that electrical system designs meet safety standards and regulatory requirements 
                for fault current handling and protection coordination.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Impedance Components</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Source Impedance</h4>
                <p className="text-gray-700 text-sm">
                  Impedance of the electrical supply source, including utility grid impedance and 
                  generator internal impedance. Typically the lowest component.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Cable Impedance</h4>
                <p className="text-gray-700 text-sm">
                  Impedance of cables and conductors in the fault current path. Depends on cable 
                  length, cross-sectional area, and material properties.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Transformer Impedance</h4>
                <p className="text-gray-700 text-sm">
                  Impedance of transformers in the fault path, typically expressed as a percentage 
                  of the transformer rating. Converted to ohms for calculation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Use Our Ground Fault Current Calculator?</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 leading-relaxed">
              Our ground fault current calculator provides instant, accurate fault current analysis for electrical systems. 
              Whether you're designing protection schemes, selecting safety equipment, or verifying system compliance, 
              this tool offers the precision and convenience you need. With both basic and advanced calculation modes, 
              comprehensive safety analysis, and professional-grade accuracy, it's the perfect companion for electrical 
              engineers, technicians, and students working on electrical safety and protection systems.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}