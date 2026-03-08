export default function WordCounterSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Word Counter Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Paste or type your text into the text area above</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Watch as the word count updates in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>View detailed statistics including reading time</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              What You Get
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Accurate word count
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Character count (with/without spaces)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Sentence and paragraph count
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Estimated reading time
              </li>
            </ul>
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
              How accurate is this word counter tool?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our word counter tool uses advanced algorithms to provide highly accurate word counts. It properly handles punctuation, hyphenated words, and various text formats to give you precise results for academic papers, blog posts, and professional documents.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use this word counter for academic writing?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! This free word counter tool is perfect for academic writing, essays, research papers, and assignments. It provides accurate word counts that meet academic standards and includes character counting for platforms with strict limits.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How is reading time calculated?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Reading time is calculated based on the average reading speed of 200 words per minute for adults. Our tool analyzes your text and provides realistic reading time estimates for blog posts, articles, and other content.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is my text data secure when using this tool?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Absolutely! This word counter tool processes all text locally in your browser. Your content is never sent to our servers or stored anywhere, ensuring complete privacy and security for your documents and writing.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Does this tool work on mobile devices?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, our word counter tool is fully responsive and works perfectly on smartphones, tablets, and desktop computers. You can count words and characters on any device with a web browser.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What's the difference between character count with and without spaces?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Character count with spaces includes all letters, numbers, punctuation, and spaces. Character count without spaces excludes all whitespace characters. This is useful for platforms like Twitter or SMS that have different character limits.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Word Counter Tool?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Real-time counting as you type with instant results</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Private</h3>
            <p className="text-gray-600 text-sm">All processing happens in your browser - no data sent to servers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Works perfectly on all devices and screen sizes</p>
          </div>
        </div>
      </section>
    </>
  );
}
