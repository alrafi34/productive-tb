# Word Counter SEO - Quick Reference Guide

## 📋 Summary

This guide provides all the code snippets and configurations for the Word Counter tool SEO optimization.

---

## 1️⃣ Tool Configuration (`/tools/word-counter/config.ts`)

```typescript
export const toolConfig = {
  slug: "word-counter",
  name: "Word Counter",
  description: "Count words, characters, sentences, paragraphs, and reading time instantly",
  category: "writing",
  icon: "📝",
  free: true,
  backend: false,
  seo: {
    title: "Free Word Counter Tool - Count Words, Characters & Reading Time | Productive Toolbox",
    description: "Free online word counter tool to count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators.",
    keywords: [
      "word counter",
      "character counter",
      "reading time calculator",
      "word count tool",
      "text analyzer",
      "writing tools",
      "free word counter",
      "online word counter",
      "word counter with reading time",
      "sentence counter",
      "paragraph counter",
      "text statistics",
      "content writing tools",
      "essay word count",
      "document word counter"
    ],
    openGraph: {
      title: "Free Word Counter Tool - Count Words & Characters Online",
      description: "Instantly count words, characters, sentences, and paragraphs. Get reading time estimates for your content. Free online tool for writers and students.",
      type: "website",
      url: "/word-counter"
    }
  },
  features: [
    "Real-time word counting",
    "Character count (with/without spaces)",
    "Sentence and paragraph counting",
    "Reading time estimation",
    "Text statistics analysis",
    "No registration required"
  ]
};
```

---

## 2️⃣ Page Metadata (`/app/tools/[tool]/page.tsx`)

```typescript
export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) return {};
  
  const { seo } = entry.config;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      type: "website",
      url: `${siteConfig.url}/tools/${slug}`,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

---

## 3️⃣ JSON-LD Structured Data

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${config.name} Tool`,
  description: config.description,
  url: `${siteConfig.url}/tools/${slug}`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## 4️⃣ Semantic HTML Structure

```jsx
<article className="max-w-3xl mx-auto">
  <nav aria-label="Breadcrumb">
    {/* Breadcrumb navigation */}
  </nav>

  <header>
    <h1>{title}</h1> {/* Only one H1 per page */}
    <p>{description}</p>
  </header>

  {/* Tool Component */}
  
  <section>
    <h2>How to Use the Word Counter Tool</h2>
    <h3>Quick Start Guide</h3>
    <h3>What You Get</h3>
  </section>

  <section>
    <h2>Frequently Asked Questions</h2>
    <h3>Question 1</h3>
    <h3>Question 2</h3>
    {/* ... */}
  </section>

  <section>
    <h2>Why Use Our Word Counter Tool?</h2>
    <h3>Lightning Fast</h3>
    <h3>100% Private</h3>
    <h3>Mobile Friendly</h3>
  </section>
</article>
```

---

## 5️⃣ Keywords by Priority

### Primary (Target First)
- word counter
- character counter
- word count tool

### Secondary (Target Second)
- free word counter
- online word counter
- text analyzer
- reading time calculator

### Long-Tail (Easy Wins)
- word counter with reading time
- essay word count
- document word counter
- sentence counter online
- paragraph counter tool

---

## 6️⃣ Content Guidelines

### Title Tag Formula:
```
[Primary Keyword] - [Benefit] | [Brand Name]
Example: "Free Word Counter Tool - Count Words, Characters & Reading Time | Productive Toolbox"
```

### Meta Description Formula:
```
[Action Verb] + [Primary Keyword] + [Features] + [Target Audience]
Example: "Free online word counter tool to count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators."
```

### FAQ Questions (Target Featured Snippets):
1. How accurate is this word counter tool?
2. Can I use this word counter for academic writing?
3. How is reading time calculated?
4. Is my text data secure when using this tool?
5. Does this tool work on mobile devices?
6. What's the difference between character count with and without spaces?

---

## 7️⃣ Performance Checklist

- [ ] Page loads in < 2 seconds
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Mobile-friendly (responsive design)
- [ ] No render-blocking resources
- [ ] Optimized images (using emojis instead)
- [ ] Minified CSS/JS

---

## 8️⃣ Testing URLs

### Local Development:
```
http://localhost:3000/tools/word-counter
```

### Production:
```
https://productivetoolbox.com/tools/word-counter
```

### Test Tools:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Schema Markup Validator: https://validator.schema.org/

---

## 9️⃣ Monitoring & Analytics

### Google Search Console Queries to Track:
- word counter
- free word counter
- online word counter
- word counter with reading time
- character counter
- reading time calculator

### Key Metrics:
- Organic impressions
- Click-through rate (CTR)
- Average position
- Core Web Vitals scores
- Bounce rate
- Average session duration

---

## 🔟 Next Tool Template

When creating SEO for other tools, follow this pattern:

```typescript
// 1. Update config.ts with comprehensive SEO metadata
// 2. Add keywords array (15+ keywords)
// 3. Create seo-content.tsx with:
//    - How to Use section
//    - FAQ section (6+ questions)
//    - Benefits section
// 4. Import and render SEO content in ui.tsx
// 5. Ensure semantic HTML structure
// 6. Add JSON-LD structured data
```

---

## 📊 Expected Results Timeline

| Timeframe | Expected Outcome |
|-----------|------------------|
| Week 1-2  | Indexed by Google |
| Month 1-3 | Rank for long-tail keywords (positions 10-30) |
| Month 3-6 | Rank for secondary keywords (positions 5-15) |
| Month 6-12| Rank for primary keywords (positions 1-10) |

---

## 🎯 Success Metrics

- **Target**: 2,000+ organic visits/month by month 12
- **CTR Goal**: > 5% for primary keywords
- **Bounce Rate**: < 40%
- **Avg. Session Duration**: > 2 minutes
- **Featured Snippets**: 3+ FAQ questions

---

**Files Modified:**
1. `/tools/word-counter/config.ts` - Enhanced SEO metadata
2. `/app/tools/[tool]/page.tsx` - Full metadata + JSON-LD
3. `/tools/word-counter/seo-content.tsx` - SEO content sections
4. `/tools/word-counter/ui.tsx` - Integrated SEO content
5. `/components/ToolLayout.tsx` - Semantic HTML structure

**Documentation:**
- `/docs/seo/word-counter-seo-strategy.md` - Complete strategy
- `/docs/seo/quick-reference.md` - This file
