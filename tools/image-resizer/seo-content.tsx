export default function ImageResizerSEOContent() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Image Resizer</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>Upload Your Images:</strong> Click the upload area or drag and drop JPG, PNG, or WebP images. You can upload multiple images for batch resizing.</li>
        <li><strong>Set Dimensions:</strong> Enter your desired width and height in pixels. Enable "Maintain Aspect Ratio" to automatically adjust proportions.</li>
        <li><strong>Choose Settings:</strong> Select output format (JPEG, PNG, WebP) and adjust quality slider for JPEG/WebP formats.</li>
        <li><strong>Resize &amp; Download:</strong> Click "Resize Image" to process. Preview the result and download individually or all at once.</li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Image Resizer?</h2>
      <p className="text-gray-700 mb-4">
        An image resizer is a tool that changes the dimensions (width and height) of digital images. Our free online image resizer allows you to resize photos to exact pixel dimensions while maintaining quality. Whether you need to resize images for web optimization, social media posts, email attachments, or print projects, this tool handles it all directly in your browser with complete privacy.
      </p>
      <p className="text-gray-700 mb-6">
        Unlike traditional image editors that require software installation, our browser-based image resizer works instantly without uploads to external servers. All image processing happens locally on your device, ensuring your photos remain private and secure. The tool supports batch resizing, making it perfect for processing multiple images simultaneously.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">How does the image resizer work?</h3>
      <p className="text-gray-700 mb-4">
        Our image resizer uses the HTML5 Canvas API to resize images directly in your browser. When you upload an image, it's loaded into a canvas element and redrawn at your specified dimensions. The browser's built-in image smoothing algorithms ensure high-quality results. You can set custom width and height, maintain aspect ratio, choose output format, and control compression quality. The entire process happens client-side, meaning no data leaves your device.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">What image formats are supported?</h3>
      <p className="text-gray-700 mb-4">
        The image resizer supports the most common web image formats: JPEG/JPG, PNG, and WebP. You can upload images in any of these formats and convert between them during the resize process. JPEG is ideal for photographs with many colors, PNG is perfect for images requiring transparency or sharp edges, and WebP offers superior compression with excellent quality. Choose the format that best suits your needs.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">Is my data safe when using this tool?</h3>
      <p className="text-gray-700 mb-4">
        Absolutely! Your images never leave your device. All resizing operations are performed entirely in your browser using JavaScript and the Canvas API. There are no server uploads, no cloud processing, and no data storage. Your photos remain 100% private and secure on your local machine. This makes our tool perfect for resizing sensitive images, personal photos, or confidential documents.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I resize multiple images at once?</h3>
      <p className="text-gray-700 mb-4">
        Yes! Our batch image resizer supports processing multiple images simultaneously. Upload as many images as you need, and they'll all be resized using the same settings. Each image maintains its individual aspect ratio if that option is enabled. After processing, you can download all resized images at once or individually. This feature is perfect for photographers, web developers, and anyone who needs to resize large batches of images efficiently.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">What does "Maintain Aspect Ratio" mean?</h3>
      <p className="text-gray-700 mb-4">
        Maintaining aspect ratio means keeping the original proportions of your image when resizing. When enabled, changing the width automatically adjusts the height (or vice versa) to prevent distortion. For example, if your original image is 2000×1000 pixels (2:1 ratio) and you set the width to 1000px with aspect ratio locked, the height automatically becomes 500px to maintain the 2:1 proportion. This prevents your images from appearing stretched or squashed.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I choose the right dimensions for my images?</h3>
      <p className="text-gray-700 mb-4">
        The right dimensions depend on your use case. For social media, use our presets: Instagram posts work best at 1080×1080px, Facebook posts at 1200×630px. For websites, consider 1920×1080px for hero images or 800×600px for content images. Email attachments should be smaller (600×400px) to reduce file size. Profile pictures typically need 256×256px or 512×512px. Our preset buttons provide quick access to common sizes, or enter custom dimensions for specific requirements.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>Web Optimization:</strong> Resize large images to appropriate dimensions for faster website loading times and better performance.</li>
        <li><strong>Social Media:</strong> Prepare images for Instagram, Facebook, Twitter, LinkedIn with platform-specific dimensions.</li>
        <li><strong>Email Attachments:</strong> Reduce image dimensions to create smaller files that are easier to send via email.</li>
        <li><strong>E-commerce:</strong> Create consistent product image sizes for online stores and marketplaces.</li>
        <li><strong>Profile Pictures:</strong> Resize photos to meet size requirements for various platforms and applications.</li>
        <li><strong>Print Projects:</strong> Adjust image dimensions to match specific print sizes and aspect ratios.</li>
        <li><strong>Thumbnails:</strong> Generate small preview images for galleries, portfolios, and content management systems.</li>
        <li><strong>Mobile Apps:</strong> Prepare images at various sizes for different screen resolutions and device types.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Using Our Image Resizer</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>100% Free:</strong> No subscriptions, no hidden fees, no watermarks. Resize unlimited images completely free.</li>
        <li><strong>No Installation Required:</strong> Works directly in your browser without downloading software or plugins.</li>
        <li><strong>Complete Privacy:</strong> All processing happens locally on your device. Your images never touch our servers.</li>
        <li><strong>Batch Processing:</strong> Resize multiple images simultaneously with the same settings for maximum efficiency.</li>
        <li><strong>High Quality:</strong> Advanced smoothing algorithms ensure your resized images maintain excellent quality.</li>
        <li><strong>Format Conversion:</strong> Convert between JPEG, PNG, and WebP formats while resizing.</li>
        <li><strong>Instant Results:</strong> No waiting for uploads or processing queues. Get resized images immediately.</li>
        <li><strong>Mobile Friendly:</strong> Works perfectly on smartphones and tablets, not just desktop computers.</li>
      </ul>
    </div>
  );
}
