import ToolFaq from "@/components/ToolFaq";
import { aspectRatioCalculatorConfig } from "./config";

/* Sizes per ratio, from the formats people most often look up. Each one is
   a link (?w=&h=) that loads it into the calculator above. */
const SIZE_CHART: { ratio: string; use: string; sizes: [number, number][] }[] = [
  { ratio: "16:9", use: "HD and 4K video, YouTube, most monitors and TVs", sizes: [[1280, 720], [1920, 1080], [2560, 1440], [3840, 2160]] },
  { ratio: "9:16", use: "Stories, Reels, TikTok, YouTube Shorts", sizes: [[720, 1280], [1080, 1920]] },
  { ratio: "4:3", use: "Classic slides, iPad, older TVs", sizes: [[1024, 768], [1440, 1080], [1600, 1200], [2048, 1536]] },
  { ratio: "3:2", use: "DSLR and mirrorless photos, 6×4 in prints", sizes: [[1200, 800], [3000, 2000], [6000, 4000]] },
  { ratio: "1:1", use: "Square social posts and profile images", sizes: [[1080, 1080], [2048, 2048]] },
  { ratio: "4:5", use: "Portrait posts on Instagram and Facebook", sizes: [[1080, 1350]] },
  { ratio: "2:3", use: "Pinterest pins, portrait prints and posters", sizes: [[1000, 1500]] },
  { ratio: "≈21:9", use: "Ultrawide monitors and cinema-style video", sizes: [[2560, 1080], [3440, 1440], [5120, 2160]] },
];

export default function AspectRatioCalculatorSEOContent({ onPick }: { onPick?: (w: number, h: number) => void }) {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = aspectRatioCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: "Inter, sans-serif" }}>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Free Aspect Ratio Calculator for Images, Video, and Responsive Design
        </h2>
        <p className="leading-relaxed">
          This free Aspect Ratio Calculator helps you calculate width and height instantly while keeping perfect proportions.
          Whether you need a 16:9 calculator for YouTube, a 1:1 ratio for social posts, or a 9:16 size for short-form video,
          this tool gives you accurate results in seconds. You can enter any two values and calculate the third, simplify
          ratios like 1920:1080 to 16:9, and generate CSS for responsive layouts.
        </p>
        <p className="leading-relaxed">
          If you searched for terms like image aspect ratio calculator, resolution calculator, video size calculator, or
          aspect ratio converter, this page is built for that exact workflow. It combines calculator accuracy, visual
          preview, image ratio detection, and CSS code generation in one place.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Why Aspect Ratio Matters
        </h2>
        <p className="leading-relaxed">
          Aspect ratio is the proportional relationship between width and height. When ratio is preserved, your visuals stay
          natural and undistorted. When ratio is broken, people notice stretched faces, squashed graphics, blurry upscales,
          and layout jumps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">For Designers</h3>
            <p className="text-sm">
              Keep posters, banners, thumbnails, and social creatives consistent across multiple platforms.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">For Video Editors</h3>
            <p className="text-sm">
              Prepare exports for widescreen, vertical video, cinematic cuts, and ad placements without distortion.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">For Developers</h3>
            <p className="text-sm">
              Prevent layout shift and generate clean responsive containers with modern CSS `aspect-ratio`.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">For Social Teams</h3>
            <p className="text-sm">
              Match feed, story, reel, and short dimensions quickly for better platform-native presentation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Why This Tool Is Better Than Typical Aspect Ratio Tools
        </h2>
        <p className="leading-relaxed">
          Many online aspect ratio calculators only solve one step. This tool is built as a full workflow so you can go
          from idea to final size faster, with fewer mistakes.
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">1. All-in-One Workflow</h3>
            <p className="text-sm">
              Calculate dimensions, detect image ratio, convert resolutions, simulate resizing, and copy CSS from one page.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">2. Fast and Accurate Real-Time Results</h3>
            <p className="text-sm">
              Instant calculations update as you type, reducing trial-and-error and manual spreadsheet work.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">3. Built for Practical Output</h3>
            <p className="text-sm">
              You do not just get a number. You get a visual preview, simplified ratio, and implementation-ready CSS.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">4. Privacy-First and Browser-Based</h3>
            <p className="text-sm">
              Calculations happen directly in your browser. No account setup, no unnecessary uploads to a server.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">5. Useful for Both Beginners and Pros</h3>
            <p className="text-sm">
              Presets and guided UI help new users, while detailed controls and export options support advanced workflows.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">6. Truly Free Utility</h3>
            <p className="text-sm">
              No feature lock for core functionality. You can calculate, convert, and copy outputs without paywall friction.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Aspect Ratio Formula
        </h2>
        <p className="leading-relaxed">
          Aspect ratio is written as width:height, for example 16:9 or 4:3.
        </p>
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-2">Core Equations</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>Height = (Width x Ratio Height) / Ratio Width</div>
            <div>Width = (Height x Ratio Width) / Ratio Height</div>
          </div>
          <p className="text-sm mt-3">
            Example with 16:9 ratio and width 2560:
            <br />
            Height = (2560 x 9) / 16 = 1440
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Common Aspect Ratios and Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">16:9</h3>
            <p className="text-sm">Standard widescreen ratio for YouTube, TV, presentations, and most modern video.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">1:1</h3>
            <p className="text-sm">Square format for social feed posts, profile images, and product thumbnails.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">9:16</h3>
            <p className="text-sm">Vertical format for short videos, stories, reels, and mobile-first content.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">4:5</h3>
            <p className="text-sm">Popular portrait format for social platforms where vertical space improves visibility.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">3:2</h3>
            <p className="text-sm">Classic photography ratio used in many cameras and print compositions.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">21:9</h3>
            <p className="text-sm">Cinematic ultrawide format often used in film, trailers, and large desktop displays.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Common Aspect Ratios and Resolutions
        </h2>
        <p className="leading-relaxed">
          Click any size to load it into the calculator. Platform requirements change, so check the current specs
          before publishing; these are widely used production sizes.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-800">
              <tr>
                <th className="text-left p-3 border-b border-slate-200">Ratio</th>
                <th className="text-left p-3 border-b border-slate-200">Sizes (px)</th>
                <th className="text-left p-3 border-b border-slate-200">Typical use</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map(({ ratio, use, sizes }) => (
                <tr key={ratio} className="border-b border-slate-200 align-top">
                  <td className="p-3 font-semibold whitespace-nowrap">{ratio}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {sizes.map(([w, h]) => (
                        <a
                          key={`${w}x${h}`}
                          href={`?w=${w}&h=${h}`}
                          rel="nofollow"
                          onClick={(e) => {
                            if (!onPick || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                            e.preventDefault();
                            onPick(w, h);
                            window.history.replaceState(window.history.state, "", `?w=${w}&h=${h}`);
                          }}
                          className="font-mono text-[#058554] hover:underline whitespace-nowrap"
                        >
                          {w}×{h}
                        </a>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          How to Use This Aspect Ratio Calculator
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Basic Calculator Workflow</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {howToSteps.map(({ text }) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Resolution Converter Workflow</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Open the converter tab and enter original dimensions.</li>
              <li>Set a target ratio, such as 4:3, 1:1, or 9:16.</li>
              <li>Run conversion to view the closest proportional output.</li>
              <li>Apply the new dimensions in editing software or code.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Image Detection Workflow</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Upload an image file from your device.</li>
              <li>Let the tool detect pixel dimensions and simplified ratio.</li>
              <li>Push detected values back into the calculator for resizing.</li>
              <li>Generate production-ready dimensions without manual inspection.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          CSS Implementation Examples
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Modern Responsive Container</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.media-frame {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 1200px;
}

.media-frame img,
.media-frame video,
.media-frame iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Legacy Fallback Method</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.media-frame {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
}

.media-frame > iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
          Common Mistakes and How to Avoid Them
        </h2>
        <div className="space-y-3 text-sm">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">Mixing Ratio and Resolution</h3>
            <p>
              Ratio is proportional shape (16:9). Resolution is total pixel size (1920 x 1080). Keep both concepts separate
              when planning exports.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">Upscaling Low-Resolution Assets</h3>
            <p>
              Increasing pixel size does not increase real detail. Use this calculator to plan scale-down workflows whenever possible.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">Ignoring Safe Zones in Vertical Content</h3>
            <p>
              Ratio correctness alone is not enough for social video. Keep critical text and branding away from UI overlays.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">Using Only One Platform Size</h3>
            <p>
              A format that works in one feed may crop badly elsewhere. Use converter mode to generate alternate outputs fast.
            </p>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          Productive Toolbox Aspect Ratio Calculator is a practical, high-accuracy utility for creators, marketers, and
          developers who need fast dimension math, visual validation, and implementation-ready outputs in one tool.
        </p>
      </section>
    </div>
  );
}
