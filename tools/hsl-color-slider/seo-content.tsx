export default function HSLColorSliderSEOContent() {
  const faqItems = [
    {
      q: "What is an HSL color slider?",
      a: "An HSL color slider is an interactive tool that lets you control a color by adjusting three independent axes: hue (the base color on the wheel, 0–360°), saturation (how vivid or muted the color appears, 0–100%), and lightness (how bright or dark it is, 0–100%). The sliders give you human-readable control over color that raw hex codes like #3a7bd5 cannot provide. You see exactly which property you are changing and why the result looks the way it does.",
    },
    {
      q: "Why is HSL easier to work with than HEX or RGB?",
      a: "HEX and RGB encode color as three channel values (red, green, blue intensity) that have no intuitive relationship to how humans perceive color. To make a blue slightly lighter in RGB, you have to adjust all three channels. In HSL you just increase the lightness value by 10. This makes HSL far more practical for design decisions like 'make this button color 15% lighter for the hover state' or 'desaturate this background slightly so it feels less aggressive.' Most designers who switch to HSL-first workflows report significantly fewer revision cycles.",
    },
    {
      q: "What does hue control in HSL?",
      a: "Hue is the angle on the color wheel, from 0 to 360 degrees. At 0° (and 360°) you get red, at 120° you get green, at 240° you get blue. Values in between produce the full spectrum of colors. Rotating hue while keeping saturation and lightness constant is how you generate palette harmonies — complementary colors are 180° apart, triadic colors are 120° apart, and analogous colors sit within 30° of each other.",
    },
    {
      q: "What does saturation control in HSL?",
      a: "Saturation controls how vivid or chromatic a color appears. At 100% saturation, colors are fully vivid — a bright, pure blue or red. As saturation drops toward 0%, colors become progressively more gray. At 0% saturation, any hue produces a neutral gray. Saturation is the key lever for creating muted, professional palettes (30–60%) versus bold, high-energy designs (70–100%). UI backgrounds typically use low saturation (5–20%) to avoid visual fatigue.",
    },
    {
      q: "What does lightness control in HSL?",
      a: "Lightness controls how much white or black is mixed into the color. At 50% lightness, a color is at its most vivid (assuming full saturation). Values below 50% move toward black; values above 50% move toward white. At 0%, every color becomes pure black. At 100%, every color becomes pure white. This makes lightness the primary tool for generating dark and light theme variants — a primary brand color at L:45% becomes a subtle tint at L:90% and a deep shade at L:20%.",
    },
    {
      q: "How do I convert HSL to HEX or RGB?",
      a: "This tool converts automatically. As you adjust the HSL sliders, the equivalent HEX and RGB values update in real time. The conversion is calculated in the browser using standard color mathematics. Click the copy button next to any format to grab it immediately. There is no need to use a separate converter or manually look up the formula.",
    },
    {
      q: "What are analogous, complementary, and triadic color palettes?",
      a: "These are palette structures based on the geometric relationships between hues on the color wheel. Analogous palettes use hues within 30° of each other — they feel cohesive and harmonious, ideal for calm UI interfaces. Complementary palettes use hues 180° apart — high contrast, good for calls to action against a background. Triadic palettes use three hues 120° apart — balanced and versatile for multi-color design systems. This tool generates all of these from your base hue automatically.",
    },
    {
      q: "What HSL values work best for accessible UI colors?",
      a: "For accessible text on white backgrounds, aim for lightness below 45% to achieve sufficient contrast. For accessible text on dark backgrounds, aim for lightness above 65%. Button primary colors typically work well at saturation 60–90% and lightness 40–55%. Avoid very high saturation (above 90%) for large background areas as it causes visual fatigue. Always verify contrast ratios with a dedicated contrast checker after selecting your colors.",
    },
    {
      q: "Can I use this for CSS custom properties and design tokens?",
      a: "Yes — this is one of the most practical uses. CSS supports HSL natively: color: hsl(220, 80%, 50%). You can define a base hue as a custom property and derive shades systematically by varying only lightness. For example, --color-primary-light: hsl(220, 80%, 70%) and --color-primary-dark: hsl(220, 80%, 30%) are easy to maintain because the relationship between shades is transparent. This tool helps you find the right base values before committing them to your token system.",
    },
    {
      q: "Is my color data private when using this tool?",
      a: "Yes. All color calculations and format conversions run entirely in your browser using JavaScript. No color values, palette data, or session information is transmitted to any server, stored in a database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Set your base hue", "Drag the hue slider across the 0–360° range to land on the color family you want — blues, greens, reds, purples, or anything in between. The live preview updates with every pixel of movement."],
    ["Dial in saturation", "Adjust saturation to control how vivid the color is. Move left for muted, professional tones suitable for backgrounds and secondary elements. Move right for bold, attention-grabbing colors suited to primary actions and highlights."],
    ["Set the lightness", "Use lightness to define whether the color reads as a dark shade, a mid-tone, or a light tint. Mid-range values (40–60%) produce the most vivid result. Lower values create deep shades for dark themes; higher values create airy tints for light surfaces."],
    ["Copy your output format", "Click the copy button next to HSL, HEX, or RGB depending on where you need the value — CSS stylesheets, design tokens, Figma color styles, or documentation. All three formats update simultaneously."],
    ["Generate palette harmonies", "Use the palette section to build analogous, complementary, triadic, or monochromatic sets from your base color. Each generated color can be copied independently, giving you a complete ready-to-use palette in seconds."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an HSL Color Slider?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>HSL color slider</strong> is an interactive color tool that lets you build, refine, and
            export colors by controlling three human-readable axes: <strong>hue</strong> (which color),{" "}
            <strong>saturation</strong> (how vivid), and <strong>lightness</strong> (how bright or dark). Unlike
            entering hex codes or raw RGB channel values, HSL maps directly to how designers and developers
            actually think about color — making it far faster to find the right shade, generate related palette
            colors, and communicate precise color decisions to teammates.
          </p>
          <p>
            The fundamental problem with hex-first workflows is that{" "}
            <em>#3a7bd5 tells you nothing useful at a glance</em>. You cannot look at that value and know
            whether it is a deep blue or a pale sky, whether it will be legible on white, or how to make a
            slightly darker version for a hover state. HSL solves this: hsl(220, 70%, 50%) immediately tells
            you it is a blue at medium saturation and mid lightness — information you can reason about without
            a color picker open.
          </p>
          <p>
            This tool is built for <strong>UI designers, front-end developers, brand designers, and design
            system maintainers</strong> who need to select colors deliberately, generate consistent palettes,
            and export production-ready values in HSL, HEX, and RGB — without switching between separate
            tools. Everything runs in the browser: no account, no upload, no round-trip to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How HSL Color Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The HSL color model describes every color using three values that correspond to distinct visual
            properties. Understanding each one makes color decisions systematic rather than trial-and-error.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">The Three HSL Axes</p>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-mono font-semibold text-gray-900">Hue (0–360°)</span>
                <span className="text-gray-500 ml-2">— the base color angle on the color wheel</span>
                <p className="mt-1 text-xs text-gray-500">0° = red · 60° = yellow · 120° = green · 180° = cyan · 240° = blue · 300° = magenta</p>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-900">Saturation (0–100%)</span>
                <span className="text-gray-500 ml-2">— how vivid vs. gray the color appears</span>
                <p className="mt-1 text-xs text-gray-500">0% = pure gray · 50% = muted · 100% = fully vivid</p>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-900">Lightness (0–100%)</span>
                <span className="text-gray-500 ml-2">— how dark vs. light the color appears</span>
                <p className="mt-1 text-xs text-gray-500">0% = black · 50% = full color · 100% = white</p>
              </div>
            </div>
          </div>
          <p>
            Palette harmonies are computed from hue arithmetic. Complementary colors sit 180° apart on the
            wheel; triadic colors are 120° apart; analogous colors are within 30°. The tool calculates these
            relationships automatically from your base hue, so you get a complete color system rather than a
            single isolated color.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the HSL Color Slider
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Live color preview updates on every slider move",
                "HSL, HEX, and RGB outputs — all three always visible",
                "One-click copy for any format",
                "Analogous, complementary, triadic, and monochromatic palettes",
                "Monochromatic shade and tint generation",
                "Color history — revisit previous selections",
                "Random color generator for exploration",
                "Export as JSON or CSS custom properties",
                "100% browser-based — no data sent to any server",
                "No sign-up or account required",
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
              title: "Building a Brand Color System",
              scenario: "A startup's designer needs a primary brand blue, a secondary accent, and a neutral background palette. They set hue to 220°, saturation to 75%, and lightness to 50% to establish the primary button color: hsl(220, 75%, 50%). They then use the monochromatic panel to generate a hover state at L:43%, a disabled state at S:30%, and a light background tint at L:95%. The entire system is built in under 5 minutes with consistent hue throughout.",
            },
            {
              title: "Dark Mode Variant Generation",
              scenario: "A developer building a dark mode theme starts with their existing light mode primary color, hsl(210, 70%, 45%). For dark mode they need the same hue but adjusted for dark surfaces. They raise lightness to 65% to maintain legibility on dark backgrounds and drop saturation slightly to 60% to avoid the over-vibrant look common in dark UIs. The tool shows both variants side-by-side before they commit the token values.",
            },
            {
              title: "Accessible Button Color Selection",
              scenario: "A designer needs a CTA button color that passes WCAG AA contrast against white text. They start with a green hue at H:140°, S:65%, L:50%. The live preview makes clear the color is too light for white text at L:50%, so they drag lightness down to L:38%. The result is a deep, accessible green that still reads as clearly 'green' at full saturation. They copy the HEX value for the Figma component and the HSL value for the CSS variable.",
            },
            {
              title: "Landing Page Hero Gradient",
              scenario: "A marketing designer wants a gradient from a deep indigo to a vivid violet for a SaaS landing page hero. They set the first stop at H:250°, S:70%, L:30% and use the analogous palette to find a harmonious second stop at H:280°, S:65%, L:45%. Both colors are in the same visual family but create a smooth, dimensional gradient. They export both HSL values and drop them directly into the CSS gradient declaration.",
            },
            {
              title: "Design System Token Audit",
              scenario: "A design engineer is auditing an existing color system and finds three slightly different blues used for link text across the codebase: #2563eb, #1d4ed8, and #3b82f6. They paste each into the HEX input and observe the HSL equivalents: H:221°, S:83%, L:53% / H:221°, S:64%, L:48% / H:217°, S:91%, L:60%. The slight hue shift on the third value explains why it looks different. They standardize all three to H:221° and adjust only lightness for each context.",
            },
            {
              title: "CSS Custom Property Theming",
              scenario: "A front-end developer defines their theme using CSS custom properties with HSL so individual channels can be overridden. They use this tool to find their base values: --hue: 230; --saturation: 68%; --primary: hsl(var(--hue), var(--saturation), 50%). The slider tool lets them preview what different hue and saturation combinations look like before they hardcode them, catching a saturation that looked too dull on dark surfaces before it shipped.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Lock your hue first, then adjust saturation and lightness. Changing hue after you have dialed in saturation and lightness breaks the visual relationship you have established — treat hue as your color family decision, not something to tweak at the end.",
                "For a cohesive monochromatic system, keep saturation constant across all shades and vary only lightness in 10–15% increments. This produces a systematic palette where every shade is clearly from the same color family.",
                "Use low lightness (20–35%) and moderate saturation (50–70%) for dark theme primary text and interactive elements. Very high saturation on dark backgrounds creates halation — a visual vibrating effect that is hard to read.",
                "When building for accessibility, test your chosen color at the lightness boundary: a color that passes contrast at L:45% may fail at L:50%. Use the lightness slider in 2% increments near your target to find the exact passing value.",
                "Export your final color as a CSS HSL value rather than HEX when you want maintainable theming. CSS natively supports hsl() and hsl() with CSS custom properties allows you to override individual channels in responsive or themed contexts.",
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
                "Don't use maximum saturation (100%) for large UI surfaces — fully saturated colors are visually fatiguing over large areas and make text harder to read. Reserve S:90–100% for small accent elements like badges, icons, and highlights.",
                "Don't pick colors only in isolation on a white background. A color that looks great as a swatch can clash badly when placed next to your other brand colors. Use the palette harmony view to check relationships before committing.",
                "Don't ignore lightness parity across your palette. If your primary blue is at L:45% and your accent orange is at L:65%, they will have very different visual weights and create an unbalanced UI. Match lightness across your palette for a unified feel.",
                "Don't assume HEX values from different tools will always match. Rounding differences in color conversion formulas can produce slightly different HEX outputs for the same HSL value. Pick one source of truth and use it consistently.",
                "Don't skip testing on physical screens. Colors look significantly different on OLED vs LCD displays, and calibration varies widely. Always review final color choices on at least two different screens before shipping to production.",
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

      {/* ── 6. HSL Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          HSL Range Reference for UI Color Roles
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">UI Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Saturation Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Lightness Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Primary action (buttons, links)", "60–85%", "38–52%", "Vivid enough to attract attention; dark enough for white text contrast"],
                ["Hover / focus state", "65–90%", "30–44%", "Darken lightness by 6–10% from the base state"],
                ["Disabled state", "15–30%", "55–70%", "Desaturate heavily so it reads as inactive"],
                ["Page / card background", "5–20%", "94–99%", "Very low saturation to avoid competing with content"],
                ["Subtle section background", "10–25%", "88–95%", "Slightly more color than page background for visual separation"],
                ["Body text (on light bg)", "10–20%", "15–30%", "Near-black with slight hue tint for softer feel than pure black"],
                ["Secondary / muted text", "10–20%", "45–60%", "Readable but clearly lower hierarchy than body text"],
                ["Success / positive status", "55–75%", "35–48%", "Green hue range (H: 120–160°) at accessible lightness"],
                ["Warning / caution status", "80–95%", "45–55%", "Yellow/amber hue (H: 35–55°); needs dark text for contrast"],
                ["Error / destructive status", "65–85%", "38–50%", "Red hue (H: 0–15°) at sufficient depth for white text"],
                ["Info / neutral status", "55–75%", "40–52%", "Blue hue (H: 200–230°) for clear informational signaling"],
                ["Dark theme surface", "8–18%", "12–20%", "Very low lightness with subtle hue to avoid flat grey appearance"],
              ].map(([role, sat, light, notes]) => (
                <tr key={role} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800 text-xs">{role}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold text-xs">{sat}</td>
                  <td className="py-2.5 px-4 font-mono text-green-600 font-semibold text-xs">{light}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Ranges are guidelines based on common UI patterns. Actual accessible contrast must be verified with a contrast ratio tool.
        </p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This HSL Color Slider?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🎨",
              title: "UI / UX Designers",
              desc: "Build primary colors, generate palette systems, and refine hover and disabled states with precise lightness and saturation control — then hand off exact values to developers without ambiguity.",
            },
            {
              icon: "💻",
              title: "Front-End Developers",
              desc: "Generate CSS HSL values for custom properties and theme tokens, explore shades directly in the browser, and verify color relationships without leaving the development workflow.",
            },
            {
              icon: "🏢",
              title: "Brand Designers",
              desc: "Establish a brand color family by anchoring a hue and deriving full tonal ranges for digital, print, and marketing contexts — all from a single consistent HSL base value.",
            },
            {
              icon: "🛠️",
              title: "Design System Engineers",
              desc: "Define semantic color tokens with systematic saturation and lightness offsets, generate light and dark theme variants, and export values in formats compatible with any token pipeline.",
            },
            {
              icon: "🎓",
              title: "Students & Learners",
              desc: "Understand how the HSL model works by experimenting with each axis independently — a faster way to develop color intuition than memorizing HEX values or reading theory.",
            },
            {
              icon: "📱",
              title: "App Developers",
              desc: "Select accessible, on-brand colors for mobile and web interfaces, confirm color roles across light and dark modes, and copy values directly into SwiftUI, Jetpack Compose, or React Native stylesheets.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
