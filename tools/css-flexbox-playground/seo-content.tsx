export default function CSSFlexboxPlaygroundSEOContent() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What is CSS Flexbox?
        </h2>
        <p className="leading-relaxed">
          CSS Flexbox (Flexible Box Layout) is a powerful layout model that makes it easy to design flexible and responsive layouts. It provides an efficient way to arrange, distribute, and align items within a container, even when their size is unknown or dynamic.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Playground
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select a preset layout or manually adjust container properties</li>
          <li>Use the controls to modify flexbox properties in real-time</li>
          <li>Add or remove items to see how the layout responds</li>
          <li>Adjust individual item properties like flex-grow, flex-shrink, and order</li>
          <li>Copy the generated CSS code and use it in your projects</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Flexbox Properties
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">flex-direction</h3>
            <p className="text-sm text-gray-600">
              Defines the direction of flex items: row (horizontal), column (vertical), or reversed versions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">justify-content</h3>
            <p className="text-sm text-gray-600">
              Aligns flex items along the main axis: flex-start, center, flex-end, space-between, space-around, or space-evenly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">align-items</h3>
            <p className="text-sm text-gray-600">
              Aligns flex items along the cross axis: stretch, flex-start, center, flex-end, or baseline.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">flex-wrap</h3>
            <p className="text-sm text-gray-600">
              Controls whether flex items wrap to multiple lines: nowrap, wrap, or wrap-reverse.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">gap</h3>
            <p className="text-sm text-gray-600">
              Sets the space between flex items without affecting the container padding.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">flex-grow</h3>
            <p className="text-sm text-gray-600">
              Defines how much a flex item will grow relative to other items when there's extra space.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">flex-shrink</h3>
            <p className="text-sm text-gray-600">
              Defines how much a flex item will shrink relative to other items when space is limited.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">order</h3>
            <p className="text-sm text-gray-600">
              Changes the visual order of flex items without modifying the HTML structure.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Creating responsive navigation bars</li>
          <li>Building centered layouts</li>
          <li>Designing card grids</li>
          <li>Creating flexible sidebars</li>
          <li>Building responsive hero sections</li>
          <li>Creating equal-width columns</li>
          <li>Aligning items in footers</li>
          <li>Building mobile-first layouts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Support
        </h2>
        <p className="text-sm">
          Flexbox is supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For older browsers, consider using fallback layouts or CSS Grid as an alternative.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Tips for Learning Flexbox
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Start with simple layouts and gradually increase complexity</li>
          <li>Experiment with different property combinations</li>
          <li>Use the preview to visualize changes in real-time</li>
          <li>Test responsive behavior by switching preview modes</li>
          <li>Copy generated code and modify it in your projects</li>
          <li>Practice with the preset layouts to understand common patterns</li>
        </ul>
      </section>
    </div>
  );
}
