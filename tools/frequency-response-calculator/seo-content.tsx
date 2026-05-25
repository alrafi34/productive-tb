import { frequencyResponseCalculatorConfig } from "./config";

export default function FrequencyResponseCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Frequency Response Calculator
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Frequency Response Calculator is a professional electrical engineering tool designed to analyze and visualize 
            how systems respond to different frequencies. This calculator generates real-time Bode plots showing magnitude 
            and phase response across a specified frequency range, making it essential for control systems, signal processing, 
            and electronics design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time Bode plot generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Magnitude and phase response analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Interactive transfer function input</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Logarithmic frequency scaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>System characteristic analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export graphs and data</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Control system design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Filter analysis and design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Signal processing applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Electronic circuit analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Educational demonstrations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>System stability analysis</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Frequency Response</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Basic Concepts</h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <p><strong>Frequency Response:</strong> How a system's output amplitude and phase change with input frequency</p>
              <p><strong>Magnitude Response:</strong> |H(jω)| - Shows gain/attenuation vs frequency</p>
              <p><strong>Phase Response:</strong> ∠H(jω) - Shows phase shift vs frequency</p>
              <p><strong>Bode Plot:</strong> Combined magnitude (dB) and phase (degrees) vs log frequency</p>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Frequency response analysis</strong> is fundamental to understanding how electrical and electronic 
              systems behave across different frequencies. It reveals critical characteristics like bandwidth, cutoff 
              frequencies, resonance, and stability margins.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Common Transfer Functions</h4>
                <ul className="space-y-1 text-sm">
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">1/(1+jω)</span> - Low-pass filter</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">jω/(1+jω)</span> - High-pass filter</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">1/jω</span> - Integrator</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">jω</span> - Differentiator</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">1</span> - Unity gain</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Parameters</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>DC Gain:</strong> Response at ω = 0</li>
                  <li><strong>Cutoff Frequency:</strong> -3dB point</li>
                  <li><strong>Bandwidth:</strong> Frequency range of operation</li>
                  <li><strong>Roll-off Rate:</strong> Attenuation slope (dB/decade)</li>
                  <li><strong>Phase Margin:</strong> Stability indicator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Enter Function</h4>
              <p className="text-sm text-gray-600">Input transfer function using 'jω' notation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Set Range</h4>
              <p className="text-sm text-gray-600">Define start and end frequencies for analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose Display</h4>
              <p className="text-sm text-gray-600">Select magnitude, phase, or both for Bode plot</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">4</div>
              <h4 className="font-semibold text-gray-900 mb-2">Analyze Results</h4>
              <p className="text-sm text-gray-600">View real-time plots and system characteristics</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What is a Bode plot?</h4>
              <p className="text-gray-600 text-sm">
                A Bode plot is a graphical representation of a system's frequency response, showing magnitude (in dB) 
                and phase (in degrees) versus frequency on a logarithmic scale. It's essential for analyzing system 
                stability and performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How do I interpret the magnitude response?</h4>
              <p className="text-gray-600 text-sm">
                The magnitude response shows how much the system amplifies or attenuates signals at different frequencies. 
                Positive dB values indicate amplification, negative values indicate attenuation. The -3dB point typically 
                defines the cutoff frequency.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What does phase response tell me?</h4>
              <p className="text-gray-600 text-sm">
                Phase response shows the time delay (phase shift) introduced by the system at each frequency. This is 
                crucial for understanding signal timing, system stability, and potential oscillation conditions in 
                feedback systems.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I analyze custom transfer functions?</h4>
              <p className="text-gray-600 text-sm">
                Yes, the calculator supports various transfer function formats using 'jω' notation. You can analyze 
                filters, compensators, and other linear systems. The tool includes presets for common functions to 
                get you started.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}