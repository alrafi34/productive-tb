import ToolFaq from "@/components/ToolFaq";
import { currentDividerCalculatorConfig } from "./config";

export default function CurrentDividerCalculatorSEO() {
  const { howToSteps, faq } = currentDividerCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Current Divider Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Current Divider Calculator is a professional electrical engineering tool designed to calculate how current splits across parallel resistors in electrical circuits. This calculator helps engineers, technicians, and students quickly determine the current flowing through each branch of a parallel network using the current divider rule.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            In parallel circuits, current divides inversely proportional to resistance - branches with lower resistance carry more current. This tool provides instant calculations with real-time updates, making it ideal for circuit analysis, design verification, and educational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Calculations:</strong> Instant results as you type with debounced input handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Multiple Resistors:</strong> Support for up to 10 parallel resistors in a single calculation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Unit Flexibility:</strong> Work with Ohms, Kiloohms, and Megaohms for different applications</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Detailed Results:</strong> Current, percentage distribution, and power dissipation for each branch</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Step-by-step Solutions:</strong> Complete calculation process with formulas and intermediate steps</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Validation Checks:</strong> Automatic verification that branch currents sum to total current</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical electrical scenarios</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as TXT or CSV files for documentation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous calculations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Divider Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Current Divider Rule</h3>
              <code className="text-sm text-gray-700">I<sub>x</sub> = I<sub>total</sub> × (1/R<sub>x</sub>) / Σ(1/R<sub>i</sub>)</code>
              <p className="text-sm text-gray-600 mt-2">
                Where I<sub>x</sub> is the current through resistor R<sub>x</sub>, I<sub>total</sub> is the total input current, and Σ(1/R<sub>i</sub>) is the sum of reciprocals of all parallel resistances.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Alternative Form (Two Resistors)</h3>
              <code className="text-sm text-gray-700">I<sub>1</sub> = I<sub>total</sub> × R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)</code>
              <p className="text-sm text-gray-600 mt-2">
                For two parallel resistors, the current through R<sub>1</sub> equals the total current times R<sub>2</sub> divided by the sum of both resistances. Note that the current is inversely proportional to resistance.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Conductance Method</h3>
              <code className="text-sm text-gray-700">I<sub>x</sub> = I<sub>total</sub> × G<sub>x</sub> / G<sub>total</sub></code>
              <p className="text-sm text-gray-600 mt-2">
                Where G<sub>x</sub> = 1/R<sub>x</sub> is the conductance of branch x, and G<sub>total</sub> is the sum of all branch conductances. This shows that current divides proportionally to conductance.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Example 1: Equal Resistors</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Given:</strong> I<sub>total</sub> = 10A, R<sub>1</sub> = 5Ω, R<sub>2</sub> = 5Ω</p>
                <p><strong>Solution:</strong></p>
                <p>G<sub>1</sub> = 1/5 = 0.2 S, G<sub>2</sub> = 1/5 = 0.2 S</p>
                <p>G<sub>total</sub> = 0.2 + 0.2 = 0.4 S</p>
                <p>I<sub>1</sub> = 10 × (0.2/0.4) = 5A</p>
                <p>I<sub>2</sub> = 10 × (0.2/0.4) = 5A</p>
                <p><strong>Result:</strong> Equal resistors carry equal current (50% each)</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Example 2: 2:1 Resistance Ratio</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Given:</strong> I<sub>total</sub> = 10A, R<sub>1</sub> = 5Ω, R<sub>2</sub> = 10Ω</p>
                <p><strong>Solution:</strong></p>
                <p>G<sub>1</sub> = 1/5 = 0.2 S, G<sub>2</sub> = 1/10 = 0.1 S</p>
                <p>G<sub>total</sub> = 0.2 + 0.1 = 0.3 S</p>
                <p>I<sub>1</sub> = 10 × (0.2/0.3) = 6.67A</p>
                <p>I<sub>2</sub> = 10 × (0.1/0.3) = 3.33A</p>
                <p><strong>Result:</strong> Lower resistance (R<sub>1</sub>) carries twice the current</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Example 3: Three Branches</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Given:</strong> I<sub>total</sub> = 12A, R<sub>1</sub> = 3Ω, R<sub>2</sub> = 6Ω, R<sub>3</sub> = 6Ω</p>
                <p><strong>Solution:</strong></p>
                <p>G<sub>1</sub> = 1/3 = 0.333 S, G<sub>2</sub> = 1/6 = 0.167 S, G<sub>3</sub> = 1/6 = 0.167 S</p>
                <p>G<sub>total</sub> = 0.333 + 0.167 + 0.167 = 0.667 S</p>
                <p>I<sub>1</sub> = 12 × (0.333/0.667) = 6A (50%)</p>
                <p>I<sub>2</sub> = 12 × (0.167/0.667) = 3A (25%)</p>
                <p>I<sub>3</sub> = 12 × (0.167/0.667) = 3A (25%)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Circuit Analysis</h3>
              <p className="text-sm text-blue-800">
                Analyze current distribution in parallel branches of electronic circuits. Essential for understanding load sharing and component stress.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Power Distribution</h3>
              <p className="text-sm text-green-800">
                Calculate current sharing in parallel power supplies, battery banks, and distribution systems for optimal load balancing.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Shunt Resistors</h3>
              <p className="text-sm text-purple-800">
                Design current measurement circuits using shunt resistors. Calculate the fraction of current flowing through measurement paths.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">LED Arrays</h3>
              <p className="text-sm text-orange-800">
                Determine current distribution in parallel LED strings. Ensure uniform brightness and prevent overcurrent conditions.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Motor Control</h3>
              <p className="text-sm text-red-800">
                Analyze current sharing in parallel motor windings and control circuits. Critical for motor protection and performance.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Sensor Networks</h3>
              <p className="text-sm text-yellow-800">
                Calculate current distribution in parallel sensor branches. Important for power budgeting and signal integrity.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-600 leading-relaxed">
            {howToSteps.map(({ name, text }, i) => (
              <li key={name} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                <span><strong>{name}:</strong> {text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Current Division</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-yellow-900">Key Principles:</h3>
            <div className="text-sm text-yellow-900 space-y-2">
              <p><strong>Inverse Relationship:</strong> Current is inversely proportional to resistance. Lower resistance branches carry more current.</p>
              <p><strong>Kirchhoff's Current Law:</strong> The sum of all branch currents equals the total input current (conservation of charge).</p>
              <p><strong>Conductance Proportionality:</strong> Current divides proportionally to conductance (G = 1/R). Higher conductance means more current.</p>
              <p><strong>Power Distribution:</strong> Power dissipated in each branch equals I²R, where I is the branch current and R is the branch resistance.</p>
              <p><strong>Percentage Distribution:</strong> Each branch carries a percentage of total current equal to its conductance divided by total conductance.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Current Sharing</h3>
              <p className="text-sm text-gray-700">
                For equal current sharing, use identical resistance values. Small resistance differences can cause significant current imbalances in parallel circuits.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Power Rating</h3>
              <p className="text-sm text-gray-700">
                Ensure each resistor can handle its calculated power dissipation (P = I²R). Lower resistance branches dissipate more power due to higher current.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Temperature Effects</h3>
              <p className="text-sm text-gray-700">
                Resistance changes with temperature can affect current distribution. Consider temperature coefficients for precision applications.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tolerance Impact</h3>
              <p className="text-sm text-gray-700">
                Resistor tolerances affect actual current distribution. Use precision resistors when accurate current sharing is critical.
              </p>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />

      </div>
    </div>
  );
}