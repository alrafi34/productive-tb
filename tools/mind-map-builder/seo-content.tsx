"use client";

export default function MindMapBuilderSEOContent() {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Mind Map?</h2>
        <p className="mb-3">
          A mind map is a visual diagram used to organize information hierarchically around a central concept. It uses branches to represent related ideas, making it easier to understand complex topics and see relationships between concepts.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Mind Map Builder</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter a node title in the input field</li>
          <li>Choose a color for visual organization</li>
          <li>Click "Add Node" to create a new node on the canvas</li>
          <li>Drag nodes to reposition them</li>
          <li>Select a node and click "Connect" to link it to another node</li>
          <li>Use Undo/Redo to manage changes</li>
          <li>Export your mind map as PNG, SVG, or JSON</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Drag-and-Drop Nodes:</strong> Easily move nodes around the canvas</li>
          <li><strong>Visual Connections:</strong> Draw lines between related nodes</li>
          <li><strong>Color Customization:</strong> Choose from 8 vibrant colors</li>
          <li><strong>Zoom & Pan:</strong> Navigate large mind maps with ease</li>
          <li><strong>Undo/Redo:</strong> Revert or redo any action</li>
          <li><strong>Snap to Grid:</strong> Align nodes for organized layouts</li>
          <li><strong>Export Options:</strong> Save as PNG, SVG, or JSON</li>
          <li><strong>Import JSON:</strong> Load previously saved mind maps</li>
          <li><strong>Keyboard Shortcuts:</strong> Ctrl+Z (Undo), Ctrl+Y (Redo), Delete</li>
          <li><strong>100% Browser-Based:</strong> No server required, all processing local</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Project Planning:</strong> Organize tasks and dependencies</li>
          <li><strong>Brainstorming:</strong> Capture and organize ideas visually</li>
          <li><strong>Study Notes:</strong> Create hierarchical study guides</li>
          <li><strong>Story Outlining:</strong> Plan narrative structure and plot points</li>
          <li><strong>Business Strategy:</strong> Map out business processes and goals</li>
          <li><strong>Problem Solving:</strong> Break down complex problems into components</li>
          <li><strong>Team Collaboration:</strong> Share visual representations of ideas</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Effective Mind Mapping</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Start with a central concept and branch outward</li>
          <li>Use different colors to categorize related ideas</li>
          <li>Keep node titles concise and meaningful</li>
          <li>Connect related nodes to show relationships</li>
          <li>Use zoom to focus on specific areas</li>
          <li>Regularly save your work by exporting as JSON</li>
          <li>Use snap-to-grid for organized, professional layouts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Keyboard Shortcuts</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Ctrl+Z / Cmd+Z:</strong> Undo last action</li>
          <li><strong>Ctrl+Y / Cmd+Y:</strong> Redo last action</li>
          <li><strong>Delete:</strong> Delete selected node</li>
          <li><strong>Mouse Wheel:</strong> Zoom in/out</li>
          <li><strong>Drag Canvas:</strong> Pan around the mind map</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
        <p>
          Your mind maps are processed entirely in your browser. No data is sent to any server, ensuring complete privacy and security. You can safely work with sensitive information without worrying about data exposure.
        </p>
      </section>
    </div>
  );
}
