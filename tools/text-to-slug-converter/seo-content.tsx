export default function TextToSlugConverterSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Text to Slug Converter
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Enter Your Text</h3>
            <p className="text-gray-600">
              Type or paste your title, headline, or any text you want to convert into a URL-friendly slug.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Configure Options</h3>
            <p className="text-gray-600">
              Choose your preferences: remove stop words, select separator (hyphen, underscore, or dot), set max length, and more.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Generate Slug</h3>
            <p className="text-gray-600">
              Click <strong>Generate Slug</strong> or enable real-time conversion to see instant results as you type.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Copy or Download</h3>
            <p className="text-gray-600">
              Copy the generated slug, full URL, or download as TXT/CSV file for bulk conversions.
            </p>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is a URL Slug?
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            A <strong>URL slug</strong> is the part of a URL that identifies a specific page in a human-readable format. For example, in "https://example.com/blog/how-to-learn-javascript", the slug is "how-to-learn-javascript".
          </p>
          <p className="text-gray-600 leading-relaxed">
            Good slugs are essential for SEO, user experience, and content management. They should be lowercase, use hyphens instead of spaces, and contain only alphanumeric characters. Our tool automatically converts any text into a clean, SEO-friendly slug following best practices.
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
            <h3 className="font-semibold text-gray-900 mb-2">📝 Blog Posts</h3>
            <p className="text-sm text-gray-700">
              Convert article titles into clean, SEO-friendly URLs for your blog or website.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🛍️ E-commerce</h3>
            <p className="text-sm text-gray-700">
              Create product URLs from product names for better search engine visibility.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📚 CMS Systems</h3>
            <p className="text-sm text-gray-700">
              Generate permalinks for WordPress, Drupal, or any content management system.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔍 SEO Optimization</h3>
            <p className="text-sm text-gray-700">
              Create keyword-rich URLs that improve search engine rankings and click-through rates.
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
              What are stop words and should I remove them?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stop words are common words like "a", "the", "of", "to", etc. Removing them creates shorter, more focused slugs. For example, "The Best Tools for Web Development" becomes "best-tools-web-development". This is optional and depends on your preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Which separator should I use?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hyphens (-) are the most common and recommended for SEO. Google treats hyphens as word separators, making your URLs more readable. Underscores (_) and dots (.) are alternatives but less common in modern web development.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How long should my slug be?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Shorter slugs are generally better for SEO and user experience. Aim for 3-5 words or 50-60 characters maximum. Use the max length option to automatically trim slugs to your desired length.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I convert multiple titles at once?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! Switch to Bulk Conversion mode and enter multiple titles (one per line). The tool will convert all of them at once and let you download the results as TXT or CSV files.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
