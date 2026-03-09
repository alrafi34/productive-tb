export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Morse Code Translator
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Choose Translation Mode</h3>
            <p>Select whether you want to convert text to Morse code or decode Morse code back to text using the mode toggle.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Enter Your Input</h3>
            <p>Type or paste your text or Morse code into the input area. The tool supports multi-line input and special characters.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Customize Settings (Optional)</h3>
            <p>Click "Show Settings" to customize dot/dash symbols, letter spacing, word separators, and audio playback speed.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Copy, Download, or Play Audio</h3>
            <p>Copy the output to your clipboard, download it as a text file, or play the Morse code as audio beeps to hear how it sounds.</p>
          </div>
        </div>
      </section>

      {/* What is Morse Code */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Morse Code?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Morse code is a method of encoding text characters using sequences of dots (·) and dashes (−) or short and long 
            signals. Developed in the 1830s and 1840s by Samuel Morse and Alfred Vail for use with the telegraph, it became 
            one of the most important communication systems in history.
          </p>
          <p>
            Each letter, number, and punctuation mark is represented by a unique combination of dots and dashes. For example, 
            the letter "A" is represented as "·−" (dot-dash), while "SOS" (the international distress signal) is "··· −−− ···" 
            (three dots, three dashes, three dots).
          </p>
          <p>
            Although modern technology has largely replaced Morse code in commercial communications, it remains popular among 
            amateur radio operators, is still used in aviation and maritime navigation, and serves as an educational tool for 
            learning about communication systems and signal processing.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for Morse Code Translator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Learning and Education</h3>
            <p className="text-gray-600">
              Practice learning Morse code with real-time translation and audio playback. Perfect for students, scouts, and anyone interested in communication history.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Amateur Radio (Ham Radio)</h3>
            <p className="text-gray-600">
              Prepare messages for CW (continuous wave) transmission, practice Morse code skills, and decode received messages.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Emergency Communication</h3>
            <p className="text-gray-600">
              Learn the SOS signal and other emergency codes. Morse code can be transmitted using light, sound, or any on-off signaling method.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Secret Messages and Puzzles</h3>
            <p className="text-gray-600">
              Create encoded messages for games, escape rooms, treasure hunts, or just for fun with friends and family.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Morse code can be used as an alternative input method for people with disabilities, using switches or other assistive devices.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Aviation and Maritime</h3>
            <p className="text-gray-600">
              Understand navigation beacons and distress signals. Morse code is still used in some aviation and maritime applications.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I separate letters and words in Morse code?
            </h3>
            <p className="text-gray-600">
              In standard Morse code, individual dots and dashes within a letter have no space, letters are separated by a 
              single space, and words are separated by three spaces (or seven time units). Our tool uses these conventions 
              by default, but you can customize the spacing in the settings.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I hear what the Morse code sounds like?
            </h3>
            <p className="text-gray-600">
              Yes! When you convert text to Morse code, click the "Play Audio" button to hear the Morse code as audio beeps. 
              You can adjust the playback speed (WPM - words per minute) in the settings to make it faster or slower.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What is WPM (Words Per Minute) in Morse code?
            </h3>
            <p className="text-gray-600">
              WPM is the standard measure of Morse code speed. It's based on the word "PARIS" (50 time units) as the standard. 
              Beginners typically start at 5-10 WPM, while experienced operators can reach 20-30 WPM or higher. Our tool defaults to 20 WPM.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use different symbols for dots and dashes?
            </h3>
            <p className="text-gray-600">
              Absolutely! Click "Show Settings" to choose from different dot symbols (., •, ·) and dash symbols (-, −, —). 
              This is useful for different visual preferences or when copying Morse code to different platforms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
