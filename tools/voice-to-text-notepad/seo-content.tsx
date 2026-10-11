import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8";
const h2 = "text-2xl font-semibold text-gray-900 mb-4";

const COMMANDS: [string, string, string, string, string][] = [
  ["Period", "“period” or “full stop”", "“punto”", "“point”", "“Punkt”"],
  ["Comma", "“comma”", "“coma”", "“virgule”", "“Komma”"],
  ["Question mark", "“question mark”", "“signo de interrogación”", "“point d'interrogation”", "“Fragezeichen”"],
  ["Exclamation mark", "“exclamation mark”", "“signo de exclamación”", "“point d'exclamation”", "“Ausrufezeichen”"],
  ["Colon / semicolon", "“colon” / “semicolon”", "“dos puntos” / “punto y coma”", "“deux points” / “point-virgule”", "“Doppelpunkt” / “Semikolon”"],
  ["New line", "“new line”", "“nueva línea”", "“à la ligne”", "“neue Zeile”"],
  ["New paragraph", "“new paragraph”", "“nuevo párrafo”", "“nouveau paragraphe”", "“neuer Absatz”"],
];

export default function VoiceToTextNotepadSEOContent() {
  return (
    <div className="max-w-5xl mx-auto">
      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert Voice to Text</h2>
        <ol className="space-y-3 text-gray-700">
          {toolConfig.seo.howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mt-0.5 shrink-0">{i + 1}</span>
              <span><strong className="text-gray-900">{name}.</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Voice Typing with Punctuation Commands</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Speech recognition writes down words, not punctuation. Say the punctuation you want and the notepad turns it into the mark itself, so “see you Monday comma thanks period” becomes “See you Monday, thanks.” New sentences start with a capital letter automatically.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[40rem]">
            <thead>
              <tr className="bg-gray-50 text-gray-800">
                <th className="p-2 border border-gray-200">Inserts</th>
                <th className="p-2 border border-gray-200">English</th>
                <th className="p-2 border border-gray-200">Spanish</th>
                <th className="p-2 border border-gray-200">French</th>
                <th className="p-2 border border-gray-200">German</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {COMMANDS.map(([what, ...say]) => (
                <tr key={what}>
                  <td className="p-2 border border-gray-200 font-medium text-gray-900">{what}</td>
                  {say.map((s) => <td key={s} className="p-2 border border-gray-200">{s}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          In other languages, use the punctuation buttons above the note. If you need the word itself (“the trial period”), turn voice commands off in Options.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What You Can Do With This Speech to Text Notepad</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
          {toolConfig.features.map((f) => (
            <p key={f} className="flex items-start gap-2"><span className="text-primary">✓</span>{f}</p>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Who Uses Voice Typing?</h2>
        <div className="grid sm:grid-cols-2 gap-5 text-gray-700">
          <p><strong className="text-gray-900">Students</strong> dictate essay drafts, reading notes and revision summaries faster than they can type them.</p>
          <p><strong className="text-gray-900">Writers and bloggers</strong> talk through a first draft, then shape it in the editor.</p>
          <p><strong className="text-gray-900">Professionals</strong> capture meeting notes, emails and to-do lists, then paste them into Outlook, Gmail or Slack.</p>
          <p><strong className="text-gray-900">People with RSI or dyslexia</strong> write with less typing and fewer spelling worries.</p>
          <p><strong className="text-gray-900">Language learners</strong> practise pronunciation by checking whether the notepad writes what they meant to say.</p>
          <p><strong className="text-gray-900">Anyone on a phone</strong> writes longer messages hands-free, then copies them into any app.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Tips for Accurate Dictation</h2>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>Pick the exact accent you speak: English (UK) understands British spelling and pronunciation better than English (US).</li>
          <li>Speak in full phrases at a steady pace rather than word by word.</li>
          <li>Use a headset or keep the microphone close, and avoid background music or TV.</li>
          <li>Dictate first and correct afterwards; stopping to fix every word breaks your flow.</li>
          <li>Keep the screen on when dictating on a phone, as the microphone stops when it locks.</li>
        </ul>
      </section>

      <ToolFaq items={toolConfig.seo.faq} />
    </div>
  );
}
