"use client";

import { useState, useRef, useEffect } from "react";
import {
  calculateWordFrequency,
  getTopWords,
  mapFrequencyToFontSize,
  getColorForWord,
  generateRandomRotation,
  exportToJSON,
  exportToCSV,
} from "./logic";
import WordCloudGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. The fox is clever and quick. 
Dogs are loyal and friendly. The brown fox runs through the forest. 
Quick thinking helps solve problems. Lazy days are sometimes needed for rest.
The forest is full of life and beauty. Animals live in harmony with nature.`;

export default function WordCloudGeneratorUI() {
  const [text, setText] = useState("");
  const [useStopWords, setUseStopWords] = useState(true);
  const [maxWords, setMaxWords] = useState(100);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [colorScheme, setColorScheme] = useState<"random" | "monochrome" | "gradient">("random");
  const [maxRotation, setMaxRotation] = useState(0);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const topWords = text.trim() ? getTopWords(calculateWordFrequency(text, useStopWords), maxWords) : [];

  useEffect(() => {
    renderWordCloud();
  }, [text, useStopWords, maxWords, fontFamily, colorScheme, maxRotation]);

  function renderWordCloud() {
    const canvas = canvasRef.current;
    if (!canvas || topWords.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const maxFreq = topWords[0]?.[1] || 1;
    const usedPositions: Array<{ x: number; y: number; w: number; h: number }> = [];

    for (let i = 0; i < topWords.length; i++) {
      const [word, freq] = topWords[i];
      const fontSize = mapFrequencyToFontSize(freq, maxFreq, 14, 56);
      const color = getColorForWord(i, topWords.length, colorScheme);
      const rotation = generateRandomRotation(maxRotation);

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;

      const metrics = ctx.measureText(word);
      const wordWidth = metrics.width;
      const wordHeight = fontSize;

      let x = Math.random() * (width - wordWidth - 20) + 10;
      let y = Math.random() * (height - wordHeight - 20) + 20;
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 50) {
        let collision = false;
        for (const pos of usedPositions) {
          if (
            x < pos.x + pos.w + 10 &&
            x + wordWidth > pos.x - 10 &&
            y < pos.y + pos.h + 10 &&
            y + wordHeight > pos.y - 10
          ) {
            collision = true;
            break;
          }
        }

        if (!collision) {
          placed = true;
        } else {
          x = Math.random() * (width - wordWidth - 20) + 10;
          y = Math.random() * (height - wordHeight - 20) + 20;
          attempts++;
        }
      }

      if (placed) {
        ctx.save();
        ctx.translate(x + wordWidth / 2, y + wordHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.fillText(word, -wordWidth / 2, wordHeight / 2 - 4);
        ctx.restore();

        usedPositions.push({ x, y, w: wordWidth, h: wordHeight });
      }
    }
  }

  function handleLoadExample() {
    setText(EXAMPLE_TEXT);
  }

  function handleClear() {
    setText("");
  }

  function handleDownloadPNG() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "word-cloud.png";
    link.click();
  }

  function handleDownloadSVG() {
    if (topWords.length === 0) return;

    const maxFreq = topWords[0]?.[1] || 1;
    let svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="white"/>`;

    const usedPositions: Array<{ x: number; y: number; w: number; h: number }> = [];

    for (let i = 0; i < topWords.length; i++) {
      const [word, freq] = topWords[i];
      const fontSize = mapFrequencyToFontSize(freq, maxFreq, 14, 56);
      const color = getColorForWord(i, topWords.length, colorScheme);
      const rotation = generateRandomRotation(maxRotation);

      let x = Math.random() * (800 - fontSize * word.length / 2);
      let y = Math.random() * (600 - fontSize);
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 50) {
        let collision = false;
        for (const pos of usedPositions) {
          if (
            x < pos.x + pos.w + 10 &&
            x + fontSize * word.length / 2 > pos.x - 10 &&
            y < pos.y + pos.h + 10 &&
            y + fontSize > pos.y - 10
          ) {
            collision = true;
            break;
          }
        }

        if (!collision) {
          placed = true;
        } else {
          x = Math.random() * (800 - fontSize * word.length / 2);
          y = Math.random() * (600 - fontSize);
          attempts++;
        }
      }

      if (placed) {
        svg += `<text x="${x}" y="${y}" font-size="${fontSize}" font-family="${fontFamily}" fill="${color}" transform="rotate(${rotation} ${x} ${y})">${word}</text>`;
        usedPositions.push({ x, y, w: fontSize * word.length / 2, h: fontSize });
      }
    }

    svg += `</svg>`;

    const link = document.createElement("a");
    link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    link.download = "word-cloud.svg";
    link.click();
  }

  function handleDownloadJSON() {
    const json = exportToJSON(topWords);
    const link = document.createElement("a");
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
    link.download = "word-frequency.json";
    link.click();
  }

  function handleDownloadCSV() {
    const csv = exportToCSV(topWords);
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = "word-frequency.csv";
    link.click();
  }

  function handleCopyImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Input</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type text here..."
                rows={8}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Settings */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={useStopWords}
                    onChange={(e) => setUseStopWords(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  Filter Stop Words
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Words: {maxWords}</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={maxWords}
                  onChange={(e) => setMaxWords(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Arial</option>
                  <option>Georgia</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                  <option>Verdana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value as any)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="random">Random</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="gradient">Gradient</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Rotation: {maxRotation}°</label>
                <input
                  type="range"
                  min="0"
                  max="45"
                  value={maxRotation}
                  onChange={(e) => setMaxRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLoadExample}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                📝 Load Example
              </button>
              <button
                onClick={handleClear}
                disabled={!text}
                className="w-full border-2 border-red-300 hover:border-red-500 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Cloud Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full border border-gray-100 rounded-lg bg-white"
              />
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={handleDownloadPNG}
                disabled={topWords.length === 0}
                className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                🖼️ PNG
              </button>
              <button
                onClick={handleDownloadSVG}
                disabled={topWords.length === 0}
                className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📄 SVG
              </button>
              <button
                onClick={handleDownloadJSON}
                disabled={topWords.length === 0}
                className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📋 JSON
              </button>
              <button
                onClick={handleDownloadCSV}
                disabled={topWords.length === 0}
                className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                📊 CSV
              </button>
            </div>

            <button
              onClick={handleCopyImage}
              disabled={topWords.length === 0}
              className="w-full mt-2 border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-primary text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy Image"}
            </button>
          </div>
        </div>

        {/* Stats */}
        {topWords.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Top Words</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {topWords.slice(0, 20).map(([word, freq]) => (
                <div key={word} className="bg-white rounded-lg p-2 text-center border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 truncate">{word}</div>
                  <div className="text-xs text-gray-500">{freq}x</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <WordCloudGeneratorSEOContent />

      <RelatedTools
        currentTool="word-cloud-generator"
        tools={["word-frequency-counter", "keyword-density-checker", "text-reverser"]}
      />
    </>
  );
}
