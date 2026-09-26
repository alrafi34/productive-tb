export const wifiPasswordGeneratorConfig = {
  slug: "wifi-password-generator",
  name: "WiFi Password Generator",
  description: "Generate secure and easy WiFi passwords for home networks with router compatibility validation",
  category: "security",
  icon: "📶",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How long should a WiFi password be?", a: "WPA2 and WPA3 accept 8 to 63 characters. Use at least 12 random characters, or a passphrase of four or more random words, for a home network." },
      { q: "Which characters are safe to use in a WiFi password?", a: "Letters, numbers and common symbols work on almost every router. The generator avoids characters some devices struggle to type or display, such as quotes, backslashes and spaces." },
      { q: "Is a random password or a passphrase better?", a: "Both can be strong. A random password packs more strength into fewer characters; a passphrase of random words is easier to read out and type on a TV or games console." },
      { q: "Are the passwords generated securely?", a: "Yes. They use the browser's cryptographic random number generator (crypto.getRandomValues), and nothing is sent to a server." },
      { q: "How do I change my WiFi password?", a: "Open your router's admin page (often 192.168.0.1 or 192.168.1.1, or the router's app), go to the wireless security settings, paste the new password, save, and reconnect your devices." },
    ],
    title: "WiFi Password Generator – Strong WPA2 & WPA3 Keys",
    description: "Generate strong WiFi passwords that routers accept: random or easy-to-type passphrases, with the length and characters you choose and the strength shown.",
    keywords: [
      "wifi password generator",
      "wireless password",
      "router password",
      "wifi security",
      "network password",
      "wpa2 password",
      "home wifi password",
      "guest wifi password",
      "secure wifi password",
      "memorable password",
      "router compatible password",
      "wifi password strength",
      "free wifi password generator",
      "online wifi password tool"
    ],
    openGraph: {
      title: "WiFi Password Generator – Secure & Easy WiFi Passwords",
      description: "Generate router-compatible WiFi passwords with customizable options, strength meter, and memorable mode. 100% secure and private.",
      type: "website",
      url: "/wifi-password-generator"
    }
  },
  features: [
    "Secure WiFi password generation",
    "Customizable length (8-32 characters)",
    "Character type selection",
    "Memorable password mode (easy to type)",
    "Pattern-based generation",
    "Password strength meter",
    "Entropy calculator with crack time",
    "Router compatibility validation",
    "Quick presets (Home, Guest, Advanced)",
    "Multiple password generation (5-20)",
    "Favorites system",
    "Password history (last 10)",
    "Export as TXT or JSON",
    "100% client-side (crypto.getRandomValues)",
    "No server storage"
  ]
};
