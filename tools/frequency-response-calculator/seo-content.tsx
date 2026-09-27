import { frequencyResponseCalculatorConfig } from "./config";
import ToolFaq from "@/components/ToolFaq";

export default function FrequencyResponseCalculatorSEO() {
  const { howToSteps, faq } = frequencyResponseCalculatorConfig.seo;
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
          <ol className="space-y-3 text-gray-600 leading-relaxed">
            {howToSteps.map(({ name, text }, i) => (
              <li key={name} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                <span><strong>{name}:</strong> {text}</span>
              </li>
            ))}
          </ol>
        </div>

        <ToolFaq items={faq} />

      </div>
    </div>
  );
}