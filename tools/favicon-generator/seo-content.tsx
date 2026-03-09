export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Favicon Generator
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Select Favicon Sizes</h3>
            <p>Choose from standard sizes (16×16, 32×32, 48×48, etc.) or add custom sizes. You can generate multiple sizes at once.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Configure Options</h3>
            <p>Set background color, padding, and aspect ratio options to customize how your favicon will look.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Upload Your Image</h3>
            <p>Drag and drop your logo or image, or click to select a file. The tool will instantly generate all selected favicon sizes.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Download and Use</h3>
            <p>Preview all generated favicons with zoom controls, download individual sizes or all at once, and copy the HTML code snippet for your website.</p>
          </div>
        </div>
      </section>

      {/* What is a Favicon */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is a Favicon?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            A favicon (short for "favorite icon") is a small icon that represents a website. It appears in browser tabs, 
            bookmarks, address bars, and browser history. Favicons help users quickly identify and navigate between multiple 
            open tabs and make your website look more professional and recognizable.
          </p>
          <p>
            Modern websites typically use multiple favicon sizes to ensure optimal display across different devices and 
            contexts. The most common sizes are 16×16 pixels (browser tabs), 32×32 pixels (taskbar shortcuts), and larger 
            sizes like 180×180 or 192×192 for mobile devices and app icons.
          </p>
          <p>
            Favicons are usually placed in the root directory of a website and referenced in the HTML head section using 
            link tags. They can be in PNG, ICO, or SVG format, with PNG being the most widely supported modern format.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for Favicon Generator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Website Branding</h3>
            <p className="text-gray-600">
              Create professional favicons from your company logo to strengthen brand identity and make your site easily recognizable in browser tabs.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Web Development</h3>
            <p className="text-gray-600">
              Quickly generate all required favicon sizes for new web projects, ensuring compatibility across all browsers and devices.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Progressive Web Apps</h3>
            <p className="text-gray-600">
              Generate multiple icon sizes needed for PWA manifests, including 192×192 and 512×512 for Android home screen icons.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Client Projects</h3>
            <p className="text-gray-600">
              Deliver complete favicon packages to clients with all necessary sizes and HTML code snippets for easy implementation.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Rebranding</h3>
            <p className="text-gray-600">
              Update website favicons when rebranding or refreshing your visual identity, ensuring consistency across all touchpoints.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Testing and Prototyping</h3>
            <p className="text-gray-600">
              Quickly test different logo variations as favicons to see how they look at small sizes before finalizing your design.
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
              What sizes should I generate for my favicon?
            </h3>
            <p className="text-gray-600">
              At minimum, generate 16×16 and 32×32 for browser tabs and bookmarks. For comprehensive coverage, also include 
              48×48, 64×64, and 128×128. If you're building a PWA or want mobile support, add 192×192 and 512×512. Our tool 
              makes it easy to generate all sizes at once.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Should I use a transparent or colored background?
            </h3>
            <p className="text-gray-600">
              It depends on your design. Transparent backgrounds work well for simple logos and adapt to different browser 
              themes. Colored backgrounds can provide better contrast and ensure your icon is always visible. Test both options 
              to see what works best for your brand.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the difference between PNG and ICO formats?
            </h3>
            <p className="text-gray-600">
              PNG is a modern, widely-supported format that's easier to work with and provides better quality. ICO is the 
              traditional favicon format that can contain multiple sizes in one file. Modern browsers support PNG favicons, 
              so PNG is generally recommended unless you need to support very old browsers.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I add the generated favicons to my website?
            </h3>
            <p className="text-gray-600">
              Upload the generated PNG files to your website's root directory or an /images folder. Then copy the HTML code 
              snippet provided by the tool and paste it into the &lt;head&gt; section of your HTML. The browser will 
              automatically select the appropriate size for each context.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
