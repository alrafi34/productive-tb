export const cssClampGeneratorConfig = {
  slug: 'css-clamp-generator',
  name: 'CSS Clamp Generator',
  description: 'Generate responsive CSS clamp() values for typography, spacing, and layouts with live preview',
  category: 'CSS Tools',
  icon: '📏',
  free: true,
  backend: false,
  tags: ['css', 'clamp', 'responsive', 'typography', 'fluid', 'viewport'],
  features: [
    'Real-time clamp() value generation',
    'Live preview with viewport simulation',
    'Visual scaling graph',
    'Multi-property support',
    'Typography scale generator',
    'Unit conversion (px/rem/em)',
    'Breakpoint presets',
    'Code export in multiple formats',
    'Clamp reverse parser',
    'Local storage persistence'
  ],
  seo: {
    title: "CSS Clamp Generator – Fluid Font Sizes & Spacing",
    description: "Generate CSS clamp() values that scale smoothly between two screen widths, for fluid font sizes, spacing and layout, in px, rem or em, with a live preview.",
    keywords: [
      'css clamp generator',
      'css clamp',
      'fluid typography',
      'responsive css',
      'clamp calculator',
      'css fluid values',
      'responsive design',
      'viewport units',
      'css generator',
      'fluid scaling',
      'responsive typography',
      'css utilities',
      'web development tools',
      'frontend tools',
      'css helper'
    ],
    openGraph: {
      title: "CSS Clamp Generator – Fluid Font Sizes & Spacing",
      description: "Generate CSS clamp() values that scale smoothly between two screen widths, for fluid font sizes, spacing and layout, in px, rem or em, with a live preview.",
      type: 'website',
      url: 'https://productivetoolbox.com/tools/design/css-clamp-generator'
    },
    howToSteps: [
      { name: "Choose the property", text: "Pick font size, padding, margin, gap, width, height, border radius, letter spacing or line height; each preset fills in sensible defaults." },
      { name: "Set the sizes", text: "Enter the smallest and largest value and choose px, rem or em. For rem and em, set the root font size, 16 px in most browsers." },
      { name: "Set the viewport range", text: "Enter the screen widths in px where the value should start and stop growing, or pick a range such as Mobile or Full Range." },
      { name: "Check the preview", text: "Drag the viewport simulator to see the value at any screen width, and watch the graph of the scaling." },
      { name: "Copy the code", text: "Copy it as a CSS declaration, a CSS custom property, an SCSS variable or a Tailwind arbitrary-value class." },
    ],
    faq: [
      { q: "What does CSS clamp() do?", a: "clamp(MIN, PREFERRED, MAX) uses the preferred value but never goes below MIN or above MAX. With a preferred value in vw, such as clamp(1rem, 1.667vw + 0.667rem, 2rem), the size grows smoothly with the screen width between the two limits, without media queries." },
      { q: "How is the preferred value calculated?", a: "It is the straight line through the two points (min width, min size) and (max width, max size). The slope is (max size − min size) ÷ (max width − min width), written as slope × 100 in vw, and the intercept is min size − slope × min width. For 16–32 px between 320 and 1280 px screens, that gives 1.667vw + 10.667px." },
      { q: "Should I use px or rem?", a: "Use rem for font sizes. Values in rem follow the user's browser font-size setting, so text still scales for people who enlarge it. px is fine for borders and small fixed details." },
      { q: "Is fluid typography accessible?", a: "Yes, if it still responds to zoom. A preferred value made only of vw does not grow when the user zooms, so always add a rem part (such as 1.5vw + 0.75rem), and keep the maximum no more than about 2.5 times the minimum so text can still reach 200% zoom, as WCAG 1.4.4 requires." },
      { q: "How is clamp() different from min() and max()?", a: "min() picks the smallest of its values and max() the largest. clamp(MIN, VAL, MAX) is the same as max(MIN, min(VAL, MAX)): it applies both limits at once." },
      { q: "Which browsers support clamp()?", a: "All current browsers: Chrome and Edge 79+, Firefox 75+ and Safari 13.1+ (since 2020). Internet Explorer does not; if you still support it, declare a fixed value on the line before the clamp() value as a fallback." },
    ],
  }
};