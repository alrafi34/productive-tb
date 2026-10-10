import { toolConfig } from "./config";

export default function ImageCompressorSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Image Compressor Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              {toolConfig.seo.howToSteps.map(({ text }, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">{i + 1}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Compress JPG, PNG, WebP, HEIC, GIF and BMP images
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Real PNG compression that keeps transparency
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Compress to a target size such as 100 KB
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Convert to JPG, PNG or WebP and resize by % or max size
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Private
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Download as ZIP for bulk export
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What is an Image Compressor?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          An image compressor is a free online tool that reduces the file size of JPG, PNG, WebP and HEIC images while keeping them looking the same. This powerful tool helps web developers, photographers, and content creators optimize images for faster website loading, reduced storage costs, and improved user experience.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We do not collect or store your files. Whether you need to compress images for web optimization, email attachments, or social media, this tool provides instant results with customizable quality settings.
        </p>
      </section>

      {/* Target size Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Compress an Image to 20 KB, 50 KB, 100 KB or Any Size
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Upload forms often reject photos above a set size. Enter the limit in the Target file size box and the tool picks the highest quality that fits, so you never have to guess a quality setting.
        </p>
        <ul className="space-y-2 text-gray-600">
          <li><strong className="text-gray-800">20 KB:</strong> signatures and small ID photos on application forms</li>
          <li><strong className="text-gray-800">50 KB:</strong> profile pictures, avatars and passport-style photos for online forms</li>
          <li><strong className="text-gray-800">100 KB:</strong> job portals, visa and university applications, and fast-loading website images</li>
          <li><strong className="text-gray-800">200–500 KB:</strong> email attachments, blog posts and product photos for Shopify or WordPress</li>
          <li><strong className="text-gray-800">1 MB:</strong> high-quality photos for sites with a 1 MB upload limit</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {toolConfig.seo.faq.map(({ q, a }) => (
            <div key={q}>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Who Uses Image Compressors?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">💻</span>
              Web Developers
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Optimize website images for faster page loading, improved Core Web Vitals scores, and better SEO rankings.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">📸</span>
              Photographers
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Reduce photo file sizes for online portfolios, client galleries, and social media sharing without quality loss.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">🛒</span>
              E-commerce Stores
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Compress product images to improve website speed, reduce bandwidth costs, and enhance customer experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">📱</span>
              Social Media Managers
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Optimize images for Instagram, Facebook, Twitter, and LinkedIn to meet platform requirements and upload faster.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Image Compressor?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Instant compression with no wait time</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Private</h3>
            <p className="text-gray-600 text-sm">Your inputs are not collected or stored</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Precise Control</h3>
            <p className="text-gray-600 text-sm">Quality, target size, format and resize</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-semibold text-gray-800 mb-2">Batch Processing</h3>
            <p className="text-gray-600 text-sm">Compress multiple images simultaneously</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="font-semibold text-gray-800 mb-2">ZIP Download</h3>
            <p className="text-gray-600 text-sm">Download all compressed images at once</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Works on all devices and screen sizes</p>
          </div>
        </div>
      </section>
    </>
  );
}
