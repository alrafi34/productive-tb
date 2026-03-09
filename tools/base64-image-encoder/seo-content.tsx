export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Base64 Image Encoder
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Configure Options</h3>
            <p>Set your desired image dimensions, quality level, and output format. You can resize images and adjust quality to reduce the Base64 string size.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Upload Images</h3>
            <p>Drag and drop images into the upload area or click to select files. You can upload multiple images at once for batch conversion.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: View and Select</h3>
            <p>All uploaded images are converted instantly. Click on any thumbnail to view its Base64 string and preview.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Copy or Download</h3>
            <p>Copy individual Base64 strings to your clipboard or download them as text files. Use "Download All" to get all Base64 strings in one file.</p>
          </div>
        </div>
      </section>

      {/* What is Base64 Image Encoding */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Base64 Image Encoding?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Base64 image encoding is a method of converting binary image data into ASCII text format using Base64 encoding. 
            This allows images to be embedded directly into HTML, CSS, or JSON files as data URIs, eliminating the need for 
            separate image files.
          </p>
          <p>
            A Base64-encoded image starts with a data URI scheme that includes the MIME type and encoding method, followed 
            by the encoded image data. For example: <code className="bg-gray-100 px-2 py-1 rounded">data:image/png;base64,iVBORw0KGgo...</code>
          </p>
          <p>
            While Base64 encoding increases file size by approximately 33% compared to the original binary, it offers 
            significant advantages for web development, including reduced HTTP requests, simplified deployment, and the 
            ability to include images in contexts where binary data isn't supported.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for Base64 Image Encoding
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Inline CSS and HTML</h3>
            <p className="text-gray-600">
              Embed small images like icons, logos, and backgrounds directly in CSS or HTML to reduce HTTP requests and improve page load times.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Email Templates</h3>
            <p className="text-gray-600">
              Include images in HTML emails without relying on external image hosting, ensuring images display even when external content is blocked.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">API Responses</h3>
            <p className="text-gray-600">
              Send images as part of JSON API responses, making it easier to transmit image data without separate file uploads or downloads.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Single-File Applications</h3>
            <p className="text-gray-600">
              Create self-contained HTML files with all assets embedded, perfect for offline documentation, presentations, or portable web apps.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Canvas and WebGL</h3>
            <p className="text-gray-600">
              Load textures and images programmatically in canvas or WebGL applications without additional file requests.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Testing and Prototyping</h3>
            <p className="text-gray-600">
              Quickly prototype designs without setting up image hosting, making it easier to share mockups and test implementations.
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
              Why is the Base64 string larger than the original image?
            </h3>
            <p className="text-gray-600">
              Base64 encoding converts binary data to text, which increases the size by approximately 33%. This is because 
              Base64 uses 4 ASCII characters to represent 3 bytes of binary data. However, the convenience of inline embedding 
              often outweighs the size increase for small images.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Should I use Base64 for all images on my website?
            </h3>
            <p className="text-gray-600">
              No. Base64 is best for small images (under 10KB) like icons, logos, and UI elements. Large images should be 
              served as separate files to take advantage of browser caching, lazy loading, and CDN optimization. Base64 images 
              can't be cached separately and increase HTML/CSS file sizes.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I use a Base64 image in HTML or CSS?
            </h3>
            <p className="text-gray-600">
              In HTML, use it in an img tag: <code className="bg-gray-100 px-2 py-1 rounded">&lt;img src="data:image/png;base64,..."&gt;</code>. 
              In CSS, use it as a background: <code className="bg-gray-100 px-2 py-1 rounded">background-image: url(data:image/png;base64,...);</code>. 
              The entire Base64 string replaces the normal file path.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the difference between PNG, JPEG, and WebP output formats?
            </h3>
            <p className="text-gray-600">
              PNG is lossless and best for graphics with transparency. JPEG is lossy and better for photographs, offering 
              smaller file sizes. WebP provides superior compression for both photos and graphics but has slightly less browser 
              support. Choose based on your image type and browser compatibility requirements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
