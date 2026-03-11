export default function WiFiPasswordGeneratorSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About WiFi Password Generator
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The WiFi Password Generator is a specialized tool designed to create secure, router-compatible 
          passwords for wireless networks. Whether you're setting up a home WiFi network, creating a guest 
          network, or securing your business WiFi, this tool generates passwords that are both secure and 
          easy to share. All generation happens locally in your browser using cryptographically secure 
          randomness.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Cryptographically Secure:</strong> Uses crypto.getRandomValues() for true randomness</li>
          <li><strong>Router Compatible:</strong> Validates passwords against WPA2/WPA3 standards</li>
          <li><strong>Memorable Mode:</strong> Generates easy-to-type passwords using pronounceable patterns</li>
          <li><strong>Quick Presets:</strong> Home WiFi, Guest WiFi, and Advanced security presets</li>
          <li><strong>Customizable Length:</strong> 8-32 characters (WPA2 standard: 8-63)</li>
          <li><strong>Character Options:</strong> Uppercase, lowercase, numbers, symbols</li>
          <li><strong>Ambiguous Filter:</strong> Removes confusing characters (O, 0, l, 1, I)</li>
          <li><strong>Strength Meter:</strong> Real-time password strength analysis</li>
          <li><strong>Pattern Generator:</strong> Create passwords from custom patterns</li>
          <li><strong>Bulk Generation:</strong> Generate 5-20 passwords at once</li>
          <li><strong>Favorites System:</strong> Mark and save your preferred passwords</li>
          <li><strong>Export Options:</strong> Download as TXT or JSON files</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Choose a quick preset (Home, Guest, or Advanced) or customize manually</li>
          <li>Adjust password length using the slider (8-32 characters)</li>
          <li>Select character types: uppercase, lowercase, numbers, symbols</li>
          <li>Enable "Memorable" mode for easy-to-type passwords</li>
          <li>Check the strength meter and router compatibility status</li>
          <li>Click "Generate New" or let it auto-generate as you change settings</li>
          <li>Copy your password and use it for your WiFi network</li>
          <li>Optionally generate multiple passwords for comparison</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Quick Presets Explained
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">🏠 Home WiFi</h3>
            <p>12 characters with letters and numbers. Balanced security for home networks. 
            Excludes ambiguous characters for easy sharing with family members.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">👥 Guest WiFi</h3>
            <p>8-10 characters in memorable mode. Easy to type and share with guests. 
            Uses pronounceable patterns like "Miko12-Teru9" for better usability.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">🔐 Advanced</h3>
            <p>16-24 characters with all character types including symbols. Maximum security 
            for sensitive networks or business environments.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Memorable Password Mode
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Memorable mode generates passwords that are easier to type and remember while maintaining 
          security. It uses consonant-vowel patterns to create pronounceable segments:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Pronounceable:</strong> Uses alternating consonants and vowels (e.g., "Miko", "Teru")</li>
          <li><strong>Capitalized:</strong> First letter of each segment is capitalized</li>
          <li><strong>Numbers Added:</strong> Includes numbers for additional security</li>
          <li><strong>Separator:</strong> Uses dash (-) to separate segments</li>
          <li><strong>Example:</strong> Miko12-Teru9, Bela45-Firo3</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          This mode is perfect for guest networks where you need to verbally share the password 
          or for situations where users need to type it on devices without copy-paste functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Router Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The tool automatically validates passwords against common router requirements:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Length:</strong> WPA2 requires 8-63 characters</li>
          <li><strong>Character Set:</strong> ASCII characters only (no special Unicode)</li>
          <li><strong>Forbidden Characters:</strong> Avoids &lt;, &gt;, ', ", \ that may cause issues</li>
          <li><strong>Spaces:</strong> Warns about spaces which some routers don't handle well</li>
          <li><strong>Instant Feedback:</strong> Shows green checkmark or warning messages</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          If you see compatibility warnings, the password may still work but could cause issues 
          with certain router models. Generate a new password to get a fully compatible one.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Understanding WiFi Password Strength
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          WiFi password strength is crucial because wireless networks are vulnerable to offline 
          attacks where attackers can capture encrypted traffic and attempt to crack it:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Very Weak (&lt;28 bits):</strong> Can be cracked in hours</li>
          <li><strong>Weak (28-36 bits):</strong> Can be cracked in days</li>
          <li><strong>Medium (36-50 bits):</strong> Can take weeks to months</li>
          <li><strong>Strong (50-70 bits):</strong> Can take years</li>
          <li><strong>Very Strong (70+ bits):</strong> Practically uncrackable</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          For home WiFi, aim for at least "Strong" (50+ bits). For guest networks, "Medium" 
          is acceptable since you can change it regularly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Pattern-Based Generation
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Create passwords following specific patterns for consistency or requirements:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>L:</strong> Any letter (uppercase or lowercase)</li>
          <li><strong>U:</strong> Uppercase letter only</li>
          <li><strong>N:</strong> Number (0-9)</li>
          <li><strong>S:</strong> Symbol (!@#$%^&*)</li>
          <li><strong>Other characters:</strong> Kept as-is (e.g., dashes, underscores)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          Example patterns: "LLNN-SSLL" → Ab42-@kRt, "UUUUNNNN" → ABCD1234, "LLL-NNN-LLL" → abc-123-xyz
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Best Practices for WiFi Security
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>Use WPA3 if your router supports it, otherwise WPA2</li>
          <li>Create separate networks for guests and IoT devices</li>
          <li>Use at least 12 characters for home WiFi passwords</li>
          <li>Change your WiFi password every 6-12 months</li>
          <li>Don't use personal information in WiFi passwords</li>
          <li>Disable WPS (WiFi Protected Setup) on your router</li>
          <li>Keep your router firmware updated</li>
          <li>Use a strong admin password for your router</li>
          <li>Hide your SSID if you don't need it visible</li>
          <li>Enable MAC address filtering for additional security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Advanced Features
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Multiple Password Generation</h3>
            <p>Generate 5-20 passwords at once to compare options. Each password shows its strength 
            rating, and you can mark favorites for later use.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Favorites System</h3>
            <p>Mark passwords as favorites to save them locally. Perfect for keeping backup passwords 
            or passwords for different networks.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export Functionality</h3>
            <p>Export generated passwords as plain text (.txt) for printing or as JSON for record 
            keeping with metadata like timestamps and strength scores.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Password History</h3>
            <p>Automatically saves your last 10 generated passwords locally. Quick access to recently 
            generated passwords without regenerating.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Security & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your security and privacy are paramount:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>100% Client-Side:</strong> All password generation happens in your browser</li>
          <li><strong>No Server Communication:</strong> Nothing is sent to any server</li>
          <li><strong>Cryptographically Secure:</strong> Uses crypto.getRandomValues() API</li>
          <li><strong>No Tracking:</strong> We don't track what passwords you generate</li>
          <li><strong>Local Storage Only:</strong> History and favorites stored only in your browser</li>
          <li><strong>No Analytics:</strong> No third-party scripts or tracking</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Home WiFi:</strong> Secure your primary home network</li>
          <li><strong>Guest Network:</strong> Create easy-to-share passwords for visitors</li>
          <li><strong>IoT Network:</strong> Separate network for smart home devices</li>
          <li><strong>Small Business:</strong> Secure office WiFi networks</li>
          <li><strong>Rental Properties:</strong> Generate unique passwords for each tenant</li>
          <li><strong>Events:</strong> Temporary WiFi for conferences or gatherings</li>
          <li><strong>Cafes/Restaurants:</strong> Guest WiFi that's easy to share</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common WiFi Security Standards
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900">WPA3 (Recommended)</h3>
            <p className="text-sm">Latest standard with improved security. Requires 8+ character passwords.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">WPA2 (Common)</h3>
            <p className="text-sm">Widely supported standard. Requires 8-63 character passwords. Still secure with strong passwords.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">WPA (Deprecated)</h3>
            <p className="text-sm">Older standard with known vulnerabilities. Avoid if possible.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">WEP (Insecure)</h3>
            <p className="text-sm">Obsolete and easily cracked. Never use WEP for any network.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This WiFi password generator works in all modern browsers including Chrome, Firefox, Safari, 
          Edge, and Opera. The crypto.getRandomValues() API is supported in all browsers released after 
          2013, ensuring wide compatibility and secure password generation.
        </p>
      </section>
    </div>
  );
}
