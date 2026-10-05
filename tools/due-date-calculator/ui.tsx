"use client";

import { useEffect, useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import { readCarryOver, positiveParam } from "@/components/CarryOverLinks";
import RelatedTools from "@/components/RelatedTools";
import { addDays, formatDate, parseDate, toIso, today } from "@/lib/dates";
import { MILESTONES, dueDate, gestationStart, progressOn, type DatingInput, type Method } from "./logic";
import DueDateCalculatorSEO from "./seo-content";

const METHODS: { id: Method; label: string }[] = [
  { id: "lmp", label: "Last period" },
  { id: "conception", label: "Conception date" },
  { id: "ivf", label: "IVF transfer" },
  { id: "ultrasound", label: "Ultrasound" },
];

export default function DueDateCalculatorUI() {
  const [method, setMethod] = useState<Method>("lmp");
  const [date, setDate] = useState("");
  const [cycle, setCycle] = useState("28");
  const [embryo, setEmbryo] = useState<3 | 5>(5);
  const [weeks, setWeeks] = useState("8");
  const [days, setDays] = useState("0");
  const [now, setNow] = useState<Date | null>(null);

  // Dates depend on today's date in the visitor's timezone, so set them after hydration.
  // A period date carried over from another tool (?lmp=YYYY-MM-DD&cycle=) takes priority.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const t = today();
      setNow(t);
      const q = readCarryOver();
      const lmp = q?.get("lmp") ?? "";
      const carriedCycle = q ? positiveParam(q, "cycle") : undefined;
      if (/^\d{4}-\d{2}-\d{2}$/.test(lmp) && parseDate(lmp)) {
        setMethod("lmp");
        setDate(lmp);
        if (carriedCycle !== undefined && carriedCycle >= 20 && carriedCycle <= 45) setCycle(String(carriedCycle));
      } else {
        setDate(toIso(addDays(t, -70)));
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const d = parseDate(date);
  const input: DatingInput | null = !d
    ? null
    : method === "lmp"
      ? { method, lmp: d, cycleLength: Math.min(Math.max(num(cycle) || 28, 20), 45) }
      : method === "conception"
        ? { method, conception: d }
        : method === "ivf"
          ? { method, transfer: d, embryoDays: embryo }
          : { method, scan: d, weeks: Math.min(num(weeks), 42), days: Math.min(num(days), 6) };

  const start = input ? gestationStart(input) : null;
  const due = input ? dueDate(input) : null;
  const progress = start && now ? progressOn(start, now) : null;
  const dateLabel = { lmp: "First day of your last period", conception: "Conception date", ivf: "Embryo transfer date", ultrasound: "Date of the ultrasound" }[method];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit mb-6" role="tablist">
        {METHODS.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={method === m.id}
            onClick={() => setMethod(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${method === m.id ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label htmlFor="dd-date" className="block text-sm font-medium text-gray-700 mb-1">{dateLabel}</label>
            <input
              id="dd-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#058554]"
            />
          </div>
          {method === "lmp" && (
            <NumberField id="dd-cycle" label="Average cycle length" value={cycle} onChange={setCycle} suffix="days" step="1" min="20" max="45" hint="28 days is typical; a longer cycle moves the due date later" />
          )}
          {method === "ivf" && (
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Embryo age at transfer</p>
              <div className="flex gap-2">
                {([3, 5] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setEmbryo(n)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm border ${embryo === n ? "bg-[#058554] text-white border-[#058554]" : "border-gray-300 text-gray-700"}`}
                  >
                    Day {n}{n === 5 ? " (blastocyst)" : ""}
                  </button>
                ))}
              </div>
            </div>
          )}
          {method === "ultrasound" && (
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="dd-weeks" label="Gestational age: weeks" value={weeks} onChange={setWeeks} step="1" />
              <NumberField id="dd-days" label="and days" value={days} onChange={setDays} step="1" max="6" />
            </div>
          )}
          <p className="text-xs text-gray-500">An estimate only. Your doctor or midwife will confirm the due date, usually with an early ultrasound.</p>
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          {due && start ? (
            <>
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-100 text-sm mb-1">Estimated due date</p>
                <p className="text-3xl font-bold">{formatDate(due, "full")}</p>
              </div>
              {progress && progress.trimester > 0 && progress.daysToGo >= 0 && (
                <div className="mt-4">
                  <p className="text-sm">
                    Today you are <strong>{progress.weeks} weeks {progress.days} day{progress.days === 1 ? "" : "s"}</strong> pregnant
                    (trimester {progress.trimester}), with {progress.daysToGo} days to go.
                  </p>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-white" style={{ width: `${progress.percent}%` }} />
                  </div>
                </div>
              )}
              <ul className="mt-4 space-y-1.5 text-sm">
                {MILESTONES.map((m) => (
                  <li key={m.label} className="flex justify-between gap-3">
                    <span className="text-primary-100">{m.label}</span>
                    <span className="font-medium text-right">{formatDate(addDays(start, m.day), "medium")}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center text-primary-100">Choose a date to see your due date.</p>
          )}
        </div>
      </div>

      <RelatedStrip />
      <DueDateCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
