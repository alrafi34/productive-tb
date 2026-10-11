import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8";
const h2 = "text-2xl font-semibold text-gray-900 mb-4";

export default function AudioVisualizerSEOContent() {
  const { howToSteps, faq } = toolConfig.seo;
  return (
    <div className="max-w-5xl mx-auto">
      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Make a Music Visualizer Video</h2>
        <ol className="space-y-3 text-gray-700">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mt-0.5 shrink-0">{i + 1}</span>
              <span><strong className="text-gray-900">{name}.</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Visualizer Styles</h2>
        <div className="grid sm:grid-cols-2 gap-5 text-gray-700">
          <p><strong className="text-gray-900">Bars.</strong> The classic spectrum: bass on the left, treble on the right, on a musical (logarithmic) scale so kick drums and bass lines get as much room as cymbals.</p>
          <p><strong className="text-gray-900">Mirror bars.</strong> The same bands reflected above and below a centre line, a popular look for lo-fi and podcast videos.</p>
          <p><strong className="text-gray-900">Waveform.</strong> The sound wave itself, drawn like an oscilloscope. Good for voice, podcasts and audiograms.</p>
          <p><strong className="text-gray-900">Circle.</strong> Bars around a ring that swells with the bass, centred under your title. Works well with an album cover behind it.</p>
          <p><strong className="text-gray-900">Spectrogram.</strong> A scrolling picture of every frequency over time, used to study recordings, birdsong or speech as well as for visuals.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Video Sizes for Each Platform</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[28rem]">
            <thead>
              <tr className="bg-gray-50 text-gray-800">
                <th className="p-2 border border-gray-200">Size</th>
                <th className="p-2 border border-gray-200">Pixels</th>
                <th className="p-2 border border-gray-200">Use it for</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="p-2 border border-gray-200 font-medium">16:9</td><td className="p-2 border border-gray-200">1280 × 720</td><td className="p-2 border border-gray-200">YouTube videos, websites, presentations</td></tr>
              <tr><td className="p-2 border border-gray-200 font-medium">1:1</td><td className="p-2 border border-gray-200">1080 × 1080</td><td className="p-2 border border-gray-200">Instagram and Facebook feed posts, X</td></tr>
              <tr><td className="p-2 border border-gray-200 font-medium">9:16</td><td className="p-2 border border-gray-200">1080 × 1920</td><td className="p-2 border border-gray-200">Instagram Reels, TikTok, YouTube Shorts, Stories</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Who Uses an Audio Visualizer?</h2>
        <div className="grid sm:grid-cols-2 gap-5 text-gray-700">
          <p><strong className="text-gray-900">Musicians and producers</strong> post new tracks to YouTube, SoundCloud promos and Instagram without filming a music video.</p>
          <p><strong className="text-gray-900">Podcasters</strong> turn a highlight clip into an audiogram for social media.</p>
          <p><strong className="text-gray-900">DJs and streamers</strong> run the fullscreen visualizer as a backdrop for live sets.</p>
          <p><strong className="text-gray-900">Students and teachers</strong> see how pitch, harmonics and loudness look, using the microphone and spectrogram.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Tips for a Better Visualizer Video</h2>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>Export a 30–60 second clip of the chorus for Reels, TikTok and Shorts; it is quicker and performs better than a full track.</li>
          <li>Use a dark or blurred background image so the bars and text stand out.</li>
          <li>Raise sensitivity for quiet recordings such as speech, and lower it for loud, mastered music.</li>
          <li>Pick 9:16 before exporting for vertical platforms; cropping a 16:9 video later cuts off the bars.</li>
        </ul>
      </section>

      <ToolFaq items={faq} />
    </div>
  );
}
