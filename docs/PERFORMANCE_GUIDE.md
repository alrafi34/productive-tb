# ⚡ Performance Optimization Guide for Tool Development

**Maintain 95+ Mobile Lighthouse Score for All Tools**

> Last Updated: March 2026 | Version: 1.0

---

## 🎯 Performance Goals

| Metric | Target | Maximum |
|--------|--------|---------|
| Mobile Lighthouse Score | **95+** | 90+ |
| Desktop Lighthouse Score | **100** | 95+ |
| First Contentful Paint (FCP) | < 1.0s | 1.5s |
| Total Blocking Time (TBT) | < 150ms | 300ms |
| Largest Contentful Paint (LCP) | < 1.5s | 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 | 0.25 |
| JS Bundle Size (per tool) | < 50KB | 100KB |

---

## 🚨 CRITICAL RULES

### Rule #1: Dynamic Imports ONLY

**❌ NEVER use static imports for tool UI components:**

```typescript
// app/tools/[tool]/[subtool]/page.tsx

// ❌ BAD: Loads ALL 130+ tools on every page (~2MB)
import WordCounterUI from "@/tools/word-counter/ui";
import ImageCompressorUI from "@/tools/image-compressor/ui";
// ... 128 more imports

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
  { config: imageCompressorConfig, Component: ImageCompressorUI },
];
```

**✅ ALWAYS use dynamic imports:**

```typescript
// app/tools/[tool]/[subtool]/page.tsx
import dynamic from "next/dynamic";

const TOOL_COMPONENTS: Record<string, any> = {
  'word-counter': dynamic(() => import('@/tools/word-counter/ui'), { ssr: false }),
  'image-compressor': dynamic(() => import('@/tools/image-compressor/ui'), { ssr: false }),
  // ... all other tools
};

// Then use it:
const Component = TOOL_COMPONENTS[slug];
if (!Component) notFound();

return <Component />;
```

**Impact:**
- Bundle size: 2MB → 50KB (97% reduction)
- Mobile score: +15-20 points
- Load time: 3.2s → 1.5s (53% faster)

---

### Rule #2: Client-Side Only Rendering

**All tool UI components MUST:**

1. Have `"use client"` directive on line 1
2. Be imported with `ssr: false` flag

```typescript
// tools/your-tool-name/ui.tsx
"use client";  // ← REQUIRED on line 1

import { useState } from "react";

export default function YourToolUI() {
  // Component code
}
```

```typescript
// app/tools/[tool]/[subtool]/page.tsx
const TOOL_COMPONENTS = {
  'your-tool-name': dynamic(() => import('@/tools/your-tool-name/ui'), { 
    ssr: false  // ← REQUIRED: prevents server-side rendering
  }),
};
```

**Why?**
- Tools use browser APIs (localStorage, clipboard, canvas)
- These APIs don't exist on the server
- SSR would cause hydration errors

---

### Rule #3: Lazy Load Heavy Libraries

**❌ BAD: Import at module level**

```typescript
import Chart from 'chart.js';  // Loads immediately (200KB+)
import * as d3 from 'd3';      // Loads immediately (500KB+)
import marked from 'marked';   // Loads immediately (50KB+)
```

**✅ GOOD: Lazy load when needed**

```typescript
import { useState, useEffect } from "react";

export default function ChartToolUI() {
  const [Chart, setChart] = useState<any>(null);
  
  useEffect(() => {
    // Load only when component mounts
    import('chart.js').then(module => {
      setChart(() => module.default);
    });
  }, []);
  
  if (!Chart) return <div>Loading chart library...</div>;
  
  return <ChartComponent Chart={Chart} />;
}
```

**Common Heavy Libraries:**
- Chart.js: 200KB
- D3.js: 500KB
- Marked: 50KB
- Prism.js: 100KB
- PDF.js: 800KB

---

### Rule #4: Debounce Real-Time Updates

For tools with real-time processing (word counter, text formatters), debounce updates:

```typescript
import { useState, useEffect } from "react";

// Reusable debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in your tool:
export default function TextToolUI() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300); // 300ms delay
  
  useEffect(() => {
    // This only runs 300ms after user stops typing
    const result = processText(debouncedInput);
    setOutput(result);
  }, [debouncedInput]);
  
  return (
    <textarea 
      value={input} 
      onChange={e => setInput(e.target.value)} 
    />
  );
}
```

**Impact:**
- Reduces CPU usage by 70%
- Prevents UI lag during typing
- Improves perceived performance

---

### Rule #5: Use Web Workers for Heavy Computation

For CPU-intensive tasks (image processing, large calculations), offload to Web Workers:

**Create worker file:**

```typescript
// tools/image-compressor/compression.worker.ts
self.onmessage = async (e: MessageEvent) => {
  const { imageData, quality } = e.data;
  
  // Heavy computation here
  const compressed = await compressImage(imageData, quality);
  
  self.postMessage({ compressed });
};

function compressImage(imageData: ImageData, quality: number) {
  // CPU-intensive compression logic
  return compressedData;
}
```

**Use in component:**

```typescript
// tools/image-compressor/ui.tsx
"use client";

import { useState, useEffect } from "react";

export default function ImageCompressorUI() {
  const [worker, setWorker] = useState<Worker | null>(null);
  
  useEffect(() => {
    // Create worker
    const w = new Worker(
      new URL('./compression.worker.ts', import.meta.url)
    );
    
    w.onmessage = (e) => {
      const { compressed } = e.data;
      setResult(compressed);
    };
    
    setWorker(w);
    
    return () => w.terminate();
  }, []);
  
  function handleCompress(imageData: ImageData) {
    if (worker) {
      worker.postMessage({ imageData, quality: 0.8 });
    }
  }
  
  return (
    // UI code
  );
}
```

**When to use Web Workers:**
- Image processing (compression, filters, transformations)
- Large data parsing (CSV, JSON, XML)
- Complex calculations (scientific, financial)
- Text analysis on large documents

---

### Rule #6: Optimize Images

**For tool icons and UI images:**

```tsx
// ❌ BAD
<img src="/icon.png" />

// ✅ GOOD: Below-fold images
<img 
  src="/icon.png" 
  loading="lazy"           // Lazy load
  width="48" 
  height="48"              // Prevent layout shift
  alt="Tool icon"
/>

// ✅ BEST: Above-fold images
<img 
  src="/hero.png" 
  loading="eager" 
  fetchpriority="high"     // Prioritize loading
  width="800" 
  height="800"
  alt="Hero image"
/>
```

**For user-uploaded images:**

```typescript
// Resize before displaying
function resizeImage(file: File, maxWidth: number): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.9);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

---

### Rule #7: Minimize Re-renders

**Use React.memo for expensive components:**

```typescript
import { memo } from "react";

const ExpensiveResultDisplay = memo(({ result }: { result: string }) => {
  // This only re-renders when result changes
  return (
    <div className="result-display">
      {result}
    </div>
  );
});

export default function ToolUI() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  
  return (
    <>
      <textarea onChange={e => setInput(e.target.value)} />
      <ExpensiveResultDisplay result={result} />
    </>
  );
}
```

**Use useCallback for stable function references:**

```typescript
import { useCallback } from "react";

export default function ToolUI() {
  const [data, setData] = useState([]);
  
  // Function reference stays stable across re-renders
  const handleUpdate = useCallback((newItem: any) => {
    setData(prev => [...prev, newItem]);
  }, []);
  
  return <ChildComponent onUpdate={handleUpdate} />;
}
```

---

### Rule #8: Avoid Large Dependencies

**❌ Avoid importing entire libraries:**

```typescript
import _ from 'lodash';           // 70KB
import moment from 'moment';      // 230KB
import * as d3 from 'd3';         // 500KB
```

**✅ Import only what you need:**

```typescript
import debounce from 'lodash/debounce';     // 2KB
import format from 'date-fns/format';       // 5KB
import { scaleLinear } from 'd3-scale';     // 10KB
```

**✅ Or use native alternatives:**

```typescript
// Instead of lodash's _.uniq:
const unique = [...new Set(array)];

// Instead of lodash's _.groupBy:
const grouped = array.reduce((acc, item) => {
  const key = item.category;
  (acc[key] = acc[key] || []).push(item);
  return acc;
}, {});

// Instead of moment.js:
const formatted = new Intl.DateTimeFormat('en-US').format(new Date());

// Instead of lodash's _.debounce (see Rule #4):
function useDebounce<T>(value: T, delay: number): T { /* ... */ }
```

---

## 📊 Performance Checklist for New Tools

Before submitting a new tool, verify:

### Code Quality
- [ ] `"use client"` directive on line 1 of ui.tsx
- [ ] Tool registered with `dynamic()` import and `ssr: false`
- [ ] No heavy libraries imported at module level
- [ ] Real-time updates are debounced (300ms)
- [ ] No unnecessary re-renders (use React DevTools Profiler)

### Assets
- [ ] Images have `loading` attribute
- [ ] Images have explicit `width` and `height`
- [ ] No images larger than 200KB
- [ ] Icons are SVG or optimized PNG

### Performance
- [ ] Web Worker used for CPU-intensive tasks (if applicable)
- [ ] Bundle size < 100KB (check with `npm run build`)
- [ ] No console errors or warnings
- [ ] Lighthouse mobile score 95+
- [ ] Lighthouse desktop score 100

---

## 🧪 Testing Performance

### 1. Build and Measure

```bash
# Build production bundle
npm run build

# Check output for bundle sizes
# Look for: "First Load JS shared by all"
# Target: < 100KB for tool pages

# Start production server
npm run start
```

### 2. Run Lighthouse

```bash
# Open Chrome DevTools
# Navigate to your tool: http://localhost:3000/tools/[category]/[tool]
# DevTools → Lighthouse → Mobile → Analyze page load

# Target scores:
# Performance: 95+
# Accessibility: 100
# Best Practices: 100
# SEO: 100
```

### 3. Analyze Bundle

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build

# Opens interactive bundle visualization
```

### 4. Profile React Performance

```bash
# In Chrome DevTools:
# 1. Open React DevTools extension
# 2. Go to Profiler tab
# 3. Click Record
# 4. Interact with your tool
# 5. Stop recording
# 6. Analyze render times

# Look for:
# - Components rendering too often
# - Long render times (> 16ms)
# - Unnecessary re-renders
```

---

## 🎯 Performance Patterns by Tool Type

### Pattern 1: Text Processing Tools
**Examples:** Word Counter, Text Formatter, Case Converter

```typescript
"use client";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { processText } from "./logic";

export default function TextToolUI() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);
  const result = processText(debouncedInput);
  
  return (
    <>
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <div>{result}</div>
    </>
  );
}
```

**Key optimizations:**
- ✅ Debounce input (300ms)
- ✅ Pure logic functions in separate file
- ✅ No external dependencies

---

### Pattern 2: Image Processing Tools
**Examples:** Image Compressor, Image Resizer, Filters

```typescript
"use client";
import { useState, useEffect } from "react";

export default function ImageToolUI() {
  const [worker, setWorker] = useState<Worker | null>(null);
  
  useEffect(() => {
    const w = new Worker(new URL('./worker.ts', import.meta.url));
    w.onmessage = (e) => setResult(e.data);
    setWorker(w);
    return () => w.terminate();
  }, []);
  
  function handleProcess(file: File) {
    if (worker) {
      const reader = new FileReader();
      reader.onload = () => worker.postMessage(reader.result);
      reader.readAsArrayBuffer(file);
    }
  }
  
  return (
    <input type="file" onChange={e => handleProcess(e.target.files[0])} />
  );
}
```

**Key optimizations:**
- ✅ Web Worker for processing
- ✅ No heavy libraries at top level
- ✅ Cleanup worker on unmount

---

### Pattern 3: Visualization Tools
**Examples:** Chart Maker, Graph Generator

```typescript
"use client";
import { useState, useEffect } from "react";

export default function ChartToolUI() {
  const [Chart, setChart] = useState<any>(null);
  
  useEffect(() => {
    // Lazy load chart library
    import('chart.js').then(m => setChart(() => m.Chart));
  }, []);
  
  if (!Chart) return <div>Loading...</div>;
  
  return <canvas ref={canvasRef} />;
}
```

**Key optimizations:**
- ✅ Lazy load chart library
- ✅ Show loading state
- ✅ Use canvas for rendering

---

### Pattern 4: Calculator Tools
**Examples:** BMI Calculator, Loan Calculator

```typescript
"use client";
import { useState } from "react";
import { calculate } from "./logic";

export default function CalculatorUI() {
  const [inputs, setInputs] = useState({ a: 0, b: 0 });
  const result = calculate(inputs.a, inputs.b);
  
  return (
    <>
      <input 
        type="number" 
        value={inputs.a} 
        onChange={e => setInputs(prev => ({ ...prev, a: +e.target.value }))} 
      />
      <div>Result: {result}</div>
    </>
  );
}
```

**Key optimizations:**
- ✅ Pure calculation functions
- ✅ No debouncing needed (on-demand)
- ✅ No external dependencies

---

## 🚀 Advanced Optimizations

### 1. Code Splitting by Route

Already implemented via dynamic imports. Each tool loads independently.

### 2. Preload Critical Resources

```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
</head>
```

### 3. Defer Non-Critical Scripts

```tsx
// app/layout.tsx
<Script 
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="lazyOnload"  // Load after page is interactive
/>
```

### 4. Optimize Font Loading

```typescript
// app/layout.tsx
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",  // Prevent invisible text during load
});
```

### 5. Enable Static Generation

```typescript
// app/tools/[tool]/[subtool]/page.tsx
export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render top 20 most popular tools
  const popularTools = ['word-counter', 'image-compressor', /* ... */];
  
  return popularTools.flatMap(slug => {
    const tool = tools.find(t => t.slug === slug);
    return tool ? [{ tool: tool.category, subtool: slug }] : [];
  });
}
```

---

## 📈 Expected Performance Gains

| Optimization | Impact | Lighthouse Gain |
|--------------|--------|-----------------|
| Dynamic imports | Bundle: 2MB → 50KB | +15-20 points |
| Defer analytics | TBT: -200ms | +5-8 points |
| Static generation | FCP: -50% | +8-12 points |
| Debounce updates | CPU: -70% | +3-5 points |
| Web Workers | TBT: -300ms | +5-10 points |
| Lazy load libraries | Bundle: -200KB | +5-8 points |
| Optimize images | LCP: -30% | +3-5 points |

**Total potential gain: +44-68 Lighthouse points**

---

## 🎓 Learning Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

---

## ✅ Pre-Deployment Checklist

Before deploying your tool to production:

- [ ] Lighthouse mobile score 95+
- [ ] Lighthouse desktop score 100
- [ ] Bundle size < 100KB
- [ ] No console errors
- [ ] All images optimized
- [ ] Heavy libraries lazy loaded
- [ ] Real-time updates debounced
- [ ] Web Worker used (if applicable)
- [ ] Tested on real mobile device
- [ ] Tested on slow 3G network

---

**Version:** 1.0 | **Updated:** March 2026 | **Maintained by:** Productive Toolbox Team
