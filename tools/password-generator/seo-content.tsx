export default function PasswordGeneratorSEO() {
  const faqItems = [
    {
      q: "What is a password generator and why do I need one?",
      a: "A password generator is a tool that creates random, unpredictable passwords using a cryptographically secure algorithm. You need one because human-chosen passwords follow predictable patterns — names, dates, dictionary words, keyboard walks like 'qwerty' — that attackers exploit in credential-stuffing and dictionary attacks. A randomly generated 16-character password with mixed characters has trillions of possible combinations, making brute-force attacks computationally impractical even with modern hardware.",
    },
    {
      q: "How is password strength calculated?",
      a: "Password strength is measured in entropy bits, calculated as: entropy = password_length × log₂(pool_size), where pool_size is the number of possible characters. A 16-character password using uppercase (26) + lowercase (26) + numbers (10) + symbols (32) draws from a pool of 94 characters, giving 16 × log₂(94) ≈ 105 bits of entropy. At 1 billion guesses per second, cracking a 105-bit password would take longer than the age of the universe. This tool shows entropy and estimated crack time for every password it generates.",
    },
    {
      q: "What is a good password length?",
      a: "For most online accounts, 16 characters is the current recommended minimum. For high-value targets — banking, email, password manager master passwords — aim for 20–24 characters or use a passphrase of 5–6 random words. Shorter passwords under 12 characters are considered weak regardless of character complexity. Modern hardware can crack an 8-character password with all character types in under 24 hours using GPU-based attacks.",
    },
    {
      q: "What is the difference between a random password and a passphrase?",
      a: "A random password like 'K8@xP!4dZq$L9' uses a compact mix of random characters — maximum entropy per character, but difficult to type or remember. A passphrase like 'Tiger-Marble-Quantum-Harbor-2847' uses random words separated by a delimiter — slightly longer but far easier to type and remember, and still extremely strong due to the large word space. Passphrases are ideal for master passwords that must be typed regularly, while random passwords are best stored in a password manager.",
    },
    {
      q: "What does 'exclude ambiguous characters' mean?",
      a: "Ambiguous characters are pairs that look nearly identical in many fonts: the letter O and the number 0, the lowercase letter l and the number 1 and the uppercase I. Excluding them prevents transcription errors when typing a password from a screen or printed document. Enable this option when generating passwords that will be shared verbally, printed, or typed from a reference — and disable it when the password goes directly into a password manager, since you gain no benefit from exclusion when copying and pasting.",
    },
    {
      q: "What is pattern-based password generation?",
      a: "Pattern mode lets you define a template that controls exactly which character types appear at each position. Use U for an uppercase letter, l for lowercase, N for a number, and S for a symbol — any other character is kept as-is. The pattern 'UllllNNSS' would generate a password starting with one uppercase letter, four lowercase letters, two numbers, and two symbols — always in that structure. This is useful for systems with specific password composition rules that require a set number of each character type.",
    },
    {
      q: "Is using crypto.getRandomValues() actually secure?",
      a: "Yes. The crypto.getRandomValues() API uses the operating system's cryptographically secure pseudorandom number generator (CSPRNG) — the same source used for cryptographic key generation. It is fundamentally different from Math.random(), which uses a deterministic algorithm that can be predicted if the seed is known. Every password this tool generates draws from the OS-level CSPRNG, making the output statistically indistinguishable from true randomness and suitable for security-sensitive use.",
    },
    {
      q: "How many passwords should I generate at once with bulk mode?",
      a: "Generate as many as you need for your specific task. IT administrators provisioning new user accounts often generate 10–20 temporary passwords at once and export them as a TXT or JSON file. Developers creating test credentials for a staging environment might generate 50 at once. For everyday personal use, generating one password at a time is standard — refresh as needed until the strength meter shows Strong or Very Strong.",
    },
    {
      q: "Should I use this tool to generate my password manager's master password?",
      a: "Yes, but choose passphrase mode rather than random password mode. A master password needs to be both strong and memorizable, since you cannot store it in the very vault it unlocks. Generate a 5- or 6-word passphrase with capitalization and a number included. Write it on paper and store it somewhere physically secure while you memorize it, then destroy the paper. Never store it digitally outside the password manager itself.",
    },
    {
      q: "Is my data private when using this password generator?",
      a: "Yes. All password generation runs entirely in your browser using JavaScript and the Web Crypto API. The passwords you generate are never transmitted to any server, stored in any database, or accessible to anyone other than you. The optional history feature saves your last 10 generated passwords to your browser's localStorage — data that stays only on your device and is cleared when you clear your browser storage.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Choose your generator mode", "Select Random Password for maximum security, Passphrase for something easier to type and remember, or Pattern if your target system enforces a specific character-type structure. Random Password mode is the right default for anything going into a password manager."],
    ["Set the password length", "Use the length slider to choose between 6 and 128 characters. For standard online accounts, set this to 16. For email, banking, and other high-value accounts, use 20 or more. The strength meter updates instantly as you drag the slider."],
    ["Select character types", "Toggle uppercase, lowercase, numbers, and symbols on or off. For the strongest passwords, keep all four enabled. If the target site does not allow symbols, disable that toggle — the entropy display will update to show your new effective strength."],
    ["Enable exclude ambiguous if needed", "Turn on Exclude Ambiguous Characters when the password will be typed manually or shared in print — it removes look-alike pairs like O/0 and l/1/I. Leave it off when the password goes directly into a password manager via copy-paste."],
    ["Read the strength and entropy display", "Check the strength label (Very Weak through Very Strong), entropy in bits, and the estimated crack-time shown beneath the generated password. Aim for at least Strong (60+ bits). Very Strong (128+ bits) is ideal for master passwords or encryption keys."],
    ["Copy or export your password", "Click the copy icon to place the password in your clipboard for immediate use. For bulk passwords, click Export TXT or Export JSON to download the full batch as a file."],
    ["Use bulk mode for multiple passwords", "Switch to Bulk mode, select 5, 10, 20, or 50 passwords, and the generator creates the entire set at once. This is useful for IT provisioning, developer test credentials, or any workflow that requires multiple unique passwords simultaneously."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Password Generator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>password generator</strong> is a free online tool that creates random, cryptographically
            secure passwords on demand. Unlike passwords you invent yourself — which tend to follow predictable
            patterns like names, dates, or keyboard sequences — a generated password is drawn from the full
            character space using the browser&apos;s built-in <code>crypto.getRandomValues()</code> API, producing
            output that is statistically unpredictable and resistant to every common attack method.
          </p>
          <p>
            The problem with human-chosen passwords is well-documented: most fall within a small predictable
            subset of the theoretical character space. &quot;Password123!&quot; satisfies most site complexity rules
            but appears in every major leaked credential database. Even passwords that feel creative — a
            pet&apos;s name, a birth year, a favourite team — are trivially cracked by modern dictionary attacks
            that combine common words with common substitutions. The only reliable defence is true randomness,
            and that requires a tool.
          </p>
          <p>
            This <strong>password generator</strong> is built for <strong>individuals, developers, IT
            administrators, security professionals, and system administrators</strong> who need strong
            credentials fast. It supports three generation modes — random character, passphrase, and pattern
            — with customisable length up to 128 characters, character-type selection, ambiguous character
            exclusion, bulk generation of up to 50 passwords at once, entropy analysis, crack-time
            estimation, and export as TXT or JSON. Everything runs in your browser — nothing is sent to
            any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Password Generation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every password this tool generates is drawn from a character pool built from your selected
            options, using the browser&apos;s <code>crypto.getRandomValues()</code> — a cryptographically secure
            pseudorandom number generator (CSPRNG) backed by the operating system. The process runs
            entirely in your browser; no random seed, no generated password, and no settings ever leave
            your device.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula — Entropy</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Entropy (bits)</span> = length × log₂(pool_size)</p>
              <p className="text-gray-500 text-xs mt-1">
                pool_size: uppercase (26) + lowercase (26) + numbers (10) + symbols (32) = 94 max
              </p>
              <p className="text-gray-500 text-xs">
                Example: 16-char password, all types enabled → 16 × log₂(94) ≈ 105 bits
              </p>
            </div>
          </div>
          <p>
            The generator also guarantees at least one character from each selected type before filling
            the remaining positions randomly — then shuffles the entire result so required characters
            don&apos;t predictably appear at the start. The three generation modes each use the same CSPRNG
            source: random character mode picks directly from the pool, passphrase mode selects words
            randomly from an embedded word list, and pattern mode maps each template character to its
            corresponding random character type.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Password Generator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span>
                    <strong>{title}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What This Generator Provides
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Cryptographically secure randomness via crypto.getRandomValues()",
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
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "New Account Registration",
              scenario:
                "A user signing up for a new banking account opens the password generator and sets length to 20, all character types enabled. The tool returns 'Xq7@mP2!kLr9#vNs4Yw&' with entropy of 131 bits — rated Very Strong and estimated crack time of millions of years. They paste it directly into the signup form and save it to their password manager. The entire process takes under 10 seconds.",
            },
            {
              title: "IT Administrator — New Employee Onboarding",
              scenario:
                "An IT admin needs to provision 15 temporary passwords for new hires starting Monday. They switch to Bulk mode, set count to 15, length to 12, all character types enabled, and click Export TXT. The downloaded file contains 15 unique strong passwords — one per line — ready to paste into the employee provisioning spreadsheet. Ambiguous characters are excluded so employees can type them if needed before setting their own password.",
            },
            {
              title: "Developer — API Keys and Tokens",
              scenario:
                "A backend developer needs a signing secret for a JWT implementation. They set length to 64, enable uppercase, lowercase, and numbers only (no symbols, to stay alphanumeric-safe), and generate. The result is a 64-character alphanumeric string with 381 bits of entropy — far exceeding NIST recommendations for HMAC signing keys. They copy it into their .env file in under 30 seconds.",
            },
            {
              title: "Password Manager Master Password",
              scenario:
                "A user setting up a new password manager needs a master password they can actually remember. They switch to Passphrase mode, set word count to 5, enable capitalization and include a number, and generate 'Tiger-Marble-Quantum-Harbor-2847'. Entropy: 90 bits, crack time: centuries. They write it on paper, store it in a drawer, and spend two days memorizing it before shredding the paper. The passphrase is easy to type but practically impossible to guess.",
            },
            {
              title: "Security-Constrained System",
              scenario:
                "A corporate system requires passwords to match a specific rule: start with two uppercase letters, followed by four lowercase, two numbers, and one symbol. The developer switches to Pattern mode and enters 'UUllllNNS'. The tool generates 'TRfjkw28!' — matching the required structure precisely, with randomness at every position. The admin generates 20 of these for batch account creation and exports them as JSON.",
            },
            {
              title: "Wi-Fi Pre-Shared Key Setup",
              scenario:
                "A small business owner is configuring a new office router and needs a WPA2 pre-shared key. They set length to 20, all character types enabled, exclude ambiguous characters on (the key will be typed on phones and tablets), and generate 'vH5@KpRw9!NmGz3sTx#2'. The key is strong enough to resist offline dictionary attacks against the WPA2 handshake, and the ambiguous character exclusion means staff can type it without confusion when connecting new devices.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Set your default length to 20 and leave all character types on. Most password managers have no trouble storing a 20-character password and the entropy improvement over 12 characters is dramatic — going from roughly 79 bits to 131 bits, which changes crack time from hours to geological timescales.",
                "Use passphrase mode for any password you will type manually — your computer's login password, your password manager master password, or a full-disk encryption passphrase. Five random words from the generator's word list give you ~90 bits of entropy with something your fingers can actually learn.",
                "If a site rejects your generated password (it sometimes happens with overly restrictive character rules), use Pattern mode to match exactly what the site requires. This keeps the randomness intact while satisfying structural constraints.",
                "Export bulk passwords as JSON if you need to programmatically process them — the JSON format includes the entropy and strength rating alongside each password, saving you from recalculating. Export as TXT for simple human-readable lists.",
                "Regenerate immediately if you accidentally display your password on a screen that others can see. The button takes milliseconds and you lose nothing — use a fresh password that was never seen.",
                "Check the crack time display against your threat model. For most online accounts, 'years' is sufficient. For encryption keys, SSH keys, and master passwords, aim for 'millions of years' or higher.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Common Mistakes to Avoid
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use a generated password without saving it first. Generated passwords are not recoverable — the generator does not store them, and the history panel only keeps the last 10. Copy it into your password manager before closing the tab.",
                "Don't disable symbols just because you find them inconvenient. Removing symbols reduces your pool from 94 to 62 characters, cutting entropy by roughly 15% per character. Over 20 characters this accumulates into a meaningful security downgrade — let your password manager handle typing.",
                "Don't use the same generated password for multiple accounts. Each account should have its own unique password. If one site suffers a data breach and your password is exposed, the damage is contained to that single account rather than cascading across every service you use.",
                "Don't treat 'Strong' as good enough for every context. A 60-bit password rated Strong is sufficient for a forum login but insufficient for a disk encryption key or a password manager master password. Match the strength level to the sensitivity of what you are protecting.",
                "Don't store passwords in browser autofill if you are on a shared computer. Browser-saved passwords are accessible to anyone who opens the browser. Use a dedicated password manager with its own master password instead.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Password Entropy &amp; Strength Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Entropy by Length &amp; Character Set
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Length</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Lowercase only</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">All types (94)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["8 chars",  "~38 bits",  "~53 bits"],
                    ["12 chars", "~56 bits",  "~79 bits"],
                    ["16 chars", "~75 bits",  "~105 bits"],
                    ["20 chars", "~94 bits",  "~131 bits"],
                    ["24 chars", "~113 bits", "~157 bits"],
                    ["32 chars", "~150 bits", "~210 bits"],
                  ].map(([len, lower, all]) => (
                    <tr key={len} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-800">{len}</td>
                      <td className="py-2 px-3 font-mono text-xs text-gray-600">{lower}</td>
                      <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Strength Levels &amp; Crack Time
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Level</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Entropy</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Crack Time*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Very Weak",   "< 28 bits",   "Instant – seconds",     "text-red-500"],
                    ["Weak",        "28–36 bits",  "Minutes – hours",       "text-orange-500"],
                    ["Medium",      "36–60 bits",  "Days – months",         "text-yellow-600"],
                    ["Strong",      "60–128 bits", "Years – centuries",     "text-green-500"],
                    ["Very Strong", "128+ bits",   "Millions of years",     "text-emerald-600"],
                  ].map(([label, entropy, crack, color]) => (
                    <tr key={label} className="hover:bg-gray-50">
                      <td className={`py-2 px-3 font-semibold text-sm ${color}`}>{label}</td>
                      <td className="py-2 px-3 font-mono text-xs text-gray-600">{entropy}</td>
                      <td className="py-2 px-3 text-xs text-gray-600">{crack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Pattern Mode Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Token</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Generates</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Example output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["U", "Random uppercase letter (A–Z)",      "K, T, R"],
                  ["l", "Random lowercase letter (a–z)",      "m, x, p"],
                  ["N", "Random number (0–9)",                "4, 7, 2"],
                  ["S", "Random symbol (!@#$%…)",             "@, !, #"],
                  ["L", "Random letter, any case (A–Z a–z)", "G, d, W"],
                  ["any other", "Kept as-is (literal)",       "-, _, ."],
                ].map(([token, desc, example]) => (
                  <tr key={token} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-mono font-semibold text-primary">{token}</td>
                    <td className="py-2 px-3 text-gray-600 text-xs">{desc}</td>
                    <td className="py-2 px-3 font-mono text-xs text-green-600">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Crack time assumes 1 billion guesses per second (modern GPU brute-force). Actual time varies by attack method, hardware, and whether the hash algorithm used by the target system is fast (MD5) or slow (bcrypt).
          </p>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Password Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🔐",
              title: "Security-Conscious Individuals",
              desc: "Generate unique, strong passwords for every online account — banking, email, social media — and store them in a password manager. A fresh strong password per site means one breach never exposes everything.",
            },
            {
              icon: "💻",
              title: "Developers & Engineers",
              desc: "Create API keys, signing secrets, JWT tokens, database passwords, and test credentials. Pattern mode handles systems with strict composition rules; bulk mode fills entire test environments in seconds.",
            },
            {
              icon: "🖥️",
              title: "IT Administrators",
              desc: "Provision temporary passwords for new employee accounts in bulk, generate service account credentials with specific character rules, and create pre-shared keys for network equipment — then export everything as TXT or JSON.",
            },
            {
              icon: "🔒",
              title: "Security Professionals",
              desc: "Generate test passwords for penetration testing scenarios, create realistic credential datasets for security awareness training, and verify entropy calculations against internal security policy thresholds.",
            },
            {
              icon: "🏠",
              title: "Home Users",
              desc: "Set up strong passwords for home routers, smart home devices, and streaming service accounts. The ambiguous character exclusion feature helps when typing passwords on TV remotes or phone keyboards.",
            },
            {
              icon: "🎓",
              title: "Students & Educators",
              desc: "Learn about password entropy, character pools, and cryptographic randomness through the live entropy display. Educators use the tool to demonstrate concretely why 'Password123!' is weak despite meeting common complexity rules.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
