export default function CSSBoxShadowGeneratorSEO() {
  const faqItems = [
    { q: "What is a CSS box shadow generator?", a: "A CSS box shadow generator is a free online tool that lets you visually design box-shadow styles using sliders and controls, then copies the production-ready CSS code for use in websites and applications. Instead of writing box-shadow values by hand and reloading the browser to check results, you adjust horizontal offset, vertical offset, blur radius, spread radius, color, and opacity in real time and see the shadow update instantly on a preview element." },
    { q: "What does each box-shadow property control?", a: "The box-shadow property accepts five values in order: horizontal offset (positive moves shadow right, negative moves left), vertical offset (positive moves shadow down, negative moves up), blur radius (higher values create softer edges — 0 produces a sharp shadow), spread radius (positive values expand the shadow beyond the element's edges, negative values shrink it), and color (including opacity via RGBA or HSLA). The optional 'inset' keyword moves the shadow inside the element border rather than outside." },
    { q: "What is inset shadow and when should I use it?", a: "An inset box-shadow renders inside the element boundary rather than outside. Use inset shadows for pressed-button effects (a button that appears to depress on click), recessed input fields, neumorphic UI elements that simulate physical depth, and inner glow effects. Inset shadows can be layered with outset shadows on the same element — the CSS accepts a comma-separated list of shadow declarations." },
    { q: "Can I add multiple shadow layers?", a: "Yes. Box-shadow accepts a comma-separated list of shadow values, allowing multiple layers on a single element. Multi-layer shadows are useful for building realistic depth hierarchies, combining a sharp near-shadow with a diffuse far-shadow (the Google Material Design technique), and creating glow effects with a colored outer layer and a neutral inner layer. This tool lets you add, remove, and reorder layers with the combined CSS output updating in real time." },
    { q: "What is the CSS box-shadow syntax?", a: "The full syntax is: box-shadow: [inset] offset-x offset-y blur-radius spread-radius color. Example: box-shadow: 0px 4px 16px -2px rgba(0,0,0,0.15). For multiple shadows, separate each declaration with a comma: box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08). The generated CSS from this tool uses this exact syntax and is ready to paste into any stylesheet." },
    { q: "How do I create a neumorphism shadow effect?", a: "Neumorphism uses two shadows in opposite directions — one lighter than the background, one darker — to simulate a soft extruded surface. For a light background element: box-shadow: 6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7). The key parameters are equal and opposite offsets, a low-to-medium blur, and colors that are slightly darker and lighter than the background respectively. Use the neumorphism preset in this tool as a starting point, then adjust colors to match your background." },
    { q: "What blur and spread values should I use for card shadows?", a: "A widely-used card shadow pattern is a two-layer shadow: a sharp close shadow for definition and a soft far shadow for elevation. Example: box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08). The first layer (blur 3px, opacity 12%) creates a crisp edge. The second layer (blur 20px, opacity 8%) creates the ambient lift effect. Google Material Design uses exactly this technique with three layers at different elevations." },
    { q: "Does box-shadow affect layout or performance?", a: "Box-shadow does not affect document layout — it is rendered outside the element's box model and does not push other elements. It has no effect on margin, padding, or the element's dimensions. For performance, box-shadow is GPU-composited in modern browsers and is generally cheaper to animate than filter: drop-shadow or multiple background layers. Avoid very large blur values (above 80–100px) on elements that animate, as repaints become more expensive at large blur radii." },
    { q: "What is the difference between box-shadow and filter drop-shadow?", a: "box-shadow follows the element's rectangular border-box, including border-radius for rounded corners. filter: drop-shadow() follows the actual visible shape of the element — including transparent cutouts in PNGs, SVG shapes, and irregular clipping paths. Use box-shadow for standard UI components (cards, buttons, modals). Use filter: drop-shadow() when the element has a non-rectangular visible shape and you want the shadow to conform to that shape." },
    { q: "Is my design data private when using this tool?", a: "Yes. All shadow generation runs entirely in your browser using JavaScript. Your shadow values, color choices, and configurations are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Adjust the offset and blur values", "Use the X offset, Y offset, and blur radius sliders to position and soften the shadow. Positive X moves it right; positive Y moves it down. Higher blur values create softer, more diffuse shadows. Zero blur creates a sharp, hard-edged shadow."],
    ["Set spread and color", "Spread radius expands (positive) or contracts (negative) the shadow beyond the element's edges. Set the shadow color using the color picker and adjust opacity using the alpha channel for subtle or pronounced effects."],
    ["Toggle inset mode if needed", "Enable the inset toggle to move the shadow inside the element border. Inset shadows are used for pressed states, recessed fields, and neumorphic depth effects. Outset and inset shadows can coexist on the same element."],
    ["Add additional shadow layers", "Click 'Add Layer' to stack a second or third shadow declaration. Multi-layer shadows — a sharp close shadow plus a soft far shadow — create realistic depth. Reorder layers to change their render priority."],
    ["Apply a preset and refine", "Select a preset (soft, material, deep, floating, or neumorphism) to load proven starting values, then fine-tune each parameter to match your design system or brand style."],
    ["Copy the CSS and paste into your project", "Click the Copy button to copy the complete box-shadow declaration to your clipboard. Paste it directly into your stylesheet, CSS module, Tailwind config, or component style block — no editing required."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          CSS Box Shadow Generator
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>CSS box shadow generator</strong> is a free online design tool that lets you build
            box-shadow styles visually — adjusting offsets, blur, spread, color, and opacity with
            sliders — and outputs production-ready CSS code you can paste directly into any project.
            No manual trial-and-error with values, no browser reloads to check results.
          </p>
          <p>
            Writing box-shadow by hand works for simple single-layer shadows, but the real power of the
            property comes from layering. A two-layer shadow — a sharp close shadow for definition and a
            soft diffuse shadow for elevation — is what separates polished UI from flat, lifeless components.
            This <strong>box shadow generator</strong> makes that workflow visual: add layers, adjust each
            independently, preview on a real element against different backgrounds, and copy the complete
            multi-declaration CSS in one click. It also supports inset shadows, neumorphism presets, and
            the full range of <strong>CSS shadow</strong> parameters.
          </p>
          <p>
            Built for <strong>frontend developers building component libraries, UI designers prototyping
            elevation systems, full-stack teams who need quick shadow code without opening Figma,
            and CSS learners exploring how box-shadow parameters interact</strong>. Browser-based, free,
            no account required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How CSS Box Shadow Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">CSS Syntax</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">box-shadow:</span> [inset] offset-x offset-y blur spread color;</p>
              <p className="text-gray-500 text-xs mt-1">Single layer: <span className="text-green-600">0px 4px 16px -2px rgba(0,0,0,0.15)</span></p>
              <p className="text-gray-500 text-xs">Multi-layer: <span className="text-green-600">0 1px 3px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>offset-x</strong> — horizontal position; positive = right, negative = left</li>
            <li><strong>offset-y</strong> — vertical position; positive = down, negative = up</li>
            <li><strong>blur-radius</strong> — softness of the shadow edge; 0 = hard edge, higher = more diffuse</li>
            <li><strong>spread-radius</strong> — size beyond element border; positive expands, negative contracts</li>
            <li><strong>color</strong> — use rgba() or hsla() to control opacity independently of the color</li>
            <li><strong>inset</strong> — optional keyword; moves shadow inside the element rather than outside</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CSS Box Shadow Generator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Live shadow preview — updates on every slider change",
                "X/Y offset, blur, and spread radius controls",
                "Color picker with full RGBA opacity control",
                "Inset shadow toggle",
                "Multiple shadow layers — add, remove, reorder",
                "Presets: soft, material, deep, floating, neumorphism",
                "Preview background color selector",
                "Production-ready CSS output — one-click copy",
                "100% browser-based — no data sent to server",
                "No registration required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Card Elevation System",
              scenario: "A frontend developer is building a design system and needs three distinct card elevations: resting, hovered, and active. For resting: box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.07). For hovered: box-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.10). For active (pressed): box-shadow: 0 1px 2px rgba(0,0,0,0.10). All three are generated in the tool, copied directly into CSS variables, and toggled via class names — consistent depth system built in under 10 minutes.",
            },
            {
              title: "CTA Button Shadow",
              scenario: "A designer wants a primary button that looks slightly raised to draw attention. Single-layer soft shadow: box-shadow: 0 4px 12px rgba(59,130,246,0.40) — using the button's own brand blue at 40% opacity rather than black. On hover, spread increases: 0 6px 20px rgba(59,130,246,0.50). The colored shadow integrates with the button's background rather than clashing with it. Generated in the tool, previewed against both light and dark page backgrounds before committing to the component.",
            },
            {
              title: "Neumorphism Prototype",
              scenario: "A UI designer is prototyping a soft-UI dashboard widget. Using the neumorphism preset as a base: box-shadow: 6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.70). They adjust the blur from 12px to 18px for a softer look, reduce the dark shadow opacity to 10%, and change the background preview to match their app's #E8EDF2 surface color. The final CSS is copied and pasted into the styled-component, achieving the soft-UI look in a single iteration.",
            },
            {
              title: "Modal and Overlay Depth",
              scenario: "A developer needs a modal dialog shadow that clearly separates it from the page content behind. Three-layer shadow: box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.12). The three layers create near, mid, and far depth — matching how real-world light creates graduated shadows. Generated in the tool, tested with the preview background set to the page's gray overlay color to check separation before implementation.",
            },
            {
              title: "Pressed Input Field Effect",
              scenario: "A developer is building a form where active input fields should look recessed into the page rather than raised above it. Using inset shadow: box-shadow: inset 0 2px 4px rgba(0,0,0,0.08). Combined with an outset focus ring: box-shadow: inset 0 2px 4px rgba(0,0,0,0.08), 0 0 0 3px rgba(59,130,246,0.30). Both layers in a single comma-separated declaration, generated in the multi-layer editor and pasted into the :focus rule.",
            },
            {
              title: "Developer Handoff Documentation",
              scenario: "A design engineer is documenting shadow tokens for a design system handoff. They build all six elevation levels (0dp through 24dp) in the tool, copy each CSS declaration, and paste them into a token file as CSS custom properties: --shadow-1: 0 1px 3px rgba(0,0,0,0.12); through --shadow-6: 0 24px 48px rgba(0,0,0,0.18). The full token set is generated in the tool and documented in the team's Notion, ensuring developers and designers reference the same values.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use two-layer shadows for realistic depth — a small, sharp layer (blur 2–4px, opacity 10–15%) for the near shadow, and a large, soft layer (blur 16–32px, opacity 6–10%) for the ambient glow. The combination reads as genuine elevation rather than a flat cartoon shadow.",
                "Match shadow color to the element's own hue rather than defaulting to black. A blue button with a blue-tinted shadow (rgba(59,130,246,0.35)) looks more cohesive than a black shadow. Keep opacity between 25–45% for colored shadows to avoid looking garish.",
                "Always preview against your actual background color, not white. A shadow that looks perfect on a white canvas often disappears on a gray surface or clashes on a dark background. Use the background color picker in the preview panel before copying the CSS.",
                "Use negative spread values to prevent large blur radii from making shadows too wide. A blur of 24px with spread of -4px creates a diffuse shadow that stays close to the element's footprint — good for cards that need to feel light rather than heavy.",
                "Store shadows as CSS custom properties in your design system: --shadow-sm, --shadow-md, --shadow-lg. Generate each level in this tool, define them once in :root, and apply by name throughout your codebase. Changing an elevation level then only requires editing one property.",
                "For components that animate (hover transitions, drawer slides), keep shadow changes in CSS transitions: transition: box-shadow 0.2s ease. Avoid animating box-shadow on very large elements at high frame rates — GPU compositing helps but very large blur radii still have a paint cost.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use the same shadow on every component. A button, a card, and a modal all have different implied elevations — they should have different shadow values. Applying one universal shadow flattens the visual hierarchy and makes the UI feel undifferentiated.",
                "Don't use very high blur values (80px+) on elements that need to feel physically plausible. Ultra-high blur looks like a glow effect rather than a shadow. For most UI components, blur values of 4–32px produce realistic results. Reserve large blurs for deliberate glow or ambient light effects.",
                "Don't forget to test shadows on dark mode backgrounds. A rgba(0,0,0,0.15) shadow on a white card is visible; the same shadow on a dark gray card surface is invisible. Dark mode shadow systems typically use slightly higher opacity or slightly lighter shadow colors to maintain separation.",
                "Don't use box-shadow as a border replacement at scale. border: 1px solid is GPU-composited and cheaper than box-shadow: 0 0 0 1px. If you only need a visible outline with no blur or offset, use border or outline, not box-shadow.",
                "Don't combine too many inset and outset layers without checking the result carefully. Three outset layers and two inset layers on a single element can produce unexpected overlap artifacts, especially with colored shadows. Build up layers incrementally and check the preview at each step.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Box Shadow Reference — Common Patterns
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Pattern</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">CSS Value</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Use For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Subtle card",          "0 1px 3px rgba(0,0,0,0.10)",                                              "Low-elevation card, list items"],
                ["Standard card",        "0 1px 3px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)",               "Default card elevation"],
                ["Hovered card",         "0 4px 8px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.10)",              "Card on hover/focus"],
                ["Floating button",      "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.10)",              "FAB, primary CTA"],
                ["Modal / dialog",       "0 2px 4px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.12)",             "Overlay dialogs, drawers"],
                ["Dropdown menu",        "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)",    "Popover, select, tooltip"],
                ["Sharp / hard",         "4px 4px 0px rgba(0,0,0,0.20)",                                          "Retro / brutalist design"],
                ["Colored glow",         "0 0 20px rgba(59,130,246,0.40)",                                         "Brand-colored button glow"],
                ["Inset (pressed)",      "inset 0 2px 4px rgba(0,0,0,0.08)",                                      "Active button, recessed input"],
                ["Neumorphism light",    "6px 6px 12px rgba(0,0,0,0.12), -6px -6px 12px rgba(255,255,255,0.70)", "Soft-UI on light backgrounds"],
                ["Focus ring",           "0 0 0 3px rgba(59,130,246,0.30)",                                        "Keyboard focus indicator"],
                ["No shadow / reset",   "none",                                                                    "Remove inherited shadow"],
              ].map(([name, css, use]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{name}</td>
                  <td className="py-2 px-3 font-mono text-primary text-xs break-all">{css}</td>
                  <td className="py-2 px-3 text-gray-500 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Values are starting points. Adjust opacity and blur to match your surface color and brand contrast requirements.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This CSS Box Shadow Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "💻", title: "Frontend Developers", desc: "Generate production-ready box-shadow CSS without manual trial and error. Build elevation systems, copy shadow tokens, and test values against real backgrounds before committing to code." },
            { icon: "🎨", title: "UI Designers", desc: "Prototype shadow systems visually, explore neumorphism and material elevation patterns, and generate copy-ready CSS for design-to-development handoff without opening Figma or a code editor." },
            { icon: "🏗️", title: "Design System Teams", desc: "Define and document shadow tokens for the entire component library. Generate each elevation level, name them as CSS custom properties, and maintain consistent depth language across all components." },
            { icon: "🔧", title: "Full-Stack Developers", desc: "Quickly get a working box-shadow for a card or modal without spending time on CSS documentation. Paste the output directly into a React component, Vue SFC, or plain CSS file." },
            { icon: "🎓", title: "CSS Learners", desc: "Explore how each box-shadow parameter affects the visual output in real time. Understanding the relationship between blur, spread, offset, and opacity is much faster with a live preview than with documentation alone." },
            { icon: "📱", title: "No-Code Builders", desc: "Generate box-shadow CSS for custom code blocks in Webflow, Framer, Squarespace, or any platform that accepts custom CSS. Test the shadow visually before pasting into the custom code panel." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
