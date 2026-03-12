import React from 'react';

export default function CSSKeyframeAnimatorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm mt-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is a CSS Keyframe Animator?
        </h2>
        <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          A CSS Keyframe Animator is a visual tool that allows developers and designers to create CSS @keyframes animations 
          without writing code manually. Using an intuitive timeline editor, you can add keyframes, adjust animation properties 
          like transform, opacity, and scale, and see your animation play in real-time. The tool generates production-ready 
          CSS code that you can copy directly into your projects, making animation creation faster and more visual.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How Do CSS Keyframes Work?
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p className="leading-relaxed">
            CSS keyframes define the intermediate steps in an animation sequence. Instead of just having a start and end state, 
            keyframes let you control exactly what happens at specific points during the animation:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>@keyframes:</strong> The CSS rule that defines animation stages</li>
            <li><strong>Percentages:</strong> Define when each stage occurs (0% = start, 100% = end)</li>
            <li><strong>Properties:</strong> CSS properties that change at each keyframe</li>
            <li><strong>Animation:</strong> The shorthand property that applies keyframes to elements</li>
            <li><strong>Timing Functions:</strong> Control the speed curve (ease, linear, etc.)</li>
          </ul>
          <p className="leading-relaxed">
            Our tool visualizes this process with a timeline editor, making it easy to create complex multi-step animations 
            without memorizing syntax.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⏱️ Visual Timeline Editor</h3>
            <p className="text-sm text-slate-600">
              Add, drag, and delete keyframes on an interactive timeline from 0% to 100%
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">▶️ Live Animation Preview</h3>
            <p className="text-sm text-slate-600">
              See your animation play in real-time with play/pause controls
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Multi-Property Keyframes</h3>
            <p className="text-sm text-slate-600">
              Animate transform, opacity, scale, rotation, and more in each keyframe
            </p>
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">✨ 8 Animation Presets</h3>
            <p className="text-sm text-slate-600">
              Start with ready-made animations: Fade In, Slide Up, Bounce, Rotate, Pulse, and more
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📱 Responsive Preview</h3>
            <p className="text-sm text-slate-600">
              Test animations in mobile, tablet, and desktop viewport sizes
            </p>
          </div>
          
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⚙️ Animation Controls</h3>
            <p className="text-sm text-slate-600">
              Adjust duration, delay, iteration count, direction, and fill mode
            </p>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📦 Multiple Export Formats</h3>
            <p className="text-sm text-slate-600">
              Export as complete CSS, keyframes only, shorthand, or SCSS mixin
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎯 Easing Functions</h3>
            <p className="text-sm text-slate-600">
              Choose from linear, ease, ease-in, ease-out, and ease-in-out timing
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Use Cases
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🌐 Website Animations</h3>
            <p className="leading-relaxed">
              Create smooth entrance animations for hero sections, cards, and UI elements to enhance user experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">📱 Mobile App Prototypes</h3>
            <p className="leading-relaxed">
              Design micro-interactions and transitions for mobile web apps with responsive preview modes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Loading Animations</h3>
            <p className="leading-relaxed">
              Build custom loading spinners, progress indicators, and skeleton screens with infinite loops.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">💼 Marketing Pages</h3>
            <p className="leading-relaxed">
              Add attention-grabbing animations to CTAs, feature highlights, and promotional banners.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🎓 Learning CSS Animations</h3>
            <p className="leading-relaxed">
              Understand how keyframes work by visually experimenting with different properties and timing.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How to Use the CSS Keyframe Animator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <li className="leading-relaxed">
            <strong>Choose a Preset or Start Fresh:</strong> Select from 8 animation presets or begin with default keyframes
          </li>
          <li className="leading-relaxed">
            <strong>Add Keyframes:</strong> Click "Add Keyframe" to create new animation stages on the timeline
          </li>
          <li className="leading-relaxed">
            <strong>Select a Keyframe:</strong> Click on any keyframe marker to edit its properties
          </li>
          <li className="leading-relaxed">
            <strong>Adjust Properties:</strong> Use sliders to modify translateX, translateY, scale, rotate, and opacity
          </li>
          <li className="leading-relaxed">
            <strong>Configure Animation:</strong> Set duration, delay, iteration count, direction, and easing
          </li>
          <li className="leading-relaxed">
            <strong>Preview Animation:</strong> Click "Play" to see your animation in action
          </li>
          <li className="leading-relaxed">
            <strong>Test Responsiveness:</strong> Switch between mobile, tablet, and desktop viewports
          </li>
          <li className="leading-relaxed">
            <strong>Export CSS:</strong> Copy or download the generated CSS in your preferred format
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Understanding Animation Properties
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Transform Properties</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>translateX:</strong> Move element horizontally (-200px to 200px)</li>
              <li><strong>translateY:</strong> Move element vertically (-200px to 200px)</li>
              <li><strong>scale:</strong> Resize element (0 to 3x)</li>
              <li><strong>rotate:</strong> Rotate element (-360° to 360°)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Visual Properties</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>opacity:</strong> Control transparency (0 = invisible, 1 = fully visible)</li>
              <li><strong>backgroundColor:</strong> Change background color</li>
              <li><strong>borderRadius:</strong> Adjust corner roundness</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Animation Settings</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>duration:</strong> How long the animation takes (0.1s to 10s)</li>
              <li><strong>delay:</strong> Wait time before animation starts (0s to 5s)</li>
              <li><strong>iterationCount:</strong> Number of times to repeat (1 to infinite)</li>
              <li><strong>direction:</strong> Play forward, reverse, or alternate</li>
              <li><strong>fillMode:</strong> Element state before/after animation</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Animation Timing Functions Explained
        </h2>
        <div className="space-y-3 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">linear</h3>
            <p className="text-sm">Constant speed from start to finish. No acceleration or deceleration.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">ease</h3>
            <p className="text-sm">Starts slow, speeds up in the middle, then slows down at the end. Most natural feeling.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">ease-in</h3>
            <p className="text-sm">Starts slow and gradually accelerates. Good for elements entering the screen.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">ease-out</h3>
            <p className="text-sm">Starts fast and gradually decelerates. Good for elements exiting or settling.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">ease-in-out</h3>
            <p className="text-sm">Slow start and slow end with faster middle. Smooth and balanced.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Best Practices for CSS Animations
        </h2>
        <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          <li>Keep animations subtle and purposeful—avoid distracting users from content</li>
          <li>Use durations between 200ms-500ms for UI interactions, longer for decorative animations</li>
          <li>Prefer transform and opacity for best performance (GPU-accelerated)</li>
          <li>Test animations on different devices and screen sizes</li>
          <li>Provide reduced-motion alternatives for accessibility</li>
          <li>Use ease-out for entrance animations and ease-in for exit animations</li>
          <li>Limit the number of simultaneously animating elements</li>
          <li>Consider using will-change property for complex animations</li>
          <li>Avoid animating layout properties like width, height, or margin when possible</li>
          <li>Use infinite iterations sparingly—they can drain battery on mobile devices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What's the difference between CSS animations and transitions?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transitions animate between two states when triggered (like hover). Animations use keyframes to define multiple 
              intermediate states and can run automatically, loop, and have more complex timing control.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Can I animate any CSS property?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Most CSS properties can be animated, but for best performance, stick to transform and opacity. These properties 
              are GPU-accelerated and won't trigger layout recalculations.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">How do I make animations accessible?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Use the prefers-reduced-motion media query to disable or simplify animations for users who have motion sensitivity. 
              Example: @media (prefers-reduced-motion: reduce) &#123; * &#123; animation: none !important; &#125; &#125;
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What does fill-mode do?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Fill-mode controls the element's state before and after animation. "forwards" keeps the final keyframe state, 
              "backwards" applies the first keyframe during delay, "both" does both, and "none" (default) doesn't apply either.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Can I use these animations in production?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Yes! The generated CSS is production-ready and works in all modern browsers. CSS animations have excellent browser 
              support (IE10+) and are widely used in professional websites and applications.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">How many keyframes should I use?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Start with 2-3 keyframes for simple animations. Add more for complex motion sequences, but avoid excessive keyframes 
              as they make animations harder to maintain. Most animations work well with 3-5 keyframes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What's the difference between alternate and alternate-reverse?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              "alternate" plays forward on odd iterations and backward on even iterations. "alternate-reverse" does the opposite—
              backward on odd iterations and forward on even iterations.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Example Animation Code
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Fade In Animation</h3>
            <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto">
{`@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease-in-out;
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bounce Animation</h3>
            <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto">
{`@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-30px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-15px); }
}

.element {
  animation: bounce 2s ease-in-out infinite;
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Complex Multi-Property Animation</h3>
            <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto">
{`@keyframes complexMove {
  0% {
    transform: translateX(0) scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateX(200px) scale(1.2) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0) scale(1) rotate(360deg);
    opacity: 1;
  }
}

.element {
  animation: complexMove 3s ease-in-out infinite alternate;
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
