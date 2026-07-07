import { siteConfig } from "@/config/site";

export const passwordGeneratorConfig = {
  slug: "password-generator",
  name: "Password Generator",
  description: "Generate secure random passwords with customisable length, character types, passphrases, pattern mode, bulk export, and live entropy analysis",
  category: "security",
  icon: "🔒",
  free: true,
  backend: false,
  seo: {
    title: "Password Generator — Free Random Password Generator Online | Productive Toolbox",
    description: "Generate strong random passwords instantly. Set length up to 128 chars, choose character types, view entropy in bits, and export in bulk. Free, no signup, 100% browser-based.",
    keywords: [
      "password generator",
      "password generator online",
      "strong password generator",
      "random password generator",
      "secure password generator",
      "free password generator",
      "password generator no signup",
      "password creator",
      "generate strong password",
      "password strength checker",
      "passphrase generator",
      "random passphrase generator",
      "password entropy calculator",
      "bulk password generator",
      "password generator with symbols",
      "password generator 16 characters",
      "password generator 20 characters",
      "cryptographically secure password generator",
      "password generator for password manager",
      "strong password maker",
      "how to generate a strong password",
      "free password maker online",
      "pattern password generator",
      "password generator no login",
      "browser based password generator",
    ],
    openGraph: {
      title: "Password Generator — Free Random Password Generator Online",
      description: "Generate strong random passwords instantly. Set length, choose character types, view entropy, export in bulk. Free and 100% browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/security/password-generator`,
    },
    howToSteps: [
      {
        name: "Choose generator mode",
        text: "Select Random Password for maximum security, Passphrase for a memorable option, or Pattern if the target system requires a specific character-type structure. Random Password mode is the right default for anything going into a password manager.",
      },
      {
        name: "Set the password length",
        text: "Use the length slider to choose between 6 and 128 characters. For standard online accounts, set this to 16. For email, banking, and high-value accounts, use 20 or more. The strength meter updates instantly as you drag the slider.",
      },
      {
        name: "Select character types",
        text: "Toggle uppercase, lowercase, numbers, and symbols on or off. For the strongest passwords, keep all four enabled. If a site does not allow symbols, disable that toggle — the entropy display updates to show your new effective strength.",
      },
      {
        name: "Enable exclude ambiguous if needed",
        text: "Turn on Exclude Ambiguous Characters when the password will be typed manually or shared in print — it removes look-alike pairs like O/0 and l/1/I. Leave it off when the password goes directly into a password manager via copy-paste.",
      },
      {
        name: "Read the strength and entropy display",
        text: "Check the strength label (Very Weak through Very Strong), entropy in bits, and the estimated crack time. Aim for at least Strong (60+ bits). Very Strong (128+ bits) is ideal for master passwords or encryption keys.",
      },
      {
        name: "Copy or export your password",
        text: "Click the copy icon to place the password in your clipboard for immediate use. For bulk passwords, click Export TXT or Export JSON to download the full batch as a file.",
      },
      {
        name: "Use bulk mode for multiple passwords",
        text: "Switch to Bulk mode, select 5, 10, 20, or 50 passwords, and the generator creates the entire set at once. Useful for IT provisioning, developer test credentials, or any workflow requiring multiple unique passwords simultaneously.",
      },
    ],
    faq: [
      {
        q: "What is a password generator and why do I need one?",
        a: "A password generator creates random, unpredictable passwords using a cryptographically secure algorithm. You need one because human-chosen passwords follow predictable patterns that attackers exploit in dictionary and credential-stuffing attacks. A randomly generated 16-character password with mixed characters has trillions of possible combinations, making brute-force attacks computationally impractical even with modern hardware.",
      },
      {
        q: "How is password strength calculated?",
        a: "Password strength is measured in entropy bits, calculated as: entropy = password_length x log2(pool_size), where pool_size is the number of possible characters. A 16-character password using all four character types draws from a pool of 94 characters, giving approximately 105 bits of entropy. At 1 billion guesses per second, cracking a 105-bit password would take longer than the age of the universe. This tool shows entropy and estimated crack time for every password it generates.",
      },
      {
        q: "What is a good password length?",
        a: "For most online accounts, 16 characters is the current recommended minimum. For high-value targets — banking, email, and password manager master passwords — aim for 20 to 24 characters or use a passphrase of 5 to 6 random words. Shorter passwords under 12 characters are considered weak regardless of character complexity, since modern GPU-based attacks can crack an 8-character password with all character types in under 24 hours.",
      },
      {
        q: "What is the difference between a random password and a passphrase?",
        a: "A random password like K8@xP!4dZq uses a compact mix of random characters — maximum entropy per character, but difficult to type or remember. A passphrase like Tiger-Marble-Quantum-Harbor-2847 uses random words separated by a delimiter — slightly longer but far easier to type and remember, and still extremely strong. Passphrases are ideal for master passwords that must be typed regularly; random passwords are best stored in a password manager.",
      },
      {
        q: "What does exclude ambiguous characters mean?",
        a: "Ambiguous characters are pairs that look nearly identical in many fonts: the letter O and the number 0, the lowercase letter l and the number 1 and the uppercase I. Excluding them prevents transcription errors when typing a password from a screen or printed document. Enable this when generating passwords that will be typed or shared verbally, and disable it when the password goes directly into a password manager via copy-paste.",
      },
      {
        q: "What is pattern-based password generation?",
        a: "Pattern mode lets you define a template that controls exactly which character types appear at each position. Use U for uppercase, l for lowercase, N for a number, and S for a symbol — any other character is kept as-is. The pattern UUllllNNS generates a password starting with two uppercase letters, four lowercase, two numbers, and one symbol. This is useful for systems with specific password composition rules.",
      },
      {
        q: "Is using crypto.getRandomValues() actually secure?",
        a: "Yes. The crypto.getRandomValues() API uses the operating system's cryptographically secure pseudorandom number generator (CSPRNG) — the same source used for cryptographic key generation. It is fundamentally different from Math.random(), which uses a deterministic algorithm that can be predicted if the seed is known. Every password this tool generates draws from the OS-level CSPRNG, making the output suitable for security-sensitive use.",
      },
      {
        q: "How many passwords should I generate at once with bulk mode?",
        a: "Generate as many as you need for your specific task. IT administrators provisioning new user accounts often generate 10 to 20 temporary passwords at once and export them as TXT or JSON. Developers creating test credentials for a staging environment might generate 50 at once. For everyday personal use, generating one password at a time is standard — refresh as needed until the strength meter shows Strong or Very Strong.",
      },
      {
        q: "Should I use this tool to generate my password manager master password?",
        a: "Yes, but choose passphrase mode rather than random password mode. A master password needs to be both strong and memorizable, since you cannot store it in the vault it unlocks. Generate a 5- or 6-word passphrase with capitalization and a number included. Write it on paper and store it somewhere physically secure while you memorize it, then destroy the paper. Never store it digitally outside the password manager itself.",
      },
      {
        q: "Is my data private when using this password generator?",
        a: "Yes. All password generation runs entirely in your browser using JavaScript and the Web Crypto API. The passwords you generate are never transmitted to any server, stored in any database, or accessible to anyone other than you. The optional history feature saves your last 10 generated passwords to your browser's localStorage — data that stays only on your device and is cleared when you clear your browser storage.",
      },
    ],
  },
  features: [
    "Cryptographically secure generation via crypto.getRandomValues()",
    "Three modes: random character, passphrase, and pattern",
    "Adjustable length from 6 to 128 characters",
    "Character-type toggles: uppercase, lowercase, numbers, symbols",
    "Ambiguous character exclusion (O/0, l/1/I)",
    "Real-time entropy display in bits",
    "Estimated crack time at 1 billion guesses per second",
    "Strength meter: Very Weak to Very Strong",
    "Bulk generation: 5, 10, 20, or 50 passwords at once",
    "Export as TXT or JSON file",
    "Password history — last 10 generated, stored locally",
    "One-click copy to clipboard",
    "100% browser-based — no server, no signup",
  ],
  relatedTools: [
    "wifi-password-generator",
    "username-generator",
    "text-encrypt-decrypt",
    "base64-encoder-decoder",
    "hash-generator",
  ],
};
