import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function DuotoneFilterSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <div className="space-y-12">
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">How to Use the Duotone Image Filter</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Upload Your Image</h3>
            <p className="text-gray-700">
              Drag and drop your image into the upload area, or click to select files from your device. Supports PNG, JPEG, GIF, and SVG formats. You can upload multiple images for batch processing.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Choose Your Colors</h3>
            <p className="text-gray-700">
              Select a dark color for shadows and a light color for highlights using the color pickers. Or choose from popular presets like Teal & Orange, Purple & Yellow, or Pink & Blue for instant professional results.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Adjust Settings</h3>
            <p className="text-gray-700">
              Fine-tune the intensity slider to control how strongly the duotone effect is applied. Enable "Invert Gradient" to swap the dark and light color mapping for creative variations.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">4. Preview and Download</h3>
            <p className="text-gray-700">
              Use the before/after slider to compare your original image with the duotone effect. When satisfied, click the Download button to save your transformed image as a PNG file.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">What is a Duotone Effect?</h2>
        <div className="bg-white rounded-xl border shadow-sm p-8">
          <p className="text-gray-700 mb-4">
            A duotone effect is a popular image processing technique that maps all the tones in a photograph to just two colors, creating a striking gradient from dark to light. This artistic filter transforms ordinary photos into modern, eye-catching visuals perfect for branding, social media, and design projects.
          </p>
          <p className="text-gray-700 mb-4">
            The process works by first converting your image to grayscale to determine the brightness values of each pixel. Then, instead of using shades of gray, the tool remaps these values to a gradient between your chosen dark and light colors. Darker areas of the original image receive more of the dark color, while lighter areas receive more of the light color, with smooth transitions in between.
          </p>
          <p className="text-gray-700">
            This technique became widely popular in modern web design and has been used by major brands like Spotify for album artwork. The duotone effect adds visual interest, creates mood, and helps establish a consistent aesthetic across your visual content.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Use Cases for Duotone Images</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">🎨 Graphic Design & Branding</h3>
            <p className="text-gray-700">
              Create cohesive brand visuals by applying your brand colors to photos. Perfect for marketing materials, presentations, and promotional graphics that need to match your color palette.
            </p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">📱 Social Media Content</h3>
            <p className="text-gray-700">
              Stand out on Instagram, Facebook, and Twitter with unique duotone images. The bold color combinations grab attention in crowded feeds and create a memorable visual identity.
            </p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">🌐 Web Design</h3>
            <p className="text-gray-700">
              Enhance website hero images, backgrounds, and banners with duotone effects. The technique adds visual interest while maintaining fast load times and professional aesthetics.
            </p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">🎭 Artistic Photography</h3>
            <p className="text-gray-700">
              Transform portraits and landscapes into artistic pieces. Experiment with complementary colors for dramatic effects or analogous colors for subtle, sophisticated results.
            </p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">📰 Editorial & Publishing</h3>
            <p className="text-gray-700">
              Create striking magazine covers, article headers, and book designs. Duotone effects help establish mood and draw readers into your content.
            </p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold mb-3">🎬 Video Thumbnails</h3>
            <p className="text-gray-700">
              Design eye-catching YouTube thumbnails and video previews. The bold color contrasts help your content stand out in search results and recommended videos.
            </p>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />
    </div>
  );
}
