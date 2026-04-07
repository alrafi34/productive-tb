export default function VideoFrameExtractorSEOContent() {
  return (
    <div className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Extract High-Quality Frames from Videos Online
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Upload Video:</strong> Select any video file (MP4, WebM, OGG, MOV) from your device.
              </p>
              <p>
                <strong>2. Navigate Timeline:</strong> Use the timeline scrubber to find the exact moment you want to capture.
              </p>
              <p>
                <strong>3. Extract Frame:</strong> Click the extract button to capture the current frame as a high-quality PNG image.
              </p>
              <p>
                <strong>4. Download or Copy:</strong> Save the frame to your device or copy it to your clipboard.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Support for multiple video formats (MP4, WebM, OGG, MOV)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Frame-by-frame navigation with keyboard shortcuts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>High-quality PNG output in original resolution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Instant download or clipboard copy functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>100% browser-based - no uploads to servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Works with large video files smoothly</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Perfect For</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎥</div>
              <div className="font-medium text-gray-800">Content Creators</div>
              <div className="text-sm text-gray-600">Extract thumbnails from videos</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium text-gray-800">Social Media</div>
              <div className="text-sm text-gray-600">Create preview images for posts</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium text-gray-800">Designers</div>
              <div className="text-sm text-gray-600">Capture specific moments</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-medium text-gray-800">Educators</div>
              <div className="text-sm text-gray-600">Extract slides from lectures</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Use Our Video Frame Extractor?</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700">
              Our video frame extractor eliminates the need for heavy video editing software when you just need 
              a quick screenshot from a video. Built entirely for the browser using HTML5 Video and Canvas APIs, 
              it processes everything locally on your device for maximum privacy and speed.
            </p>
            <p className="text-gray-700">
              Whether you're a YouTuber needing thumbnails, a social media manager creating preview images, 
              or an educator capturing slides from lecture videos, this tool provides instant, high-quality 
              frame extraction without any software installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}