# 🚀 Quick Reference Cheat Sheet

**Fast reference for integrating new tools — print this!**

> Updated: March 2026

---

## ⚡ 5-Step Setup

```bash
# 1. Create tool folder
mkdir -p tools/your-tool-name

# 2. Create 4 files inside it
touch tools/your-tool-name/config.ts
touch tools/your-tool-name/logic.ts
touch tools/your-tool-name/ui.tsx
touch tools/your-tool-name/seo-content.tsx

# 3. Update 3 existing files:
#    config/tools.ts                       — add entry to tools[] array
#    lib/tools-registry.ts                 — add import + registry entry
#    app/tools/[tool]/[subtool]/page.tsx   — add import + TOOLS[] entry

# 4. Test
pnpm dev
# Visit: http://localhost:3000/tools/your-category/your-tool-name
# Also test: http://localhost:3000/tools/your-tool-name (should redirect)
```

---

## 📋 File Templates

### `config.ts`

```typescript
export const toolConfig = {
  slug: "tool-name",
  name: "Tool Name",
  description: "What it does in one sentence.",
  category: "writing",   // ← one of the 11 category slugs
  icon: "🔧",
  free: true,
  backend: false,
  seo: {
    title: "Free Tool Name — Benefit | Productive Toolbox",
    description: "Free online tool. Feature 1, Feature 2. No sign-up required.",
    keywords: ["keyword1", "keyword2", "free tool name", "online tool name"],
    openGraph: {
      title: "Free Tool Name — Social Title",
      description: "Short social description.",
      type: "website",
      url: "/tool-name"
    }
  },
  features: ["Feature 1", "Feature 2", "Works in browser — no uploads"]
};
```

### `logic.ts`

```typescript
// Pure functions only — no useState, no window, no DOM
export function processInput(input: string): string {
  return input.trim();
}
```

### `ui.tsx`

```typescript
"use client";
import { useState } from "react";
import { processInput } from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ToolUI() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="relative mb-6">
        <textarea
          id="tool-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter text..."
          rows={8}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      <div className="flex gap-3 flex-wrap mb-6">
        <button
          id="process-btn"
          onClick={() => setOutput(processInput(input))}
          disabled={!input}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🔧 Process
        </button>
        <button
          id="reset-btn"
          onClick={() => { setInput(""); setOutput(""); }}
          disabled={!input && !output}
          className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🗑️ Reset
        </button>
      </div>

      {output && (
        <div className="mb-6 relative">
          <div
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {output}
          </div>
          <button
            id="copy-btn"
            onClick={handleCopy}
            className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools
        currentTool="tool-name"
        tools={["related-1", "related-2", "related-3"]}
      />
    </>
  );
}
```

### `seo-content.tsx`

```typescript
export default function ToolSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use Tool Name</h2>
        {/* Steps + Features */}
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        {/* 4–6 FAQ items */}
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Use Our Tool Name?</h2>
        {/* 3-column benefit grid */}
      </section>
    </>
  );
}
```

---

## 🔧 Updating Existing Files

### `config/tools.ts` — add to tools array

```typescript
{ slug: "tool-name", name: "Tool Name", description: "Brief.", category: "writing", icon: "🔧", free: true },
```

### `lib/tools-registry.ts` — needed by RelatedTools

```typescript
// Top — import:
import { toolConfig as toolNameConfig } from "@/tools/tool-name/config";

// In TOOLS_REGISTRY object:
"tool-name": toolNameConfig,
```

### `app/tools/[tool]/[subtool]/page.tsx` — ⚠️ this is the ROUTING file

```typescript
// Top — imports:
import { toolConfig as toolNameConfig } from "@/tools/tool-name/config";
import ToolNameUI from "@/tools/tool-name/ui";

// In TOOLS array:
{ config: toolNameConfig, Component: ToolNameUI },
```

---

## 🗺️ URL Structure

```
/tools                              → Category index (11 cards)
/tools/writing                      → Writing Tools category page
/tools/writing/word-counter         → Individual tool page ← MAIN URL
/tools/word-counter                 → Auto-redirects to /tools/writing/word-counter
```

---

## 📊 Categories (11)

| Slug | Name | Icon |
|---|---|---|
| `writing` | Writing Tools | ✍️ |
| `image` | Image Tools | 🖼️ |
| `design` | Design Tools | 🎨 |
| `security` | Security Tools | 🔒 |
| `math` | Math Tools | 🔢 |
| `calculator` | Calculator Tools | 🧮 |
| `creator` | Creator Tools | 🚀 |
| `developer` | Developer Tools | 💻 |
| `visualization` | Visualization Tools | 📊 |
| `productivity` | Productivity Tools | ⚡ |
| `multimedia` | Multimedia Tools | 🎥 |

---

## 🎨 Design System Classes

```tsx
{/* Textarea */}
"w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"

{/* Primary Button */}
"bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"

{/* Secondary/Reset Button */}
"border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"

{/* Output Box */}
"w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px]"

{/* SEO Section */}
"mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8"
```

**Always set fonts explicitly:**
```tsx
style={{ fontFamily: "var(--font-heading)" }}   // Poppins — buttons, labels
style={{ fontFamily: "var(--font-body)" }}       // Inter — textarea, body text
```

---

## 🔍 SEO Formulas

```
Title:       "Free [Tool] — [Benefit] | Productive Toolbox"        (< 60 chars)
Description: "Free online [tool] to [verb] [thing]. [Feature]. Perfect for [audience]. No sign-up." (150–160 chars)
Keywords:    primary, "free primary", "online primary", variations, long-tail (10–15 total)
```

---

## ✅ Quick Checklist

```
[ ] Folder created: tools/your-tool-name/
[ ] 4 files created: config.ts, logic.ts, ui.tsx, seo-content.tsx
[ ] config/tools.ts updated (correct category slug!)
[ ] lib/tools-registry.ts updated
[ ] app/tools/[tool]/[subtool]/page.tsx updated
[ ] "use client" on first line of ui.tsx
[ ] RelatedTools rendered last in ui.tsx
[ ] id attributes on input/button elements
[ ] Disabled states on buttons
[ ] 4+ FAQ questions in seo-content.tsx
[ ] Loads at /tools/[category]/your-tool-name
[ ] Redirect works from /tools/your-tool-name
[ ] No console errors
[ ] Responsive on mobile (375px)
```

---

## 🚨 Common Errors

| Error | Cause | Fix |
|---|---|---|
| 404 on tool URL | Not in TOOLS array | Update `[subtool]/page.tsx` |
| RelatedTools blank | Not in tools-registry | Update `lib/tools-registry.ts` |
| "use client" error | Server component using hooks | Add `"use client"` line 1 |
| Wrong font rendering | Missing `style={{ fontFamily }}` | Add font style to elements |
| Tool not in category | Wrong category slug | Check 11-category table |
| Redirect not working | Not in `config/tools.ts` | Add to tools array |

---

## 🐛 Debug Commands

```bash
pnpm build       # Catches TypeScript errors
pnpm lint        # ESLint checks
rm -rf .next && pnpm dev   # Clear cache
```

---

**Print this page for quick reference!** | v2.0 — March 2026
