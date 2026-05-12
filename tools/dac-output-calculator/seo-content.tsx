export default function DACOutputCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a DAC (Digital-to-Analog Converter)?</h2>
          <p className="text-gray-700 leading-relaxed">
            A DAC (Digital-to-Analog Converter) converts discrete digital values into continuous analog voltage or 
            current signals. It's the opposite of an ADC. DACs are essential in audio playback, signal generation, 
            motor control, and any application requiring analog output from digital systems. Common applications 
            include audio interfaces, waveform generators, voltage references, and control systems. DAC resolution 
            (bit depth) determines output precision - higher resolution means smoother analog output and finer 
            voltage control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DAC Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Unipolar DAC Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">V<sub>out</sub> = (D / (2<sup>n</sup> - 1)) × V<sub>ref</sub></p>
              <p className="text-sm text-blue-700">
                Where D is the digital input value, n is the number of bits, and V<sub>ref</sub> is the reference 
                voltage. Unipolar DACs produce output from 0V to V<sub>ref</sub>. Most common in microcontroller 
                applications. Example: 8-bit DAC with 5V reference, D=128 produces 2.51V output.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Bipolar DAC Formula</h3>
              <p className="text-green-800 font-mono text-lg mb-2">V<sub>out</sub> = ((D / (2<sup>n</sup> - 1)) × 2 × V<sub>ref</sub>) - V<sub>ref</sub></p>
              <p className="text-sm text-green-700">
                Bipolar DACs produce output from -V<sub>ref</sub> to +V<sub>ref</sub>. Used in audio applications, 
                signal processing, and control systems requiring both positive and negative voltages. Example: 12-bit 
                bipolar DAC with 5V reference, D=2048 produces 0V (center), D=0 produces -5V, D=4095 produces +5V.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step Size (Resolution)</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Step Size = V<sub>ref</sub> / (2<sup>n</sup> - 1)</p>
              <p className="text-sm text-purple-700">
                Step size is the smallest voltage change the DAC can produce. For 8-bit DAC with 5V reference: 
                Step size = 5V / 255 = 19.6mV. For 16-bit: 5V / 65535 = 0.076mV. Higher resolution means smaller 
                steps and smoother output. Critical for audio quality and precision control applications.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> 10-bit unipolar DAC, V<sub>ref</sub> = 3.3V, D = 512</p>
                <p><strong>Step 1:</strong> Max Value = 2<sup>10</sup> - 1 = 1023</p>
                <p><strong>Step 2:</strong> Step Size = 3.3V / 1023 = 3.23mV</p>
                <p><strong>Step 3:</strong> V<sub>out</sub> = (512 / 1023) × 3.3V = 1.65V</p>
                <p><strong>Result:</strong> Output voltage is 1.65V (exactly 50% of range)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Microcontroller DACs</h2>
          
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
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Uno (PWM)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">8-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">19.6 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6 (PWM)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">ESP32</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">8-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">12.9 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">STM32F4 Series</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Raspberry Pi Pico</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">16-bit (PWM)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.050 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">16 (PWM)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Teensy 4.0</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.805 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">MCP4725 (I2C DAC)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1.22 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">MCP4728 (I2C DAC)</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">12-bit</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1.22 mV</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DAC Types and Architectures</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>R-2R Ladder DAC:</strong> Uses resistor network with only two resistor values (R and 2R). 
                Simple, low cost, good for moderate resolution (8-12 bits). Used in many microcontrollers. Easy to 
                implement but limited accuracy due to resistor tolerances. Common in embedded systems and industrial 
                control.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Binary Weighted DAC:</strong> Uses resistors with binary-weighted values (R, 2R, 4R, 8R...). 
                Simple concept but requires precise resistor ratios. Limited to low resolution (4-8 bits) due to 
                wide resistor value range. Fast switching speed. Used in simple applications and educational projects.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>PWM-based DAC:</strong> Uses pulse width modulation with low-pass filter to create analog 
                voltage. Arduino's analogWrite() uses this method. Resolution depends on PWM timer (8-16 bits). 
                Requires external RC filter. Slow response time but very flexible. Good for audio and motor control.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Delta-Sigma DAC:</strong> Uses oversampling and noise shaping for high resolution (16-24 bits). 
                Excellent for audio applications. Used in professional audio interfaces, CD players, and high-end 
                audio equipment. Complex but provides best signal-to-noise ratio and linearity.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>String DAC:</strong> Uses voltage divider with switches. Very linear but requires many 
                components (2<sup>n</sup> resistors for n-bit resolution). Used in precision applications where 
                linearity is critical. Common in instrumentation and measurement equipment.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DAC Performance Specifications</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Resolution:</strong> Number of bits determines how many discrete output levels are possible. 
                8-bit = 256 levels, 12-bit = 4096 levels, 16-bit = 65536 levels. Higher resolution means smoother 
                output and finer control. Audio typically requires 16-24 bits, control systems 8-12 bits.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Settling Time:</strong> Time required for output to reach final value within specified 
                tolerance after input change. Ranges from nanoseconds (fast DACs) to microseconds (precision DACs). 
                Critical for high-speed applications like video, RF, and fast control loops. Slower for high-resolution 
                DACs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Linearity (INL/DNL):</strong> Integral Non-Linearity (INL) measures maximum deviation from 
                ideal transfer function. Differential Non-Linearity (DNL) measures step size variation. Specified in 
                LSB (Least Significant Bit). Good DACs have INL/DNL &lt; ±1 LSB. Critical for precision measurements 
                and audio quality.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Glitch Energy:</strong> Transient voltage spikes during code transitions. Measured in nV·s. 
                Important in audio (causes clicks/pops) and precision control. Deglitching circuits or sample-and-hold 
                can reduce glitches. Better DAC architectures have lower glitch energy.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Signal-to-Noise Ratio (SNR):</strong> Ratio of signal power to noise power, measured in dB. 
                Theoretical maximum SNR = 6.02n + 1.76 dB (where n = bits). 16-bit DAC: ~98 dB, 24-bit: ~146 dB. 
                Critical for audio applications. Real-world SNR is lower due to circuit noise and imperfections.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Arduino DAC Implementation</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-3">Arduino analogWrite() - PWM-based DAC</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Resolution:</strong> 8-bit (0-255). Use analogWrite(pin, value) to set output.</p>
              <p><strong>Frequency:</strong> 490 Hz (pins 3,9,10,11) or 980 Hz (pins 5,6). Can be changed via timer 
              registers.</p>
              <p><strong>Output:</strong> PWM signal, not true analog. Add RC low-pass filter (1kΩ + 10µF) to convert 
              to analog voltage.</p>
              <p><strong>Example:</strong> analogWrite(9, 128) produces ~2.5V after filtering (50% duty cycle on 5V 
              system).</p>
              <p><strong>Limitation:</strong> Not suitable for high-frequency signals or applications requiring fast 
              settling time.</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">External DAC ICs (MCP4725, MCP4728)</h3>
            <div className="space-y-2 text-sm text-green-800">
              <p><strong>Resolution:</strong> 12-bit (0-4095). Much better than Arduino's 8-bit PWM.</p>
              <p><strong>Interface:</strong> I2C communication. Easy to use with Wire library.</p>
              <p><strong>Output:</strong> True analog voltage, no filtering needed. Rail-to-rail output (0V to VDD).</p>
              <p><strong>Example:</strong> MCP4725.setVoltage(2048) produces 2.5V with 5V supply (50% of 4095).</p>
              <p><strong>Advantages:</strong> Fast settling (&lt;10µs), low noise, EEPROM for power-on value, multiple 
              channels (MCP4728).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DAC Applications</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Audio Playback:</strong> Convert digital audio files to analog signals for speakers/headphones. 
                Requires 16-24 bit resolution, &gt;44.1 kHz sample rate. Used in smartphones, computers, audio 
                interfaces, CD players. Delta-sigma DACs provide best audio quality with low distortion and high SNR.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Waveform Generation:</strong> Create arbitrary waveforms (sine, triangle, sawtooth) for 
                testing, signal processing, or function generators. 8-12 bit resolution sufficient for most applications. 
                Used in test equipment, synthesizers, and signal generators. Requires fast update rate for high 
                frequencies.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Control:</strong> Set motor speed or position via analog voltage. 8-10 bit resolution 
                typically adequate. Used in robotics, CNC machines, drones. PWM-based DACs work well. Requires 
                appropriate motor driver circuit. Smooth control requires filtering to remove PWM ripple.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Voltage Reference:</strong> Generate precise reference voltages for calibration, testing, or 
                analog circuits. Requires high accuracy (12-16 bits) and low drift. Used in instrumentation, data 
                acquisition, and precision measurement systems. External precision DACs (AD5680, DAC8568) recommended.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>LED Brightness Control:</strong> Adjust LED brightness smoothly. 8-bit resolution sufficient 
                for most applications. PWM-based control works well. Used in displays, indicators, lighting systems. 
                Higher resolution (10-12 bit) provides smoother dimming at low brightness levels.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Process Control:</strong> Set control voltages in industrial systems (temperature, pressure, 
                flow). 10-12 bit resolution typical. Requires stable, low-noise output. Used in PLCs, industrial 
                automation, HVAC systems. Often requires 4-20mA current output instead of voltage.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improving DAC Output Quality</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Output Filtering:</strong> Add RC low-pass filter to remove high-frequency noise and PWM 
                ripple. Cutoff frequency should be 10× lower than PWM frequency. Typical: 1kΩ resistor + 10µF 
                capacitor for ~16 Hz cutoff. For audio, use active filter (op-amp based) for better performance.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Buffer Amplifier:</strong> Use op-amp buffer (voltage follower) to provide low output 
                impedance and drive capability. Prevents loading effects when connecting to other circuits. Essential 
                for driving long cables or low-impedance loads. Use rail-to-rail op-amps for full voltage swing.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Reference Voltage:</strong> Use stable, low-noise voltage reference instead of supply voltage. 
                Precision references (LM4040, REF3033) provide ±0.1-1% accuracy. Supply voltage variations directly 
                affect DAC output. Critical for precision applications and measurements.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Power Supply Filtering:</strong> Use clean, stable power supply with proper decoupling. Add 
                0.1µF ceramic + 10µF electrolytic capacitors near DAC power pins. Separate analog and digital grounds 
                if possible. Power supply noise couples directly into DAC output, especially in high-resolution DACs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>PCB Layout:</strong> Keep analog traces short and away from digital signals. Use ground plane 
                for low impedance return path. Separate analog and digital sections. Shield sensitive traces if 
                necessary. Poor layout can introduce noise, crosstalk, and ground loops that degrade DAC performance.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate DAC output voltage?</h3>
              <p className="text-sm text-gray-700">
                For unipolar DAC: V<sub>out</sub> = (Digital Value / Max Value) × V<sub>ref</sub>. For 8-bit DAC 
                with 5V reference and digital input 128: V<sub>out</sub> = (128 / 255) × 5V = 2.51V. Max Value = 
                2<sup>n</sup> - 1 where n is the number of bits. For bipolar DAC, output ranges from -V<sub>ref</sub> 
                to +V<sub>ref</sub>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between unipolar and bipolar DAC?</h3>
              <p className="text-sm text-gray-700">
                Unipolar DACs produce output from 0V to +V<sub>ref</sub> (always positive). Most microcontroller DACs 
                are unipolar. Bipolar DACs produce output from -V<sub>ref</sub> to +V<sub>ref</sub> (both positive 
                and negative). Bipolar DACs are used in audio applications, signal processing, and control systems 
                requiring both polarities. Bipolar requires dual power supply or level shifting circuit.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I use Arduino analogWrite() as a DAC?</h3>
              <p className="text-sm text-gray-700">
                Arduino's analogWrite(pin, value) generates 8-bit PWM signal (0-255). To convert to analog voltage, 
                add RC low-pass filter: connect 1kΩ resistor from PWM pin to output, then 10µF capacitor from output 
                to ground. For 50% duty cycle (value=128), output will be ~2.5V on 5V Arduino. Not suitable for 
                high-frequency signals. For better performance, use external DAC IC like MCP4725.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What DAC resolution do I need for audio?</h3>
              <p className="text-sm text-gray-700">
                CD-quality audio uses 16-bit DAC (96 dB dynamic range). Professional audio uses 24-bit (144 dB 
                dynamic range). 8-bit (48 dB) is only suitable for voice or low-quality audio. Higher resolution 
                provides better signal-to-noise ratio and dynamic range. Sample rate is equally important: 44.1 kHz 
                minimum for audio, 48 kHz or 96 kHz for professional applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I connect DAC output directly to a speaker?</h3>
              <p className="text-sm text-gray-700">
                No, DAC output is low power (typically &lt;10mA) and cannot drive speakers directly. Use audio 
                amplifier (LM386, TDA2030, or Class-D amplifier) between DAC and speaker. DAC provides line-level 
                signal (~1V RMS), speakers need several watts. For headphones, use headphone amplifier. Direct 
                connection may damage DAC or produce very low volume.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is my DAC output noisy?</h3>
              <p className="text-sm text-gray-700">
                Common causes: poor power supply filtering, inadequate decoupling capacitors, ground loops, digital 
                noise coupling, missing output filter, or high-impedance load. Solutions: add 0.1µF + 10µF capacitors 
                at power pins, use separate analog/digital grounds, add RC low-pass filter at output, use shielded 
                cables, add op-amp buffer, use precision voltage reference instead of supply voltage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How fast can a DAC update its output?</h3>
              <p className="text-sm text-gray-700">
                Update rate depends on DAC type and resolution. Fast DACs (video, RF): &gt;100 MSPS (mega samples 
                per second). Audio DACs: 44.1-192 kSPS. Microcontroller DACs: 1-10 MSPS. Precision DACs: 100 kSPS - 
                1 MSPS. Arduino analogWrite(): ~490 Hz effective (limited by PWM frequency). External I2C DACs: 
                ~100 kHz (limited by I2C speed). SPI DACs are faster than I2C.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When using PWM-based DACs (like Arduino analogWrite), always add an RC low-pass filter to convert the 
            PWM signal to smooth analog voltage. Use cutoff frequency 10× lower than PWM frequency. For better 
            performance, use external DAC ICs like MCP4725 (12-bit, I2C) which provide true analog output without 
            filtering. When precision matters, use external voltage reference instead of supply voltage - this 
            eliminates output variations due to power supply fluctuations. For audio applications, always use 16-bit 
            or higher resolution DACs with proper anti-aliasing filters. Add op-amp buffer at DAC output to prevent 
            loading effects and provide low output impedance for driving cables or other circuits.
          </p>
        </section>

      </div>
    </div>
  );
}
