export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Image to Grayscale Converter
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Adjust Filter Settings</h3>
            <p>Configure intensity, brightness, contrast, and other options before or after uploading. Changes apply in real-time to all images.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Upload Images</h3>
            <p>Drag and drop images or click to select files. You can upload multiple images at once for batch processing.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Compare and Adjust</h3>
            <p>Use the before/after slider to compare original and grayscale versions. Fine-tune settings until you get the perfect result.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Download or Copy</h3>
            <p>Download individual images or all at once. You can also copy images directly to your clipboard for quick use.</p>
          </div>
        </div>
      </section>

      {/* What is Grayscale */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Grayscale Conversion?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Grayscale conversion is the process of transforming a color image into shades of gray, ranging from black to white. 
            This removes all color information while preserving the luminance (brightness) of each pixel, creating a black and 
            white version of the image.
          </p>
          <p>
            The most common method uses the luminosity formula: Gray = 0.299×Red + 0.587×Green + 0.114×Blue. This weighted 
            approach accounts for human perception, where we're more sensitive to green light than red or blue, resulting in 
            more natural-looking grayscale images.
          </p>
          <p>
            Grayscale images are widely used in photography, design, printing, and accessibility. They can reduce file sizes, 
            create artistic effects, improve readability, and help test designs for color-blind users. Many professional 
            photographers convert to grayscale to emphasize composition, texture, and contrast without the distraction of color.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for Grayscale Conversion
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Photography and Art</h3>
            <p className="text-gray-600">
              Create classic black and white photographs, emphasize composition and lighting, or achieve a timeless artistic aesthetic.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Web Design</h3>
            <p className="text-gray-600">
              Prepare images for minimalist designs, reduce visual noise, or create hover effects that transition from grayscale to color.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Print Materials</h3>
            <p className="text-gray-600">
              Optimize images for black and white printing, reduce printing costs, or prepare documents for photocopying.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Accessibility Testing</h3>
            <p className="text-gray-600">
              Test how designs appear to color-blind users, ensure sufficient contrast, and verify readability without color cues.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
            <p className="text-gray-600">
              Create cohesive Instagram feeds, achieve vintage aesthetics, or make images stand out with dramatic black and white effects.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Document Processing</h3>
            <p className="text-gray-600">
              Prepare images for OCR (text recognition), reduce file sizes for archiving, or standardize document appearance.
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
              What's the difference between grayscale and black & white?
            </h3>
            <p className="text-gray-600">
              Grayscale images contain shades of gray between pure black and pure white, typically 256 different levels. 
              True black and white (binary) images contain only two colors: black or white with no gray tones. Grayscale 
              provides much more detail and is what most people mean when they say "black and white photo."
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How does the intensity slider work?
            </h3>
            <p className="text-gray-600">
              The intensity slider controls how much grayscale is applied. At 0%, you see the original color image. At 100%, 
              you get full grayscale. Values in between blend the original colors with the grayscale version, creating a 
              partially desaturated effect that can be useful for subtle artistic effects.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What does the invert option do?
            </h3>
            <p className="text-gray-600">
              The invert option creates a negative image by reversing all gray values. Dark areas become light and light areas 
              become dark. This can create interesting artistic effects or simulate photographic negatives. It's particularly 
              useful for creating high-contrast designs or preparing images for certain printing processes.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Will converting to grayscale reduce file size?
            </h3>
            <p className="text-gray-600">
              Not significantly with PNG format, as the file still stores RGB values (they just happen to be equal). However, 
              grayscale images often compress better and can be saved in true grayscale formats that use less data. The main 
              benefit is visual simplicity rather than file size reduction.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
