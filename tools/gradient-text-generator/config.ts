export const gradientTextGeneratorConfig = {
  name: 'Gradient Text Generator',
  slug: 'gradient-text-generator',
  description: 'Create beautiful gradient text effects using CSS background-clip with live preview and code generation',
  category: 'design',
  icon: '🌈',
  free: true,
  backend: false,
  tags: ['gradient', 'text', 'css', 'background-clip', 'design', 'typography'],
  features: [
    'Live gradient text preview with editable content',
    'Linear, radial, and conic gradient support',
    'Interactive color picker and gradient controls',
    'Font size, weight, and spacing adjustments',
    'Gradient presets (Sunset, Ocean, Rainbow, Neon)',
    'CSS code generation with browser compatibility',
    'Multiple export formats (CSS, Tailwind, SCSS)',
    'Background preview options for contrast testing',
    'Mobile-responsive design'
  ],
  seo: {
    title: "Gradient Text Generator – CSS Gradient Text Maker",
    description: "Make gradient text with CSS background-clip: linear, radial or conic, with presets and live preview. Copy the code as CSS, Tailwind, SCSS or inline HTML.",
    keywords: ['gradient text generator', 'css background clip', 'gradient text css', 'text effects', 'css gradient', 'web design tool'],
    openGraph: {
      title: "Gradient Text Generator – CSS Gradient Text Maker",
      description: "Make gradient text with CSS background-clip: linear, radial or conic, with presets and live preview. Copy the code as CSS, Tailwind, SCSS or inline HTML.",
      type: 'website',
      url: 'https://productivetoolbox.com/tools/design/gradient-text-generator'
    },
    howToSteps: [
      { name: "Enter your text", text: "Type your text in the input field or click the preview to edit it; the gradient updates as you type." },
      { name: "Choose the gradient type", text: "Pick linear (a straight line at any angle), radial (outward from a point) or conic (around a point), or start from a preset such as Sunset or Ocean." },
      { name: "Set the colors", text: "Add, remove and recolor the color stops and move their positions to control where the colors blend." },
      { name: "Adjust the typography", text: "Set the font size, weight and alignment, and check the preview against light and dark backgrounds." },
      { name: "Copy the code", text: "Choose CSS, Tailwind, SCSS or HTML with inline styles and copy the code into your project." },
    ],
    faq: [
      { q: "How does CSS gradient text work?", a: "The gradient is set as the element's background, background-clip: text cuts the background to the shape of the letters, and a transparent text color lets it show through. Include -webkit-background-clip: text and -webkit-text-fill-color: transparent as well, which Chrome and Safari still need." },
      { q: "Why is my gradient text not showing?", a: "Usually the -webkit- prefixed properties are missing, the text color is not transparent, or the gradient is on a parent element instead of the text itself. An inline element such as a span may also need display: inline-block for the background to fit the text." },
      { q: "Which browsers support gradient text?", a: "All current versions of Chrome, Edge, Firefox, Safari and Opera, on desktop and mobile, as long as the -webkit- prefixed properties are included. Internet Explorer does not support it and shows plain text in the fallback color." },
      { q: "Is gradient text accessible?", a: "Screen readers read it as normal text. Keep enough contrast between every part of the gradient and the background, since a pale color stop can make letters hard to read, and use gradients for headings rather than body text. The WCAG AA minimum is 3:1 for large text and 4.5:1 for normal text." },
      { q: "Can I animate gradient text?", a: "Yes. Make the background larger than the text, for example background-size: 200% auto, and animate background-position with a CSS keyframe animation. Respect prefers-reduced-motion for people who turn animations off." },
      { q: "Does the Tailwind output need a plugin?", a: "No. It uses Tailwind's built-in bg-clip-text and text-transparent utilities and arbitrary values such as bg-[linear-gradient(…)] and text-[64px], which work in Tailwind CSS v3 and v4 without configuration." },
    ],
  }
};