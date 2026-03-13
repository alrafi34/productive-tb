"use client";

export default function VennDiagramSEOContent() {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-8 px-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Interactive Venn Diagrams</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ 2 or 3-circle overlapping diagrams</li>
              <li>✓ Drag-and-drop circle positioning</li>
              <li>✓ Resize circles with sliders</li>
              <li>✓ Custom labels for circles and intersections</li>
              <li>✓ Color and opacity customization</li>
              <li>✓ Real-time rendering</li>
              <li>✓ Undo/Redo functionality</li>
              <li>✓ Export as PNG or SVG</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📚 Students visualizing set relationships</li>
              <li>👨‍🏫 Teachers creating educational diagrams</li>
              <li>💼 Business analysts showing overlapping categories</li>
              <li>🎤 Presenters illustrating intersections</li>
              <li>📊 Data visualization and analysis</li>
              <li>🧠 Logic and reasoning diagrams</li>
              <li>📈 Market segmentation analysis</li>
              <li>🎓 Academic research presentations</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Select 2 or 3 circles from the dropdown</li>
            <li>Drag circles on the canvas to position them</li>
            <li>Adjust circle size using the radius slider</li>
            <li>Customize colors and opacity for each circle</li>
            <li>Add labels to circles and intersection areas</li>
            <li>Use Undo/Redo to manage changes</li>
            <li>Export your diagram as PNG or SVG</li>
            <li>Save to browser storage for later editing</li>
          </ol>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Use Our Venn Diagram Maker?</h3>
          <p className="text-sm text-gray-700 mb-3">
            Our free online Venn diagram maker runs entirely in your browser with no backend required. Create professional diagrams instantly without installing software or creating accounts. Perfect for students, teachers, business professionals, and anyone who needs to visualize set relationships and overlapping categories.
          </p>
          <p className="text-sm text-gray-700">
            With support for 2 or 3 circles, customizable colors, opacity controls, and flexible labeling, you can create any type of Venn diagram from simple educational examples to complex business analysis. Export your work in multiple formats and save it locally for future editing.
          </p>
        </div>
      </div>
    </div>
  );
}
