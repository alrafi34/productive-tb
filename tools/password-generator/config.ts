export const passwordGeneratorConfig = {
  slug: "password-generator",
  name: "Password Generator",
  description: "Generate secure random passwords with customizable length, symbols, passphrases, and entropy strength checker",
  category: "security",
  icon: "🔒",
  free: true,
  backend: false,
  seo: {
    title: "Secure Password Generator – Create Strong Random Passwords | Productive Toolbox",
    description: "Generate strong random passwords instantly with customizable length, symbols, passphrases, and entropy strength checker. 100% secure, client-side generation with no server storage.",
    keywords: [
      "password generator",
      "secure password",
      "random password",
      "strong password generator",
      "password creator",
      "passphrase generator",
      "password strength checker",
      "entropy calculator",
      "secure password tool",
      "random password generator",
      "password maker",
      "strong password creator",
      "password security",
      "free password generator",
      "online password tool"
    ],
    openGraph: {
      title: "Secure Password Generator – Create Strong Random Passwords",
      description: "Generate strong random passwords with customizable options, strength meter, and entropy calculator. 100% secure and private.",
      type: "website",
      url: "/password-generator"
    }
  },
  features: [
    "Secure random password generation",
    "Customizable length (6-128 characters)",
    "Character type selection (uppercase, lowercase, numbers, symbols)",
    "Password strength meter",
    "Entropy calculator with crack time estimation",
    "Memorable passphrase generator",
    "Pattern-based password generation",
    "Multiple password generation (5-50 at once)",
    "Ambiguous character filter",
    "Password history (last 10)",
    "Export as TXT or JSON",
    "100% client-side (crypto.getRandomValues)",
    "No server storage",
    "One-click copy"
  ]
};
