export const randomHexColorGeneratorConfig = {
  name: 'Random Hex Color Generator',
  slug: 'random-hex-color-generator',
  description: 'Generate random hex colors instantly with spacebar. Perfect for design inspiration and color palette creation',
  category: 'design',
  icon: '🎨',
  free: true,
  backend: false,
  tags: ['color', 'hex', 'random', 'generator', 'palette', 'design'],
  features: [
    'Instant color generation with spacebar press',
    'Multiple palette sizes (1, 3, 5 colors)',
    'Color locking to preserve favorites',
    'Copy HEX, RGB, and HSL values with one click',
    'Color history with localStorage persistence',
    'Automatic text contrast adjustment',
    'Gradient generation mode',
    'Export options (CSS, SCSS, JSON, Tailwind)',
    'Smooth animations and transitions'
  ],
  seo: {
    title: "Random Hex Color Generator – Colors & Palettes",
    description: "Generate random hex colors and palettes; press the spacebar for new ones and copy each color as HEX, RGB or HSL.",
    keywords: ['random color generator', 'hex color generator', 'color palette generator', 'design inspiration', 'color picker'],
    openGraph: {
      title: "Random Hex Color Generator – Colors & Palettes",
      description: "Generate random hex colors and palettes; press the spacebar for new ones and copy each color as HEX, RGB or HSL.",
      type: 'website',
      url: '/tools/random-hex-color-generator'
    },
    faq: [
      { q: "How random are the generated colors?", a: "The colors are generated using JavaScript's Math.random() function, which provides pseudo-random numbers. Each of the 16.7 million possible hex colors has an equal chance of being generated." },
      { q: "Can I save my favorite color palettes?", a: "Yes! The tool automatically saves your recent colors to browser localStorage. You can also export palettes in various formats for permanent storage and sharing." },
      { q: "What's the difference between RGB and HSL?", a: "RGB defines colors by red, green, and blue light intensity. HSL uses hue (color), saturation (intensity), and lightness (brightness), which is often more intuitive for designers." },
      { q: "How do I create harmonious color palettes?", a: "While this tool generates random colors, you can create harmony by locking one color and regenerating others, or by using color theory principles to select complementary or analogous colors from your generated options." },
    ],
  }
};