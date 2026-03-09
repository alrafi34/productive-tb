export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Dithering Image Filter
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Choose Algorithm</h3>
            <p>Select from Floyd-Steinberg, Atkinson, or Jarvis-Judice-Ninke dithering algorithms. Each creates a unique retro effect.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Adjust Settings</h3>
            <p>Fine-tune threshold for black/white balance, pixel size for blockiness, and enable invert for negative effects.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Upload Images</h3>
            <p>Drag and drop your images or click to select files. Process multiple images at once for batch dithering.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Compare and Download</h3>
            <p>Use the before/after slider to compare results. Download individual images or all at once.</p>
          </div>
        </div>
      </section>

      {/* What is Dithering */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Image Dithering?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Image dithering is a technique used to create the illusion of color depth in images with a limited color palette. 
            By strategically placing black and white pixels in patterns, dithering creates the appearance of gray tones and 
            textures, even though only two colors are used.
          </p>
          <p>
            Classic dithering algorithms like Floyd-Steinberg distribute quantization errors to neighboring pixels, creating 
            organic, natural-looking patterns. Atkinson dithering, developed for early Macintosh computers, produces lighter, 
            more artistic results. Jarvis-Judice-Ninke spreads errors more widely for smoother gradients.
          </p>
          <p>
            Originally developed for early computer displays and printers with limited color capabilities, dithering has become 
            a popular artistic effect. It's widely used in pixel art, retro game aesthetics, vintage photography effects, and 
            modern design that embraces nostalgic, lo-fi visual styles.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for Dithering Filter
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Retro Design</h3>
            <p className="text-gray-600">
              Create vintage, 1980s-style graphics for posters, album covers, or nostalgic design projects with authentic retro aesthetics.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Pixel Art</h3>
            <p className="text-gray-600">
              Generate pixel art effects for game development, indie game graphics, or artistic projects requiring low-resolution aesthetics.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
            <p className="text-gray-600">
              Stand out on Instagram, Twitter, or TikTok with unique dithered images that catch attention in crowded feeds.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Print Design</h3>
            <p className="text-gray-600">
              Optimize images for newspaper printing, zines, or screen printing where limited color palettes are required.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Web Design</h3>
            <p className="text-gray-600">
              Create distinctive website headers, backgrounds, or hero images with retro computer-era visual effects.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Artistic Expression</h3>
            <p className="text-gray-600">
              Experiment with different dithering algorithms to create unique artistic interpretations of photographs and digital art.
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
              What's the difference between the dithering algorithms?
            </h3>
            <p className="text-gray-600">
              Floyd-Steinberg is the most common, producing natural-looking results with good detail preservation. Atkinson 
              creates lighter, more artistic effects with distinctive patterns, popular in early Mac graphics. Jarvis-Judice-Ninke 
              distributes errors more widely, creating smoother gradients but requiring more processing.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How does the threshold setting work?
            </h3>
            <p className="text-gray-600">
              The threshold determines the cutoff point between black and white pixels. Lower values (0-127) produce darker 
              images with more black pixels, while higher values (128-255) create lighter images with more white pixels. 
              The default of 128 provides balanced results for most images.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What does the pixel size setting do?
            </h3>
            <p className="text-gray-600">
              Pixel size controls the blockiness of the final image. A value of 1 produces sharp, detailed dithering. Higher 
              values (2-10) create increasingly pixelated effects, perfect for retro game aesthetics or extreme lo-fi looks. 
              Combine with dithering for authentic 8-bit or 16-bit era graphics.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use dithered images commercially?
            </h3>
            <p className="text-gray-600">
              Yes! The dithering process is a technical transformation that doesn't add copyrightable elements. However, you 
              must have rights to the original image. If you own or have permission to use the source image, you can freely 
              use the dithered version in commercial projects.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
