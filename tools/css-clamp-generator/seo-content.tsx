import React from 'react';

export default function CSSClampGeneratorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* How to Use Guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the CSS Clamp Generator</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Configure Your Values</h3>
            <p className="text-gray-600 mb-3">
              Set your minimum and maximum values along with the viewport range where the scaling should occur:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>Min Value:</strong> The smallest size your property should be</li>
              <li><strong>Max Value:</strong> The largest size your property should be</li>
              <li><strong>Min Viewport:</strong> The viewport width where min value applies</li>
              <li><strong>Max Viewport:</strong> The viewport width where max value applies</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Choose Your Property</h3>
            <p className="text-gray-600">
              Select the CSS property you want to make fluid. Options include font-size, padding, margin, 
              gap, width, height, border-radius, and more. Each property has sensible defaults to get you started.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Preview in Real-Time</h3>
            <p className="text-gray-600">
              See your clamp value in action with live preview elements. Use the viewport simulator slider 
              to test how your value scales across different screen sizes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Copy Your Code</h3>
            <p className="text-gray-600">
              Get your generated code in multiple formats: plain CSS, CSS variables, SCSS variables, 
              or Tailwind CSS classes. One-click copy makes it easy to use in your projects.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding CSS Clamp */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding CSS Clamp()</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is CSS Clamp?</h3>
            <p className="text-gray-600 mb-4">
              The CSS clamp() function allows you to set a value that scales fluidly between a minimum 
              and maximum value based on the viewport size. It takes three parameters:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block">
                clamp(MIN, PREFERRED, MAX)
              </code>
            </div>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>MIN:</strong> The minimum value (lower bound)</li>
              <li><strong>PREFERRED:</strong> The ideal value, typically using viewport units (vw)</li>
              <li><strong>MAX:</strong> The maximum value (upper bound)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How Clamp Works</h3>
            <p className="text-gray-600 mb-3">
              The browser evaluates the preferred value and constrains it between the min and max:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>If preferred value &lt; min → use min</li>
              <li>If preferred value &gt; max → use max</li>
              <li>Otherwise → use preferred value</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Real-World Example</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block mb-2">
                font-size: clamp(16px, 2vw + 12px, 32px);
              </code>
              <p className="text-sm text-gray-600">
                This creates a font size that:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4 mt-2">
                <li>Never goes below 16px (mobile readability)</li>
                <li>Scales with viewport width (2vw + 12px)</li>
                <li>Never exceeds 32px (desktop maximum)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Fluid Typography</h3>
            <p className="text-gray-600 mb-2">
              Create responsive text that scales smoothly across all screen sizes without media queries.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-xs text-gray-700">
                h1 &#123; font-size: clamp(2rem, 5vw, 4rem); &#125;
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsive Spacing</h3>
            <p className="text-gray-600 mb-2">
              Make padding and margins adapt to viewport size for better layouts.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-xs text-gray-700">
                .container &#123; padding: clamp(1rem, 3vw, 3rem); &#125;
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Flexible Layouts</h3>
            <p className="text-gray-600 mb-2">
              Create container widths that adapt without breakpoints.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-xs text-gray-700">
                .card &#123; width: clamp(300px, 50vw, 600px); &#125;
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Fluid Gaps</h3>
            <p className="text-gray-600 mb-2">
              Make grid and flexbox gaps responsive automatically.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-xs text-gray-700">
                .grid &#123; gap: clamp(1rem, 2vw, 2rem); &#125;
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Start with Accessibility</h4>
              <p className="text-gray-600">Ensure minimum font sizes are at least 14-16px for readability</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Test Across Viewports</h4>
              <p className="text-gray-600">Use the viewport simulator to verify scaling behavior at all sizes</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Use Relative Units</h4>
              <p className="text-gray-600">Consider using rem or em for better accessibility and user preferences</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Create Typography Scales</h4>
              <p className="text-gray-600">Use the scale generator to maintain consistent proportions across headings</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Document Your Values</h4>
              <p className="text-gray-600">Use CSS variables to make clamp values reusable and maintainable</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is CSS clamp() and why should I use it?</h3>
            <p className="text-gray-600">
              CSS clamp() is a function that creates fluid, responsive values that scale between a minimum 
              and maximum based on viewport size. It eliminates the need for multiple media queries and 
              creates smoother transitions between breakpoints, resulting in more maintainable and elegant code.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How is clamp() different from min() and max()?</h3>
            <p className="text-gray-600">
              While min() returns the smallest value and max() returns the largest, clamp() combines both 
              by constraining a preferred value between minimum and maximum bounds. Think of it as 
              min(MAX, max(MIN, PREFERRED)) in a single function.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What browsers support CSS clamp()?</h3>
            <p className="text-gray-600">
              CSS clamp() is supported in all modern browsers including Chrome 79+, Firefox 75+, Safari 13.1+, 
              and Edge 79+. For older browsers, you can provide fallback values or use PostCSS plugins 
              to generate media query alternatives.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use clamp() with any CSS property?</h3>
            <p className="text-gray-600">
              Yes! Clamp() works with any CSS property that accepts length values, including font-size, 
              padding, margin, width, height, gap, border-radius, and more. It's particularly useful 
              for typography and spacing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Should I use px, rem, or em for clamp values?</h3>
            <p className="text-gray-600">
              It depends on your use case. Use px for precise control, rem for scalability with user 
              font preferences, and em for values relative to parent elements. For typography, rem is 
              often the best choice for accessibility.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate the preferred value?</h3>
            <p className="text-gray-600">
              The preferred value uses a linear interpolation formula: slope × viewport + intercept. 
              Our generator calculates this automatically based on your min/max values and viewport range, 
              so you don't need to do the math manually.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Tips */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Tips</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Combining with CSS Variables</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block whitespace-pre">
{`:root {
  --fluid-text: clamp(1rem, 2vw + 0.5rem, 2rem);
  --fluid-space: clamp(1rem, 3vw, 3rem);
}

h1 { font-size: var(--fluid-text); }
.container { padding: var(--fluid-space); }`}
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Creating Design Systems</h3>
            <p className="text-gray-600 mb-3">
              Use clamp() to build entire fluid design systems with consistent scaling ratios:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block whitespace-pre">
{`--space-xs: clamp(0.5rem, 1vw, 1rem);
--space-sm: clamp(1rem, 2vw, 2rem);
--space-md: clamp(1.5rem, 3vw, 3rem);
--space-lg: clamp(2rem, 4vw, 4rem);
--space-xl: clamp(3rem, 6vw, 6rem);`}
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Fallbacks for Older Browsers</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm bg-gray-900 text-green-400 p-2 rounded block whitespace-pre">
{`h1 {
  font-size: 2rem; /* Fallback */
  font-size: clamp(1.5rem, 4vw, 3rem);
}`}
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}