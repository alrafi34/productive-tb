export default function RoomAcousticsCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Room Acoustics Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Room Acoustics Calculator</strong> is a professional tool designed to analyze how sound behaves inside a room. It calculates key acoustic properties including reverberation time (RT60), room modes, and acoustic balance based on room dimensions and material absorption coefficients. This tool helps optimize room acoustics for recording studios, home theaters, offices, and any space where sound quality matters.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔊</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>RT60 reverberation time calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room mode frequency analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>8 material absorption presets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Acoustic quality assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Treatment recommendations</span>
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
                <span>Recording studio design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Home theater optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Podcast room setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Office acoustic planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Concert hall analysis</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Understanding RT60</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">What is RT60?</h4>
            <p className="text-sm text-blue-800 mb-2">
              RT60 (Reverberation Time) is the time it takes for sound to decay by 60 decibels after the source stops. It's the most important metric for room acoustics.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              RT60 = 0.161 × Volume / Total Absorption
            </code>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Ideal RT60 Values</h4>
            <div className="text-sm text-green-800 space-y-1">
              <div>• Recording Studios: 0.3 - 0.5 seconds</div>
              <div>• Speech/Podcasts: 0.5 - 0.8 seconds</div>
              <div>• Living Rooms: 0.4 - 0.6 seconds</div>
              <div>• Offices: 0.6 - 0.8 seconds</div>
              <div>• Concert Halls: 1.5 - 2.5 seconds</div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Sabine Formula</h4>
            <p className="text-sm text-purple-800 mb-2">
              The calculator uses the Sabine formula, which relates room volume, surface area, and material absorption to predict reverberation time.
            </p>
            <div className="text-xs text-purple-700 mt-2">
              Total Absorption (A) = Σ (Surface Area × Absorption Coefficient)
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Material Absorption Coefficients</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Highly Reflective</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Concrete: α = 0.02</li>
              <li>• Plaster: α = 0.03</li>
              <li>• Brick: α = 0.03</li>
              <li>• Glass: α = 0.05</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Moderately Absorptive</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Wood: α = 0.10</li>
              <li>• Carpet: α = 0.40</li>
              <li>• Curtains: α = 0.50</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Highly Absorptive</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Acoustic Panels: α = 0.80</li>
              <li>• Specialized foam: α = 0.90+</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Room Modes Explained</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">What are Room Modes?</h4>
            <p className="text-sm text-gray-700 mb-2">
              Room modes are resonant frequencies determined by room dimensions. At these frequencies, sound waves reflect back and forth, creating standing waves that can cause uneven bass response.
            </p>
            <code className="bg-gray-50 px-3 py-1 rounded border border-gray-300 text-xs block mt-2">
              f = (c / 2) × √((nx/L)² + (ny/W)² + (nz/H)²)
            </code>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Types of Room Modes</h4>
            <div className="text-sm text-orange-800 space-y-2">
              <div><strong>Axial Modes:</strong> Bounce between two parallel surfaces (strongest)</div>
              <div><strong>Tangential Modes:</strong> Involve four surfaces (medium strength)</div>
              <div><strong>Oblique Modes:</strong> Involve all six surfaces (weakest)</div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Home Recording Studio</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Dimensions:</strong> 4m × 3.5m × 2.8m (Volume: 39.2 m³)</p>
              <p><strong>Materials:</strong> Acoustic panels (walls/ceiling), Carpet (floor)</p>
              <p><strong>Calculation:</strong> Total absorption ≈ 31.4 sabins</p>
              <p><strong>RT60:</strong> (0.161 × 39.2) / 31.4 ≈ 0.20 seconds</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Too dead - needs some reflective surfaces</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Living Room</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Dimensions:</strong> 5m × 4m × 2.7m (Volume: 54 m³)</p>
              <p><strong>Materials:</strong> Plaster (walls/ceiling), Carpet (floor)</p>
              <p><strong>Calculation:</strong> Total absorption ≈ 10.5 sabins</p>
              <p><strong>RT60:</strong> (0.161 × 54) / 10.5 ≈ 0.83 seconds</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Good for general use, acceptable for speech</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Untreated Room</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Dimensions:</strong> 6m × 5m × 3m (Volume: 90 m³)</p>
              <p><strong>Materials:</strong> Concrete (all surfaces)</p>
              <p><strong>Calculation:</strong> Total absorption ≈ 3.2 sabins</p>
              <p><strong>RT60:</strong> (0.161 × 90) / 3.2 ≈ 4.53 seconds</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Highly reverberant - extensive treatment needed</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Analysis:</strong> Get real-time RT60 and acoustic quality assessment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Room Mode Detection:</strong> Identify problematic resonant frequencies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Material Comparison:</strong> Test different surface materials and their effects</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Smart Recommendations:</strong> Get actionable advice for acoustic treatment</span>
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
            This calculator provides simplified estimates using the Sabine formula, which works best for rooms with evenly distributed absorption. Real-world acoustics are complex and affected by factors like room shape, furniture placement, air absorption, and frequency-dependent material properties. For critical applications like professional studios or concert halls, consult with qualified acoustic engineers who can perform detailed measurements and simulations. The calculator is ideal for preliminary planning and understanding basic acoustic principles.
          </p>
        </div>

      </div>
    </div>
  );
}
