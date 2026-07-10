# GA4 Setup & Performance Troubleshooting

## How it's added

GA4 is loaded via `next/script` with `strategy="afterInteractive"` — this defers the script until after the page is interactive. No extra packages needed.

**File:** `app/layout.tsx`

```tsx
import Script from "next/script"

// Inside <body>, at the bottom:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID from Google Analytics → Admin → Data Streams.

---

## Why it's lightweight

| Method | Render-blocking | Impact on LCP/FCP |
|---|---|---|
| Raw `<script>` in `<head>` | Yes | High |
| `next/third-parties` (current) | No | None |

The script loads with `strategy="afterInteractive"` — the browser paints and becomes interactive first, then GA4 loads in the background.

---

## If you see a performance issue

### Step 1 — Confirm GA4 is the cause

Run a Lighthouse audit twice: once in a normal browser, once with the Network blocked for `googletagmanager.com`. If scores differ significantly, GA4 is the problem.

Or check in Chrome DevTools → Network tab → filter by `google` — see if any GA requests appear in the critical path.

### Step 2 — Quick disable (no deploy needed)

Comment out the component in `app/layout.tsx`:

```tsx
{/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
```

Deploy and re-run Lighthouse to confirm the issue is gone.

### Step 3 — Full removal

If confirmed, do these things in `app/layout.tsx`:

1. Remove the import line:
```tsx
// DELETE this line:
import Script from "next/script"
```
(only if Script isn't used elsewhere)

2. Remove the two Script blocks:
```tsx
// DELETE both of these:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">
  {`...`}
</Script>
```

That's it. No other files are affected.

---

## Alternative if you still need analytics data

If you remove GA4 due to performance, **Vercel Analytics** is already in your layout and has near-zero overhead since it runs server-side:

```tsx
<Analytics />  // already present — keeps tracking pageviews
```

You won't get the same depth as GA4 (no events, no demographics) but you'll still see traffic, pages, and referrers.

---

## Notes

- Your GA4 Measurement ID format: `G-` followed by letters and numbers
- Find it in Google Analytics → Admin → Data Streams → your stream → Measurement ID
- The `next/third-parties` approach is the official Google + Next.js recommended method as of Next.js 13.4+
