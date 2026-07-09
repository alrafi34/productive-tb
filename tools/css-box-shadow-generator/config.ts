export const toolConfig = {
  slug: "css-box-shadow-generator",
  name: "CSS Box Shadow Generator",
  description: "Generate CSS box-shadow code visually. Live preview, multi-layer shadows, inset support, presets, and one-click copy. Free online shadow generator for UI design.",
  category: "design",
  icon: "📦",
  free: true,
  backend: false,
  seo: {
    title: "CSS Box Shadow Generator — Free Online Shadow Maker | Productive Toolbox",
    description: "Generate CSS box-shadow code visually with live preview. Multi-layer shadows, inset support, neumorphism presets, and one-click copy. Free, no signup.",
    keywords: [
      // Primary — GSC top queries
      "css box shadow generator",
      "box shadow generator",
      "box shadow css generator",
      "css shadow generator",
      "css box-shadow generator",
      "shadow box generator",
      // Secondary variants
      "box shadow maker",
      "css shadow maker",
      "online box shadow generator",
      "box shadow tool",
      "free box shadow generator",
      "box shadow css online",
      // Feature-specific
      "inset box shadow generator",
      "multiple box shadow generator",
      "layered shadow css",
      "neumorphism shadow generator",
      "css shadow code generator",
      "card shadow css generator",
      "button shadow css",
      "box shadow preview",
      // Informational / long-tail
      "css box shadow example",
      "how to add box shadow in css",
      "box-shadow css syntax",
      "material design shadow css",
      "box shadow rgba generator",
    ],
    openGraph: {
      title: "CSS Box Shadow Generator — Free Online Shadow Maker",
      description: "Generate CSS box-shadow code visually with live preview. Multi-layer shadows, inset support, neumorphism presets, and one-click copy. Free, no signup.",
      type: "website",
      url: "/tools/design/css-box-shadow-generator",
    },
    howToSteps: [
      {
        name: "Adjust Offset and Blur Values",
        text: "Use the X offset, Y offset, and blur radius sliders to position and soften the shadow. Positive X moves it right; positive Y moves it down. Higher blur values create softer, more diffuse shadows. Zero blur creates a sharp, hard-edged shadow.",
      },
      {
        name: "Set Spread and Color",
        text: "Spread radius expands or contracts the shadow beyond the element's edges. Set the shadow color using the color picker and adjust opacity using the alpha channel for subtle or pronounced effects.",
      },
      {
        name: "Toggle Inset Mode",
        text: "Enable the inset toggle to move the shadow inside the element border. Inset shadows are used for pressed states, recessed input fields, and neumorphic depth effects.",
      },
      {
        name: "Add Additional Shadow Layers",
        text: "Click Add Layer to stack a second or third shadow declaration. Multi-layer shadows — a sharp close shadow combined with a soft far shadow — create realistic elevation depth.",
      },
      {
        name: "Apply a Preset and Refine",
        text: "Select a preset such as soft, material, deep, floating, or neumorphism to load proven starting values, then fine-tune each parameter to match your design system.",
      },
      {
        name: "Copy the CSS",
        text: "Click the Copy button to copy the complete box-shadow declaration to clipboard. Paste directly into your stylesheet, CSS module, Tailwind config, or component style block — no editing required.",
      },
    ],
    faq: [
      {
        q: "What is a CSS box shadow generator?",
        a: "A CSS box shadow generator is a free online tool that lets you visually design box-shadow styles using sliders and controls, then copies the production-ready CSS code for use in websites and applications. Instead of writing values by hand and reloading the browser to check results, you adjust horizontal offset, vertical offset, blur radius, spread radius, color, and opacity in real time and see the shadow update instantly.",
      },
      {
        q: "What does each box-shadow property control?",
        a: "The box-shadow property accepts five values: horizontal offset (positive moves shadow right), vertical offset (positive moves shadow down), blur radius (higher values create softer edges), spread radius (positive expands the shadow, negative shrinks it), and color including opacity via RGBA or HSLA. The optional inset keyword moves the shadow inside the element border rather than outside.",
      },
      {
        q: "What is inset shadow and when should I use it?",
        a: "An inset box-shadow renders inside the element boundary rather than outside. Use inset shadows for pressed-button effects, recessed input fields, neumorphic UI elements that simulate physical depth, and inner glow effects. Inset shadows can be layered with outset shadows on the same element using comma separation.",
      },
      {
        q: "Can I add multiple shadow layers?",
        a: "Yes. Box-shadow accepts a comma-separated list of shadow values, allowing multiple layers on a single element. Multi-layer shadows are useful for building realistic depth hierarchies, combining a sharp near-shadow with a diffuse far-shadow, and creating glow effects. This tool lets you add, remove, and reorder layers with the CSS output updating in real time.",
      },
      {
        q: "What is the CSS box-shadow syntax?",
        a: "The full syntax is: box-shadow: [inset] offset-x offset-y blur-radius spread-radius color. Example: box-shadow: 0px 4px 16px -2px rgba(0,0,0,0.15). For multiple shadows, separate each declaration with a comma. The generated CSS from this tool uses this exact syntax and is ready to paste into any stylesheet.",
      },
      {
        q: "How do I create a neumorphism shadow effect?",
        a: "Neumorphism uses two shadows in opposite directions — one lighter than the background, one darker — to simulate a soft extruded surface. Example: box-shadow: 6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.70). Use the neumorphism preset in this tool as a starting point, then adjust colors to match your background.",
      },
      {
        q: "What blur and spread values should I use for card shadows?",
        a: "A widely-used card shadow pattern uses two layers: a sharp close shadow for definition and a soft far shadow for elevation. Example: box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08). The first layer creates a crisp edge; the second creates the ambient lift effect. This technique is used in Google Material Design.",
      },
      {
        q: "Does box-shadow affect layout or performance?",
        a: "Box-shadow does not affect document layout — it renders outside the element's box model and does not push other elements. It is GPU-composited in modern browsers and is generally cheaper to animate than filter drop-shadow or multiple background layers. Avoid very large blur values on elements that animate frequently, as repaints become more expensive at large blur radii.",
      },
      {
        q: "What is the difference between box-shadow and filter drop-shadow?",
        a: "box-shadow follows the element's rectangular border-box, including border-radius for rounded corners. filter: drop-shadow() follows the actual visible shape of the element, including transparent cutouts in PNGs, SVG shapes, and irregular clipping paths. Use box-shadow for standard UI components. Use filter: drop-shadow() when the element has a non-rectangular visible shape.",
      },
      {
        q: "Is my design data private when using this tool?",
        a: "Yes. All shadow generation runs entirely in your browser using JavaScript. Your shadow values, color choices, and configurations are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "css-gradient-generator",
    "css-glassmorphism-generator",
    "neumorphism-generator",
    "color-palette-generator",
    "css-border-radius-generator",
    "css-filter-tester",
  ],
};
