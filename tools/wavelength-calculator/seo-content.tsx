export default function WavelengthCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Wavelength?
        </h2>
        <p className="mb-4">
          Wavelength (λ, lambda) is the distance between successive crests, troughs, or identical 
          points of a wave. It's a fundamental property of all waves, including electromagnetic waves 
          (light, radio, microwaves), sound waves, and water waves. Wavelength is inversely proportional 
          to frequency: as frequency increases, wavelength decreases.
        </p>
        <p>
          For electromagnetic waves traveling through a medium, wavelength is calculated using the 
          formula: <strong>λ = v / f</strong>, where λ is wavelength in meters, v is the wave speed 
          in meters per second, and f is frequency in hertz. In vacuum, electromagnetic waves travel 
          at the speed of light (c ≈ 299,792,458 m/s).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Wavelength Formula
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-center text-xl font-mono font-bold text-blue-900 mb-2">
            λ = v / f
          </p>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>λ (lambda) = Wavelength in meters (m)</li>
              <li>v = Wave speed in meters per second (m/s)</li>
              <li>f = Frequency in hertz (Hz)</li>
            </ul>
          </div>
        </div>
        <p className="mb-2">
          <strong>Alternative forms:</strong>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>f = v / λ (Calculate frequency from wavelength)</li>
          <li>v = f × λ (Calculate wave speed)</li>
          <li>For light in vacuum: λ = c / f (where c = 299,792,458 m/s)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate Wavelength
        </h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>
            <strong>Identify the frequency</strong> - Determine the frequency of the wave in Hz, 
            kHz, MHz, or GHz
          </li>
          <li>
            <strong>Determine the propagation medium</strong> - Identify whether the wave travels 
            through vacuum, air, water, or another medium
          </li>
          <li>
            <strong>Find the wave speed</strong> - Use the speed of light for electromagnetic waves 
            in vacuum/air, or the appropriate speed for other mediums
          </li>
          <li>
            <strong>Convert frequency to Hz</strong> - Convert the frequency to hertz if it's in 
            kHz, MHz, or GHz
          </li>
          <li>
            <strong>Apply the formula</strong> - Divide the wave speed by the frequency: λ = v / f
          </li>
          <li>
            <strong>Convert to appropriate units</strong> - Express the result in meters, centimeters, 
            millimeters, or kilometers as appropriate
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Wave Speeds in Different Mediums
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Medium</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Speed (m/s)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of c</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Vacuum</td>
                <td className="border border-gray-300 px-4 py-2">299,792,458</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Air (sea level)</td>
                <td className="border border-gray-300 px-4 py-2">~299,702,547</td>
                <td className="border border-gray-300 px-4 py-2">~99.97%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Water</td>
                <td className="border border-gray-300 px-4 py-2">~225,000,000</td>
                <td className="border border-gray-300 px-4 py-2">~75%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Glass</td>
                <td className="border border-gray-300 px-4 py-2">~200,000,000</td>
                <td className="border border-gray-300 px-4 py-2">~67%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Copper (electrical)</td>
                <td className="border border-gray-300 px-4 py-2">~200,000,000</td>
                <td className="border border-gray-300 px-4 py-2">~67%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Antenna design</strong> - Antenna length is typically λ/4 or λ/2 for optimal performance</li>
          <li><strong>RF circuit design</strong> - Transmission line length affects impedance matching</li>
          <li><strong>Wireless communication</strong> - WiFi, cellular, and satellite systems</li>
          <li><strong>Radar systems</strong> - Wavelength determines resolution and range</li>
          <li><strong>Spectroscopy</strong> - Analyzing light wavelengths to identify materials</li>
          <li><strong>Fiber optics</strong> - Different wavelengths for data transmission</li>
          <li><strong>Medical imaging</strong> - X-rays, ultrasound, and MRI use different wavelengths</li>
          <li><strong>Astronomy</strong> - Observing celestial objects at various wavelengths</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: WiFi 2.4 GHz</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> Frequency = 2.4 GHz, Medium = Air
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              f = 2.4 GHz = 2,400,000,000 Hz<br />
              v = 299,702,547 m/s (speed in air)<br />
              λ = 299,702,547 / 2,400,000,000<br />
              λ ≈ 0.1249 meters ≈ 12.49 cm
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Wavelength ≈ 12.5 cm
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: FM Radio (100 MHz)</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> Frequency = 100 MHz, Medium = Air
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              f = 100 MHz = 100,000,000 Hz<br />
              v = 299,702,547 m/s<br />
              λ = 299,702,547 / 100,000,000<br />
              λ ≈ 2.997 meters
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Wavelength ≈ 3 meters
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: 5G mmWave (28 GHz)</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> Frequency = 28 GHz, Medium = Air
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              f = 28 GHz = 28,000,000,000 Hz<br />
              v = 299,702,547 m/s<br />
              λ = 299,702,547 / 28,000,000,000<br />
              λ ≈ 0.0107 meters ≈ 10.7 mm
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Wavelength ≈ 10.7 mm
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Electromagnetic Spectrum
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Wavelength Range</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Frequency Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Radio Waves</td>
                <td className="border border-gray-300 px-4 py-2">&gt; 1 mm</td>
                <td className="border border-gray-300 px-4 py-2">&lt; 300 GHz</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Microwaves</td>
                <td className="border border-gray-300 px-4 py-2">1 mm - 1 m</td>
                <td className="border border-gray-300 px-4 py-2">300 MHz - 300 GHz</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Infrared</td>
                <td className="border border-gray-300 px-4 py-2">700 nm - 1 mm</td>
                <td className="border border-gray-300 px-4 py-2">300 GHz - 430 THz</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Visible Light</td>
                <td className="border border-gray-300 px-4 py-2">380 - 700 nm</td>
                <td className="border border-gray-300 px-4 py-2">430 - 790 THz</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ultraviolet</td>
                <td className="border border-gray-300 px-4 py-2">10 - 380 nm</td>
                <td className="border border-gray-300 px-4 py-2">790 THz - 30 PHz</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">X-rays</td>
                <td className="border border-gray-300 px-4 py-2">0.01 - 10 nm</td>
                <td className="border border-gray-300 px-4 py-2">30 PHz - 30 EHz</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Gamma Rays</td>
                <td className="border border-gray-300 px-4 py-2">&lt; 0.01 nm</td>
                <td className="border border-gray-300 px-4 py-2">&gt; 30 EHz</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is the relationship between wavelength and frequency?
            </h3>
            <p className="text-gray-700">
              Wavelength and frequency are inversely proportional: as frequency increases, wavelength 
              decreases, and vice versa. This relationship is expressed by λ = v/f, where v is the 
              constant wave speed. For electromagnetic waves in vacuum, higher frequency waves (like 
              X-rays) have shorter wavelengths, while lower frequency waves (like radio) have longer 
              wavelengths.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why does wavelength change in different mediums?
            </h3>
            <p className="text-gray-700">
              When a wave enters a different medium, its speed changes but its frequency remains 
              constant. Since λ = v/f, a change in speed (v) results in a change in wavelength (λ). 
              For example, light slows down when entering water, causing its wavelength to decrease 
              while its frequency stays the same.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I calculate antenna length from wavelength?
            </h3>
            <p className="text-gray-700">
              Common antenna lengths are fractions of the wavelength: quarter-wave (λ/4), half-wave 
              (λ/2), or full-wave (λ). For example, a quarter-wave antenna for 2.4 GHz WiFi would be 
              approximately 3.1 cm (12.5 cm / 4). The exact length may need adjustment based on the 
              antenna design and surrounding environment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is the wavelength of visible light?
            </h3>
            <p className="text-gray-700">
              Visible light wavelengths range from approximately 380 nm (violet) to 700 nm (red). 
              Blue light is around 450-495 nm, green is 495-570 nm, yellow is 570-590 nm, orange is 
              590-620 nm, and red is 620-700 nm. These tiny wavelengths correspond to frequencies in 
              the hundreds of terahertz.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use this calculator for sound waves?
            </h3>
            <p className="text-gray-700">
              Yes, but you'll need to use the custom speed option and enter the speed of sound in your 
              medium. Sound travels at approximately 343 m/s in air at 20°C, 1,480 m/s in water, and 
              5,120 m/s in steel. The formula λ = v/f applies to all types of waves, not just 
              electromagnetic waves.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why is wavelength important in wireless communication?
            </h3>
            <p className="text-gray-700">
              Wavelength determines many practical aspects of wireless systems: antenna size (typically 
              λ/4 or λ/2), signal penetration through obstacles (longer wavelengths penetrate better), 
              diffraction around objects, and the physical spacing of antenna elements in arrays. It 
              also affects how signals interact with the environment and propagate over distance.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the Wavelength Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Always ensure your frequency value is positive and non-zero</li>
          <li>Use the appropriate frequency unit (Hz, kHz, MHz, GHz) to avoid conversion errors</li>
          <li>Select the correct propagation medium for accurate results</li>
          <li>Use presets for common frequencies like WiFi, FM radio, and 5G</li>
          <li>Save calculations to history for future reference</li>
          <li>Export results for documentation and sharing</li>
          <li>Remember that wavelength in air is very close to wavelength in vacuum</li>
          <li>For antenna design, consider the velocity factor of the transmission line</li>
          <li>Account for the refractive index when calculating wavelength in optical fibers</li>
          <li>Use the custom speed option for specialized applications or non-standard mediums</li>
        </ul>
      </section>
    </div>
  );
}
