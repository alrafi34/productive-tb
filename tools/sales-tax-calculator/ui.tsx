"use client";

import { useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { currencySymbol, formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";
import { US_STATE_RATES, STATE_RATES_SOURCE, addTax, combinedRate, findRate, removeTax, type Mode } from "./logic";
import SalesTaxCalculatorSEO from "./seo-content";

const MODES: { id: Mode; label: string }[] = [
  { id: "add", label: "Add tax to a price" },
  { id: "remove", label: "Remove tax from a total" },
  { id: "rate", label: "Find the tax rate" },
];

export default function SalesTaxCalculatorUI() {
  const [currency, setCurrency] = useCurrency("sales-tax-currency");
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("100");
  const [total, setTotal] = useState("108.25");
  const [state, setState] = useState("");
  const [baseRate, setBaseRate] = useState("8.25");
  const [localRate, setLocalRate] = useState("0");
  const money = (n: number) => formatMoney(n, currency);

  const chooseState = (code: string) => {
    setState(code);
    const s = US_STATE_RATES.find((x) => x.code === code);
    if (s) {
      setBaseRate(String(s.rate));
      setLocalRate("0");
    }
  };

  const rate = combinedRate(num(baseRate), num(localRate));
  const result =
    mode === "add" ? addTax(num(amount), rate) : mode === "remove" ? removeTax(num(total), rate) : findRate(num(amount), num(total));
  const selected = US_STATE_RATES.find((x) => x.code === state);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit mb-6" role="tablist">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m.id ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">Amounts</h2>
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          {mode !== "remove" && (
            <NumberField id="st-net" label="Price before tax" value={amount} onChange={setAmount} prefix={currencySymbol(currency)} />
          )}
          {mode !== "add" && (
            <NumberField id="st-gross" label="Total including tax" value={total} onChange={setTotal} prefix={currencySymbol(currency)} />
          )}

          {mode !== "rate" && (
            <>
              <div>
                <label htmlFor="st-state" className="block text-sm font-medium text-gray-700 mb-1">US state (optional)</label>
                <select
                  id="st-state"
                  value={state}
                  onChange={(e) => chooseState(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
                >
                  <option value="">Custom rate / outside the US</option>
                  {US_STATE_RATES.map((s) => (
                    <option key={s.code} value={s.code}>{s.state} ({s.rate}%)</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">State base rates: {STATE_RATES_SOURCE}.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <NumberField id="st-rate" label={selected ? "State rate" : "Tax rate"} value={baseRate} onChange={(v) => { setBaseRate(v); setState(""); }} suffix="%" />
                <NumberField id="st-local" label="Local rate" value={localRate} onChange={setLocalRate} suffix="%" hint="County, city or district" />
              </div>
            </>
          )}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {result ? (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">
                  {mode === "add" ? "Total with tax" : mode === "remove" ? "Price before tax" : "Tax rate"}
                </p>
                <p className="text-4xl font-bold">
                  {mode === "add" ? money(result.gross) : mode === "remove" ? money(result.net) : `${parseFloat(result.rate.toFixed(3))}%`}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Before tax</dt>
                  <dd className="text-lg font-semibold">{money(result.net)}</dd>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Sales tax</dt>
                  <dd className="text-lg font-semibold">{money(result.tax)}</dd>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Total</dt>
                  <dd className="text-lg font-semibold">{money(result.gross)}</dd>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Rate</dt>
                  <dd className="text-lg font-semibold">{parseFloat(result.rate.toFixed(3))}%</dd>
                </div>
              </dl>
              {mode !== "rate" && selected && num(localRate) === 0 && selected.rate > 0 && (
                <p className="text-xs text-primary-100">
                  Most places in {selected.state} add a local sales tax on top of the {selected.rate}% state rate. Check your
                  receipt or city&apos;s rate and enter it as the local rate.
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-primary-100">Enter a price and a total that is at least as large.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <SalesTaxCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
