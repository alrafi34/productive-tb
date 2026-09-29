"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { daysBetween, formatDate, parseDate, toIso, today } from "@/lib/dates";
import { WEEKENDS, addBusinessDays, applyOffset, dayOfYear, isoWeek, type Weekend } from "./logic";
import DateCalculatorSEO from "./seo-content";

type Mode = "calendar" | "business";

const QUICK = [7, 14, 30, 60, 90, 180];

export default function DateCalculatorUI() {
  const [start, setStart] = useState("");
  const [sign, setSign] = useState<1 | -1>(1);
  const [mode, setMode] = useState<Mode>("calendar");
  const [years, setYears] = useState("0");
  const [months, setMonths] = useState("0");
  const [weeks, setWeeks] = useState("0");
  const [days, setDays] = useState("30");
  const [businessDays, setBusinessDays] = useState("10");
  const [weekend, setWeekend] = useState<Weekend>("satSun");

  // Today depends on the visitor's clock and timezone, so it is filled in after hydration
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setStart((s) => s || toIso(today())));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const quick = (n: number) => {
    setMode("calendar");
    setYears("0");
    setMonths("0");
    setWeeks("0");
    setDays(String(n));
  };

  const startDate = parseDate(start);
  const int = (s: string) => Math.trunc(num(s));
  const result = !startDate
    ? null
    : mode === "calendar"
      ? applyOffset(startDate, { years: int(years), months: int(months), weeks: int(weeks), days: int(days) }, sign)
      : addBusinessDays(startDate, sign * Math.min(int(businessDays), 10000), WEEKENDS[weekend].days);
  const span = startDate && result ? Math.abs(daysBetween(startDate, result)) : 0;

  const tab = (active: boolean) => `px-4 py-2 rounded-lg text-sm font-medium ${active ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label htmlFor="dc-start" className="block text-sm font-medium text-gray-700 mb-1">Start date</label>
            <div className="flex gap-2">
              <input
                id="dc-start"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
              />
              <button onClick={() => setStart(toIso(today()))} className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Today</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl" role="tablist" aria-label="Direction">
              <button role="tab" aria-selected={sign === 1} onClick={() => setSign(1)} className={tab(sign === 1)}>Add</button>
              <button role="tab" aria-selected={sign === -1} onClick={() => setSign(-1)} className={tab(sign === -1)}>Subtract</button>
            </div>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl" role="tablist" aria-label="Count">
              <button role="tab" aria-selected={mode === "calendar"} onClick={() => setMode("calendar")} className={tab(mode === "calendar")}>Calendar days</button>
              <button role="tab" aria-selected={mode === "business"} onClick={() => setMode("business")} className={tab(mode === "business")}>Business days</button>
            </div>
          </div>

          {mode === "calendar" ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <NumberField id="dc-years" label="Years" value={years} onChange={setYears} step="1" />
                <NumberField id="dc-months" label="Months" value={months} onChange={setMonths} step="1" />
                <NumberField id="dc-weeks" label="Weeks" value={weeks} onChange={setWeeks} step="1" />
                <NumberField id="dc-days" label="Days" value={days} onChange={setDays} step="1" />
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((n) => (
                  <button key={n} onClick={() => quick(n)} className="px-3 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:border-primary hover:text-primary">
                    {n} days
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="dc-business" label="Business days" value={businessDays} onChange={setBusinessDays} step="1" />
              <div>
                <label htmlFor="dc-weekend" className="block text-sm font-medium text-gray-700 mb-1">Weekend</label>
                <select
                  id="dc-weekend"
                  value={weekend}
                  onChange={(e) => setWeekend(e.target.value as Weekend)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
                >
                  {(Object.keys(WEEKENDS) as Weekend[]).map((k) => (
                    <option key={k} value={k}>{WEEKENDS[k].label}</option>
                  ))}
                </select>
              </div>
              <p className="col-span-2 text-xs text-gray-500">Public holidays are not skipped; add a day for each one in the period.</p>
            </div>
          )}
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {startDate && result ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">
                  {mode === "business"
                    ? `${Math.abs(int(businessDays)).toLocaleString("en-US")} business days ${sign === 1 ? "after" : "before"}`
                    : sign === 1 ? "The date will be" : "The date was"}
                </p>
                <p className="text-3xl font-bold" data-testid="dc-result">{formatDate(result, "full")}</p>
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-primary-100">Start date</dt><dd className="text-right">{formatDate(startDate, "full")}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-primary-100">Calendar days between</dt><dd data-testid="dc-span">{span.toLocaleString("en-US")}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-primary-100">ISO week</dt><dd data-testid="dc-week">Week {isoWeek(result)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-primary-100">Day of the year</dt><dd>{dayOfYear(result)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-primary-100">ISO date</dt><dd className="font-mono">{toIso(result)}</dd></div>
              </dl>
            </>
          ) : (
            <p className="text-center text-primary-100">Pick a start date.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <DateCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
