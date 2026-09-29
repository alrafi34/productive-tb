"use client";

import { useState } from "react";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { STYLES } from "./logic";
import FancyTextGeneratorSEO from "./seo-content";

export default function FancyTextGeneratorUI() {
  const [text, setText] = useState("Hello World");
  const [copied, setCopied] = useState<string | null>(null);

  const sample = text.trim() ? text : "Hello World";

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500);
    } catch {
      window.prompt("Copy this text", value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <label htmlFor="ft-text" className="block text-sm font-medium text-gray-700 mb-1">Your text</label>
        <textarea
          id="ft-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          maxLength={500}
          placeholder="Type something…"
          className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#058554]"
        />
        <p className="text-xs text-gray-500 mt-1">Letters A–Z and digits are styled; accented letters and emoji stay as they are.</p>
      </div>

      <ul className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {STYLES.map((s) => {
          const out = s.convert(sample);
          return (
            <li key={s.id} className="flex items-center gap-3 px-4 sm:px-6 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{s.name}</p>
                <p className="text-lg text-gray-900 break-words" data-testid={`ft-${s.id}`}>{out}</p>
              </div>
              <button
                onClick={() => copy(s.id, out)}
                aria-label={`Copy ${s.name} text`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium border ${copied === s.id ? "border-primary bg-primary text-white" : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"}`}
              >
                {copied === s.id ? "Copied" : "Copy"}
              </button>
            </li>
          );
        })}
      </ul>

      <RelatedStrip />
      <FancyTextGeneratorSEO />
      <RelatedTools />
    </div>
  );
}
