# 🚀 Quick Reference Cheat Sheet

**Fast reference for integrating new tools - Print this!**

---

## ⚡ 5-Minute Setup

```bash
# 1. Create folder
mkdir -p tools/your-tool-name && cd tools/your-tool-name

# 2. Create 4 files
touch config.ts logic.ts ui.tsx seo-content.tsx

# 3. Update 3 files
# - lib/tools-registry.ts (add tool to registry)
# - app/tools/[tool]/page.tsx (add imports)
# - ui.tsx (add RelatedTools component)

# 4. Test
npm run dev
# Visit: http://localhost:3000/tools/your-tool-name
```

---

## 📋 File Templates

### config.ts (Copy & Modify)

```typescript
export const toolConfig = {
  slug: "tool-name",
  name: "Tool Name",
  description: "What it does",
  category: "writing",
  icon: "🔧",
  free: true,
  backend: false,
  seo: {
    title: "Free Tool Name - Benefit | Productive Toolbox",
    description: "Free online tool. Feature 1, Feature 2. Perfect for audience.",
    keywords: ["keyword1", "keyword2", "keyword3"],
    openGraph: {
      title: "Free Tool Name - Social Title",
      description: "Social description",
      type: "website",
      url: "/tool-name"
    }
  },
  features: ["Feature 1", "Feature 2", "Feature 3"]
};
```

### logic.ts (Copy & Modify)

```typescript
export function processData(input: string): string {
  return input.trim();
}
```

### ui.tsx (Copy & Modify)

```typescript
"use client";
import { useState } from "react";
import { processData } from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ToolUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm"
        />
        <button
          onClick={() => setOutput(processData(input))}
          className="bg-primary text-white px-5 py-2.5 rounded-xl"
        >
          Process
        </button>
        {output && <div>{output}</div>}
      </div>
      <ToolSEOContent />
      <RelatedTools
        currentTool="tool-name"
        tools={['related-tool-1', 'related-tool-2', 'related-tool-3']}
      />
    </>
  );
}
```

### seo-content.tsx (Copy & Modify)

```typescript
export default function ToolSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use
        </h2>
        {/* Add content */}
      </section>
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          FAQ
        </h2>
        {/* Add 4-6 questions */}
      </section>
    </>
  );
}
```

---

## 🔧 Update Existing Files

### lib/tools-registry.ts

```typescript
// Add import:
import { toolConfig as toolConfig } from "@/tools/tool-name/config";

// Add to TOOLS_REGISTRY:
'tool-name': toolConfig,
```

### app/tools/[tool]/page.tsx

```typescript
// Add imports:
import { toolConfig as toolConfig } from "@/tools/tool-name/config";
import ToolUI from "@/tools/tool-name/ui";

// Add to TOOLS array:
{ config: toolConfig, Component: ToolUI },
```

---

## 🎨 Design System Classes

```typescript
// Input/Textarea
"w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"

// Primary Button
"bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"

// Secondary Button
"border-2 border-gray-200 hover:border-red-300 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl"

// Output Display
"rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px]"

// Section
"mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8"
```

---

## 🔍 SEO Formula

```
Title: "Free [Tool] - [Benefit] | Productive Toolbox"
Description: "Free online [tool] to [benefit]. [Features]. Perfect for [audience]."
Keywords: [primary, primary+free, primary+online, variations, related, long-tail]
```

---

## ✅ Testing Checklist

```
[ ] Tool loads at /tools/tool-name
[ ] All features work
[ ] Copy button works
[ ] Responsive on mobile
[ ] No console errors
[ ] SEO content displays
[ ] Meta tags present
```

---

## 🚨 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "use client" missing | Add to top of ui.tsx |
| Tool not found (404) | Check slug matches everywhere |
| Styles not working | Use design system classes |
| Not in TOOLS array | Update page.tsx |
| RelatedTools not showing | Add to bottom of ui.tsx |
| Not in registry | Update lib/tools-registry.ts |

---

## 📊 Tool Categories

| Category | Slug | Icon |
|----------|------|------|
| Writing | writing | ✍️ |
| Image | image | 🖼️ |
| Design | design | 🎨 |
| Security | security | 🔒 |
| Math | math | 🔢 |
| Creator | creator | 🚀 |

---

## 💡 Quick Tips

1. Copy existing tool as template
2. Change slug everywhere (3 places: config.ts, tools-registry.ts, page.tsx)
3. Test after each file
4. Use real keywords in SEO
5. Add 4-6 FAQ questions
6. Keep logic.ts pure functions
7. Test on mobile device
8. Check meta tags in DevTools
9. Add RelatedTools with 3 related tool slugs

---

## 🎯 File Locations

```
tools/[tool-name]/
  ├── config.ts       ← Tool metadata
  ├── logic.ts        ← Pure functions
  ├── ui.tsx          ← React component
  └── seo-content.tsx ← SEO sections

lib/tools-registry.ts     ← Add tool here (centralized registry)
app/tools/[tool]/page.tsx ← Add imports here (routing)
```

---

## 🔗 URLs

```
Development: http://localhost:3000/tools/tool-name
Production: https://yoursite.com/tools/tool-name
```

---

## 📞 Debug Commands

```bash
# Check for TypeScript errors
npm run build

# Check for linting issues
npm run lint

# Clear cache and restart
rm -rf .next && npm run dev
```

---

**Print this page for quick reference!**
