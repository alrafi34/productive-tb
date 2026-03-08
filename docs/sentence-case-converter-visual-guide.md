# Sentence Case Converter - Visual Guide

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Productive Toolbox / Tools / Sentence Case Converter       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔡  Sentence Case Converter                                │
│  Convert your text between uppercase, lowercase, title      │
│  case, and sentence case instantly                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Enter your text here...                         Clear │  │
│  │                                                       │  │
│  │                                                       │  │
│  │                                                       │  │
│  │                                                       │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Select Case Type
┌──────────┬──────────┬──────────┬──────────┐
│    🔠    │    🔡    │    🔤    │    📝    │
│ UPPERCASE│ lowercase│Title Case│Sentence  │
│          │          │          │  case    │
└──────────┴──────────┴──────────┴──────────┘

Converted Text
┌─────────────────────────────────────────────────────────────┐
│  [Converted text appears here]                   📋 Copy    │
│                                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐
│ 📋 Copy Result   │  │ 🗑️ Reset         │
└──────────────────┘  └──────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  About Sentence Case Converter                              │
│                                                              │
│  Our free sentence case converter tool helps you quickly... │
│                                                              │
│  Case Conversion Types                                      │
│  • UPPERCASE: Converts all letters to capital letters       │
│  • lowercase: Converts all letters to small letters         │
│  • Title Case: Capitalizes the first letter of each word    │
│  • Sentence case: Capitalizes the first letter of sentence  │
│                                                              │
│  Why Use a Case Converter?                                  │
│  Case converters are essential tools for writers...         │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

- **Primary Green:** #058554
- **Primary Hover:** #069D63
- **Background:** #F9FAFB (gray-50)
- **White Cards:** #FFFFFF
- **Borders:** #E5E7EB (gray-200)
- **Text:** #1F2937 (gray-900)
- **Muted Text:** #6B7280 (gray-500)

## Interactive States

### Case Type Buttons
- **Unselected:** White background, gray border
- **Selected:** Primary green border, light green background (primary/5)
- **Hover:** Gray-300 border

### Action Buttons
- **Copy Result:** Green background, white text
- **Reset:** White background, gray border, red on hover
- **Disabled:** 40% opacity, cursor not-allowed

### Copy Feedback
- **Before:** "📋 Copy Result"
- **After:** "✅ Copied!" (2 second timeout)

## Responsive Breakpoints

- **Mobile (< 640px):** 2 columns for case buttons
- **Desktop (≥ 640px):** 4 columns for case buttons
- **Max Width:** 768px (3xl container)

## Example Conversions

### Input:
```
hello world. this is a TEST. how are YOU?
```

### UPPERCASE:
```
HELLO WORLD. THIS IS A TEST. HOW ARE YOU?
```

### lowercase:
```
hello world. this is a test. how are you?
```

### Title Case:
```
Hello World. This Is A Test. How Are You?
```

### Sentence case:
```
Hello world. This is a test. How are you?
```

## Accessibility Features

- ✅ Semantic HTML (header, main, article)
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators (ring-2 ring-primary)
- ✅ Sufficient color contrast
- ✅ Clear button states (disabled, hover)
- ✅ Screen reader friendly

## Performance

- ✅ Client-side only (no API calls)
- ✅ Instant conversion (no loading states needed)
- ✅ Minimal re-renders (useState optimization)
- ✅ Small bundle size (pure functions)

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**URL:** http://localhost:3000/tools/sentence-case-converter
