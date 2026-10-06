export const toolConfig = {
  slug: "url-sanitizer",
  name: "URL Tracker Remover",
  description: "Remove tracking parameters from URLs instantly. Clean UTM, fbclid, gclid and other tracking tokens for privacy-friendly sharing.",
  category: "security",
  icon: "🧹",
  free: true,
  backend: false,
  seo: {
    title: "URL Tracker Remover – Clean UTM Parameters & Tracking Links",
    description: "Free online URL tracker remover. Strip UTM parameters, fbclid, gclid and other tracking tokens from URLs instantly. Privacy-focused link cleaning tool.",
    keywords: [
      "url tracker remover",
      "remove utm parameters",
      "clean tracking links",
      "strip url tracking",
      "remove fbclid",
      "remove gclid",
      "url sanitizer",
      "privacy url cleaner",
      "tracking parameter remover",
      "clean sharing links",
      "utm cleaner",
      "link privacy tool",
      "remove tracking tokens",
      "url privacy",
      "clean urls"
    ],
    openGraph: {
      title: "URL Tracker Remover - Clean Tracking Parameters from URLs",
      description: "Remove UTM parameters, fbclid, gclid and other tracking tokens from URLs instantly. Privacy-focused link cleaning tool.",
      type: "website",
      url: "/tools/security/url-sanitizer"
    },
    faq: [
      { q: "What does a URL sanitizer remove?", a: "Tracking parameters added to links for analytics, such as utm_source, utm_medium, utm_campaign, fbclid (Facebook), gclid, gbraid and wbraid (Google Ads) and dclid. The page the link points to stays the same." },
      { q: "Why remove tracking parameters?", a: "They make links long and messy, reveal where you found a link, and let the site owner tie your visit to a campaign or to someone else's click. Clean links are shorter and more private to share." },
      { q: "Can cleaning a URL break the link?", a: "Rarely. The removed parameters are only used for tracking, so the page loads as before. If a site needs another parameter to show the right content, it is left in place unless you add it to your custom list." },
      { q: "Can I clean many links at once?", a: "Yes. Paste text containing several URLs, one per line or mixed with other text; the tool finds each link, cleans it and lets you copy all results or export them as text or CSV." },
      { q: "Can I remove my own parameters?", a: "Yes. Add parameter names to the custom list and they are stripped along with the built-in tracking parameters." },
    ],
  },
  features: [
    "Remove UTM tracking parameters",
    "Strip Facebook click IDs (fbclid)",
    "Remove Google click IDs (gclid)",
    "Clean Microsoft click IDs (msclkid)",
    "Batch URL processing",
    "Real-time URL cleaning",
    "Custom parameter filtering",
    "Copy cleaned URLs instantly",
    "Export cleaned URLs as TXT/CSV",
    "History of cleaned URLs",
    "Drag & drop URL input",
    "Mobile responsive design",
    "Private: your inputs are not collected or stored",
    "Privacy-focused design"
  ]
};