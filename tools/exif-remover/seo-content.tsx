export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the EXIF Data Remover
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Configure Options</h3>
            <p>Choose output format (JPEG, PNG, WebP), quality level, and optional resizing. Enable compression if you want smaller file sizes.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Upload Images</h3>
            <p>Drag and drop your images or click to select files. You can process multiple images at once for batch EXIF removal.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Review Results</h3>
            <p>Compare original and cleaned images side by side. Check file size reduction and verify EXIF data has been removed.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Download</h3>
            <p>Download individual clean images or use "Download All" for batch processing. All files are processed locally in your browser.</p>
          </div>
        </div>
      </section>

      {/* What is EXIF Data */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is EXIF Data?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            EXIF (Exchangeable Image File Format) data is metadata embedded in image files, particularly JPEGs. This hidden 
            information includes details about when and how the photo was taken, such as camera model, settings, date/time, 
            and potentially GPS coordinates showing exactly where the photo was captured.
          </p>
          <p>
            While EXIF data can be useful for photographers organizing their work, it poses significant privacy risks when 
            sharing images online. Location data can reveal your home address, workplace, or travel patterns. Device information 
            can be used for fingerprinting and tracking across platforms.
          </p>
          <p>
            Removing EXIF data before sharing photos on social media, websites, or with others is a crucial privacy practice. 
            Our tool strips all metadata while preserving image quality, ensuring your photos are safe to share without 
            compromising your privacy or security.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for EXIF Removal
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Privacy Protection</h3>
            <p className="text-gray-600">
              Remove location data and personal information before sharing photos online to protect your privacy and security.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Social Media Sharing</h3>
            <p className="text-gray-600">
              Clean images before posting to Instagram, Facebook, Twitter, or other platforms to prevent metadata leaks.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Professional Photography</h3>
            <p className="text-gray-600">
              Deliver clean images to clients without revealing camera settings, equipment details, or shooting locations.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Website Publishing</h3>
            <p className="text-gray-600">
              Optimize images for web use by removing unnecessary metadata, reducing file sizes and improving load times.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Marketplace Listings</h3>
            <p className="text-gray-600">
              Remove metadata from product photos before listing on eBay, Etsy, or other marketplaces to protect your location.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Anonymous Sharing</h3>
            <p className="text-gray-600">
              Share images anonymously without revealing device information, timestamps, or other identifying metadata.
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
              Is my data safe when using this tool?
            </h3>
            <p className="text-gray-600">
              Absolutely! All processing happens entirely in your browser using JavaScript and the Canvas API. Your images 
              never leave your device or get uploaded to any server. This ensures complete privacy and security for your photos.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What types of metadata does this tool remove?
            </h3>
            <p className="text-gray-600">
              The tool removes all EXIF data including GPS coordinates, camera make/model, lens information, exposure settings, 
              timestamps, software used, copyright information, and any other metadata embedded in the image file. The output 
              is a clean image with only pixel data.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Will removing EXIF data affect image quality?
            </h3>
            <p className="text-gray-600">
              No, removing EXIF data doesn't affect the visual quality of your image. The pixel data remains unchanged. However, 
              if you enable compression or resizing options, those settings may affect quality. At default settings, the image 
              quality is preserved while only metadata is removed.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I process multiple images at once?
            </h3>
            <p className="text-gray-600">
              Yes! The tool supports batch processing. Simply select or drag multiple images at once, and they'll all be 
              processed simultaneously. You can then download them individually or use the "Download All" button for convenience.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
