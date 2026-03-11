export default function PasswordGeneratorSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About Secure Password Generator
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Secure Password Generator is a powerful, privacy-focused tool that creates strong, random passwords 
          entirely in your browser. Using the cryptographically secure crypto.getRandomValues() API, it generates 
          passwords that are truly random and impossible to predict. Perfect for developers, security professionals, 
          and anyone who values online security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Cryptographically Secure:</strong> Uses crypto.getRandomValues() for true randomness</li>
          <li><strong>Customizable Length:</strong> Generate passwords from 6 to 128 characters</li>
          <li><strong>Character Options:</strong> Choose uppercase, lowercase, numbers, and symbols</li>
          <li><strong>Strength Meter:</strong> Real-time password strength analysis with color-coded indicator</li>
          <li><strong>Entropy Calculator:</strong> Shows password entropy in bits and estimated crack time</li>
          <li><strong>Passphrase Mode:</strong> Generate memorable word-based passphrases</li>
          <li><strong>Pattern Generator:</strong> Create passwords based on custom patterns</li>
          <li><strong>Bulk Generation:</strong> Generate 5, 10, 20, or 50 passwords at once</li>
          <li><strong>Ambiguous Filter:</strong> Exclude confusing characters like O, 0, l, 1, I</li>
          <li><strong>Password History:</strong> Keep track of your last 10 generated passwords</li>
          <li><strong>Export Options:</strong> Download passwords as TXT or JSON files</li>
          <li><strong>100% Private:</strong> All generation happens locally, nothing sent to servers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Choose your generator mode: Random Password, Passphrase, or Pattern</li>
          <li>Adjust the password length using the slider (6-128 characters)</li>
          <li>Select character types: uppercase, lowercase, numbers, symbols</li>
          <li>Optionally enable "Exclude Ambiguous" to remove confusing characters</li>
          <li>Click "Generate New" or let it auto-generate as you change settings</li>
          <li>Check the strength meter and entropy score</li>
          <li>Click the copy button to copy your password</li>
          <li>Generate multiple passwords at once for batch creation</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Generator Modes
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Random Password</h3>
            <p>Generates completely random passwords using selected character types. Best for maximum 
            security. Example: K8@xP!4dZq$L9aT2</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Passphrase</h3>
            <p>Creates memorable passwords using random words separated by dashes, underscores, or spaces. 
            Easier to remember while still secure. Example: Apple-Laser-Tiger-Moon-2024</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Pattern</h3>
            <p>Generates passwords based on a custom pattern you define. Use U for uppercase, l for lowercase, 
            N for numbers, S for symbols. Example: Pattern "UULLNNSS" → Ab42@kRt</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Understanding Password Strength
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Password strength is measured by entropy, which represents the number of possible combinations. 
          Higher entropy means more secure passwords:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Very Weak (&lt;28 bits):</strong> Can be cracked in seconds</li>
          <li><strong>Weak (28-36 bits):</strong> Can be cracked in minutes to hours</li>
          <li><strong>Medium (36-60 bits):</strong> Can be cracked in days to months</li>
          <li><strong>Strong (60-128 bits):</strong> Can take years to centuries</li>
          <li><strong>Very Strong (128+ bits):</strong> Practically uncrackable</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Best Practices for Password Security
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>Use passwords with at least 12-16 characters for important accounts</li>
          <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
          <li>Never reuse passwords across different accounts</li>
          <li>Use a password manager to store your passwords securely</li>
          <li>Enable two-factor authentication (2FA) whenever possible</li>
          <li>Change passwords immediately if you suspect a breach</li>
          <li>Avoid using personal information in passwords</li>
          <li>Don't share passwords via email or messaging apps</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Advanced Features
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Entropy Calculator</h3>
            <p>Shows the mathematical strength of your password in bits. Higher entropy means exponentially 
            more possible combinations, making brute-force attacks impractical.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Crack Time Estimation</h3>
            <p>Estimates how long it would take to crack your password using modern hardware (assuming 
            1 billion guesses per second). Helps you understand real-world security.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Ambiguous Character Filter</h3>
            <p>Removes characters that look similar (O/0, l/1/I) to prevent confusion when typing passwords 
            manually. Useful for passwords that need to be read or typed frequently.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Bulk Generation</h3>
            <p>Generate multiple passwords at once for creating accounts, testing, or distributing to team 
            members. Export as text or JSON for easy integration.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Security & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your security and privacy are our top priorities:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>100% Client-Side:</strong> All password generation happens in your browser</li>
          <li><strong>No Server Communication:</strong> Nothing is sent to any server or database</li>
          <li><strong>Cryptographically Secure:</strong> Uses crypto.getRandomValues() for true randomness</li>
          <li><strong>No Tracking:</strong> We don't track what passwords you generate</li>
          <li><strong>Local Storage Only:</strong> History is stored only in your browser's localStorage</li>
          <li><strong>Open Source Logic:</strong> All generation algorithms are transparent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Personal Accounts:</strong> Create strong passwords for email, social media, banking</li>
          <li><strong>Development:</strong> Generate API keys, tokens, and test credentials</li>
          <li><strong>System Administration:</strong> Create secure passwords for servers and databases</li>
          <li><strong>Team Management:</strong> Generate temporary passwords for new team members</li>
          <li><strong>Security Testing:</strong> Create test passwords for penetration testing</li>
          <li><strong>Password Managers:</strong> Generate master passwords or recovery keys</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use This Generator?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Unlike many password generators that use weak pseudo-random algorithms, this tool uses the 
          cryptographically secure crypto.getRandomValues() API built into modern browsers. This ensures 
          true randomness that cannot be predicted or reproduced. Combined with comprehensive customization 
          options, strength analysis, and complete privacy, it's the perfect tool for anyone serious about 
          password security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This password generator works in all modern browsers including Chrome, Firefox, Safari, Edge, and 
          Opera. The crypto.getRandomValues() API is supported in all browsers released after 2013, ensuring 
          wide compatibility and secure password generation.
        </p>
      </section>
    </div>
  );
}
