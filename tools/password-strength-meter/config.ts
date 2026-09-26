export const passwordStrengthMeterConfig = {
  slug: "password-strength-meter",
  name: "Password Strength Meter",
  description: "Evaluate password security with entropy analysis and crack time estimation",
  category: "security",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Is it safe to enter my password here?", a: "Yes! All analysis happens locally in your browser. No passwords are sent to any server or stored anywhere except your device's localStorage (if you choose to save history)." },
      { q: "What makes a password strong?", a: "A strong password has high entropy (80+ bits), uses all character types (uppercase, lowercase, numbers, symbols), is at least 12 characters long, and avoids common patterns or words." },
      { q: "How accurate is the crack time estimation?", a: "Our estimates assume a modern GPU capable of 10 billion guesses per second in an offline attack. Real-world crack times vary based on attack method, hardware, and security measures like rate limiting." },
      { q: "Should I use a password manager?", a: "Absolutely! Password managers generate and store complex, unique passwords for each account, making them much more secure than reusing simple passwords." },
      { q: "What's the difference between entropy and strength?", a: "Entropy is a mathematical measure of randomness (in bits), while strength is a user-friendly rating (Very Weak to Very Strong) based on entropy, length, and character diversity." },
      { q: "Can I export my password analysis?", a: "Yes! You can export individual analyses or comparison results as TXT or JSON files for documentation or security audits." },
    ],
    title: "Password Strength Checker – How Secure Is My Password?",
    description: "Check how strong a password is from its length, character mix and entropy, see an estimated time to crack it, and get tips to improve it. Stays private.",
    keywords: [
      "password strength meter",
      "password checker",
      "password security",
      "entropy calculator",
      "password strength test",
      "password analyzer",
      "crack time estimation",
      "password evaluation",
      "strong password checker",
      "password security tool",
      "password strength calculator",
      "password tester",
      "secure password checker",
      "password validator",
      "free password strength meter"
    ],
    openGraph: {
      title: "Password Strength Meter — Evaluate Password Security Online",
      description: "Check your password strength instantly with entropy analysis, crack time estimation, and real-time suggestions.",
      type: "website",
      url: "/password-strength-meter"
    }
  },
  features: [
    "Real-time password analysis",
    "Entropy calculation (bits)",
    "Crack time estimation",
    "Visual strength indicator (5 levels)",
    "Character type detection",
    "Smart improvement suggestions",
    "Password comparison mode (up to 5)",
    "Side-by-side comparison table",
    "Copy to clipboard",
    "Save analysis to history",
    "Export as TXT or JSON",
    "Pattern detection (repeated, sequential)",
    "Common password detection",
    "100% client-side processing",
    "No server communication",
    "Privacy-focused"
  ]
};
