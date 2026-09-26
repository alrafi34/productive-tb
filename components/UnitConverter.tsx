"use client";

import { useState, type ReactNode } from "react";

export interface UnitSpec {
  /** Short symbol shown in the box and results, e.g. "kg". */
  symbol: string;
  /** Plural name for labels, e.g. "Kilograms". */
  name: string;
}

export interface UnitConverterProps {
  from: UnitSpec;
  to: UnitSpec;
  /** 1 `from` = `factor` `to`. */
  factor: number;
  /** How the factor is written in the steps, e.g. "0.3048" or "2.20462". */
  factorLabel: string;
  /** Initial value in `from` units. */
  initial?: number;
  /** One-click values in `from` units. */
  quickValues?: number[];
  /** Conversion chart rows in `from` units. */
  chart?: number[];
  /** Decimal places shown (trailing zeros dropped). */
  decimals?: number;
  /** Extra lines under the result, given the value in `from` units. */
  extra?: (fromValue: number) => ReactNode;
  /** Replaces the plain `from` input (e.g. feet + inches). Gets the value and a setter in `from` units. */
  fromInput?: (value: number | null, set: (v: number | null) => void) => ReactNode;
}

/* Up to `decimals` places, thousands separators, trailing zeros dropped, never "-0". */
export function formatNumber(value: number, decimals = 4): string {
  if (!isFinite(value)) return "";
  const rounded = Number(value.toFixed(decimals));
  return (Object.is(rounded, -0) ? 0 : rounded).toLocaleString("en-US", { maximumFractionDigits: decimals });
}

const plain = (value: number, decimals: number) => String(Number(value.toFixed(decimals)));

/*
 * Two linked boxes: type in either and the other follows. Shows the result
 * sentence, the multiplication worked through, quick values and a chart.
 */
export default function UnitConverter({
  from,
  to,
  factor,
  factorLabel,
  initial = 1,
  quickValues = [],
  chart = [],
  decimals = 4,
  extra,
  fromInput,
}: UnitConverterProps) {
  // The box last typed in is the source; the other is derived from it
  const [source, setSource] = useState<"from" | "to">("from");
  const [text, setText] = useState(String(initial));
  const [copied, setCopied] = useState(false);
  const [chartDir, setChartDir] = useState<"from" | "to">("from");

  const typed = parseFloat(text);
  const valid = text.trim() !== "" && !isNaN(typed);
  const fromValue = valid ? (source === "from" ? typed : typed / factor) : NaN;
  const toValue = valid ? (source === "to" ? typed : typed * factor) : NaN;

  const fromText = source === "from" ? text : valid ? plain(fromValue, decimals) : "";
  const toText = source === "to" ? text : valid ? plain(toValue, decimals) : "";

  const resultLine = !valid
    ? ""
    : source === "from"
      ? `${formatNumber(fromValue, decimals)} ${from.symbol} = ${formatNumber(toValue, decimals)} ${to.symbol}`
      : `${formatNumber(toValue, decimals)} ${to.symbol} = ${formatNumber(fromValue, decimals)} ${from.symbol}`;

  const setFrom = (v: number | null) => {
    setSource("from");
    setText(v === null ? "" : plain(v, decimals + 2));
  };

  const copy = () => {
    if (!valid) return;
    navigator.clipboard.writeText(resultLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const box =
    "w-full px-4 py-4 pr-16 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-2xl sm:text-3xl font-bold text-gray-900";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="uc-from" className="block text-sm font-semibold text-gray-700">
              {from.name} ({from.symbol})
            </label>
            {fromInput ? (
              fromInput(valid ? fromValue : null, setFrom)
            ) : (
              <div className="relative">
                <input
                  id="uc-from"
                  type="number"
                  inputMode="decimal"
                  value={fromText}
                  onChange={(e) => {
                    setSource("from");
                    setText(e.target.value);
                  }}
                  className={box}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">{from.symbol}</span>
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center justify-center pb-5 text-2xl text-gray-400" aria-hidden="true">⇄</div>
          <div className="space-y-2">
            <label htmlFor="uc-to" className="block text-sm font-semibold text-gray-700">
              {to.name} ({to.symbol})
            </label>
            <div className="relative">
              <input
                id="uc-to"
                type="number"
                inputMode="decimal"
                value={toText}
                onChange={(e) => {
                  setSource("to");
                  setText(e.target.value);
                }}
                className={box}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">{to.symbol}</span>
            </div>
          </div>
        </div>

        {quickValues.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Quick values</span>
            {quickValues.map((v) => (
              <button
                key={v}
                onClick={() => setFrom(v)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary transition-colors"
              >
                {formatNumber(v, decimals)} {from.symbol}
              </button>
            ))}
          </div>
        )}

        {valid && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-6 space-y-3">
            <p className="text-2xl sm:text-3xl font-black text-gray-900 break-words" style={{ fontFamily: "var(--font-heading)" }}>
              {resultLine}
            </p>
            <div className="text-sm font-mono text-gray-700 bg-white/70 rounded-xl px-4 py-3 border border-primary/10 space-y-1">
              {source === "from" ? (
                <p>
                  {formatNumber(fromValue, decimals)} {from.symbol} × {factorLabel} = <strong>{formatNumber(toValue, decimals)} {to.symbol}</strong>
                </p>
              ) : (
                <p>
                  {formatNumber(toValue, decimals)} {to.symbol} ÷ {factorLabel} = <strong>{formatNumber(fromValue, decimals)} {from.symbol}</strong>
                </p>
              )}
            </div>
            {extra && <div className="text-sm text-gray-600">{extra(fromValue)}</div>}
            <button
              onClick={copy}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all text-sm"
            >
              {copied ? "✅ Copied" : "📋 Copy result"}
            </button>
          </div>
        )}
      </div>

      {chart.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2 className="text-lg font-bold text-gray-900">Conversion chart</h2>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg" role="radiogroup" aria-label="Chart direction">
              {(["from", "to"] as const).map((d) => (
                <button
                  key={d}
                  role="radio"
                  aria-checked={chartDir === d}
                  onClick={() => setChartDir(d)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${chartDir === d ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}
                >
                  {d === "from" ? `${from.symbol} → ${to.symbol}` : `${to.symbol} → ${from.symbol}`}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 text-sm font-mono">
            {chart.map((v) => {
              const left = v;
              const right = chartDir === "from" ? v * factor : v / factor;
              const [l, r] = chartDir === "from" ? [from.symbol, to.symbol] : [to.symbol, from.symbol];
              return (
                <button
                  key={v}
                  onClick={() => (chartDir === "from" ? setFrom(v) : (setSource("to"), setText(String(v))))}
                  className="flex justify-between gap-3 py-1.5 px-2 border-b border-gray-50 hover:bg-gray-50 text-left"
                >
                  <span className="text-gray-600">{formatNumber(left, decimals)} {l}</span>
                  <span className="font-semibold text-gray-900">{formatNumber(right, decimals)} {r}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
