export default function SVGPathVisualizerSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the SVG Path Visualizer
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Paste your SVG path data into the input field</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>See the shape rendered instantly in the preview</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Adjust stroke, fill, and viewBox settings</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the generated SVG code for your project</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Live SVG path preview
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Grid and coordinate system
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Stroke and fill controls
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                ViewBox adjustment
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Sample path library
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                SVG file import
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SVG Path Commands Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Understanding SVG Path Commands
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Basic Commands</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">M</code>
                <div>
                  <strong>Move To</strong> - Moves to a point without drawing
                  <div className="text-gray-500 text-xs mt-1">Example: M10 10</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">L</code>
                <div>
                  <strong>Line To</strong> - Draws a straight line
                  <div className="text-gray-500 text-xs mt-1">Example: L50 50</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">H</code>
                <div>
                  <strong>Horizontal Line</strong> - Draws horizontal line
                  <div className="text-gray-500 text-xs mt-1">Example: H90</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">V</code>
                <div>
                  <strong>Vertical Line</strong> - Draws vertical line
                  <div className="text-gray-500 text-xs mt-1">Example: V90</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">Z</code>
                <div>
                  <strong>Close Path</strong> - Closes the current path
                  <div className="text-gray-500 text-xs mt-1">Example: Z</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Curve Commands</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">C</code>
                <div>
                  <strong>Cubic Bézier</strong> - Smooth curve with two control points
                  <div className="text-gray-500 text-xs mt-1">Example: C20 20, 40 20, 50 10</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">Q</code>
                <div>
                  <strong>Quadratic Bézier</strong> - Curve with one control point
                  <div className="text-gray-500 text-xs mt-1">Example: Q30 20, 50 50</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">S</code>
                <div>
                  <strong>Smooth Cubic</strong> - Continues previous curve smoothly
                  <div className="text-gray-500 text-xs mt-1">Example: S40 20, 50 10</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">T</code>
                <div>
                  <strong>Smooth Quadratic</strong> - Continues quadratic curve
                  <div className="text-gray-500 text-xs mt-1">Example: T90 50</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-gray-100 px-2 py-1 rounded font-mono text-primary font-semibold">A</code>
                <div>
                  <strong>Arc</strong> - Elliptical arc curve
                  <div className="text-gray-500 text-xs mt-1">Example: A20 20 0 1 1 49.9 10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What is an SVG path?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              An SVG path is a series of drawing commands that define a shape. The path data is stored in the 'd' attribute 
              of a path element and uses letter commands (like M, L, C) followed by coordinates to create complex shapes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I extract a path from an existing SVG?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can upload an SVG file using the import button, or copy the 'd' attribute value from a path element 
              in your SVG code. The tool will automatically extract and visualize the first path it finds.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Why is my path not displaying correctly?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Check that your path starts with a move command (M or m) and uses valid SVG path syntax. 
              You may also need to adjust the viewBox settings to fit your path coordinates.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What's the difference between absolute and relative commands?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Uppercase letters (M, L, C) use absolute coordinates relative to the SVG origin. 
              Lowercase letters (m, l, c) use relative coordinates from the current position.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use this tool to create SVG paths?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This tool is primarily for visualizing existing paths. While you can edit paths manually, 
              it's designed for debugging and understanding SVG path syntax rather than creating from scratch.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I optimize SVG paths for web use?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Keep paths simple, remove unnecessary decimal places, use relative commands when possible, 
              and combine multiple paths into single elements when appropriate for better performance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our SVG Path Visualizer?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Preview</h3>
            <p className="text-gray-600 text-sm">See your SVG paths rendered in real-time as you type or paste</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Debug Paths</h3>
            <p className="text-gray-600 text-sm">Quickly identify issues with SVG path syntax and coordinates</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Visual Controls</h3>
            <p className="text-gray-600 text-sm">Adjust styling, viewBox, and grid settings with intuitive controls</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">For Developers</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Debug SVG icons and graphics
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Understand complex path structures
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Optimize SVG code for web
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Extract paths from design files
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">For Designers</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Preview SVG exports from design tools
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Learn SVG path syntax
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Test icon scalability
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Validate design-to-code handoffs
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}