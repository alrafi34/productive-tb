export default function PalindromeCheckerSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Palindrome Checker Tool
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Choose Your Mode</h3>
            <p className="text-gray-600">
              Select <strong>Single Check</strong> to test one word or phrase, or <strong>Bulk Check</strong> to test multiple items at once (one per line).
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Enter Your Text</h3>
            <p className="text-gray-600">
              Type or paste your text. Try examples like "racecar", "A man a plan a canal Panama", or "Was it a rat I saw".
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Configure Options</h3>
            <p className="text-gray-600">
              Toggle options to ignore case, spaces, punctuation, or numbers. Enable real-time checking for instant results.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Check Results</h3>
            <p className="text-gray-600">
              Click <strong>Check Palindrome</strong> to see if your text reads the same forward and backward.
            </p>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is a Palindrome?
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            A <strong>palindrome</strong> is a word, phrase, number, or sequence that reads the same forward and backward. Examples include "racecar", "madam", and "A man a plan a canal Panama".
          </p>
          <p className="text-gray-600 leading-relaxed">
            Palindromes have fascinated people for centuries and appear in literature, mathematics, and wordplay. Our tool makes it easy to check any text for palindrome properties with advanced options to ignore spaces, punctuation, and case.
          </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🎮 Word Games</h3>
            <p className="text-sm text-gray-700">
              Perfect for Scrabble, crosswords, and word puzzles. Verify palindromes quickly.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Education</h3>
            <p className="text-sm text-gray-700">
              Teachers and students can explore language patterns and vocabulary.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">✍️ Creative Writing</h3>
            <p className="text-sm text-gray-700">
              Writers can create palindromic phrases and add wordplay to their work.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🧠 Brain Training</h3>
            <p className="text-sm text-gray-700">
              Exercise your mind with palindrome challenges and pattern recognition.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How does the palindrome checker work?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The tool cleans your text based on selected options (removing spaces, punctuation, etc.), reverses it, and compares the original with the reversed version. If they match, it's a palindrome.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I check phrases with spaces and punctuation?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! Enable "Ignore Spaces" and "Ignore Punctuation" options to check phrases like "A man a plan a canal Panama" or "Madam, I'm Adam".
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What is bulk check mode?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Bulk check mode lets you test multiple words or phrases at once. Enter one item per line, and the tool will check each one individually.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is my data safe?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Absolutely! All processing happens in your browser. No text is sent to any server, ensuring complete privacy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
