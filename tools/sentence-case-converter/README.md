# Sentence Case Converter Tool

A free online tool to convert text between different case formats: uppercase, lowercase, title case, and sentence case.

## 🎯 Features

- **Real-time Conversion**: Instantly see results as you select different case types
- **4 Case Types**:
  - 🔠 UPPERCASE - All letters capitalized
  - 🔡 lowercase - All letters in lowercase
  - 🔤 Title Case - First Letter Of Each Word Capitalized
  - 📝 Sentence case - First letter of each sentence capitalized
- **Copy to Clipboard**: One-click copy with visual feedback
- **Clean UI**: Matches Productive Toolbox design system
- **Responsive**: Works on desktop, tablet, and mobile
- **No Backend**: All processing happens in the browser
- **SEO Optimized**: Full metadata and structured data

## 📁 File Structure

```
tools/sentence-case-converter/
├── ui.tsx       # React component (UI)
├── logic.ts     # Conversion functions
├── config.ts    # Tool metadata & SEO
└── test.ts      # Test file (optional)
```

## 🔧 Technical Implementation

### Logic Functions (`logic.ts`)

```typescript
export function toUpperCase(text: string): string
export function toLowerCase(text: string): string
export function toTitleCase(text: string): string
export function toSentenceCase(text: string): string
```

### UI Component (`ui.tsx`)

- Built with React 19 and Next.js 16
- Uses Tailwind CSS for styling
- Client-side only ("use client")
- State management with useState
- Real-time conversion (no submit button needed)

### Configuration (`config.ts`)

- Tool metadata (name, description, icon)
- SEO configuration (title, description, keywords)
- OpenGraph metadata for social sharing
- Feature list for marketing

## 🎨 Design System

### Colors
- Primary: `#058554` (green)
- Primary Hover: `#069D63`
- Background: `#F9FAFB` (gray-50)
- Borders: `#E5E7EB` (gray-200)

### Typography
- Headings: Poppins (`var(--font-heading)`)
- Body: Inter (`var(--font-body)`)

### Components
- Rounded corners: `rounded-xl` (12px)
- Shadows: `shadow-sm`
- Focus rings: `ring-2 ring-primary`

## 🚀 Usage

### Access the Tool
```
http://localhost:3000/tools/sentence-case-converter
```

### User Flow
1. Enter or paste text in the textarea
2. Select a case type (uppercase, lowercase, title case, or sentence case)
3. View the converted text instantly
4. Click "Copy Result" to copy to clipboard
5. Click "Reset" to clear and start over

## 📊 Examples

### Input
```
hello world. this is a TEST. how are YOU?
```

### Outputs

**UPPERCASE**
```
HELLO WORLD. THIS IS A TEST. HOW ARE YOU?
```

**lowercase**
```
hello world. this is a test. how are you?
```

**Title Case**
```
Hello World. This Is A Test. How Are You?
```

**Sentence case**
```
Hello world. This is a test. How are you?
```

## 🔌 Integration

The tool is automatically integrated into the Productive Toolbox platform:

1. **Homepage**: Listed in the "Writing Tools" category
2. **Tools Page**: Appears in the tools grid
3. **Dynamic Routing**: Accessible via `/tools/sentence-case-converter`
4. **SEO**: Full metadata and structured data included

### Integration Points

- `config/tools.ts` - Tool listing
- `app/tools/[tool]/page.tsx` - Dynamic page routing
- `components/ToolLayout.tsx` - Shared layout wrapper

## 🧪 Testing

Run the test file to verify logic functions:

```bash
# Manual testing in browser
npm run dev
# Navigate to http://localhost:3000/tools/sentence-case-converter
```

### Test Cases
- ✅ Empty string handling
- ✅ Single word conversion
- ✅ Multiple sentences
- ✅ Mixed case input
- ✅ Special characters and punctuation
- ✅ Copy to clipboard functionality
- ✅ Clear/Reset buttons

## 📱 Responsive Design

- **Mobile (< 640px)**: 2-column grid for case buttons
- **Desktop (≥ 640px)**: 4-column grid for case buttons
- **Max Width**: 768px (3xl container)
- **Touch-friendly**: Large tap targets (44px minimum)

## ♿ Accessibility

- ✅ Semantic HTML (header, main, article)
- ✅ ARIA labels where appropriate
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Screen reader friendly
- ✅ Disabled states clearly indicated

## 🔍 SEO Features

### Metadata
- Title: "Free Sentence Case Converter - Uppercase, Lowercase, Title Case"
- Description: Optimized for search engines
- Keywords: 15+ relevant keywords
- OpenGraph tags for social sharing
- Twitter Card metadata

### Structured Data (JSON-LD)
```json
{
  "@type": "SoftwareApplication",
  "name": "Sentence Case Converter Tool",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### On-Page Content
- H1: "Sentence Case Converter"
- H2: "About Sentence Case Converter"
- H3: "Case Conversion Types", "Why Use a Case Converter?"
- Descriptive paragraphs explaining the tool

## 🚀 Performance

- **Bundle Size**: Minimal (pure functions, no dependencies)
- **Load Time**: Instant (client-side only)
- **Conversion Speed**: Real-time (no API calls)
- **Memory Usage**: Low (simple string operations)

## 🔒 Privacy & Security

- ✅ No data sent to server
- ✅ No tracking or analytics
- ✅ No cookies required
- ✅ All processing in browser
- ✅ No text stored or logged

## 🛠️ Future Enhancements (Optional)

- [ ] Add camelCase conversion
- [ ] Add snake_case conversion
- [ ] Add kebab-case conversion
- [ ] Add CONSTANT_CASE conversion
- [ ] Add character/word count in output
- [ ] Add text statistics
- [ ] Add undo/redo functionality
- [ ] Add keyboard shortcuts
- [ ] Add export to file option
- [ ] Add batch conversion (multiple texts)

## 📝 License

Part of Productive Toolbox - All rights reserved

## 👥 Contributing

This tool follows the Productive Toolbox design system and folder structure. When adding new features:

1. Keep logic separate from UI (logic.ts)
2. Follow existing design patterns
3. Maintain responsive design
4. Update SEO metadata
5. Test on multiple devices
6. Ensure accessibility compliance

## 📞 Support

For issues or questions, refer to the main Productive Toolbox documentation.

---

**Built with:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
**Status:** ✅ Production Ready
**Last Updated:** 2024
