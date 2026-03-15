# 🚀 New Tool Integration Guide — Productive Toolbox

**Complete guide for developers and AI to integrate new tools into the Productive Toolbox project.**

> **Last Updated:** March 2026 | **Version:** 2.0

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Routing Architecture](#routing-architecture)
4. [Step-by-Step Integration](#step-by-step-integration)
5. [Design System](#design-system)
6. [SEO Strategy](#seo-strategy)
7. [Performance Optimization](#performance-optimization)
8. [Testing Checklist](#testing-checklist)
9. [Examples from Existing Tools](#examples-from-existing-tools)
10. [Common Mistakes](#common-mistakes)

---

## 🎯 Quick Start

### Prerequisites
- Node.js + pnpm installed
- Basic knowledge of React / Next.js 15
- Understanding of TypeScript

### Time to Integrate: ~30–45 minutes per tool

### Files to Create (4)
```
tools/your-tool-name/
  ├── config.ts         ← Tool metadata + SEO
  ├── logic.ts          ← Pure business logic
  ├── ui.tsx            ← "use client" React component
  └── seo-content.tsx   ← SEO sections (How-To, FAQ, Benefits)
```

### Files to Update (3)
```
config/tools.ts                          ← Register tool in the list + pick category
lib/tools-registry.ts                    ← Add to centralized registry (used by RelatedTools)
app/tools/[tool]/[subtool]/page.tsx      ← Add import + entry in TOOLS array
```

---

## 📁 Project Structure

```
productive-tb/
├── app/
│   └── tools/
│       ├── page.tsx                     # /tools — category index (10 categories)
│       └── [tool]/
│           ├── page.tsx                 # /tools/[category] — category listing page
│           │                            # /tools/[slug] — auto-redirect to /tools/[cat]/[slug]
│           └── [subtool]/
│               └── page.tsx             # /tools/[category]/[tool-slug] — INDIVIDUAL TOOL PAGE
│
├── components/
│   ├── ToolLayout.tsx                   # Shared wrapper for all tool pages (breadcrumb + H1)
│   ├── RelatedTools.tsx                 # "Related Tools" section rendered at bottom of ui.tsx
│   └── CategoryToolsGrid.tsx            # Filterable tool grid for category pages
│
├── config/
│   ├── tools.ts                         # Tool[] registry + Category[] definitions
│   └── site.ts                          # Site-wide config (name, url)
│
├── tools/
│   └── your-tool-name/                  # ← CREATE THIS
│       ├── config.ts
│       ├── logic.ts
│       ├── ui.tsx
│       └── seo-content.tsx
│
└── lib/
    └── tools-registry.ts                # Used by RelatedTools component
```

---

## 🗺️ Routing Architecture

The project uses a **two-level dynamic route** for tools:

```
/tools/[category]/[tool-slug]
         ↑              ↑
  e.g. "writing"   "word-counter"
```

### How it works

| You visit | Handled by | What happens |
|---|---|---|
| `/tools` | `app/tools/page.tsx` | Shows 10 category cards |
| `/tools/writing` | `app/tools/[tool]/page.tsx` | Shows all Writing Tools |
| `/tools/writing/word-counter` | `app/tools/[tool]/[subtool]/page.tsx` | Renders the Word Counter tool |
| `/tools/word-counter` | `app/tools/[tool]/page.tsx` | Auto-redirects to `/tools/writing/word-counter` |

> ⚠️ **Important:** The actual tool renders in `[subtool]/page.tsx`. The `[tool]/page.tsx` handles categories and redirects only.

### Available Categories (11)

| Slug | Display Name | Icon | Color |
|---|---|---|---|
| `writing` | Writing Tools | ✍️ | Emerald |
| `image` | Image Tools | 🖼️ | Amber |
| `design` | Design Tools | 🎨 | Pink |
| `security` | Security Tools | 🔒 | Red |
| `calculator` | Calculator Tools | 🧮 | Teal |
| `creator` | Creator Tools | 🚀 | Orange |
| `developer` | Developer Tools | 💻 | Blue |
| `visualization` | Visualization Tools | 📊 | Cyan |
| `productivity` | Productivity Tools | ⚡ | Lime |
| `multimedia` | Multimedia Tools | 🎥 | Indigo |

---

## 🔧 Step-by-Step Integration

### Step 1: Create the Tool Folder

```bash
mkdir -p tools/your-tool-name
```

### Step 2: Create `config.ts`

**Purpose:** Tool metadata, SEO configuration, and features list.

```typescript
// tools/your-tool-name/config.ts

export const toolConfig = {
  slug: "your-tool-name",          // Must match folder name (kebab-case)
  name: "Your Tool Name",          // Display name shown in UI and SEO title
  description: "Brief description of what your tool does.",
  category: "writing",             // Must match a slug from config/tools.ts Category[]
  icon: "🔧",                      // Emoji icon shown in ToolLayout header
  free: true,
  backend: false,                  // true only if tool calls an API route
  seo: {
    title: "Free Your Tool Name — Main Benefit | Productive Toolbox",
    description: "Free online tool description. Feature 1, Feature 2. Perfect for [audience]. No sign-up.",
    keywords: [
      "primary keyword",
      "free primary keyword",
      "online primary keyword",
      "tool name tool",
      "related keyword",
      "long-tail keyword phrase",
      // 10–15 total
    ],
    openGraph: {
      title: "Free Your Tool Name — Engaging Social Title",
      description: "Short, compelling social media description.",
      type: "website",
      url: "/your-tool-name"
    }
  },
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Works entirely in browser — no data uploaded",
    "100% free, no sign-up required",
  ]
};
```

> **Category note:** Use one of the 10 slugs from the table above. If all your tool does is calculate something, use `calculator`.

---

### Step 3: Create `logic.ts`

**Purpose:** Pure functions with zero UI dependencies. Easy to test and reuse.

```typescript
// tools/your-tool-name/logic.ts

/**
 * Processes the input text and returns the result.
 */
export function processText(text: string): string {
  return text.trim();
}

/**
 * Calculates [whatever your tool calculates].
 */
export function calculateResult(value: number, factor: number): number {
  return value * factor;
}
```

**Rules for logic.ts:**
- Export every function (they may be used by other tools)
- No `useState`, no DOM access, no `window` — pure TypeScript only
- Add JSDoc comments to describe inputs/outputs
- Handle edge cases (empty string, zero, NaN)

---

### Step 4: Create `ui.tsx`

**Purpose:** The visible React component. Always a `"use client"` component.

```typescript
// tools/your-tool-name/ui.tsx
"use client";

import { useState } from "react";
import { processText } from "./logic";
import YourToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function YourToolUI() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function handleProcess() {
    setOutput(processText(input));
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setInput("");
    setOutput("");
  }

  return (
    <>
      {/* ── Input Section ── */}
      <div className="relative mb-6">
        <textarea
          id="tool-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your text here..."
          rows={8}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        />
        {input && (
          <button
            onClick={() => setInput("")}
            className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex gap-3 flex-wrap mb-6">
        <button
          id="process-btn"
          onClick={handleProcess}
          disabled={!input}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🔧 Process
        </button>
        <button
          id="reset-btn"
          onClick={handleReset}
          disabled={!input && !output}
          className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🗑️ Reset
        </button>
      </div>

      {/* ── Output Section ── */}
      {output && (
        <div className="mb-6">
          <label
            className="block text-sm font-semibold text-gray-700 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Result
          </label>
          <div className="relative">
            <div
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {output}
            </div>
            <button
              id="copy-btn"
              onClick={handleCopy}
              className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
        </div>
      )}

      {/* ── SEO Content ── */}
      <YourToolSEOContent />

      {/* ── Related Tools ── */}
      <RelatedTools
        currentTool="your-tool-name"
        tools={["related-slug-1", "related-slug-2", "related-slug-3"]}
      />
    </>
  );
}
```

**ui.tsx Checklist:**
- ✅ `"use client"` at the very top (line 1)
- ✅ Imports from `./logic`, `./seo-content`, `@/components/RelatedTools`
- ✅ All interactive elements have a unique `id` (for testing)
- ✅ Disabled states on buttons (`disabled={!input}`)
- ✅ Copy to clipboard with temporary feedback
- ✅ Reset clears both input and output
- ✅ `YourToolSEOContent` rendered after tool UI
- ✅ `RelatedTools` is the very last element
- ✅ Uses design system classes (see Design System section)

---

### Step 5: Create `seo-content.tsx`

**Purpose:** SEO-rich static content sections that appear below the tool UI. Required for every tool.

```typescript
// tools/your-tool-name/seo-content.tsx

export default function YourToolSEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Your Tool Name
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-600">
              {[
                "Step 1 — description",
                "Step 2 — description",
                "Step 3 — description",
              ].map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {["Feature A", "Feature B", "Feature C"].map(f => (
                <li key={f} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Your Tool Name?",
              a: "Your Tool Name is a free online tool that…"
            },
            {
              q: "Is Your Tool Name free to use?",
              a: "Yes — 100% free. No account, no sign-up required."
            },
            {
              q: "Does it work on mobile?",
              a: "Yes, it's fully responsive on all screen sizes."
            },
            {
              q: "Is my data safe?",
              a: "Everything runs in your browser. Nothing is uploaded to any server."
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Your Tool Name?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { emoji: "⚡", title: "Instant Results", desc: "No waiting — outputs appear immediately." },
            { emoji: "🔒", title: "Private", desc: "Everything stays in your browser." },
            { emoji: "📱", title: "Works Everywhere", desc: "Desktop, tablet, or mobile." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="text-center">
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

**seo-content.tsx Requirements:**
- ✅ Minimum 3 sections: How to Use, FAQ, Why Use
- ✅ 4–6 FAQ questions with keyword-rich answers
- ✅ Proper H2 / H3 heading hierarchy
- ✅ 400+ words total across all sections
- ✅ Natural keyword placement (1–2%)

---

### Step 6: Register in `config/tools.ts`

Add your tool to the `tools` array. Pick the correct `category` slug:

```typescript
// config/tools.ts

export const tools: Tool[] = [
  // ... existing tools ...

  { slug: "your-tool-name", name: "Your Tool Name", description: "Brief description.", category: "writing", icon: "🔧", free: true },
];
```

> Do **not** create a new category unless discussed with the team. Use one of the existing 10 category slugs.

---

### Step 7: Register in `lib/tools-registry.ts`

This registry is used by the `RelatedTools` component to resolve tool slugs to data.

```typescript
// lib/tools-registry.ts

// 1. Add import at the top
import { toolConfig as yourToolConfig } from "@/tools/your-tool-name/config";

// 2. Add to TOOLS_REGISTRY object
export const TOOLS_REGISTRY = {
  // ... existing entries ...
  "your-tool-name": yourToolConfig,
};
```

---

### Step 8: Register in `app/tools/[tool]/[subtool]/page.tsx`

This is the file that actually **renders** a tool UI when someone visits `/tools/[category]/[tool-slug]`.

```typescript
// app/tools/[tool]/[subtool]/page.tsx

// 1. Add imports near the top with other imports
import { toolConfig as yourToolConfig } from "@/tools/your-tool-name/config";
import YourToolUI from "@/tools/your-tool-name/ui";

// 2. Add to the TOOLS array (order doesn't matter)
const TOOLS = [
  // ... existing tools ...
  { config: yourToolConfig, Component: YourToolUI },
];
```

> ⚠️ **Both `lib/tools-registry.ts` AND `app/tools/[tool]/[subtool]/page.tsx` must be updated.** Missing either one will cause a 404 or broken RelatedTools.

---

### Step 9: Also add category accent color (if creating a new category)

If you created a brand new category (rare), add it to the `categoryAccent` map in `app/tools/[tool]/page.tsx`:

```typescript
// app/tools/[tool]/page.tsx
const categoryAccent = {
  // ... existing ...
  "your-category": { badge: "bg-teal-100 text-teal-700", icon: "bg-teal-50 border-teal-100" },
};
```

Also add it to `categoryStyles` in `app/tools/page.tsx`:

```typescript
// app/tools/page.tsx
const categoryStyles = {
  // ... existing ...
  "your-category": { bg: "from-teal-50 to-white", border: "border-teal-100 hover:border-teal-300", badge: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
};
```

---

### Step 10: Test

```bash
pnpm dev
# or
npm run dev
```

Visit: `http://localhost:3000/tools/your-category/your-tool-name`

Also test the redirect: `http://localhost:3000/tools/your-tool-name` (should redirect automatically)

---

## 🎨 Design System

### Colors

```css
Primary:         #058554  (Green)
Primary Hover:   #069D63
Background:      #F9FAFB  (Light Gray)
Card Background: #FFFFFF  (White)
Text:            #1F2937  (Dark Gray)
Muted Text:      #6B7280
Border:          #E5E7EB
```

**Tailwind CSS Variables:**
```css
bg-primary          → #058554
hover:bg-primary-hover → #069D63
text-primary        → #058554
ring-primary        → #058554
border-primary      → #058554
```

### Typography

```css
Headings: var(--font-heading)  →  Poppins (400, 600, 700)
Body:     var(--font-body)     →  Inter (variable)
```

Always set font explicitly on text elements:
```tsx
style={{ fontFamily: "var(--font-heading)" }}   // for titles/buttons
style={{ fontFamily: "var(--font-body)" }}       // for body text/textarea
```

### Spacing & Sizing

```css
Max width:       max-w-3xl (tool content), max-w-7xl (page wrapper)
Border radius:   rounded-xl (12px) for inputs/buttons/cards
Padding:         px-5 py-4 (inputs), px-5 py-2.5 (buttons), p-8 (sections)
Gap:             gap-3 (button groups), gap-6 (content grids)
Shadow:          shadow-sm (sections and inputs)
```

### Component Classes (Copy-Paste)

```tsx
{/* Textarea / Input */}
className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"

{/* Primary Button */}
className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"

{/* Secondary/Danger Button */}
className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"

{/* Output Display Box */}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] leading-relaxed"

{/* SEO Section Container */}
className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8"
```

---

## 🔍 SEO Strategy

### Title Formula
```
Free [Tool Name] — [Primary Benefit] | Productive Toolbox
```
- Keep under 60 characters
- Start with "Free"
- Include the main keyword

### Description Formula
```
Free online [tool] to [benefit 1], [benefit 2]. [Unique feature]. Perfect for [audience]. No sign-up required.
```
- 150–160 characters
- Include primary keyword naturally
- End with a benefit statement

### Keywords (10–15 per tool)

| Type | Example |
|---|---|
| Primary | `word counter` |
| Modified | `free word counter`, `online word counter` |
| Variations | `word count tool`, `character counter` |
| Long-tail | `word counter for essays`, `word counter with reading time` |
| Audience | `word counter for students`, `word counter for writers` |

### FAQ Formula (4–6 questions minimum)

1. **What is [tool name]?** — Define + primary keyword
2. **How do I use [tool name]?** — Brief steps
3. **Is [tool name] free?** — Yes, 100% free, no sign-up
4. **Is my data safe/private?** — Runs in browser, nothing uploaded
5. **Does it work on mobile?** — Yes, fully responsive
6. **What is [specific feature] used for?** — Long-tail keyword opportunity

---

## ⚡ Performance Optimization

### Critical Performance Rules

**Your tool MUST follow these rules to maintain 95+ mobile Lighthouse score:**

#### 1. **Dynamic Imports Only** 🚨 CRITICAL

**❌ NEVER do this:**
```typescript
// app/tools/[tool]/[subtool]/page.tsx
import YourToolUI from "@/tools/your-tool-name/ui";  // ❌ Static import
```

**✅ ALWAYS do this:**
```typescript
// app/tools/[tool]/[subtool]/page.tsx
const TOOL_COMPONENTS = {
  'your-tool-name': dynamic(() => import('@/tools/your-tool-name/ui'), { ssr: false }),
};
```

**Why:** Static imports load ALL tool code on EVERY page. Dynamic imports load ONLY the needed tool.
- **Impact:** Reduces bundle from ~2MB → ~50KB per page
- **Mobile Score:** +15-20 points

---

#### 2. **Client-Side Only Tools**

All tool UI components MUST be client-side rendered:

```typescript
// tools/your-tool-name/ui.tsx
"use client";  // ← REQUIRED on line 1

import { useState } from "react";
// ... rest of component
```

**And in the dynamic import:**
```typescript
dynamic(() => import('@/tools/your-tool-name/ui'), { 
  ssr: false  // ← REQUIRED: prevents server-side rendering
})
```

**Why:** Tools use browser APIs (localStorage, clipboard, canvas) that don't exist on the server.

---

#### 3. **Lazy Load Heavy Libraries**

If your tool uses heavy libraries (Chart.js, D3.js, etc.), lazy load them:

```typescript
// ❌ BAD: Loads immediately
import Chart from 'chart.js';

// ✅ GOOD: Loads only when needed
const [Chart, setChart] = useState<any>(null);

useEffect(() => {
  import('chart.js').then(module => setChart(module.default));
}, []);
```

---

#### 4. **Web Workers for Heavy Computation**

For CPU-intensive tasks (image processing, large calculations), use Web Workers:

```typescript
// tools/your-tool-name/worker.ts
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// tools/your-tool-name/ui.tsx
const worker = new Worker(new URL('./worker.ts', import.meta.url));
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

**Example:** See `tools/image-compressor/compression.worker.ts`

---

#### 5. **Optimize Images**

If your tool displays images:

```tsx
// ❌ BAD
<img src="/icon.png" />

// ✅ GOOD
<img 
  src="/icon.png" 
  loading="lazy"           // Lazy load below-fold images
  width="48" 
  height="48"              // Prevent layout shift
  alt="Tool icon"
/>

// ✅ BEST (for above-fold images)
<img 
  src="/hero.png" 
  loading="eager" 
  fetchpriority="high"     // Prioritize critical images
  width="800" 
  height="600"
  alt="Hero image"
/>
```

---

#### 6. **Debounce Real-Time Updates**

For tools with real-time processing (like word counter), debounce updates:

```typescript
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage:
const [input, setInput] = useState("");
const debouncedInput = useDebounce(input, 300);

useEffect(() => {
  // Process only after user stops typing for 300ms
  const result = processText(debouncedInput);
  setOutput(result);
}, [debouncedInput]);
```

---

#### 7. **Minimize Re-renders**

Use React.memo and useCallback for expensive components:

```typescript
import { memo, useCallback } from "react";

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // Only re-renders when data or onUpdate changes
  return <div>{/* ... */}</div>;
});

function ParentComponent() {
  const handleUpdate = useCallback((value) => {
    // Stable function reference
  }, []);
  
  return <ExpensiveComponent data={data} onUpdate={handleUpdate} />;
}
```

---

#### 8. **Avoid Large Dependencies**

**❌ Avoid importing entire libraries:**
```typescript
import _ from 'lodash';  // Imports entire 70KB library
```

**✅ Import only what you need:**
```typescript
import debounce from 'lodash/debounce';  // Imports only 2KB
```

**✅ Or use native alternatives:**
```typescript
// Instead of lodash's _.uniq:
const unique = [...new Set(array)];

// Instead of lodash's _.groupBy:
const grouped = array.reduce((acc, item) => {
  (acc[item.category] = acc[item.category] || []).push(item);
  return acc;
}, {});
```

---

### Performance Checklist for New Tools

- [ ] Tool UI uses `"use client"` directive
- [ ] Tool is registered with `dynamic()` import and `ssr: false`
- [ ] No heavy libraries imported at top level
- [ ] Real-time updates are debounced (if applicable)
- [ ] Images have `loading` and size attributes
- [ ] No unnecessary re-renders (use React DevTools Profiler)
- [ ] Web Worker used for CPU-intensive tasks (if applicable)
- [ ] Bundle size < 100KB (check with `npm run build`)

---

### Measuring Performance

**Before deploying your tool:**

```bash
# 1. Build production bundle
npm run build

# 2. Start production server
npm run start

# 3. Test with Lighthouse
# Open Chrome DevTools → Lighthouse → Mobile → Run
# Target: 95+ score

# 4. Check bundle size
npm run build
# Look for: "First Load JS" in build output
# Target: < 100KB for tool pages
```

---

### Performance Budget

| Metric | Target | Max |
|--------|--------|-----|
| First Contentful Paint | < 1.0s | 1.5s |
| Total Blocking Time | < 150ms | 300ms |
| Largest Contentful Paint | < 1.5s | 2.5s |
| Cumulative Layout Shift | < 0.1 | 0.25 |
| JS Bundle Size | < 50KB | 100KB |
| Mobile Lighthouse Score | 95+ | 90+ |

---

## ✅ Testing Checklist

### Functionality
- [ ] Tool loads at `/tools/[category]/[tool-name]` without errors
- [ ] Short URL `/tools/[tool-name]` redirects correctly
- [ ] All buttons and inputs work
- [ ] Copy to clipboard shows "✅ Copied!" feedback
- [ ] Reset clears all state
- [ ] Disabled states visible when input is empty
- [ ] No console errors

### Design
- [ ] Matches design system classes
- [ ] Responsive on 375px (mobile)
- [ ] Responsive on 768px (tablet)
- [ ] Responsive on 1440px (desktop)
- [ ] `ToolLayout` breadcrumb shows correct category link

### SEO
- [ ] `<title>` tag present with primary keyword
- [ ] Meta description 150–160 chars
- [ ] Only one `<h1>` on the page (rendered by `ToolLayout`)
- [ ] H2/H3 hierarchy in `seo-content.tsx` is correct
- [ ] FAQ section has 4+ questions
- [ ] Schema markup (auto-generated by `[subtool]/page.tsx`)
- [ ] Canonical URL correct

### Registration
- [ ] Added to `config/tools.ts` with correct category slug
- [ ] Added to `lib/tools-registry.ts`
- [ ] Added with `dynamic()` import in `app/tools/[tool]/[subtool]/page.tsx`
- [ ] Category page shows the new tool card
- [ ] Homepage search finds the new tool

### Performance
- [ ] Tool uses `"use client"` directive
- [ ] Registered with `dynamic(() => import(...), { ssr: false })`
- [ ] No heavy libraries imported at module level
- [ ] Real-time updates debounced (if applicable)
- [ ] Images optimized with loading attributes
- [ ] Lighthouse mobile score 95+
- [ ] Bundle size < 100KB

---

## 📚 Examples from Existing Tools

### Pattern 1: Stats Tool — Word Counter (`writing`)
- **Input:** Textarea
- **Processing:** Real-time (no button needed)
- **Output:** Grid of stat cards (words, chars, sentences, paragraphs, reading time)
- **Key point:** `useEffect` or inline calculation on every keystroke

### Pattern 2: Transformation Tool — Sentence Case Converter (`writing`)
- **Input:** Textarea
- **Options:** 4 case-type toggle buttons
- **Processing:** Real-time via selected mode
- **Output:** Converted text display + copy button

### Pattern 3: Calculator Tool — BMI Calculator (`calculator`)
- **Input:** Number inputs (weight, height)
- **Options:** Unit toggle (metric/imperial)
- **Processing:** On button click
- **Output:** BMI value + category label (Underweight, Normal, etc.)

### Pattern 4: Visual Generator — CSS Gradient Generator (`design`)
- **Input:** Color pickers + sliders
- **Processing:** Real-time preview
- **Output:** Live preview + copyable CSS code

### Pattern 5: Visualization Tool — Pie Chart Maker (`visualization`)
- **Input:** Data rows (label + value)
- **Processing:** Canvas/SVG rendering
- **Output:** Visual chart + copy data

---

## 🚨 Common Mistakes to Avoid

| ❌ Mistake | ✅ Fix |
|---|---|
| Missing `"use client"` in ui.tsx | Add as the very first line |
| Using wrong category slug | Check the 10-slug table in this guide |
| Forgetting `lib/tools-registry.ts` update | RelatedTools component will silently fail |
| Forgetting `[subtool]/page.tsx` update | Tool returns 404 |
| **Static import instead of dynamic()** | **Use `dynamic(() => import(...), { ssr: false })`** |
| **Importing heavy libraries at top level** | **Lazy load or use lighter alternatives** |
| Slug mismatch across files | Use the same exact kebab-case slug everywhere |
| No SEO content component | Page will rank poorly |
| Missing `id` attributes on interactive elements | Breaks browser testing |
| Keyword stuffing | Write naturally for humans |
| No disabled state on buttons | Poor UX when input is empty |
| Not using `style={{ fontFamily }}` | Wrong font renders |
| **No debouncing on real-time updates** | **Add 300ms debounce to prevent lag** |

---

## 📝 Quick Reference Commands

```bash
# Start development server
pnpm dev

# TypeScript + build check
pnpm build

# Lint check
pnpm lint

# Clear cache and restart
rm -rf .next && pnpm dev
```

---

## 🎉 Success Criteria

Your tool is ready when:

- ✅ Loads at `/tools/[category]/your-tool-name`
- ✅ Short URL `/tools/your-tool-name` redirects automatically
- ✅ All features work correctly
- ✅ Responsive on mobile, tablet, desktop
- ✅ No console errors
- ✅ SEO content renders below the tool
- ✅ RelatedTools section shows at the bottom
- ✅ Meta tags visible in browser DevTools → Elements
- ✅ Appears on the category page at `/tools/[category]`

---

**Version:** 2.0 | **Updated:** March 2026 | **Maintained by:** Productive Toolbox Team
