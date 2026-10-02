"use client";

import { useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { CPI_LAST, CPI_LAST_FULL_YEAR, CPI_SOURCE } from "./cpi-data";
import { YEARS, adjustForInflation } from "./logic";
import InflationCalculatorSEO from "./seo-content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function InflationCalculatorUI() {
  const [amount, setAmount] = useState("100");
  const [fromYear, setFromYear] = useState(2000);
  const [fromMonth, setFromMonth] = useState(0);
  const [toYear, setToYear] = useState(CPI_LAST.year);
  // Latest published month by default; a part-year average would mislead
  const [toMonth, setToMonth] = useState(CPI_LAST.month < 12 ? CPI_LAST.month : 0);

  const r = adjustForInflation(
    num(amount),
    { year: fromYear, month: fromMonth || undefined },
    { year: toYear, month: toMonth || undefined },
  );
  const when = (y: number, m: number) => (m ? `${MONTHS[m - 1]} ${y}` : String(y));

  const selectCls = "rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]";
  const dateInputs = (label: string, year: number, setYear: (y: number) => void, month: number, setMonth: (m: number) => void, id: string) => (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-1">{label}</p>
      <div className="flex gap-2">
        <select aria-label={`${label} month`} value={month} onChange={(e) => setMonth(Number(e.target.value))} className={`${selectCls} flex-1`}>
          <option value={0}>Whole year</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
        <select id={id} aria-label={`${label} year`} value={year} onChange={(e) => setYear(Number(e.target.value))} className={`${selectCls} w-28`}>
          {[...YEARS].reverse().map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <NumberField id="inf-amount" label="Amount in US dollars" value={amount} onChange={setAmount} prefix="$" />
          {dateInputs("In", fromYear, setFromYear, fromMonth, setFromMonth, "inf-from")}
          {dateInputs("Is worth in", toYear, setToYear, toMonth, setToMonth, "inf-to")}
          <p className="text-xs text-gray-500">
            &quot;Whole year&quot; uses the annual average
            {CPI_LAST.year > CPI_LAST_FULL_YEAR && <> ({CPI_LAST.year}: average of January to {MONTHS[CPI_LAST.month - 1]} so far)</>}.
            Data: {CPI_SOURCE}. October 2025 was not collected.
          </p>
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {r ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">
                  {usd(num(amount))} in {when(fromYear, fromMonth)} has the same buying power as
                </p>
                <p className="text-4xl font-bold">{usd(r.value)}</p>
                <p className="text-primary-100 text-sm mt-1">in {when(toYear, toMonth)}</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm mt-4">
                {[
                  ["Total price change", `${r.cumulativePct >= 0 ? "+" : ""}${r.cumulativePct.toFixed(1)}%`],
                  ["Average per year", Math.abs(r.years) >= 1 ? `${r.averagePct.toFixed(2)}%` : "—"],
                  [`CPI ${when(fromYear, fromMonth)}`, r.fromCpi.toFixed(3)],
                  [`CPI ${when(toYear, toMonth)}`, r.toCpi.toFixed(3)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white/10 rounded-lg p-3">
                    <dt className="text-primary-100 text-xs uppercase tracking-wide">{k}</dt>
                    <dd className="text-lg font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <p className="text-center">No CPI figure was published for that month. Choose another month or the whole year.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <InflationCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
