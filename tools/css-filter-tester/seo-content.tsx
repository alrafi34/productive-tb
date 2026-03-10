import React from 'react';

export default function CSSFilterTesterSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding CSS Filters
        </h2>
        <p className="text-gray-700 mb-4">
          CSS filters provide a powerful way to apply visual effects to images, backgrounds, and other elements directly in the browser. Unlike traditional image editing software, CSS filters are applied in real-time and can be animated, making them perfect for interactive web experiences.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Performance Benefits</h3>
            <p className="text-blue-700 text-sm">
              CSS filters are hardware-accelerated and don't require additional image files, reducing bandwidth and improving load times.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Dynamic Effects</h3>
            <p className="text-green-700 text-sm">
              Filters can be animated with CSS transitions and controlled with JavaScript for interactive experiences.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          CSS Filter Properties Explained
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">grayscale()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Converts the image to grayscale. Values range from 0% (original) to 100% (completely grayscale).
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: grayscale(50%);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">sepia()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Applies a sepia tone effect, giving images a warm, vintage appearance. Values from 0% to 100%.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: sepia(75%);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">blur()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Applies Gaussian blur to the image. Values are specified in pixels (px).
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: blur(5px);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">brightness()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Adjusts the brightness of the image. 100% is normal, below 100% darkens, above 100% brightens.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: brightness(150%);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">contrast()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Adjusts the contrast of the image. 100% is normal, higher values increase contrast.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: contrast(120%);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">saturate()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Adjusts color saturation. 100% is normal, 0% is grayscale, values above 100% increase saturation.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: saturate(200%);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">hue-rotate()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Rotates the hue of colors around the color wheel. Values are in degrees (0deg to 360deg).
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: hue-rotate(180deg);</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">invert()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Inverts the colors of the image. 0% is normal, 100% completely inverts all colors.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">filter: invert(100%);</code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the CSS Filter Tester
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Upload Your Image</h3>
            <p className="text-gray-700 text-sm">
              Click the upload button or drag and drop an image file (JPG, PNG, WebP) into the preview area. The tool works with any image format supported by browsers.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Adjust Filter Sliders</h3>
            <p className="text-gray-700 text-sm">
              Use the interactive sliders to adjust each filter property. The image preview updates in real-time as you make changes, allowing you to see the effects immediately.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Try Presets</h3>
            <p className="text-gray-700 text-sm">
              Use the preset buttons to quickly apply popular filter combinations like Vintage, Black & White, or Instagram Style effects.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">4. Copy CSS Code</h3>
            <p className="text-gray-700 text-sm">
              Once you're satisfied with the effect, copy the generated CSS code and paste it into your stylesheet or inline styles.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">5. Download Filtered Image</h3>
            <p className="text-gray-700 text-sm">
              Download the filtered image as a PNG file for use in other applications or as a backup of your effect.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Web Design</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Hero image effects and overlays</li>
              <li>• Hover state transformations</li>
              <li>• Background image treatments</li>
              <li>• Icon and logo modifications</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Interface</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Dark mode image adaptations</li>
              <li>• Disabled state styling</li>
              <li>• Focus and active states</li>
              <li>• Loading state effects</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Photography</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Vintage and retro effects</li>
              <li>• Black and white conversions</li>
              <li>• Color temperature adjustments</li>
              <li>• Artistic filter applications</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Branding</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Consistent image styling</li>
              <li>• Brand color adaptations</li>
              <li>• Social media image effects</li>
              <li>• Marketing material enhancements</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Browser Support and Performance
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Compatibility</h3>
          <p className="text-yellow-700 mb-4">
            CSS filters are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. For older browsers, consider providing fallback styles or using feature detection.
          </p>
          
          <h3 className="font-semibold text-yellow-800 mb-2">Performance Tips</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Use transform3d() or will-change to enable hardware acceleration</li>
            <li>• Avoid animating blur filters on large images</li>
            <li>• Combine multiple filters in a single filter property</li>
            <li>• Test performance on mobile devices</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I combine multiple filters?</h3>
            <p className="text-gray-700 text-sm">
              Yes! You can combine multiple filter functions in a single filter property. The order matters as filters are applied sequentially from left to right.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Do CSS filters affect performance?</h3>
            <p className="text-gray-700 text-sm">
              CSS filters are generally well-optimized and hardware-accelerated in modern browsers. However, complex filters like blur on large images may impact performance on lower-end devices.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I animate CSS filters?</h3>
            <p className="text-gray-700 text-sm">
              Yes! CSS filters can be animated using CSS transitions or keyframe animations. This allows for smooth hover effects and dynamic visual changes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What image formats are supported?</h3>
            <p className="text-gray-700 text-sm">
              CSS filters work with any image format supported by the browser, including JPG, PNG, WebP, SVG, and even video elements.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Advanced Filter Techniques
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Custom Filter Functions</h3>
          <p className="text-purple-700 mb-4">
            Beyond the standard filters, you can create custom effects by combining filters creatively:
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-purple-800">Duotone Effect</h4>
              <code className="bg-purple-200 px-2 py-1 rounded text-sm block mt-1">
                filter: grayscale(100%) sepia(100%) hue-rotate(180deg);
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-purple-800">Vintage Film</h4>
              <code className="bg-purple-200 px-2 py-1 rounded text-sm block mt-1">
                filter: sepia(50%) contrast(120%) brightness(110%) saturate(80%);
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-purple-800">Neon Glow</h4>
              <code className="bg-purple-200 px-2 py-1 rounded text-sm block mt-1">
                filter: contrast(150%) brightness(120%) saturate(200%) hue-rotate(90deg);
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}