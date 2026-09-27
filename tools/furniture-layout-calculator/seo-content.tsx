import ToolFaq from "@/components/ToolFaq";
import { furnitureLayoutCalculatorConfig } from "./config";

export default function FurnitureLayoutCalculatorSEO() {
  const { howToSteps, faq } = furnitureLayoutCalculatorConfig.seo;
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Furniture Layout Calculator
        </h2>
        <p className="mb-4">
          The Furniture Layout Calculator is an interactive room planning tool that helps you design and optimize furniture placement. Whether you're moving into a new home, redecorating, or planning an office space, this calculator provides instant visual feedback and space efficiency analysis.
        </p>
        <p>
          With drag-and-drop functionality, preset furniture dimensions, and automatic arrangement algorithms, you can experiment with different layouts before making any physical changes. The tool runs entirely in your browser with real-time calculations and visual rendering.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Calculator
        </h2>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Visual Layout Preview:</strong> See furniture placement in scaled room diagram</li>
          <li><strong>Auto-Arrange Algorithm:</strong> Automatically optimize furniture placement</li>
          <li><strong>Furniture Presets:</strong> 16 common furniture items with standard dimensions</li>
          <li><strong>Room Templates:</strong> Quick-start templates for common room types</li>
          <li><strong>Rotation Support:</strong> Rotate furniture 90° for better fit</li>
          <li><strong>Grid System:</strong> Toggle grid for precise alignment</li>
          <li><strong>Color Customization:</strong> Assign colors to furniture for easy identification</li>
          <li><strong>Space Efficiency:</strong> Real-time calculation of space utilization</li>
          <li><strong>Export Options:</strong> Download as PNG image or text report</li>
          <li><strong>Layout History:</strong> Save and reload previous layouts</li>
          <li><strong>Unit Conversion:</strong> Work in feet or meters</li>
          <li><strong>Responsive Design:</strong> Works on desktop, tablet, and mobile</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Space Efficiency
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">Efficiency Formula</h3>
          <p className="text-blue-800 font-mono text-sm mb-2">
            Efficiency (%) = (Used Area ÷ Total Room Area) × 100
          </p>
          <p className="text-blue-800 text-sm">
            Used Area = Sum of all furniture footprints
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <strong>Low Efficiency (0-30%):</strong> Plenty of open space. Room may feel empty or underutilized.
          </div>
          <div>
            <strong>Optimal Efficiency (30-60%):</strong> Balanced layout with good furniture coverage and comfortable walking space.
          </div>
          <div>
            <strong>High Efficiency (60-75%):</strong> Well-utilized space. Ensure adequate circulation paths.
          </div>
          <div>
            <strong>Overcrowded (75%+):</strong> Room may feel cramped. Consider removing items or using smaller furniture.
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Standard Furniture Dimensions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left">Furniture Type</th>
                <th className="px-4 py-2 border-b text-left">Width</th>
                <th className="px-4 py-2 border-b text-left">Height</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">Queen Bed</td>
                <td className="px-4 py-2 border-b">5 ft (60")</td>
                <td className="px-4 py-2 border-b">6.67 ft (80")</td>
                <td className="px-4 py-2 border-b">Bedroom</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">3-Seater Sofa</td>
                <td className="px-4 py-2 border-b">7 ft (84")</td>
                <td className="px-4 py-2 border-b">3 ft (36")</td>
                <td className="px-4 py-2 border-b">Living Room</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Dining Table (6-seat)</td>
                <td className="px-4 py-2 border-b">6 ft (72")</td>
                <td className="px-4 py-2 border-b">3 ft (36")</td>
                <td className="px-4 py-2 border-b">Dining</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Office Desk</td>
                <td className="px-4 py-2 border-b">5 ft (60")</td>
                <td className="px-4 py-2 border-b">2.5 ft (30")</td>
                <td className="px-4 py-2 border-b">Office</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Coffee Table</td>
                <td className="px-4 py-2 border-b">4 ft (48")</td>
                <td className="px-4 py-2 border-b">2 ft (24")</td>
                <td className="px-4 py-2 border-b">Living Room</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Room Planning Tips
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Start with Essentials:</strong> Place must-have furniture first, then add optional pieces</li>
          <li><strong>Consider Traffic Flow:</strong> Leave clear paths between doorways and high-use areas</li>
          <li><strong>Use the Auto-Arrange:</strong> Let the algorithm suggest optimal placement, then fine-tune</li>
          <li><strong>Try Rotation:</strong> Rotating furniture can sometimes create better flow</li>
          <li><strong>Leave Breathing Room:</strong> Aim for 30-60% efficiency for comfortable living spaces</li>
          <li><strong>Think Functionally:</strong> Group furniture by activity zones</li>
          <li><strong>Test Before Buying:</strong> Verify new furniture will fit before purchasing</li>
          <li><strong>Save Multiple Layouts:</strong> Compare different arrangements using the history feature</li>
        </ul>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Layout Planning
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Avoid Costly Mistakes:</strong> Verify furniture fits before purchasing or moving</li>
          <li><strong>Save Time:</strong> Plan layouts digitally instead of physical trial-and-error</li>
          <li><strong>Optimize Space:</strong> Make the most of every square foot</li>
          <li><strong>Improve Flow:</strong> Create comfortable circulation patterns</li>
          <li><strong>Visualize Options:</strong> Compare multiple layouts quickly</li>
          <li><strong>Reduce Stress:</strong> Eliminate guesswork from room planning</li>
          <li><strong>Professional Results:</strong> Achieve balanced, proportional layouts</li>
          <li><strong>Share Plans:</strong> Export layouts to share with family or contractors</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Professional Applications
        </h2>
        <div className="space-y-3">
          <div>
            <strong>Interior Designers:</strong> Create multiple layout options for client presentations
          </div>
          <div>
            <strong>Real Estate Agents:</strong> Help buyers visualize furniture in empty properties
          </div>
          <div>
            <strong>Home Stagers:</strong> Plan optimal furniture placement for property showings
          </div>
          <div>
            <strong>Office Planners:</strong> Design efficient workspace layouts
          </div>
          <div>
            <strong>Homeowners:</strong> Plan room makeovers and furniture purchases
          </div>
          <div>
            <strong>Students:</strong> Learn spatial planning and interior design principles
          </div>
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Start Planning Your Perfect Layout
        </h2>
        <p className="text-gray-700">
          Use our free Furniture Layout Calculator to design and optimize your room layout. Get instant visual feedback, space efficiency analysis, and export options. No registration required – start planning now!
        </p>
      </section>
    </div>
  );
}
