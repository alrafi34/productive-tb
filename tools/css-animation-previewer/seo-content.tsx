import React from 'react';

export default function CSSAnimationPreviewerSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding CSS Animation Timing Functions
        </h2>
        <p className="text-gray-700 mb-4">
          CSS timing functions control the acceleration and deceleration of animations over time. They define how intermediate values are calculated during a transition, creating different visual effects from linear motion to complex easing curves.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Built-in Functions</h3>
            <p className="text-blue-700 text-sm">
              CSS provides several predefined timing functions like ease, ease-in, ease-out, and linear for common animation patterns.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Custom Curves</h3>
            <p className="text-green-700 text-sm">
              Cubic-bezier functions allow you to create custom easing curves for unique animation effects and brand-specific motion.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          CSS Timing Functions Explained
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">linear</h3>
            <p className="text-gray-700 text-sm mb-2">
              Creates constant speed animation with no acceleration or deceleration. Perfect for loading indicators and continuous rotations.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: linear;</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ease</h3>
            <p className="text-gray-700 text-sm mb-2">
              Default timing function. Starts slowly, accelerates in the middle, then slows down at the end. Natural feeling motion.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: ease;</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ease-in</h3>
            <p className="text-gray-700 text-sm mb-2">
              Starts slowly and accelerates towards the end. Great for elements entering the viewport or appearing.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: ease-in;</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ease-out</h3>
            <p className="text-gray-700 text-sm mb-2">
              Starts quickly and decelerates towards the end. Perfect for elements settling into place or coming to rest.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: ease-out;</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ease-in-out</h3>
            <p className="text-gray-700 text-sm mb-2">
              Combines ease-in and ease-out. Starts slowly, accelerates in the middle, then decelerates. Smooth, natural motion.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: ease-in-out;</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">cubic-bezier()</h3>
            <p className="text-gray-700 text-sm mb-2">
              Custom timing function defined by four control points. Allows complete control over animation acceleration and timing.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);</code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Animation Previewer
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Select Timing Function</h3>
            <p className="text-gray-700 text-sm">
              Choose from built-in timing functions or select "cubic-bezier" to create custom curves. Watch the animation preview update in real-time.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Adjust Animation Properties</h3>
            <p className="text-gray-700 text-sm">
              Control duration, delay, iteration count, and direction using the sliders and dropdowns. See how each property affects the animation behavior.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Edit Cubic Bezier Curves</h3>
            <p className="text-gray-700 text-sm">
              When using cubic-bezier, adjust the four control points to create custom easing curves. The graph visualization helps you understand the curve shape.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">4. Try Different Animation Types</h3>
            <p className="text-gray-700 text-sm">
              Test your timing functions with various animation types: translate, scale, rotate, fade, bounce, and slide to see how they behave differently.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">5. Copy Generated CSS</h3>
            <p className="text-gray-700 text-sm">
              Once satisfied with your animation, copy the generated CSS code including keyframes and paste it into your project.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Cubic Bezier Curves
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-purple-700 mb-4">
            Cubic bezier curves are defined by four points: two endpoints (always 0,0 and 1,1) and two control points that you can adjust. The control points determine the curve's shape and thus the animation's acceleration pattern.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Control Point 1 (x1, y1)</h4>
              <p className="text-purple-700 text-sm">
                Controls the initial acceleration. Higher y1 values create faster starts, while lower values create slower starts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Control Point 2 (x2, y2)</h4>
              <p className="text-purple-700 text-sm">
                Controls the final deceleration. Higher y2 values create abrupt stops, while lower values create gradual endings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Popular Animation Presets
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Material Design Standard</h3>
            <p className="text-gray-700 text-sm mb-2">cubic-bezier(0.4, 0, 0.2, 1)</p>
            <p className="text-gray-600 text-xs">Google's standard easing for smooth, natural motion</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ease Out Strong</h3>
            <p className="text-gray-700 text-sm mb-2">cubic-bezier(0.215, 0.61, 0.355, 1)</p>
            <p className="text-gray-600 text-xs">Strong deceleration for dramatic effect</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bounce</h3>
            <p className="text-gray-700 text-sm mb-2">cubic-bezier(0.68, -0.55, 0.265, 1.55)</p>
            <p className="text-gray-600 text-xs">Playful bouncing effect with overshoot</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Elastic</h3>
            <p className="text-gray-700 text-sm mb-2">cubic-bezier(0.175, 0.885, 0.32, 1.275)</p>
            <p className="text-gray-600 text-xs">Elastic spring-like motion</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Interface</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Button hover and click animations</li>
              <li>• Modal and dropdown entrance effects</li>
              <li>• Page transition animations</li>
              <li>• Loading and progress indicators</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Micro-interactions</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Form field focus states</li>
              <li>• Icon transformations</li>
              <li>• Notification appearances</li>
              <li>• Scroll-triggered animations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Brand Experience</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Logo animations and reveals</li>
              <li>• Hero section entrance effects</li>
              <li>• Product showcase animations</li>
              <li>• Call-to-action emphasis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Data Visualization</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Chart and graph animations</li>
              <li>• Counter and number animations</li>
              <li>• Progress bar fills</li>
              <li>• Data point transitions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Animation Performance Tips
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Use transform and opacity:</strong> These properties are hardware-accelerated and perform better than animating layout properties</li>
            <li>• <strong>Avoid animating expensive properties:</strong> Properties like width, height, and top/left can cause layout recalculations</li>
            <li>• <strong>Use will-change property:</strong> Hint to the browser which properties will be animated for better optimization</li>
            <li>• <strong>Keep animations under 16ms:</strong> Target 60fps by ensuring each frame renders in under 16 milliseconds</li>
            <li>• <strong>Test on mobile devices:</strong> Mobile devices have less processing power, so test performance on actual devices</li>
            <li>• <strong>Use CSS instead of JavaScript:</strong> CSS animations are often more performant than JavaScript-based animations</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What's the difference between animation and transition?</h3>
            <p className="text-gray-700 text-sm">
              Transitions occur between two states (like hover effects), while animations can have multiple keyframes and run independently of state changes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I use cubic-bezier values outside 0-1 range?</h3>
            <p className="text-gray-700 text-sm">
              Yes! Y values can go outside 0-1 to create overshoot effects (bounce, elastic). X values should stay within 0-1 for proper timing.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I choose the right timing function?</h3>
            <p className="text-gray-700 text-sm">
              Consider the context: ease-out for elements entering, ease-in for elements leaving, ease-in-out for continuous motion, and custom curves for brand-specific effects.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Are CSS animations better than JavaScript animations?</h3>
            <p className="text-gray-700 text-sm">
              CSS animations are often more performant and run on the compositor thread, but JavaScript gives you more control and can handle complex logic.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}