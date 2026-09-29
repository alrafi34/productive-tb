"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { guessCurrency } from "@/lib/currency";
import {
  EARLIEST_DATE,
  FALLBACK_CURRENCIES,
  POPULAR_PAIRS,
  RATES_SOURCE,
  convert,
  fetchCurrencies,
  fetchRate,
  formatAmount,
  formatRate,
  type RateQuote,
} from "./logic";
import CurrencyConverterSEO from "./seo-content";

const AMOUNTS = [1, 5, 10, 25, 50, 100, 500, 1000];

export default function CurrencyConverterUI() {
  const [currencies, setCurrencies] = useState<Record<string, string>>(FALLBACK_CURRENCIES);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState<RateQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Start from the visitor's own currency, after hydration
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const home = guessCurrency();
      setFrom(home);
      setTo(home === "USD" ? "EUR" : "USD");
    });
    fetchCurrencies().then(setCurrencies).catch(() => {});
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const q = await fetchRate(from, to, date || undefined);
        if (!cancelled) setQuote(q);
      } catch (e) {
        if (!cancelled) {
          setQuote(null);
          setError(e instanceof Error && /rate/i.test(e.message) ? e.message : "Exchange rates could not be loaded. Check your connection and try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [from, to, date]);

  const codes = Object.keys(currencies).sort();
  const value = num(amount);
  const current = quote && quote.base === from && quote.quote === to ? quote : null;
  const today = new Date().toISOString().slice(0, 10);

  const select = (id: string, label: string, v: string, set: (c: string) => void) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={id}
        value={v}
        onChange={(e) => set(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
      >
        {codes.map((c) => (
          <option key={c} value={c}>{c} – {currencies[c]}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-3">
            <NumberField id="cc-amount" label="Amount" value={amount} onChange={setAmount} />
            {select("cc-from", "From", from, setFrom)}
          </div>
          <button
            onClick={() => { setFrom(to); setTo(from); }}
            aria-label="Swap currencies"
            className="justify-self-center h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-50 text-lg"
          >
            ⇄
          </button>
          <div className="space-y-3">
            <div>
              <label htmlFor="cc-date" className="block text-sm font-medium text-gray-700 mb-1">Rate date (optional)</label>
              <input
                id="cc-date"
                type="date"
                min={EARLIEST_DATE}
                max={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
              />
            </div>
            {select("cc-to", "To", to, setTo)}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-primary text-white p-6 text-center" aria-live="polite">
          {error ? (
            <p>{error}</p>
          ) : current ? (
            <>
              <p className="text-primary-100 text-sm">{formatAmount(value, from)} =</p>
              <p className="text-4xl font-bold my-1">{formatAmount(convert(value, current.rate), to)}</p>
              <p className="text-primary-100 text-sm">
                1 {from} = {formatRate(current.rate)} {to} · 1 {to} = {formatRate(1 / current.rate)} {from}
              </p>
              <p className="text-primary-100 text-xs mt-2">
                {RATES_SOURCE}, {current.date}{loading ? " · updating…" : ""}
              </p>
            </>
          ) : (
            <p>Loading rates…</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {POPULAR_PAIRS.map(([a, b]) => (
            <button
              key={a + b}
              onClick={() => { setFrom(a); setTo(b); }}
              className={`px-3 py-1.5 rounded-lg text-sm border ${a === from && b === to ? "bg-[#058554] text-white border-[#058554]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              {a} → {b}
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {([[from, to, current.rate], [to, from, 1 / current.rate]] as [string, string, number][]).map(([a, b, rate]) => (
            <div key={a + b} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{a} to {b}</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {AMOUNTS.map((n) => (
                    <tr key={n}>
                      <td className="py-1.5 font-mono text-gray-700">{formatAmount(n, a)}</td>
                      <td className="py-1.5 text-right font-mono text-gray-900">{formatAmount(n * rate, b)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <RelatedStrip />
      <CurrencyConverterSEO />
      <RelatedTools />
    </div>
  );
}
