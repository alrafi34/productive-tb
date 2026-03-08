# Paragraph Formatter - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTIVE TOOLBOX                            │
│                   /tools/paragraph-formatter                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              app/tools/[tool]/page.tsx                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Dynamic Route Handler                                     │  │
│  │  • Loads config from tools/paragraph-formatter/config.ts  │  │
│  │  • Imports ParagraphFormatterUI component                 │  │
│  │  • Generates SEO metadata                                 │  │
│  │  • Wraps in ToolLayout component                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           components/ToolLayout.tsx                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Header with breadcrumb navigation                      │  │
│  │  • Tool title, icon, and description                      │  │
│  │  • Children (tool UI component)                           │  │
│  │  • Footer with links                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│        tools/paragraph-formatter/ui.tsx                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  MAIN UI COMPONENT                                         │  │
│  │                                                            │  │
│  │  State Management:                                         │  │
│  │  • text (input)                                           │  │
│  │  • output (formatted result)                              │  │
│  │  • copied (clipboard feedback)                            │  │
│  │  • showAdvanced (toggle)                                  │  │
│  │  • wrapLength (custom setting)                            │  │
│  │                                                            │  │
│  │  UI Sections:                                              │  │
│  │  1. Input Textarea                                         │  │
│  │  2. Formatting Action Buttons (5 options)                 │  │
│  │  3. Advanced Options Panel                                │  │
│  │  4. Output Display                                         │  │
│  │  5. Action Buttons (Copy, Download, Reset)                │  │
│  │  6. SEO Content Component                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  logic.ts                │  │  seo-content.tsx         │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │ Formatting Logic   │  │  │  │ SEO Sections       │  │
│  │                    │  │  │  │                    │  │
│  │ • removeExtraSpaces│  │  │  │ • How to Use       │  │
│  │ • fixLineBreaks    │  │  │  │ • FAQ (6 items)    │  │
│  │ • trimEmptyLines   │  │  │  │ • Benefits         │  │
│  │ • formatParagraphs │  │  │  │                    │  │
│  │ • autoFormat       │  │  │  │                    │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└──────────────────────────┘  └──────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              config.ts                                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tool Configuration                                        │  │
│  │  • slug: "paragraph-formatter"                            │  │
│  │  • name: "Paragraph Formatter"                            │  │
│  │  • description: "Clean up your text..."                   │  │
│  │  • category: "writing"                                    │  │
│  │  • icon: "📝"                                             │  │
│  │  • free: true                                             │  │
│  │  • backend: false                                         │  │
│  │  • seo: { title, description, keywords, openGraph }      │  │
│  │  • features: [7 items]                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              config/tools.ts                                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Global Tool Registry                                      │  │
│  │  • Lists all available tools                              │  │
│  │  • Includes paragraph-formatter                           │  │
│  │  • Used for homepage tool cards                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════
                        DATA FLOW
═══════════════════════════════════════════════════════════════════

User Input → [text state] → Format Button Click → handleFormat()
                                                        │
                                                        ▼
                                              Logic Function
                                              (removeExtraSpaces,
                                               fixLineBreaks, etc.)
                                                        │
                                                        ▼
                                              [output state]
                                                        │
                                                        ▼
                                              Display in Output Area
                                                        │
                                    ┌───────────────────┴───────────────────┐
                                    ▼                                       ▼
                              Copy to Clipboard                    Download as TXT
                              (handleCopy)                         (handleDownload)

═══════════════════════════════════════════════════════════════════
                      DESIGN SYSTEM
═══════════════════════════════════════════════════════════════════

Colors:
  • Primary: #4F46E5 (Indigo)
  • Background: #F9FAFB (Light Gray)
  • Text: #1F2937 (Dark Gray)
  • Border: #E5E7EB (Light Gray)

Typography:
  • Headings: Poppins (var(--font-heading))
  • Body: Inter (var(--font-body))

Spacing:
  • Border Radius: 12px (rounded-xl)
  • Padding: 16-32px (p-4 to p-8)
  • Gap: 12-24px (gap-3 to gap-6)

Components:
  • Buttons: rounded-xl with hover states
  • Inputs: rounded-xl with focus ring
  • Cards: white bg with border and shadow
  • Icons: Emoji-based for visual appeal

═══════════════════════════════════════════════════════════════════
```
