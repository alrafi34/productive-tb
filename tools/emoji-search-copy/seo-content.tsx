import ToolFaq from "@/components/ToolFaq";
import { emojiSearchCopyConfig } from "./config";

export default function ToolSEOContent() {
  const { howToSteps, faq } = emojiSearchCopyConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

  const popular: [string, string, string][] = [
    ["😂", "Face with tears of joy", "Something is very funny"],
    ["❤️", "Red heart", "Love, thanks, strong approval"],
    ["👍", "Thumbs up", "Yes, agreed, well done"],
    ["🙏", "Folded hands", "Please, thank you, or prayer"],
    ["😊", "Smiling face with smiling eyes", "Warm, friendly happiness"],
    ["🔥", "Fire", "Something is excellent or trending"],
    ["🎉", "Party popper", "Congratulations, celebration"],
    ["✅", "Check mark button", "Done, correct, approved"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Copy and Paste Any Emoji
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Find an emoji by what it shows or means, click it and paste it anywhere: messages, emails, documents, social
            posts or code. Search matches the official Unicode name and common keywords, so &quot;lol&quot; finds 😂 and
            &quot;yes&quot; finds 👍.
          </p>
          <p>
            People and hand emoji can be copied in any of the five skin tones. For developers and writers, each emoji also
            shows its shortcode, Unicode code point and HTML entity.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Popular Emoji and What They Mean
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Emoji</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Usually means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {popular.map(([e, name, meaning]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-2xl">{e}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{name}</td>
                  <td className="py-2 px-3 text-xs text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use Emoji Search &amp; Copy
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-gray-500 mt-6">
          Tip: on Windows press Win + . and on a Mac press Ctrl + Cmd + Space to open the system emoji picker; this page is
          faster when you want to search by meaning or copy codes.
        </p>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
