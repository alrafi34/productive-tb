export default function LEDResistorCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an LED resistor calculator?",
      a: "An LED resistor calculator is a free online tool that computes the current-limiting resistor value needed to safely power one or more LEDs from a given supply voltage. Enter supply voltage, LED forward voltage, desired current, and number of LEDs in series, and the calculator returns the required resistance, the nearest standard E24 resistor value, and the resistor's power rating.",
    },
    {
      q: "What is the formula for an LED resistor?",
      a: "R = (Vs − N × Vf) ÷ If, where Vs is supply voltage, N is the number of LEDs in series, Vf is each LED's forward voltage, and If is the desired current in amps. For example, a single red LED (Vf = 2.0V, If = 20mA) on a 5V supply needs R = (5 − 2.0) ÷ 0.02 = 150Ω.",
    },
    {
      q: "Why does an LED need a current-limiting resistor at all?",
      a: "LEDs have a very steep current-voltage curve near their forward voltage — a tiny increase in voltage across the LED causes a large increase in current, with no natural current limit like a resistor has. Without a series resistor, an LED connected directly to a supply voltage above its forward voltage will draw excessive current almost instantly and burn out, often within seconds.",
    },
    {
      q: "What is LED forward voltage and why does it vary by color?",
      a: "Forward voltage (Vf) is the voltage drop across an LED when it's conducting current, and it depends on the semiconductor material's bandgap energy, which differs by color. Red and yellow LEDs typically have Vf around 1.8-2.2V, while green LEDs run about 2.0-2.2V, and blue and white LEDs (which use a different, wider-bandgap material) run higher, typically 3.0-3.4V.",
    },
    {
      q: "How do I calculate the resistor for multiple LEDs in series?",
      a: "Multiply the LED's forward voltage by the number of LEDs, then subtract from supply voltage before dividing by current: R = (Vs − N×Vf) ÷ If. Three red LEDs (Vf = 2.0V each) in series on a 9V supply at 20mA need R = (9 − 6.0) ÷ 0.02 = 150Ω — the same resistor value as a single LED on 5V in this particular example, since both scenarios happen to leave the same 3V across the resistor.",
    },
    {
      q: "Why is the calculated resistance never exactly a standard resistor value?",
      a: "The Ohm's Law calculation can produce any decimal value, but resistors are manufactured in standard series (like E24, with 24 values per decade) rather than arbitrary values. This calculator finds the nearest E24 standard value automatically — using a slightly higher resistance than calculated is always safer than a lower one, since it only reduces LED current slightly rather than risking overcurrent.",
    },
    {
      q: "How do I calculate the resistor's power rating?",
      a: "P = I² × R, using the actual current and resistance. A resistor dropping 3V at 20mA (0.02A) with 150Ω dissipates P = 0.02² × 150 = 0.06W. Standard practice is to use a resistor rated for at least twice the calculated power as a safety margin — in this case, a 1/8W (0.125W) or 1/4W (0.25W) resistor comfortably covers a 0.06W dissipation.",
    },
    {
      q: "What LED current should I use if I don't know the datasheet value?",
      a: "20mA (0.02A) is the standard assumption for most common 3mm and 5mm indicator LEDs and produces good brightness without excessive heat or reduced lifespan. High-power LEDs and specialty types can require significantly more or less current — always check the specific LED's datasheet when one is available rather than assuming 20mA for non-standard parts.",
    },
    {
      q: "Can I use a higher resistance than calculated to reduce LED brightness?",
      a: "Yes — increasing resistance above the calculated value reduces current and therefore brightness, which is a simple way to dim an LED without a dedicated dimming circuit. Going the other direction (lower resistance than calculated) increases current and brightness but risks exceeding the LED's maximum rated current and shortening its lifespan or causing failure.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, and LED count values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter supply voltage", "Input the voltage source powering the LED circuit, such as 5V from USB or 9V from a battery."],
    ["Enter LED forward voltage", "Input the LED's forward voltage from its datasheet, or use a preset for common colors (red/yellow ≈2.0V, green ≈2.1V, blue/white ≈3.2V)."],
    ["Enter desired LED current", "Input the target current in milliamps — 20mA is standard for common indicator LEDs unless the datasheet specifies otherwise."],
    ["Enter number of LEDs in series", "Input how many identical LEDs are connected in series sharing the same current-limiting resistor."],
    ["Read the required resistance and power", "The calculator returns the exact calculated resistance, the nearest standard E24 resistor value, and the required power rating."],
    ["Apply a preset or export results", "Use a built-in preset for common LED colors, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an LED Resistor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>LED resistor calculator</strong> computes the current-limiting resistor value needed
            to safely power one or more LEDs from a given supply voltage. Enter supply voltage, LED forward
            voltage, desired current, and number of LEDs in series, and the calculator returns the required
            resistance, the nearest standard E24 resistor value you can actually buy, and the resistor's
            power rating.
          </p>
          <p>
            LEDs need a series resistor because their current-voltage relationship is extremely steep near
            the forward voltage — without one, a tiny voltage increase drives current up rapidly and burns
            out the LED. The underlying math (Ohm's Law applied to the voltage remaining after the LED's
            drop) is simple, but real component selection also needs the nearest standard resistor value
            and a properly rated wattage, both of which this tool calculates automatically rather than
            leaving as a manual lookup step.
          </p>
          <p>
            Built for <strong>electronics hobbyists building LED circuits, students learning Ohm's Law
            applications, and hardware designers</strong> specifying indicator and status LEDs. Includes
            five built-in color presets with typical forward voltages, full step-by-step derivation, and
            text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The LED Resistor Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Resistance (R)</span> = (Vs − N × Vf) ÷ If</p>
              <p><span className="font-semibold">Power (P)</span> = If² × R</p>
              <p className="text-gray-500 text-xs mt-2">Example: Vs = 5V, Vf = 2.0V (red LED), If = 20mA</p>
              <p className="text-gray-500 text-xs">R = (5 − 2.0) ÷ 0.02 = <span className="text-green-600 font-semibold">150Ω</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Vs</strong> — supply voltage powering the circuit</li>
            <li><strong>N × Vf</strong> — total voltage dropped across all LEDs in the series chain</li>
            <li><strong>If</strong> — target LED current, commonly 20mA for standard indicator LEDs</li>
            <li>Round up to the nearest standard resistor value — slightly higher resistance is always safe, slightly lower risks overcurrent</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the LED Resistor Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time calculation as you type",
                "Exact calculated resistance and nearest E24 standard value",
                "Resistor power dissipation and recommended wattage",
                "Support for multiple LEDs in series",
                "Five color presets (red, green, yellow, blue, white)",
                "Full step-by-step derivation",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
                "No signup required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Single Red Indicator LED on 5V USB",
              scenario: "A hobbyist wiring a red status LED (Vf = 2.0V, 20mA) to a 5V USB supply calculates R = (5 − 2.0) ÷ 0.02 = 150Ω, which rounds to a standard 150Ω resistor. Power dissipation is 0.06W, well within a standard 1/8W or 1/4W resistor's rating.",
            },
            {
              title: "Three Blue LEDs in Series on 12V",
              scenario: "A project builder wiring three blue LEDs (Vf = 3.2V each, 20mA) in series on a 12V supply calculates R = (12 − 9.6) ÷ 0.02 = 120Ω, using a single resistor to limit current for the entire series chain rather than three separate resistors.",
            },
            {
              title: "White LED on a 9V Battery",
              scenario: "A hobbyist powering a single white LED (Vf = 3.2V, 20mA) from a 9V battery calculates R = (9 − 3.2) ÷ 0.02 = 290Ω, rounding to a standard 300Ω or 270Ω resistor depending on which the E24 series nearest-value calculation returns.",
            },
            {
              title: "High-Brightness LED at Higher Current",
              scenario: "A designer running a high-brightness green LED (Vf = 2.1V) at 30mA instead of the standard 20mA for extra brightness on a 5V supply calculates R = (5 − 2.1) ÷ 0.03 = 96.7Ω, rounding to a nearby standard value, with power dissipation increasing to 0.087W accordingly.",
            },
            {
              title: "LED Array Voltage Drop Check",
              scenario: "An engineer wiring four yellow LEDs (Vf = 2.1V each) in series on a 12V supply checks that 4 × 2.1V = 8.4V leaves enough headroom below the 12V supply. The calculator confirms R = (12 − 8.4) ÷ 0.02 = 180Ω, with the design working since the total LED voltage stays comfortably below supply voltage.",
            },
            {
              title: "Low-Current LED for Battery Conservation",
              scenario: "A battery-powered project designer reduces a red LED's current to 5mA to extend battery life, calculating R = (3.3 − 2.0) ÷ 0.005 = 260Ω on a 3.3V microcontroller supply — dimmer than standard brightness but sufficient for a status indicator while drawing far less current.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "When in doubt between two adjacent standard resistor values, choose the slightly higher one — it reduces LED current a bit below the ideal target rather than risking exceeding the LED's maximum rated current.",
                "Use the actual measured or datasheet forward voltage for the specific LED you're using rather than a generic color assumption whenever precision matters, since Vf varies somewhat between manufacturers and even between batches.",
                "For multiple LEDs, wiring them in series with one resistor uses less current overall than wiring them in parallel with separate resistors — series wiring is generally the more efficient choice when supply voltage allows for it.",
                "Always use at least double the calculated power dissipation as your resistor's rated wattage — this margin accounts for tolerance, ambient temperature, and keeps the resistor running cooler for a longer service life.",
                "Check the total LED voltage (N × Vf) leaves comfortable headroom below supply voltage — very little headroom means a very low resistance value, which reduces the resistor's ability to compensate for LED forward voltage variation between individual parts.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Wiring an LED directly to a supply voltage without any current-limiting resistor. Without a resistor, the LED's steep current-voltage curve means it will draw excessive current almost immediately and can burn out within seconds.",
                "Using the wrong forward voltage for the LED's actual color. Assuming a generic 2V forward voltage for a blue or white LED (which actually need around 3.2V) produces a resistance calculation that's significantly too low, over-driving the LED.",
                "Wiring LEDs of different colors or forward voltages in the same series chain expecting even current sharing. Mismatched forward voltages in series cause uneven brightness and can overdrive the lower-Vf LED — use identical LEDs in a series chain.",
                "Forgetting that total LED voltage must stay below supply voltage with enough margin for the resistor to actually limit current. If N × Vf is too close to Vs, small forward voltage variations between LED units can cause unpredictable current.",
                "Rounding the calculated power dissipation without adding safety margin, then selecting a resistor rated exactly at the calculated wattage. Resistors run hot near their rated limit, shortening lifespan — always size up.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common LED Forward Voltage Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">LED Color</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Forward Voltage (Vf)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Current</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R at 5V Supply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Red", "1.8-2.2V (typ. 2.0V)", "20mA", "150Ω"],
                ["Yellow", "2.0-2.2V (typ. 2.1V)", "20mA", "145Ω"],
                ["Green", "2.0-2.2V (typ. 2.1V)", "20mA", "145Ω"],
                ["Blue", "3.0-3.4V (typ. 3.2V)", "20mA", "90Ω"],
                ["White", "3.0-3.4V (typ. 3.2V)", "20mA", "90Ω"],
              ].map(([color, vf, current, r]) => (
                <tr key={color} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{color}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{vf}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{current}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Forward voltages vary by manufacturer — always check the specific LED's datasheet for precise calculations.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This LED Resistor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Calculate correct resistor values for LED indicator and lighting projects without manual formula lookup." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn Ohm's Law applications through practical LED circuit design and verify homework calculations." },
            { icon: "🔧", title: "Hardware Designers", desc: "Specify status and indicator LED resistors for PCB designs with correct power ratings." },
            { icon: "🎨", title: "Maker Community Members", desc: "Build LED art, wearables, and lighting projects with properly current-limited circuits." },
            { icon: "🏫", title: "Educators", desc: "Demonstrate practical Ohm's Law calculations using a familiar, visual LED circuit example." },
            { icon: "🤖", title: "Robotics & Arduino Builders", desc: "Calculate resistor values for status LEDs on microcontroller projects at 3.3V or 5V logic levels." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
