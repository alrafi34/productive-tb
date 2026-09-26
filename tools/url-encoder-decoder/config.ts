export const toolConfig = {
  slug: "url-encoder-decoder",
  name: "URL Encoder / Decoder",
  description: "Encode and decode URLs with special characters. Convert to percent-encoded format instantly.",
  category: "developer",
  icon: "🔗",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "What is URL encoding?", a: "URL encoding (percent-encoding) replaces characters that are not allowed in a URL with % followed by their hexadecimal code, for example a space becomes %20 and & becomes %26." },
      { q: "What is the difference between encodeURI and encodeURIComponent?", a: "encodeURI keeps characters that structure a URL, such as / ? & and =, so it suits a whole URL. encodeURIComponent encodes those too, so it suits a single query-string value." },
      { q: "Why is a space sometimes + instead of %20?", a: "HTML forms encode spaces in query strings as +. Both mean a space in a query string, but only %20 is correct in the path of a URL." },
      { q: "Why does decoding fail?", a: "Decoding fails when a % is not followed by two valid hex digits, for example 100% on its own. Encode the text first, or fix the stray % sign." },
      { q: "Is my data sent to a server?", a: "No. Encoding and decoding run entirely in your browser." },
    ],
    title: "URL Encoder / Decoder – Percent-Encode URLs Online",
    description: "Encode special characters in URLs and query strings as percent-encoding (%20) or decode encoded URLs back to plain text, in your browser.",
    keywords: [
      "url encoder",
      "url decoder",
      "percent encoding",
      "url encoding",
      "encode url",
      "decode url",
      "percent decode",
      "url component encoder",
      "query string encoder",
      "special characters encoder",
      "online url encoder",
      "free url encoder",
      "url converter",
      "percent encoded",
      "uri encoding"
    ],
    openGraph: {
      title: "URL Encoder / Decoder - Encode & Decode URLs Online",
      description: "Fast, free URL encoder and decoder. Convert special characters to percent encoding instantly in your browser.",
      type: "website",
      url: "/tools/url-encoder-decoder"
    }
  },
  features: [
    "Encode full URLs with encodeURI",
    "Encode URL components with encodeURIComponent",
    "Decode percent-encoded URLs",
    "Auto-detect encoding mode",
    "Character encoding reference table",
    "Query parameter viewer",
    "URL breakdown analyzer",
    "Live encoding preview",
    "Copy to clipboard buttons",
    "Character counter",
    "Keyboard shortcuts",
    "Dark/Light theme toggle",
    "Recent history with LocalStorage",
    "Mobile responsive design",
    "100% client-side processing"
  ]
};
