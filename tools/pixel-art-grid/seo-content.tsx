export default function PixelArtCreatorSEOContent() {
  return (
    <div className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Create Retro Pixel Art Online
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              🎮 Pixel Art Creator Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 16×16 and 32×32 grid sizes</li>
              <li>• Click and drag painting</li>
              <li>• Color picker with custom colors</li>
              <li>• Brush, eraser, and fill tools</li>
              <li>• Undo/redo functionality</li>
              <li>• Export as PNG image</li>
              <li>• Generate CSS grid code</li>
              <li>• Save/load JSON data</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              🎨 Perfect For
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Game developers creating sprites</li>
              <li>• Web designers making icons</li>
              <li>• Artists exploring pixel art</li>
              <li>• Students learning digital art</li>
              <li>• Hobbyists creating retro graphics</li>
              <li>• Developers needing CSS patterns</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Pixel Art Creator
          </h3>
          <ol className="space-y-2 text-gray-600">
            <li><strong>1.</strong> Choose your grid size (16×16 for simple art, 32×32 for detailed work)</li>
            <li><strong>2.</strong> Select a color using the color picker</li>
            <li><strong>3.</strong> Click or drag on the grid to paint pixels</li>
            <li><strong>4.</strong> Use the eraser tool to remove pixels</li>
            <li><strong>5.</strong> Export your artwork as PNG, CSS, or JSON</li>
          </ol>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            This pixel art creator runs entirely in your browser with no server required. 
            Your artwork is automatically saved locally and can be exported in multiple formats 
            for use in games, websites, or digital art projects.
          </p>
        </div>
      </div>
    </div>
  );
}