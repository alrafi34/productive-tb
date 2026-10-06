import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function GlassmorphismLayerTesterSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Glassmorphism Layer Tester
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Choose a preset or start with default glass settings</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Select a background scene to test your glass effect</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Adjust blur intensity, transparency, and tint color</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Fine-tune border glow and shadow depth</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Preview on different components and device sizes</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">6</span>
                <span>Export as CSS, Tailwind, SCSS, or JSON</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Real-time preview with instant updates
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                6 background scenes for testing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                6 professional glass presets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Adjustable blur (0-40px)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Custom tint colors
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Border and shadow controls
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Noise overlay option
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Component preview (card, navbar, modal, input)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Responsive device testing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Multiple export formats
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Glass Presets Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Glass Effect Presets Explained
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              🪟 Classic Glass
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Traditional frosted glass effect with balanced blur and transparency. Perfect for modern UI cards and panels. Uses 12px blur with 15% opacity for subtle elegance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              ❄️ Frosted Glass
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Heavy blur with subtle tint for maximum frosted effect. Ideal for overlays and modals. Features 20px blur with 10% opacity for strong visual separation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              🌙 Dark Glass
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Dark mode optimized glassmorphism with black tint. Perfect for dark UI themes and night mode interfaces. Uses 16px blur with 20% dark opacity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              💜 Neon Glass
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Vibrant colored glass with enhanced border glow. Great for creative designs and brand-focused interfaces. Features purple tint with 2px glowing border.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              🌫️ Ultra Blur
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Maximum blur effect for dramatic visual impact. Best for hero sections and large background elements. Uses 40px blur with minimal 8% opacity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              ✨ Subtle UI Glass
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Minimal glass effect for UI elements. Perfect for navigation bars and input fields. Features 8px blur with 18% opacity for subtle depth.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases for Glassmorphism
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl mb-3">🎴</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              UI Cards
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Create modern card components with frosted glass effect. Perfect for dashboards, portfolios, and content sections that need visual hierarchy.
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">🧭</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Navigation Bars
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Design floating navigation bars with backdrop blur. Maintains readability while allowing background content to show through elegantly.
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">🪟</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Modal Dialogs
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Build beautiful modal windows with glass effect. Creates focus on content while maintaining visual connection to underlying page.
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Form Elements
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Style input fields and form containers with subtle glass. Adds premium feel to forms while maintaining excellent usability.
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Hero Sections
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Design stunning landing page heroes with glass overlays. Creates depth and sophistication for first impressions.
            </p>
          </div>
          
          <div>
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Mobile Apps
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Implement iOS-style glass effects in web apps. Brings native app aesthetics to progressive web applications.
            </p>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Glassmorphism Layer Tester?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Instant Preview
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              See changes in real-time as you adjust sliders. No waiting, no lag. All rendering happens instantly using optimized CSS.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Multiple Backgrounds
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Test your glass effect on 6 different background scenes. See how it looks on light, dark, and colorful gradients before implementation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Component Preview
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Preview glass effects on real UI components: cards, navbars, modals, and inputs. See exactly how it will look in production.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Responsive Testing
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Test on mobile, tablet, and desktop sizes. Ensure your glass effect looks perfect on all devices before deploying.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Multiple Formats
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Export as CSS, Tailwind, SCSS, or JSON. Get code in your preferred format with vendor prefixes included automatically.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Privacy First
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              We do not collect or store what you enter. Your designs stay private.
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Pro Tips for Glassmorphism Design
        </h2>
        <div className="space-y-4 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Use colorful backgrounds:</strong> Glassmorphism works best on vibrant, gradient backgrounds. The blur effect needs visual complexity to shine.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Keep transparency low:</strong> Use opacity between 0.1-0.2 for best results. Too much transparency makes content hard to read.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Add subtle borders:</strong> A semi-transparent border (20-30% opacity) enhances the glass edge and improves definition.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Include vendor prefixes:</strong> Always use -webkit-backdrop-filter for Safari compatibility. Our tool includes this automatically.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Test on multiple backgrounds:</strong> Your glass effect will look different on various backgrounds. Test thoroughly before finalizing.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Add noise for realism:</strong> Enable noise overlay at 5-10% opacity to create authentic frosted glass texture.
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-primary mr-3 text-xl">💡</span>
            <div>
              <strong className="text-gray-800">Consider performance:</strong> Backdrop-filter can impact performance on low-end devices. Test on target hardware.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
