export const cssCursorStylePreviewerConfig = {
  slug: 'css-cursor-style-previewer',
  name: 'CSS Cursor Style Previewer',
  description: 'Test and preview all CSS cursor types with interactive examples and code generation',
  category: 'CSS Tools',
  icon: '👆',
  free: true,
  backend: false,
  tags: ['css', 'cursor', 'ui', 'frontend', 'interactive'],
  features: [
    'Preview all CSS cursor types',
    'Interactive testing area',
    'Real UI component testing',
    'CSS code generation',
    'Custom cursor upload',
    'Search and filter cursors',
    'Browser compatibility info',
    'Copy CSS properties'
  ],
  seo: {
    title: "CSS Cursor Previewer – Test Every cursor Value",
    description: "Hover to preview every CSS cursor style, from pointer and grab to resize and zoom cursors, and copy the CSS for the one you need.",
    keywords: [
      'css cursor',
      'cursor styles',
      'css pointer',
      'cursor preview',
      'css cursor types',
      'web development',
      'frontend tools',
      'ui design',
      'css properties',
      'cursor generator'
    ],
    openGraph: {
      title: "CSS Cursor Previewer – Test Every cursor Value",
      description: "Hover to preview every CSS cursor style, from pointer and grab to resize and zoom cursors, and copy the CSS for the one you need.",
      type: 'website',
      url: '/css-cursor-style-previewer'
    },
    faq: [
      { q: "What are CSS cursors?", a: "CSS cursors are visual indicators that show what action will occur when a user interacts with an element. They provide important visual feedback and improve user experience by indicating clickable areas, text fields, draggable elements, and more." },
      { q: "How many cursor types are available in CSS?", a: "CSS provides over 30 standard cursor types, including basic cursors (auto, default), interactive cursors (pointer, help), text cursors, drag cursors, resize cursors, zoom cursors, and special cursors. You can also use custom cursor images." },
      { q: "Can I use custom cursor images?", a: "Yes! You can use custom cursor images in PNG, SVG, or ICO format. Use the url() function with hotspot coordinates and always provide a fallback cursor. Keep images small (32x32px or less) for optimal performance." },
      { q: "Do cursors look the same across all browsers?", a: "While all modern browsers support standard CSS cursors, the exact appearance may vary between browsers and operating systems. It's important to test your cursor implementations across different platforms to ensure consistent user experience." },
      { q: "When should I use the 'grab' vs 'grabbing' cursor?", a: "Use 'grab' (open hand) to indicate that an element can be dragged, and 'grabbing' (closed hand) during the actual drag operation. This provides clear visual feedback about the current state of the interaction." },
      { q: "How do I make cursors accessible?", a: "Ensure cursor changes are meaningful and consistent with user expectations. Don't rely solely on cursor changes to convey important information. Provide additional visual cues like hover states, and ensure your interface works well with keyboard navigation." },
    ],
  }
};