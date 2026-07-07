import { siteConfig } from "@/config/site";

export const hslColorSliderConfig = {
  name: "HSL Color Slider",
  slug: "hsl-color-slider",
  description: "Interactive HSL color picker with live preview, format conversion, palette generation, and copy-ready values",
  category: "design",
  icon: "🎨",
  free: true,
  backend: false,
  tags: ["hsl", "color", "picker", "design", "css", "palette"],
  features: [
    "Interactive HSL sliders with live preview",
    "Real-time color format conversion (HSL, HEX, RGB)",
    "Complementary color generation",
    "Color palette variations (analogous, triadic, monochromatic)",
    "UI element preview with generated colors",
    "Color history tracking",
    "One-click copy for all color formats",
    "Random color generator",
    "Export options (JSON, CSS)",
    "Mobile-responsive design",
  ],
  relatedTools: [
    "hex-to-rgb-converter",
    "color-palette-generator",
    "contrast-checker",
    "css-gradient-generator",
    "color-format-converter",
  ],
  seo: {
    title: "HSL Color Slider — Free Online Hue Saturation Lightness Picker | Productive Toolbox",
    description: "Free HSL color slider with live preview. Adjust hue, saturation, and lightness to generate HSL, HEX, and RGB values, build harmony palettes, and copy production-ready CSS colors. No sign-up, browser-based.",
    keywords: [
      "hsl color slider",
      "hsl color picker",
      "hue saturation lightness picker",
      "hsl color tool",
      "hsl to hex converter",
      "hsl to rgb converter",
      "online color picker",
      "css color picker",
      "color palette generator",
      "color harmony generator",
      "analogous color palette",
      "complementary color picker",
      "triadic color palette",
      "monochromatic color generator",
      "design system color tool",
      "css hsl color",
      "hsl color online free",
      "color slider tool",
      "interactive color picker",
      "web color picker no signup",
      "color scheme builder",
      "ui color picker",
    ],
    openGraph: {
      title: "HSL Color Slider — Free Online Hue Saturation Lightness Picker",
      description: "Adjust HSL values, generate harmony palettes, and copy HSL, HEX, or RGB output instantly. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/design/hsl-color-slider`,
    },
    howToSteps: [
      {
        name: "Set your base hue",
        text: "Drag the hue slider across the 0–360° range to land on the color family you want — blues, greens, reds, purples, or anything in between. The live preview updates with every pixel of movement.",
      },
      {
        name: "Dial in saturation",
        text: "Adjust saturation to control how vivid the color is. Move left for muted, professional tones suitable for backgrounds and secondary elements. Move right for bold, attention-grabbing colors suited to primary actions and highlights.",
      },
      {
        name: "Set the lightness",
        text: "Use lightness to define whether the color reads as a dark shade, a mid-tone, or a light tint. Mid-range values (40–60%) produce the most vivid result. Lower values create deep shades for dark themes; higher values create airy tints for light surfaces.",
      },
      {
        name: "Copy your output format",
        text: "Click the copy button next to HSL, HEX, or RGB depending on where you need the value — CSS stylesheets, design tokens, Figma color styles, or documentation. All three formats update simultaneously.",
      },
      {
        name: "Generate palette harmonies",
        text: "Use the palette section to build analogous, complementary, triadic, or monochromatic sets from your base color. Each generated color can be copied independently, giving you a complete ready-to-use palette in seconds.",
      },
    ],
    faq: [
      {
        q: "What is an HSL color slider?",
        a: "An HSL color slider is an interactive tool that lets you control a color by adjusting three independent axes: hue (the base color on the wheel, 0–360°), saturation (how vivid or muted the color appears, 0–100%), and lightness (how bright or dark it is, 0–100%). The sliders give you human-readable control over color that raw hex codes cannot provide — you see exactly which property you are changing and why the result looks the way it does.",
      },
      {
        q: "Why is HSL easier to work with than HEX or RGB?",
        a: "HEX and RGB encode color as three channel values (red, green, blue intensity) that have no intuitive relationship to how humans perceive color. To make a blue slightly lighter in RGB you have to adjust all three channels. In HSL you just increase the lightness value by 10. This makes HSL far more practical for design decisions like making a button color 15% lighter for hover state or desaturating a background so it feels less aggressive.",
      },
      {
        q: "What does hue control in HSL?",
        a: "Hue is the angle on the color wheel, from 0 to 360 degrees. At 0° (and 360°) you get red, at 120° you get green, at 240° you get blue. Values in between produce the full spectrum of colors. Rotating hue while keeping saturation and lightness constant is how you generate palette harmonies — complementary colors are 180° apart, triadic colors are 120° apart, and analogous colors sit within 30° of each other.",
      },
      {
        q: "What does saturation control in HSL?",
        a: "Saturation controls how vivid or chromatic a color appears. At 100% saturation, colors are fully vivid. As saturation drops toward 0%, colors become progressively more gray. At 0% saturation, any hue produces a neutral gray. Saturation is the key lever for creating muted, professional palettes (30–60%) versus bold, high-energy designs (70–100%). UI backgrounds typically use low saturation (5–20%) to avoid visual fatigue.",
      },
      {
        q: "What does lightness control in HSL?",
        a: "Lightness controls how much white or black is mixed into the color. At 50% lightness a color is at its most vivid (assuming full saturation). Values below 50% move toward black; values above 50% move toward white. At 0% every color becomes pure black, and at 100% every color becomes pure white. This makes lightness the primary tool for generating dark and light theme variants from a single base hue.",
      },
      {
        q: "How do I convert HSL to HEX or RGB?",
        a: "This tool converts automatically. As you adjust the HSL sliders, the equivalent HEX and RGB values update in real time. The conversion is calculated in the browser using standard color mathematics. Click the copy button next to any format to grab it immediately — no separate converter or manual formula lookup needed.",
      },
      {
        q: "What are analogous, complementary, and triadic color palettes?",
        a: "These are palette structures based on geometric relationships between hues on the color wheel. Analogous palettes use hues within 30° of each other and feel cohesive and harmonious, ideal for calm UI interfaces. Complementary palettes use hues 180° apart for high contrast, good for calls to action. Triadic palettes use three hues 120° apart for balanced multi-color design systems. This tool generates all of these from your base hue automatically.",
      },
      {
        q: "What HSL values work best for accessible UI colors?",
        a: "For accessible text on white backgrounds, aim for lightness below 45% to achieve sufficient contrast. For text on dark backgrounds, aim for lightness above 65%. Button primary colors typically work well at saturation 60–90% and lightness 40–55%. Avoid very high saturation (above 90%) for large background areas as it causes visual fatigue. Always verify final contrast ratios with a dedicated contrast checker after selecting your colors.",
      },
      {
        q: "Can I use this for CSS custom properties and design tokens?",
        a: "Yes. CSS supports HSL natively with the hsl() function. You can define a base hue as a custom property and derive shades systematically by varying only lightness. For example, a primary light and primary dark variant are easy to maintain because the relationship between shades is transparent from the HSL values. This tool helps you find the right base values before committing them to your token system.",
      },
      {
        q: "Is my color data private when using this tool?",
        a: "Yes. All color calculations and format conversions run entirely in your browser using JavaScript. No color values, palette data, or session information is transmitted to any server, stored in a database, or accessible to anyone other than you.",
      },
    ],
  },
};
