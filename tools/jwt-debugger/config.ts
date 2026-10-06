export const toolConfig = {
  slug: "jwt-debugger",
  name: "JWT Debugger",
  description: "Decode and inspect JSON Web Tokens instantly with claim analysis and expiration detection",
  category: "developer",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    title: "JWT Debugger Online – Decode JSON Web Tokens Instantly",
    description: "Decode a JSON Web Token to inspect its header, payload, claims and expiry time. Decoding happens in your browser; the token never leaves your device.",
    keywords: [
      "jwt debugger",
      "jwt decoder",
      "decode jwt",
      "json web token",
      "jwt token decoder",
      "jwt validator",
      "jwt inspector",
      "jwt claims",
      "jwt expiration",
      "jwt payload",
      "jwt header",
      "jwt authentication",
      "jwt tool",
      "online jwt decoder",
      "free jwt debugger"
    ],
    openGraph: {
      title: "JWT Debugger Online – Decode JSON Web Tokens Instantly",
      description: "Decode a JSON Web Token to inspect its header, payload, claims and expiry time. Decoding happens in your browser; the token never leaves your device.",
      type: "website",
      url: "/tools/jwt-debugger"
    },
    faq: [
      { q: "What is a JSON Web Token (JWT)?", a: "A compact token made of three Base64URL parts separated by dots: a header (the signing algorithm), a payload (claims such as the user ID and expiry) and a signature. Apps use JWTs for logins and API access." },
      { q: "Does this tool verify the signature?", a: "No. It decodes the header and payload so you can read them, which needs no key. Checking that a token is genuine requires the signing secret or public key and should be done on your server." },
      { q: "What do the exp, iat and nbf claims mean?", a: "They are Unix timestamps in seconds: exp is when the token expires, iat when it was issued and nbf the time before which it must not be accepted. The debugger converts them to readable dates and flags an expired token." },
      { q: "Is it safe to paste a token here?", a: "We do not collect or store what you enter. Still treat live tokens like passwords: anyone holding an unexpired token can use it, so prefer test tokens and never paste them into sites you do not trust." },
      { q: "Is a JWT encrypted?", a: "A normal signed JWT (JWS) is only encoded, not encrypted: anyone can read the payload. Do not put secrets in it. Encrypted tokens (JWE) have five parts and cannot be read without the key." },
    ],
  },
  features: [
    "Instant JWT token decoding",
    "Header and payload inspection",
    "Expiration time conversion",
    "Claim analysis and highlighting",
    "Token status indicator",
    "Copy decoded sections",
    "Base64URL visualization",
    "JSON syntax highlighting",
    "History",
    "Dark/Light theme toggle",
    "Keyboard shortcuts",
    "Mobile responsive design",
    "Private: your inputs are not collected or stored"
  ]
};
