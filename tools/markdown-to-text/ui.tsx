"use client";

import { useMemo, useState } from "react";
import DOMPurify from "dompurify";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { DEFAULT_OPTIONS, markdownToHtml, markdownToText, type Bullet, type CleanOptions, type Dash } from "./logic";
import MarkdownToTextSEO from "./seo-content";

const EXAMPLE = `## Project update

Here's a **quick summary** of where things stand — three items need attention.

1. **Design**: the new homepage is *approved*
2. **Budget**: see the [Q3 sheet](https://example.com/q3)
   - Travel is over by 8%
   - Software is on track
3. **Next steps**: book the review for Friday

> Tip: reply by Thursday so we can plan.`;

export default function MarkdownToTextUI() {
  const [input, setInput] = useState("");
  const [opts, setOpts] = useState<CleanOptions>(DEFAULT_OPTIONS);
  const [copied, setCopied] = useState<"" | "text" | "rich">("");

  const output = useMemo(() => markdownToText(input, opts), [input, opts]);
  const set = <K extends keyof CleanOptions>(k: K, v: CleanOptions[K]) => setOpts((o) => ({ ...o, [k]: v }));

  const flash = (kind: "text" | "rich") => {
    setCopied(kind);
    setTimeout(() => setCopied(""), 2000);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(output);
      flash("text");
    } catch {
      // clipboard blocked
    }
  };

  // Formatting without the symbols: HTML for Word, Google Docs and email,
  // with the plain text alongside for apps that only take text.
  const copyRich = async () => {
    const html = DOMPurify.sanitize(markdownToHtml(input, opts));
    try {
      if (typeof ClipboardItem === "undefined") throw new Error("no ClipboardItem");
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([output], { type: "text/plain" }),
        }),
      ]);
      flash("rich");
    } catch {
      await copyText();
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([output], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "clean-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const words = output ? output.split(/\s+/).filter(Boolean).length : 0;
  const box = "w-full h-72 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-y";
  const select = "px-2 py-1.5 border border-gray-300 rounded-md text-sm";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="md-in" className="text-sm font-semibold text-gray-800">Paste text with Markdown</label>
            <div className="flex gap-2">
              <button onClick={() => setInput(EXAMPLE)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">Example</button>
              <button onClick={() => setInput("")} className="text-xs px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded">Clear</button>
            </div>
          </div>
          <textarea id="md-in" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste an answer from ChatGPT, Claude, Gemini or any Markdown text…" className={box} spellCheck={false} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="md-out" className="text-sm font-semibold text-gray-800">Clean text</label>
            <span className="text-xs text-gray-500">{words} words · {output.length} characters</span>
          </div>
          <textarea id="md-out" value={output} readOnly className={`${box} bg-gray-50`} />
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={copyText} disabled={!output} className="px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 text-sm font-medium">
              {copied === "text" ? "✓ Copied" : "Copy plain text"}
            </button>
            <button onClick={copyRich} disabled={!output} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
              {copied === "rich" ? "✓ Copied" : "Copy for Word / Google Docs"}
            </button>
            <button onClick={download} disabled={!output} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm">
              Download .txt
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          List bullets
          <select value={opts.bullet} onChange={(e) => set("bullet", e.target.value as Bullet)} className={select}>
            <option value="•">• Dot</option>
            <option value="-">- Hyphen</option>
            <option value="none">None</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Em dashes (—)
          <select value={opts.dash} onChange={(e) => set("dash", e.target.value as Dash)} className={select}>
            <option value="keep">Keep</option>
            <option value="hyphen">Replace with -</option>
            <option value="comma">Replace with a comma</option>
          </select>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.keepLinkUrls} onChange={(e) => set("keepLinkUrls", e.target.checked)} className="w-4 h-4" />
          Keep link addresses
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.straightQuotes} onChange={(e) => set("straightQuotes", e.target.checked)} className="w-4 h-4" />
          Straight quotes (“ ” → &quot;)
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.removeEmoji} onChange={(e) => set("removeEmoji", e.target.checked)} className="w-4 h-4" />
          Remove emoji
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.removeRefNumbers} onChange={(e) => set("removeRefNumbers", e.target.checked)} className="w-4 h-4" />
          Remove reference numbers like [1]
        </label>
      </div>

      <RelatedStrip />
      <MarkdownToTextSEO />
      <RelatedTools />
    </div>
  );
}
