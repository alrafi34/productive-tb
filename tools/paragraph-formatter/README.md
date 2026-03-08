# Paragraph Formatter Tool

A powerful text formatting tool that cleans up messy text by removing extra spaces, fixing line breaks, and properly formatting paragraphs.

## Features

- **Remove Extra Spaces**: Converts multiple spaces to single spaces
- **Fix Line Breaks**: Merges broken sentences across lines
- **Trim Empty Lines**: Removes unnecessary blank lines
- **Format Paragraphs**: Structures text with proper paragraph breaks
- **Auto-Format**: Applies all formatting fixes at once
- **Advanced Options**: Custom line wrap length
- **Export Options**: Copy to clipboard or download as TXT

## File Structure

```
tools/paragraph-formatter/
├── ui.tsx           # React component with UI
├── logic.ts         # Formatting functions
├── config.ts        # Tool metadata & SEO
├── seo-content.tsx  # SEO content sections
└── README.md        # Documentation
```

## Usage

The tool is accessible at `/tools/paragraph-formatter` and provides:

1. Text input area for pasting messy text
2. Five formatting action buttons
3. Advanced options toggle for custom settings
4. Output display with copy and download options

## Logic Functions

### `removeExtraSpaces(text: string): string`
Removes multiple consecutive spaces and trailing spaces from each line.

### `fixLineBreaks(text: string): string`
Merges broken sentences while preserving paragraph breaks.

### `trimEmptyLines(text: string): string`
Removes all empty lines from the text.

### `formatParagraphs(text: string, options?: { wrapLength?: number }): string`
Formats text into proper paragraphs with optional line wrapping.

### `autoFormat(text: string): string`
Applies all formatting fixes automatically.

## Design System

- Background: #F9FAFB
- Primary Color: #4F46E5
- Border Radius: 12px
- Typography: Poppins (headings), Inter (body)
- Responsive: Mobile, tablet, desktop

## SEO Optimization

- Comprehensive meta tags
- Structured data (JSON-LD)
- FAQ section
- How-to guide
- Benefits section
- Keyword-rich content

## Integration

The tool is automatically integrated into the site through:
- `/config/tools.ts` - Tool listing
- `/app/tools/[tool]/page.tsx` - Dynamic routing
- `ToolLayout` component - Consistent layout
