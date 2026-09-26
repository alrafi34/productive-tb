"use client";

import { useState } from "react";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  formatTemp,
  isBelowAbsoluteZero,
  REFERENCE_POINTS,
  chartRows,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

type Source = "c" | "f";

const QUICK_VALUES = [-40, 0, 20, 37, 100, 180];

export default function CelsiusToFahrenheitConverterUI() {
  // The box the visitor typed in is the source; the other box is derived
  const [source, setSource] = useState<Source>("c");
  const [text, setText] = useState("37");
  const [copied, setCopied] = useState(false);
  const [chart, setChart] = useState<"c" | "f">("c");

  const value = parseFloat(text);
  const valid = text.trim() !== "" && !isNaN(value);
  const celsius = valid ? (source === "c" ? value : fahrenheitToCelsius(value)) : NaN;
  const fahrenheit = valid ? (source === "f" ? value : celsiusToFahrenheit(value)) : NaN;
  const belowZero = valid && isBelowAbsoluteZero(celsius);

  const celsiusText = source === "c" ? text : valid ? formatTemp(celsius) : "";
  const fahrenheitText = source === "f" ? text : valid ? formatTemp(fahrenheit) : "";

  const resultLine = valid
    ? source === "c"
      ? `${formatTemp(value)} °C = ${formatTemp(fahrenheit)} °F`
      : `${formatTemp(value)} °F = ${formatTemp(celsius)} °C`
    : "";

  const setCelsius = (c: number) => {
    setSource("c");
    setText(formatTemp(c));
  };

  const handleCopy = () => {
    if (!valid) return;
    navigator.clipboard.writeText(resultLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-3xl font-bold text-gray-900";

  const rows = chartRows(-40, 100, 5);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="c2f-celsius" className="block text-sm font-semibold text-gray-700">Celsius (°C)</label>
            <div className="relative">
              <input
                id="c2f-celsius"
                type="number"
                inputMode="decimal"
                value={celsiusText}
                onChange={(e) => {
                  setSource("c");
                  setText(e.target.value);
                }}
                className={`${inputClass} pr-14`}
                placeholder="e.g. 20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">°C</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-center pb-5 text-2xl text-gray-400" aria-hidden="true">⇄</div>

          <div className="space-y-2">
            <label htmlFor="c2f-fahrenheit" className="block text-sm font-semibold text-gray-700">Fahrenheit (°F)</label>
            <div className="relative">
              <input
                id="c2f-fahrenheit"
                type="number"
                inputMode="decimal"
                value={fahrenheitText}
                onChange={(e) => {
                  setSource("f");
                  setText(e.target.value);
                }}
                className={`${inputClass} pr-14`}
                placeholder="e.g. 68"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">°F</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Quick values</span>
          {QUICK_VALUES.map((c) => (
            <button
              key={c}
              onClick={() => setCelsius(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                valid && source === "c" && value === c
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {c} °C
            </button>
          ))}
        </div>

        {valid && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-6 space-y-3">
            <p className="text-3xl sm:text-4xl font-black text-gray-900 break-words" style={{ fontFamily: "var(--font-heading)" }}>
              {resultLine}
            </p>
            {belowZero ? (
              <p className="text-sm font-medium text-red-600">
                This is below absolute zero (−273.15 °C / −459.67 °F), the lowest temperature possible.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                That is {formatTemp(celsiusToKelvin(celsius))} K on the Kelvin scale.
              </p>
            )}
            <div className="text-sm font-mono text-gray-700 bg-white/70 rounded-xl px-4 py-3 border border-primary/10 space-y-1">
              {source === "c" ? (
                <>
                  <p>°F = °C × 9/5 + 32</p>
                  <p>°F = {formatTemp(value)} × 1.8 + 32</p>
                  <p>°F = {formatTemp(value * 1.8)} + 32 = <strong>{formatTemp(fahrenheit)}</strong></p>
                </>
              ) : (
                <>
                  <p>°C = (°F − 32) × 5/9</p>
                  <p>°C = ({formatTemp(value)} − 32) ÷ 1.8</p>
                  <p>°C = {formatTemp(value - 32)} ÷ 1.8 = <strong>{formatTemp(celsius)}</strong></p>
                </>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all text-sm"
            >
              {copied ? "✅ Copied" : "📋 Copy result"}
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2 className="text-lg font-bold text-gray-900">Conversion chart</h2>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg" role="radiogroup" aria-label="Chart direction">
              {(["c", "f"] as const).map((d) => (
                <button
                  key={d}
                  role="radio"
                  aria-checked={chart === d}
                  onClick={() => setChart(d)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    chart === d ? "bg-white shadow-sm text-gray-900" : "text-gray-600"
                  }`}
                >
                  {d === "c" ? "°C → °F" : "°F → °C"}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left py-2 px-2">{chart === "c" ? "Celsius" : "Fahrenheit"}</th>
                  <th className="text-right py-2 px-2">{chart === "c" ? "Fahrenheit" : "Celsius"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-mono">
                {chart === "c"
                  ? rows.map((r) => (
                      <tr key={r.celsius} className="hover:bg-gray-50 cursor-pointer" onClick={() => setCelsius(r.celsius)}>
                        <td className="py-1.5 px-2">{formatTemp(r.celsius)} °C</td>
                        <td className="py-1.5 px-2 text-right font-semibold text-gray-900">{formatTemp(r.fahrenheit)} °F</td>
                      </tr>
                    ))
                  : Array.from({ length: 29 }, (_, i) => -40 + i * 10).map((f) => (
                      <tr
                        key={f}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSource("f");
                          setText(String(f));
                        }}
                      >
                        <td className="py-1.5 px-2">{f} °F</td>
                        <td className="py-1.5 px-2 text-right font-semibold text-gray-900">{formatTemp(fahrenheitToCelsius(f), 1)} °C</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Everyday reference points</h2>
          <ul className="divide-y divide-gray-50 text-sm">
            {REFERENCE_POINTS.map((p) => (
              <li key={p.label}>
                <button
                  onClick={() => setCelsius(p.celsius)}
                  className="w-full flex items-center justify-between gap-3 py-2 px-2 text-left hover:bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{p.label}</span>
                  <span className="font-mono text-gray-900 whitespace-nowrap">
                    {formatTemp(p.celsius)} °C = {formatTemp(celsiusToFahrenheit(p.celsius))} °F
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
