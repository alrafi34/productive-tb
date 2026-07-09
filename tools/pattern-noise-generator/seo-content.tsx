export default function PatternNoiseSEOContent() {
  const faqItems = [
    {
      q: "What is a pattern noise generator?",
      a: "A pattern noise generator is a free online tool that creates randomized grain and texture overlays for use in web design, UI components, image editing, and digital illustration. It generates pixel-level patterns — including static grain, film grain, Perlin noise, speckle, and dust — and exports them as seamless PNG, WebP, or SVG files, or as ready-to-paste CSS background code. It is used by UI designers, frontend developers, and motion designers who want to add visual texture and depth without sourcing stock texture files.",
    },
    {
      q: "What is grain texture and why do designers use it?",
      a: "Grain texture is a fine noise overlay applied to a design surface to break up flat color or gradients and give them visual depth. Flat digital designs — especially those using solid colors or mesh gradients — can look too clean or sterile. A low-opacity grain layer (typically 3–10% opacity) introduces subtle irregularity that the eye reads as material depth, similar to the surface texture of paper, matte film, or fabric. The technique became standard in web design after its widespread use in premium landing pages, Figma design systems, and Apple-adjacent product design from 2020 onward.",
    },
    {
      q: "What is the difference between grain, film grain, Perlin noise, speckle, and dust?",
      a: "Static grain is pure pixel-level random noise — each pixel independently varies. Film grain mimics analog photography grain with larger, slightly clustered particles and a warmer aesthetic. Perlin noise is smooth organic noise based on a gradient algorithm, producing cloud-like or terrain-like patterns with natural flow. Speckle noise uses circular particles randomly distributed across the canvas, creating a more visible dotted texture. Dust simulates soft atmospheric particles with gradient falloff, producing a hazy, dimensional effect. Each is suited to different design contexts: grain and film for UI overlays, Perlin for organic backgrounds, speckle for visible texture effects, dust for depth layers.",
    },
    {
      q: "How do I add noise texture to a CSS background?",
      a: "The standard approach is to export the noise texture as a PNG or WebP and apply it as a background-image with low opacity, either as a separate overlay element or using a pseudo-element. Example: set an element's ::after pseudo-element to position:absolute; inset:0; background-image:url('noise.png'); opacity:0.06; pointer-events:none. Alternatively, copy the base64 data URI from this tool and embed it directly in CSS without an external file. For blend mode effects, use mix-blend-mode:overlay or mix-blend-mode:soft-light on the noise layer for a more integrated look.",
    },
    {
      q: "What resolution should I export noise textures at?",
      a: "For most web UI applications, 256×256px provides an ideal balance of visual quality and file size. At this resolution, the texture tiles seamlessly across full-screen backgrounds while remaining small enough to load instantly. Use 512×512px for high-density (2x Retina) displays or when the grain detail needs to be finer at large sizes. 128×128px works well for subtle backgrounds where file size is a priority. 1024×1024px is appropriate for print applications or high-resolution video overlays. Larger tiles reduce the visible repeat pattern but increase file size proportionally.",
    },
    {
      q: "What is seamless tileable noise and why does it matter?",
      a: "Seamless tileable noise is a texture whose edges match perfectly when the pattern repeats — so there is no visible seam or grid line when it is used as a CSS background-repeat tile. Standard random noise is not seamless: the left and right edges have different pixel values and create a visible hard edge when tiled. This generator's seamless mode uses an edge-blending algorithm to ensure continuity across all four edges, making the texture suitable for full-page backgrounds without any visible repeat artifacts.",
    },
    {
      q: "Can I use the generated textures commercially?",
      a: "Yes. Textures generated with this tool are free for unlimited personal and commercial use. There are no watermarks, licensing fees, or attribution requirements. You can embed them in client deliverables, SaaS products, commercial websites, app interfaces, and printed materials. All generation happens in your browser — no assets are stored on any server — so there is no usage tracking or licensing system to manage.",
    },
    {
      q: "How do I create a Figma-style grain overlay?",
      a: "The Figma grain effect used in modern design systems is typically a static grain or film grain texture at 256×256px with 5–8% opacity, white color, and mix-blend-mode set to overlay or soft-light. To replicate it: in this tool, select 'Static Grain' or 'Film Grain', set intensity to 60–80%, set color to white, export as PNG at 256×256px. In Figma, add a Rectangle fill set to Image > your exported PNG, set the layer opacity to 6–8%, and set blend mode to Overlay. The same PNG can be used as a CSS ::after pseudo-element background for production implementation.",
    },
    {
      q: "Does noise texture affect page performance?",
      a: "A properly sized noise texture (256×256px WebP) is typically 8–25KB — negligible for page performance. The key is to use a tileable texture rather than a full-screen raster image. A 256×256px tile that repeats covers a 1920×1080 screen in approximately 56 tiles, all from a single small file. Use WebP format for maximum compression. Avoid using PNG noise textures above 512×512px in production. For animations, use CSS-based grain animations rather than video files — they achieve motion with no additional asset weight.",
    },
    {
      q: "Is my work private when using this tool?",
      a: "Yes. All noise generation happens entirely in your browser using the HTML5 Canvas API and JavaScript. No images, settings, or exported files are ever sent to any server. Your textures are generated and remain on your device only. This means you can use the tool to create textures for confidential client projects or unreleased products without any data leaving your machine.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select a noise pattern type", "Choose from Static Grain, Film Grain, Perlin Noise, Speckle, or Dust. Each uses a different generation algorithm. Static Grain and Film Grain are the most versatile for UI overlays; Perlin Noise is best for organic backgrounds; Speckle and Dust work well for visible texture effects."],
    ["Adjust the core parameters", "Use the sliders to set intensity (how strong the noise is), grain size (the scale of individual particles), and opacity (the overall transparency of the pattern). Start with intensity 60–80% and opacity 8–12% for a subtle UI grain."],
    ["Choose color mode", "Select white noise for dark backgrounds, black noise for light backgrounds, or choose a custom color for branded effects. The multi-color mode generates RGB noise that works well for artistic or illustration contexts."],
    ["Enable seamless tiling", "Turn on the Seamless Tileable option if the texture will be used as a repeating CSS background. This ensures there are no visible seams when the pattern tiles across the screen. Always enable this for web production use."],
    ["Set the export resolution", "Choose 256×256px for standard web use, 512×512px for Retina displays, or 1024×1024px for print. Smaller sizes load faster; larger sizes give finer grain detail at big display sizes."],
    ["Preview on different backgrounds", "Use the preview toggle to test the texture over light, dark, gradient, and image backgrounds before exporting. The same grain can look very different depending on the surface it overlays."],
    ["Export or copy CSS", "Download as PNG or WebP for production use, SVG for vector workflows, or Base64 for inline CSS embedding. Click 'Copy CSS' to get ready-to-paste code with the texture already embedded as a data URI."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Pattern Noise Generator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>pattern noise generator</strong> is a free online tool that creates customizable
            grain and texture overlays for UI design, web backgrounds, image editing, and digital
            illustration. It generates five types of noise — <strong>static grain, film grain, Perlin
            noise, speckle, and dust</strong> — and exports them as seamless PNG, WebP, or SVG files,
            or as ready-to-paste CSS background code.
          </p>
          <p>
            The case for using noise in digital design is straightforward: flat colors and smooth
            gradients look sterile. A grain layer at 5–8% opacity introduces the subtle surface
            irregularity that the eye associates with real materials — paper, fabric, matte film — making
            a design feel premium and tactile without adding visual clutter. The technique is standard
            in high-end product design, Figma design systems, and modern SaaS landing pages precisely
            because it works at near-invisible levels while meaningfully improving perceived quality.
          </p>
          <p>
            Built for <strong>UI and product designers, frontend developers implementing design tokens,
            motion designers adding texture overlays, and digital illustrators creating background
            layers</strong>. All generation happens in your browser — no uploads, no accounts, no
            watermarks. Export and use your textures in personal or commercial projects freely.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Noise Pattern Generation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            All five pattern types are generated via the HTML5 Canvas API directly in your browser.
            Each algorithm produces pixel values differently:
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Pattern Algorithms</p>
            <div className="space-y-2 text-sm text-gray-900">
              <p><span className="font-semibold font-mono">Static Grain</span> — each pixel set to Math.random() × intensity; pure white noise</p>
              <p><span className="font-semibold font-mono">Film Grain</span> — clustered random particles with adjustable radius; mimics analog film grain</p>
              <p><span className="font-semibold font-mono">Perlin Noise</span> — gradient noise algorithm; smooth, organic, natural-looking patterns</p>
              <p><span className="font-semibold font-mono">Speckle</span> — random circular particles at varying sizes; visible dotted texture</p>
              <p><span className="font-semibold font-mono">Dust</span> — soft radial gradient particles with alpha falloff; hazy depth effect</p>
            </div>
          </div>
          <p>Key parameters that affect every pattern type:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Intensity</strong> — amplitude of noise values; higher = stronger grain visible against the background</li>
            <li><strong>Grain size</strong> — scale factor; larger values produce coarser, more visible particles</li>
            <li><strong>Opacity</strong> — overall layer transparency; typically kept at 4–12% for UI use</li>
            <li><strong>Color mode</strong> — white, black, custom hex, or RGB multi-color</li>
            <li><strong>Seamless mode</strong> — edge-blends the four borders so the tile repeats without seams</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Pattern Noise Generator
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
                "5 noise pattern algorithms: grain, film, Perlin, speckle, dust",
                "Real-time canvas preview with instant updates",
                "Intensity, grain size, and opacity sliders",
                "White, black, custom color, and RGB multi-color modes",
                "Seamless tileable texture generation",
                "Export as PNG, WebP, SVG, or Base64 data URI",
                "Auto-generated CSS background code",
                "Animated noise option for motion design",
                "Resolution control: 128px to 1024px",
                "Quick presets for common design scenarios",
                "Preview on light, dark, gradient, and image backgrounds",
                "100% browser-based — no uploads, no server",
                "Free for personal and commercial use, no watermarks",
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
              title: "SaaS Landing Page Hero Section",
              scenario: "A UI designer is building a SaaS landing page with a dark hero section using a mesh gradient background. The gradient looks too digital and smooth. They generate a static grain texture at 256×256px, white, intensity 70%, opacity 6%, seamless mode on. They export as WebP (12KB) and apply it as a CSS ::after pseudo-element with mix-blend-mode:overlay. The grain adds perceived material quality to the gradient — the hero section now reads as a premium, intentional design rather than a plain color fill.",
            },
            {
              title: "Glassmorphism UI Component",
              scenario: "A frontend developer is implementing a glassmorphism card component with backdrop-filter:blur(16px). The frosted glass effect looks flat without texture. They generate a film grain overlay at 256×256px, white, intensity 60%, opacity 8%, seamless. They add it as a background-image on the card's ::before layer at pointer-events:none. The grain replicates the micro-texture of real frosted glass — the component now matches the Figma design file the designer originally intended.",
            },
            {
              title: "Vintage Photography Overlay in Figma",
              scenario: "A brand designer is creating a campaign visual in Figma using product photography. The client wants a vintage film aesthetic. They generate film grain at 512×512px, intensity 85%, custom warm-tinted color (#E8D5B0), opacity 12%. In Figma, they add the exported PNG as a fill on a Rectangle covering the photo, set blend mode to Overlay, and opacity to 40%. The result is a cinematic grain overlay that ties the campaign imagery to the brand's retro positioning.",
            },
            {
              title: "Mobile App Onboarding Background",
              scenario: "A product designer is working on an iOS app onboarding flow with illustrated backgrounds. The illustration backgrounds use flat pastel colors that look too similar across all five screens. They generate five variations of speckle noise — same intensity, different custom colors matching each screen's palette — and export as PNG. Each screen now has a distinct textured background while maintaining the pastel color scheme. The visual variation reduces the monotony of the flow without introducing new design complexity.",
            },
            {
              title: "Motion Graphics Texture Layer",
              scenario: "A motion designer is creating a 15-second social media ad in After Effects. The client brief specifies a film grain aesthetic. They generate an animated grain texture at 512×512px, film grain type, intensity 75%. They export the animation frames as PNG sequence and import as a texture layer in After Effects, set to Add blend mode at 15% opacity. The grain layer adds motion and life to static graphic elements and ties the video to the campaign's analog aesthetic.",
            },
            {
              title: "Design System Texture Token",
              scenario: "A design systems lead is creating a texture library for a fintech company's design system. They need three grain variants: Subtle (3% opacity), Medium (6%), and Strong (10%), in both light and dark versions. They generate all six textures using the same static grain settings but varying opacity, export as WebP at 256×256px, and document the CSS background-image values in the team's Notion token library. Frontend developers can now implement grain consistently across the product without generating textures individually.",
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
                "Keep opacity between 4–10% for UI grain. Below 4%, the grain is imperceptible — you lose the effect. Above 12%, it starts to compete with content and reduces text readability. The sweet spot for modern web design is 5–8% opacity with white grain on dark backgrounds.",
                "Use mix-blend-mode:overlay or soft-light rather than normal for more natural integration. Normal blend mode at low opacity adds a flat grey tint. Overlay and soft-light interact with the underlying colors, making the grain feel embedded in the surface rather than layered on top.",
                "Always enable seamless mode for web production textures. Even at 256×256px, a non-seamless tile will produce a faint grid pattern at the repeat boundaries that becomes more visible on high-contrast backgrounds. Seamless mode adds negligible generation time but eliminates the problem entirely.",
                "Test on multiple backgrounds before exporting. A grain that looks perfect on a dark navy background may be too strong on a pale lavender gradient. Use the preview backgrounds — light, dark, gradient, image — to verify the grain works across the range of surfaces it will encounter in production.",
                "For Figma grain overlays, use a 256×256px PNG with multiply blend mode on dark backgrounds and overlay on light ones. Export at 2× (512×512) if your design file is at 2× density to maintain crispness on Retina artboards.",
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
                "Don't use a large raster image instead of a tiling texture. A single 1920×1080px noise PNG is 8–20MB — far too heavy for production web use. A 256×256px seamless tile that CSS repeats across the screen achieves identical visual results at under 20KB.",
                "Don't apply grain directly on text-heavy sections. Grain on a background that also serves as a text container degrades readability, especially for body copy at 14–16px. Apply grain to a separate layer or limit it to decorative sections, headers, and hero areas where readability pressure is lower.",
                "Don't skip the preview step before exporting. Noise that looks subtle in the tool's preview at 1:1 zoom may appear much stronger when tiled across a full-screen background in a browser. Always test the exported texture at the intended display size and background color before shipping to production.",
                "Don't use the same grain settings across all screen elements. A card background, a hero section, and a modal overlay all occupy different visual weight levels. Use progressively stronger grain for elements that need more visual separation — subtle for background fills, slightly stronger for interactive surfaces.",
                "Don't forget to set pointer-events:none on grain overlay elements. A grain pseudo-element or overlay div without pointer-events:none will intercept mouse clicks and hover events, breaking interactive elements underneath. Always add this CSS property to purely decorative noise layers.",
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
          Noise Pattern Quick Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pattern Type Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Visual</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Static Grain",  "Fine random pixels",      "UI backgrounds, subtle overlays"],
                    ["Film Grain",    "Clustered particles",     "Vintage effects, hero sections"],
                    ["Perlin Noise",  "Smooth organic flow",     "Organic backgrounds, terrain"],
                    ["Speckle",       "Visible circular dots",   "Visible texture, illustration"],
                    ["Dust",          "Soft gradient particles", "Depth layers, atmospheric fx"],
                  ].map(([type, visual, use]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{visual}</td>
                      <td className="py-2 px-3 text-gray-500 text-xs">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Recommended Settings by Use Case</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Use Case</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Intensity</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Opacity</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Subtle UI grain",       "Static",  "50–65%", "4–6%",  "256px"],
                    ["Glassmorphism card",    "Static",  "60–75%", "6–8%",  "256px"],
                    ["Figma-style overlay",   "Film",    "65–80%", "5–8%",  "256px"],
                    ["Vintage photo effect",  "Film",    "80–95%", "10–15%","512px"],
                    ["Hero section texture",  "Grain",   "55–70%", "5–7%",  "256px"],
                    ["Organic background",    "Perlin",  "70–85%", "8–12%", "512px"],
                    ["Design system token",   "Static",  "60%",    "3–10%", "256px"],
                  ].map(([uc, type, int, op, size]) => (
                    <tr key={uc} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-700 text-xs font-medium">{uc}</td>
                      <td className="py-2 px-3 font-mono text-primary text-xs">{type}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{int}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs font-semibold">{op}</td>
                      <td className="py-2 px-3 font-mono text-gray-500 text-xs">{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
          Who Uses This Pattern Noise Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🎨",
              title: "UI & Product Designers",
              desc: "Add grain overlays to Figma designs, glassmorphism components, and hero sections. Generate design-system texture tokens in both light and dark variants.",
            },
            {
              icon: "💻",
              title: "Frontend Developers",
              desc: "Copy CSS code directly into stylesheets. Implement grain backgrounds as ::before or ::after pseudo-elements without sourcing or hosting external texture files.",
            },
            {
              icon: "🎬",
              title: "Motion Designers",
              desc: "Export animated noise frames for After Effects and other motion tools. Add film grain overlays to video graphics and social media content.",
            },
            {
              icon: "✏️",
              title: "Digital Illustrators",
              desc: "Generate texture backgrounds for digital art, poster designs, and editorial illustration. Add material quality to flat vector art with minimal effort.",
            },
            {
              icon: "📱",
              title: "App Designers",
              desc: "Create lightweight tileable textures for iOS and Android app backgrounds. Improve visual hierarchy on flat-design screens without increasing asset complexity.",
            },
            {
              icon: "🏢",
              title: "Design Agencies",
              desc: "Build client deliverables with consistent grain tokens across brand touchpoints. Generate commercial-use textures for websites, apps, print collateral, and packaging.",
            },
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
