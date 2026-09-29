"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { addDays, formatDate, parseDate, toIso, today } from "@/lib/dates";
import { nextCycles } from "./logic";
import OvulationCalculatorSEO from "./seo-content";

export default function OvulationCalculatorUI() {
  const [date, setDate] = useState("");
  const [cycle, setCycle] = useState("28");
  const [luteal, setLuteal] = useState("14");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setDate(toIso(addDays(today(), -10))));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const d = parseDate(date);
  const cycleLength = Math.min(Math.max(Math.round(num(cycle)) || 28, 20), 45);
  const lutealLength = Math.min(Math.max(Math.round(num(luteal)) || 14, 9), 17);
  const cycles = d ? nextCycles(d, cycleLength, lutealLength, 6) : [];
  const first = cycles[0];
  const range = (a: Date, b: Date) => `${formatDate(a, "medium")} – ${formatDate(b, "medium")}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label htmlFor="ov-date" className="block text-sm font-medium text-gray-700 mb-1">First day of your last period</label>
            <input
              id="ov-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="ov-cycle" label="Cycle length" value={cycle} onChange={setCycle} suffix="days" step="1" min="20" max="45" hint="From day 1 of one period to day 1 of the next" />
            <NumberField id="ov-luteal" label="Luteal phase" value={luteal} onChange={setLuteal} suffix="days" step="1" min="9" max="17" hint="14 if you don't know it" />
          </div>
          <p className="text-xs text-gray-500">
            A calendar estimate. Cycles vary from month to month; ovulation tests, temperature charting or a doctor give a
            more precise picture. Do not use this as contraception.
          </p>
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {first ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">Most fertile days</p>
                <p className="text-2xl font-bold">{range(first.fertileStart, first.fertileEnd)}</p>
                <p className="text-primary-100 text-sm mt-2">Estimated ovulation: <strong className="text-white">{formatDate(first.ovulation, "full")}</strong></p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm mt-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Next period</dt>
                  <dd className="font-semibold">{formatDate(first.nextPeriod, "medium")}</dd>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Pregnancy test from</dt>
                  <dd className="font-semibold">{formatDate(first.nextPeriod, "medium")}</dd>
                </div>
                <div className="bg-white/10 rounded-lg p-3 col-span-2">
                  <dt className="text-primary-100 text-xs uppercase tracking-wide">Due date if you conceive this cycle</dt>
                  <dd className="font-semibold">{formatDate(first.dueDate, "long")}</dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="text-center text-primary-100">Choose the first day of your last period.</p>
          )}
        </div>
      </div>

      {cycles.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-x-auto">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Your next six cycles</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                <th className="py-1.5">Period starts</th>
                <th className="py-1.5">Fertile window</th>
                <th className="py-1.5">Ovulation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cycles.map((c) => (
                <tr key={toIso(c.periodStart)}>
                  <td className="py-1.5">{formatDate(c.periodStart, "medium")}</td>
                  <td className="py-1.5">{range(c.fertileStart, c.fertileEnd)}</td>
                  <td className="py-1.5 font-medium">{formatDate(c.ovulation, "medium")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <RelatedStrip />
      <OvulationCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
