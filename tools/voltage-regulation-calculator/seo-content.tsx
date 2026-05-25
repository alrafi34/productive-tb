import { voltageRegulationCalculatorConfig } from "./config";

export default function VoltageRegulationCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Voltage Regulation Calculator
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Voltage Regulation Calculator is a professional electrical engineering tool designed to calculate voltage regulation 
            in electrical systems including transformers, transmission lines, and power distribution networks. This calculator uses 
            the standard engineering formula to determine how much voltage changes between no-load and full-load conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time voltage regulation calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for transformers and transmission lines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Voltage units in V and kV</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Regulation level interpretation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Step-by-step calculation breakdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export results to TXT and CSV</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Power transformer analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Distribution system design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Transmission line evaluation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Electrical engineering education</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Power system optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Equipment specification verification</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Voltage Regulation</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Formula</h4>
            <div className="bg-white rounded border p-4 font-mono text-center text-lg">
              VR% = ((V<sub>no-load</sub> - V<sub>full-load</sub>) / V<sub>full-load</sub>) × 100
            </div>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Voltage regulation</strong> is a measure of how well an electrical system maintains constant voltage 
              under varying load conditions. It's expressed as a percentage and indicates the voltage change from no-load 
              to full-load conditions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Regulation Levels</h4>
                <ul className="space-y-1 text-sm">
                  <li><span className="text-green-600 font-semibold">Excellent (0-2%):</span> Very stable voltage</li>
                  <li><span className="text-blue-600 font-semibold">Good (2-5%):</span> Acceptable stability</li>
                  <li><span className="text-yellow-600 font-semibold">Moderate (5-10%):</span> Needs optimization</li>
                  <li><span className="text-orange-600 font-semibold">Poor (10-20%):</span> Significant issues</li>
                  <li><span className="text-red-600 font-semibold">Critical (&gt;20%):</span> Requires attention</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Typical Values</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Power Transformers:</strong> 1-3%</li>
                  <li><strong>Distribution Transformers:</strong> 2-5%</li>
                  <li><strong>Transmission Lines:</strong> 3-8%</li>
                  <li><strong>Motor Circuits:</strong> 3-6%</li>
                  <li><strong>DC Power Supplies:</strong> 1-4%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Enter Voltages</h4>
              <p className="text-sm text-gray-600">Input no-load and full-load voltage values with appropriate units</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Select System</h4>
              <p className="text-sm text-gray-600">Choose system type (transformer, transmission line, or general)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">View regulation percentage with interpretation and recommendations</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What is good voltage regulation?</h4>
              <p className="text-gray-600 text-sm">
                Good voltage regulation is typically below 5% for most electrical systems. Excellent regulation is below 2%, 
                while regulation above 10% indicates potential issues that may affect equipment performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Why is voltage regulation important?</h4>
              <p className="text-gray-600 text-sm">
                Voltage regulation affects equipment performance, efficiency, and lifespan. Poor regulation can cause motors 
                to overheat, lights to dim, and electronic devices to malfunction or fail prematurely.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How can I improve voltage regulation?</h4>
              <p className="text-gray-600 text-sm">
                Voltage regulation can be improved by using voltage regulators, tap-changing transformers, capacitor banks, 
                reducing system impedance, or upgrading to larger conductors and transformers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}