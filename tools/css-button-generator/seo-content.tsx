import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function CSSButtonGeneratorSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;
  return (
    <div className="mt-12 space-y-8">
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About CSS Button Generator
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            The CSS Button Generator is a powerful visual design tool that allows developers and designers to create custom button styles interactively. 
            With live preview functionality, you can see your changes instantly as you adjust colors, shadows, border radius, padding, and hover effects.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            This tool generates both clean CSS code and equivalent Tailwind utility classes, making it perfect for any web development workflow. 
            Whether you're building a design system, prototyping interfaces, or need quick button styling, this generator provides production-ready code.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Visual Controls</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Live button preview with instant updates</li>
              <li>• Background and text color pickers</li>
              <li>• Border radius slider (0-50px)</li>
              <li>• Padding controls (vertical & horizontal)</li>
              <li>• Font size adjustment (12-28px)</li>
              <li>• Border width, style (solid, dashed, dotted) and color</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Advanced Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Box shadow presets (none, small, medium, large)</li>
              <li>• Hover state preview and customization</li>
              <li>• Transition duration control</li>
              <li>• Button style presets (Primary, Success, Danger, Ghost, Pill)</li>
              <li>• Copy CSS and Tailwind classes</li>
              <li>• Focus-visible outline for keyboard users</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Button Generator
        </h2>
        <div className="space-y-4 text-gray-600">
          {howToSteps.map(({ name, text }, i) => (
            <div key={name}>
              <h3 className="font-semibold text-gray-800 mb-2">{i + 1}. {name}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          CSS Button Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Design Guidelines</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Use consistent padding (typically 8-16px vertical, 16-32px horizontal)</li>
              <li>• Ensure sufficient color contrast for accessibility (4.5:1 minimum)</li>
              <li>• Keep border radius consistent across your design system</li>
              <li>• Use subtle shadows for depth without overwhelming the design</li>
              <li>• Make hover states visually distinct but not jarring</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Use CSS transitions for smooth hover effects</li>
              <li>• Prefer transform over changing layout properties</li>
              <li>• Keep transition durations between 150-300ms</li>
              <li>• Use box-shadow instead of border for focus states</li>
              <li>• Consider using CSS custom properties for theme consistency</li>
            </ul>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />
    </div>
  );
}