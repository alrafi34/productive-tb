export default function PWMDutyCycleCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is PWM (Pulse Width Modulation)?</h2>
          <p className="text-gray-700 leading-relaxed">
            PWM (Pulse Width Modulation) is a technique used to control the average power delivered to a load by switching 
            it on and off at a high frequency. The duty cycle represents the percentage of time the signal is ON (high) 
            versus the total period. PWM is widely used in motor speed control, LED brightness control, power regulation, 
            audio synthesis, and digital-to-analog conversion. By varying the duty cycle, you can control the effective 
            voltage or power delivered to the load without using variable resistors or linear regulators, making it highly 
            efficient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PWM Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Duty Cycle Calculation</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Duty Cycle (%) = (ON Time / Period) × 100</p>
              <p className="text-sm text-blue-700">
                Where Period = ON Time + OFF Time. Duty cycle represents the fraction of time the signal is high. 
                A 50% duty cycle means the signal is ON for half the period and OFF for the other half.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">ON Time Calculation</h3>
              <p className="text-green-800 font-mono text-lg mb-2">ON Time = (Duty Cycle / 100) × Period</p>
              <p className="text-sm text-green-700">
                Calculate the ON time when you know the desired duty cycle and period. For example, a 25% duty cycle 
                with 10ms period gives ON time = 0.25 × 10ms = 2.5ms.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Frequency and Period</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Frequency (Hz) = 1 / Period (s)</p>
              <p className="text-sm text-purple-700">
                Frequency is the number of complete cycles per second. A 1kHz PWM signal has a period of 1ms. 
                Higher frequencies result in smoother control but may increase switching losses.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> ON Time = 2ms, OFF Time = 8ms</p>
                <p><strong>Step 1:</strong> Period = 2ms + 8ms = 10ms</p>
                <p><strong>Step 2:</strong> Duty Cycle = (2ms / 10ms) × 100 = 20%</p>
                <p><strong>Step 3:</strong> Frequency = 1 / 0.01s = 100 Hz</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common PWM Applications</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Speed Control:</strong> PWM controls DC motor speed by varying the average voltage. 
                Higher duty cycle = faster speed. Typical frequency: 1-20kHz. Used in robotics, drones, electric 
                vehicles, and industrial automation. Avoids heat dissipation of linear control methods.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>LED Dimming:</strong> Control LED brightness without changing current. Duty cycle directly 
                controls perceived brightness. Frequency &gt; 100Hz avoids visible flicker. Used in displays, 
                automotive lighting, and smart home systems. More efficient than resistive dimming.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Power Regulation:</strong> Switch-mode power supplies use PWM to regulate output voltage 
                efficiently. Buck converters, boost converters, and DC-DC converters all rely on PWM. Efficiency 
                &gt; 90% compared to 50-60% for linear regulators.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Servo Control:</strong> Standard servos use 50Hz PWM with 1-2ms pulse width to control 
                position. 1ms = 0°, 1.5ms = 90°, 2ms = 180°. Used in robotics, RC vehicles, and automation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Audio Synthesis:</strong> Class-D amplifiers use PWM to generate audio signals with high 
                efficiency. PWM frequency typically 200-500kHz, well above audible range. Used in portable speakers 
                and automotive audio systems.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Arduino PWM Pins and Frequencies</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Board</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PWM Pins</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resolution</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Uno</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3, 5, 6, 9, 10, 11</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">490 Hz (980 Hz on 5,6)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-bit (0-255)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arduino Mega</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2-13, 44-46</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">490 Hz (980 Hz on 4,13)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-bit (0-255)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">ESP32</td>
                  <td className="px-4 py-3 text-sm text-gray-700">All GPIO pins</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">5 kHz (configurable)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-16 bit</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Raspberry Pi Pico</td>
                  <td className="px-4 py-3 text-sm text-gray-700">All GPIO pins</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">1 kHz (configurable)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">16-bit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing PWM Frequency</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Low Frequency (50-500 Hz):</strong> Used for servo control, heating elements, and applications 
                where switching losses must be minimized. Visible flicker in LEDs. Lower EMI. Suitable for high-power 
                applications with slow response time requirements.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Medium Frequency (1-20 kHz):</strong> Most common range for motor control and LED dimming. 
                Above human hearing range (20 kHz) to avoid audible noise. Good balance between switching losses and 
                control smoothness. Arduino default: 490-980 Hz.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>High Frequency (20-500 kHz):</strong> Used in switch-mode power supplies, Class-D amplifiers, 
                and applications requiring smooth output. Allows smaller filter components. Higher switching losses. 
                Requires fast switching devices (MOSFETs, IGBTs).
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PWM Resolution and Duty Cycle</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-3">Understanding Resolution</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>8-bit PWM (Arduino):</strong> 256 steps (0-255). Duty cycle = (value / 255) × 100%. 
              Value 128 = 50% duty cycle. Sufficient for most applications.</p>
              <p><strong>10-bit PWM:</strong> 1024 steps (0-1023). Finer control, useful for precise motor speed 
              or LED brightness control. Value 512 = 50% duty cycle.</p>
              <p><strong>16-bit PWM (ESP32, Pico):</strong> 65536 steps (0-65535). Ultra-fine control for 
              professional applications. Value 32768 = 50% duty cycle.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duty Cycle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">8-bit Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">10-bit Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">0%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0</td>
                  <td className="px-4 py-3 text-sm text-gray-600">OFF / Stop</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">25%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">64</td>
                  <td className="px-4 py-3 text-sm text-gray-700">256</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low speed / Dim</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">50%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">128</td>
                  <td className="px-4 py-3 text-sm text-gray-700">512</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Medium speed / Half brightness</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">75%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">192</td>
                  <td className="px-4 py-3 text-sm text-gray-700">768</td>
                  <td className="px-4 py-3 text-sm text-gray-600">High speed / Bright</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">100%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">255</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1023</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Full speed / Maximum brightness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between duty cycle and frequency?</h3>
              <p className="text-sm text-gray-700">
                Duty cycle is the percentage of time the signal is ON during one period, while frequency is the number 
                of complete cycles per second. A 50% duty cycle at 1kHz means the signal is ON for 0.5ms and OFF for 
                0.5ms, repeating 1000 times per second. You can have the same duty cycle at different frequencies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate PWM duty cycle for Arduino?</h3>
              <p className="text-sm text-gray-700">
                Arduino uses 8-bit PWM (0-255). To set a specific duty cycle, use: analogWrite(pin, (dutyCycle / 100) × 255). 
                For 50% duty cycle: analogWrite(9, 128). For 25%: analogWrite(9, 64). For 75%: analogWrite(9, 192). 
                The default Arduino PWM frequency is 490 Hz on most pins.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What PWM frequency should I use for LED dimming?</h3>
              <p className="text-sm text-gray-700">
                Use at least 100 Hz to avoid visible flicker, but 200-1000 Hz is recommended for smooth dimming. 
                Higher frequencies (1-10 kHz) eliminate flicker completely and work better with cameras. Very high 
                frequencies (&gt; 20 kHz) may cause audible noise in some LED drivers. Arduino default 490 Hz works 
                well for most LED applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use PWM to control AC devices?</h3>
              <p className="text-sm text-gray-700">
                Not directly. PWM from microcontrollers is DC (0-5V). To control AC devices, use a solid-state relay 
                (SSR), TRIAC, or optocoupler with zero-crossing detection. For AC motor speed control, use phase 
                control (dimmer circuit) or variable frequency drive (VFD), not simple PWM. Never connect PWM output 
                directly to AC mains.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why does my motor make noise with PWM control?</h3>
              <p className="text-sm text-gray-700">
                Audible noise occurs when PWM frequency is below 20 kHz (human hearing range). The motor vibrates at 
                the PWM frequency, creating sound. Solution: Increase PWM frequency to 20-40 kHz using timer 
                configuration. Trade-off: Higher frequency increases switching losses and heat in the motor driver. 
                Use proper motor driver ICs designed for PWM control.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I convert PWM to analog voltage?</h3>
              <p className="text-sm text-gray-700">
                Use a low-pass RC filter. Connect PWM output to a resistor (1-10kΩ), then to a capacitor (0.1-10µF) 
                to ground. Output voltage = Supply Voltage × (Duty Cycle / 100). For 5V PWM at 50% duty cycle, output 
                is 2.5V. Filter cutoff frequency should be 10-100× lower than PWM frequency for smooth DC output. 
                Add op-amp buffer for low-impedance output.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the maximum PWM frequency for Arduino?</h3>
              <p className="text-sm text-gray-700">
                Arduino Uno can achieve up to 62.5 kHz PWM by modifying timer prescaler, but at reduced resolution 
                (4-bit instead of 8-bit). Default is 490 Hz (8-bit). ESP32 supports up to 40 MHz PWM with configurable 
                resolution. Higher frequency requires lower resolution due to timer limitations. For most applications, 
                1-20 kHz at 8-bit resolution is optimal.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When using PWM for motor control, always use a motor driver IC (L298N, L293D, TB6612) instead of driving 
            the motor directly from microcontroller pins. Motor drivers provide current amplification, flyback diode 
            protection, and thermal shutdown. For LED dimming, use PWM frequency &gt; 200 Hz to avoid flicker. For 
            servo control, use exactly 50 Hz (20ms period) with 1-2ms pulse width. Always measure actual PWM frequency 
            with an oscilloscope when precision matters, as software delays and interrupts can affect timing.
          </p>
        </section>

      </div>
    </div>
  );
}
