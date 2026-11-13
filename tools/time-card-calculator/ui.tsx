"use client";

import { useEffect, useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { formatMoney, guessCurrency } from "@/lib/currency";
import { useCurrency } from "@/lib/use-currency";
import { decimalHours, hhmm, pay, toCsv, weekDays, weekTotals, type DayEntry, type Rounding } from "./logic";
import TimeCardCalculatorSEO from "./seo-content";

const STORE = "time-card-v1";
const empty = (): DayEntry[] => Array.from({ length: 7 }, () => ({ start: "", end: "", breakMin: "" }));

type Saved = { days: DayEntry[]; startsOn: 0 | 1; weekly: string; daily: string; otRate: string; rounding: Rounding; rate: string };

export default function TimeCardCalculatorUI() {
  const [days, setDays] = useState<DayEntry[]>(empty);
  const [startsOn, setStartsOn] = useState<0 | 1>(1);
  const [weekly, setWeekly] = useState("40");
  const [daily, setDaily] = useState("0");
  const [otRate, setOtRate] = useState("1.5");
  const [rounding, setRounding] = useState<Rounding>(0);
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency("time-card-currency");
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore the last card on this device, or guess the week start (US and
  // Canada start on Sunday). After hydration so server and client match.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let saved: Saved | null = null;
      try {
        saved = JSON.parse(localStorage.getItem(STORE) || "null");
      } catch {
        // storage unavailable or corrupt
      }
      if (saved && Array.isArray(saved.days) && saved.days.length === 7) {
        setDays(saved.days);
        setStartsOn(saved.startsOn === 0 ? 0 : 1);
        setWeekly(saved.weekly ?? "40");
        setDaily(saved.daily ?? "0");
        setOtRate(saved.otRate ?? "1.5");
        setRounding(([0, 5, 6, 15] as const).includes(saved.rounding) ? saved.rounding : 0);
        setRate(saved.rate ?? "");
      } else {
        const c = guessCurrency();
        setStartsOn(c === "USD" || c === "CAD" ? 0 : 1);
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ days, startsOn, weekly, daily, otRate, rounding, rate } satisfies Saved));
    } catch {
      // storage unavailable
    }
  }, [loaded, days, startsOn, weekly, daily, otRate, rounding, rate]);

  const labels = weekDays(startsOn);
  const rules = { weeklyLimit: Number(weekly) || 0, dailyLimit: Number(daily) || 0, overtimeRate: Number(otRate) || 1, rounding };
  const week = weekTotals(days, rules);
  const hourly = Number(rate);
  const money = hourly > 0 ? pay(week, hourly, rules.overtimeRate) : null;

  const setDay = (i: number, patch: Partial<DayEntry>) => setDays((prev) => prev.map((d, j) => (j === i ? { ...d, ...patch } : d)));

  // Fill the five working days with the first filled-in day.
  const copyToWeekdays = () => {
    const src = days.find((d) => d.start && d.end);
    if (!src) return;
    setDays((prev) =>
      prev.map((d, i) => {
        const name = labels[i];
        return name === "Saturday" || name === "Sunday" ? d : { ...src };
      }),
    );
  };

  // Switching the week start keeps each entry on the same weekday.
  const changeStart = (v: 0 | 1) => {
    if (v === startsOn) return;
    setDays((prev) => (v === 0 ? [prev[6], ...prev.slice(0, 6)] : [...prev.slice(1), prev[0]]));
    setStartsOn(v);
  };

  const summary = () => {
    const lines = labels
      .map((l, i) => (week.days[i].minutes ? `${l}: ${days[i].start}–${days[i].end}, break ${days[i].breakMin || 0} min = ${hhmm(week.days[i].minutes)} (${decimalHours(week.days[i].minutes)} h)` : ""))
      .filter(Boolean);
    lines.push(`Total: ${hhmm(week.totalMin)} (${decimalHours(week.totalMin)} h)`);
    lines.push(`Regular: ${decimalHours(week.regularMin)} h · Overtime: ${decimalHours(week.overtimeMin)} h`);
    if (money) lines.push(`Pay: ${formatMoney(money.regular, currency)} regular + ${formatMoney(money.overtime, currency)} overtime = ${formatMoney(money.total, currency)}`);
    return lines.join("\n");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked
    }
  };

  const downloadCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(labels, days, week)], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "time-card.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const input = "w-full min-w-0 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent";
  const label = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>This week</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <label className="flex items-center gap-1 text-gray-600">
                Week starts
                <select value={startsOn} onChange={(e) => changeStart(Number(e.target.value) as 0 | 1)} className="px-2 py-1 border border-gray-300 rounded-md">
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                </select>
              </label>
              <button onClick={copyToWeekdays} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Copy first day to weekdays</button>
              <button onClick={() => setDays(empty())} className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700">Clear</button>
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-[7rem_1fr_1fr_5.5rem_5rem] gap-2 text-xs font-medium text-gray-500 px-1 mb-1">
            <span>Day</span><span>Clock in</span><span>Clock out</span><span>Break (min)</span><span className="text-right">Hours</span>
          </div>
          <div className="space-y-2">
            {labels.map((name, i) => {
              const r = week.days[i];
              return (
                <div key={name} className="grid grid-cols-2 sm:grid-cols-[7rem_1fr_1fr_5.5rem_5rem] gap-2 items-center p-2 sm:p-1 rounded-lg bg-gray-50 sm:bg-transparent">
                  <span className="col-span-2 sm:col-span-1 font-medium text-gray-800 text-sm">{name}</span>
                  <label className="block min-w-0">
                    <span className="sm:hidden block text-[11px] text-gray-500 mb-0.5">Clock in</span>
                    <input type="time" aria-label={`${name} clock in`} value={days[i].start} onChange={(e) => setDay(i, { start: e.target.value })} className={input} />
                  </label>
                  <label className="block min-w-0">
                    <span className="sm:hidden block text-[11px] text-gray-500 mb-0.5">Clock out</span>
                    <input type="time" aria-label={`${name} clock out`} value={days[i].end} onChange={(e) => setDay(i, { end: e.target.value })} className={input} />
                  </label>
                  <label className="block min-w-0">
                    <span className="sm:hidden block text-[11px] text-gray-500 mb-0.5">Break (min)</span>
                    <input type="number" min="0" step="5" inputMode="numeric" placeholder="0" aria-label={`${name} break in minutes`} value={days[i].breakMin} onChange={(e) => setDay(i, { breakMin: e.target.value })} className={input} />
                  </label>
                  <span className="text-right text-sm font-mono">
                    {r.error ? <span className="text-red-600 font-sans text-xs">{r.error}</span> : r.minutes ? (
                      <>
                        {decimalHours(r.minutes)}
                        {r.overnight && <span className="block text-[10px] text-gray-400 font-sans">overnight</span>}
                      </>
                    ) : <span className="text-gray-300">–</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-500">A clock-out earlier than the clock-in counts as an overnight shift. Breaks are unpaid time taken off the shift.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-primary rounded-xl shadow-lg shadow-primary/20 p-6 text-white" aria-live="polite">
            <p className="text-xs uppercase tracking-wider text-primary-100 font-medium">Total hours</p>
            <p className="text-4xl font-bold mt-1">{decimalHours(week.totalMin)}</p>
            <p className="text-primary-100">{hhmm(week.totalMin)} hours:minutes</p>
            <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-primary-100">Regular</span><span className="font-semibold">{decimalHours(week.regularMin)} h</span></div>
              <div className="flex justify-between"><span className="text-primary-100">Overtime</span><span className="font-semibold">{decimalHours(week.overtimeMin)} h</span></div>
              {money && (
                <>
                  <div className="flex justify-between pt-2 border-t border-white/20"><span className="text-primary-100">Regular pay</span><span className="font-semibold">{formatMoney(money.regular, currency)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">Overtime pay</span><span className="font-semibold">{formatMoney(money.overtime, currency)}</span></div>
                  <div className="flex justify-between text-base"><span>Gross pay</span><span className="font-bold">{formatMoney(money.total, currency)}</span></div>
                </>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={copy} className="bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 text-sm">{copied ? "✓ Copied" : "Copy summary"}</button>
              <button onClick={downloadCsv} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 text-sm">Download CSV</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Pay and overtime</h3>
            <div>
              <label htmlFor="tc-rate" className={label}>Hourly rate (optional)</label>
              <div className="flex gap-2">
                <CurrencySelect value={currency} onChange={setCurrency} className="py-2" />
                <input id="tc-rate" type="number" min="0" step="0.01" inputMode="decimal" placeholder="20.00" value={rate} onChange={(e) => setRate(e.target.value)} className={input} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="tc-weekly" className={label}>Overtime after (h/week)</label>
                <input id="tc-weekly" type="number" min="0" step="0.5" value={weekly} onChange={(e) => setWeekly(e.target.value)} className={input} />
              </div>
              <div>
                <label htmlFor="tc-daily" className={label}>…or after (h/day)</label>
                <input id="tc-daily" type="number" min="0" step="0.5" placeholder="0 = off" value={daily} onChange={(e) => setDaily(e.target.value)} className={input} />
              </div>
              <div>
                <label htmlFor="tc-ot" className={label}>Overtime rate</label>
                <select id="tc-ot" value={otRate} onChange={(e) => setOtRate(e.target.value)} className={input}>
                  <option value="1">1× (none)</option>
                  <option value="1.25">1.25×</option>
                  <option value="1.5">1.5× (time and a half)</option>
                  <option value="2">2× (double time)</option>
                </select>
              </div>
              <div>
                <label htmlFor="tc-round" className={label}>Round punches</label>
                <select id="tc-round" value={rounding} onChange={(e) => setRounding(Number(e.target.value) as Rounding)} className={input}>
                  <option value={0}>No rounding</option>
                  <option value={5}>5 minutes</option>
                  <option value={6}>6 minutes (0.1 h)</option>
                  <option value={15}>15 minutes</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              US federal law (FLSA) sets overtime after 40 hours a week at 1.5×. Some states and countries also use a daily limit, such as 8 hours in
              California; check your local rules or contract. Use 0 to turn a limit off.
            </p>
          </div>
        </div>
      </div>

      <RelatedStrip />
      <TimeCardCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
