import React from 'react';
import ToolFaq from "@/components/ToolFaq";
import { gradientTextGeneratorConfig } from "./config";

export default function GradientTextGeneratorSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = gradientTextGeneratorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding CSS Gradient Text Effects
        </h2>
        <p className="text-gray-700 mb-4">
          CSS gradient text effects use the background-clip property to create stunning typography that stands out on web pages. This technique applies gradients as backgrounds to text elements and clips the background to only show within the text characters, creating colorful, eye-catching text effects.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Modern Browser Support</h3>
            <p className="text-blue-700 text-sm">
              Background-clip: text is supported in all modern browsers with proper vendor prefixes for maximum compatibility.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Performance Benefits</h3>
            <p className="text-green-700 text-sm">
              CSS gradients are vector-based and scale perfectly at any size without pixelation or additional HTTP requests.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          CSS Background-Clip Property Explained
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">background-clip: text</h3>
            <p className="text-gray-700 text-sm mb-2">
              The background-clip property determines how far a background extends within an element. When set to 'text', the background is clipped to the foreground text.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm block mt-2">
              background-clip: text;<br/>
              -webkit-background-clip: text;
            </code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">-webkit-text-fill-color: transparent</h3>
            <p className="text-gray-700 text-sm mb-2">
              This property makes the text fill transparent, allowing the background gradient to show through the text shape.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm block mt-2">
              -webkit-text-fill-color: transparent;<br/>
              color: transparent;
            </code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Complete Implementation</h3>
            <p className="text-gray-700 text-sm mb-2">
              Combine background gradients with clipping properties for cross-browser gradient text effects.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm block mt-2">
              background: linear-gradient(90deg, #ff6a00, #ee0979);<br/>
              -webkit-background-clip: text;<br/>
              -webkit-text-fill-color: transparent;<br/>
              background-clip: text;<br/>
              color: transparent;
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Gradient Text Generator
        </h2>
        <div className="space-y-4">
          {howToSteps.map(({ name, text }, i) => (
            <div key={name} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{i + 1}. {name}</h3>
              <p className="text-gray-700 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Gradient Types and Applications
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Linear Gradients</h3>
            <p className="text-gray-700 text-sm mb-2">
              Linear gradients transition colors along a straight line. Perfect for creating directional color flows and modern, clean text effects.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">linear-gradient(45deg, #ff6a00, #ee0979)</code>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Radial Gradients</h3>
            <p className="text-gray-700 text-sm mb-2">
              Radial gradients emanate from a center point, creating circular or elliptical color transitions. Great for spotlight effects and organic color flows.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">radial-gradient(circle, #ff6a00, #ee0979)</code>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Conic Gradients</h3>
            <p className="text-gray-700 text-sm mb-2">
              Conic gradients rotate colors around a center point, creating rainbow-like effects. Perfect for creative, artistic text treatments.
            </p>
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">conic-gradient(from 0deg, #ff6a00, #ee0979, #ff6a00)</code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Popular Gradient Text Presets
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Sunset</h3>
            <p className="text-gray-700 text-sm mb-2">Warm orange to pink gradient perfect for headers and call-to-action text</p>
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">linear-gradient(45deg, #ff9a9e, #fecfef)</code>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ocean</h3>
            <p className="text-gray-700 text-sm mb-2">Deep blue to cyan gradient ideal for tech and professional brands</p>
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">linear-gradient(135deg, #667eea, #764ba2)</code>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Rainbow</h3>
            <p className="text-gray-700 text-sm mb-2">Full spectrum gradient for creative and playful designs</p>
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">linear-gradient(90deg, #ff0000, #ff8000, #ffff00...)</code>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Neon</h3>
            <p className="text-gray-700 text-sm mb-2">Electric colors perfect for gaming and entertainment websites</p>
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">linear-gradient(45deg, #00f5ff, #fc00ff)</code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Website Headers</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Hero section headlines</li>
              <li>• Page titles and section headers</li>
              <li>• Navigation menu highlights</li>
              <li>• Logo text treatments</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Marketing Materials</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Call-to-action buttons</li>
              <li>• Promotional banners</li>
              <li>• Social media graphics</li>
              <li>• Email newsletter headers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Branding Elements</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Company taglines</li>
              <li>• Product names and features</li>
              <li>• Event titles and announcements</li>
              <li>• Award badges and certifications</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Interface</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Dashboard headings</li>
              <li>• Status indicators</li>
              <li>• Progress labels</li>
              <li>• Feature highlights</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Browser Compatibility and Fallbacks
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Cross-Browser Support</h3>
          <p className="text-yellow-700 mb-4">
            While gradient text is widely supported, always include fallbacks for older browsers and accessibility.
          </p>
          
          <div className="bg-yellow-100 p-4 rounded">
            <code className="text-sm">
              .gradient-text {`{`}<br/>
              &nbsp;&nbsp;color: #ff6a00; /* Fallback color */<br/>
              &nbsp;&nbsp;background: linear-gradient(90deg, #ff6a00, #ee0979);<br/>
              &nbsp;&nbsp;-webkit-background-clip: text;<br/>
              &nbsp;&nbsp;-webkit-text-fill-color: transparent;<br/>
              &nbsp;&nbsp;background-clip: text;<br/>
              {`}`}
            </code>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Advanced Techniques
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Multi-Layer Effects</h3>
          <p className="text-purple-700 mb-4">
            Combine multiple backgrounds and text shadows for complex, layered gradient effects:
          </p>
          
          <div className="bg-purple-100 p-4 rounded">
            <code className="text-sm">
              .complex-gradient {`{`}<br/>
              &nbsp;&nbsp;background: linear-gradient(45deg, #ff6a00, #ee0979),<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;linear-gradient(135deg, rgba(255,255,255,0.3), transparent);<br/>
              &nbsp;&nbsp;-webkit-background-clip: text;<br/>
              &nbsp;&nbsp;-webkit-text-fill-color: transparent;<br/>
              &nbsp;&nbsp;text-shadow: 0 2px 4px rgba(0,0,0,0.1);<br/>
              {`}`}
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}