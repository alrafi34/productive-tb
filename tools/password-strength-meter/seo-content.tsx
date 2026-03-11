import React from 'react';

export default function PasswordStrengthMeterSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is a Password Strength Meter?
        </h2>
        <p className="leading-relaxed">
          A password strength meter is a security tool that evaluates the robustness of passwords based on multiple factors 
          including length, character diversity, and entropy. Our tool provides real-time analysis with crack time estimation, 
          helping you create stronger, more secure passwords for your accounts.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How Password Strength is Calculated
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">1. Character Pool Size</h3>
            <p className="text-sm">
              The tool first determines which character types are used in your password:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>Lowercase letters (a-z): 26 characters</li>
              <li>Uppercase letters (A-Z): 26 characters</li>
              <li>Numbers (0-9): 10 characters</li>
              <li>Symbols (!@#$%...): 32 characters</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">2. Entropy Calculation</h3>
            <p className="text-sm mb-2">
              Entropy measures password randomness using the formula:
            </p>
            <div className="p-3 bg-white rounded font-mono text-sm border border-slate-200">
              Entropy = log₂(pool_size^length)
            </div>
            <p className="text-sm mt-2">
              Higher entropy means more possible combinations, making the password harder to crack.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">3. Crack Time Estimation</h3>
            <p className="text-sm">
              We estimate how long it would take to crack your password using a modern GPU capable of 
              10 billion guesses per second. This gives you a realistic understanding of password security.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">4. Strength Score</h3>
            <p className="text-sm">
              Based on entropy and length, passwords are scored from 0-4:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li><strong className="text-red-600">Very Weak (0):</strong> &lt;28 bits entropy or &lt;6 characters</li>
              <li><strong className="text-orange-600">Weak (1):</strong> 28-35 bits entropy or 6-7 characters</li>
              <li><strong className="text-yellow-600">Medium (2):</strong> 36-59 bits entropy or 8-9 characters</li>
              <li><strong className="text-lime-600">Strong (3):</strong> 60-79 bits entropy or 10-11 characters</li>
              <li><strong className="text-green-600">Very Strong (4):</strong> 80+ bits entropy or 12+ characters</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⚡ Real-Time Analysis</h3>
            <p className="text-sm">Instant feedback as you type with zero lag.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📊 Entropy Calculation</h3>
            <p className="text-sm">Precise entropy measurement in bits.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⏱️ Crack Time Estimation</h3>
            <p className="text-sm">Realistic time-to-crack estimates.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💡 Smart Suggestions</h3>
            <p className="text-sm">Actionable tips to improve password strength.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🔄 Password Comparison</h3>
            <p className="text-sm">Compare up to 5 passwords side-by-side.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💾 History & Export</h3>
            <p className="text-sm">Save analyses and export as TXT or JSON.</p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How to Use
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Single Password Analysis</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Type or paste your password in the input field</li>
              <li>View real-time strength analysis with color-coded bar</li>
              <li>Check entropy score and estimated crack time</li>
              <li>Review character type usage (uppercase, lowercase, numbers, symbols)</li>
              <li>Read suggestions for improving password strength</li>
              <li>Save analysis to history or export results</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Password Comparison</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Compare Passwords" mode</li>
              <li>Enter multiple passwords (up to 5)</li>
              <li>Label each password for easy identification</li>
              <li>View side-by-side strength comparison</li>
              <li>Check comparison summary table</li>
              <li>Export comparison results as TXT or JSON</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Password Strength Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Password Strength Guidelines
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✅ Do This</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
              <li>Use at least 12 characters (16+ recommended)</li>
              <li>Mix uppercase, lowercase, numbers, and symbols</li>
              <li>Use unique passwords for each account</li>
              <li>Consider using passphrases (e.g., "Coffee-Mountain-Purple-42!")</li>
              <li>Use a password manager to store complex passwords</li>
              <li>Enable two-factor authentication (2FA) when available</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">❌ Avoid This</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
              <li>Don't use common words or phrases (password, admin, welcome)</li>
              <li>Avoid personal information (birthdays, names, addresses)</li>
              <li>Don't use keyboard patterns (qwerty, asdfgh, 123456)</li>
              <li>Avoid repeated characters (aaa, 111, !!!) </li>
              <li>Don't use sequential patterns (abc, 123, xyz)</li>
              <li>Never reuse passwords across multiple accounts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Entropy Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Understanding Entropy
        </h2>
        <p className="leading-relaxed">
          Entropy is a measure of password randomness and unpredictability. Higher entropy means more possible 
          combinations, making brute-force attacks exponentially harder.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 border-b border-slate-200">Entropy (bits)</th>
                <th className="text-left p-3 border-b border-slate-200">Strength</th>
                <th className="text-left p-3 border-b border-slate-200">Example</th>
                <th className="text-left p-3 border-b border-slate-200">Crack Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3">&lt; 28 bits</td>
                <td className="p-3"><span className="text-red-600 font-semibold">Very Weak</span></td>
                <td className="p-3 font-mono">pass123</td>
                <td className="p-3">Instant</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">28-35 bits</td>
                <td className="p-3"><span className="text-orange-600 font-semibold">Weak</span></td>
                <td className="p-3 font-mono">Password1</td>
                <td className="p-3">Minutes</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">36-59 bits</td>
                <td className="p-3"><span className="text-yellow-600 font-semibold">Medium</span></td>
                <td className="p-3 font-mono">Pass@word123</td>
                <td className="p-3">Days to months</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3">60-79 bits</td>
                <td className="p-3"><span className="text-lime-600 font-semibold">Strong</span></td>
                <td className="p-3 font-mono">MyP@ssw0rd!2024</td>
                <td className="p-3">Years to centuries</td>
              </tr>
              <tr>
                <td className="p-3">80+ bits</td>
                <td className="p-3"><span className="text-green-600 font-semibold">Very Strong</span></td>
                <td className="p-3 font-mono">Tr0pic@l-M0unt@in-42!</td>
                <td className="p-3">Millennia+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Common Use Cases
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔐 Account Security Audit</h3>
            <p className="text-sm text-blue-800">
              Test your existing passwords to identify weak ones that need updating.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🆕 New Password Creation</h3>
            <p className="text-sm text-purple-800">
              Evaluate new passwords before using them to ensure they meet security standards.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">👥 Team Password Policy</h3>
            <p className="text-sm text-green-800">
              Establish minimum password requirements for your organization based on entropy scores.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">📚 Security Education</h3>
            <p className="text-sm text-orange-800">
              Teach users about password security by showing real-time strength analysis.
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">🔄 Password Comparison</h3>
            <p className="text-sm text-pink-800">
              Compare multiple password options to choose the strongest one for critical accounts.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Is it safe to enter my password here?</h3>
            <p className="text-sm">
              Yes! All analysis happens locally in your browser. No passwords are sent to any server or stored anywhere 
              except your device's localStorage (if you choose to save history).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What makes a password strong?</h3>
            <p className="text-sm">
              A strong password has high entropy (80+ bits), uses all character types (uppercase, lowercase, numbers, symbols), 
              is at least 12 characters long, and avoids common patterns or words.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How accurate is the crack time estimation?</h3>
            <p className="text-sm">
              Our estimates assume a modern GPU capable of 10 billion guesses per second in an offline attack. Real-world 
              crack times vary based on attack method, hardware, and security measures like rate limiting.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Should I use a password manager?</h3>
            <p className="text-sm">
              Absolutely! Password managers generate and store complex, unique passwords for each account, making them 
              much more secure than reusing simple passwords.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What's the difference between entropy and strength?</h3>
            <p className="text-sm">
              Entropy is a mathematical measure of randomness (in bits), while strength is a user-friendly rating 
              (Very Weak to Very Strong) based on entropy, length, and character diversity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I export my password analysis?</h3>
            <p className="text-sm">
              Yes! You can export individual analyses or comparison results as TXT or JSON files for documentation or 
              security audits.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Password Security Best Practices
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">1.</span>
            <p><strong>Length matters most:</strong> A 16-character password with mixed case is stronger than an 8-character password with all character types.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">2.</span>
            <p><strong>Use passphrases:</strong> Combine random words with numbers and symbols (e.g., "Coffee-Mountain-Purple-42!").</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">3.</span>
            <p><strong>Unique passwords:</strong> Never reuse passwords across different accounts or services.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">4.</span>
            <p><strong>Enable 2FA:</strong> Two-factor authentication adds an extra security layer beyond passwords.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">5.</span>
            <p><strong>Regular updates:</strong> Change passwords periodically, especially for critical accounts.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">6.</span>
            <p><strong>Password manager:</strong> Use a reputable password manager to generate and store complex passwords.</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          This password strength meter is a free, privacy-focused tool designed to help you create stronger passwords. 
          All analysis is performed locally in your browser with no server communication.
        </p>
      </section>
    </div>
  );
}
