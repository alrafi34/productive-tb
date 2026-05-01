export default function AcousticSoundproofingCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Acoustic Soundproofing Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Acoustic Soundproofing Calculator</strong> is a professional tool designed to estimate sound insulation requirements for any room or space. It calculates the required sound reduction in decibels (dB) and provides practical recommendations for achieving desired acoustic isolation using various wall types and insulation materials.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔇</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time noise reduction calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple wall type options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Insulation material comparison</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Visual dB meter display</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room presets for quick setup</span>
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
                <span>Home recording studios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Office meeting rooms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Residential soundproofing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Music practice rooms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Podcast and streaming spaces</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How Sound Reduction Works</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Sound Transmission Loss (TL)</h4>
            <p className="text-sm text-blue-800 mb-2">
              Different wall materials provide varying levels of sound blocking capability, measured in decibels (dB). The higher the TL value, the better the sound isolation.
            </p>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• Basic Wall: ~20 dB reduction</div>
              <div>• Drywall: ~30 dB reduction</div>
              <div>• Concrete: ~50 dB reduction</div>
              <div>• Glass Partition: ~15 dB reduction</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Insulation Material Bonus</h4>
            <p className="text-sm text-green-800 mb-2">
              Adding insulation materials between wall layers can significantly improve soundproofing performance by absorbing sound energy.
            </p>
            <div className="text-xs text-green-700 space-y-1">
              <div>• Foam Panels: +5 dB</div>
              <div>• Fiberglass: +8 dB</div>
              <div>• Mineral Wool: +10 dB</div>
              <div>• Mass-Loaded Vinyl: +12 dB</div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Required Reduction Calculation</h4>
            <p className="text-sm text-purple-800 mb-2">
              The calculator determines how much sound reduction you need based on the difference between your noise source level and desired noise level.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-purple-300 text-xs block mt-2">
              Required Reduction = Noise Source Level - Desired Level
            </code>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Noise Levels</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Quiet Environments</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Whisper: 30 dB</li>
              <li>• Quiet Room: 40 dB</li>
              <li>• Library: 40 dB</li>
              <li>• Bedroom at Night: 30 dB</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Moderate Noise</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Normal Conversation: 60 dB</li>
              <li>• Office Environment: 60 dB</li>
              <li>• Traffic Noise: 70 dB</li>
              <li>• Vacuum Cleaner: 70 dB</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Loud Noise</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Loud Music: 90 dB</li>
              <li>• Power Tools: 95 dB</li>
              <li>• Industrial Noise: 110 dB</li>
              <li>• Rock Concert: 115 dB</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Home Recording Studio</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> 4m x 4m x 3m room, Loud music (90 dB), Target: Outside leakage &lt; 50 dB</p>
              <p><strong>Required Reduction:</strong> 90 - 50 = 40 dB</p>
              <p><strong>Solution:</strong> Drywall (30 dB) + Mineral Wool (10 dB) = 40 dB total</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Meets requirements perfectly</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Office Meeting Room</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> 5m x 4m x 3m room, Speech (60 dB), Target: Private conversation (35 dB)</p>
              <p><strong>Required Reduction:</strong> 60 - 35 = 25 dB</p>
              <p><strong>Solution:</strong> Basic wall (20 dB) + Foam panels (5 dB) = 25 dB total</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Adequate privacy achieved</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Bedroom Near Traffic</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> 4m x 3.5m x 2.8m room, Traffic (70 dB), Target: Quiet sleep (40 dB)</p>
              <p><strong>Required Reduction:</strong> 70 - 40 = 30 dB</p>
              <p><strong>Solution:</strong> Drywall (30 dB) or Basic wall (20 dB) + Mineral Wool (10 dB)</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Peaceful sleeping environment</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Estimates:</strong> Get real-time soundproofing requirements as you adjust parameters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Material Comparison:</strong> Compare different wall types and insulation materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Visual Feedback:</strong> See noise reduction progress with visual dB meter</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Room Presets:</strong> Quick-start templates for common scenarios</span>
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
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides simplified estimates for planning purposes. Actual soundproofing performance depends on many factors including installation quality, air gaps, flanking paths, door and window seals, and structural connections. For critical applications like professional studios or noise-sensitive environments, consult with qualified acoustic engineers. Consider factors like low-frequency sound transmission, impact noise, and building codes when designing soundproofing solutions.
          </p>
        </div>

      </div>
    </div>
  );
}
