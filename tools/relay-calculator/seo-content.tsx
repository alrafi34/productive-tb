export default function RelayCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Relay?</h2>
          <p className="text-gray-700 leading-relaxed">
            A relay is an electrically operated switch that uses an electromagnet to mechanically operate switching contacts. 
            When current flows through the relay coil, it creates a magnetic field that pulls the armature, closing or opening 
            the contacts. Relays allow low-power circuits (like microcontrollers) to control high-power loads (like motors, 
            heaters, or AC appliances) safely. The coil circuit and contact circuit are electrically isolated, providing 
            protection and allowing different voltage levels. Relays are essential in automation, industrial control, automotive 
            systems, and home automation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Relay Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Coil Current Calculation</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">I_coil = V_supply / R_coil</p>
              <p className="text-sm text-blue-700">
                Where I_coil is the current through the relay coil in amperes, V_supply is the supply voltage, and 
                R_coil is the coil resistance in ohms. This determines how much current the relay draws from the power supply.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Coil Power Consumption</h3>
              <p className="text-green-800 font-mono text-lg mb-2">P = V × I</p>
              <p className="text-sm text-green-700">
                Power consumption in watts equals voltage times current. A 5V relay with 70Ω coil draws 71mA and consumes 
                0.355W. This is important for power budget calculations and heat dissipation.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Transistor Base Resistor</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Rb = (Vcc - Vbe) / Ib</p>
              <p className="text-sm text-purple-700">
                Where Ib = (Ic / hFE) × 2 (safety factor). Ic is the collector current (coil current), hFE is transistor 
                gain, Vcc is MCU voltage, and Vbe is base-emitter voltage (typically 0.7V). The safety factor ensures 
                transistor saturation.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> 5V supply, 70Ω coil, 5V MCU, hFE=100, Vbe=0.7V</p>
                <p><strong>Step 1:</strong> I_coil = 5V / 70Ω = 0.071A = 71mA</p>
                <p><strong>Step 2:</strong> P = 5V × 0.071A = 0.355W</p>
                <p><strong>Step 3:</strong> Ib = (0.071A / 100) × 2 = 0.00142A = 1.42mA</p>
                <p><strong>Step 4:</strong> Rb = (5V - 0.7V) / 0.00142A = 3028Ω ≈ 3kΩ</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Relay Types</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relay Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coil Voltage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coil Resistance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5V DC Relay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">70-125Ω</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Arduino, Raspberry Pi, 5V logic</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">12V DC Relay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">12V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">90-400Ω</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Automotive, 12V systems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">24V DC Relay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">24V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">400-1000Ω</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Industrial control, PLCs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3.3V DC Relay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.3V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">30-50Ω</td>
                  <td className="px-4 py-3 text-sm text-gray-600">ESP32, ESP8266, 3.3V MCUs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Solid State Relay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3-32V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">N/A</td>
                  <td className="px-4 py-3 text-sm text-gray-600">High-speed switching, no noise</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use a Transistor Driver?</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Current Limitation:</strong> Most microcontroller GPIO pins can only source/sink 20-40mA. 
                Relay coils typically draw 50-100mA or more. Exceeding GPIO current limits damages the microcontroller. 
                A transistor driver allows the MCU to control high-current loads safely.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Voltage Level Shifting:</strong> A 3.3V microcontroller (ESP32, ESP8266) cannot directly drive 
                a 5V or 12V relay. The transistor driver allows voltage level shifting, enabling a 3.3V MCU to control 
                a 12V relay by switching the higher voltage supply.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Protection from Back EMF:</strong> When the relay coil is de-energized, it generates a voltage 
                spike (back EMF) that can damage the MCU. A flyback diode across the coil protects the transistor and 
                MCU from this spike. Always use a diode (1N4007 or similar) in parallel with the relay coil.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Electrical Isolation:</strong> The transistor provides electrical isolation between the MCU 
                and the relay coil circuit. This prevents noise and voltage spikes from affecting the sensitive 
                microcontroller circuitry.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Relay Driver Circuit Design</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-3">Basic Transistor Relay Driver Circuit</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Components Required:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>NPN Transistor (2N2222, BC547, 2N3904)</li>
                <li>Base Resistor (calculated using this tool)</li>
                <li>Flyback Diode (1N4007, 1N4148)</li>
                <li>Relay (appropriate voltage and current rating)</li>
              </ul>
              <p className="mt-3"><strong>Circuit Connection:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>MCU GPIO → Base Resistor → Transistor Base</li>
                <li>Transistor Emitter → Ground</li>
                <li>Transistor Collector → Relay Coil (one end)</li>
                <li>Relay Coil (other end) → Supply Voltage (+)</li>
                <li>Flyback Diode across relay coil (cathode to +, anode to collector)</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Design Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-green-800 ml-4">
              <li>Measure or find relay coil voltage and resistance from datasheet</li>
              <li>Calculate coil current: I = V / R</li>
              <li>Select transistor with Ic rating &gt; coil current (2N2222: 800mA, BC547: 100mA)</li>
              <li>Calculate base current: Ib = (Ic / hFE) × 2 (safety factor)</li>
              <li>Calculate base resistor: Rb = (Vcc - 0.7V) / Ib</li>
              <li>Select nearest standard resistor value (E24 series)</li>
              <li>Add flyback diode (1N4007 for most applications)</li>
              <li>Verify load voltage and current are within relay contact ratings</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Relay Contact Ratings</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Voltage Rating:</strong> Maximum voltage the relay contacts can safely switch. Common ratings: 
                30V DC, 125V AC, 250V AC. Always use a relay rated for at least 1.5× your load voltage for safety margin. 
                AC and DC ratings are different - check datasheet carefully.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Current Rating:</strong> Maximum current the contacts can carry continuously. Common ratings: 
                1A, 5A, 10A, 30A. Inductive loads (motors, solenoids) require higher ratings due to inrush current. 
                Use 2-3× safety margin for motor loads.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Contact Configuration:</strong> SPST (Single Pole Single Throw), SPDT (Single Pole Double Throw), 
                DPDT (Double Pole Double Throw). SPST has one normally open (NO) contact. SPDT has NO and normally closed 
                (NC) contacts. DPDT can switch two separate circuits.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Switching Capacity:</strong> Product of voltage and current (VA rating). A 250V 10A relay has 
                2500VA switching capacity. This is the maximum power the contacts can switch. Exceeding this causes 
                contact welding or burning.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Relay Problems and Solutions</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Relay Not Switching</h3>
                  <p className="text-sm text-red-800">
                    <strong>Causes:</strong> Insufficient coil voltage, wrong coil voltage rating, damaged coil, 
                    transistor not saturating, base resistor too high.<br/>
                    <strong>Solution:</strong> Verify supply voltage matches relay rating. Check transistor is 
                    saturating (Vce &lt; 0.3V). Reduce base resistor if needed. Test coil resistance with multimeter.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">MCU Resets When Relay Switches</h3>
                  <p className="text-sm text-red-800">
                    <strong>Causes:</strong> Voltage drop on power supply, missing flyback diode, insufficient power 
                    supply current, poor grounding.<br/>
                    <strong>Solution:</strong> Add flyback diode (1N4007) across relay coil. Use separate power supply 
                    for relay. Add 100µF capacitor near MCU. Ensure common ground between MCU and relay circuit.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Relay Contacts Welded/Burned</h3>
                  <p className="text-sm text-red-800">
                    <strong>Causes:</strong> Load current exceeds relay rating, inductive load without snubber, 
                    contact arcing, switching AC at peak voltage.<br/>
                    <strong>Solution:</strong> Use relay rated for 2-3× load current. Add RC snubber (0.1µF + 100Ω) 
                    across contacts for inductive loads. Use zero-crossing SSR for AC loads. Consider contactor for 
                    high-power loads.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Relay Chattering/Buzzing</h3>
                  <p className="text-sm text-red-800">
                    <strong>Causes:</strong> Insufficient coil voltage, AC ripple on DC supply, mechanical vibration, 
                    worn contacts.<br/>
                    <strong>Solution:</strong> Ensure supply voltage is 90-110% of rated coil voltage. Add filter 
                    capacitor (1000µF) on relay supply. Mount relay securely. Replace relay if contacts are worn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Relay vs Solid State Relay (SSR)</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Electromechanical Relay</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Zero voltage drop across contacts (low resistance)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Can switch AC or DC loads</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Complete electrical isolation (coil to contacts)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Lower cost for low-power applications</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Mechanical wear (limited lifetime: 100k-1M cycles)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Slow switching speed (5-15ms)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Audible click noise</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Contact bounce and arcing</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">Solid State Relay (SSR)</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>No mechanical wear (unlimited lifetime)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Fast switching speed (&lt; 1ms)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Silent operation (no noise)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>No contact bounce or arcing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Voltage drop across output (1-2V, generates heat)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Usually AC-only or DC-only (not both)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Higher cost, especially for high current</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Requires heatsink for high-power applications</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>When to use electromechanical relay:</strong> Low-frequency switching (&lt; 1 Hz), low-power loads, 
              need to switch both AC and DC, cost-sensitive applications, complete isolation required.<br/><br/>
              <strong>When to use SSR:</strong> High-frequency switching (&gt; 1 Hz), long lifetime required, silent 
              operation needed, high reliability critical, PWM control, heater control.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I drive a relay directly from Arduino/MCU GPIO?</h3>
              <p className="text-sm text-gray-700">
                Only if the relay coil current is below 20mA AND the coil voltage matches the MCU voltage (5V or 3.3V). 
                Most relays draw 50-100mA, exceeding GPIO limits. Always use a transistor driver for safety. Even for 
                low-current relays, a transistor provides protection from back EMF and electrical isolation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What transistor should I use for relay driver?</h3>
              <p className="text-sm text-gray-700">
                For most relays, use NPN transistors like 2N2222 (800mA), BC547 (100mA), or 2N3904 (200mA). Choose 
                transistor with Ic rating at least 2× relay coil current. For high-current relays (&gt;500mA), use TIP120 
                Darlington (5A) or MOSFET like 2N7000. Always check transistor Vce rating exceeds supply voltage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why do I need a flyback diode?</h3>
              <p className="text-sm text-gray-700">
                When relay coil is de-energized, the collapsing magnetic field generates a voltage spike (back EMF) 
                that can reach 100-200V, damaging the transistor and MCU. The flyback diode (1N4007) provides a path 
                for this current, clamping the voltage to safe levels. Always connect diode across relay coil with 
                cathode (stripe) to positive supply.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate base resistor for transistor?</h3>
              <p className="text-sm text-gray-700">
                First calculate base current: Ib = (Ic / hFE) × 2, where Ic is coil current and hFE is transistor gain 
                (typically 100-300). The ×2 safety factor ensures saturation. Then calculate base resistor: 
                Rb = (Vcc - 0.7V) / Ib. For 5V MCU, 71mA coil, hFE=100: Ib = (0.071/100)×2 = 1.42mA, 
                Rb = (5-0.7)/0.00142 = 3028Ω ≈ 3kΩ.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use a 5V relay with 3.3V MCU?</h3>
              <p className="text-sm text-gray-700">
                Yes, using a transistor driver. The 3.3V MCU controls the transistor base through a base resistor. 
                The transistor switches the 5V supply to the relay coil. This is voltage level shifting - the MCU 
                operates at 3.3V while the relay operates at 5V. Common in ESP32/ESP8266 projects. Never connect 
                5V directly to 3.3V MCU pins.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is relay coil resistance and how to measure it?</h3>
              <p className="text-sm text-gray-700">
                Coil resistance is the DC resistance of the relay electromagnet coil, typically 30-1000Ω depending on 
                voltage rating. Measure with a multimeter in resistance mode across coil terminals (not contact 
                terminals). 5V relays: 70-125Ω, 12V relays: 90-400Ω, 24V relays: 400-1000Ω. If resistance is infinite, 
                coil is open (damaged). If near zero, coil is shorted.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I know if my relay is safe for the load?</h3>
              <p className="text-sm text-gray-700">
                Check relay datasheet for contact voltage and current ratings. Load voltage must be ≤ rated voltage, 
                and load current must be ≤ rated current. For inductive loads (motors, solenoids), use 2-3× safety 
                margin due to inrush current. For AC loads, check AC rating specifically. A 250V 10A relay can safely 
                switch 220V 5A resistive load, but only 220V 3A motor load.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When designing relay driver circuits, always add a flyback diode (1N4007) across the relay coil, use a 
            transistor driver even if the MCU can theoretically source enough current, and verify both voltage and 
            current ratings with safety margins. For critical applications, use relay modules with built-in driver 
            circuits and optoisolation. Test your circuit with a multimeter before connecting high-power loads. 
            Measure transistor collector-emitter voltage (Vce) when relay is energized - it should be &lt; 0.3V for 
            proper saturation. If Vce &gt; 1V, reduce base resistor value.
          </p>
        </section>

      </div>
    </div>
  );
}
