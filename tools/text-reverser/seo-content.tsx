import React from "react";

export default function TextReverserSEOContent() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Text Reverser?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>text reverser</strong> is a free online tool that transforms text by flipping the
            order of characters, words, sentences, or paragraphs depending on which mode you choose. It
            answers the practical question that comes up in puzzle creation, creative writing, and
            developer testing: <em>how do I quickly reverse this text without doing it by hand?</em>
          </p>
          <p>
            Most tools only reverse characters — the full string backwards. This <strong>text reverser
            online</strong> supports five distinct modes: reverse all letters, reverse word order,
            reverse letters inside each word, reverse sentence order, and reverse paragraph order. Each
            produces a fundamentally different result, which matters when you need a specific
            transformation rather than just a mirror of the whole input.
          </p>
          <p>
            This tool is built for <strong>puzzle and game designers creating reverse clues, creative
            writers experimenting with stylized text, social media creators making attention-grabbing
            captions, teachers generating classroom challenges, developers and QA engineers testing
            string-handling logic, and students learning text manipulation concepts</strong>. Five
            reversal modes, live character and word count, click-to-copy, TXT export, browser-based
            with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Text Reversal Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each mode applies a different reversal algorithm to the input. All five operate on the same
            input text — you switch modes to get different transformations without re-entering anything.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Mode Algorithms</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Reverse Letters</span> — splits input into characters, reverses the array, rejoins</p>
              <p className="text-gray-500 text-xs ml-4">"Hello World" → "dlroW olleH"</p>
              <p><span className="font-semibold">Reverse Words</span> — splits on whitespace, reverses word array, rejoins</p>
              <p className="text-gray-500 text-xs ml-4">"Hello World Today" → "Today World Hello"</p>
              <p><span className="font-semibold">Reverse Each Word</span> — splits on whitespace, reverses chars inside each word</p>
              <p className="text-gray-500 text-xs ml-4">"Hello World" → "olleH dlroW"</p>
              <p><span className="font-semibold">Reverse Sentences</span> — splits on sentence-ending punctuation, reverses sentence array</p>
              <p className="text-gray-500 text-xs ml-4">"First. Second. Third." → "Third. Second. First."</p>
              <p><span className="font-semibold">Reverse Paragraphs</span> — splits on double newlines, reverses paragraph blocks</p>
              <p className="text-gray-500 text-xs ml-4">Last paragraph becomes first, first becomes last</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>Upside down text</strong> — use Reverse Letters for a full mirror of the input string</li>
            <li>• <strong>Word reverser</strong> — use Reverse Words to flip word order while keeping letters intact</li>
            <li>• <strong>Sentence reverser</strong> — use Reverse Sentences for paragraph-level restructuring</li>
            <li>• All modes preserve spacing and punctuation within their target unit</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Text Reverser
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Paste or Type Your Text", "Enter any text into the input field — a single word, a sentence, a paragraph, or multiple paragraphs. There is no character limit for standard use. The tool works on whatever you paste immediately."],
              ["Choose a Reversal Mode", "Select one of the five modes from the mode selector: Reverse Letters, Reverse Words, Reverse Each Word, Reverse Sentences, or Reverse Paragraphs. Each produces a different output from the same input — switch modes to compare results instantly without re-entering text."],
              ["Read the Output", "The reversed text appears in the output panel immediately. A live word count and character count update below both panels so you can confirm the transformation preserved the correct number of elements."],
              ["Switch Modes to Compare", "Click any other mode to see how the same input transforms differently. Reverse Letters gives a full mirror; Reverse Words keeps letters intact but flips word order; Reverse Each Word scrambles individual words while keeping their positions."],
              ["Copy or Download", "Click the copy button to send the output to your clipboard in one click. Use the download button to save the reversed text as a .txt file — useful when working with longer content or when you need a record of the transformation."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tool Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "5 reversal modes in one tool",
                "Instant output — no submit button needed",
                "Live word count and character count",
                "Click-to-copy output",
                "Download as .txt file",
                "Shareable URL with input encoded",
                "Browser-based — no signup required",
                "Works on mobile and tablet",
                "Handles multi-paragraph text blocks",
                "Preserves punctuation and spacing",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Puzzle and Riddle Creation",
              scenario: "A teacher creates a classroom word puzzle where students must decode reversed clues. She types 10 clue phrases, selects Reverse Letters mode, and copies the output directly into her worksheet. Each clue like 'yellow fruit' becomes 'tiurf wolley' — readable enough to decode but scrambled enough to require effort. The whole batch takes under 2 minutes.",
            },
            {
              title: "Social Media Caption Styling",
              scenario: "A content creator wants to post an attention-grabbing Instagram caption where the punchline appears first. They paste a 3-sentence caption, select Reverse Sentences, and the last sentence — the punchline — moves to the top. The output is copied directly into the post with no manual reordering.",
            },
            {
              title: "Developer String-Handling Tests",
              scenario: "A backend developer is testing how their API handles edge-case string inputs. They use Reverse Letters to generate mirror strings, Reverse Each Word to produce word-internal reversals, and Reverse Words to create word-order-swapped payloads. Each transformed string is pasted directly into the API test suite as a test case input.",
            },
            {
              title: "Learning String Algorithms (CS Students)",
              scenario: "A computer science student studying string manipulation concepts uses the tool to check their own manual reversal work. They reverse a sentence by hand, then paste it into the tool using the same mode to verify. The live output confirms whether their algorithm produced the correct result — faster than running a code environment.",
            },
            {
              title: "Upside Down Text for Games",
              scenario: "A game designer is building a mirror-world level and needs all the in-game signs to display as reversed text. They paste 15 sign texts into the tool, select Reverse Letters, and download the output as a .txt file. The file is imported directly into the game asset pipeline without manual editing of each string.",
            },
            {
              title: "Paragraph Reordering for Editing",
              scenario: "A writer is restructuring a 5-paragraph essay to test whether reversing the argument order improves the flow. They paste the full essay, select Reverse Paragraphs, and the last paragraph becomes the introduction. They copy the reversed version into a new document and read it alongside the original to compare which structure is stronger.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Switch modes without re-entering text", "All five modes operate on the same input. Click through Reverse Letters → Reverse Words → Reverse Each Word to instantly compare three different transformations of the same text — no copy-paste between inputs needed."],
                ["Use Reverse Each Word for cipher-style text", "Reverse Each Word scrambles the letters inside every individual word while keeping the words in their original positions. The result reads as recognizable word-shapes but with scrambled internals — ideal for simple substitution puzzles or stylized social media text."],
                ["Sentence mode works best with proper punctuation", "Reverse Sentences splits on sentence-ending punctuation (. ! ?). For best results, make sure each sentence ends with a punctuation mark. Sentences without end punctuation may be grouped together as a single unit."],
                ["Download for large content batches", "For 10+ items to reverse (sign texts, puzzle clues, test strings), paste all of them separated by blank lines and use Reverse Paragraphs — each item becomes its own paragraph block. Then download the output as .txt and process the file downstream."],
                ["Use for decoding, not just encoding", "If you receive reversed text, paste it in and apply the same mode that was used to encode it — the reversal is its own inverse. Reverse Letters of reversed text returns the original. This makes the tool useful for decoding as well as encoding."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">💡</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Mistakes</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Using the wrong mode for the goal", "Reverse Letters and Reverse Words produce completely different outputs from the same input. If you want word order flipped but letters intact, you need Reverse Words — not Reverse Letters, which mirrors the entire string character by character."],
                ["Expecting sentence reversal to work without punctuation", "Reverse Sentences requires punctuation boundaries to identify where sentences end. Pasting unpunctuated text will treat the entire input as one sentence and return it unchanged. Add periods if your content lacks them."],
                ["Forgetting to download before closing", "The tool does not save sessions. If you reverse a large batch of text and close the tab, the output is gone. Use the download button for anything longer than a few lines you might need again."],
                ["Treating reversed output as encoded/secure", "Reversed text is a trivial transformation that anyone can decode in seconds. It is suitable for puzzles and styling — not for obscuring sensitive information. Do not use it as a security measure."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Mode Reference Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Reversal Mode Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Reverses</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input Example</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Output Example</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Reverse Letters", "All characters in the full string", '"Hello World"', '"dlroW olleH"', "Full mirror, upside down text, decode reversed strings"],
                ["Reverse Words", "Word order (letters stay intact)", '"One Two Three"', '"Three Two One"', "Reordering word sequences, sentence reversal puzzles"],
                ["Reverse Each Word", "Letters inside each word individually", '"Hello World"', '"olleH dlroW"', "Cipher text, scrambled-word puzzles, stylized captions"],
                ["Reverse Sentences", "Sentence order within paragraphs", '"First. Second."', '"Second. First."', "Essay restructuring, argument order testing"],
                ["Reverse Paragraphs", "Paragraph block order", "Para 1 ↵↵ Para 2", "Para 2 ↵↵ Para 1", "Document restructuring, outline reversal"],
              ].map(([mode, what, input, output, use]) => (
                <tr key={mode} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-primary">{mode}</td>
                  <td className="py-3 px-4 text-gray-600">{what}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-700">{input}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-700">{output}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a text reverser?",
              a: "A text reverser is a free online tool that transforms text by changing the order of its characters, words, sentences, or paragraphs depending on which reversal mode you select. It is used for puzzle creation, creative writing, social media content styling, developer string testing, and educational demonstrations of text manipulation algorithms.",
            },
            {
              q: "What is the difference between reversing letters and reversing words?",
              a: "Reversing letters mirrors the entire string character by character — 'Hello World' becomes 'dlroW olleH'. Reversing words keeps every letter in its correct position within its word but flips the order of the words themselves — 'Hello World' becomes 'World Hello'. The two modes produce completely different outputs and serve different purposes.",
            },
            {
              q: "What does 'reverse each word' do?",
              a: "Reverse Each Word reverses the letters inside every individual word while leaving the words in their original sequence. 'Hello World' becomes 'olleH dlroW' — both words are individually mirrored, but the word order stays the same. This is useful for cipher-style puzzles and stylized text where word shape is preserved but letters are scrambled.",
            },
            {
              q: "How does the sentence reverser work?",
              a: "The sentence reverser splits the input on sentence-ending punctuation marks (periods, exclamation marks, question marks), reverses the order of those segments, and rejoins them. For it to work correctly, each sentence must end with a punctuation mark. Unpunctuated text will be treated as a single sentence and returned unchanged.",
            },
            {
              q: "Can I use this as an upside down text decoder?",
              a: "For basic character-mirrored text, yes — paste the reversed string and select Reverse Letters to restore the original. Since Reverse Letters is its own inverse (reversing a reversed string returns the original), you can use the same mode for both encoding and decoding. Note that true upside-down Unicode text (using flipped Unicode characters) is a different technique and requires a separate tool.",
            },
            {
              q: "Is a word reverser the same as a text reverser?",
              a: "A word reverser specifically reverses word order — 'one two three' becomes 'three two one'. A text reverser is the broader category of tool that includes word reversal as one of several modes alongside letter reversal, sentence reversal, and paragraph reversal. This tool covers all of them in a single interface.",
            },
            {
              q: "Can this tool reverse long text documents?",
              a: "Yes. There is no hard character limit for typical use. Paste multi-paragraph text for sentence or paragraph reversal, or long strings for letter and word reversal. For very large documents (thousands of words), processing is still instant since all operations run client-side in your browser. Download the output as a .txt file rather than copying for large batches.",
            },
            {
              q: "Does the tool work for non-English text?",
              a: "The letter and word reversal modes work for any language since they operate on Unicode characters and whitespace boundaries. Sentence reversal depends on standard punctuation (. ! ?) which may not apply to all scripts. For languages written right-to-left (Arabic, Hebrew), the visual effect of letter reversal will differ from left-to-right languages.",
            },
            {
              q: "Can I use reversed text for security or obfuscation?",
              a: "No. Text reversal is a trivial transformation that any person or program can instantly reverse. It provides zero security and should not be used to obscure passwords, sensitive data, or confidential content. It is appropriate for puzzles, games, creative styling, and developer testing only.",
            },
            {
              q: "Is my text private when using this tool?",
              a: "Yes. All processing happens entirely in your browser using JavaScript. The text you enter is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Tool?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🧩", title: "Puzzle & Game Designers", desc: "Generate reversed clues, mirror-text signs, and scrambled word challenges for escape rooms, board games, classroom activities, and digital games." },
            { icon: "✍️", title: "Writers & Content Creators", desc: "Experiment with sentence and paragraph order during the editing process, or create stylized reversed-text captions and social media posts." },
            { icon: "🧑‍💻", title: "Developers & QA Engineers", desc: "Produce edge-case string inputs for testing APIs, parsers, and text rendering — reversed strings, word-order swaps, and individually scrambled words." },
            { icon: "🎓", title: "Teachers & Educators", desc: "Create reverse-text exercises, decoding worksheets, and string algorithm demonstrations for computer science, English, and linguistics classes." },
            { icon: "📱", title: "Social Media Creators", desc: "Make attention-grabbing posts with reversed or scrambled text, generate mirror-text usernames, and create curiosity-inducing captions." },
            { icon: "🎮", title: "Students Learning CS", desc: "Verify manual string reversal exercises, understand how character and word array operations work, and explore different algorithm outputs side by side." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
