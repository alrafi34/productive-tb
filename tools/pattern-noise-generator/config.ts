import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "pattern-noise-generator",
  name: "Pattern Noise Generator",
  description: "Generate customizable grain and noise textures for UI backgrounds, glassmorphism effects, and image overlays. Export as seamless PNG, WebP, SVG, or ready-to-use CSS.",
  category: "design",
  icon: "🌫️",
  free: true,
  backend: false,
  seo: {
    title: "Pattern Noise Generator — Free Grain Texture Tool Online | Productive Toolbox",
    description: "Generate grain and noise textures for UI backgrounds. Export seamless PNG, WebP, SVG, or CSS code. Free pattern noise generator — browser-based, no signup.",
    keywords: [
      "pattern noise generator",
      "noise texture generator",
      "grain texture generator",
      "ui grain texture",
      "film grain generator",
      "noise overlay generator",
      "css noise background",
      "seamless noise texture",
      "perlin noise generator",
      "glassmorphism grain texture",
      "grain effect generator",
      "noise pattern generator online",
      "free grain texture generator",
      "background grain texture",
      "tileable noise texture",
      "animated grain texture",
      "noise texture css",
      "speckle noise generator",
      "dust texture generator",
      "figma grain texture",
      "grain overlay generator",
      "noise png generator",
      "svg noise texture",
      "ui texture generator",
      "noise generator free no signup",
    ],
    openGraph: {
      title: "Pattern Noise Generator — Free Grain Texture Tool Online",
      description: "Generate grain and noise textures for UI backgrounds and design overlays. 5 pattern types, seamless tiling, PNG/WebP/CSS export. Free, browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/design/pattern-noise-generator`,
    },
    howToSteps: [
      {
        name: "Select a Noise Pattern Type",
        text: "Choose from Static Grain, Film Grain, Perlin Noise, Speckle, or Dust. Static Grain and Film Grain are best for UI overlays; Perlin Noise for organic backgrounds; Speckle and Dust for visible texture effects.",
      },
      {
        name: "Adjust Core Parameters",
        text: "Use the sliders to set intensity (noise strength), grain size (particle scale), and opacity (overall transparency). For subtle UI grain, start with intensity 60–80% and opacity 5–8%.",
      },
      {
        name: "Choose Color Mode",
        text: "Select white noise for dark backgrounds, black for light backgrounds, a custom color for branded effects, or multi-color RGB mode for artistic contexts.",
      },
      {
        name: "Enable Seamless Tiling",
        text: "Turn on Seamless Tileable mode if the texture will repeat as a CSS background. This edge-blends the four borders so there are no visible seams when the pattern tiles across the screen.",
      },
      {
        name: "Set Export Resolution",
        text: "Choose 256×256px for standard web use, 512×512px for Retina displays, or 1024×1024px for print. Smaller sizes load faster; larger sizes give finer grain detail at large display sizes.",
      },
      {
        name: "Export or Copy CSS",
        text: "Download as PNG or WebP for production, SVG for vector workflows, or Base64 for inline embedding. Click Copy CSS to get ready-to-paste code with the texture already embedded as a data URI.",
      },
    ],
    faq: [
      {
        q: "What is a pattern noise generator?",
        a: "A pattern noise generator is a free online tool that creates randomized grain and texture overlays for UI design, web backgrounds, image editing, and digital illustration. It generates pixel-level patterns — including static grain, film grain, Perlin noise, speckle, and dust — and exports them as seamless PNG, WebP, or SVG files, or as ready-to-paste CSS code.",
      },
      {
        q: "What is grain texture and why do designers use it?",
        a: "Grain texture is a fine noise overlay applied to a design surface to break up flat color or gradients and add visual depth. A low-opacity grain layer (typically 3–10%) introduces subtle irregularity that the eye reads as material quality, similar to paper or matte film. The technique is standard in modern web design, Figma design systems, and premium SaaS landing pages.",
      },
      {
        q: "What is the difference between grain, film grain, Perlin noise, speckle, and dust?",
        a: "Static grain is pure pixel-level random noise — each pixel independently varies. Film grain mimics analog photography with clustered particles and a warmer aesthetic. Perlin noise is smooth organic noise producing cloud-like patterns with natural flow. Speckle uses circular particles for a visible dotted texture. Dust simulates soft atmospheric particles with gradient falloff for a hazy depth effect.",
      },
      {
        q: "How do I add noise texture to a CSS background?",
        a: "Export the noise as PNG or WebP and apply it as a background-image via a ::after pseudo-element with opacity 5–8% and pointer-events:none. Or copy the base64 data URI from this tool and embed it directly in CSS. Use mix-blend-mode:overlay or soft-light for more natural integration with the underlying surface.",
      },
      {
        q: "What resolution should I export noise textures at?",
        a: "256×256px for most web UI (ideal quality-to-size balance). 512×512px for Retina displays or finer grain at large sizes. 128×128px when file size is critical. 1024×1024px for print or video. A 256px WebP tile is typically 8–25KB — negligible for page performance.",
      },
      {
        q: "What is seamless tileable noise and why does it matter?",
        a: "Seamless tileable noise matches perfectly at all four edges when repeated, so there is no visible seam when used as a CSS background-repeat tile. Standard random noise creates a hard edge when tiled. This generator's seamless mode edge-blends the borders to eliminate repeat artifacts — essential for full-page backgrounds.",
      },
      {
        q: "Can I use the generated textures commercially?",
        a: "Yes. Textures generated with this tool are free for unlimited personal and commercial use — no watermarks, licensing fees, or attribution required. You can use them in client deliverables, SaaS products, commercial websites, app interfaces, and printed materials.",
      },
      {
        q: "How do I create a Figma-style grain overlay?",
        a: "Use Static Grain or Film Grain at 256×256px, white color, intensity 65–80%, opacity 6–8%, seamless mode on. Export as PNG. In Figma, add as a Rectangle fill (Image), set layer opacity to 6–8%, blend mode Overlay. In CSS, use it as a ::after pseudo-element with mix-blend-mode:overlay and pointer-events:none.",
      },
      {
        q: "Does noise texture affect page performance?",
        a: "A 256×256px WebP noise tile is typically 8–25KB — negligible. It tiles across full-screen backgrounds from a single small file. Use WebP for maximum compression. Avoid PNG textures above 512×512px in production. CSS-based grain animations add no asset weight compared to video alternatives.",
      },
      {
        q: "Is my work private when using this tool?",
        a: "Yes. All noise generation happens entirely in your browser using the HTML5 Canvas API. No images, settings, or exported files are ever sent to any server. Your textures are generated and remain on your device only.",
      },
    ],
  },
  features: [
    "5 noise algorithms: static grain, film grain, Perlin noise, speckle, dust",
    "Real-time canvas preview with instant updates",
    "Intensity, grain size, and opacity controls",
    "White, black, custom color, and RGB multi-color modes",
    "Seamless tileable texture generation",
    "Export as PNG, WebP, SVG, or Base64 data URI",
    "Auto-generated CSS background code",
    "Animated noise texture option",
    "Resolution control: 128px to 1024px",
    "Quick presets for common use cases",
    "Free for commercial use — no watermarks",
    "100% browser-based — no uploads",
  ],
  relatedTools: [
    "css-box-shadow-generator",
    "css-glassmorphism-generator",
    "css-mesh-gradient-generator",
    "color-palette-generator",
    "css-gradient-generator",
    "glassmorphism-layer-tester",
  ],
};
