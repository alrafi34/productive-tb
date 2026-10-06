export const colorBlindnessSimulatorConfig = {
  name: 'Color Blindness Simulator',
  slug: 'color-blindness-simulator',
  description: 'Preview how images and designs appear to people with different types of color vision deficiencies',
  category: 'design',
  icon: '👁️',
  free: true,
  backend: false,
  tags: ['accessibility', 'color blindness', 'simulation', 'design', 'testing', 'vision'],
  features: [
    'Real-time color blindness simulation using SVG filters',
    'Support for all major color vision deficiencies',
    'Image upload with drag & drop functionality',
    'Side-by-side comparison view',
    'UI component testing with sample elements',
    'Simulation intensity adjustment',
    'Screenshot export functionality',
    'Accessibility guidance and tips',
    'Mobile-responsive design'
  ],
  seo: {
    title: "Color Blindness Simulator – Test Images & UI Designs",
    description: "See an image or design as people with protanopia, deuteranopia, tritanopia or achromatopsia do, side by side with normal vision. Free and private.",
    keywords: ['color blindness simulator', 'accessibility testing', 'color vision deficiency', 'design accessibility', 'protanopia', 'deuteranopia'],
    openGraph: {
      title: "Color Blindness Simulator – Test Images & UI Designs",
      description: "See an image or design as people with protanopia, deuteranopia, tritanopia or achromatopsia do, side by side with normal vision. Free and private.",
      type: 'website',
      url: 'https://productivetoolbox.com/tools/design/color-blindness-simulator'
    },
    howToSteps: [
      { name: "Add an image", text: "Upload a screenshot, chart or photo (PNG, JPG or WebP, up to 10 MB), or start with a sample such as the color chart, UI dashboard or data visualization." },
      { name: "Pick a vision type", text: "Choose protanopia or protanomaly (red), deuteranopia or deuteranomaly (green), tritanopia or tritanomaly (blue), or achromatopsia or achromatomaly (little or no color). Start with the deutan types, the most common." },
      { name: "Compare", text: "Use Compare to see normal vision next to the simulation, or Single for one large view." },
      { name: "Set the intensity", text: "Lower the intensity slider to approximate a milder deficiency; many people have a partial, anomalous form rather than a complete loss." },
      { name: "Fix what you find", text: "Where two important colors merge, add labels, icons, patterns or stronger contrast instead of relying on color alone." },
    ],
    faq: [
      { q: "How common is color blindness?", a: "About 1 in 12 men (8%) and 1 in 200 women (0.5%) of Northern European descent have a red-green color vision deficiency. Deuteranomaly, a weakened green sensitivity, is the most common form; blue-yellow (tritan) deficiencies and total color blindness are rare." },
      { q: "How accurate is this simulation?", a: "It is an approximation. The tool applies a color matrix filter to each pixel, which shows which colors become hard to tell apart but cannot reproduce exactly what any individual sees; the effect also varies between people and with the screen. Use it to find problem areas, then test with real users where you can." },
      { q: "Which types should I test?", a: "Start with deuteranopia and protanopia, since red-green deficiencies are by far the most common. Then check tritanopia and achromatopsia; a design that still works in grayscale usually works for everyone." },
      { q: "What colors should I avoid together?", a: "Red with green, green with brown, blue with purple, and light green with yellow are the classic problem pairs, especially at similar lightness. Blue with orange, and blue with red, are much safer, and a clear difference in lightness helps every type." },
      { q: "What do the accessibility standards require?", a: "WCAG 2.2 success criterion 1.4.1 says color must not be the only way information is conveyed, so a chart, form error or status needs a label, icon or pattern too. WCAG is referenced by the ADA and Section 508 in the US and by EN 301 549 and the European Accessibility Act in the EU." },
      { q: "Are my images uploaded?", a: "No. We do not collect or store what you enter." },
    ],
  }
};