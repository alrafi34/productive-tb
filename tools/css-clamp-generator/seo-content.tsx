import React from 'react';
import ToolFaq from "@/components/ToolFaq";
import { cssClampGeneratorConfig } from "./config";

export default function CSSClampGeneratorSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = cssClampGeneratorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* How to Use Guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the CSS Clamp Generator</h2>
        
        <ol className="space-y-4">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name}>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{i + 1}. {name}</h3>
              <p className="text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
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
      <ToolFaq items={faq} />

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