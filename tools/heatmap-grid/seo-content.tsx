"use client";

export default function HeatmapGridSEOContent() {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-8 px-4">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Interactive Heatmap Grids</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Customizable grid size (up to 100x100)</li>
              <li>✓ Click cells to increase density</li>
              <li>✓ Drag-to-paint multiple cells</li>
              <li>✓ Right-click to decrease density</li>
              <li>✓ Multiple color gradients</li>
              <li>✓ Hover tooltips with counts</li>
              <li>✓ Live statistics panel</li>
              <li>✓ Undo/Redo functionality</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📊 Data analysts visualizing frequency</li>
              <li>👁️ UX researchers tracking click patterns</li>
              <li>🎮 Gamification and game design</li>
              <li>📅 Event planners analyzing attendance</li>
              <li>🎓 Students learning probability</li>
              <li>📈 Business analytics and reporting</li>
              <li>🔬 Scientific data visualization</li>
              <li>🗳️ Survey and voting analysis</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-red-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Set your desired grid size (rows and columns)</li>
            <li>Click cells to increase density values</li>
            <li>Right-click cells to decrease values</li>
            <li>Drag across cells to paint multiple at once</li>
            <li>Watch the color intensity change based on density</li>
            <li>Select different color gradients for visualization</li>
            <li>View live statistics (total, max, average)</li>
            <li>Export your heatmap as PNG or SVG</li>
            <li>Save your work to browser storage</li>
          </ol>
        </div>

        <div className="mt-8 pt-8 border-t border-red-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Use Our Heatmap Grid?</h3>
          <p className="text-sm text-gray-700 mb-3">
            Our free online heatmap grid generator runs entirely in your browser with no backend required. Create professional heatmaps instantly without installing software or creating accounts. Perfect for data analysts, UX researchers, educators, and anyone who needs to visualize density or frequency patterns.
          </p>
          <p className="text-sm text-gray-700">
            With support for customizable grid sizes, multiple color gradients, drag-to-paint functionality, and live statistics, you can create any type of heatmap from simple educational examples to complex data analysis visualizations. Export your work in multiple formats and save it locally for future editing.
          </p>
        </div>
      </div>
    </div>
  );
}
