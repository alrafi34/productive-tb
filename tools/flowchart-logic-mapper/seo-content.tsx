"use client";

export default function FlowchartSEOContent() {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-8 px-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Interactive Flowcharts Online</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Drag-and-drop box creation with multiple shapes</li>
              <li>✓ Connect boxes with customizable arrows</li>
              <li>✓ Real-time canvas rendering</li>
              <li>✓ Undo/Redo functionality</li>
              <li>✓ Zoom and pan controls</li>
              <li>✓ Snap-to-grid alignment</li>
              <li>✓ Export as PNG, SVG, or JSON</li>
              <li>✓ Save flowcharts to browser storage</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📊 Business process mapping and workflow documentation</li>
              <li>🔄 Algorithm visualization and logic flow design</li>
              <li>📋 Decision tree creation for complex scenarios</li>
              <li>🎓 Educational diagrams for teaching concepts</li>
              <li>🏗️ System architecture and data flow diagrams</li>
              <li>📈 Project planning and task dependencies</li>
              <li>🔧 Software development process flows</li>
              <li>💼 Organizational hierarchy and structure</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Enter a box title and select a color and shape</li>
            <li>Click "Add Box" to create nodes on the canvas</li>
            <li>Switch to "Connect" mode to draw arrows between boxes</li>
            <li>Drag boxes to reposition them on the canvas</li>
            <li>Use Undo/Redo to manage your changes</li>
            <li>Enable "Grid" for snap-to-grid alignment</li>
            <li>Export your flowchart as PNG, SVG, or JSON</li>
            <li>Save to browser storage for later editing</li>
          </ol>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Use Our Flowchart Mapper?</h3>
          <p className="text-sm text-gray-700 mb-3">
            Our free online flowchart logic mapper runs entirely in your browser with no backend required. Create professional flowcharts instantly without installing software or creating accounts. Perfect for developers, business analysts, students, and anyone who needs to visualize processes and workflows.
          </p>
          <p className="text-sm text-gray-700">
            With support for multiple box shapes, customizable colors, and flexible arrow connections, you can create any type of diagram from simple process flows to complex decision trees. Export your work in multiple formats and save it locally for future editing.
          </p>
        </div>
      </div>
    </div>
  );
}
