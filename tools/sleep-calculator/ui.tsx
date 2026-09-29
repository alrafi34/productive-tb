"use client";

import { useState } from "react";
import NumberField, { num } from "@/components/NumberField";
import RelatedStrip from "@/components/RelatedStrip";
import RelatedTools from "@/components/RelatedTools";
import { bedtimesFor, formatDuration, formatTime, parseTime, wakeTimesFor } from "./logic";
import SleepCalculatorSEO from "./seo-content";

type Mode = "wake" | "bed" | "now";

export default function SleepCalculatorUI() {
  const [mode, setMode] = useState<Mode>("wake");
  const [wake, setWake] = useState("07:00");
  const [bed, setBed] = useState("23:00");
  const [fallAsleep, setFallAsleep] = useState("15");
  const [cycle, setCycle] = useState("90");
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);

  const cycleMin = Math.min(Math.max(num(cycle) || 90, 60), 120);
  const latency = Math.min(num(fallAsleep), 120);

  const options =
    mode === "wake"
      ? (() => { const w = parseTime(wake); return w === null ? [] : bedtimesFor(w, cycleMin, latency); })()
      : mode === "bed"
        ? (() => { const b = parseTime(bed); return b === null ? [] : wakeTimesFor(b, cycleMin, latency); })()
        : nowMinutes === null ? [] : wakeTimesFor(nowMinutes, cycleMin, latency);

  const chooseMode = (m: Mode) => {
    setMode(m);
    if (m === "now") {
      const d = new Date();
      setNowMinutes(d.getHours() * 60 + d.getMinutes());
    }
  };

  const best = (cycles: number) => cycles === 5 || cycles === 6;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit mb-6" role="tablist">
        {([
          ["wake", "I want to wake up at"],
          ["bed", "I'm going to bed at"],
          ["now", "I'm going to bed now"],
        ] as [Mode, string][]).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={mode === id}
            onClick={() => chooseMode(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === id ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          {mode !== "now" && (
            <div>
              <label htmlFor="sl-time" className="block text-sm font-medium text-gray-700 mb-1">
                {mode === "wake" ? "Wake-up time" : "Bedtime"}
              </label>
              <input
                id="sl-time"
                type="time"
                value={mode === "wake" ? wake : bed}
                onChange={(e) => (mode === "wake" ? setWake(e.target.value) : setBed(e.target.value))}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#058554]"
              />
            </div>
          )}
          {mode === "now" && nowMinutes !== null && (
            <p className="text-gray-700">If you go to bed now ({formatTime(nowMinutes)}), try to wake up at one of these times.</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="sl-latency" label="Time to fall asleep" value={fallAsleep} onChange={setFallAsleep} suffix="min" step="1" />
            <NumberField id="sl-cycle" label="Sleep cycle length" value={cycle} onChange={setCycle} suffix="min" step="5" min="60" max="120" />
          </div>
        </div>

        <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
          <p className="text-primary-100 text-sm mb-3">
            {mode === "wake" ? "Go to bed at one of these times" : "Set your alarm for one of these times"}
          </p>
          <ul className="space-y-2">
            {options.map((o) => (
              <li key={o.cycles} className={`flex items-center justify-between rounded-lg px-4 py-3 ${best(o.cycles) ? "bg-white text-gray-900" : "bg-white/10"}`}>
                <span className="text-2xl font-bold">{formatTime(o.time)}</span>
                <span className={`text-sm text-right ${best(o.cycles) ? "text-gray-600" : "text-primary-100"}`}>
                  {o.cycles} cycles · {formatDuration(o.sleepMinutes)}
                  {best(o.cycles) && <span className="block text-xs font-semibold text-[#058554]">Recommended for adults</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RelatedStrip />
      <SleepCalculatorSEO />
      <RelatedTools />
    </div>
  );
}
