export default function ADCResolutionCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is ADC Resolution?</h2>
          <p className="text-gray-700 leading-relaxed">
            ADC (Analog-to-Digital Converter) resolution refers to the number of discrete digital values an ADC can 
            produce from a continuous analog input signal. It is typically expressed in bits. An n-bit ADC can 
            represent 2<sup>n</sup> different voltage levels. For example, a 10-bit ADC has 1024 (2<sup>10</sup>) 
            quantization levels, while a 12-bit ADC has 4096 levels. Higher resolution means finer voltage 
            discrimination and more accurate digital representation of analog signals. ADC resolution is crucial 
            in sensor interfaces, data acquisition systems, audio processing, and measurement instruments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ADC Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Quantization Levels</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Levels = 2<sup>n</sup></p>
              <p className="text-sm text-blue-700">
                Where n is the number of bits. An 8-bit ADC has 256 levels, 10-bit has 1024 levels, 12-bit has 
                4096 levels, and 16-bit has 65536 levels. More levels mean finer resolution and better accuracy.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step Size (Resolution)</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Step Size = V<sub>ref</sub> / 2<sup>n</sup></p>
              <p className="text-sm text-green-700">
                Step size is the smallest voltage change the ADC can detect. For a 10-bit ADC with 5V reference, 
                step size = 5V / 1024 = 4.88mV. This means the ADC cannot distinguish voltage changes smaller than 
                4.88mV. Lower step size means higher precision.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Digital Output Value</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Digital Value = floor(V<sub>in</sub> / Step Size)</p>
              <p className="text-sm text-purple-700">
                Converts analog input voltage to digital value. For 10-bit ADC with 5V reference and 2.5V input: 
                Digital Value = floor(2.5V / 0.00488V) = 512. The floor function rounds down to the nearest integer, 
                representing quantization.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> V<sub>ref</sub> = 3.3V, n = 12 bits, V<sub>in</sub> = 1.65V</p>
                <p><strong>Step 1:</strong> Levels = 2<sup>12</sup> = 4096</p>
                <p><strong>Step 2:</strong> Step Size = 3.3V / 4096 = 0.000805V = 0.805mV</p>
                <p><strong>Step 3:</strong> Digital Value = floor(1.65V / 0.000805V) = 2048</p>
                <p><strong>Result:</strong> 1.65V input produces digital value 2048 (exactly 50% of range)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Microcontroller ADCs</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resolution</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">V<sub>ref</sub></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Step Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channels</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Uno (ATmega328)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">10-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4.88 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Mega (ATmega2560)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">10-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4.88 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">16</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">ESP32</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">18</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Raspberry Pi Pico (RP2040)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">STM32F103 (Blue Pill)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">STM32F4 Series</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">16-24</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Teensy 4.0</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">10-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">3.22 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Quantization Error</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-900 mb-3">What is Quantization Error?</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Quantization error is the difference between the actual analog input voltage and the voltage represented 
              by the digital output. It occurs because the ADC can only represent discrete voltage levels. The maximum 
              quantization error is ±0.5 LSB (Least Significant Bit), which equals ±(Step Size / 2). For a 10-bit ADC 
              with 5V reference, maximum error is ±2.44mV. This error is inherent and cannot be eliminated, only 
              reduced by using higher resolution ADCs.
            </p>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Example 1 (10-bit, 5V):</strong> Step size = 4.88mV. If input is 2.502V, ADC reads 2.5V 
                (digital value 512). Quantization error = 2mV. This error affects measurement accuracy in sensor 
                applications.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Example 2 (12-bit, 3.3V):</strong> Step size = 0.805mV. Same 2mV error represents 2.5 steps, 
                providing better accuracy than 10-bit ADC. Higher resolution reduces relative quantization error.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Reducing Error:</strong> Use higher resolution ADC, lower reference voltage (if signal range 
                permits), oversampling and averaging, or external precision voltage reference. For critical 
                measurements, 16-bit or 24-bit ADCs are recommended.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ADC Reference Voltage Selection</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Internal Reference:</strong> Most microcontrollers have internal voltage references (1.1V, 
                2.5V, 3.3V, 5V). Convenient but less accurate (±5-10% tolerance). Suitable for non-critical 
                applications. Arduino Uno: 5V default, 1.1V internal option.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>External Reference:</strong> Use precision voltage reference ICs (LM4040, REF3033, ADR4540) 
                for better accuracy (±0.1-1% tolerance). Required for precision measurements, calibration instruments, 
                and industrial applications. Connect to AREF pin on Arduino.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Matching Signal Range:</strong> Choose reference voltage close to maximum expected input 
                voltage for best resolution. If measuring 0-3.3V signals with 5V reference, you waste 34% of ADC 
                range. Use 3.3V reference instead for better effective resolution.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Stability:</strong> Reference voltage must be stable and noise-free. Use decoupling capacitors 
                (0.1µF ceramic + 10µF electrolytic) near AREF pin. Voltage fluctuations directly affect ADC accuracy. 
                For precision work, use buffered references with low temperature coefficient.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ADC Sampling Rate and Conversion Time</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Sample Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Uno</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">9.6 kSPS</td>
                  <td className="px-4 py-3 text-sm text-gray-700">~100 µs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Can be increased to 77 kSPS</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">ESP32</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">200 kSPS</td>
                  <td className="px-4 py-3 text-sm text-gray-700">~5 µs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Two SAR ADCs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">STM32F4</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">2.4 MSPS</td>
                  <td className="px-4 py-3 text-sm text-gray-700">~0.4 µs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Fast for audio/signal processing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Raspberry Pi Pico</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">500 kSPS</td>
                  <td className="px-4 py-3 text-sm text-gray-700">~2 µs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Good for data acquisition</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p className="mb-2">
              <strong>kSPS = kilo Samples Per Second, MSPS = Mega Samples Per Second</strong>
            </p>
            <p>
              Sampling rate determines how fast the ADC can read changing signals. For audio (20 kHz max frequency), 
              you need at least 40 kSPS (Nyquist theorem: sample rate ≥ 2× signal frequency). For DC or slow-changing 
              signals (temperature, pressure), low sample rates are sufficient. Higher sample rates enable capturing 
              fast transients and high-frequency signals.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improving ADC Accuracy</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Oversampling and Decimation:</strong> Take multiple samples and average them to reduce noise 
                and increase effective resolution. Taking 4 samples and averaging increases resolution by 1 bit. 
                16 samples = 2 bits, 64 samples = 3 bits. Trade-off: slower sampling rate.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Input Filtering:</strong> Use RC low-pass filter before ADC input to remove high-frequency 
                noise. Cutoff frequency should be below Nyquist frequency (half of sampling rate). Typical: 1kΩ 
                resistor + 0.1µF capacitor for ~1.6kHz cutoff.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Signal Conditioning:</strong> Use op-amp buffer for high-impedance sources. Add voltage 
                divider for signals exceeding reference voltage. Use instrumentation amplifier for small differential 
                signals. Proper conditioning prevents loading effects and improves SNR.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Calibration:</strong> Measure known reference voltages and create calibration curve. Compensate 
                for offset and gain errors. Store calibration coefficients in EEPROM. Essential for precision 
                measurements and industrial applications.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Power Supply Quality:</strong> Use clean, stable power supply. Add decoupling capacitors 
                (0.1µF + 10µF) near microcontroller. Separate analog and digital grounds if possible. Power supply 
                noise couples into ADC readings, especially on battery-powered devices.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing the Right ADC Resolution</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>8-bit ADC (256 levels):</strong> Suitable for simple applications where ±2% accuracy is 
                acceptable. Examples: basic user interfaces, simple sensors, LED brightness control, battery level 
                indication. Fast conversion, low cost, minimal processing.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>10-bit ADC (1024 levels):</strong> Most common in hobbyist microcontrollers (Arduino). 
                Provides ±0.1% accuracy. Good for: temperature sensors, light sensors, potentiometers, general-purpose 
                measurements. Balance between resolution and speed.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>12-bit ADC (4096 levels):</strong> Standard in modern ARM microcontrollers (STM32, ESP32). 
                Provides ±0.025% accuracy. Used for: precision sensors, industrial control, data acquisition, audio 
                processing. Good resolution without significant cost increase.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>16-bit ADC (65536 levels):</strong> High precision applications. Provides ±0.0015% accuracy. 
                Required for: scientific instruments, medical devices, precision measurement, load cells, strain gauges. 
                External ADC ICs (ADS1115, MCP3421) commonly used.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>24-bit ADC (16.7M levels):</strong> Ultra-high precision. Used in: professional audio 
                interfaces, laboratory instruments, high-precision scales, seismic sensors. Requires careful PCB 
                design and shielding. Examples: ADS1256, HX711 (load cell amplifier).
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate ADC step size?</h3>
              <p className="text-sm text-gray-700">
                Step size = Reference Voltage / 2<sup>n</sup>, where n is the number of bits. For Arduino Uno (10-bit, 
                5V): Step size = 5V / 1024 = 0.00488V = 4.88mV. This is the smallest voltage change the ADC can detect. 
                For ESP32 (12-bit, 3.3V): Step size = 3.3V / 4096 = 0.000805V = 0.805mV.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between resolution and accuracy?</h3>
              <p className="text-sm text-gray-700">
                Resolution is the number of discrete values the ADC can produce (determined by bit depth). Accuracy 
                is how close the measured value is to the true value (affected by errors, noise, calibration). A 
                12-bit ADC has better resolution than 10-bit, but if poorly designed, it may have worse accuracy. 
                High resolution doesn't guarantee high accuracy without proper design and calibration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I convert ADC reading to voltage in Arduino?</h3>
              <p className="text-sm text-gray-700">
                Use formula: Voltage = (ADC_Reading / 1023) × Reference_Voltage. For Arduino Uno with 5V reference: 
                Voltage = (analogRead(pin) / 1023.0) × 5.0. If reading is 512, voltage = (512 / 1023) × 5 = 2.5V. 
                Note: Use 1023 (not 1024) because ADC values range from 0-1023. For 3.3V systems, replace 5.0 with 3.3.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is my ADC reading noisy?</h3>
              <p className="text-sm text-gray-700">
                Common causes: poor power supply filtering, high-impedance source, electromagnetic interference (EMI), 
                ground loops, inadequate decoupling capacitors, or digital noise coupling into analog circuits. 
                Solutions: add 0.1µF capacitor at ADC input, use twisted pair wiring, separate analog/digital grounds, 
                average multiple readings, use shielded cables for long connections, or add RC low-pass filter.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I measure voltages higher than the reference voltage?</h3>
              <p className="text-sm text-gray-700">
                No, input voltage must not exceed reference voltage (or VCC, whichever is lower). Exceeding this can 
                damage the ADC or microcontroller. To measure higher voltages, use a voltage divider. For example, 
                to measure 0-12V with 5V ADC: use 10kΩ and 5kΩ resistors (divides by 3), then multiply reading by 3. 
                Always add protection diodes for safety in critical applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the effective number of bits (ENOB)?</h3>
              <p className="text-sm text-gray-700">
                ENOB is the actual usable resolution considering noise and distortion. A 12-bit ADC might have only 
                10-11 ENOB due to noise, non-linearity, and other imperfections. ENOB is always less than or equal 
                to the nominal bit depth. It's a more realistic measure of ADC performance than just bit count. 
                Check datasheet for ENOB specifications in precision applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I increase ADC resolution beyond hardware limits?</h3>
              <p className="text-sm text-gray-700">
                Use oversampling: Take multiple samples and average them. To gain n extra bits, take 4<sup>n</sup> 
                samples. For 1 extra bit: 4 samples, 2 bits: 16 samples, 3 bits: 64 samples. This reduces noise and 
                increases effective resolution. Trade-off: slower sampling rate. Arduino 10-bit can achieve ~13-bit 
                effective resolution with 64× oversampling. Works best when noise is present (adds dithering effect).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When designing ADC circuits, always match your reference voltage to your expected signal range for maximum 
            resolution. If measuring 0-3.3V signals, use 3.3V reference instead of 5V to utilize the full ADC range. 
            Add a 0.1µF ceramic capacitor directly at the ADC input pin to filter high-frequency noise. For precision 
            measurements, take multiple readings and use median or average filtering to reduce noise. Always allow 
            settling time after switching ADC channels (typically 10-100µs) before reading. Use external precision 
            voltage references (like REF3033 or LM4040) for applications requiring better than 1% accuracy.
          </p>
        </section>

      </div>
    </div>
  );
}
